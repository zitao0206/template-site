import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { readSession } from "@/lib/session";
import { orderPaySchema } from "@/lib/validators";

// POST /api/orders/pay  支付成功后的结算（V3.0.3 起订单落库）
// 事务内一次完成：扣库存 → 写订单 + 明细 →（购物车来源）清已结算条目
// 同一订单号重复提交直接返回已有订单，不会二次扣库存
export async function POST(req: Request) {
  const session = await readSession(req);
  if (!session) {
    return NextResponse.json({ error: "未登录" }, { status: 401 });
  }
  if (session.uid === null) {
    return NextResponse.json({ error: "管理员账号不支持下单" }, { status: 403 });
  }

  const body = await req.json().catch(() => null);
  const parsed = orderPaySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "参数不合法" },
      { status: 400 },
    );
  }

  const { orderNo, items, fromCart, addressId } = parsed.data;
  const userId = session.uid;

  // 收货地址必须属于本人，取出来做快照
  const address = await prisma.address.findUnique({ where: { id: addressId } });
  if (!address || address.userId !== userId) {
    return NextResponse.json({ error: "收货地址不存在，请重新选择" }, { status: 400 });
  }

  // 幂等：订单号已存在（重复点击/刷新重付）直接返回，不再扣库存
  const existing = await prisma.order.findUnique({ where: { orderNo } });
  if (existing) {
    return NextResponse.json({
      ok: true,
      duplicated: true,
      orderNo,
      orderId: existing.id,
      totalAmount: existing.totalAmount,
    });
  }

  try {
    const result = await prisma.$transaction(async (tx) => {
      const linesData: Array<{
        productId: number;
        title: string;
        price: number;
        quantity: number;
      }> = [];
      let totalAmount = 0;
      let removed = 0;
      let updated = 0;

      for (const line of items) {
        const product = await tx.product.findUnique({ where: { id: line.productId } });
        if (
          !product ||
          product.status !== "PUBLISHED" ||
          product.stock < line.quantity
        ) {
          throw new Error(`STOCK:${line.productId}`);
        }

        // 库存守卫：条件更新，避免并发下单扣成负数
        const stockUpdate = await tx.product.updateMany({
          where: {
            id: line.productId,
            status: "PUBLISHED",
            stock: { gte: line.quantity },
          },
          data: { stock: { decrement: line.quantity } },
        });
        if (stockUpdate.count === 0) {
          throw new Error(`STOCK:${line.productId}`);
        }

        totalAmount += product.price * line.quantity;
        linesData.push({
          productId: product.id,
          title: product.title,
          price: product.price,
          quantity: line.quantity,
        });

        // 购物车来源：按件数扣减，保留用户没结算的部分
        if (fromCart) {
          const cartItem = await tx.cartItem.findUnique({
            where: { userId_productId: { userId, productId: line.productId } },
          });
          if (cartItem) {
            const remain = cartItem.quantity - line.quantity;
            if (remain <= 0) {
              await tx.cartItem.delete({ where: { id: cartItem.id } });
              removed += 1;
            } else {
              await tx.cartItem.update({
                where: { id: cartItem.id },
                data: { quantity: remain },
              });
              updated += 1;
            }
          }
        }
      }

      const order = await tx.order.create({
        data: {
          orderNo,
          userId,
          totalAmount,
          status: "PENDING",
          receiverName: address.name,
          receiverPhone: address.phone,
          receiverZip: address.zipCode,
          receiverAddress: address.detail,
          items: { create: linesData },
        },
      });

      return {
        orderId: order.id,
        totalAmount,
        removed,
        updated,
      };
    });

    return NextResponse.json({ ok: true, orderNo, ...result });
  } catch (e) {
    const message = e instanceof Error ? e.message : "";

    if (message.startsWith("STOCK:")) {
      const productId = Number(message.split(":")[1]);
      const product = await prisma.product.findUnique({
        where: { id: productId },
        select: { title: true, stock: true, status: true },
      });
      const detail = !product
        ? "商品已不存在"
        : product.status !== "PUBLISHED"
          ? "商品已下架"
          : `库存不足（仅剩 ${product.stock} 件）`;
      return NextResponse.json(
        { error: `${product ? `「${product.title}」` : ""}${detail}，支付未完成` },
        { status: 409 },
      );
    }

    console.error("orders/pay failed:", e);
    return NextResponse.json({ error: "支付结算失败，请重试" }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { readSession } from "@/lib/session";
import { orderPaySchema } from "@/lib/validators";

// POST /api/orders/pay  模拟支付成功后的结算
// - 扣减订单商品的库存（事务内带 stock >= quantity 守卫，避免超卖/负数）
// - 来自购物车的订单：按件数扣减购物车条目，减到 0 删除
// V4.0 接入真实支付后，这段逻辑挪到支付回调里执行
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

  const { orderNo, items, fromCart } = parsed.data;
  const userId = session.uid;

  try {
    const result = await prisma.$transaction(async (tx) => {
      let removed = 0;
      let updated = 0;

      for (const line of items) {
        // 库存守卫：库存不足或商品下架时这一条更新 0 行
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

      return { removed, updated };
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

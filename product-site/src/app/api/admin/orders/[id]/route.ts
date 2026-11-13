import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { readSession } from "@/lib/session";
import { orderActionSchema } from "@/lib/validators";

type Ctx = { params: { id: string } };

// POST /api/admin/orders/:id  管理员处理订单
// accept  待处理 → 处理中
// ship    处理中 → 已发货（必须填发货单号）
// cancel  待处理/处理中 → 已取消（必须填留言，并把库存退回）
export async function POST(req: Request, { params }: Ctx) {
  const session = await readSession(req);
  if (!session || session.role !== "admin") {
    return NextResponse.json({ error: "无权限" }, { status: 403 });
  }

  const id = Number(params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return NextResponse.json({ error: "id 不合法" }, { status: 400 });
  }

  const body = await req.json().catch(() => null);
  const parsed = orderActionSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "参数不合法" },
      { status: 400 },
    );
  }

  const order = await prisma.order.findUnique({
    where: { id },
    include: { items: true },
  });
  if (!order) {
    return NextResponse.json({ error: "订单不存在" }, { status: 404 });
  }

  const action = parsed.data;

  if (action.action === "accept") {
    if (order.status !== "PENDING") {
      return NextResponse.json(
        { error: "只有待处理的订单可以接单" },
        { status: 409 },
      );
    }
    const updated = await prisma.order.update({
      where: { id },
      data: { status: "PROCESSING" },
    });
    return NextResponse.json({ ok: true, order: updated });
  }

  if (action.action === "ship") {
    if (order.status !== "PROCESSING") {
      return NextResponse.json(
        { error: "只有处理中的订单可以发货" },
        { status: 409 },
      );
    }
    const updated = await prisma.order.update({
      where: { id },
      data: { status: "SHIPPED", trackingNo: action.trackingNo },
    });
    return NextResponse.json({ ok: true, order: updated });
  }

  // 取消订单
  if (order.status !== "PENDING" && order.status !== "PROCESSING") {
    return NextResponse.json(
      { error: "已发货或已结束的订单不能取消" },
      { status: 409 },
    );
  }

  await prisma.$transaction(async (tx) => {
    await tx.order.update({
      where: { id },
      data: { status: "CANCELLED", cancelReason: action.reason },
    });

    // 下单时扣了库存，取消要退回
    for (const item of order.items) {
      await tx.product.update({
        where: { id: item.productId },
        data: { stock: { increment: item.quantity } },
      });
    }
  });

  const updated = await prisma.order.findUnique({ where: { id } });
  return NextResponse.json({ ok: true, order: updated });
}

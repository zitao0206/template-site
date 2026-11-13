import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { readSession } from "@/lib/session";

type Ctx = { params: { id: string } };

// POST /api/orders/:id/confirm  用户确认收货：已发货 → 已结束
export async function POST(req: Request, { params }: Ctx) {
  const session = await readSession(req);
  if (!session) {
    return NextResponse.json({ error: "未登录" }, { status: 401 });
  }
  const userId = session.uid;
  if (userId === null) {
    return NextResponse.json({ error: "管理员账号不能确认收货" }, { status: 403 });
  }

  const id = Number(params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return NextResponse.json({ error: "id 不合法" }, { status: 400 });
  }

  const order = await prisma.order.findUnique({ where: { id } });
  if (!order || order.userId !== userId) {
    return NextResponse.json({ error: "订单不存在" }, { status: 404 });
  }
  if (order.status !== "SHIPPED") {
    return NextResponse.json(
      { error: "只有已发货的订单可以确认收货" },
      { status: 409 },
    );
  }

  const updated = await prisma.order.update({
    where: { id },
    data: { status: "COMPLETED" },
  });

  return NextResponse.json({ ok: true, order: updated });
}

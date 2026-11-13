import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { readSession } from "@/lib/session";
import { cartSettleSchema } from "@/lib/validators";

// POST /api/cart/settle  支付成功后清理已结算的购物车条目
// body: { items: [{ productId, quantity }] }
// 按结算件数扣减：购物车数量 > 结算数量时保留剩余，减到 0 才删除条目
export async function POST(req: Request) {
  const session = await readSession(req);
  if (!session) {
    return NextResponse.json({ error: "未登录" }, { status: 401 });
  }
  if (session.uid === null) {
    return NextResponse.json({ error: "管理员账号不支持购物车" }, { status: 403 });
  }

  const body = await req.json().catch(() => null);
  const parsed = cartSettleSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "参数不合法" },
      { status: 400 },
    );
  }

  const userId = session.uid;
  let removed = 0;
  let updated = 0;

  for (const line of parsed.data.items) {
    // 只能动自己的条目
    const item = await prisma.cartItem.findUnique({
      where: { userId_productId: { userId, productId: line.productId } },
    });
    if (!item) continue;

    const remain = item.quantity - line.quantity;
    if (remain <= 0) {
      await prisma.cartItem.delete({ where: { id: item.id } });
      removed += 1;
    } else {
      await prisma.cartItem.update({
        where: { id: item.id },
        data: { quantity: remain },
      });
      updated += 1;
    }
  }

  return NextResponse.json({ ok: true, removed, updated });
}

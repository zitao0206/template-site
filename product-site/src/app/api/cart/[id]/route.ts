import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { readSession } from "@/lib/session";
import { cartQuantitySchema } from "@/lib/validators";

type Ctx = { params: { id: string } };

// PATCH /api/cart/:id  修改数量
export async function PATCH(req: Request, { params }: Ctx) {
  const session = await readSession(req);
  if (!session) {
    return NextResponse.json({ error: "未登录" }, { status: 401 });
  }
  if (session.uid === null) {
    return NextResponse.json({ error: "管理员账号不支持购物车" }, { status: 403 });
  }

  const itemId = Number(params.id);
  if (!Number.isInteger(itemId) || itemId <= 0) {
    return NextResponse.json({ error: "id 不合法" }, { status: 400 });
  }

  const body = await req.json().catch(() => null);
  const parsed = cartQuantitySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "参数不合法" },
      { status: 400 },
    );
  }
  const { quantity } = parsed.data;

  // 只能操作自己的购物车条目
  const item = await prisma.cartItem.findUnique({
    where: { id: itemId },
    include: { product: { select: { stock: true } } },
  });
  if (!item || item.userId !== session.uid) {
    return NextResponse.json({ error: "购物车条目不存在" }, { status: 404 });
  }
  if (quantity > item.product.stock) {
    return NextResponse.json(
      { error: `库存不足，最多只能买 ${item.product.stock} 件` },
      { status: 400 },
    );
  }

  const updated = await prisma.cartItem.update({
    where: { id: itemId },
    data: { quantity },
  });

  return NextResponse.json({ ok: true, quantity: updated.quantity });
}

// DELETE /api/cart/:id  移除购物车条目
export async function DELETE(req: Request, { params }: Ctx) {
  const session = await readSession(req);
  if (!session) {
    return NextResponse.json({ error: "未登录" }, { status: 401 });
  }
  if (session.uid === null) {
    return NextResponse.json({ error: "管理员账号不支持购物车" }, { status: 403 });
  }

  const itemId = Number(params.id);
  if (!Number.isInteger(itemId) || itemId <= 0) {
    return NextResponse.json({ error: "id 不合法" }, { status: 400 });
  }

  const item = await prisma.cartItem.findUnique({ where: { id: itemId } });
  if (!item || item.userId !== session.uid) {
    return NextResponse.json({ error: "购物车条目不存在" }, { status: 404 });
  }

  await prisma.cartItem.delete({ where: { id: itemId } });

  return NextResponse.json({ ok: true });
}

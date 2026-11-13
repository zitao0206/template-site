import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { readSession } from "@/lib/session";
import { cartAddSchema } from "@/lib/validators";

// POST /api/cart/add  加入购物车（重复加入 = 数量 +1）
export async function POST(req: Request) {
  const session = await readSession(req);
  if (!session) {
    return NextResponse.json({ error: "未登录" }, { status: 401 });
  }
  if (session.uid === null) {
    return NextResponse.json({ error: "管理员账号不支持购物车" }, { status: 403 });
  }

  const body = await req.json().catch(() => null);
  const parsed = cartAddSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "参数不合法" },
      { status: 400 },
    );
  }
  const { productId } = parsed.data;

  // 只能加已上架、还有库存的商品
  const product = await prisma.product.findUnique({
    where: { id: productId },
  });
  if (!product || product.status !== "PUBLISHED") {
    return NextResponse.json({ error: "商品不存在或已下架" }, { status: 404 });
  }
  if (product.stock <= 0) {
    return NextResponse.json({ error: "商品已售罄" }, { status: 400 });
  }

  // 同一个用户 + 同一个商品只有一条记录，重复加就是数量 +1
  const existing = await prisma.cartItem.findUnique({
    where: {
      userId_productId: { userId: session.uid, productId },
    },
  });
  if (existing && existing.quantity >= product.stock) {
    return NextResponse.json(
      { error: `库存不足，最多只能买 ${product.stock} 件` },
      { status: 400 },
    );
  }

  const item = await prisma.cartItem.upsert({
    where: {
      userId_productId: { userId: session.uid, productId },
    },
    update: {
      quantity: { increment: 1 },
    },
    create: {
      userId: session.uid,
      productId,
      quantity: 1,
    },
  });

  return NextResponse.json({ ok: true, quantity: item.quantity });
}

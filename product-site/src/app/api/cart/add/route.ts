import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { readSession } from "@/lib/session";
import { cartAddSchema } from "@/lib/validators";

// POST /api/cart/add  加入购物车
// body: { productId, quantity? }  不传 quantity 默认加 1 件，支持在详情页一次加多件
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
  const { productId, quantity } = parsed.data;

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

  // 同一个用户 + 同一个商品只有一条记录，本次是在已有数量上累加
  const existing = await prisma.cartItem.findUnique({
    where: {
      userId_productId: { userId: session.uid, productId },
    },
  });
  const current = existing?.quantity ?? 0;
  const target = current + quantity;

  if (target > product.stock) {
    return NextResponse.json(
      {
        error: `库存不足：库存 ${product.stock} 件，购物车已有 ${current} 件`,
      },
      { status: 400 },
    );
  }

  const item = await prisma.cartItem.upsert({
    where: {
      userId_productId: { userId: session.uid, productId },
    },
    update: { quantity: target },
    create: { userId: session.uid, productId, quantity: target },
  });

  return NextResponse.json({ ok: true, quantity: item.quantity });
}

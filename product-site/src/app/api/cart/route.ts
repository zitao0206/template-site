import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { readSession } from "@/lib/session";

// GET /api/cart  当前登录用户的购物车列表
// 顺带返回总件数 / 总金额，前端右上角角标直接用 totalQuantity
export async function GET(req: Request) {
  const session = await readSession(req);
  if (!session) {
    return NextResponse.json({ error: "未登录" }, { status: 401 });
  }
  // 管理员是写死账号，uid 为 null，没有购物车
  if (session.uid === null) {
    return NextResponse.json({ error: "管理员账号不支持购物车" }, { status: 403 });
  }

  const items = await prisma.cartItem.findMany({
    where: { userId: session.uid },
    include: {
      product: {
        select: {
          id: true,
          title: true,
          price: true,
          imageUrl: true,
          stock: true,
          status: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  // 已下架的条目仍然返回（前端可以标"已下架"），但不计入角标和金额
  const validItems = items.filter((item) => item.product.status === "PUBLISHED");
  const totalQuantity = validItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = validItems.reduce(
    (sum, item) => sum + item.quantity * item.product.price,
    0,
  );

  return NextResponse.json({ items, totalQuantity, totalPrice });
}

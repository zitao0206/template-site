import { NextResponse } from "next/server";
import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { productSchema } from "@/lib/validators";
import { readSession } from "@/lib/session";

// GET /api/products?page=1&pageSize=12
// 普通访客只看到 PUBLISHED；管理员可看到全部
export async function GET(req: Request) {
  const url = new URL(req.url);
  const page = Math.max(1, Number(url.searchParams.get("page") ?? 1) || 1);
  const pageSize = Math.min(
    50,
    Math.max(1, Number(url.searchParams.get("pageSize") ?? 12) || 12),
  );

  const session = await readSession(req);
  const where: Prisma.ProductWhereInput =
    session?.role === "admin" ? {} : { status: "PUBLISHED" };

  const [total, items] = await Promise.all([
    prisma.product.count({ where }),
    prisma.product.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
      // 列表不返回 description，减少带宽（详情接口才给全文）
      select: {
        id: true,
        title: true,
        price: true,
        stock: true,
        imageUrl: true,
        status: true,
        createdAt: true,
      },
    }),
  ]);

  return NextResponse.json({ page, pageSize, total, items });
}

// POST /api/products  发布商品（仅管理员）
export async function POST(req: Request) {
  const session = await readSession(req);
  if (session?.role !== "admin") {
    return NextResponse.json({ error: "无权限" }, { status: 403 });
  }

  const body = await req.json().catch(() => null);
  const parsed = productSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "参数不合法" },
      { status: 400 },
    );
  }

  const { title, description, price, imageUrl, status, stock } = parsed.data;
  const product = await prisma.product.create({
    data: {
      title,
      description: description || null,
      price,
      imageUrl: imageUrl || null,
      status,
      stock, // ✅写入库存
    },
  });

  return NextResponse.json(product, { status: 201 });
}

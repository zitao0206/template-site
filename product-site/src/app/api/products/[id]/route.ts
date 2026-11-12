import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { productSchema } from "@/lib/validators";
import { readSession } from "@/lib/session";

type Ctx = { params: { id: string } };

// GET /api/products/:id  商品详情（未上架的只有管理员能看到）
export async function GET(req: Request, { params }: Ctx) {
  const id = Number(params.id);
  if (!Number.isInteger(id)) {
    return NextResponse.json({ error: "id 不合法" }, { status: 400 });
  }

  const session = await readSession(req);
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) {
    return NextResponse.json({ error: "商品不存在" }, { status: 404 });
  }
  if (product.status !== "PUBLISHED" && session?.role !== "admin") {
    return NextResponse.json({ error: "商品不存在" }, { status: 404 });
  }

  return NextResponse.json(product);
}

// PUT /api/products/:id  修改商品（仅管理员）
export async function PUT(req: Request, { params }: Ctx) {
  const session = await readSession(req);
  if (session?.role !== "admin") {
    return NextResponse.json({ error: "无权限" }, { status: 403 });
  }

  const id = Number(params.id);
  const body = await req.json().catch(() => null);
  const parsed = productSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "参数不合法" },
      { status: 400 },
    );
  }

  const { title, description, price, stock, imageUrl, status } = parsed.data;
  try {
    const product = await prisma.product.update({
      where: { id },
      data: {
        title,
        description: description || null,
        price,
        stock,
        imageUrl: imageUrl || null,
        status,
      },
    });
    return NextResponse.json(product);
  } catch {
    return NextResponse.json({ error: "商品不存在" }, { status: 404 });
  }
}

// DELETE /api/products/:id  删除商品（仅管理员）
export async function DELETE(req: Request, { params }: Ctx) {
  const session = await readSession(req);
  if (session?.role !== "admin") {
    return NextResponse.json({ error: "无权限" }, { status: 403 });
  }

  const id = Number(params.id);
  try {
    await prisma.product.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "商品不存在" }, { status: 404 });
  }
}

import { NextResponse, type NextRequest } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { products } from "@/lib/schema";
import { getAdminFromRequest } from "@/lib/request-auth";
import { productUpdateSchema } from "@/lib/validation";
import { firstIssue, jsonError, FORBIDDEN } from "@/lib/api";

type Params = { params: Promise<{ id: string }> };

/** GET /api/products/:id  未发布商品仅管理员可见 */
export async function GET(req: NextRequest, { params }: Params) {
  const { id } = await params;
  const item = db.select().from(products).where(eq(products.id, id)).get();
  if (!item) return jsonError("商品不存在", 404);

  if (item.status !== "published") {
    const admin = await getAdminFromRequest(req);
    if (!admin) return jsonError("商品不存在", 404);
  }

  return NextResponse.json(item);
}

/** PATCH /api/products/:id  局部更新（需管理员） */
export async function PATCH(req: NextRequest, { params }: Params) {
  const admin = await getAdminFromRequest(req);
  if (!admin) return jsonError(FORBIDDEN, 401);

  const { id } = await params;
  const exists = db
    .select({ id: products.id })
    .from(products)
    .where(eq(products.id, id))
    .get();
  if (!exists) return jsonError("商品不存在", 404);

  const body = await req.json().catch(() => null);
  const parsed = productUpdateSchema.safeParse(body);
  if (!parsed.success) return jsonError(firstIssue(parsed.error), 400);

  const patch = parsed.data;
  const updates: Partial<typeof products.$inferInsert> = {
    updatedAt: new Date(),
  };
  if (patch.title !== undefined) updates.title = patch.title;
  if (patch.summary !== undefined) updates.summary = patch.summary;
  if (patch.description !== undefined) updates.description = patch.description;
  if (patch.priceCents !== undefined) updates.priceCents = patch.priceCents;
  if (patch.stock !== undefined) updates.stock = patch.stock;
  if (patch.imageUrl !== undefined) updates.imageUrl = patch.imageUrl;
  if (patch.status !== undefined) updates.status = patch.status;

  db.update(products).set(updates).where(eq(products.id, id)).run();

  const item = db.select().from(products).where(eq(products.id, id)).get();
  return NextResponse.json(item);
}

/** DELETE /api/products/:id  删除（需管理员） */
export async function DELETE(req: NextRequest, { params }: Params) {
  const admin = await getAdminFromRequest(req);
  if (!admin) return jsonError(FORBIDDEN, 401);

  const { id } = await params;
  const item = db
    .select({ id: products.id })
    .from(products)
    .where(eq(products.id, id))
    .get();
  if (!item) return jsonError("商品不存在", 404);

  db.delete(products).where(eq(products.id, id)).run();
  return NextResponse.json({ ok: true });
}

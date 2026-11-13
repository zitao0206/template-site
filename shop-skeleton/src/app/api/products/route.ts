import { NextResponse, type NextRequest } from "next/server";
import { randomUUID } from "node:crypto";
import { desc, eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { products } from "@/lib/schema";
import { getAdminFromRequest } from "@/lib/request-auth";
import { productSchema } from "@/lib/validation";
import { firstIssue, jsonError, FORBIDDEN } from "@/lib/api";

/**
 * GET /api/products            仅返回已发布商品（用户端 / App 使用）
 * GET /api/products?status=all 返回全部商品（需管理员）
 */
export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const wantAll = url.searchParams.get("status") === "all";

  if (wantAll) {
    const admin = await getAdminFromRequest(req);
    if (!admin) return jsonError(FORBIDDEN, 401);
    const items = db
      .select()
      .from(products)
      .orderBy(desc(products.createdAt))
      .all();
    return NextResponse.json({ items });
  }

  const items = db
    .select()
    .from(products)
    .where(eq(products.status, "published"))
    .orderBy(desc(products.createdAt))
    .all();
  return NextResponse.json({ items });
}

/** POST /api/products  新建商品（需管理员） */
export async function POST(req: NextRequest) {
  const admin = await getAdminFromRequest(req);
  if (!admin) return jsonError(FORBIDDEN, 401);

  const body = await req.json().catch(() => null);
  const parsed = productSchema.safeParse(body);
  if (!parsed.success) return jsonError(firstIssue(parsed.error), 400);

  const now = new Date();
  const item = {
    id: randomUUID(),
    ...parsed.data,
    createdAt: now,
    updatedAt: now,
  };

  db.insert(products).values(item).run();

  return NextResponse.json(item, { status: 201 });
}

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { readSession } from "@/lib/session";

type Ctx = { params: { id: string } };

// DELETE /api/super/users/:id  删除注册用户（地址/购物车/订单随 Prisma Cascade 一起删）
export async function DELETE(req: Request, { params }: Ctx) {
  const session = await readSession(req);
  if (!session || session.role !== "super") {
    return NextResponse.json({ error: "无权限" }, { status: 403 });
  }

  const id = Number(params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return NextResponse.json({ error: "id 不合法" }, { status: 400 });
  }

  const target = await prisma.user.findUnique({ where: { id } });
  if (!target) {
    return NextResponse.json({ error: "用户不存在" }, { status: 404 });
  }

  await prisma.user.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}

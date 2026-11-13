import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { readSession } from "@/lib/session";
import { adminAccountSchema } from "@/lib/validators";

type Ctx = { params: { id: string } };

// PATCH /api/super/admins/:id  编辑管理员（邮箱 / 密码，密码留空则不改）
export async function PATCH(req: Request, { params }: Ctx) {
  const session = await readSession(req);
  if (!session || session.role !== "super") {
    return NextResponse.json({ error: "无权限" }, { status: 403 });
  }

  const id = Number(params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return NextResponse.json({ error: "id 不合法" }, { status: 400 });
  }

  const body = await req.json().catch(() => null);
  const parsed = adminAccountSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "参数不合法" },
      { status: 400 },
    );
  }

  const target = await prisma.admin.findUnique({ where: { id } });
  if (!target) {
    return NextResponse.json({ error: "管理员不存在" }, { status: 404 });
  }

  const email = parsed.data.email;
  if (email !== target.email) {
    const taken = await prisma.admin.findUnique({ where: { email } });
    if (taken) {
      return NextResponse.json({ error: "该邮箱已经是管理员" }, { status: 409 });
    }
  }

  const admin = await prisma.admin.update({
    where: { id },
    data: {
      email,
      ...(parsed.data.password
        ? { password: await bcrypt.hash(parsed.data.password, 10) }
        : {}),
    },
    select: { id: true, email: true, createdAt: true },
  });

  return NextResponse.json({ ok: true, admin });
}

// DELETE /api/super/admins/:id  删除管理员
export async function DELETE(req: Request, { params }: Ctx) {
  const session = await readSession(req);
  if (!session || session.role !== "super") {
    return NextResponse.json({ error: "无权限" }, { status: 403 });
  }

  const id = Number(params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return NextResponse.json({ error: "id 不合法" }, { status: 400 });
  }

  const target = await prisma.admin.findUnique({ where: { id } });
  if (!target) {
    return NextResponse.json({ error: "管理员不存在" }, { status: 404 });
  }

  await prisma.admin.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}

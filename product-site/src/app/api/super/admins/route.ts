import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { readSession } from "@/lib/session";
import { adminAccountSchema } from "@/lib/validators";

// GET /api/super/admins  管理员账号列表
export async function GET(req: Request) {
  const session = await readSession(req);
  if (!session || session.role !== "super") {
    return NextResponse.json({ error: "无权限" }, { status: 403 });
  }

  const admins = await prisma.admin.findMany({
    orderBy: { createdAt: "desc" },
    select: { id: true, email: true, createdAt: true },
  });

  return NextResponse.json({
    admins,
    builtinEmail: process.env.ADMIN_EMAIL ?? null,
  });
}

// POST /api/super/admins  新增管理员
export async function POST(req: Request) {
  const session = await readSession(req);
  if (!session || session.role !== "super") {
    return NextResponse.json({ error: "无权限" }, { status: 403 });
  }

  const body = await req.json().catch(() => null);
  const parsed = adminAccountSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "参数不合法" },
      { status: 400 },
    );
  }
  if (!parsed.data.password) {
    return NextResponse.json({ error: "请设置管理员密码" }, { status: 400 });
  }

  const email = parsed.data.email;
  const exists = await prisma.admin.findUnique({ where: { email } });
  if (exists) {
    return NextResponse.json({ error: "该邮箱已经是管理员" }, { status: 409 });
  }

  const admin = await prisma.admin.create({
    data: {
      email,
      password: await bcrypt.hash(parsed.data.password, 10),
    },
    select: { id: true, email: true, createdAt: true },
  });

  return NextResponse.json({ ok: true, admin });
}

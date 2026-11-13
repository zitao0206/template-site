import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { readSession } from "@/lib/session";
import { registerSchema } from "@/lib/validators";

// GET /api/super/users  全部注册用户
export async function GET(req: Request) {
  const session = await readSession(req);
  if (!session || session.role !== "super") {
    return NextResponse.json({ error: "无权限" }, { status: 403 });
  }

  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      email: true,
      createdAt: true,
      _count: { select: { orders: true, addresses: true } },
    },
  });

  return NextResponse.json({
    users: users.map((u) => ({
      id: u.id,
      email: u.email,
      createdAt: u.createdAt,
      orderCount: u._count.orders,
      addressCount: u._count.addresses,
    })),
  });
}

// POST /api/super/users  新增注册用户（邮箱 + 密码）
export async function POST(req: Request) {
  const session = await readSession(req);
  if (!session || session.role !== "super") {
    return NextResponse.json({ error: "无权限" }, { status: 403 });
  }

  const body = await req.json().catch(() => null);
  const parsed = registerSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "参数不合法" },
      { status: 400 },
    );
  }

  const email = parsed.data.email;
  const exists = await prisma.user.findUnique({ where: { email } });
  if (exists) {
    return NextResponse.json({ error: "该邮箱已注册" }, { status: 409 });
  }

  const user = await prisma.user.create({
    data: {
      email,
      password: await bcrypt.hash(parsed.data.password, 10),
    },
    select: { id: true, email: true, createdAt: true },
  });

  return NextResponse.json({ ok: true, user });
}

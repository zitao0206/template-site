import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { loginSchema } from "@/lib/validators";
import { prisma } from "@/lib/prisma";
import { signSession } from "@/lib/jwt";
import { TOKEN_COOKIE } from "@/lib/session";

// POST /api/admin/login  管理员登录
// 1) 内置管理员：.env 里的 ADMIN_EMAIL + ADMIN_PASSWORD_HASH
// 2) 数据库管理员：超级管理员在后台添加的账号（Admin 表）
export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = loginSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "参数不合法" },
      { status: 400 },
    );
  }

  const { email, password } = parsed.data;
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminHash = process.env.ADMIN_PASSWORD_HASH;

  let ok = false;

  if (adminEmail && adminHash && email === adminEmail) {
    ok = await bcrypt.compare(password, adminHash);
  } else {
    const dbAdmin = await prisma.admin.findUnique({ where: { email } });
    if (dbAdmin) {
      ok = await bcrypt.compare(password, dbAdmin.password);
    }
  }

  if (!ok) {
    return NextResponse.json({ error: "账号或密码错误" }, { status: 401 });
  }

  const token = await signSession({ uid: null, email, role: "admin" });

  const res = NextResponse.json({ ok: true, email });
  res.cookies.set(TOKEN_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}

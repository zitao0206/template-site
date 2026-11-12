import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { loginSchema } from "@/lib/validators";
import { signSession } from "@/lib/jwt";
import { TOKEN_COOKIE } from "@/lib/session";

// POST /api/admin/login  管理员登录（账号密码写死在环境变量，不进数据库）
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

  if (!adminEmail || !adminHash) {
    return NextResponse.json(
      { error: "服务端未配置管理员账号，请先在 .env 填写 ADMIN_EMAIL / ADMIN_PASSWORD_HASH" },
      { status: 500 },
    );
  }

  // 邮箱不匹配直接拒绝；再比哈希
  if (email !== adminEmail) {
    return NextResponse.json({ error: "账号或密码错误" }, { status: 401 });
  }
  const ok = await bcrypt.compare(password, adminHash);
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

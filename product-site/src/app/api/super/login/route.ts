import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { superLoginSchema } from "@/lib/validators";
import { signSession } from "@/lib/jwt";
import { TOKEN_COOKIE } from "@/lib/session";

// POST /api/super/login  超级管理员登录（账号 super / 密码 456789，写在 .env）
export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = superLoginSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "参数不合法" },
      { status: 400 },
    );
  }

  const account = process.env.SUPER_ACCOUNT;
  const hash = process.env.SUPER_PASSWORD_HASH;
  if (!account || !hash) {
    return NextResponse.json(
      { error: "服务端未配置超级管理员账号" },
      { status: 500 },
    );
  }

  if (parsed.data.account !== account) {
    return NextResponse.json({ error: "账号或密码错误" }, { status: 401 });
  }
  const ok = await bcrypt.compare(parsed.data.password, hash);
  if (!ok) {
    return NextResponse.json({ error: "账号或密码错误" }, { status: 401 });
  }

  const token = await signSession({ uid: null, email: account, role: "super" });

  const res = NextResponse.json({ ok: true, account });
  res.cookies.set(TOKEN_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}

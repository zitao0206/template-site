import { NextResponse, type NextRequest } from "next/server";
import { createHash, timingSafeEqual } from "node:crypto";
import { signSession, sessionCookieOptions, ADMIN_COOKIE } from "@/lib/jwt";
import { jsonError } from "@/lib/api";

/** 定长比较，避免根据响应时间猜密码 */
function safeEqual(a: string, b: string) {
  const ha = createHash("sha256").update(a).digest();
  const hb = createHash("sha256").update(b).digest();
  return timingSafeEqual(ha, hb);
}

/**
 * 管理员账号密码写死在环境变量里（ADMIN_USERNAME / ADMIN_PASSWORD），
 * 不建表、不提供注册入口。改密码 = 改 .env.local 后重启。
 */
export async function POST(req: NextRequest) {
  const body = (await req.json().catch(() => null)) as {
    username?: string;
    password?: string;
  } | null;

  const username = body?.username?.trim() ?? "";
  const password = body?.password ?? "";

  if (!username || !password) {
    return jsonError("请输入账号和密码", 400);
  }

  const expectedUser = process.env.ADMIN_USERNAME ?? "admin";
  const expectedPass = process.env.ADMIN_PASSWORD ?? "";

  if (!expectedPass) {
    return jsonError("服务端未配置 ADMIN_PASSWORD", 500);
  }

  if (!safeEqual(username, expectedUser) || !safeEqual(password, expectedPass)) {
    return jsonError("账号或密码不正确", 401);
  }

  // 管理员令牌有效期短一些，12 小时
  const token = await signSession(
    { sub: "admin", email: expectedUser, role: "admin" },
    "12h"
  );

  const res = NextResponse.json({ ok: true, username: expectedUser });
  res.cookies.set(ADMIN_COOKIE, token, {
    ...sessionCookieOptions(),
    maxAge: 60 * 60 * 12,
  });
  return res;
}

import { NextResponse, type NextRequest } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { users } from "@/lib/schema";
import { verifyPassword } from "@/lib/password";
import { signSession, sessionCookieOptions, USER_COOKIE } from "@/lib/jwt";
import { loginSchema } from "@/lib/validation";
import { firstIssue, jsonError } from "@/lib/api";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const parsed = loginSchema.safeParse(body);
  if (!parsed.success) {
    return jsonError(firstIssue(parsed.error), 400);
  }

  const { email, password } = parsed.data;
  const user = db.select().from(users).where(eq(users.email, email)).get();

  // 用户不存在和密码错误返回同一句，避免暴露邮箱是否注册过
  if (!user || !verifyPassword(password, user.passwordHash)) {
    return jsonError("邮箱或密码不正确", 401);
  }

  const token = await signSession({ sub: user.id, email: user.email, role: "user" });
  const res = NextResponse.json({
    token,
    user: { id: user.id, email: user.email, displayName: user.displayName },
  });
  res.cookies.set(USER_COOKIE, token, sessionCookieOptions());
  return res;
}

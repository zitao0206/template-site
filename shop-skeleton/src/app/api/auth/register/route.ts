import { NextResponse, type NextRequest } from "next/server";
import { randomUUID } from "node:crypto";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { users } from "@/lib/schema";
import { hashPassword } from "@/lib/password";
import { signSession, sessionCookieOptions, USER_COOKIE } from "@/lib/jwt";
import { registerSchema } from "@/lib/validation";
import { firstIssue, jsonError } from "@/lib/api";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const parsed = registerSchema.safeParse(body);
  if (!parsed.success) {
    return jsonError(firstIssue(parsed.error), 400);
  }

  const { email, password, displayName } = parsed.data;

  const exists = db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.email, email))
    .get();
  if (exists) {
    return jsonError("该邮箱已注册，请直接登录", 409);
  }

  const user = {
    id: randomUUID(),
    email,
    passwordHash: hashPassword(password),
    displayName: displayName || null,
    createdAt: new Date(),
  };

  try {
    db.insert(users).values(user).run();
  } catch {
    // 并发注册时唯一索引会兜底
    return jsonError("该邮箱已注册，请直接登录", 409);
  }

  const token = await signSession({ sub: user.id, email, role: "user" });
  const res = NextResponse.json(
    {
      token,
      user: { id: user.id, email, displayName: user.displayName },
    },
    { status: 201 }
  );
  // 网页端用 Cookie 记住登录态；App 端直接保存 body 里的 token
  res.cookies.set(USER_COOKIE, token, sessionCookieOptions());
  return res;
}

import { SignJWT, jwtVerify } from "jose";

export type Role = "user" | "admin";

export type SessionPayload = {
  /** 用户 id；管理员固定为 "admin" */
  sub: string;
  email: string;
  role: Role;
};

export const USER_COOKIE = "user_token";
export const ADMIN_COOKIE = "admin_token";

export const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 天

/**
 * 这个文件同时被 middleware（Edge 运行时）和 Node 端引用，
 * 所以只能用 jose，不能引入 node:crypto 相关的东西。
 */
function getSecret() {
  const secret = process.env.AUTH_SECRET;
  if (!secret) {
    throw new Error("缺少环境变量 AUTH_SECRET，请检查 .env.local");
  }
  return new TextEncoder().encode(secret);
}

/** expiresIn 用 jose 的时长字符串，例如 "7d"、"12h" */
export async function signSession(payload: SessionPayload, expiresIn = "7d") {
  return new SignJWT({ email: payload.email, role: payload.role })
    .setSubject(payload.sub)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(getSecret());
}

export async function verifySession(
  token?: string | null
): Promise<SessionPayload | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, getSecret());
    if (typeof payload.sub !== "string") return null;
    if (typeof payload.email !== "string") return null;
    const role: Role = payload.role === "admin" ? "admin" : "user";
    return { sub: payload.sub, email: payload.email, role };
  } catch {
    return null;
  }
}

/** 统一的 Cookie 参数：网页端用它，App 端改用 Authorization: Bearer */
export function sessionCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    path: "/",
    maxAge: SESSION_MAX_AGE,
    secure: process.env.NODE_ENV === "production",
  };
}

import type { NextRequest } from "next/server";
import {
  ADMIN_COOKIE,
  USER_COOKIE,
  verifySession,
  type SessionPayload,
} from "./jwt";

/**
 * 同时支持两种鉴权方式：
 *  1. 网页端：httpOnly Cookie
 *  2. App / 第三方调用：Authorization: Bearer <token>
 * 这样同一套接口，Web 和未来的 App 都能用。
 */
async function resolveSession(
  req: NextRequest,
  cookieName: string
): Promise<SessionPayload | null> {
  const header = req.headers.get("authorization");
  if (header?.toLowerCase().startsWith("bearer ")) {
    const session = await verifySession(header.slice(7).trim());
    if (session) return session;
  }
  return verifySession(req.cookies.get(cookieName)?.value);
}

export async function getUserFromRequest(req: NextRequest) {
  const session = await resolveSession(req, USER_COOKIE);
  return session?.role === "user" ? session : null;
}

export async function getAdminFromRequest(req: NextRequest) {
  const session = await resolveSession(req, ADMIN_COOKIE);
  return session?.role === "admin" ? session : null;
}

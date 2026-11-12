import { cookies } from "next/headers";
import { verifySession, type SessionPayload } from "./jwt";

export const TOKEN_COOKIE = "token";

/**
 * 读当前会话。
 * 优先读 Authorization: Bearer xxx（给未来 iOS/Android App 用），
 * 没有再看网页的 httpOnly Cookie。
 */
export async function readSession(req?: Request): Promise<SessionPayload | null> {
  const bearer = req?.headers.get("authorization");
  if (bearer?.startsWith("Bearer ")) {
    return verifySession(bearer.slice(7));
  }

  const token = cookies().get(TOKEN_COOKIE)?.value;
  if (!token) return null;
  return verifySession(token);
}

/** 页面里用：拿当前登录用户 */
export async function getSession(): Promise<SessionPayload | null> {
  return readSession();
}

/** 判断是否是管理员（写死账号登录后会带上 role=admin） */
export async function isAdmin(req?: Request): Promise<boolean> {
  const s = await readSession(req);
  return s?.role === "admin";
}

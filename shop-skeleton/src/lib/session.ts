import { cookies } from "next/headers";
import {
  ADMIN_COOKIE,
  USER_COOKIE,
  verifySession,
  type SessionPayload,
} from "./jwt";

/** 供服务端组件 / Server Action 使用：读取当前登录用户 */
export async function getCurrentUser(): Promise<SessionPayload | null> {
  const store = await cookies();
  const session = await verifySession(store.get(USER_COOKIE)?.value);
  return session?.role === "user" ? session : null;
}

/** 供服务端组件使用：读取当前管理员 */
export async function getCurrentAdmin(): Promise<SessionPayload | null> {
  const store = await cookies();
  const session = await verifySession(store.get(ADMIN_COOKIE)?.value);
  return session?.role === "admin" ? session : null;
}

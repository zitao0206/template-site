import { NextResponse } from "next/server";
import { ADMIN_COOKIE, USER_COOKIE } from "@/lib/jwt";

export async function POST() {
  const res = NextResponse.json({ ok: true });
  // 两种身份一起清掉，网页端退出登录时不用关心当前是哪种角色
  res.cookies.set(USER_COOKIE, "", { path: "/", maxAge: 0 });
  res.cookies.set(ADMIN_COOKIE, "", { path: "/", maxAge: 0 });
  return res;
}

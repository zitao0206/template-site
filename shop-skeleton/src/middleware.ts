import { NextResponse, type NextRequest } from "next/server";
import { ADMIN_COOKIE, verifySession } from "@/lib/jwt";

/**
 * 只保护后台页面。接口层的权限在各自 route handler 里再校验一次，
 * 不能只依赖 middleware（接口可能被 App 或脚本直接调用）。
 */
export async function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;
  const token = req.cookies.get(ADMIN_COOKIE)?.value;
  const session = await verifySession(token);

  if (session?.role === "admin") {
    return NextResponse.next();
  }

  const loginUrl = new URL("/admin-login", req.url);
  loginUrl.searchParams.set("next", pathname + search);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};

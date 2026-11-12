import { NextResponse } from "next/server";
import { readSession } from "@/lib/session";

// GET /api/auth/me  当前会话（App 端带 Bearer token 也能用）
export async function GET(req: Request) {
  const session = await readSession(req);
  if (!session) {
    return NextResponse.json({ error: "未登录" }, { status: 401 });
  }
  return NextResponse.json({
    uid: session.uid,
    email: session.email,
    role: session.role,
  });
}

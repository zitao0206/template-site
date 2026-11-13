import { NextResponse, type NextRequest } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { users } from "@/lib/schema";
import { getUserFromRequest } from "@/lib/request-auth";
import { jsonError, UNAUTHORIZED } from "@/lib/api";

/** App 启动时可以用这个接口校验 token 是否还有效 */
export async function GET(req: NextRequest) {
  const session = await getUserFromRequest(req);
  if (!session) return jsonError(UNAUTHORIZED, 401);

  const user = db
    .select({
      id: users.id,
      email: users.email,
      displayName: users.displayName,
      createdAt: users.createdAt,
    })
    .from(users)
    .where(eq(users.id, session.sub))
    .get();

  if (!user) return jsonError("账号不存在", 401);
  return NextResponse.json({ user });
}

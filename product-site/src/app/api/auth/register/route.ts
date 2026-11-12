import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { registerSchema } from "@/lib/validators";

// POST /api/auth/register  用户邮箱注册
export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = registerSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "参数不合法" },
      { status: 400 },
    );
  }

  const { email, password } = parsed.data;

  const exists = await prisma.user.findUnique({ where: { email } });
  if (exists) {
    return NextResponse.json({ error: "该邮箱已注册" }, { status: 409 });
  }

  const hashed = await bcrypt.hash(password, 10);
  const user = await userDb.user.create({
    data: { email, password: hashed },
    select: { id: true, email: true, createdAt: true },
  });

  return NextResponse.json(user, { status: 201 });
}

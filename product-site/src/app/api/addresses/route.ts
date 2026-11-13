import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { readSession } from "@/lib/session";
import { addressSchema } from "@/lib/validators";

// GET /api/addresses  当前用户的收货地址列表
export async function GET(req: Request) {
  const session = await readSession(req);
  if (!session) {
    return NextResponse.json({ error: "未登录" }, { status: 401 });
  }
  const userId = session.uid;
  if (userId === null) {
    return NextResponse.json({ error: "管理员账号不支持收货地址" }, { status: 403 });
  }

  const addresses = await prisma.address.findMany({
    where: { userId: userId },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ addresses });
}

// POST /api/addresses  新增收货地址
export async function POST(req: Request) {
  const session = await readSession(req);
  if (!session) {
    return NextResponse.json({ error: "未登录" }, { status: 401 });
  }
  const userId = session.uid;
  if (userId === null) {
    return NextResponse.json({ error: "管理员账号不支持收货地址" }, { status: 403 });
  }

  const body = await req.json().catch(() => null);
  const parsed = addressSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "参数不合法" },
      { status: 400 },
    );
  }

  const { isDefault = false, ...data } = parsed.data;

  // 保证同一用户「有且仅有一条」默认地址：
  // - 勾选了设为默认 → 取消其他默认
  // - 列表为空 / 当前没有默认（首条地址）→ 自动设为默认
  const address = await prisma.$transaction(async (tx) => {
    const [total, defaultCount] = await Promise.all([
      tx.address.count({ where: { userId: userId } }),
      tx.address.count({ where: { userId: userId, isDefault: true } }),
    ]);

    const makeDefault = isDefault || total === 0 || defaultCount === 0;

    if (makeDefault) {
      await tx.address.updateMany({
        where: { userId: userId },
        data: { isDefault: false },
      });
    }

    return tx.address.create({
      data: { ...data, userId: userId, isDefault: makeDefault },
    });
  });

  return NextResponse.json({ ok: true, address }, { status: 201 });
}

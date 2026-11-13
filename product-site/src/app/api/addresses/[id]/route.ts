import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { readSession } from "@/lib/session";
import { addressSchema } from "@/lib/validators";

type Ctx = { params: { id: string } };

// PATCH /api/addresses/:id  编辑自己的收货地址（四项内容；默认标记不变）
export async function PATCH(req: Request, { params }: Ctx) {
  const session = await readSession(req);
  if (!session) {
    return NextResponse.json({ error: "未登录" }, { status: 401 });
  }
  const userId = session.uid;
  if (userId === null) {
    return NextResponse.json({ error: "管理员账号不支持收货地址" }, { status: 403 });
  }

  const id = Number(params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return NextResponse.json({ error: "id 不合法" }, { status: 400 });
  }

  const address = await prisma.address.findUnique({ where: { id } });
  if (!address || address.userId !== userId) {
    return NextResponse.json({ error: "地址不存在" }, { status: 404 });
  }

  const body = await req.json().catch(() => null);
  const parsed = addressSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "参数不合法" },
      { status: 400 },
    );
  }

  // isDefault 只允许“把本条设为默认”；取消默认交给“设置其他地址为默认”，避免出现零默认
  const { isDefault, ...data } = parsed.data;

  const updated = await prisma.$transaction(async (tx) => {
    if (isDefault) {
      await tx.address.updateMany({
        where: { userId, isDefault: true },
        data: { isDefault: false },
      });
      return tx.address.update({
        where: { id },
        data: { ...data, isDefault: true },
      });
    }
    return tx.address.update({ where: { id }, data });
  });

  return NextResponse.json({ ok: true, address: updated });
}

// DELETE /api/addresses/:id  删除自己的收货地址
export async function DELETE(req: Request, { params }: Ctx) {
  const session = await readSession(req);
  if (!session) {
    return NextResponse.json({ error: "未登录" }, { status: 401 });
  }
  const userId = session.uid;
  if (userId === null) {
    return NextResponse.json({ error: "管理员账号不支持收货地址" }, { status: 403 });
  }

  const id = Number(params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return NextResponse.json({ error: "id 不合法" }, { status: 400 });
  }

  const address = await prisma.address.findUnique({ where: { id } });
  // 不存在或不是本人的，都按“不存在”处理，避免泄露他人数据
  if (!address || address.userId !== userId) {
    return NextResponse.json({ error: "地址不存在" }, { status: 404 });
  }

  // 删掉默认地址时，自动把剩下最新的一条补为默认，保证列表始终有一条默认
  await prisma.$transaction(async (tx) => {
    await tx.address.delete({ where: { id } });

    if (address.isDefault) {
      const next = await tx.address.findFirst({
        where: { userId: userId },
        orderBy: { createdAt: "desc" },
      });
      if (next) {
        await tx.address.update({ where: { id: next.id }, data: { isDefault: true } });
      }
    }
  });

  return NextResponse.json({ ok: true });
}

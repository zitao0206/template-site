import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { readSession } from "@/lib/session";
import PayClient from "@/components/PayClient";
import { parseItemsParam, type PayLine } from "@/lib/order-items";

export const dynamic = "force-dynamic";

type Search = {
  orderNo?: string;
  items?: string; // 1:2,3:1（购物车结算与立即购买共用）
  productId?: string; // 老参数兼容
  quantity?: string;
  from?: string; // from=cart 表示购物车结算，只有它才清购物车
  addressId?: string; // 收货地址 id（从结算页带过来）
};

// GET /pay?orderNo=xxx&items=1:2,3:1  模拟收银台（V4.0 接真实支付）
export default async function PayPage({ searchParams }: { searchParams: Search }) {
  const orderNo = (searchParams.orderNo ?? "").trim();

  // 两种来源：购物车结算（from=cart） / 立即购买（productId + quantity 或仅 items）
  // 只有 from=cart 才在支付成功后清理购物车
  const fromCart = searchParams.from === "cart";
  let inputs = parseItemsParam(searchParams.items);

  if (inputs.length === 0) {
    const productId = Number(searchParams.productId);
    const rawQty = Number(searchParams.quantity);
    if (Number.isInteger(productId) && productId > 0) {
      inputs = [
        {
          productId,
          quantity: Number.isInteger(rawQty) && rawQty > 0 ? rawQty : 1,
        },
      ];
    }
  }

  if (!orderNo || inputs.length === 0) {
    redirect("/cart");
  }

  const back = `/pay?orderNo=${orderNo}&items=${inputs
    .map((i) => `${i.productId}:${i.quantity}`)
    .join(",")}${fromCart ? "&from=cart" : ""}`;

  const session = await readSession();
  if (!session) {
    redirect(`/login?redirect=${encodeURIComponent(back)}`);
  }
  const userId = session.uid;
  if (userId === null) {
    redirect("/admin");
  }

  const products = await prisma.product.findMany({
    where: { id: { in: inputs.map((i) => i.productId) } },
  });
  const productMap = new Map(products.map((p) => [p.id, p]));

  let adjusted = false;
  const lines: PayLine[] = [];
  for (const input of inputs) {
    const product = productMap.get(input.productId);
    // 已下架 / 售罄的条目直接从订单里剔除
    if (!product || product.status !== "PUBLISHED" || product.stock <= 0) {
      adjusted = true;
      continue;
    }
    const quantity = Math.min(input.quantity, product.stock);
    if (quantity < input.quantity) adjusted = true;
    lines.push({
      id: product.id,
      title: product.title,
      price: product.price,
      imageUrl: product.imageUrl,
      quantity,
    });
  }

  if (lines.length === 0) {
    redirect(fromCart ? "/cart" : "/products");
  }

  // 收货地址：优先用链接带来的 id，其次默认地址，再退回第一条
  const addresses = await prisma.address.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
  const wantedId = Number(searchParams.addressId);
  const validWanted = addresses.some((a) => a.id === wantedId) ? wantedId : null;
  const initialAddressId =
    validWanted ?? addresses.find((a) => a.isDefault)?.id ?? addresses[0]?.id ?? null;

  return (
    <PayClient
      orderNo={orderNo}
      lines={lines}
      buyerEmail={session.email}
      adjusted={adjusted}
      fromCart={fromCart}
      addresses={addresses.map((a) => ({
        id: a.id,
        name: a.name,
        phone: a.phone,
        zipCode: a.zipCode,
        detail: a.detail,
        isDefault: a.isDefault,
      }))}
      initialAddressId={initialAddressId}
    />
  );
}

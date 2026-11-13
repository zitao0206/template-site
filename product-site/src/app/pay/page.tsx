import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { readSession } from "@/lib/session";
import PayClient from "@/components/PayClient";
import { parseItemsParam, type PayLine } from "@/lib/order-items";

export const dynamic = "force-dynamic";

type Search = {
  orderNo?: string;
  items?: string; // 购物车结算：1:2,3:1
  productId?: string; // 立即购买兼容参数
  quantity?: string;
};

// GET /pay?orderNo=xxx&items=1:2,3:1  模拟收银台（V4.0 接真实支付）
export default async function PayPage({ searchParams }: { searchParams: Search }) {
  const orderNo = (searchParams.orderNo ?? "").trim();

  // 两种来源：购物车结算（items） / 立即购买（productId + quantity）
  let inputs = parseItemsParam(searchParams.items);
  const fromCart = inputs.length > 0;

  if (!fromCart) {
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
    .join(",")}`;

  const session = await readSession();
  if (!session) {
    redirect(`/login?redirect=${encodeURIComponent(back)}`);
  }
  if (session.role === "admin") {
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

  return (
    <PayClient
      orderNo={orderNo}
      lines={lines}
      buyerEmail={session.email}
      adjusted={adjusted}
      fromCart={fromCart}
    />
  );
}

// 订单行参数：URL 里用 items=1:2,3:1 表示「商品ID:数量」
// 下单页 / 收银台共用，避免各自解析写法不一致

export type OrderLineInput = { productId: number; quantity: number };

// 收银台展示用的订单行（已按库存校正过）
export type PayLine = {
  id: number;
  title: string;
  price: number; // 分
  imageUrl: string | null;
  quantity: number;
};

// 订单号：本地生成（V4.0 接入真实订单后改用服务端订单号）
export function makeOrderNo() {
  const d = new Date();
  const pad = (n: number, len = 2) => String(n).padStart(len, "0");
  return `ORD${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}${pad(
    d.getHours(),
  )}${pad(d.getMinutes())}${pad(d.getSeconds())}${pad(
    Math.floor(Math.random() * 1000),
    3,
  )}`;
}

export function buildItemsParam(
  lines: Array<{ productId: number; quantity: number }>,
): string {
  return lines.map((l) => `${l.productId}:${l.quantity}`).join(",");
}

export function parseItemsParam(raw: string | undefined | null): OrderLineInput[] {
  if (!raw) return [];

  const merged = new Map<number, number>();
  for (const seg of raw.split(",")) {
    const [idStr, qtyStr] = seg.split(":");
    const productId = Number(idStr);
    const quantity = Number(qtyStr);
    if (!Number.isInteger(productId) || productId <= 0) continue;
    const qty = Number.isInteger(quantity) && quantity > 0 ? quantity : 1;
    merged.set(productId, (merged.get(productId) ?? 0) + qty);
  }

  return [...merged.entries()].map(([productId, quantity]) => ({
    productId,
    quantity,
  }));
}

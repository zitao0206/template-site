"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { buildItemsParam, makeOrderNo } from "@/lib/order-items";

type Product = {
  id: number;
  title: string;
  price: number; // 分
  imageUrl: string | null;
  stock: number;
};

export default function CheckoutClient({
  product,
  initialQuantity,
}: {
  product: Product;
  initialQuantity: number;
}) {
  const router = useRouter();
  const [quantity, setQuantity] = useState(initialQuantity);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const soldOut = product.stock <= 0;
  const maxQty = Math.max(product.stock, 1);
  const total = product.price * quantity;

  const decrease = () => {
    setError("");
    setQuantity((q) => Math.max(1, q - 1));
  };

  const increase = () => {
    setError("");
    setQuantity((q) => Math.min(maxQty, q + 1));
  };

  const submitOrder = () => {
    if (soldOut) {
      setError("商品已售罄，无法下单");
      return;
    }
    if (quantity < 1 || quantity > product.stock) {
      setError(`数量需在 1 ~ ${product.stock} 之间`);
      return;
    }
    setSubmitting(true);
    const orderNo = makeOrderNo();
    const items = buildItemsParam([{ productId: product.id, quantity }]);
    router.push(`/pay?orderNo=${orderNo}&items=${items}`);
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <Link
        href={`/products/${product.id}`}
        className="text-sm text-gray-500 hover:text-gray-900"
      >
        ← 返回商品详情
      </Link>

      <div>
        <h1 className="text-xl font-semibold">确认订单</h1>
        <p className="mt-1 text-sm text-gray-500">
          核对商品与数量后提交订单，下一步进入收银台。
        </p>
      </div>

      {error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>
      )}

      <div className="card space-y-4">
        <div className="flex gap-4">
          <div className="h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-gray-100">
            {product.imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={product.imageUrl}
                alt={product.title}
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="flex h-full items-center justify-center text-xs text-gray-400">
                暂无图片
              </span>
            )}
          </div>
          <div className="min-w-0 flex-1">
            <Link
              href={`/products/${product.id}`}
              className="font-medium text-gray-900 hover:underline"
            >
              {product.title}
            </Link>
            <p className="mt-1 text-sm text-gray-500">
              单价 ¥{(product.price / 100).toFixed(2)}　库存 {product.stock} 件
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-gray-100 pt-4">
          <span className="text-sm text-gray-600">购买数量</span>
          <div className="flex items-center overflow-hidden rounded-lg border border-gray-300">
            <button
              type="button"
              onClick={decrease}
              disabled={soldOut || quantity <= 1}
              className="h-9 w-9 text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="减少数量"
            >
              −
            </button>
            <span className="w-12 border-x border-gray-300 py-1.5 text-center text-sm tabular-nums">
              {quantity}
            </span>
            <button
              type="button"
              onClick={increase}
              disabled={soldOut || quantity >= maxQty}
              className="h-9 w-9 text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="增加数量"
            >
              +
            </button>
          </div>
        </div>
      </div>

      <div className="card flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-sm text-gray-500">
          应付金额
          <span className="ml-2 text-2xl font-semibold text-red-600">
            ¥{(total / 100).toFixed(2)}
          </span>
        </div>
        <button
          type="button"
          onClick={submitOrder}
          disabled={soldOut || submitting}
          className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-red-500 px-8 py-2.5 text-sm font-medium text-white shadow-sm transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {soldOut ? "已售罄" : submitting ? "提交中…" : "提交订单"}
        </button>
      </div>

      <p className="text-xs text-gray-400">
        提示：V3.0 为预定下单流程，提交后会进入模拟收银台；真实支付与订单落库在 V4.0 接入。
      </p>
    </div>
  );
}

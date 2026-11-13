"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  productId: number;
  stock: number;
};

// 商品详情页：数量加减 + 加入购物车
export default function AddCartButton({ productId, stock }: Props) {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);

  const soldOut = stock <= 0;
  const maxQty = Math.max(stock, 1);

  const decrease = () => {
    setMessage(null);
    setQuantity((q) => Math.max(1, q - 1));
  };

  const increase = () => {
    setMessage(null);
    setQuantity((q) => Math.min(maxQty, q + 1));
  };

  async function addToCart() {
    setLoading(true);
    setMessage(null);
    try {
      const res = await fetch("/api/cart/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, quantity }),
      });
      const data = await res.json().catch(() => null);

      // 未登录：去登录，登录后回到当前商品页
      if (res.status === 401) {
        router.push(`/login?redirect=/products/${productId}`);
        return;
      }
      if (!res.ok) {
        setMessage({ ok: false, text: data?.error ?? "加入购物车失败" });
        return;
      }

      // 通知导航栏刷新角标
      window.dispatchEvent(new Event("cart:updated"));
      setMessage({
        ok: true,
        text: `已加入 ${quantity} 件，购物车共 ${data.quantity} 件`,
      });
      // 保留用户选择的数量，不重置为 1
    } catch {
      setMessage({ ok: false, text: "网络异常，请重试" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-3">
      {/* 数量选择：加在「加入购物车」按钮上方 */}
      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-600">数量</span>
        <div className="flex items-center overflow-hidden rounded-lg border border-gray-300">
          <button
            type="button"
            onClick={decrease}
            disabled={soldOut || loading || quantity <= 1}
            className="h-9 w-9 text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="减少数量"
          >
            −
          </button>
          <span className="w-10 border-x border-gray-300 py-1.5 text-center text-sm tabular-nums">
            {quantity}
          </span>
          <button
            type="button"
            onClick={increase}
            disabled={soldOut || loading || quantity >= maxQty}
            className="h-9 w-9 text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="增加数量"
          >
            +
          </button>
        </div>
        <span className="text-xs text-gray-400">
          {soldOut ? "暂无库存" : `库存 ${stock} 件`}
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={addToCart}
          disabled={soldOut || loading}
          className="btn-primary"
        >
          {loading ? "加入中…" : soldOut ? "已售罄" : "加入购物车"}
        </button>

        {message && (
          <span className={`text-xs ${message.ok ? "text-green-600" : "text-red-600"}`}>
            {message.text}
            {message.ok && (
              <>
                {" "}
                <button
                  type="button"
                  onClick={() => router.push("/cart")}
                  className="text-blue-600 underline"
                >
                  去购物车
                </button>
              </>
            )}
          </span>
        )}
      </div>
    </div>
  );
}

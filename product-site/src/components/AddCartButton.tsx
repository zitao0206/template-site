"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  productId: number;
  disabled?: boolean;
  disabledText?: string;
};

// 商品详情页的「加入购物车」按钮
export default function AddCartButton({
  productId,
  disabled = false,
  disabledText = "已售罄",
}: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);

  async function addToCart() {
    setLoading(true);
    setMessage(null);
    try {
      const res = await fetch("/api/cart/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
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
      setMessage({ ok: true, text: `已加入购物车，当前共 ${data.quantity} 件` });
    } catch {
      setMessage({ ok: false, text: "网络异常，请重试" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <button
        type="button"
        onClick={addToCart}
        disabled={disabled || loading}
        className="btn-primary"
      >
        {loading ? "加入中…" : disabled ? disabledText : "加入购物车"}
      </button>

      {message && (
        <span
          className={`text-xs ${message.ok ? "text-green-600" : "text-red-600"}`}
        >
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
  );
}

"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type CartItem = {
  id: number;
  quantity: number;
  product: {
    id: number;
    title: string;
    price: number; // 单位：分
    imageUrl: string | null;
    stock: number;
    status: string;
  };
};

export default function CartPage() {
  const router = useRouter();
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [pendingId, setPendingId] = useState<number | null>(null);

  const loadCart = async () => {
    try {
      const res = await fetch("/api/cart", { cache: "no-store" });
      if (res.status === 401) {
        // 未登录：去登录，登录后回到购物车
        router.push("/login?redirect=/cart");
        return;
      }
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        setError(data?.error ?? "加载购物车失败");
        setItems([]);
        return;
      }
      setItems(data.items ?? []);
    } catch {
      setError("网络异常，请刷新重试");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const changeQty = async (item: CartItem, quantity: number) => {
    setError("");
    setPendingId(item.id);
    try {
      const res = await fetch(`/api/cart/${item.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        setError(data?.error ?? "修改数量失败");
        return;
      }
      // 通知导航栏刷新角标，并重新拉列表（金额/合计一起更新）
      window.dispatchEvent(new Event("cart:updated"));
      await loadCart();
    } catch {
      setError("网络异常，请重试");
    } finally {
      setPendingId(null);
    }
  };

  const removeItem = async (item: CartItem) => {
    setError("");
    setPendingId(item.id);
    try {
      const res = await fetch(`/api/cart/${item.id}`, { method: "DELETE" });
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        setError(data?.error ?? "删除失败");
        return;
      }
      setItems((prev) => prev.filter((it) => it.id !== item.id));
      window.dispatchEvent(new Event("cart:updated"));
    } catch {
      setError("网络异常，请重试");
    } finally {
      setPendingId(null);
    }
  };

  // 只对已上架商品计算合计
  const totalCount = items
    .filter((it) => it.product.status === "PUBLISHED")
    .reduce((sum, it) => sum + it.quantity, 0);
  const totalPrice = items
    .filter((it) => it.product.status === "PUBLISHED")
    .reduce((sum, it) => sum + it.quantity * it.product.price, 0);

  if (loading) {
    return <p className="text-sm text-gray-500">正在加载购物车…</p>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-xl font-semibold">我的购物车</h1>
          <p className="mt-1 text-sm text-gray-500">
            购物车与当前登录账号绑定，共 {totalCount} 件商品。
          </p>
        </div>
        <Link href="/products" className="text-sm text-gray-500 hover:text-gray-900">
          继续购物 →
        </Link>
      </div>

      {error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>
      )}

      {items.length === 0 ? (
        <div className="card py-12 text-center">
          <p className="text-gray-500">购物车还是空的</p>
          <Link href="/products" className="btn-primary mt-4 inline-flex">
            去逛逛
          </Link>
        </div>
      ) : (
        <>
          <ul className="space-y-3">
            {items.map((item) => {
              const offline = item.product.status !== "PUBLISHED";
              const soldOut = item.product.stock <= 0;
              const busy = pendingId === item.id;

              return (
                <li key={item.id} className="card flex flex-col gap-4 sm:flex-row sm:items-center">
                  <Link
                    href={`/products/${item.product.id}`}
                    className="h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-gray-100"
                  >
                    {item.product.imageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={item.product.imageUrl}
                        alt={item.product.title}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span className="flex h-full items-center justify-center text-xs text-gray-400">
                        暂无图片
                      </span>
                    )}
                  </Link>

                  <div className="min-w-0 flex-1">
                    <Link
                      href={`/products/${item.product.id}`}
                      className="font-medium text-gray-900 hover:underline"
                    >
                      {item.product.title}
                    </Link>
                    <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-gray-500">
                      <span>单价 ¥{(item.product.price / 100).toFixed(2)}</span>
                      {offline && (
                        <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-500">
                          已下架
                        </span>
                      )}
                      {!offline && soldOut && (
                        <span className="rounded-full bg-red-50 px-2 py-0.5 text-xs text-red-600">
                          已售罄
                        </span>
                      )}
                      {!offline && !soldOut && item.quantity >= item.product.stock && (
                        <span className="text-xs text-gray-400">
                          已到库存上限
                        </span>
                      )}
                    </div>
                  </div>

                  {/* 数量加减 */}
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => changeQty(item, item.quantity - 1)}
                      disabled={busy || offline || item.quantity <= 1}
                      className="h-8 w-8 rounded-lg border border-gray-300 text-gray-700 disabled:opacity-40"
                      aria-label="减少数量"
                    >
                      −
                    </button>
                    <span className="w-8 text-center text-sm">{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() => changeQty(item, item.quantity + 1)}
                      disabled={
                        busy || offline || soldOut || item.quantity >= item.product.stock
                      }
                      className="h-8 w-8 rounded-lg border border-gray-300 text-gray-700 disabled:opacity-40"
                      aria-label="增加数量"
                    >
                      +
                    </button>
                  </div>

                  <div className="w-24 text-right text-sm font-semibold text-red-600">
                    ¥{((item.product.price * item.quantity) / 100).toFixed(2)}
                  </div>

                  <button
                    type="button"
                    onClick={() => removeItem(item)}
                    disabled={busy}
                    className="text-xs text-gray-400 hover:text-red-600 disabled:opacity-40"
                  >
                    删除
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="card flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-sm text-gray-500">
              共 {totalCount} 件，合计
              <span className="ml-2 text-lg font-semibold text-red-600">
                ¥{(totalPrice / 100).toFixed(2)}
              </span>
            </div>
            <button className="btn-primary" disabled title="下单功能后续版本开放">
              去结算（V2）
            </button>
          </div>
        </>
      )}
    </div>
  );
}

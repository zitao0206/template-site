"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { buildItemsParam, makeOrderNo } from "@/lib/order-items";

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

// 能否勾选参与下单：已上架 + 有库存 + 购物车数量没超过库存
function isSelectable(item: CartItem) {
  return (
    item.product.status === "PUBLISHED" &&
    item.product.stock > 0 &&
    item.quantity <= item.product.stock
  );
}

export default function CartPage() {
  const router = useRouter();
  const [items, setItems] = useState<CartItem[]>([]);
  const [selected, setSelected] = useState<Record<number, boolean>>({});
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
      const list: CartItem[] = data.items ?? [];
      setItems(list);
      // 新条目默认勾选；不可下单的（下架/售罄/库存不足）强制取消勾选
      setSelected((prev) => {
        const next: Record<number, boolean> = {};
        for (const it of list) {
          next[it.id] = isSelectable(it) ? (prev[it.id] ?? true) : false;
        }
        return next;
      });
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

  const toggleSelect = (item: CartItem) => {
    if (!isSelectable(item)) return;
    setSelected((prev) => ({ ...prev, [item.id]: !prev[item.id] }));
  };

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
      setSelected((prev) => {
        const next = { ...prev };
        delete next[item.id];
        return next;
      });
      window.dispatchEvent(new Event("cart:updated"));
    } catch {
      setError("网络异常，请重试");
    } finally {
      setPendingId(null);
    }
  };

  // 只统计已上架商品（导航栏角标同口径）
  const validItems = items.filter((it) => it.product.status === "PUBLISHED");
  const typeCount = validItems.length;
  const totalCount = validItems.reduce((sum, it) => sum + it.quantity, 0);

  // 下单合计只看勾选的商品
  const selectedItems = items.filter((it) => selected[it.id] && isSelectable(it));
  const selectedTypeCount = selectedItems.length;
  const selectedCount = selectedItems.reduce((sum, it) => sum + it.quantity, 0);
  const selectedPrice = selectedItems.reduce(
    (sum, it) => sum + it.quantity * it.product.price,
    0,
  );

  // 去结算：带上勾选的商品直接进收银台（购物车已确认过数量与金额）
  const goCheckout = () => {
    if (selectedItems.length === 0) return;
    const items = buildItemsParam(
      selectedItems.map((it) => ({
        productId: it.product.id,
        quantity: it.quantity,
      })),
    );
    router.push(`/pay?orderNo=${makeOrderNo()}&items=${items}&from=cart`);
  };

  if (loading) {
    return <p className="text-sm text-gray-500">正在加载购物车…</p>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-xl font-semibold">我的购物车</h1>
          <p className="mt-1 text-sm text-gray-500">
            购物车与当前登录账号绑定，共 {typeCount} 种商品、{totalCount} 件。
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
              const overStock =
                !offline && !soldOut && item.quantity > item.product.stock;
              const selectable = isSelectable(item);
              const busy = pendingId === item.id;
              const checked = Boolean(selected[item.id]);

              const disabledReason = offline
                ? "商品已下架，无法选择"
                : soldOut
                  ? "商品已售罄，无法选择"
                  : `库存不足（仅剩 ${item.product.stock} 件），暂不可选择`;

              return (
                <li
                  key={item.id}
                  className="card flex flex-col gap-4 sm:flex-row sm:items-center"
                >
                  {/* 最左侧：勾选框；下架/售罄/库存不足时灰掉不可点 */}
                  <div className="flex items-center justify-center">
                    <input
                      type="checkbox"
                      checked={checked}
                      disabled={!selectable || busy}
                      onChange={() => toggleSelect(item)}
                      aria-label={`选择 ${item.product.title}`}
                      title={selectable ? "勾选后可参与下单" : disabledReason}
                      className={`h-4 w-4 cursor-pointer accent-blue-600 disabled:cursor-not-allowed disabled:opacity-40 ${
                        selectable ? "" : "accent-gray-300"
                      }`}
                    />
                  </div>

                  <Link
                    href={`/products/${item.product.id}`}
                    className={`h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-gray-100 ${
                      selectable ? "" : "opacity-60"
                    }`}
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
                      {overStock && (
                        <span className="rounded-full bg-amber-50 px-2 py-0.5 text-xs text-amber-600">
                          库存不足，仅剩 {item.product.stock} 件
                        </span>
                      )}
                      {!offline &&
                        !soldOut &&
                        !overStock &&
                        item.quantity >= item.product.stock && (
                          <span className="text-xs text-gray-400">已到库存上限</span>
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

                  <div
                    className={`w-24 text-right text-sm font-semibold ${
                      selectable ? "text-red-600" : "text-gray-400"
                    }`}
                  >
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
              {selectedTypeCount > 0 ? (
                <>
                  已选 {selectedTypeCount} 种、{selectedCount} 件，合计
                  <span className="ml-2 text-lg font-semibold text-red-600">
                    ¥{(selectedPrice / 100).toFixed(2)}
                  </span>
                </>
              ) : (
                "请先勾选要下单的商品"
              )}
            </div>
            <button
              type="button"
              onClick={goCheckout}
              disabled={selectedTypeCount === 0}
              className="btn-primary disabled:cursor-not-allowed"
              title={selectedTypeCount > 0 ? "去结算并进入收银台" : "请先勾选商品"}
            >
              去结算（{selectedCount} 件）
            </button>
          </div>
        </>
      )}
    </div>
  );
}

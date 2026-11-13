"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { PayLine } from "@/lib/order-items";
import AddressPicker, { type PickerAddress } from "@/components/AddressPicker";

// 生成一个伪二维码矩阵（仅作演示，不承载真实支付信息）
function buildQrMatrix(seed: string, size = 21): boolean[][] {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h = Math.imul(h ^ seed.charCodeAt(i), 16777619) >>> 0;
  }

  const matrix: boolean[][] = [];
  for (let r = 0; r < size; r++) {
    const row: boolean[] = [];
    for (let c = 0; c < size; c++) {
      h = Math.imul(h ^ (h >>> 15), 2246822507) >>> 0;
      h ^= h >>> 13;
      row.push(((h >>> 16) & 1) === 1);
    }
    matrix.push(row);
  }

  // 三个定位角，让它看起来更像二维码
  const corners: Array<[number, number]> = [
    [0, 0],
    [0, size - 7],
    [size - 7, 0],
  ];
  for (const [fr, fc] of corners) {
    for (let r = 0; r < 7; r++) {
      for (let c = 0; c < 7; c++) {
        const ring = Math.max(Math.abs(r - 3), Math.abs(c - 3));
        matrix[fr + r][fc + c] = ring === 3 || ring <= 1;
      }
    }
  }
  return matrix;
}

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export default function PayClient({
  orderNo,
  lines,
  buyerEmail,
  adjusted,
  fromCart,
  addresses,
  initialAddressId,
}: {
  orderNo: string;
  lines: PayLine[];
  buyerEmail: string;
  adjusted: boolean;
  fromCart: boolean;
  addresses: PickerAddress[];
  initialAddressId: number | null;
}) {
  const [method, setMethod] = useState<"alipay" | "wechat">("alipay");
  const [left, setLeft] = useState(15 * 60);
  const [paid, setPaid] = useState(false);
  const [paying, setPaying] = useState(false);
  const [payError, setPayError] = useState("");
  const [addressId, setAddressId] = useState<number | null>(initialAddressId);

  const total = lines.reduce((sum, l) => sum + l.price * l.quantity, 0);
  const totalQty = lines.reduce((sum, l) => sum + l.quantity, 0);
  const matrix = useMemo(() => buildQrMatrix(orderNo), [orderNo]);

  useEffect(() => {
    if (paid) return;
    const timer = setInterval(() => {
      setLeft((v) => (v > 0 ? v - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [paid]);

  const expired = left <= 0;

  // 模拟支付：服务端扣库存 +（购物车来源）清已结算条目，成功后才进入成功态
  const confirmPay = async () => {
    if (expired || paying) return;
    if (!addressId) {
      setPayError("请先添加并选择收货地址");
      return;
    }
    setPaying(true);
    setPayError("");
    try {
      const res = await fetch("/api/orders/pay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderNo,
          fromCart,
          addressId,
          items: lines.map((l) => ({ productId: l.id, quantity: l.quantity })),
        }),
      });
      const data = await res.json().catch(() => null);

      if (!res.ok) {
        setPayError(data?.error ?? "支付失败，请重试");
        return;
      }

      // 库存与购物车都由服务端处理完了，这里只负责刷新角标和切成功态
      if (fromCart) {
        window.dispatchEvent(new Event("cart:updated"));
      }
      setPaid(true);
    } catch {
      setPayError("网络异常，支付未完成，请重试");
    } finally {
      setPaying(false);
    }
  };

  // 返回修改订单：购物车来源回购物车，立即购买回确认订单页
  const backToEditHref = fromCart
    ? "/cart"
    : `/checkout?productId=${lines[0].id}&quantity=${lines[0].quantity}`;

  // 取消支付：单商品回详情页，多商品回购物车
  const cancelHref =
    lines.length === 1 ? `/products/${lines[0].id}` : "/cart";

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">收银台</h1>
        <span className="text-sm text-gray-500">
          {paid ? "已完成" : expired ? "订单已超时" : `支付剩余 ${formatTime(left)}`}
        </span>
      </div>

      {paid ? (
        <div className="card space-y-4 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-50 text-2xl text-green-600">
            ✓
          </div>
          <div>
            <p className="text-lg font-semibold">模拟支付成功</p>
            <p className="mt-1 text-sm text-gray-500">
              订单号 {orderNo}　金额 ¥{(total / 100).toFixed(2)}
            </p>
          </div>
          <p className="rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-700">
            当前为演示收银台：订单已按所选收货地址落库，真实支付通道将在 V4.0 接入。
          </p>
          {fromCart && (
            <p className="text-xs text-gray-500">已把本次结算的商品从购物车移除。</p>
          )}
          <div className="flex flex-wrap items-center justify-center gap-3">
            {/* 订单已落库，这里给硬跳转，保证看到刚生成的订单 */}
            <a href="/orders" className="btn-primary">
              查看订单
            </a>
            {/* 支付后库存已变化：这里用原生 <a> 硬跳转，绕过 Next 客户端路由缓存，
                否则会拿到支付前的旧快照，详情页库存看起来没变 */}
            {lines.length === 1 && (
              <a href={`/products/${lines[0].id}`} className="btn-ghost">
                返回商品
              </a>
            )}
            {fromCart && (
              <a href="/cart" className="btn-ghost">
                返回购物车
              </a>
            )}
            <a href="/products" className="btn-ghost">
              继续购物
            </a>
          </div>
        </div>
      ) : (
        <>
          <AddressPicker
            initialAddresses={addresses}
            selectedId={addressId}
            onSelect={(id) => {
              setAddressId(id);
              setPayError("");
            }}
            manageHref={`/profile/addresses?from=${encodeURIComponent(
              `/pay?orderNo=${orderNo}&items=${lines
                .map((l) => `${l.id}:${l.quantity}`)
                .join(",")}${fromCart ? "&from=cart" : ""}`,
            )}`}
          />

          <div className="card space-y-1 text-center">
            <p className="text-sm text-gray-500">应付金额</p>
            <p className="text-3xl font-bold text-red-600">
              ¥{(total / 100).toFixed(2)}
            </p>
            <p className="text-xs text-gray-400">
              订单号 {orderNo}　{lines.length} 种、{totalQty} 件
            </p>
          </div>

          <div className="card space-y-4">
            {/* 商品清单 */}
            <div className="space-y-3">
              {lines.map((line) => (
                <div key={line.id} className="flex items-center gap-3">
                  <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                    {line.imageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={line.imageUrl}
                        alt={line.title}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span className="flex h-full items-center justify-center text-[10px] text-gray-400">
                        暂无图
                      </span>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm text-gray-900">{line.title}</p>
                    <p className="text-xs text-gray-500">
                      ¥{(line.price / 100).toFixed(2)} × {line.quantity}
                    </p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">
                    ¥{((line.price * line.quantity) / 100).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            {adjusted && (
              <p className="rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-700">
                部分商品库存有变动，已按实际库存调整数量或移除失效商品。
              </p>
            )}

            <div className="border-t border-gray-100 pt-3">
              <p className="truncate text-xs text-gray-400">下单账号：{buyerEmail}</p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {[
                { key: "alipay" as const, label: "支付宝", color: "text-blue-600" },
                { key: "wechat" as const, label: "微信支付", color: "text-green-600" },
              ].map((item) => (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => setMethod(item.key)}
                  className={`flex items-center justify-between rounded-xl border px-4 py-3 text-sm transition ${
                    method === item.key
                      ? "border-orange-500 bg-orange-50"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  }`}
                >
                  <span className={item.color}>{item.label}</span>
                  <span
                    className={`flex h-4 w-4 items-center justify-center rounded-full border ${
                      method === item.key
                        ? "border-orange-500 bg-orange-500 text-[10px] text-white"
                        : "border-gray-300"
                    }`}
                  >
                    {method === item.key ? "✓" : ""}
                  </span>
                </button>
              ))}
            </div>

            {expired ? (
              <div className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
                二维码已失效，请返回重新下单。
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2 rounded-xl bg-gray-50 py-5">
                <svg
                  viewBox="0 0 21 21"
                  className="h-40 w-40"
                  shapeRendering="crispEdges"
                  aria-label="模拟支付二维码"
                >
                  <rect width="21" height="21" fill="#ffffff" />
                  {matrix.map((row, r) =>
                    row.map((on, c) =>
                      on ? (
                        <rect
                          key={`${r}-${c}`}
                          x={c}
                          y={r}
                          width="1"
                          height="1"
                          fill="#111827"
                        />
                      ) : null,
                    ),
                  )}
                </svg>
                <p className="text-xs text-gray-500">
                  请使用{method === "alipay" ? "支付宝" : "微信"}扫码支付（演示二维码）
                </p>
              </div>
            )}

            {payError && (
              <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
                {payError}
              </p>
            )}

            <button
              type="button"
              onClick={confirmPay}
              disabled={expired || paying}
              className="inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-red-500 px-6 py-2.5 text-sm font-medium text-white shadow-sm transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {expired
                ? "订单已超时"
                : paying
                  ? "处理中…"
                  : `确认支付 ¥${(total / 100).toFixed(2)}`}
            </button>

            <p className="text-center text-xs text-gray-400">
              V3.0 演示收银台：点击支付会模拟成功，同时按订单数量扣减库存。
            </p>
          </div>

          <div className="flex items-center justify-between text-sm">
            <Link href={backToEditHref} className="text-gray-500 hover:text-gray-900">
              ← 返回修改订单
            </Link>
            <Link href={cancelHref} className="text-gray-500 hover:text-gray-900">
              取消支付
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

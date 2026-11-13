"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { orderStatusText } from "@/lib/order-status";

type Panel = "cancel" | "ship" | null;

export default function AdminOrderActions({
  orderId,
  status,
}: {
  orderId: number;
  status: string;
}) {
  const router = useRouter();
  const [panel, setPanel] = useState<Panel>(null);
  const [reason, setReason] = useState("");
  const [trackingNo, setTrackingNo] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const send = async (body: Record<string, unknown>) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/admin/orders/${orderId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        setError(data?.error ?? "操作失败，请重试");
        return;
      }
      setPanel(null);
      setReason("");
      setTrackingNo("");
      router.refresh();
    } catch {
      setError("网络异常，请重试");
    } finally {
      setLoading(false);
    }
  };

  const canCancel = status === "PENDING" || status === "PROCESSING";

  return (
    <div className="card space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm font-medium text-gray-900">订单处理</p>
        <span className="text-xs text-gray-400">
          当前状态：{orderStatusText(status)}
        </span>
      </div>

      {(status === "COMPLETED" || status === "CANCELLED") && (
        <p className="text-sm text-gray-500">
          该订单当前为「{orderStatusText(status)}」，不能再做处理。
        </p>
      )}

      {status === "SHIPPED" && (
        <p className="text-sm text-gray-500">已发货，等待用户确认收货。</p>
      )}

      {(status === "PENDING" || status === "PROCESSING") && (
        <div className="flex flex-wrap items-center gap-2">
          {status === "PENDING" && (
            <button
              type="button"
              onClick={() => send({ action: "accept" })}
              disabled={loading}
              className="btn-primary"
            >
              接单（转处理中）
            </button>
          )}
          {status === "PROCESSING" && (
            <button
              type="button"
              onClick={() => {
                setPanel(panel === "ship" ? null : "ship");
                setError("");
              }}
              className="btn-primary"
            >
              发货
            </button>
          )}
          {canCancel && (
            <button
              type="button"
              onClick={() => {
                setPanel(panel === "cancel" ? null : "cancel");
                setError("");
              }}
              className="btn-ghost"
            >
              取消订单
            </button>
          )}
        </div>
      )}

      {panel === "ship" && (
        <div className="space-y-2 rounded-lg bg-gray-50 p-3">
          <label className="block space-y-1 text-sm">
            <span className="text-gray-600">发货单号</span>
            <input
              className="input"
              value={trackingNo}
              onChange={(e) => {
                setTrackingNo(e.target.value);
                setError("");
              }}
              placeholder="如：SF1234567890"
              maxLength={40}
            />
          </label>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => send({ action: "ship", trackingNo })}
              disabled={loading}
              className="btn-primary"
            >
              {loading ? "提交中…" : "确认发货"}
            </button>
            <button
              type="button"
              onClick={() => setPanel(null)}
              className="btn-ghost"
            >
              取消
            </button>
          </div>
        </div>
      )}

      {panel === "cancel" && (
        <div className="space-y-2 rounded-lg bg-red-50/60 p-3">
          <label className="block space-y-1 text-sm">
            <span className="text-gray-600">取消原因（用户可见）</span>
            <textarea
              className="input min-h-[72px] resize-y"
              value={reason}
              onChange={(e) => {
                setReason(e.target.value);
                setError("");
              }}
              placeholder="如：该商品临时缺货，已为您退款"
              maxLength={100}
            />
          </label>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => send({ action: "cancel", reason })}
              disabled={loading}
              className="btn-primary"
            >
              {loading ? "提交中…" : "确认取消并通知用户"}
            </button>
            <button
              type="button"
              onClick={() => setPanel(null)}
              className="btn-ghost"
            >
              返回
            </button>
          </div>
          <p className="text-xs text-gray-500">
            取消后该订单库存会自动退回，用户端订单显示为灰色。
          </p>
        </div>
      )}

      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}

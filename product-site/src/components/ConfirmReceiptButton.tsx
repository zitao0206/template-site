"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ConfirmReceiptButton({ orderId }: { orderId: number }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const confirm = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/orders/${orderId}/confirm`, { method: "POST" });
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        setError(data?.error ?? "操作失败，请重试");
        return;
      }
      router.refresh();
    } catch {
      setError("网络异常，请重试");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-1">
      <button
        type="button"
        onClick={confirm}
        disabled={loading}
        className="btn-primary"
      >
        {loading ? "提交中…" : "确认收货"}
      </button>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}

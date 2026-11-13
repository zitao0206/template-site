"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeleteProductButton({
  id,
  title,
}: {
  id: string;
  title: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function onClick() {
    if (!window.confirm(`确定删除「${title}」吗？此操作不可撤销。`)) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        window.alert(data.error ?? "删除失败");
        return;
      }
      router.refresh();
    } catch {
      window.alert("网络异常，请稍后重试");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button className="btn btn-danger" onClick={onClick} disabled={loading}>
      {loading ? "删除中…" : "删除"}
    </button>
  );
}

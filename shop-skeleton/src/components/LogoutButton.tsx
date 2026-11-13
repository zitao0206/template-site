"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LogoutButton({ label = "退出" }: { label?: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function onClick() {
    setLoading(true);
    await fetch("/api/auth/logout", { method: "POST" });
    router.refresh();
    router.push("/");
    setLoading(false);
  }

  return (
    <button className="btn btn-outline" onClick={onClick} disabled={loading}>
      {loading ? "退出中…" : label}
    </button>
  );
}

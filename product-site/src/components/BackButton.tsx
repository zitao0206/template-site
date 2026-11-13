"use client";

import { useRouter } from "next/navigation";

// 「← 返回」：单纯返回上一页（浏览器历史），不跳到固定列表
export default function BackButton({ fallback = "/products" }: { fallback?: string }) {
  const router = useRouter();

  const goBack = () => {
    // 有来源页就回退；直接打开详情页（没有历史）时退到 fallback
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push(fallback);
    }
  };

  return (
    <button
      type="button"
      onClick={goBack}
      className="text-sm text-gray-500 hover:text-gray-900"
    >
      ← 返回
    </button>
  );
}

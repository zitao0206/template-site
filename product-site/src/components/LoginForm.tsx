"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

type Mode = "user" | "admin" | "super";

export default function LoginForm({ mode }: { mode: Mode }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // 页面挂载时，读取url里的email自动填充
  useEffect(() => {
    const prefillEmail = searchParams.get("email");
    if (prefillEmail) {
      setEmail(prefillEmail);
    }
  }, [searchParams]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const url =
        mode === "super"
          ? "/api/super/login"
          : mode === "admin"
            ? "/api/admin/login"
            : "/api/auth/login";
      const payload =
        mode === "super" ? { account: email, password } : { email, password };
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "登录失败");
        return;
      }
      window.dispatchEvent(new Event("auth:updated"));
      // 支持 ?redirect=/cart 这类内部跳转（只允许站内路径，防开放重定向）
      const rawRedirect = searchParams.get("redirect");
      const safeRedirect =
        rawRedirect && rawRedirect.startsWith("/") && !rawRedirect.startsWith("//")
          ? rawRedirect
          : null;
      // 普通用户登录成功后直接落在首页的商品列表（最新上架）
      const home = mode === "super" ? "/super" : mode === "admin" ? "/admin" : "/";
      router.push(safeRedirect ?? home);
      router.refresh();
    } catch {
      setError("网络异常，请重试");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className="mb-1 block text-sm text-gray-600">
          {mode === "super" ? "账号" : "邮箱"}
        </label>
        <input
          className="input"
          type={mode === "super" ? "text" : "email"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={
            mode === "super"
              ? "超级管理员账号"
              : mode === "admin"
                ? "管理员邮箱"
                : "you@example.com"
          }
          required
        />
      </div>
      <div>
        <label className="mb-1 block text-sm text-gray-600">密码</label>
        <input
          className="input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={mode === "super" ? "超级管理员密码" : "至少 6 位"}
          required
        />
      </div>

      {error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>
      )}

      <button className="btn-primary w-full" disabled={loading}>
        {loading ? "登录中…" : "登录"}
      </button>
    </form>
  );
}

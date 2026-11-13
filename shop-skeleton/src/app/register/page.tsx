"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    displayName: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function update(key: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError("");

    if (form.password !== form.confirm) {
      setError("两次输入的密码不一致");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
          displayName: form.displayName || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "注册失败");
        return;
      }
      router.push("/");
      router.refresh();
    } catch {
      setError("网络异常，请稍后重试");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto mt-10 max-w-sm">
      <h1 className="text-xl font-semibold">注册</h1>
      <p className="mt-1 text-sm text-gray-500">第一版仅支持邮箱注册</p>

      <form onSubmit={onSubmit} className="card mt-5 space-y-4 p-6">
        <div>
          <label className="label" htmlFor="displayName">
            昵称（可选）
          </label>
          <input
            id="displayName"
            className="input"
            value={form.displayName}
            onChange={(e) => update("displayName", e.target.value)}
            placeholder="怎么称呼你"
            maxLength={40}
          />
        </div>
        <div>
          <label className="label" htmlFor="email">
            邮箱
          </label>
          <input
            id="email"
            className="input"
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            placeholder="you@example.com"
            required
          />
        </div>
        <div>
          <label className="label" htmlFor="password">
            密码
          </label>
          <input
            id="password"
            className="input"
            type="password"
            autoComplete="new-password"
            value={form.password}
            onChange={(e) => update("password", e.target.value)}
            placeholder="至少 6 位"
            required
          />
        </div>
        <div>
          <label className="label" htmlFor="confirm">
            确认密码
          </label>
          <input
            id="confirm"
            className="input"
            type="password"
            autoComplete="new-password"
            value={form.confirm}
            onChange={(e) => update("confirm", e.target.value)}
            placeholder="再输一次"
            required
          />
        </div>

        {error && <div className="alert">{error}</div>}

        <button className="btn btn-primary w-full" disabled={loading}>
          {loading ? "注册中…" : "注册并登录"}
        </button>

        <p className="text-center text-sm text-gray-500">
          已有账号？
          <Link href="/login" className="ml-1 text-blue-700 hover:underline">
            去登录
          </Link>
        </p>
      </form>
    </div>
  );
}

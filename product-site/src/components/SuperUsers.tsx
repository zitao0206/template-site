"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type UserRow = {
  id: number;
  email: string;
  createdAt: string;
  orderCount: number;
  addressCount: number;
};

function formatTime(iso: string) {
  return new Date(iso).toLocaleString("zh-CN", { hour12: false });
}

export default function SuperUsers({ users }: { users: UserRow[] }) {
  const router = useRouter();
  const [creating, setCreating] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<number | null>(null);
  const [listError, setListError] = useState("");

  const openCreate = () => {
    setCreating(true);
    setEmail("");
    setPassword("");
    setError("");
  };

  const create = async () => {
    setSaving(true);
    setError("");
    try {
      const res = await fetch("/api/super/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        setError(data?.error ?? "创建失败");
        return;
      }
      setCreating(false);
      router.refresh();
    } catch {
      setError("网络异常，请重试");
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id: number) => {
    setListError("");
    try {
      const res = await fetch(`/api/super/users/${id}`, { method: "DELETE" });
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        setListError(data?.error ?? "删除失败");
        return;
      }
      setConfirmDelete(null);
      router.refresh();
    } catch {
      setListError("网络异常，请重试");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">注册用户（{users.length}）</p>
        <button type="button" onClick={openCreate} className="btn-primary">
          新增用户
        </button>
      </div>

      {listError && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{listError}</p>
      )}

      {users.length === 0 ? (
        <div className="card text-sm text-gray-500">还没有注册用户。</div>
      ) : (
        <div className="card overflow-x-auto p-0">
          <table className="w-full min-w-[640px] text-sm">
            <thead className="bg-gray-50 text-left text-xs text-gray-500">
              <tr>
                <th className="px-4 py-3">邮箱</th>
                <th className="px-4 py-3">用户 ID</th>
                <th className="px-4 py-3">注册时间</th>
                <th className="px-4 py-3">订单数</th>
                <th className="px-4 py-3">地址数</th>
                <th className="px-4 py-3 text-right">操作</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-t border-gray-100">
                  <td className="px-4 py-3 text-gray-900">{u.email}</td>
                  <td className="px-4 py-3 font-mono text-xs text-gray-500">{u.id}</td>
                  <td className="px-4 py-3 text-gray-500">{formatTime(u.createdAt)}</td>
                  <td className="px-4 py-3 text-gray-700">{u.orderCount}</td>
                  <td className="px-4 py-3 text-gray-700">{u.addressCount}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-3">
                      <Link
                        href={`/super/users/${u.id}`}
                        className="text-gray-500 hover:text-gray-900"
                      >
                        查看
                      </Link>
                      {confirmDelete === u.id ? (
                        <>
                          <button
                            type="button"
                            onClick={() => remove(u.id)}
                            className="text-red-600 hover:underline"
                          >
                            确认删除
                          </button>
                          <button
                            type="button"
                            onClick={() => setConfirmDelete(null)}
                            className="text-gray-400 hover:text-gray-700"
                          >
                            取消
                          </button>
                        </>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setConfirmDelete(u.id)}
                          className="text-gray-500 hover:text-red-600"
                        >
                          删除
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {creating && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-5 shadow-xl">
            <h2 className="text-base font-semibold">新增用户</h2>
            <div className="mt-4 space-y-3">
              <label className="block space-y-1 text-sm">
                <span className="text-gray-600">邮箱</span>
                <input
                  className="input"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                  placeholder="user@example.com"
                />
              </label>
              <label className="block space-y-1 text-sm">
                <span className="text-gray-600">密码</span>
                <input
                  className="input"
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                  placeholder="至少 6 位"
                />
              </label>
            </div>
            {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
            <div className="mt-5 flex items-center justify-end gap-2">
              <button type="button" onClick={() => setCreating(false)} className="btn-ghost">
                取消
              </button>
              <button type="button" onClick={create} disabled={saving} className="btn-primary">
                {saving ? "创建中…" : "创建"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

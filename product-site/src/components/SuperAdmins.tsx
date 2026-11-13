"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type AdminRow = { id: number; email: string; createdAt: string };

type Editing = null | { id: number; email: string } | "create";

function formatTime(iso: string) {
  return new Date(iso).toLocaleString("zh-CN", { hour12: false });
}

export default function SuperAdmins({
  admins,
  builtinEmail,
}: {
  admins: AdminRow[];
  builtinEmail: string;
}) {
  const router = useRouter();
  const [editing, setEditing] = useState<Editing>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<number | null>(null);
  const [listError, setListError] = useState("");

  const openCreate = () => {
    setEditing("create");
    setEmail("");
    setPassword("");
    setError("");
  };

  const openEdit = (row: AdminRow) => {
    setEditing({ id: row.id, email: row.email });
    setEmail(row.email);
    setPassword("");
    setError("");
  };

  const close = () => {
    setEditing(null);
    setError("");
  };

  const save = async () => {
    setSaving(true);
    setError("");
    try {
      const isCreate = editing === "create";
      const res = await fetch(
        isCreate ? "/api/super/admins" : `/api/super/admins/${(editing as { id: number }).id}`,
        {
          method: isCreate ? "POST" : "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password: password || undefined }),
        },
      );
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        setError(data?.error ?? "保存失败");
        return;
      }
      close();
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
      const res = await fetch(`/api/super/admins/${id}`, { method: "DELETE" });
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
        <div>
          <p className="text-sm text-gray-500">
            管理员账号（{admins.length + 1}，含 1 个内置账号）
          </p>
          <p className="mt-1 text-xs text-gray-400">
            内置管理员来自 .env，这里不能改；新增的账号可以编辑和删除。
          </p>
        </div>
        <button type="button" onClick={openCreate} className="btn-primary">
          新增管理员
        </button>
      </div>

      {listError && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{listError}</p>
      )}

      <ul className="space-y-3">
        {/* 内置管理员：只读 */}
        <li className="card flex flex-wrap items-center justify-between gap-2">
          <div>
            <p className="text-sm font-medium text-gray-900">
              {builtinEmail}
              <span className="ml-2 rounded bg-blue-50 px-1.5 py-0.5 text-xs text-blue-600">
                内置
              </span>
            </p>
            <p className="mt-1 text-xs text-gray-400">来自 .env，不可编辑/删除</p>
          </div>
        </li>

        {admins.map((row) => (
          <li
            key={row.id}
            className="card flex flex-wrap items-center justify-between gap-2"
          >
            <div>
              <p className="text-sm font-medium text-gray-900">{row.email}</p>
              <p className="mt-1 text-xs text-gray-400">
                创建于 {formatTime(row.createdAt)}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => openEdit(row)}
                className="text-sm text-gray-500 hover:text-gray-900"
              >
                编辑
              </button>
              {confirmDelete === row.id ? (
                <>
                  <button
                    type="button"
                    onClick={() => remove(row.id)}
                    className="text-sm text-red-600 hover:underline"
                  >
                    确认删除
                  </button>
                  <button
                    type="button"
                    onClick={() => setConfirmDelete(null)}
                    className="text-sm text-gray-400 hover:text-gray-700"
                  >
                    取消
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => setConfirmDelete(row.id)}
                  className="text-sm text-gray-500 hover:text-red-600"
                >
                  删除
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>

      {editing !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-5 shadow-xl">
            <h2 className="text-base font-semibold">
              {editing === "create" ? "新增管理员" : "编辑管理员"}
            </h2>

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
                  placeholder="admin2@example.com"
                />
              </label>
              <label className="block space-y-1 text-sm">
                <span className="text-gray-600">
                  密码{editing === "create" ? "" : "（留空则不改）"}
                </span>
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
              <button type="button" onClick={close} className="btn-ghost">
                取消
              </button>
              <button type="button" onClick={save} disabled={saving} className="btn-primary">
                {saving ? "保存中…" : "保存"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

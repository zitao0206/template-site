"use client";

import { useState } from "react";

type Address = {
  id: number;
  name: string;
  phone: string;
  zipCode: string;
  detail: string;
  isDefault: boolean;
};

type FormState = {
  name: string;
  phone: string;
  zipCode: string;
  detail: string;
  isDefault: boolean;
};

type ModalState =
  | { mode: "create" }
  | { mode: "edit"; id: number; wasDefault: boolean }
  | null;

const emptyForm: FormState = {
  name: "",
  phone: "",
  zipCode: "",
  detail: "",
  isDefault: false,
};

export default function AddressManager({
  initialAddresses,
}: {
  initialAddresses: Address[];
}) {
  const [addresses, setAddresses] = useState<Address[]>(initialAddresses);
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  // 弹窗：新增 / 编辑共用一套表单
  const [modal, setModal] = useState<ModalState>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const setField =
    (key: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = e.target.value;
      setForm((prev) => ({ ...prev, [key]: value }));
      setFormError(null);
    };

  // 增删改后统一从服务端取一次列表，默认地址归属以服务端为准
  const reload = async () => {
    const res = await fetch("/api/addresses", { cache: "no-store" });
    if (!res.ok) return;
    const data = await res.json().catch(() => null);
    if (data?.addresses) setAddresses(data.addresses);
  };

  const openCreate = () => {
    setForm(emptyForm);
    setFormError(null);
    setModal({ mode: "create" });
  };

  const openEdit = (address: Address) => {
    setForm({
      name: address.name,
      phone: address.phone,
      zipCode: address.zipCode,
      detail: address.detail,
      isDefault: address.isDefault,
    });
    setFormError(null);
    setModal({ mode: "edit", id: address.id, wasDefault: address.isDefault });
  };

  const closeModal = () => {
    if (submitting) return;
    setModal(null);
    setFormError(null);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!modal) return;
    setSubmitting(true);
    setFormError(null);

    try {
      const isCreate = modal.mode === "create";
      const res = await fetch(
        isCreate ? "/api/addresses" : `/api/addresses/${modal.id}`,
        {
          method: isCreate ? "POST" : "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        },
      );
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        setFormError(data?.error ?? "保存失败，请重试");
        return;
      }

      await reload();
      setModal(null);
      setMessage({
        ok: true,
        text: isCreate
          ? data?.address?.isDefault
            ? "地址已保存，并设为默认地址"
            : "地址已保存"
          : "地址已更新",
      });
    } catch {
      setFormError("网络异常，请重试");
    } finally {
      setSubmitting(false);
    }
  };

  const removeAddress = async (id: number) => {
    setDeletingId(id);
    setMessage(null);
    try {
      const res = await fetch(`/api/addresses/${id}`, { method: "DELETE" });
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        setMessage({ ok: false, text: data?.error ?? "删除失败，请重试" });
        return;
      }
      await reload();
      setMessage({ ok: true, text: "地址已删除" });
    } catch {
      setMessage({ ok: false, text: "网络异常，请重试" });
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-4">
      {/* 列表头：条数 + 添加地址按钮 */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">已保存的地址（{addresses.length}）</p>
        <button type="button" onClick={openCreate} className="btn-primary">
          添加地址
        </button>
      </div>

      {message && (
        <p className={`text-sm ${message.ok ? "text-green-600" : "text-red-600"}`}>
          {message.text}
        </p>
      )}

      {addresses.length === 0 ? (
        <div className="card text-sm text-gray-500">
          还没有收货地址，点击「添加地址」新增一条。
        </div>
      ) : (
        <ul className="space-y-3">
          {addresses.map((address) => (
            <li key={address.id} className="card space-y-2">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center text-sm font-medium text-gray-900">
                  {address.name}
                  <span className="ml-2 font-normal text-gray-500">{address.phone}</span>
                  {address.isDefault && (
                    <span className="ml-2 rounded-full bg-blue-50 px-1.5 py-0.5 text-xs font-normal text-blue-600">
                      默认
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => openEdit(address)}
                    className="text-xs text-gray-400 transition hover:text-blue-600"
                  >
                    编辑
                  </button>
                  <button
                    type="button"
                    onClick={() => removeAddress(address.id)}
                    disabled={deletingId === address.id}
                    className="text-xs text-gray-400 transition hover:text-red-600 disabled:opacity-40"
                  >
                    {deletingId === address.id ? "删除中…" : "删除"}
                  </button>
                </div>
              </div>
              <p className="text-sm text-gray-600">{address.detail}</p>
              <p className="text-xs text-gray-400">邮编 {address.zipCode}</p>
            </li>
          ))}
        </ul>
      )}

      {/* 新增 / 编辑弹窗 */}
      {modal && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/40 p-4 sm:items-center"
          onClick={closeModal}
        >
          <form
            onSubmit={submit}
            onClick={(e) => e.stopPropagation()}
            className="card w-full max-w-lg space-y-3 bg-white"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold">
                {modal.mode === "create" ? "新增收货地址" : "编辑收货地址"}
              </h2>
              <button
                type="button"
                onClick={closeModal}
                aria-label="关闭"
                className="rounded p-1 text-lg leading-none text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
              >
                ×
              </button>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <label className="space-y-1 text-sm">
                <span className="text-gray-600">收件人姓名</span>
                <input
                  className="input"
                  value={form.name}
                  onChange={setField("name")}
                  placeholder="如：张三"
                  maxLength={20}
                  autoFocus
                />
              </label>

              <label className="space-y-1 text-sm">
                <span className="text-gray-600">联系电话</span>
                <input
                  className="input"
                  value={form.phone}
                  onChange={setField("phone")}
                  placeholder="11 位手机号"
                  maxLength={11}
                  inputMode="numeric"
                />
              </label>
            </div>

            <label className="block space-y-1 text-sm">
              <span className="text-gray-600">邮政编码</span>
              <input
                className="input"
                value={form.zipCode}
                onChange={setField("zipCode")}
                placeholder="6 位数字"
                maxLength={6}
                inputMode="numeric"
              />
            </label>

            <label className="block space-y-1 text-sm">
              <span className="text-gray-600">详细地址</span>
              <textarea
                className="input min-h-[72px] resize-y"
                value={form.detail}
                onChange={setField("detail")}
                placeholder="省 / 市 / 区 + 街道门牌号"
                maxLength={120}
              />
            </label>

            <label className="flex items-center gap-2 text-sm text-gray-600">
              <input
                type="checkbox"
                checked={form.isDefault}
                // 已是默认地址时不允许取消，只能把别的地址设为默认来切换
                disabled={modal.mode === "edit" && modal.wasDefault}
                onChange={(e) => setForm((prev) => ({ ...prev, isDefault: e.target.checked }))}
                className="h-4 w-4"
              />
              设为默认地址
              <span className="text-xs text-gray-400">
                （列表中只会保留这一条默认）
              </span>
            </label>

            {formError && <p className="text-sm text-red-600">{formError}</p>}

            <div className="flex items-center justify-end gap-2">
              <button type="button" onClick={closeModal} className="btn-ghost">
                取消
              </button>
              <button type="submit" disabled={submitting} className="btn-primary">
                {submitting ? "保存中…" : "保存"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

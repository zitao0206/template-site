"use client";

import Link from "next/link";
import { useState } from "react";

export type PickerAddress = {
  id: number;
  name: string;
  phone: string;
  zipCode: string;
  detail: string;
  isDefault: boolean;
};

type FormState = { name: string; phone: string; zipCode: string; detail: string };

const emptyForm: FormState = { name: "", phone: "", zipCode: "", detail: "" };

// 下单/收银台用的收货地址选择器：单选列表 + 现场新增（弹窗）
export default function AddressPicker({
  initialAddresses,
  selectedId,
  onSelect,
  manageHref = "/profile/addresses",
}: {
  initialAddresses: PickerAddress[];
  selectedId: number | null;
  onSelect: (id: number) => void;
  // 「管理地址」的跳转地址；带 from，让地址页知道从哪进来的
  manageHref?: string;
}) {
  const [addresses, setAddresses] = useState<PickerAddress[]>(initialAddresses);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const setField =
    (key: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [key]: e.target.value }));
      setError(null);
    };

  const addAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/addresses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        setError(data?.error ?? "保存失败，请重试");
        return;
      }

      // 以服务端返回为准刷新列表，并自动选中新地址
      const listRes = await fetch("/api/addresses", { cache: "no-store" });
      if (listRes.ok) {
        const listData = await listRes.json().catch(() => null);
        if (listData?.addresses) setAddresses(listData.addresses);
      }
      onSelect(data.address.id);
      setOpen(false);
      setForm(emptyForm);
    } catch {
      setError("网络异常，请重试");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="card space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-gray-900">收货信息</p>
        <div className="flex items-center gap-3 text-xs">
          <Link href={manageHref} className="text-gray-400 hover:text-gray-700">
            管理地址
          </Link>
          <button
            type="button"
            onClick={() => {
              setForm(emptyForm);
              setError(null);
              setOpen(true);
            }}
            className="rounded-md border border-gray-300 px-2 py-1 text-gray-600 transition hover:border-gray-400 hover:text-gray-900"
          >
            添加地址
          </button>
        </div>
      </div>

      {addresses.length === 0 ? (
        <div className="rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-700">
          你还没有收货地址，请先点击「添加地址」填写收货信息，否则无法下单。
        </div>
      ) : (
        <ul className="space-y-2">
          {addresses.map((address) => {
            const active = address.id === selectedId;
            return (
              <li key={address.id}>
                <button
                  type="button"
                  onClick={() => onSelect(address.id)}
                  className={`w-full rounded-lg border px-3 py-2 text-left text-sm transition ${
                    active
                      ? "border-blue-500 bg-blue-50/60"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <span className="flex flex-wrap items-center gap-2">
                    <span className="font-medium text-gray-900">{address.name}</span>
                    <span className="text-gray-500">{address.phone}</span>
                    {address.isDefault && (
                      <span className="rounded-full bg-blue-50 px-1.5 py-0.5 text-xs text-blue-600">
                        默认
                      </span>
                    )}
                    {active && <span className="text-xs text-blue-600">已选</span>}
                  </span>
                  <span className="mt-1 block text-gray-600">{address.detail}</span>
                  <span className="mt-0.5 block text-xs text-gray-400">
                    邮编 {address.zipCode}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      )}

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/40 p-4 sm:items-center"
          onClick={() => !saving && setOpen(false)}
        >
          <form
            onSubmit={addAddress}
            onClick={(e) => e.stopPropagation()}
            className="card w-full max-w-lg space-y-3 bg-white"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold">新增收货地址</h2>
              <button
                type="button"
                onClick={() => !saving && setOpen(false)}
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

            {error && <p className="text-sm text-red-600">{error}</p>}

            <div className="flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => !saving && setOpen(false)}
                className="btn-ghost"
              >
                取消
              </button>
              <button type="submit" disabled={saving} className="btn-primary">
                {saving ? "保存中…" : "保存并选用"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

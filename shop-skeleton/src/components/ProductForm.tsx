"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export type ProductFormValues = {
  title: string;
  summary: string;
  description: string;
  /** 展示用「元」，提交时换算成分 */
  price: string;
  stock: string;
  imageUrl: string;
  status: "published" | "draft";
};

const EMPTY: ProductFormValues = {
  title: "",
  summary: "",
  description: "",
  price: "",
  stock: "0",
  imageUrl: "",
  status: "published",
};

export default function ProductForm({
  productId,
  initial,
}: {
  productId?: string;
  initial?: Partial<ProductFormValues>;
}) {
  const router = useRouter();
  const [values, setValues] = useState<ProductFormValues>({
    ...EMPTY,
    ...initial,
  });
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  function update<K extends keyof ProductFormValues>(
    key: K,
    value: ProductFormValues[K]
  ) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError("");

    const price = Number(values.price);
    if (!Number.isFinite(price) || price < 0) {
      setError("请输入正确的价格");
      return;
    }
    const stock = Number(values.stock);
    if (!Number.isInteger(stock) || stock < 0) {
      setError("库存必须是非负整数");
      return;
    }

    setSaving(true);
    try {
      const payload = {
        title: values.title,
        summary: values.summary,
        description: values.description,
        priceCents: Math.round(price * 100),
        stock,
        imageUrl: values.imageUrl,
        status: values.status,
      };

      const res = await fetch(
        productId ? `/api/products/${productId}` : "/api/products",
        {
          method: productId ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(data.error ?? "保存失败");
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch {
      setError("网络异常，请稍后重试");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="card space-y-4 p-6">
      <div>
        <label className="label" htmlFor="title">
          商品标题
        </label>
        <input
          id="title"
          className="input"
          value={values.title}
          onChange={(e) => update("title", e.target.value)}
          placeholder="例如：手冲咖啡壶套装"
          maxLength={120}
          required
        />
      </div>

      <div>
        <label className="label" htmlFor="summary">
          一句话简介
        </label>
        <input
          id="summary"
          className="input"
          value={values.summary}
          onChange={(e) => update("summary", e.target.value)}
          placeholder="展示在商品列表卡片上，最多 200 字"
          maxLength={200}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className="label" htmlFor="price">
            价格（元）
          </label>
          <input
            id="price"
            className="input"
            type="number"
            step="0.01"
            min="0"
            value={values.price}
            onChange={(e) => update("price", e.target.value)}
            placeholder="0.00"
            required
          />
        </div>
        <div>
          <label className="label" htmlFor="stock">
            库存
          </label>
          <input
            id="stock"
            className="input"
            type="number"
            step="1"
            min="0"
            value={values.stock}
            onChange={(e) => update("stock", e.target.value)}
            required
          />
        </div>
        <div>
          <label className="label" htmlFor="status">
            发布状态
          </label>
          <select
            id="status"
            className="select"
            value={values.status}
            onChange={(e) =>
              update("status", e.target.value as ProductFormValues["status"])
            }
          >
            <option value="published">已发布（用户可见）</option>
            <option value="draft">草稿（仅后台可见）</option>
          </select>
        </div>
      </div>

      <div>
        <label className="label" htmlFor="imageUrl">
          图片地址（可选）
        </label>
        <input
          id="imageUrl"
          className="input"
          value={values.imageUrl}
          onChange={(e) => update("imageUrl", e.target.value)}
          placeholder="https://..."
        />
      </div>

      <div>
        <label className="label" htmlFor="description">
          商品详情
        </label>
        <textarea
          id="description"
          className="textarea"
          value={values.description}
          onChange={(e) => update("description", e.target.value)}
          placeholder="支持换行，详情页会原样展示"
          maxLength={5000}
        />
      </div>

      {error && <div className="alert">{error}</div>}

      <div className="flex gap-3 pt-1">
        <button className="btn btn-primary" disabled={saving}>
          {saving ? "保存中…" : productId ? "保存修改" : "发布商品"}
        </button>
        <Link href="/admin" className="btn btn-outline">
          取消
        </Link>
      </div>
    </form>
  );
}

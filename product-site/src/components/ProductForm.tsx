"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export type ProductFormValues = {
  id?: number;
  title: string;
  description: string;
  priceYuan: string;
  stock: string;
  imageUrl: string;
  status: "DRAFT" | "PUBLISHED";
};

export default function ProductForm({ initial }: { initial?: ProductFormValues }) {
  const router = useRouter();
  const isEdit = Boolean(initial?.id);

  const [title, setTitle] = useState(initial?.title ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [priceYuan, setPriceYuan] = useState(initial?.priceYuan ?? "");
  const [stock, setStock] = useState(initial?.stock ?? "");
  const [imageUrl, setImageUrl] = useState(initial?.imageUrl ?? "");
  const [status, setStatus] = useState<"DRAFT" | "PUBLISHED">(
    initial?.status ?? "PUBLISHED",
  );

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    // 元 → 分，避免浮点误差
    const price = Math.round(Number(priceYuan) * 100);
    if (!Number.isFinite(price) || price < 0) {
      setError("价格填写不正确");
      return;
    }

    // 库存校验 & 转数字
    const stockNum = Number(stock);
    if (!Number.isInteger(stockNum) || stockNum < 0) {
      setError("库存必须填写大于等于0的整数");
      return;
    }

    setLoading(true);
    try {
      const url = isEdit ? `/api/products/${initial!.id}` : "/api/products";
      const res = await fetch(url, {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          price,
          stock: stockNum,
          imageUrl,
          status,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "保存失败");
        return;
      }
      router.push("/admin/products");
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
        <label className="mb-1 block text-sm text-gray-600">商品标题 *</label>
        <input
          className="input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="例如：北欧风格陶瓷马克杯"
          required
        />
      </div>

      <div>
        <label className="mb-1 block text-sm text-gray-600">价格（元） *</label>
        <input
          className="input"
          type="number"
          min="0"
          step="0.01"
          value={priceYuan}
          onChange={(e) => setPriceYuan(e.target.value)}
          placeholder="99.00"
          required
        />
        <p className="mt-1 text-xs text-gray-400">内部按「分」存储，1 元 = 100</p>
      </div>

      {/* ✅ 新增库存输入框 */}
      <div>
        <label className="mb-1 block text-sm text-gray-600">库存数量 *</label>
        <input
          className="input"
          type="number"
          min="0"
          step="1"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          placeholder="0"
          required
        />
        <p className="mt-1 text-xs text-gray-400">库存为0时，前台标记售罄</p>
      </div>

      <div>
        <label className="mb-1 block text-sm text-gray-600">
          图片地址（V1 填外链 URL，V2 再做上传）
        </label>
        <input
          className="input"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="https://example.com/pic.jpg"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm text-gray-600">商品描述</label>
        <textarea
          className="input min-h-[120px]"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="规格、材质、卖点……"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm text-gray-600">状态</label>
        <select
          className="input"
          value={status}
          onChange={(e) => setStatus(e.target.value as "DRAFT" | "PUBLISHED")}
        >
          <option value="PUBLISHED">上架（用户可见）</option>
          <option value="DRAFT">草稿（仅管理员可见）</option>
        </select>
      </div>

      {error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>
      )}

      <div className="flex gap-3">
        <button className="btn-primary" disabled={loading}>
          {loading ? "保存中…" : isEdit ? "保存修改" : "发布商品"}
        </button>
        <button
          type="button"
          className="btn-ghost"
          onClick={() => router.push("/admin/products")}
        >
          取消
        </button>
      </div>
    </form>
  );
}

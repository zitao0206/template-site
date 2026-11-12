import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const id = Number(params.id);
  if (!Number.isInteger(id)) notFound();

  const product = await prisma.product.findUnique({ where: { id } });
  if (!product || product.status !== "PUBLISHED") notFound();

  return (
    <div className="space-y-6">
      <Link href="/products" className="text-sm text-gray-500 hover:text-gray-900">
        ← 返回列表
      </Link>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="aspect-square overflow-hidden rounded-xl bg-gray-100">
          {product.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={product.imageUrl}
              alt={product.title}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-gray-400">
              暂无图片
            </div>
          )}
        </div>

        <div className="space-y-4">
          <h1 className="text-2xl font-semibold">{product.title}</h1>
          <div className="text-3xl font-bold text-red-600">
            ¥{(product.price / 100).toFixed(2)}
          </div>
          <div>
            {product.stock > 5 ? (
              <p className="text-gray-600">库存：{product.stock} 件</p>
            ) : product.stock > 0 ? (
              <p className="text-orange-500">库存紧张，仅剩 {product.stock} 件</p>
            ) : (
              <span className="inline-block px-2 py-1 bg-red-100 text-red-600 text-sm rounded">
                售罄
              </span>
            )}
          </div>
          <div className="whitespace-pre-wrap text-sm leading-6 text-gray-600">
            {product.description || "暂无描述"}
          </div>

          {/* V2 在这里放：收藏 / 加入购物车 / 下单 */}
          <div className="flex gap-3">
            <button className="btn-primary" disabled>
              加入购物车（V2）
            </button>
            <button className="btn-ghost" disabled>
              收藏（V2）
            </button>
          </div>
          <p className="text-xs text-gray-400">
            当前为 V1：只做浏览与展示，操作功能在第二版本开放。
          </p>
        </div>
      </div>
    </div>
  );
}

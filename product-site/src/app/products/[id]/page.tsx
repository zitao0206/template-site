import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import AddCartButton from "@/components/AddCartButton";

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
          {/* 价格和库存标签同行，和你截图样式对齐 */}
          <div className="flex items-center gap-3">
            <div className="text-3xl font-bold text-red-600">
              ¥{(product.price / 100).toFixed(2)}
            </div>
            {product.stock > 0 ? (
              <span className="px-3 py-1 rounded-full bg-green-50 text-green-700">
                库存 {product.stock}
              </span>
            ) : (
              <span className="px-3 py-1 rounded-full bg-red-50 text-red-600">
                售罄
              </span>
            )}
          </div>
          <div className="whitespace-pre-wrap text-sm leading-6 text-gray-600">
            {product.description || "暂无描述"}
          </div>

          <div className="flex gap-3">
            <AddCartButton
              productId={product.id}
              disabled={product.stock <= 0}
              disabledText="已售罄"
            />
            <button className="btn-ghost" disabled>
              收藏（V2）
            </button>
          </div>
          <p className="text-xs text-gray-400">
            加入购物车后可在右上角购物车查看，购物车与账号绑定。
          </p>
        </div>
      </div>
    </div>
  );
}

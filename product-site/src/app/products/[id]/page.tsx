import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";
import AddCartButton from "@/components/AddCartButton";
import BackButton from "@/components/BackButton";

export const dynamic = "force-dynamic";

export default async function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const id = Number(params.id);
  if (!Number.isInteger(id)) notFound();

  const session = await getSession();
  const isStaff = session?.role === "admin" || session?.role === "super";

  const product = await prisma.product.findUnique({ where: { id } });
  // 未上架的商品只有管理员能看到（从商品管理点标题进来不会 404）
  if (!product || (product.status !== "PUBLISHED" && !isStaff)) notFound();

  return (
    <div className="space-y-6">
      <BackButton fallback={isStaff ? "/admin/products" : "/products"} />

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
          <h1 className="text-2xl font-semibold">
            {product.title}
            {product.status !== "PUBLISHED" && (
              <span className="ml-2 rounded bg-amber-100 px-2 py-0.5 text-xs font-normal text-amber-700">
                草稿
              </span>
            )}
          </h1>
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

          {/* 管理员视角只看商品信息，不显示数量加减/加入购物车/立即购买 */}
          {!isStaff && (
            <>
              <AddCartButton productId={product.id} stock={product.stock} />
              <p className="text-xs text-gray-400">
                加入购物车后可在右上角购物车查看，购物车与账号绑定。
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

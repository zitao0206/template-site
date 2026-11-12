import Link from "next/link";
import { prisma } from "@/lib/prisma";
import DeleteProductButton from "@/components/DeleteProductButton";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      price: true,
      status: true,
      createdAt: true,
    },
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">商品管理</h1>
        <Link href="/admin/products/new" className="btn-primary">
          + 发布商品
        </Link>
      </div>

      {products.length === 0 ? (
        <div className="card text-sm text-gray-500">
          还没有商品，点右上角「发布商品」创建第一个。
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-left text-gray-500">
              <tr>
                <th className="px-4 py-3">标题</th>
                <th className="px-4 py-3">价格</th>
                <th className="px-4 py-3">状态</th>
                <th className="px-4 py-3">创建时间</th>
                <th className="px-4 py-3 text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {products.map((p) => (
                <tr key={p.id}>
                  <td className="px-4 py-3">
                    <Link
                      href={`/products/${p.id}`}
                      className="hover:text-blue-600"
                    >
                      {p.title}
                    </Link>
                  </td>
                  <td className="px-4 py-3">¥{(p.price / 100).toFixed(2)}</td>
                  <td className="px-4 py-3">
                    {p.status === "PUBLISHED" ? (
                      <span className="rounded bg-green-100 px-2 py-0.5 text-xs text-green-700">
                        已上架
                      </span>
                    ) : (
                      <span className="rounded bg-amber-100 px-2 py-0.5 text-xs text-amber-700">
                        草稿
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-gray-500">
                    {p.createdAt.toLocaleDateString("zh-CN")}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      href={`/admin/products/${p.id}/edit`}
                      className="mr-4 text-sm text-blue-600 hover:underline"
                    >
                      编辑
                    </Link>
                    <DeleteProductButton id={p.id} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

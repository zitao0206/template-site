import Link from "next/link";
import { desc } from "drizzle-orm";
import { db } from "@/lib/db";
import { products } from "@/lib/schema";
import { formatDate, formatPrice } from "@/lib/format";
import DeleteProductButton from "@/components/DeleteProductButton";

export const dynamic = "force-dynamic";

export default function AdminProductsPage() {
  const items = db.select().from(products).orderBy(desc(products.createdAt)).all();

  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold">商品列表</h1>
          <p className="mt-1 text-sm text-gray-500">
            共 {items.length} 件商品，含草稿
          </p>
        </div>
        <Link href="/admin/products/new" className="btn btn-primary">
          新建商品
        </Link>
      </div>

      {items.length === 0 ? (
        <div className="card px-6 py-16 text-center text-sm text-gray-500">
          还没有商品，点击右上角「新建商品」发布第一个。
        </div>
      ) : (
        <div className="card overflow-x-auto">
          <table className="w-full min-w-[720px] text-sm">
            <thead>
              <tr className="border-b border-gray-200 text-left text-xs text-gray-500">
                <th className="px-4 py-3 font-normal">商品</th>
                <th className="px-4 py-3 font-normal">价格</th>
                <th className="px-4 py-3 font-normal">库存</th>
                <th className="px-4 py-3 font-normal">状态</th>
                <th className="px-4 py-3 font-normal">更新时间</th>
                <th className="px-4 py-3 text-right font-normal">操作</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-gray-100 last:border-0"
                >
                  <td className="px-4 py-3">
                    <div className="font-medium">{item.title}</div>
                    <div className="mt-0.5 line-clamp-1 text-xs text-gray-400">
                      {item.summary || "—"}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-700">
                    {formatPrice(item.priceCents)}
                  </td>
                  <td className="px-4 py-3 text-gray-700">{item.stock}</td>
                  <td className="px-4 py-3">
                    <span
                      className={
                        item.status === "published"
                          ? "badge badge-green"
                          : "badge badge-gray"
                      }
                    >
                      {item.status === "published" ? "已发布" : "草稿"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-500">
                    {formatDate(item.updatedAt)}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      {item.status === "published" && (
                        <Link
                          href={`/products/${item.id}`}
                          className="btn btn-outline"
                          target="_blank"
                        >
                          查看
                        </Link>
                      )}
                      <Link
                        href={`/admin/products/${item.id}/edit`}
                        className="btn btn-outline"
                      >
                        编辑
                      </Link>
                      <DeleteProductButton id={item.id} title={item.title} />
                    </div>
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

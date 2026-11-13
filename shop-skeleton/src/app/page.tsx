import Link from "next/link";
import { desc, eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { products } from "@/lib/schema";
import { formatPrice } from "@/lib/format";

// 商品数据来自数据库，必须每次请求实时读取，不能在建站时静态化
export const dynamic = "force-dynamic";

export default function HomePage() {
  const items = db
    .select()
    .from(products)
    .where(eq(products.status, "published"))
    .orderBy(desc(products.createdAt))
    .all();

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl font-semibold">全部商品</h1>
        <p className="mt-1 text-sm text-gray-500">
          共 {items.length} 件商品在售
        </p>
      </div>

      {items.length === 0 ? (
        <div className="card px-6 py-16 text-center text-sm text-gray-500">
          还没有已发布的商品，去
          <Link href="/admin" className="mx-1 text-blue-700 hover:underline">
            管理后台
          </Link>
          发布一个吧。
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <Link
              key={item.id}
              href={`/products/${item.id}`}
              className="card group overflow-hidden transition-colors hover:border-gray-300"
            >
              <div className="flex h-44 items-center justify-center overflow-hidden bg-gray-100">
                {item.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <span className="text-3xl font-light text-gray-300">
                    {item.title.slice(0, 1)}
                  </span>
                )}
              </div>
              <div className="p-4">
                <h2 className="font-medium">{item.title}</h2>
                <p className="mt-1 line-clamp-2 min-h-[2.5rem] text-sm leading-5 text-gray-500">
                  {item.summary || "暂无简介"}
                </p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-lg font-semibold text-blue-700">
                    {formatPrice(item.priceCents)}
                  </span>
                  <span className="text-xs text-gray-400">
                    {item.stock > 0 ? `库存 ${item.stock}` : "已售罄"}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

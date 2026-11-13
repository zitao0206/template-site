import Link from "next/link";
import { prisma } from "@/lib/prisma";
import ProductCard from "@/components/ProductCard";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const products = await prisma.product.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { createdAt: "desc" },
    take: 8,
    select: { id: true, title: true, price: true, stock: true, imageUrl: true },
  });

  return (
    <div className="space-y-8">
      <section className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-10 text-white">
        <h1 className="text-2xl font-bold">商品模版网站首页</h1>
        <p className="mt-2 text-sm text-blue-100">
          管理员发布商品 → 存数据库 → 用户浏览挑选 → 进详情页
        </p>
        <div className="mt-6 flex gap-3">
          <Link
            href="/products"
            className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-blue-700 hover:bg-blue-50"
          >
            开始浏览
          </Link>
          <Link
            href="/admin"
            className="rounded-lg border border-white/40 px-4 py-2 text-sm font-medium text-white hover:bg-white/10"
          >
            管理后台入口
          </Link>
        </div>
      </section>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">最新上架</h2>
          <Link href="/products" className="text-sm text-blue-600 hover:underline">
            查看全部 →
          </Link>
        </div>

        {products.length === 0 ? (
          <div className="card text-sm text-gray-500">
            还没有商品。用管理员账号登录后台发布第一个商品，或运行{" "}
            <code className="rounded bg-gray-100 px-1">npm run seed</code> 灌入示例数据。
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {products.map((p) => (
              <ProductCard key={p.id} {...p} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

import Link from "next/link";
import { prisma } from "@/lib/prisma";
import ProductCard from "@/components/ProductCard";

export const dynamic = "force-dynamic";

const PAGE_SIZE = 12;

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const page = Math.max(1, Number(searchParams.page ?? 1) || 1);

  const [total, items] = await Promise.all([
    prisma.product.count({ where: { status: "PUBLISHED" } }),
    prisma.product.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
      select: { id: true, title: true, stock: true, price: true, imageUrl: true },
    }),
  ]);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">
        全部商品 <span className="text-sm font-normal text-gray-500">共 {total} 件</span>
      </h1>

      {items.length === 0 ? (
        <div className="card text-sm text-gray-500">暂无上架商品。</div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {items.map((p) => (
            <ProductCard key={p.id} {...p} />
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-3 text-sm">
          {page > 1 && (
            <Link href={`/products?page=${page - 1}`} className="btn-ghost">
              上一页
            </Link>
          )}
          <span className="text-gray-500">
            {page} / {totalPages}
          </span>
          {page < totalPages && (
            <Link href={`/products?page=${page + 1}`} className="btn-ghost">
              下一页
            </Link>
          )}
        </div>
      )}
    </div>
  );
}

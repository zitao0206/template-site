import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminHomePage() {
  const [productCount, publishedCount, userCount] = await Promise.all([
    prisma.product.count(),
    prisma.product.count({ where: { status: "PUBLISHED" } }),
    prisma.user.count(),
  ]);

  const stats = [
    { label: "商品总数", value: productCount },
    { label: "已上架", value: publishedCount },
    { label: "未上架（草稿）", value: productCount - publishedCount },
    { label: "注册用户", value: userCount },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">概览</h1>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="card">
            <div className="text-sm text-gray-500">{s.label}</div>
            <div className="mt-1 text-2xl font-semibold">{s.value}</div>
          </div>
        ))}
      </div>

      <div className="card flex flex-wrap items-center gap-3">
        <Link href="/admin/products/new" className="btn-primary">
          + 发布商品
        </Link>
        <Link href="/admin/products" className="btn-ghost">
          管理商品列表
        </Link>
      </div>
    </div>
  );
}

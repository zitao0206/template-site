import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { products } from "@/lib/schema";
import ProductForm from "@/components/ProductForm";
import { formatDate } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = db.select().from(products).where(eq(products.id, id)).get();
  if (!item) notFound();

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-5">
        <h1 className="text-lg font-semibold">编辑商品</h1>
        <p className="mt-1 text-sm text-gray-500">
          最后更新于 {formatDate(item.updatedAt)}
        </p>
      </div>
      <ProductForm
        productId={item.id}
        initial={{
          title: item.title,
          summary: item.summary,
          description: item.description,
          price: (item.priceCents / 100).toFixed(2),
          stock: String(item.stock),
          imageUrl: item.imageUrl,
          status: item.status,
        }}
      />
    </div>
  );
}

import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import ProductForm from "@/components/ProductForm";

export const dynamic = "force-dynamic";

export default async function EditProductPage({
  params,
}: {
  params: { id: string };
}) {
  const id = Number(params.id);
  if (!Number.isInteger(id)) notFound();

  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) notFound();

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">编辑商品 #{product.id}</h1>
      <div className="card max-w-2xl">
        <ProductForm
          initial={{
            id: product.id,
            title: product.title,
            description: product.description ?? "",
            priceYuan: (product.price / 100).toFixed(2),
            imageUrl: product.imageUrl ?? "",
            status: product.status === "DRAFT" ? "DRAFT" : "PUBLISHED",
          }}
        />
      </div>
    </div>
  );
}

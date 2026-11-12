import { prisma } from "@/lib/prisma";
import ProductList from "@/components/ProductList";

// 获取已上架全部商品
async function getPublishedProducts() {
  return await prisma.product.findMany({
    where: {
      status: "PUBLISHED",
    },
    orderBy: { createdAt: "desc" },
  });
}

export default async function UserPage() {
  const products = await getPublishedProducts();

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">全部商品</h2>
      <ProductList products={products} />
    </div>
  );
}

import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { readSession } from "@/lib/session";
import CheckoutClient from "@/components/CheckoutClient";

export const dynamic = "force-dynamic";

type Search = { productId?: string; quantity?: string };

// GET /checkout?productId=1&quantity=2  预定下单页
export default async function CheckoutPage({ searchParams }: { searchParams: Search }) {
  const productId = Number(searchParams.productId);
  if (!Number.isInteger(productId) || productId <= 0) {
    redirect("/products");
  }

  const rawQty = Number(searchParams.quantity);
  const quantity = Number.isInteger(rawQty) && rawQty > 0 ? rawQty : 1;

  // 下单必须登录；管理员账号不参与下单，回后台
  const session = await readSession();
  if (!session) {
    const back = `/checkout?productId=${productId}&quantity=${quantity}`;
    redirect(`/login?redirect=${encodeURIComponent(back)}`);
  }
  if (session.role === "admin") {
    redirect("/admin");
  }

  const product = await prisma.product.findUnique({ where: { id: productId } });
  if (!product || product.status !== "PUBLISHED") {
    redirect("/products");
  }

  return (
    <CheckoutClient
      product={{
        id: product.id,
        title: product.title,
        price: product.price,
        imageUrl: product.imageUrl,
        stock: product.stock,
      }}
      initialQuantity={Math.min(quantity, Math.max(product.stock, 1))}
    />
  );
}

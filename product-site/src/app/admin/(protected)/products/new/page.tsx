import ProductForm from "@/components/ProductForm";

export default function NewProductPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">发布商品</h1>
      <div className="card max-w-2xl">
        <ProductForm />
      </div>
    </div>
  );
}

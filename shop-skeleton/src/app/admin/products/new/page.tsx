import ProductForm from "@/components/ProductForm";

export default function NewProductPage() {
  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-5">
        <h1 className="text-lg font-semibold">新建商品</h1>
        <p className="mt-1 text-sm text-gray-500">
          保存后立即写入数据库；选「已发布」用户端马上能看到
        </p>
      </div>
      <ProductForm />
    </div>
  );
}

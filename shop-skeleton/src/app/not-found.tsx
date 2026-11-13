import Link from "next/link";

export default function NotFound() {
  return (
    <div className="card mx-auto max-w-md px-6 py-14 text-center">
      <h1 className="text-lg font-semibold">页面不存在</h1>
      <p className="mt-2 text-sm text-gray-500">
        商品可能已下架，或者地址输入有误。
      </p>
      <Link href="/" className="btn btn-primary mt-6">
        回到商品列表
      </Link>
    </div>
  );
}

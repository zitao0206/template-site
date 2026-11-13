import Link from "next/link";

export default function ProductCard({
  id,
  title,
  price,
  stock,
  imageUrl,
  status,
}: {
  id: number;
  title: string;
  price: number;
  stock: number;
  imageUrl?: string | null;
  status?: string;
}) {
  return (
    // 用 next/link 而不是原生 <a>：原生 <a> 是整页跳转，dev 首次编译详情页时
    // 旧页面会一直停着，看起来像"点了没反应"，第二次（已编译）才正常
    <Link
      href={`/products/${id}`}
      prefetch
      className="card block transition hover:border-blue-300 hover:shadow-md"
    >
      <div className="mb-3 aspect-[4/3] overflow-hidden rounded-lg bg-gray-100">
        {imageUrl ? (
          // V1 用外链图片；换成上传后可接自己的存储
          // eslint-disable-next-line @next/next/no-img-element
          <img src={imageUrl} alt={title} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full items-center justify-center text-xs text-gray-400">
            暂无图片
          </div>
        )}
      </div>
      <h3 className="line-clamp-2 text-sm font-medium text-gray-900">{title}</h3>
      <div className="mt-2 flex items-center justify-between">
        <span className="text-base font-semibold text-red-600">
          ¥{(price / 100).toFixed(2)}
        </span>
        <div className="flex items-center gap-2">
          {status && status !== "PUBLISHED" && (
            <span className="rounded bg-amber-100 px-2 py-0.5 text-xs text-amber-700">
              未上架
            </span>
          )}
          {stock > 0 ? (
            <span className="text-xs text-gray-500">库存:{stock}</span>
          ) : (
            <span className="rounded bg-red-100 px-2 py-0.5 text-xs text-red-600">
              售罄
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

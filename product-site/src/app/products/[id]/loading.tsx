// 商品详情页加载骨架：首次进入时给个即时反馈，避免"点了没反应"的错觉
export default function Loading() {
  return (
    <div className="space-y-6">
      <div className="h-4 w-20 animate-pulse rounded bg-gray-200" />

      <div className="grid gap-8 md:grid-cols-2">
        <div className="aspect-square animate-pulse rounded-xl bg-gray-200" />

        <div className="space-y-4">
          <div className="h-7 w-2/3 animate-pulse rounded bg-gray-200" />
          <div className="h-8 w-32 animate-pulse rounded bg-gray-200" />
          <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
          <div className="h-4 w-4/5 animate-pulse rounded bg-gray-200" />
          <div className="h-11 w-full animate-pulse rounded-full bg-gray-200" />
        </div>
      </div>

      <p className="text-sm text-gray-400">正在加载商品…</p>
    </div>
  );
}

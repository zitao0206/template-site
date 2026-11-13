import Link from "next/link";
import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { products } from "@/lib/schema";
import { formatPrice } from "@/lib/format";
import { getCurrentUser } from "@/lib/session";

export const dynamic = "force-dynamic";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = db.select().from(products).where(eq(products.id, id)).get();

  // 未发布商品对用户端不可见
  if (!item || item.status !== "published") {
    notFound();
  }

  const user = await getCurrentUser();
  const soldOut = item.stock <= 0;

  return (
    <div>
      <nav className="mb-5 text-sm text-gray-500">
        <Link href="/" className="hover:text-gray-900">
          全部商品
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-700">{item.title}</span>
      </nav>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="card flex h-80 items-center justify-center overflow-hidden bg-gray-100">
          {item.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={item.imageUrl}
              alt={item.title}
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="text-6xl font-light text-gray-300">
              {item.title.slice(0, 1)}
            </span>
          )}
        </div>

        <div>
          <h1 className="text-2xl font-semibold tracking-tight">{item.title}</h1>
          {item.summary && (
            <p className="mt-2 text-sm text-gray-500">{item.summary}</p>
          )}

          <div className="mt-5 flex items-end gap-3">
            <span className="text-3xl font-semibold text-blue-700">
              {formatPrice(item.priceCents)}
            </span>
            <span className={soldOut ? "badge badge-gray" : "badge badge-green"}>
              {soldOut ? "已售罄" : `库存 ${item.stock}`}
            </span>
          </div>

          <div className="mt-6 rounded-lg border border-dashed border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-500">
            下单、加购、收藏等操作将在第二个版本开放。
            {!user && (
              <>
                {" "}
                你当前未登录，
                <Link href="/login" className="text-blue-700 hover:underline">
                  登录
                </Link>
                后才能使用。
              </>
            )}
          </div>

          <button className="btn btn-primary mt-4 w-full" disabled>
            {soldOut ? "已售罄" : "立即购买（第二版开放）"}
          </button>

          <div className="mt-3 text-center text-xs text-gray-400">
            当前账号：{user ? user.email : "未登录"}
          </div>
        </div>
      </div>

      <section className="mt-10">
        <h2 className="mb-3 text-base font-medium">商品详情</h2>
        <div className="card whitespace-pre-line p-5 text-sm leading-7 text-gray-700">
          {item.description || "商家还没有填写详细描述。"}
        </div>
      </section>
    </div>
  );
}

import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { readSession } from "@/lib/session";
import {
  orderStatusClass,
  userOrderStatusText,
} from "@/lib/order-status";

export const dynamic = "force-dynamic";

function formatTime(date: Date) {
  return new Date(date).toLocaleString("zh-CN", { hour12: false });
}

// 用户订单列表：只显示自己的订单；已取消的订单整卡置灰
export default async function OrdersPage() {
  const session = await readSession();
  if (!session) {
    redirect("/login?redirect=/orders");
  }
  if (session.uid === null) {
    redirect("/admin/orders");
  }

  const orders = await prisma.order.findMany({
    where: { userId: session.uid },
    orderBy: { createdAt: "desc" },
    include: { items: true },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-xl font-semibold">我的订单</h1>
          <p className="mt-1 text-sm text-gray-500">
            共 {orders.length} 笔订单，仅显示当前账号下的订单。
          </p>
        </div>
        <Link href="/products" className="text-sm text-gray-500 hover:text-gray-900">
          继续购物 →
        </Link>
      </div>

      {orders.length === 0 ? (
        <div className="card py-12 text-center">
          <p className="text-gray-500">还没有订单，去挑点东西吧</p>
          <Link href="/products" className="btn-primary mt-4 inline-flex">
            去逛逛
          </Link>
        </div>
      ) : (
        <ul className="space-y-4">
          {orders.map((order) => {
            const totalQty = order.items.reduce((sum, it) => sum + it.quantity, 0);
            const cancelled = order.status === "CANCELLED";
            return (
              <li
                key={order.id}
                className={`card space-y-3 ${
                  cancelled ? "border-gray-200 bg-gray-50/70 opacity-70" : ""
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-100 pb-3 text-sm">
                  <div className="text-gray-500">
                    订单号{" "}
                    <Link
                      href={`/orders/${order.id}`}
                      className="font-mono text-gray-900 hover:underline"
                    >
                      {order.orderNo}
                    </Link>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-gray-400">{formatTime(order.createdAt)}</span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs ${orderStatusClass(order.status)}`}
                    >
                      {userOrderStatusText(order.status)}
                    </span>
                  </div>
                </div>

                {cancelled && (
                  <p className="rounded-lg bg-white px-3 py-2 text-xs text-gray-600 ring-1 ring-gray-200">
                    商家留言：{order.cancelReason ?? "（无留言）"}
                  </p>
                )}

                {order.receiverName && (
                  <div className="rounded-lg bg-gray-50 px-3 py-2 text-xs text-gray-600">
                    <span className="text-gray-900">{order.receiverName}</span>
                    <span className="ml-2">{order.receiverPhone}</span>
                    <span className="ml-2">邮编 {order.receiverZip}</span>
                    <span className="mt-1 block">{order.receiverAddress}</span>
                  </div>
                )}

                <div className="space-y-2">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-center justify-between gap-3 text-sm">
                      <Link
                        href={`/products/${item.productId}`}
                        className="min-w-0 flex-1 truncate text-gray-900 hover:underline"
                      >
                        {item.title}
                      </Link>
                      <span className="text-gray-500">
                        ¥{(item.price / 100).toFixed(2)} × {item.quantity}
                      </span>
                      <span className="w-20 text-right font-medium text-gray-900">
                        ¥{((item.price * item.quantity) / 100).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between border-t border-gray-100 pt-3 text-sm">
                  <Link
                    href={`/orders/${order.id}`}
                    className="text-gray-500 hover:text-gray-900"
                  >
                    查看详情 →
                  </Link>
                  <div className="flex items-center gap-3">
                    <span className="text-gray-500">共 {totalQty} 件，合计</span>
                    <span className="text-lg font-semibold text-red-600">
                      ¥{(order.totalAmount / 100).toFixed(2)}
                    </span>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

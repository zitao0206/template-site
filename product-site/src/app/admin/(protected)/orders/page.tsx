import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { orderStatusClass, orderStatusText } from "@/lib/order-status";

export const dynamic = "force-dynamic";

function formatTime(date: Date) {
  return new Date(date).toLocaleString("zh-CN", { hour12: false });
}

// 管理员：全部订单
export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      items: true,
      user: { select: { email: true } },
    },
  });

  const pendingCount = orders.filter((o) => o.status === "PENDING").length;
  const validOrders = orders.filter((o) => o.status !== "CANCELLED");
  const totalAmount = validOrders.reduce((sum, o) => sum + o.totalAmount, 0);
  const totalQty = validOrders.reduce(
    (sum, o) => sum + o.items.reduce((s, it) => s + it.quantity, 0),
    0,
  );

  const stats = [
    { label: "订单总数", value: orders.length },
    { label: "待处理", value: pendingCount },
    { label: "有效金额", value: `¥${(totalAmount / 100).toFixed(2)}` },
    { label: "售出件数", value: totalQty },
  ];

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">订单管理</h1>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="card">
            <div className="text-sm text-gray-500">{s.label}</div>
            <div className="mt-1 text-2xl font-semibold">{s.value}</div>
          </div>
        ))}
      </div>

      {orders.length === 0 ? (
        <div className="card text-sm text-gray-500">还没有任何订单。</div>
      ) : (
        <ul className="space-y-4">
          {orders.map((order) => {
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
                      href={`/admin/orders/${order.id}`}
                      className="font-mono text-gray-900 hover:underline"
                    >
                      {order.orderNo}
                    </Link>
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-gray-600">{order.user.email}</span>
                    <span className="text-gray-400">{formatTime(order.createdAt)}</span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs ${orderStatusClass(order.status)}`}
                    >
                      {orderStatusText(order.status)}
                    </span>
                  </div>
                </div>

                <div className="rounded-lg bg-gray-50 px-3 py-2 text-sm text-gray-600">
                  <span className="text-gray-500">收货信息：</span>
                  {order.receiverName ? (
                    <>
                      <span className="font-medium text-gray-900">{order.receiverName}</span>
                      <span className="ml-2">{order.receiverPhone}</span>
                      <span className="ml-2 text-xs text-gray-400">邮编 {order.receiverZip}</span>
                      <span className="mt-1 block text-gray-600">{order.receiverAddress}</span>
                    </>
                  ) : (
                    <span className="text-gray-400">未填写（历史订单）</span>
                  )}
                </div>

                {order.trackingNo && (
                  <p className="text-xs text-indigo-700">
                    发货单号：<span className="font-mono">{order.trackingNo}</span>
                  </p>
                )}
                {cancelled && (
                  <p className="text-xs text-gray-600">
                    取消留言：{order.cancelReason ?? "（无留言）"}
                  </p>
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
                    href={`/admin/orders/${order.id}`}
                    className="text-gray-500 hover:text-gray-900"
                  >
                    查看订单 →
                  </Link>
                  <div className="flex items-center gap-3">
                    <span className="text-gray-500">合计</span>
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

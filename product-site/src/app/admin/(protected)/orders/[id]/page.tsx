import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { orderStatusClass, orderStatusText } from "@/lib/order-status";
import AdminOrderActions from "@/components/AdminOrderActions";

export const dynamic = "force-dynamic";

function formatTime(date: Date) {
  return new Date(date).toLocaleString("zh-CN", { hour12: false });
}

// 管理员订单详情：查看 + 接单 / 发货 / 取消
export default async function AdminOrderDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const id = Number(params.id);
  if (!Number.isInteger(id) || id <= 0) {
    notFound();
  }

  const order = await prisma.order.findUnique({
    where: { id },
    include: {
      items: true,
      user: { select: { email: true } },
    },
  });
  if (!order) {
    notFound();
  }

  const cancelled = order.status === "CANCELLED";
  const totalQty = order.items.reduce((sum, it) => sum + it.quantity, 0);

  return (
    <div className="space-y-4">
      <Link
        href="/admin/orders"
        className="text-sm text-gray-500 hover:text-gray-900"
      >
        ← 返回订单管理
      </Link>

      <div className="flex flex-wrap items-center justify-between gap-2">
        <h1 className="text-xl font-semibold">订单详情</h1>
        <span
          className={`rounded-full px-2.5 py-1 text-xs ${orderStatusClass(order.status)}`}
        >
          {orderStatusText(order.status)}
        </span>
      </div>

      <div
        className={`card space-y-2 text-sm ${
          cancelled ? "bg-gray-50/60 opacity-70" : ""
        }`}
      >
        <p className="text-gray-500">
          订单号 <span className="font-mono text-gray-900">{order.orderNo}</span>
        </p>
        <p className="text-gray-500">
          下单用户 <span className="text-gray-900">{order.user.email}</span>
        </p>
        <p className="text-gray-500">
          下单时间 <span className="text-gray-900">{formatTime(order.createdAt)}</span>
        </p>
        {order.trackingNo && (
          <p className="rounded-lg bg-indigo-50 px-3 py-2 text-indigo-700">
            发货单号：<span className="font-mono">{order.trackingNo}</span>
          </p>
        )}
        {order.cancelReason && (
          <p className="rounded-lg bg-white px-3 py-2 ring-1 ring-gray-200">
            <span className="text-gray-500">取消留言：</span>
            <span className="text-gray-900">{order.cancelReason}</span>
          </p>
        )}
      </div>

      <AdminOrderActions orderId={order.id} status={order.status} />

      <div className="card space-y-1 text-sm">
        <p className="font-medium text-gray-900">收货信息</p>
        {order.receiverName ? (
          <>
            <p className="text-gray-900">
              {order.receiverName}
              <span className="ml-2 text-gray-500">{order.receiverPhone}</span>
              <span className="ml-2 text-xs text-gray-400">
                邮编 {order.receiverZip}
              </span>
            </p>
            <p className="text-gray-600">{order.receiverAddress}</p>
          </>
        ) : (
          <p className="text-gray-400">未填写（历史订单）</p>
        )}
      </div>

      <div className="card space-y-3">
        <p className="text-sm font-medium text-gray-900">商品明细</p>
        <ul className="space-y-2">
          {order.items.map((item) => (
            <li
              key={item.id}
              className="flex items-center justify-between gap-3 text-sm"
            >
              <span className="min-w-0 flex-1 truncate text-gray-900">
                {item.title}
              </span>
              <span className="text-gray-500">
                ¥{(item.price / 100).toFixed(2)} × {item.quantity}
              </span>
              <span className="w-20 text-right text-gray-900">
                ¥{((item.price * item.quantity) / 100).toFixed(2)}
              </span>
            </li>
          ))}
        </ul>
        <div className="flex items-center justify-end gap-3 border-t border-gray-100 pt-3 text-sm">
          <span className="text-gray-500">共 {totalQty} 件，合计</span>
          <span className="text-lg font-semibold text-red-600">
            ¥{(order.totalAmount / 100).toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}

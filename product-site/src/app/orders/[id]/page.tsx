import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { readSession } from "@/lib/session";
import { orderStatusClass, orderStatusText } from "@/lib/order-status";
import ConfirmReceiptButton from "@/components/ConfirmReceiptButton";

export const dynamic = "force-dynamic";

function formatTime(date: Date) {
  return new Date(date).toLocaleString("zh-CN", { hour12: false });
}

// 用户侧订单详情：只有本人能看
export default async function OrderDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await readSession();
  if (!session) {
    redirect(`/login?redirect=/orders/${params.id}`);
  }
  if (session.uid === null) {
    redirect(`/admin/orders/${params.id}`);
  }

  const id = Number(params.id);
  if (!Number.isInteger(id) || id <= 0) {
    notFound();
  }

  const order = await prisma.order.findUnique({
    where: { id },
    include: { items: true },
  });
  if (!order || order.userId !== session.uid) {
    notFound();
  }

  const cancelled = order.status === "CANCELLED";
  const totalQty = order.items.reduce((sum, it) => sum + it.quantity, 0);

  return (
    <div className="mx-auto max-w-2xl space-y-4">
      <Link href="/orders" className="text-sm text-gray-500 hover:text-gray-900">
        ← 返回我的订单
      </Link>

      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">订单详情</h1>
        <Link href="/profile" className="text-sm text-gray-500 hover:text-gray-900">
          个人资料
        </Link>
      </div>

      {/* 状态卡：被取消的订单整体置灰 */}
      <div
        className={`card space-y-3 ${cancelled ? "border-gray-200 bg-gray-50/60 opacity-70" : ""}`}
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <p className="text-sm text-gray-500">
              订单号 <span className="font-mono text-gray-900">{order.orderNo}</span>
            </p>
            <p className="mt-0.5 text-xs text-gray-400">
              下单时间 {formatTime(order.createdAt)}
            </p>
          </div>
          <span
            className={`rounded-full px-2.5 py-1 text-xs ${orderStatusClass(order.status)}`}
          >
            {orderStatusText(order.status)}
          </span>
        </div>

        {order.trackingNo && (
          <p className="rounded-lg bg-indigo-50 px-3 py-2 text-sm text-indigo-700">
            发货单号：<span className="font-mono">{order.trackingNo}</span>
          </p>
        )}

        {cancelled && (
          <div className="rounded-lg bg-white px-3 py-2 text-sm ring-1 ring-gray-200">
            <p className="text-gray-600">管理员取消留言：</p>
            <p className="mt-1 text-gray-900">{order.cancelReason ?? "（无留言）"}</p>
          </div>
        )}

        {order.status === "SHIPPED" && (
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm text-gray-500">收到货了？点击右侧按钮结束订单。</p>
            <ConfirmReceiptButton orderId={order.id} />
          </div>
        )}

        {order.status === "PROCESSING" && (
          <p className="text-sm text-gray-500">商家已接单，正在处理中。</p>
        )}
        {order.status === "COMPLETED" && (
          <p className="text-sm text-gray-500">订单已完成，感谢购买。</p>
        )}
        {order.status === "PENDING" && (
          <p className="text-sm text-gray-500">订单已支付，等待商家处理。</p>
        )}
      </div>

      {/* 收货信息 */}
      <div className="card space-y-1 text-sm">
        <p className="text-sm font-medium text-gray-900">收货信息</p>
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

      {/* 商品明细 */}
      <div className="card space-y-3">
        <p className="text-sm font-medium text-gray-900">商品明细</p>
        <ul className="space-y-2">
          {order.items.map((item) => (
            <li key={item.id} className="flex items-center justify-between gap-3 text-sm">
              <Link
                href={`/products/${item.productId}`}
                className={`min-w-0 flex-1 truncate hover:underline ${
                  cancelled ? "text-gray-500" : "text-gray-900"
                }`}
              >
                {item.title}
              </Link>
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

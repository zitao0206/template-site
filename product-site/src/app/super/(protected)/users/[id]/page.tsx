import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { userOrderStatusText, orderStatusClass } from "@/lib/order-status";

export const dynamic = "force-dynamic";

function formatTime(date: Date) {
  return new Date(date).toLocaleString("zh-CN", { hour12: false });
}

// 超级管理员查看单个用户信息
export default async function SuperUserDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const id = Number(params.id);
  if (!Number.isInteger(id) || id <= 0) {
    notFound();
  }

  const user = await prisma.user.findUnique({
    where: { id },
    include: {
      addresses: { orderBy: [{ isDefault: "desc" }, { id: "asc" }] },
      orders: { orderBy: { createdAt: "desc" } },
    },
  });
  if (!user) {
    notFound();
  }

  const validOrders = user.orders.filter((o) => o.status !== "CANCELLED");
  const totalAmount = validOrders.reduce((sum, o) => sum + o.totalAmount, 0);

  return (
    <div className="space-y-4">
      <Link href="/super/users" className="text-sm text-gray-500 hover:text-gray-900">
        ← 返回用户列表
      </Link>

      <h2 className="text-lg font-semibold">用户信息</h2>

      <div className="card space-y-2 text-sm">
        <p className="text-gray-500">
          邮箱 <span className="text-gray-900">{user.email}</span>
        </p>
        <p className="text-gray-500">
          用户 ID <span className="font-mono text-gray-900">{user.id}</span>
        </p>
        <p className="text-gray-500">
          注册时间 <span className="text-gray-900">{formatTime(user.createdAt)}</span>
        </p>
        <p className="text-gray-500">
          订单数 <span className="text-gray-900">{user.orders.length}</span>
          <span className="ml-3">消费金额（不含取消）</span>
          <span className="text-gray-900">¥{(totalAmount / 100).toFixed(2)}</span>
        </p>
      </div>

      <div className="card space-y-2">
        <p className="text-sm font-medium text-gray-900">
          收货地址（{user.addresses.length}）
        </p>
        {user.addresses.length === 0 ? (
          <p className="text-sm text-gray-400">该用户还没有保存地址</p>
        ) : (
          <ul className="space-y-2">
            {user.addresses.map((addr) => (
              <li
                key={addr.id}
                className="rounded-lg bg-gray-50 px-3 py-2 text-sm text-gray-600"
              >
                <div>
                  <span className="font-medium text-gray-900">{addr.name}</span>
                  <span className="ml-2">{addr.phone}</span>
                  <span className="ml-2 text-xs text-gray-400">邮编 {addr.zipCode}</span>
                  {addr.isDefault && (
                    <span className="ml-2 rounded bg-blue-50 px-1.5 py-0.5 text-xs text-blue-600">
                      默认
                    </span>
                  )}
                </div>
                <p className="mt-1">{addr.detail}</p>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="card space-y-2">
        <p className="text-sm font-medium text-gray-900">
          订单记录（{user.orders.length}）
        </p>
        {user.orders.length === 0 ? (
          <p className="text-sm text-gray-400">该用户还没有订单</p>
        ) : (
          <ul className="space-y-2">
            {user.orders.map((o) => (
              <li
                key={o.id}
                className="flex flex-wrap items-center justify-between gap-2 rounded-lg bg-gray-50 px-3 py-2 text-sm"
              >
                <span className="font-mono text-gray-900">{o.orderNo}</span>
                <div className="flex items-center gap-3 text-gray-500">
                  <span>{formatTime(o.createdAt)}</span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs ${orderStatusClass(o.status)}`}
                  >
                    {userOrderStatusText(o.status)}
                  </span>
                  <span className="text-gray-900">
                    ¥{(o.totalAmount / 100).toFixed(2)}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

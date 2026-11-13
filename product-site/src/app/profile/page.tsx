import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { readSession } from "@/lib/session";

export const dynamic = "force-dynamic";

function formatDate(date: Date) {
  return new Date(date).toLocaleDateString("zh-CN");
}

// 个人资料：账号信息 + 我的地址 / 订单 / 购物车入口
export default async function ProfilePage() {
  const session = await readSession();
  if (!session) {
    redirect("/login?redirect=/profile");
  }
  if (session.uid === null) {
    redirect("/admin");
  }

  const userId = session.uid;
  const [user, addressCount, orderCount] = await Promise.all([
    prisma.user.findUnique({ where: { id: userId } }),
    prisma.address.count({ where: { userId } }),
    prisma.order.count({ where: { userId } }),
  ]);

  if (!user) {
    redirect("/login?redirect=/profile");
  }

  const entries = [
    {
      href: "/profile/addresses",
      title: "我的地址",
      desc: addressCount > 0 ? `已保存 ${addressCount} 条收货地址` : "还没有收货地址",
    },
    {
      href: "/orders",
      title: "我的订单",
      desc: orderCount > 0 ? `共 ${orderCount} 笔订单` : "还没有订单",
    },
    {
      href: "/cart",
      title: "我的购物车",
      desc: "查看购物车并结算",
    },
  ];

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-xl font-semibold">个人资料</h1>
        <p className="mt-1 text-sm text-gray-500">账号信息与常用功能入口。</p>
      </div>

      <div className="card space-y-3">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-lg font-medium text-blue-600">
            {user.email.slice(0, 1).toUpperCase()}
          </div>
          <div className="min-w-0">
            <p className="truncate text-base font-medium text-gray-900">
              {user.email}
            </p>
            <p className="text-xs text-gray-500">普通用户</p>
          </div>
        </div>

        <div className="grid gap-2 border-t border-gray-100 pt-3 text-sm text-gray-500 sm:grid-cols-2">
          <p>
            注册时间：<span className="text-gray-900">{formatDate(user.createdAt)}</span>
          </p>
          <p>
            收货地址：<span className="text-gray-900">{addressCount} 条</span>
          </p>
        </div>
      </div>

      <ul className="space-y-3">
        {entries.map((entry) => (
          <li key={entry.href}>
            <Link
              href={entry.href}
              className="card flex items-center justify-between transition hover:border-blue-300"
            >
              <div>
                <p className="text-sm font-medium text-gray-900">{entry.title}</p>
                <p className="mt-0.5 text-xs text-gray-500">{entry.desc}</p>
              </div>
              <span className="text-gray-400">›</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

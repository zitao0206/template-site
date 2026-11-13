import Link from "next/link";
import { getCurrentAdmin } from "@/lib/session";
import LogoutButton from "@/components/LogoutButton";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // middleware 已经拦过未登录请求，这里只是取账号名用于展示
  const admin = await getCurrentAdmin();

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-gray-200 pb-3">
        <div className="flex items-center gap-5 text-sm">
          <Link href="/admin" className="font-medium">
            商品管理
          </Link>
          <Link
            href="/admin/products/new"
            className="text-gray-600 hover:text-gray-900"
          >
            新建商品
          </Link>
          <Link href="/" className="text-gray-600 hover:text-gray-900">
            返回前台
          </Link>
        </div>
        <div className="flex items-center gap-3 text-sm text-gray-500">
          <span>管理员 {admin?.email ?? "-"}</span>
          <LogoutButton label="退出后台" />
        </div>
      </div>
      {children}
    </div>
  );
}

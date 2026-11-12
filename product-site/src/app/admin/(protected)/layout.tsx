import { redirect } from "next/navigation";
import Link from "next/link";
import { getSession } from "@/lib/session";
import LogoutButton from "@/components/LogoutButton";

/**
 * 管理后台守卫：不是 admin 一律踢到登录页。
 * 放在 (protected) 路由组里，这样 /admin/login 不会被它拦到。
 */
export default async function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (!session || session.role !== "admin") {
    redirect("/admin/login");
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-4 border-b border-gray-200 pb-3 text-sm">
        <span className="rounded bg-gray-900 px-2 py-0.5 text-xs text-white">管理员</span>
        <Link href="/admin" className="text-gray-700 hover:text-gray-900">
          概览
        </Link>
        <Link href="/admin/products" className="text-gray-700 hover:text-gray-900">
          商品管理
        </Link>
        <Link
          href="/admin/products/new"
          className="text-gray-700 hover:text-gray-900"
        >
          发布商品
        </Link>
        <div className="ml-auto flex items-center gap-3">
          <span className="text-gray-400">{session.email}</span>
          <LogoutButton />
        </div>
      </div>
      {children}
    </div>
  );
}

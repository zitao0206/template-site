import { redirect } from "next/navigation";
import Link from "next/link";
import { getSession } from "@/lib/session";
import AdminNav from "@/components/AdminNav";

/**
 * 管理后台守卫：不是 admin 一律踢到登录页。
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
      <AdminNav />
      {children}
    </div>
  );
}

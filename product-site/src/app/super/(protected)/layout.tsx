import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import SuperNav from "@/components/SuperNav";

// 超级管理员区域守卫：不是 super 一律踢到超级管理员登录页
export default async function ProtectedSuperLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (!session || session.role !== "super") {
    redirect("/super/login");
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h1 className="text-lg font-semibold">超级管理</h1>
        <p className="text-sm text-gray-500">当前账号：{session.email}</p>
      </div>
      <SuperNav />
      {children}
    </div>
  );
}

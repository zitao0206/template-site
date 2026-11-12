import { Metadata } from "next";
import UserHeader from "@/components/UserHeader";

export const metadata: Metadata = {
  title: "用户中心",
};

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* 顶部导航栏 */}
      <header className="border-b px-6 py-4 flex items-center justify-between">
        <div className="text-lg font-medium">用户中心</div>
        {/* 右上角用户区域，单独抽成客户端组件，这里引入 */}
        <UserHeader />
      </header>

      {/* 页面主体 */}
      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  );
}

// 注意：layout是服务端组件，用户交互（signOut）必须抽离到单独客户端组件
// 下面新建 components/UserHeader.tsx

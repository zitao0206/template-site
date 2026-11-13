import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { getCurrentUser } from "@/lib/session";
import LogoutButton from "@/components/LogoutButton";

export const metadata: Metadata = {
  title: "ShopBase · 商品展示与管理",
  description: "Next.js 全栈骨架：商品管理、用户注册登录、商品浏览",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  return (
    <html lang="zh-CN">
      <body>
        <header className="border-b border-gray-200 bg-white">
          <div className="wrap flex h-14 items-center justify-between">
            <Link href="/" className="text-[15px] font-semibold tracking-tight">
              ShopBase
            </Link>
            <nav className="flex items-center gap-4 text-sm">
              <Link
                href="/admin"
                className="text-gray-600 transition-colors hover:text-gray-900"
              >
                管理后台
              </Link>
              {user ? (
                <>
                  <span className="hidden text-gray-500 sm:inline">
                    {user.email}
                  </span>
                  <LogoutButton />
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="text-gray-600 transition-colors hover:text-gray-900"
                  >
                    登录
                  </Link>
                  <Link href="/register" className="btn btn-primary">
                    注册
                  </Link>
                </>
              )}
            </nav>
          </div>
        </header>
        <main className="wrap py-8">{children}</main>
        <footer className="wrap pb-10 pt-4 text-xs text-gray-400">
          Next.js + TypeScript + SQLite 骨架 · 第一版
        </footer>
      </body>
    </html>
  );
}

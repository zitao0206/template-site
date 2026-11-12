import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "商品站首页",
  description: "一个人也能维护的模版商品管理系统",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body>
        <header className="border-b border-gray-200 bg-white">
          <nav className="mx-auto flex max-w-5xl items-center gap-6 px-4 py-3 text-sm">
            <Link href="/" className="font-semibold text-gray-900">
              商品站首页
            </Link>
            <Link href="/products" className="text-gray-600 hover:text-gray-900">
              全部商品
            </Link>
            <div className="ml-auto flex items-center gap-3">
              <Link href="/login" className="text-gray-600 hover:text-gray-900">
                登录
              </Link>
              <Link href="/register" className="text-gray-600 hover:text-gray-900">
                注册
              </Link>
              {/* <Link
                href="/admin"
                className="rounded-md bg-gray-900 px-3 py-1.5 text-white hover:bg-gray-700"
              >
                管理后台
              </Link> */}
            </div>
          </nav>
        </header>
        <main className="mx-auto max-w-5xl px-4 py-8">{children}</main>
      </body>
    </html>
  );
}

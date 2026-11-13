import type { Metadata } from "next";
import "./globals.css";
// 这里改成 NavHeader
import NavHeader from "@/components/NavHeader";

export const metadata: Metadata = {
  title: "简易电商网站模版",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body>
        <NavHeader />
        <main className="mx-auto max-w-5xl px-4 py-8">{children}</main>
      </body>
    </html>
  );
}

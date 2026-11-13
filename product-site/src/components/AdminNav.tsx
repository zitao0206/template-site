"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "概览", href: "/admin" },
  { label: "商品管理", href: "/admin/products" },
  { label: "发布商品", href: "/admin/products/new" },
];

export default function AdminNav() {
  const pathname = usePathname();

  // 严格全匹配，只有完全相等才高亮
  const isActive = (href: string) => pathname === href;

  return (
    <div className="flex flex-wrap items-center gap-4 border-b border-gray-200 pb-3 text-sm">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`rounded-md px-3 py-1.5 transition-colors ${
            isActive(item.href)
              ? "bg-gray-900 text-white"
              : "text-gray-700 hover:text-gray-900"
          }`}
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
}

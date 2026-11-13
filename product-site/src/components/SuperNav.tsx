"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "管理员账号", href: "/super/admins" },
  { label: "用户列表", href: "/super/users" },
];

export default function SuperNav() {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

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

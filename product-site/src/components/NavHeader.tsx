'use client';
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type User = {
  id: number;
  email: string;
  role: "user" | "admin";
} | null;

export default function NavHeader() {
  const router = useRouter();
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const res = await fetch("/api/auth/me", { cache: "no-store" });
      if (res.ok) {
        const u = await res.json();
        setUser(u);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
    const onFocus = () => fetchUser();
    // ✅ 新增：登录/退出全局事件监听
    const onAuthUpdated = () => fetchUser();

    window.addEventListener("focus", onFocus);
    window.addEventListener("auth:updated", onAuthUpdated);

    return () => {
      window.removeEventListener("focus", onFocus);
      window.removeEventListener("auth:updated", onAuthUpdated);
    };
  }, []);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    // ✅ 退出的时候也派发事件（兜底）
    window.dispatchEvent(new Event("auth:updated"));
    router.push("/");
    router.refresh();
  };

  return (
    <header className="border-b border-gray-200 bg-white">
      <nav className="mx-auto flex max-w-5xl items-center gap-6 px-4 py-3 text-sm">
        <Link href="/" className="font-semibold text-gray-900">
          商品站首页
        </Link>

        <div className="ml-auto flex items-center gap-3">
          {loading ? (
            <span className="text-gray-400">加载中</span>
          ) : !user ? (
            <>
              <Link href="/login" className="text-gray-600 hover:text-gray-900">
                登录
              </Link>
              <Link href="/register" className="text-gray-600 hover:text-gray-900">
                注册
              </Link>
            </>
          ) : (
            <>
              <span className="text-gray-600">{user.email}</span>
              <button
                onClick={handleLogout}
                className="text-gray-600 hover:text-gray-900"
              >
                退出登录
              </button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

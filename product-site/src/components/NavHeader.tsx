"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// /api/auth/me 返回的是 uid（管理员为 null），不是 id
type User = {
  uid: number | null;
  email: string;
  role: "user" | "admin";
} | null;

export default function NavHeader() {
  const router = useRouter();
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);
  const [cartCount, setCartCount] = useState(0);

  // 管理员是写死账号，没有购物车，右上角不显示购物车入口
  const isAdmin = user?.role === "admin";

  // 购物车角标：显示商品种类数（同一商品买多件只算 1 种）
  const fetchCartCount = async () => {
    try {
      const res = await fetch("/api/cart", { cache: "no-store" });
      if (!res.ok) {
        setCartCount(0);
        return;
      }
      const data = await res.json();
      setCartCount(data.itemCount ?? data.items?.length ?? 0);
    } catch {
      setCartCount(0);
    }
  };

  const fetchUser = async () => {
    try {
      const res = await fetch("/api/auth/me", { cache: "no-store" });
      if (res.ok) {
        const u = await res.json();
        setUser(u);
        // 只有普通用户才拉购物车：管理员没有购物车，未登录会 401
        if (u?.role === "admin") {
          setCartCount(0);
        } else {
          await fetchCartCount();
        }
      } else {
        setUser(null);
        setCartCount(0);
      }
    } catch {
      setUser(null);
      setCartCount(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();

    const onFocus = () => fetchUser();
    const onAuthUpdated = () => fetchUser();
    // 加入/修改/删除购物车后由页面派发，导航栏立刻刷新角标
    const onCartUpdated = () => fetchCartCount();

    window.addEventListener("focus", onFocus);
    window.addEventListener("auth:updated", onAuthUpdated);
    window.addEventListener("cart:updated", onCartUpdated);

    return () => {
      window.removeEventListener("focus", onFocus);
      window.removeEventListener("auth:updated", onAuthUpdated);
      window.removeEventListener("cart:updated", onCartUpdated);
    };
  }, []);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    setCartCount(0);
    window.dispatchEvent(new Event("auth:updated"));
    router.push("/");
    router.refresh();
  };

  // 未登录点购物车 → 先去登录，登录完自动回到购物车
  const goCart = () => {
    router.push(user ? "/cart" : "/login?redirect=/cart");
  };

  return (
    <header className="border-b border-gray-200 bg-white">
      <nav className="mx-auto flex max-w-5xl items-center gap-6 px-4 py-3 text-sm">
        <Link href="/" className="font-semibold text-gray-900">
          商品站首页
        </Link>
        <Link href="/products" className="text-gray-600 hover:text-gray-900">
          全部商品
        </Link>

        <div className="ml-auto flex items-center gap-3">
          {/* 我的订单入口：在购物车左边；登录用户可见，管理员走后台 */}
          {!loading && user && !isAdmin && (
            <Link
              href="/orders"
              className="text-gray-600 transition hover:text-gray-900"
            >
              我的订单
            </Link>
          )}

          {/* 购物车入口：图标 + 种类角标；管理员账号不显示 */}
          {!loading && !isAdmin && (
            <button
              type="button"
              onClick={goCart}
              aria-label={cartCount > 0 ? `购物车，共 ${cartCount} 种商品` : "购物车"}
              className="relative rounded-full p-1.5 text-gray-600 transition hover:bg-gray-100 hover:text-gray-900"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="21"
                height="21"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 min-w-[18px] rounded-full bg-red-500 px-1 text-center text-[11px] font-medium leading-[18px] text-white">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </button>
          )}

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
              {/* 邮箱改成按钮：普通用户进个人资料，管理员进后台 */}
              <button
                type="button"
                onClick={() => router.push(isAdmin ? "/admin" : "/profile")}
                title={isAdmin ? "进入后台" : "查看个人资料"}
                className="max-w-[160px] truncate rounded-md px-2 py-1 text-gray-600 transition hover:bg-gray-100 hover:text-gray-900"
              >
                {user.email}
              </button>
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

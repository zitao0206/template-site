'use client';
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type UserInfo = {
  email: string | null;
};

export default function UserHeader() {
  const router = useRouter();
  const [user, setUser] = useState<UserInfo>({ email: null });
  const [loading, setLoading] = useState(true);

  // 读取当前登录用户信息（你需要配套一个 /api/auth/me 接口返回 {email: "xxx@xx.com"}）
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/auth/me");
        if (res.ok) {
          const data = await res.json();
          setUser({ email: data.email });
        }
      } catch (err) {
        setUser({ email: null });
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  async function onLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/"); // 退出后跳首页，你可以改成 /login
    router.refresh();
  }

  if (loading) return <span className="text-gray-400">加载中...</span>;

  // 未登录：显示登录链接
  if (!user.email) {
    return (
      <a href="/login" className="text-gray-500 hover:text-gray-900">
        登录
      </a>
    );
  }

  // 已登录：展示邮箱 + 退出，样式和管理员右上角保持一致
  return (
    <div className="flex items-center gap-6 text-gray-500">
      <span>{user.email}</span>
      <button onClick={onLogout} className="hover:text-gray-900">
        退出登录
      </button>
    </div>
  );
}

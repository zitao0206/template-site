import LoginForm from "@/components/LoginForm";

export default function LoginPage() {
  return (
    <div className="mx-auto max-w-sm">
      <h1 className="mb-1 text-xl font-semibold">用户登录</h1>
      <p className="mb-6 text-sm text-gray-500">邮箱 + 密码登录</p>
      <div className="card">
        <LoginForm mode="user" />
      </div>
      <p className="mt-4 text-center text-sm text-gray-500">
        还没有账号？{" "}
        <a href="/register" className="text-blue-600 hover:underline">
          注册
        </a>
      </p>
    </div>
  );
}

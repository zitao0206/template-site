import LoginForm from "@/components/LoginForm";

export default function SuperLoginPage() {
  return (
    <div className="mx-auto max-w-sm py-10">
      <h1 className="mb-1 text-xl font-semibold">超级管理员登录</h1>
      <p className="mb-6 text-sm text-gray-500">
        账号 super，密码 456789（写在 .env 的 SUPER_ACCOUNT / SUPER_PASSWORD_HASH）
      </p>
      <div className="card">
        <LoginForm mode="super" />
      </div>
    </div>
  );
}

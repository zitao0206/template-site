import LoginForm from "@/components/LoginForm";

export default function AdminLoginPage() {
  return (
    <div className="mx-auto max-w-sm py-10">
      <h1 className="mb-1 text-xl font-semibold">管理员登录</h1>
      <p className="mb-6 text-sm text-gray-500">
        内置账号在 .env，另有超级管理员添加的账号；超级管理员入口在 /super/login
      </p>
      <div className="card">
        <LoginForm mode="admin" />
      </div>
    </div>
  );
}

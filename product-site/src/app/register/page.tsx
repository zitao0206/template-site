import RegisterForm from "@/components/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="mx-auto max-w-sm">
      <h1 className="mb-1 text-xl font-semibold">用户注册</h1>
      <p className="mb-6 text-sm text-gray-500">V1 只支持邮箱注册</p>
      <div className="card">
        <RegisterForm />
      </div>
      <p className="mt-4 text-center text-sm text-gray-500">
        已有账号？{" "}
        <a href="/login" className="text-blue-600 hover:underline">
          登录
        </a>
      </p>
    </div>
  );
}

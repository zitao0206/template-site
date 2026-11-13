import { redirect } from "next/navigation";

// /super 默认进「管理员账号」tab
export default function SuperIndexPage() {
  redirect("/super/admins");
}

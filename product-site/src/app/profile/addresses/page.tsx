import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { readSession } from "@/lib/session";
import AddressManager from "@/components/AddressManager";

export const dynamic = "force-dynamic";

type Search = { from?: string };

// 地址管理：列表 + 新增 + 编辑 + 删除
export default async function AddressesPage({
  searchParams,
}: {
  searchParams: Search;
}) {
  const session = await readSession();
  if (!session) {
    redirect("/login?redirect=/profile/addresses");
  }
  if (session.uid === null) {
    redirect("/admin");
  }

  // 从结算/收银台进来的，返回链接要回原页面，不能写死「返回个人资料」
  const rawFrom = typeof searchParams.from === "string" ? searchParams.from : "";
  const safeFrom =
    rawFrom.startsWith("/") && !rawFrom.startsWith("//") ? rawFrom : null;

  const addresses = await prisma.address.findMany({
    where: { userId: session.uid },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <Link
        href={safeFrom ?? "/profile"}
        className="text-sm text-gray-500 hover:text-gray-900"
      >
        {safeFrom ? "← 返回下单页" : "← 返回个人资料"}
      </Link>

      <div>
        <h1 className="text-xl font-semibold">我的地址</h1>
        <p className="mt-1 text-sm text-gray-500">
          新增、编辑或删除收货地址。
        </p>
      </div>

      <AddressManager
        initialAddresses={addresses.map((a) => ({
          id: a.id,
          name: a.name,
          phone: a.phone,
          zipCode: a.zipCode,
          detail: a.detail,
          isDefault: a.isDefault,
        }))}
      />
    </div>
  );
}

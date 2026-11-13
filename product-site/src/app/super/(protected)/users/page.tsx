import { prisma } from "@/lib/prisma";
import SuperUsers from "@/components/SuperUsers";

export const dynamic = "force-dynamic";

export default async function SuperUsersPage() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      email: true,
      createdAt: true,
      _count: { select: { orders: true, addresses: true } },
    },
  });

  return (
    <SuperUsers
      users={users.map((u) => ({
        id: u.id,
        email: u.email,
        createdAt: u.createdAt.toISOString(),
        orderCount: u._count.orders,
        addressCount: u._count.addresses,
      }))}
    />
  );
}

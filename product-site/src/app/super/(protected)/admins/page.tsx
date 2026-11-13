import { prisma } from "@/lib/prisma";
import SuperAdmins from "@/components/SuperAdmins";

export const dynamic = "force-dynamic";

export default async function SuperAdminsPage() {
  const admins = await prisma.admin.findMany({
    orderBy: { createdAt: "desc" },
    select: { id: true, email: true, createdAt: true },
  });

  return (
    <SuperAdmins
      admins={admins.map((a) => ({
        id: a.id,
        email: a.email,
        createdAt: a.createdAt.toISOString(),
      }))}
      builtinEmail={process.env.ADMIN_EMAIL ?? "admin@example.com"}
    />
  );
}

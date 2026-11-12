import { PrismaClient } from "@prisma/client";

// 开发环境热更新会重复 new PrismaClient，这里用全局单例兜住
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

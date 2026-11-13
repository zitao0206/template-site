import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

/**
 * 用户表：第一版只支持邮箱 + 密码
 * 未来 App 登录复用同一张表，不区分 Web / App 用户
 */
export const users = sqliteTable("users", {
  id: text("id").primaryKey(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  displayName: text("display_name"),
  createdAt: integer("created_at", { mode: "timestamp_ms" }).notNull(),
});

/**
 * 商品表
 * status: published = 用户端可见；draft = 仅后台可见
 * priceCents: 以「分」为单位存整数，避免浮点误差
 */
export const products = sqliteTable("products", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  summary: text("summary").notNull().default(""),
  description: text("description").notNull().default(""),
  priceCents: integer("price_cents").notNull().default(0),
  stock: integer("stock").notNull().default(0),
  imageUrl: text("image_url").notNull().default(""),
  status: text("status", { enum: ["published", "draft"] })
    .notNull()
    .default("published"),
  createdAt: integer("created_at", { mode: "timestamp_ms" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp_ms" }).notNull(),
});

export type User = typeof users.$inferSelect;
export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;

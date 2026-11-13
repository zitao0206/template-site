import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().trim().toLowerCase().email("邮箱格式不正确").max(120),
  password: z.string().min(6, "密码至少 6 位").max(72, "密码最长 72 位"),
  displayName: z.string().trim().max(40, "昵称最长 40 字").optional(),
});

export const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email("邮箱格式不正确"),
  password: z.string().min(1, "请输入密码"),
});

export const productSchema = z.object({
  title: z.string().trim().min(1, "请输入商品标题").max(120, "标题最长 120 字"),
  summary: z.string().trim().max(200, "简介最长 200 字").default(""),
  description: z.string().trim().max(5000, "详情最长 5000 字").default(""),
  priceCents: z.coerce
    .number()
    .int("价格必须是整数（分）")
    .min(0, "价格不能为负")
    .max(100_000_000, "价格过大"),
  stock: z.coerce.number().int("库存必须是整数").min(0, "库存不能为负"),
  imageUrl: z.string().trim().max(500, "图片地址过长").default(""),
  status: z.enum(["published", "draft"]).default("published"),
});

export const productUpdateSchema = productSchema.partial();

export type ProductInput = z.infer<typeof productSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;

import { z } from "zod";

// 这些校验规则前后端共用：后端挡脏数据，前端可提前给提示
export const registerSchema = z.object({
  email: z.string().trim().email("邮箱格式不正确"),
  password: z.string().min(6, "密码至少 6 位").max(64, "密码太长"),
});

export const loginSchema = z.object({
  email: z.string().trim().email("邮箱格式不正确"),
  password: z.string().min(1, "请输入密码"),
});

export const productSchema = z.object({
  title: z.string().trim().min(1, "标题必填").max(100, "标题最多 100 字"),
  description: z.string().trim().max(5000, "描述最多 5000 字").optional().or(z.literal("")),
  price: z.coerce.number().int("价格必须是整数（单位：分）").min(0, "价格不能为负"),
  imageUrl: z.string().trim().url("图片地址必须是完整 URL").optional().or(z.literal("")),
  status: z.enum(["DRAFT", "PUBLISHED"]).default("PUBLISHED"),
  stock: z.number().int().min(0, "库存不能为负数"), // ✅新增这一行
});

export type ProductInput = z.infer<typeof productSchema>;

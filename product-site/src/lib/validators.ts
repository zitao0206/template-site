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

// 购物车：加入时可以带数量，不传默认 1
export const cartAddSchema = z.object({
  productId: z.coerce.number().int("商品 id 必须是整数").positive("商品 id 不合法"),
  quantity: z.coerce
    .number()
    .int("数量必须是整数")
    .min(1, "数量至少为 1")
    .max(999, "单次最多加 999 件")
    .default(1),
});

// 购物车：改数量，最小 1（要清空请走删除接口）
export const cartQuantitySchema = z.object({
  quantity: z.coerce.number().int("数量必须是整数").min(1, "数量至少为 1"),
});

// 购物车：支付成功后按结算明细清理（数量可能因库存被下调，所以按件数扣减）
export const cartSettleSchema = z.object({
  items: z
    .array(
      z.object({
        productId: z.coerce.number().int("商品 id 必须是整数").positive("商品 id 不合法"),
        quantity: z.coerce.number().int("数量必须是整数").min(1, "数量至少为 1"),
      }),
    )
    .min(1, "请提供要结算的商品"),
});

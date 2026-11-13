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

// 支付成功结算：扣库存 + （购物车来源时）清理已结算条目
export const orderPaySchema = z.object({
  orderNo: z.string().trim().min(1, "缺少订单号").max(64, "订单号太长"),
  // 收货地址：必须选一条自己的地址，下单时快照进订单
  addressId: z.coerce.number().int("收货地址不合法").positive("请先选择收货地址"),
  fromCart: z.boolean().default(false),
  items: z
    .array(
      z.object({
        productId: z.coerce.number().int("商品 id 必须是整数").positive("商品 id 不合法"),
        quantity: z.coerce.number().int("数量必须是整数").min(1, "数量至少为 1"),
      }),
    )
    .min(1, "请提供要结算的商品"),
});

// 收货地址：收件人 / 手机号 / 邮编 / 详细地址
export const addressSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "收件人姓名至少 2 个字")
    .max(20, "收件人姓名最多 20 个字"),
  phone: z
    .string()
    .trim()
    .regex(/^1[3-9]\d{9}$/, "请输入 11 位手机号"),
  zipCode: z
    .string()
    .trim()
    .regex(/^\d{6}$/, "邮政编码应为 6 位数字"),
  detail: z
    .string()
    .trim()
    .min(5, "详细地址至少 5 个字")
    .max(120, "详细地址最多 120 个字"),
  // 是否设为默认地址；不传按 false 处理（首条地址由接口自动设为默认）
  isDefault: z.boolean().optional(),
});

// 管理员订单操作：接单 / 取消（带留言） / 发货（带单号）
export const orderActionSchema = z.discriminatedUnion("action", [
  z.object({ action: z.literal("accept") }),
  z.object({
    action: z.literal("cancel"),
    reason: z
      .string()
      .trim()
      .min(2, "请填写取消原因（至少 2 个字）")
      .max(100, "取消原因最多 100 个字"),
  }),
  z.object({
    action: z.literal("ship"),
    trackingNo: z
      .string()
      .trim()
      .min(5, "发货单号至少 5 位")
      .max(40, "发货单号最多 40 位"),
  }),
]);

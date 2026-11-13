// 订单状态字典：文案与徽标配色（类名必须写成完整字面量，避免被 Tailwind 裁掉）
export const ORDER_STATUS_TEXT: Record<string, string> = {
  PENDING: "待处理",
  PROCESSING: "处理中",
  SHIPPED: "已发货",
  COMPLETED: "已结束",
  CANCELLED: "已取消",
  PAID: "待处理",
};

export const ORDER_STATUS_CLASS: Record<string, string> = {
  PENDING: "bg-amber-50 text-amber-600",
  PROCESSING: "bg-blue-50 text-blue-600",
  SHIPPED: "bg-indigo-50 text-indigo-600",
  COMPLETED: "bg-green-50 text-green-600",
  CANCELLED: "bg-gray-100 text-gray-500",
  PAID: "bg-amber-50 text-amber-600",
};

export function orderStatusText(status: string) {
  return ORDER_STATUS_TEXT[status] ?? status;
}

export function orderStatusClass(status: string) {
  return ORDER_STATUS_CLASS[status] ?? "bg-gray-100 text-gray-500";
}

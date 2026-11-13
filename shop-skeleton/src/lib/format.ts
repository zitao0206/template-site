/** 分 → 元，展示用 */
export function formatPrice(cents: number): string {
  return `¥${(cents / 100).toFixed(2)}`;
}

/** 时间展示，固定 zh-CN，避免服务端与客户端格式不一致导致水合报错 */
export function formatDate(value: Date | number): string {
  const date = typeof value === "number" ? new Date(value) : value;
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
    date.getDate()
  )} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

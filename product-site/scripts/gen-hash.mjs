// 生成管理员密码的 bcrypt 哈希，并自动写入 .env 的 ADMIN_PASSWORD_HASH
// 用法：npm run gen:hash -- 你的密码
// 说明：bcrypt 哈希里带 $，在 .env 里必须写成 \$ 才不会被打成空值 —— 本脚本会自动转义
import fs from "node:fs";
import path from "node:path";
import bcrypt from "bcryptjs";

const pwd = process.argv[2];
if (!pwd) {
  console.error("用法: npm run gen:hash -- 你的密码");
  process.exit(1);
}

const hash = await bcrypt.hash(pwd, 10);
const escaped = hash.replace(/\$/g, "\\$");
const line = `ADMIN_PASSWORD_HASH="${escaped}"`;

const envPath = path.join(process.cwd(), ".env");
if (fs.existsSync(envPath)) {
  const content = fs.readFileSync(envPath, "utf8");
  const updated = /^ADMIN_PASSWORD_HASH=.*$/m.test(content)
    ? content.replace(/^ADMIN_PASSWORD_HASH=.*$/m, line)
    : `${content.trimEnd()}\n${line}\n`;
  fs.writeFileSync(envPath, updated, "utf8");
  console.log("✅ 已写入 .env 的 ADMIN_PASSWORD_HASH（已自动转义 $）");
} else {
  console.log("未找到 .env，请把下面这行手动加到 .env：");
  console.log(line);
}
console.log("原始哈希:", hash);

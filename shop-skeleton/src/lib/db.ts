import fs from "node:fs";
import path from "node:path";
import { randomUUID } from "node:crypto";
import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import * as schema from "./schema";

const DB_DIR = path.join(process.cwd(), "data");
// 默认落在 data/app.db；测试时可用 DATABASE_FILE=:memory: 跑内存库
const DB_FILE = process.env.DATABASE_FILE ?? path.join(DB_DIR, "app.db");

const isMemory = DB_FILE === ":memory:";

function createDb() {
  if (!isMemory && !fs.existsSync(DB_DIR)) {
    fs.mkdirSync(DB_DIR, { recursive: true });
  }

  const sqlite = new Database(DB_FILE);
  if (!isMemory) {
    sqlite.pragma("journal_mode = WAL");
  }
  sqlite.pragma("foreign_keys = ON");

  // 骨架阶段用「建表语句 + IF NOT EXISTS」自动初始化，
  // 正式项目请换成 drizzle-kit 生成的迁移文件。
  sqlite.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      display_name TEXT,
      created_at INTEGER NOT NULL
    );

    CREATE TABLE IF NOT EXISTS products (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      summary TEXT NOT NULL DEFAULT '',
      description TEXT NOT NULL DEFAULT '',
      price_cents INTEGER NOT NULL DEFAULT 0,
      stock INTEGER NOT NULL DEFAULT 0,
      image_url TEXT NOT NULL DEFAULT '',
      status TEXT NOT NULL DEFAULT 'published',
      created_at INTEGER NOT NULL,
      updated_at INTEGER NOT NULL
    );

    CREATE INDEX IF NOT EXISTS idx_products_status_created
      ON products (status, created_at DESC);
  `);

  seed(sqlite);

  return drizzle(sqlite, { schema });
}

/** 首次启动塞几条演示商品，方便直接看到效果 */
function seed(sqlite: Database.Database) {
  const row = sqlite
    .prepare("SELECT COUNT(*) AS c FROM products")
    .get() as { c: number };
  if (row.c > 0) return;

  const now = Date.now();
  const insert = sqlite.prepare(`
    INSERT INTO products
      (id, title, summary, description, price_cents, stock, image_url, status, created_at, updated_at)
    VALUES
      (@id, @title, @summary, @description, @priceCents, @stock, @imageUrl, @status, @createdAt, @updatedAt)
  `);

  const demo = [
    {
      title: "手冲咖啡壶套装",
      summary: "细口壶 + 滤杯 + 分享壶，新手也能稳定出品",
      description:
        "304 不锈钢细口壶，控水稳定。配套陶瓷滤杯与 400ml 玻璃分享壶，两人份刚好。\n\n规格：壶容量 600ml，滤杯 1-2 人份，分享壶 400ml。",
      priceCents: 29900,
      stock: 42,
      imageUrl: "",
    },
    {
      title: "原木桌面收纳架",
      summary: "三层结构，显示器下方空间一次利用起来",
      description:
        "北美白橡木实木，表面木蜡油处理。三层设计，可放键盘、笔记本和常用笔具。\n\n尺寸：宽 80cm × 深 24cm × 高 30cm。",
      priceCents: 45800,
      stock: 15,
      imageUrl: "",
    },
    {
      title: "便携蓝牙音箱",
      summary: "防水 IPX7，续航 18 小时",
      description:
        "双 45mm 全频单元，支持蓝牙 5.3 与 Type-C 充电。整机 IPX7 防水，浴室、露营都能用。\n\n续航 18 小时，重量 480g，附挂绳。",
      priceCents: 39900,
      stock: 0,
      imageUrl: "",
    },
  ];

  for (const item of demo) {
    insert.run({
      id: randomUUID(),
      title: item.title,
      summary: item.summary,
      description: item.description,
      priceCents: item.priceCents,
      stock: item.stock,
      imageUrl: item.imageUrl,
      status: "published",
      createdAt: now,
      updatedAt: now,
    });
  }
}

type DbClient = ReturnType<typeof createDb>;

// 开发环境热更新会反复执行模块，用 global 缓存避免打开多个数据库连接
const globalForDb = globalThis as unknown as { __db?: DbClient };

export const db: DbClient = globalForDb.__db ?? createDb();

if (process.env.NODE_ENV !== "production") {
  globalForDb.__db = db;
}

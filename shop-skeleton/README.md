# ShopBase · 第一版骨架

一个人开发的管理型网站骨架：**管理员发布商品 → 用户浏览商品**。
前后端同一种语言（TypeScript），一个 Next.js 项目同时承担页面和接口。

## 技术栈

| 层 | 选择 |
| --- | --- |
| 语言 | TypeScript 6 |
| 框架 | Next.js 15（App Router / Server Components） |
| 样式 | Tailwind CSS 4 |
| 数据库 | SQLite（better-sqlite3）+ Drizzle ORM |
| 认证 | JWT（jose）+ scrypt 口令哈希 |
| 校验 | Zod 4 |

## 环境要求

- Node.js 20 或 22 LTS（better-sqlite3 有预编译包，无需本地编译）
- **TypeScript 必须用 6.x**（`package.json` 已锁 `^6.0.3`）
  Next.js 15 依赖 TypeScript 的 JavaScript 编译器 API，而 TS 7 是 Go 重写版、
  不再提供该 API，装了 TS 7 会报 "TypeScript 7.x is not supported by this version of Next.js"。
  要用 TS 7，需要把 Next 升到 16.2.11 以上。

> SQLite 是为了「克隆下来直接能跑」，零外部依赖。
> 要换 PostgreSQL：把 `src/lib/db.ts` 里的驱动换成 `drizzle-orm/node-postgres`，
> `src/lib/schema.ts` 的 `sqliteTable` 换成 `pgTable`，其余业务代码基本不用动。

## 快速开始

```bash
npm install
npm run dev          # http://localhost:3000
```

首次启动会自动创建 `data/app.db` 并写入 3 条演示商品。

> 如果 `npm install` 卡在 better-sqlite3 上，说明在尝试本地编译，
> 可以先 `npm rebuild better-sqlite3`，或确认 Node 版本是 20/22 LTS。

管理员账号来自 `.env.local`：

```
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123456
```

- 用户端首页：<http://localhost:3000>
- 管理后台：<http://localhost:3000/admin> （未登录会跳到 `/admin-login`）

## 已实现的功能

**管理员端**

- 登录（账号密码写死在环境变量，无注册入口，令牌 12 小时过期）
- 商品列表（含草稿，分页暂未做）
- 新建 / 编辑 / 删除商品
- 发布状态：`published` 用户可见，`draft` 仅后台可见
- 删除有二次确认

**用户端**

- 商品列表（只显示已发布）
- 商品详情页
- 邮箱注册 / 登录 / 退出
- 详情页下单按钮为占位，第二版接业务

**接口层（App 可直接复用）**

- 同一套 REST 接口，网页用 Cookie，App 用 `Authorization: Bearer <token>`
- 所有写操作服务端二次校验权限

## 目录结构

```
src/
├── app/
│   ├── page.tsx                    用户端商品列表
│   ├── products/[id]/page.tsx      商品详情
│   ├── login/ register/            用户登录、注册
│   ├── admin-login/                管理员登录（在 /admin 之外，避免被中间件拦）
│   ├── admin/                      后台：列表 / 新建 / 编辑
│   └── api/
│       ├── auth/{register,login,logout,me}/route.ts
│       ├── admin/login/route.ts
│       └── products/route.ts、products/[id]/route.ts
├── components/                     表单与交互组件（客户端组件）
├── lib/
│   ├── db.ts                       数据库连接 + 建表 + 演示数据
│   ├── schema.ts                   Drizzle 表定义
│   ├── jwt.ts                      令牌签发/校验（Edge 安全，无 node:crypto）
│   ├── password.ts                 scrypt 哈希（仅 Node 端）
│   ├── session.ts                  服务端组件读取登录态
│   ├── request-auth.ts             接口层鉴权（Cookie + Bearer）
│   └── validation.ts               Zod 校验规则
└── middleware.ts                   保护 /admin/*
```

## 数据模型

**users**

| 字段 | 说明 |
| --- | --- |
| id | UUID |
| email | 唯一，统一转小写 |
| password_hash | `scrypt$salt$hash` |
| display_name | 昵称，可空 |
| created_at | 毫秒时间戳 |

**products**

| 字段 | 说明 |
| --- | --- |
| id | UUID |
| title / summary / description | 标题、一句话简介、详情 |
| price_cents | 价格，单位「分」，整数存，避免浮点误差 |
| stock | 库存 |
| image_url | 图片地址 |
| status | `published` / `draft` |
| created_at / updated_at | 毫秒时间戳 |

## 接口清单

| 方法 | 路径 | 权限 | 说明 |
| --- | --- | --- | --- |
| POST | `/api/auth/register` | 公开 | 邮箱注册，返回 token |
| POST | `/api/auth/login` | 公开 | 登录，返回 token |
| POST | `/api/auth/logout` | 公开 | 清除 Cookie |
| GET | `/api/auth/me` | 用户 | 校验 token、取当前用户 |
| POST | `/api/admin/login` | 公开 | 管理员登录 |
| GET | `/api/products` | 公开 | 已发布商品列表 |
| GET | `/api/products?status=all` | 管理员 | 全部商品（含草稿） |
| POST | `/api/products` | 管理员 | 新建 |
| GET | `/api/products/:id` | 公开/管理员 | 详情 |
| PATCH | `/api/products/:id` | 管理员 | 局部更新 |
| DELETE | `/api/products/:id` | 管理员 | 删除 |

命令行试一下：

```bash
# 注册
curl -s -X POST http://localhost:3000/api/auth/register \
  -H 'Content-Type: application/json' \
  -d '{"email":"a@b.com","password":"123456"}' | jq

# 用 token 访问（App 的调用方式）
curl -s http://localhost:3000/api/auth/me \
  -H "Authorization: Bearer <上一步返回的 token>"

# 管理员登录，保存 Cookie
curl -s -c cookie.txt -X POST http://localhost:3000/api/admin/login \
  -H 'Content-Type: application/json' \
  -d '{"username":"admin","password":"admin123456"}'

# 新建商品
curl -s -b cookie.txt -X POST http://localhost:3000/api/products \
  -H 'Content-Type: application/json' \
  -d '{"title":"测试商品","priceCents":9900,"stock":10}'
```

## 认证设计的两点考虑

1. **网址端和 App 共用一套接口**：登录成功后既写 httpOnly Cookie（网页），
   也在响应体里返回 token（App 存本地）。接口层先看 `Authorization`，再看 Cookie。
2. **权限两层校验**：`middleware.ts` 只负责拦后台**页面**；
   每个写接口内部还会再判断一次角色，防止接口被直接调用绕过。

## 第二版可以接着做

- 用户端下单 / 加购 / 收藏（`products.stock` 已经预留）
- 订单表与库存扣减（高并发场景用 Redis 预扣 + 队列落库）
- 图片上传（先接对象存储，别存数据库）
- 商品分页、搜索、分类
- 管理员操作日志
- 单元测试（Vitest）与 E2E（Playwright）

## 验证状态

已验证：

- `tsc --noEmit` 类型检查通过
- 数据层与认证逻辑冒烟测试通过（建表 / 演示数据 / 增删改查 / 邮箱唯一约束 /
  scrypt 哈希 / JWT 双角色签发校验 / Zod 校验）

需要你在本机跑一次确认页面与接口：

```bash
npm run dev
# 打开 http://localhost:3000 ，用 admin / admin123456 进后台发一个商品
```

（生成这个骨架的沙箱环境禁止删除文件，Next 启动要清理构建产物，所以没能在这里把服务跑起来。）

项目里可能残留几个临时产物，可以一次性清掉：

```bash
rm -rf .next .build .smoke data t1.txt t2 typescript-*.tgz tsconfig.tsbuildinfo next.config.ts
```

> `next.config.ts` 是早期版本，实际生效的是 `next.config.mjs`（Next 优先读 mjs），删掉 .ts 不影响运行。

## 上线前必须改的

- [ ] `AUTH_SECRET` 换成新的随机值（`openssl rand -hex 32`）
- [ ] `ADMIN_PASSWORD` 换掉，别用示例密码
- [ ] SQLite 换成 PostgreSQL，并引入 drizzle-kit 迁移（现在是启动时自动建表）
- [ ] 全站 HTTPS（`secure` Cookie 才会生效）
- [ ] 加登录失败次数限制，防撞库

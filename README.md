# 商品站 V1 · 一个人也能维护的全栈骨架

技术栈只有 5 个名字：**TypeScript + Next.js + Prisma + SQLite/PostgreSQL + Tailwind**
一套代码同时是「前端页面 + 后端接口」，一个仓库、一次部署。

---

## 1. 三分钟跑起来

```bash
# 1) 装依赖（postinstall 会自动 prisma generate）
npm install

# 2) 建库 + 灌示例商品
npm run db:push
npm run seed

# 3) 起开发服务
npm run dev
```

打开 http://localhost:3000

**默认管理员**（已写死在 .env，不进数据库）：
- 邮箱 `admin@example.com`
- 密码 `admin123456`
- 入口 http://localhost:3000/admin/login

> 正式用之前务必换掉：`npm run gen:hash -- 你的新密码`（脚本会自动把哈希写进 .env）

---

## 2. 已经能做/已验证的功能

| 需求 | 状态 | 位置 |
|---|---|---|
| 管理员发布商品 + 存数据库 | ✅ | `/admin/products/new` → `POST /api/products` |
| 管理员改 / 删 / 查 | ✅ | `/admin/products`、`/admin/products/[id]/edit` |
| 用户浏览商品列表（分页） | ✅ | `/products`、`GET /api/products` |
| 商品详情页 | ✅ | `/products/[id]`、`GET /api/products/[id]` |
| 用户邮箱注册 | ✅ | `/register` → `POST /api/auth/register` |
| 用户邮箱登录 | ✅ | `/login` → `POST /api/auth/login`（httpOnly Cookie） |
| 管理员账号密码写死 | ✅ | `ADMIN_EMAIL` / `ADMIN_PASSWORD_HASH`（.env） |
| 后台权限守卫 | ✅ | `/admin` 非管理员自动跳登录 |
| 草稿商品对外不可见 | ✅ | 只有管理员能看到 `DRAFT` |
| App 复用同一套接口 | ✅ | 支持 `Authorization: Bearer <token>` |

自测记录（已实际跑通）：注册 201 / 重复邮箱 409 / 用户发商品 403 / 管理员登录 200 / 发布 201 / 改 200 / 草稿详情 404 / 删除 200 / Bearer 取会话 200。

---

## 3. 目录结构（对照 iOS 理解）

```
src/
├── app/
│   ├── layout.tsx                 # 全局外壳（≈ App 根视图）
│   ├── page.tsx                   # 首页（Server Component，直接查库）
│   ├── products/page.tsx          # 商品列表（分页）
│   ├── products/[id]/page.tsx     # 详情
│   ├── login/ · register/         # 用户登录注册
│   ├── admin/
│   │   ├── login/page.tsx         # 管理员登录（不受守卫）
│   │   └── (protected)/           # ★ 路由组：这里才加权限守卫
│   │       ├── layout.tsx         # 非 admin 直接 redirect
│   │       ├── page.tsx           # 概览
│   │       └── products/…         # 列表 / 新增 / 编辑
│   └── api/                       # ★ 后端接口（未来 App 直接用）
│       ├── auth/{register,login,logout,me}/route.ts
│       ├── admin/login/route.ts
│       └── products/route.ts + [id]/route.ts
├── components/                    # 有交互的才加 'use client'
│   ├── ProductCard.tsx             # 纯展示（可在服务端渲染）
│   ├── LoginForm.tsx              # 'use client'
│   ├── RegisterForm.tsx           # 'use client'
│   ├── ProductForm.tsx            # 'use client'
│   ├── DeleteProductButton.tsx    # 'use client'
│   └── LogoutButton.tsx           # 'use client'
└── lib/
    ├── prisma.ts                  # Prisma 单例（≈ Core Data 容器）
    ├── jwt.ts                     # jose 签发/校验
    ├── session.ts                 # 读会话：先 Bearer，再 Cookie
    └── validators.ts              # zod 校验（前后端共用规则）
```

**记住一条铁律**：文件默认在服务器跑；要用 `useState`/`onClick` 就在文件顶部加 `'use client'`。

---

## 4. 数据模型

```prisma
User     id, email(唯一), password(bcrypt), createdAt
Product  id, title, description, price(分), imageUrl, status(PUBLISHED|DRAFT), createdAt, updatedAt
```

- **价格用「分」存整数**，避免 0.1+0.2 这类浮点问题；页面上统一 `(price/100).toFixed(2)`
- **管理员不进数据库**，只在 .env 里写死
- SQLite 不支持 enum，所以 status 用字符串，靠 `lib/validators.ts` 的 zod 约束取值

上线切 PostgreSQL 只要两步：
1. `prisma/schema.prisma` 里 `provider = "postgresql"`（可顺便把 status 改回真 enum）
2. `.env` 的 `DATABASE_URL` 换成 pg 连接串，然后 `npm run db:push`

---

## 5. 给未来 App 用的接口

App 端不需要 Cookie，登录后拿 token 放 Header：

```bash
# 登录 → 从 Set-Cookie 里取 token
curl -X POST https://你的域名/api/auth/login \
  -H 'Content-Type: application/json' \
  -d '{"email":"a@b.com","password":"123456"}'

# 之后每次都带
curl https://你的域名/api/auth/me \
  -H 'Authorization: Bearer <token>'
```

| 方法 | 路径 | 权限 |
|---|---|---|
| POST | `/api/auth/register` | 公开 |
| POST | `/api/auth/login` | 公开 |
| POST | `/api/auth/logout` | 登录 |
| GET | `/api/auth/me` | 登录 |
| GET | `/api/products?page=1&pageSize=12` | 公开（admin 可看草稿） |
| POST | `/api/products` | 管理员 |
| GET | `/api/products/:id` | 公开（草稿仅管理员） |
| PUT | `/api/products/:id` | 管理员 |
| DELETE | `/api/products/:id` | 管理员 |
| POST | `/api/admin/login` | 公开 |

---

## 6. 上线的三种方式

1. **最省事**：任意支持 Node 的云（1 核 2G 起）：`npm run build` → `npm start`，前面加个 Nginx
2. **最贴合这套栈**：Vercel（原生支持 Next.js，环境变量在后台填）
3. **国内合规**：阿里云/腾讯云 + 域名备案 + CDN 放静态资源

上线前务必：
- 换掉 `JWT_SECRET`（`openssl rand -hex 32`）
- 换掉管理员密码
- 数据库换成 PostgreSQL（SQLite 文件不适合多人并发写）

---

## 7. V2 预留位（现在不用做）

- 商品图片上传（V1 只填外链 URL）→ 上传到本地目录或云对象存储
- 收藏 / 购物车 / 订单（详情页已经留了禁用按钮的位置）
- Redis 缓存商品列表（现在靠 Next 的页面缓存，够用）
- 邮箱验证、找回密码

---

## 8. 两个踩坑提醒

1. **.env 里的 bcrypt 哈希要写 `\$`**
   bcrypt 哈希含 `$`，不转义会被 dotenv 当变量吃掉一半。`npm run gen:hash` 已自动处理。
2. **不要往 Server Component 里塞 `useState`**
   报错 `useState only works in Client Components` 就是这个原因，把那段拆成 `'use client'` 文件。

---

## 9. 常用命令

```bash
npm run dev          # 开发
npm run build        # 构建
npm start            # 生产启动
npm run db:push      # 同步 schema 到数据库
npm run db:studio    # 可视化看表数据
npm run seed         # 灌示例商品
npm run gen:hash -- 新密码   # 改管理员密码
```

> （注：部分内容由豆包 AI 生成）
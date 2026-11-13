/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // 同时跑多个 dev 实例（如 3000 正常开发 + 3100 联调）时，用独立构建目录避免互相踩 .next：
  //   NEXT_DIST_DIR=.next-test PORT=3100 npx next dev -p 3100
  distDir: process.env.NEXT_DIST_DIR || ".next",
};

export default nextConfig;

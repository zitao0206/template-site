import path from "node:path";

/** @type {import("next").NextConfig} */
const nextConfig = {
  // 允许通过环境变量指定构建产物目录（某些受限环境下 .next 不可写时用得上）
  distDir: process.env.NEXT_DIST_DIR || ".next",

  // better-sqlite3 是原生模块，必须交给 Node 直接 require，不能被 webpack 打包
  serverExternalPackages: ["better-sqlite3"],

  // tsconfig 里的 paths 由 TypeScript 使用；这里再显式声明一次，
  // 保证打包器解析 @/ 与 tsc 保持一致
  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve(process.cwd(), "src"),
    };
    return config;
  },

  turbopack: {
    resolveAlias: {
      "@/*": "./src/*",
    },
  },
};

export default nextConfig;

import { NextResponse } from "next/server";
import type { ZodError } from "zod";

/** 取 zod 的第一条错误信息，前端直接展示 */
export function firstIssue(error: ZodError): string {
  return error.issues[0]?.message ?? "请求参数不正确";
}

export function jsonError(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

export const UNAUTHORIZED = "请先登录";
export const FORBIDDEN = "没有权限执行此操作";

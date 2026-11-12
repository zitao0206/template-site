import { SignJWT, jwtVerify } from "jose";

export type SessionPayload = {
  uid: number | null; // 普通用户有 uid；管理员为 null（写死账号，不进库）
  email: string;
  role: "user" | "admin";
};

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET || "dev-only-secret-please-change",
);

export async function signSession(payload: SessionPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);
}

export async function verifySession(
  token: string,
): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload as unknown as SessionPayload;
  } catch {
    return null;
  }
}

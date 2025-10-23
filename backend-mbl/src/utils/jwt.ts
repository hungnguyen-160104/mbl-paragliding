// src/utils/jwt.ts
import { sign, verify, type JwtPayload, type Secret, type SignOptions } from "jsonwebtoken";
import { ENV } from "../config/env";

export type TokenPayload = { username: string };

const SECRET: Secret = ENV.JWT_SECRET as Secret;

// Khai báo kiểu rút gọn cho expiresIn
type Expires = SignOptions["expiresIn"];

// Giá trị mặc định lấy từ ENV, ép kiểu về Expires để phù hợp type của jsonwebtoken@9
const DEFAULT_EXPIRES_IN: Expires = (ENV.JWT_EXPIRES_IN ?? "1d") as Expires;

// Tạo token
export function signToken(payload: TokenPayload, expiresIn?: Expires): string {
  return sign(payload as object, SECRET, {
    expiresIn: expiresIn ?? DEFAULT_EXPIRES_IN,
    algorithm: "HS256",
  });
}

// Giải mã/verify token
export function verifyToken(token: string): JwtPayload & TokenPayload {
  return verify(token, SECRET, { algorithms: ["HS256"] }) as JwtPayload & TokenPayload;
}

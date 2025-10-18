// src/utils/jwt.ts
import { sign, verify, type JwtPayload, type Secret, type SignOptions } from "jsonwebtoken";
import { ENV } from "../config/env";

// Payload bạn muốn đưa vào token
export type TokenPayload = {
  username: string;
};

// SECRET chắc chắn là Secret
const SECRET: Secret = ENV.JWT_SECRET as Secret;

// Tạo token
export function signToken(
  payload: TokenPayload,
  expiresIn: SignOptions["expiresIn"] = "1d"
): string {
  // payload phải là object thuần (không dùng type 'object' chung chung)
  return sign(payload as object, SECRET, { expiresIn });
}

// Kiểm tra/giải mã token
export function verifyToken(token: string): JwtPayload & TokenPayload {
  return verify(token, SECRET) as JwtPayload & TokenPayload;
}

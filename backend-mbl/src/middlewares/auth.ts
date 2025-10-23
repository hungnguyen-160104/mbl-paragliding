import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization || "";
  const m = header.match(/^Bearer\s+(.+)$/i);
  if (!m) {
    res.setHeader("WWW-Authenticate", 'Bearer realm="api"');
    return res.status(401).json({ message: "Missing Bearer token" });
  }

  const token = m[1];
  try {
    const payload = verifyToken(token);
    req.user = { username: payload.username, iat: payload.iat, exp: payload.exp };
    return next();
  } catch {
    res.setHeader("WWW-Authenticate", 'Bearer error="invalid_token"');
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}

import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const h = req.headers.authorization || "";
  const [, token] = h.split(" ");
  if (!token) return res.status(401).json({ message: "Missing Bearer token" });
  try {
    const payload = verifyToken(token);
    req.user = { username: payload.username };
    return next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
}

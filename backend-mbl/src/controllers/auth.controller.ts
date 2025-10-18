import { Request, Response } from "express";
import { validateAdmin } from "../services/auth.service";
import { signToken } from "../utils/jwt";

export async function login(req: Request, res: Response) {
  const { username, password } = req.body || {};
  if (!username || !password) {
    return res.status(400).json({ message: "Missing username or password" });
  }
  const ok = validateAdmin(username, password);
  if (!ok) return res.status(401).json({ message: "Invalid credentials" });

  const token = signToken({ username });
  return res.json({ token, user: { username } });
}

export async function me(req: Request, res: Response) {
  if (!req.user) return res.status(401).json({ message: "Unauthorized" });
  res.json({ user: req.user });
}

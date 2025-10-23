import bcrypt from "bcrypt";
import { ENV } from "../config/env";

export async function validateAdmin(username: string, password: string) {
  if (username !== ENV.SINGLE_USER) return false;

  try {
    return await bcrypt.compare(password, ENV.SINGLE_PASSWORD_HASH);
  } catch {
    return false;
  }
}

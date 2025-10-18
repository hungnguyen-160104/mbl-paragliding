import { ENV } from "../config/env";

export function validateAdmin(username: string, password: string) {
  return username === ENV.ADMIN_USERNAME && password === ENV.ADMIN_PASSWORD;
}

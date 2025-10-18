// src/config/env.ts
import dotenv from "dotenv";
dotenv.config();

function required(name: string) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env: ${name}`);
  return v; // luôn là string
}

export const ENV = {
  NODE_ENV: process.env.NODE_ENV ?? "development",
  PORT: Number(process.env.PORT ?? 4000),
  MONGO_URI: required("MONGO_URI"),
  JWT_SECRET: required("JWT_SECRET"),   // <-- luôn string
  CORS_ORIGIN: process.env.CORS_ORIGIN ?? "*",
  ADMIN_USERNAME: required("ADMIN_USERNAME"),
  ADMIN_PASSWORD: required("ADMIN_PASSWORD"),
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME ?? "",
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY ?? "",
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET ?? "",
};

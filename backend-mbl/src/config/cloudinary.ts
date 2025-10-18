import { v2 as cloudinary } from "cloudinary";
import { ENV } from "./env";

export function initCloudinary() {
  if (!ENV.CLOUDINARY_CLOUD_NAME || !ENV.CLOUDINARY_API_KEY || !ENV.CLOUDINARY_API_SECRET) {
    console.warn("⚠️ Cloudinary env not set; /uploads/image will be disabled.");
    return;
  }
  cloudinary.config({
    cloud_name: ENV.CLOUDINARY_CLOUD_NAME,
    api_key: ENV.CLOUDINARY_API_KEY,
    api_secret: ENV.CLOUDINARY_API_SECRET
  });
}

export { cloudinary };

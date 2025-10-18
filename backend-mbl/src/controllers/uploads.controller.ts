import { Request, Response } from "express";
import { cloudinary } from "../config/cloudinary";

export async function uploadImage(req: Request, res: Response) {
  if (!cloudinary.config().cloud_name) {
    return res.status(503).json({ message: "Upload disabled: Cloudinary not configured" });
  }
  const file = (req as any).file as Express.Multer.File;
  if (!file) return res.status(400).json({ message: "Missing file" });

  // Upload from buffer using upload_stream
  const stream = cloudinary.uploader.upload_stream(
    { folder: "mbl-posts", resource_type: "image", format: "webp" },
    (error, result) => {
      if (error || !result) return res.status(500).json({ message: "Upload failed", error });
      res.json({ url: result.secure_url, width: result.width, height: result.height });
    }
  );
  stream.end(file.buffer);
}

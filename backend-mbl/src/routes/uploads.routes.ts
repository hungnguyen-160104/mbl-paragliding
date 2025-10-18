import { Router } from "express";
import multer from "multer";
import { uploadImage } from "../controllers/uploads.controller";
import { requireAuth } from "../middlewares/auth";

const router = Router();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } });

router.post("/image", requireAuth, upload.single("file"), uploadImage);

export default router;

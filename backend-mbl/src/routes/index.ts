import { Router } from "express";
import authRoutes from "./auth.routes";
import postsRoutes from "./posts.routes";
import uploadsRoutes from "./uploads.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/posts", postsRoutes);
router.use("/uploads", uploadsRoutes);

export default router;

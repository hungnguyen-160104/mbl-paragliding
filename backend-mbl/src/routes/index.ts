import { Router } from "express";
import authRoutes from "./auth.routes";
import postsRoutes from "./posts.routes";
import uploadsRoutes from "./uploads.routes";
import productsRoutes from "./products.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/posts", postsRoutes);
router.use("/uploads", uploadsRoutes);
router.use("/products", productsRoutes);

export default router;

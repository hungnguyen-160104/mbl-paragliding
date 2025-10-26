import { Router } from "express";
import authRoutes from "./auth.routes";
import postsRoutes from "./posts.routes";
import uploadsRoutes from "./uploads.routes";
import productsRoutes from "./products.routes";

import bookingRoutes from "./booking.routes";         // ✅ thêm
import telegramRoutes from "./telegram.routes";       // ✅ thêm

const router = Router();

router.use("/auth", authRoutes);
router.use("/posts", postsRoutes);
router.use("/uploads", uploadsRoutes);
router.use("/products", productsRoutes);

router.use("/booking", bookingRoutes);                // ✅ thêm: /api/booking/*
router.use("/notify-telegram", telegramRoutes);       // ✅ thêm: /api/notify-telegram

export default router;

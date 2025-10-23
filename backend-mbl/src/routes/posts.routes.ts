import { Router } from "express";
import {
  listPosts,
  getPostById,
  getPostBySlug,
  createPostCtrl,
  updatePost,
  deletePost,
  publishPost,
  addView
} from "../controllers/posts.controller";
import { requireAuth } from "../middlewares/auth";

const router = Router();

// Công khai (public)
router.get("/", listPosts);
router.get("/slug/:slug", getPostBySlug);
router.post("/slug/:slug/view", addView); // ✅ tăng lượt xem
router.get("/:id", getPostById);

// Admin (cần token)
router.post("/", requireAuth, createPostCtrl);
router.put("/:id", requireAuth, updatePost);
router.patch("/:id/publish", requireAuth, publishPost);
router.delete("/:id", requireAuth, deletePost);

export default router;

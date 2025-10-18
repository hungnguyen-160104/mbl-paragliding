import { Router } from "express";
import {
  listPosts, getPostById, getPostBySlug,
  createPostCtrl, updatePost, deletePost,
  publishPost, addView
} from "../controllers/posts.controller";
import { requireAuth } from "../middlewares/auth";

const router = Router();

router.get("/", listPosts);
router.get("/:id", getPostById);
router.get("/slug/:slug", getPostBySlug);

router.post("/", requireAuth, createPostCtrl);
router.put("/:id", requireAuth, updatePost);
router.patch("/:id/publish", requireAuth, publishPost);
router.delete("/:id", requireAuth, deletePost);

// public: tăng view khi người dùng đọc bài
router.patch("/:id/view", addView);

export default router;

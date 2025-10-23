import { Request, Response } from "express";
import { Post } from "../models/Post.model";
import { createPost } from "../services/post.service";
import { estimateReadTime } from "../utils/readTime";
import { toSlug } from "../utils/slug";

// 📄 Lấy danh sách bài viết
export async function listPosts(req: Request, res: Response) {
  const page = Math.max(1, Number(req.query.page || 1));
  const limit = Math.min(50, Math.max(1, Number(req.query.limit || 10)));
  const skip = (page - 1) * limit;

  const { search, tag, category, lang, status } = req.query as any;
  const q: any = {};
  if (search) q.title = { $regex: search, $options: "i" };
  if (tag) q.tags = { $in: [tag] };
  if (category) q.category = category;
  if (lang) q.language = lang;
  if (status === "draft") q.isPublished = false;
  if (status === "published") q.isPublished = true;

  const [items, total] = await Promise.all([
    Post.find(q).sort({ createdAt: -1 }).skip(skip).limit(limit),
    Post.countDocuments(q)
  ]);

  res.json({ page, limit, total, items });
}

// 📄 Lấy bài viết theo ID
export async function getPostById(req: Request, res: Response) {
  const doc = await Post.findById(req.params.id);
  if (!doc) return res.status(404).json({ message: "Not found" });
  res.json(doc);
}

// 📄 Lấy bài viết theo slug
export async function getPostBySlug(req: Request, res: Response) {
  const doc = await Post.findOne({ slug: req.params.slug });
  if (!doc) return res.status(404).json({ message: "Not found" });
  res.json(doc);
}

// 🆕 Tạo bài viết mới
export async function createPostCtrl(req: Request, res: Response) {
  const { title, content } = req.body || {};
  if (!title || !content)
    return res.status(400).json({ message: "Missing title or content" });

  const doc = await createPost(req.body);
  res.status(201).json(doc);
}

// ✏️ Cập nhật bài viết
export async function updatePost(req: Request, res: Response) {
  const data: any = { ...req.body };
  if (typeof data.title === "string" && !data.slug) {
    data.slug = toSlug(data.title);
  }
  if (typeof data.content === "string") {
    data.readTime = estimateReadTime(data.content);
  }

  const doc = await Post.findByIdAndUpdate(req.params.id, data, { new: true });
  if (!doc) return res.status(404).json({ message: "Not found" });
  res.json(doc);
}

// 🗑️ Xóa bài viết
export async function deletePost(req: Request, res: Response) {
  const doc = await Post.findByIdAndDelete(req.params.id);
  if (!doc) return res.status(404).json({ message: "Not found" });
  res.json({ message: "Deleted", id: doc.id });
}

// ✅ Xuất bản / hủy xuất bản
export async function publishPost(req: Request, res: Response) {
  const { isPublished } = req.body || {};
  const doc = await Post.findByIdAndUpdate(
    req.params.id,
    { isPublished: !!isPublished },
    { new: true }
  );
  if (!doc) return res.status(404).json({ message: "Not found" });
  res.json(doc);
}

// 👁️‍🗨️ Tăng lượt xem thật (theo slug)
export async function addView(req: Request, res: Response) {
  const { slug } = req.params;
  const doc = await Post.findOneAndUpdate(
    { slug },
    { $inc: { views: 1 } },
    { new: true }
  );
  if (!doc) return res.status(404).json({ message: "Not found" });
  res.json({ slug: doc.slug, views: doc.views });
}

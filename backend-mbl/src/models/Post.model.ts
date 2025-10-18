import mongoose, { Schema } from "mongoose";

export interface IPost {
  title: string;
  slug: string;
  content: string;          // HTML hoặc Markdown (có thể chứa <img>)
  coverImage?: string;      // URL ảnh
  author?: string;
  category?: string;
  tags?: string[];
  language?: "vi" | "en";
  readTime?: number;
  isPublished?: boolean;
  views?: number;
}

const PostSchema = new Schema<IPost>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    coverImage: String,
    author: { type: String, default: "Admin" },
    category: String,
    tags: [{ type: String }],
    language: { type: String, default: "vi" },
    readTime: { type: Number, default: 1 },
    isPublished: { type: Boolean, default: true },
    views: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export const Post = mongoose.models.Post || mongoose.model<IPost>("Post", PostSchema);

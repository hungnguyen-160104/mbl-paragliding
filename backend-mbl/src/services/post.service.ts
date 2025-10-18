import { Post } from "../models/Post.model";
import { toSlug } from "../utils/slug";
import { estimateReadTime } from "../utils/readTime";

export async function createPost(data: any) {
  const baseSlug = data.slug?.trim() || toSlug(data.title);
  let slug = baseSlug;
  let n = 1;
  while (await Post.exists({ slug })) {
    slug = `${baseSlug}-${n++}`;
  }

  const readTime = estimateReadTime(data.content || "");
  const doc = await Post.create({
    title: data.title,
    slug,
    content: data.content,
    coverImage: data.coverImage,
    author: data.author,
    category: data.category,
    tags: data.tags,
    language: data.language || "vi",
    readTime,
    isPublished: data.isPublished ?? true
  });
  return doc;
}

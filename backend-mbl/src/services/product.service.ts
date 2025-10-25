import { Post } from "../models/Post.model";
import { toSlug } from "../utils/slug";
import { estimateReadTime } from "../utils/readTime";

export async function createProduct(data: any) {
  const baseSlug = data.slug?.trim() || toSlug(data.title);
  let slug = baseSlug;
  let n = 1;
  while (await Post.exists({ slug })) {
    slug = `${baseSlug}-${n++}`;
  }

  const readTime = estimateReadTime(data.content || "");
  const doc = await Post.create({
    // chung
    title: data.title,
    slug,
    content: data.content,
    coverImage: data.coverImage,
    author: data.author || "Admin",
    tags: data.tags,
    language: data.language || "vi",
    readTime,
    isPublished: data.isPublished ?? true,

    // product-specific
    type: "product",
    category: "store", // để FE cũ/fallback lọc được
    storeCategory: data.storeCategory,
    price: data.price,
  });

  return doc;
}

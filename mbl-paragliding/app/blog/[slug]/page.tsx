import { notFound } from "next/navigation";

export const dynamic = "force-dynamic"; // luôn lấy dữ liệu mới

type Post = {
  _id: string;
  title: string;
  slug: string;
  coverImage?: string;
  content: string;
  author?: string;
  createdAt?: string;
  updatedAt?: string;
};

async function getPostBySlug(slug: string): Promise<Post | null> {
  const base = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

  // thử lấy theo nhiều kiểu endpoint để phù hợp backend:
  const urls = [
    `${base}/api/posts/slug/${encodeURIComponent(slug)}`,              // nếu có route /slug/:slug
    `${base}/api/posts?slug=${encodeURIComponent(slug)}&limit=1`,     // hoặc filter qua list
  ];

  for (const url of urls) {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) continue;
    const data = await res.json();
    if (url.includes("?slug=")) {
      const item = data?.items?.[0];
      if (item) return item as Post;
    } else {
      return data as Post;
    }
  }
  return null;
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);
  if (!post) return { title: "Bài viết không tồn tại" };
  const plain = post.content?.replace(/<[^>]+>/g, "").slice(0, 160) || "";
  return {
    title: post.title,
    description: plain,
    openGraph: {
      title: post.title,
      description: plain,
      images: post.coverImage ? [post.coverImage] : [],
    },
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);
  if (!post) notFound();

  return (
    <main className="container mx-auto px-4 py-10">
      <article className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>

        <div className="text-sm text-gray-500 mb-6">
          {post.author ? <>Tác giả: {post.author} · </> : null}
          {post.updatedAt
            ? new Date(post.updatedAt).toLocaleString()
            : post.createdAt
            ? new Date(post.createdAt).toLocaleString()
            : null}
        </div>

        {post.coverImage ? (
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full rounded mb-6"
          />
        ) : null}

        {/* nội dung HTML từ admin */}
        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    </main>
  );
}

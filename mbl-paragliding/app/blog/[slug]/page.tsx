import { notFound } from "next/navigation";
import Image from "next/image";

export const dynamic = "force-dynamic"; // luôn fetch dữ liệu mới

type Post = {
  _id: string;
  title: string;
  slug: string;
  coverImage?: string;
  content: string;
  author?: string;
  createdAt?: string;
  updatedAt?: string;
  views?: number;
};

// Hàm định dạng ngày tháng tiếng Việt
const formatDateTime = (dateString?: string) => {
  if (!dateString) return null;
  return new Date(dateString).toLocaleDateString("vi-VN", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

// ✅ Hàm tự động xác định BASE API phù hợp mọi môi trường
function getApiBase() {
  return (
    process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "") ||
    (typeof window === "undefined"
      ? process.env.INTERNAL_API_URL?.replace(/\/$/, "") ||
        "http://localhost:4000"
      : "")
  );
}

// ------------------ LẤY BÀI VIẾT THEO SLUG ------------------
async function getPostBySlug(slug: string): Promise<Post | null> {
  const base = getApiBase();
  const urls = [
    `${base}/api/posts/slug/${encodeURIComponent(slug)}`,
    `${base}/api/posts?slug=${encodeURIComponent(slug)}&limit=1`,
  ];

  for (const url of urls) {
    try {
      const res = await fetch(url, { cache: "no-store" });
      if (!res.ok) continue;
      const data = await res.json();
      if (url.includes("?slug=")) {
        const item = data?.items?.[0];
        if (item) return item as Post;
      } else {
        return data as Post;
      }
    } catch {
      continue;
    }
  }
  return null;
}

// ------------------ TĂNG LƯỢT XEM ------------------
async function increaseView(id: string) {
  const base = getApiBase();
  try {
    await fetch(`${base}/api/posts/${id}/view`, { method: "PATCH" });
  } catch {
    console.warn("⚠️ Không thể tăng lượt xem");
  }
}

// ------------------ SEO METADATA ------------------
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

// ------------------ TRANG CHI TIẾT BÀI VIẾT ------------------
export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPostBySlug(params.slug);
  if (!post) notFound();

  // ✅ Tăng view thật mỗi khi người dùng mở bài
  await increaseView(post._id);

  const displayDate = post.updatedAt
    ? formatDateTime(post.updatedAt) + " (Cập nhật)"
    : formatDateTime(post.createdAt);

  return (
    <div
      className="min-h-screen relative bg-cover bg-center bg-fixed text-white"
      style={{ backgroundImage: "url('/hinh-nen.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/40 z-0" />

      <main className="container mx-auto px-4 py-16 relative z-10">
        <article
          className="
            mx-auto max-w-4xl p-8 md:p-12 rounded-3xl
            bg-white/50 backdrop-blur-xl border border-white/40 shadow-2xl
            text-slate-800
          "
        >
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-slate-900 font-serif">
            {post.title}
          </h1>

          <div className="text-sm font-medium text-slate-600 mb-8 flex flex-wrap gap-x-4">
            {post.author && (
              <span>
                Tác giả:{" "}
                <span className="font-bold text-slate-800">{post.author}</span>
              </span>
            )}
            {displayDate && <span>Ngày: {displayDate}</span>}
            {typeof post.views === "number" && (
              <span className="text-slate-700">👁️ {post.views} lượt xem</span>
            )}
          </div>

          {post.coverImage && (
            <div className="relative w-full h-80 overflow-hidden rounded-xl shadow-lg mb-10">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
          )}

          <div
            className="
              prose prose-lg max-w-none 
              prose-h2:text-slate-900 prose-h3:text-slate-800 
              prose-a:text-red-600 hover:prose-a:text-red-700
            "
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </main>
    </div>
  );
}

// app/blog/page.tsx
import Link from "next/link";

async function getPosts() {
  const base = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
  const res = await fetch(`${base}/api/posts?isPublished=true`, { cache: "no-store" });
  if (!res.ok) return { items: [], total: 0 };
  return res.json();
}

export default async function BlogPage() {
  const data = await getPosts();

  return (
    <main className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Blog</h1>

      {data.items?.length ? (
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {data.items.map((p: any) => (
            <li key={p._id} className="border rounded p-4">
              <h2 className="font-semibold text-lg mb-2">
                <Link href={`/blog/${p.slug}`}>{p.title}</Link>
              </h2>
              {p.coverImage ? (
                <img
                  src={p.coverImage}
                  alt={p.title}
                  className="w-full h-40 object-cover rounded mb-3"
                />
              ) : null}
              {/* tóm tắt ngắn nếu muốn */}
              <div className="text-sm text-gray-600 line-clamp-3"
                   dangerouslySetInnerHTML={{ __html: p.content }} />
            </li>
          ))}
        </ul>
      ) : (
        <p>Hiện chưa có bài viết.</p>
      )}
    </main>
  );
}

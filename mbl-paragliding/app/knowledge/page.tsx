import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";

const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString("vi-VN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

async function getKnowledgePosts() {
  const base = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
  const res = await fetch(`${base}/api/posts?isPublished=true&category=knowledge`, { 
    cache: "no-store",
    headers: { 'Content-Type': 'application/json' },
  });
  if (!res.ok) return { items: [], total: 0 };
  return res.json();
}

export default async function KnowledgePage() {
  const data = await getKnowledgePosts();
  return (
    <div 
      className="min-h-screen relative bg-cover bg-center bg-fixed" 
      style={{ backgroundImage: "url('/hinh-nen.jpg')" }} 
    >
      <div className="absolute inset-0 bg-black/40 z-0" /> 
      
      <main className="container mx-auto px-4 py-16 relative z-10 text-white"> 
        <h1 className="text-5xl md:text-6xl font-extrabold mb-12 text-center drop-shadow-lg font-serif">
          {data.items?.length ? "Kiến thức dù lượn - Học bay" : "Kiến thức dù lượn"}
        </h1>
        <Suspense fallback={<p className="text-xl text-center text-white">Đang tải bài viết...</p>}>
          {data.items?.length ? (
            <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {data.items.map((p: any) => (
                <li key={p._id}>
                  <Link href={`/blog/${p.slug}`} className="group">
                    <div className="bg-white/10 backdrop-blur-md rounded-lg overflow-hidden border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-xl">
                      {p.coverImage && (
                        <div className="relative h-48 w-full overflow-hidden">
                          <Image
                            src={p.coverImage}
                            alt={p.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                      )}
                      <div className="p-6">
                        <h3 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-accent transition-colors">
                          {p.title}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-white/70 mb-3">
                          <span>{formatDate(p.createdAt)}</span>
                          <span>{p.views} lượt xem</span>
                        </div>
                        {p.tags && p.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-3">
                            {p.tags.slice(0, 3).map((tag: string) => (
                              <span
                                key={tag}
                                className="px-2 py-1 bg-accent/20 text-accent text-xs rounded-full border border-accent/30"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                        <p className="text-white/80 text-sm line-clamp-3">
                          {p.content.replace(/<[^>]*>/g, '').substring(0, 120)}...
                        </p>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center py-16">
              <p className="text-xl text-white/70 mb-8">
                Chưa có bài viết nào về kiến thức dù lượn
              </p>
              <Link
                href="/admin/posts/new"
                className="inline-block bg-accent text-white px-6 py-3 rounded-lg hover:bg-accent/80 transition-colors"
              >
                Tạo bài viết đầu tiên
              </Link>
            </div>
          )}
        </Suspense>
      </main>
    </div>
  );
}

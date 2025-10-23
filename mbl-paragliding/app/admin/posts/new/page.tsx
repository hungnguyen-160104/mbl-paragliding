// mbl-paragliding/app/admin/posts/new/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link"; // Import Link để tạo nút "Huỷ"
import api from "@/lib/api";
import { authHeader, getToken } from "@/lib/auth";
import type { PostPayload } from "@/types/post";

// Định nghĩa một interface cho state của form,
// sử dụng tagsStr để quản lý input string
interface NewPostForm {
  title: string;
  coverImage: string;
  content: string;
  tagsStr: string; // Sẽ chuyển thành string[] khi submit
  language: "vi" | "en";
  isPublished: boolean;
  category: string;
}

export default function NewPostPage() {
  const router = useRouter();
  const [form, setForm] = useState<NewPostForm>({
    title: "",
    coverImage: "",
    content: "",
    tagsStr: "", // Khởi tạo là string rỗng
    language: "vi",
    isPublished: true,
    category: "", // Để trống để 'required' trên select hoạt động
  });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  // 🧭 Kiểm tra token
  useEffect(() => {
    if (!getToken()) router.replace("/admin/login");
  }, [router]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErr(null);
    try {
      // Tách tagsStr ra và chuyển nó thành mảng string[]
      const { tagsStr, ...restOfForm } = form;
      const tags = tagsStr
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

      // Tạo payload cuối cùng khớp với type PostPayload
      const payload: PostPayload = {
        ...restOfForm,
        tags: tags,
      };

      await api("/api/posts", {
        method: "POST",
        headers: { ...authHeader() },
        body: JSON.stringify(payload),
      });
      router.replace("/admin/dashboard");
    } catch (e: any) {
      setErr(e?.message || "Không tạo được bài viết");
    } finally {
      setLoading(false);
    }
  }

  // === Style cho các ô input (Dùng chung) ===
  const glassInputStyle = `
    w-full rounded-lg px-3 py-2 bg-white/30 border border-white/40 shadow-sm 
    text-gray-900 placeholder-gray-600 
    focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400
    transition-colors duration-200
  `;

  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-start pt-24 pb-8 px-4 md:px-8 overflow-y-auto bg-cover bg-center"
      style={{ backgroundImage: "url('/hinh-nen-2.jpg')" }}
    >
      {/* Overlay mờ nhẹ */}
      <div className="absolute inset-0 bg-black/10 backdrop-blur-[2px] z-0" />

      {/* Container Form chính */}
      <div
        className="relative z-10 w-full max-w-4xl p-6 md:p-8 rounded-2xl 
                   bg-white/15 backdrop-blur-xl border border-white/20 shadow-lg text-gray-800"
      >
        <h2 className="text-3xl font-bold mb-6 text-gray-900 drop-shadow-lg">
          Tạo bài viết mới
        </h2>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1.5 text-gray-800">
              Tiêu đề
            </label>
            <input
              className={glassInputStyle}
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5 text-gray-800">
              Ảnh cover (URL)
            </label>
            <input
              className={glassInputStyle}
              value={form.coverImage}
              onChange={(e) => setForm({ ...form, coverImage: e.target.value })}
              placeholder="https://..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5 text-gray-800">
              Danh mục
            </label>
            <select
              className={glassInputStyle}
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              required
            >
              <option value="">--- Chọn danh mục ---</option>
              <option value="news">Tin tức</option>
              <option value="knowledge">Kiến thức dù lượn - Học bay</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5 text-gray-800">
              Tags (phân cách bằng dấu phẩy)
            </label>
            <input
              className={glassInputStyle}
              value={form.tagsStr}
              onChange={(e) => setForm({ ...form, tagsStr: e.target.value })}
              placeholder="ví dụ: dù lượn, sapa, kinh nghiệm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5 text-gray-800">
              Nội dung (HTML)
            </label>
            <textarea
              className={`${glassInputStyle} min-h-[250px] md:min-h-[300px]`}
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              placeholder="<p>Nội dung...</p><img src='https://picsum.photos/800/400'/>"
              required
            />
          </div>
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <div>
              <label className="text-sm font-medium text-gray-800 mr-2">
                Ngôn ngữ:
              </label>
              <select
                className="rounded-lg px-2 py-1 bg-white/30 border border-white/40 shadow-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={form.language}
                onChange={(e) =>
                  setForm({ ...form, language: e.target.value as any })
                }
              >
                <option value="vi">vi</option>
                <option value="en">en</option>
              </select>
            </div>
            <label className="text-sm font-medium text-gray-800 flex items-center gap-2">
              <input
                type="checkbox"
                className="h-4 w-4 rounded text-blue-500 border-white/40 focus:ring-blue-400"
                checked={form.isPublished}
                onChange={(e) =>
                  setForm({ ...form, isPublished: e.target.checked })
                }
              />
              Xuất bản ngay
            </label>
          </div>

          {/* Báo lỗi (nếu có) */}
          {err && (
            <p className="text-red-700 font-medium text-sm p-3 bg-red-100/50 rounded-lg border border-red-300">
              {err}
            </p>
          )}

          {/* Nút bấm */}
          <div className="flex items-center gap-4 pt-4">
            <button
              className="rounded-xl bg-blue-500 border border-blue-300 text-white px-6 py-2.5 font-medium shadow-md 
                         hover:bg-blue-600 transition-colors duration-300 
                         disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? "Đang tạo…" : "Tạo bài viết"}
            </button>
            <Link
              href="/admin/dashboard"
              className="rounded-xl bg-white/40 border border-white/50 text-gray-900 px-6 py-2.5 font-medium shadow-md 
                         hover:bg-white/60 transition-colors duration-300"
            >
              Huỷ
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
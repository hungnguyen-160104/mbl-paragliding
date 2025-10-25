// mbl-paragliding/app/admin/posts/new/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import api from "@/lib/api";
import { authHeader, getToken } from "@/lib/auth";
import type { PostPayload, StoreCategory } from "@/types/post";

// ---- Kiểu dữ liệu form
interface NewPostForm {
  title: string;
  coverImage: string;
  content: string;
  tagsStr: string;
  language: "vi" | "en";
  isPublished: boolean;
  /** Danh mục chính: news | knowledge | store */
  category: "" | "news" | "knowledge" | "store";
  /** Chỉ dùng khi category = store */
  storeCategory?: StoreCategory;
  price?: number;
}

export default function NewPostPage() {
  const router = useRouter();
  const [form, setForm] = useState<NewPostForm>({
    title: "",
    coverImage: "",
    content: "",
    tagsStr: "",
    language: "vi",
    isPublished: true,
    category: "",
    storeCategory: undefined,
    price: undefined,
  });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  // 🧭 auth
  useEffect(() => {
    if (!getToken()) router.replace("/admin/login");
  }, [router]);

  const isStore = form.category === "store";

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErr(null);
    try {
      const tags = form.tagsStr
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

      const payload: PostPayload = {
        title: form.title,
        content: form.content,
        coverImage: form.coverImage || undefined,
        tags,
        language: form.language,
        isPublished: form.isPublished,
        category: form.category,
        // ---- phần cho SẢN PHẨM
        type: isStore ? "product" : "blog",
        storeCategory: isStore ? form.storeCategory : undefined,
        price: isStore ? Number(form.price || 0) : undefined,
      };

      // Nếu đang tạo sản phẩm, ưu tiên endpoint /api/products (nếu đã có backend)
      const path = isStore ? "/api/products" : "/api/posts";

      await api(path, {
        method: "POST",
        headers: { ...authHeader() },
        body: JSON.stringify(payload),
      });

      router.replace("/admin/dashboard");
    } catch (e: any) {
      setErr(e?.message || "Không tạo được bài viết / sản phẩm");
    } finally {
      setLoading(false);
    }
  }

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
      <div className="absolute inset-0 bg-black/10 backdrop-blur-[2px] z-0" />

      <div className="relative z-10 w-full max-w-4xl p-6 md:p-8 rounded-2xl 
                   bg-white/15 backdrop-blur-xl border border-white/20 shadow-lg text-gray-800"
      >
        <h2 className="text-3xl font-bold mb-6 text-gray-900 drop-shadow-lg">
          {isStore ? "Đăng sản phẩm" : "Tạo bài viết mới"}
        </h2>

        <form onSubmit={onSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-1.5 text-gray-800">Tiêu đề</label>
            <input
              className={glassInputStyle}
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            />
          </div>

          {/* Cover */}
          <div>
            <label className="block text-sm font-medium mb-1.5 text-gray-800">Ảnh cover (URL)</label>
            <input
              className={glassInputStyle}
              value={form.coverImage}
              onChange={(e) => setForm({ ...form, coverImage: e.target.value })}
              placeholder="https://..."
            />
          </div>

          {/* Main category */}
          <div>
            <label className="block text-sm font-medium mb-1.5 text-gray-800">Danh mục</label>
            <select
              className={glassInputStyle}
              value={form.category}
              onChange={(e) => {
                const v = e.target.value as NewPostForm["category"];
                setForm({
                  ...form,
                  category: v,
                  // reset field khi chuyển qua lại
                  storeCategory: v === "store" ? form.storeCategory : undefined,
                  price: v === "store" ? form.price : undefined,
                });
              }}
              required
            >
              <option value="">--- Chọn danh mục ---</option>
              <option value="news">Tin tức</option>
              <option value="knowledge">Kiến thức dù lượn - Học bay</option>
              <option value="store">Cửa hàng</option>
            </select>
          </div>

          {/* Sub-category + Price khi là STORE */}
          {isStore && (
            <>
              <div>
                <label className="block text-sm font-medium mb-1.5 text-gray-800">
                  Danh mục con (Cửa hàng)
                </label>
                <select
                  className={glassInputStyle}
                  value={form.storeCategory || ""}
                  onChange={(e) =>
                    setForm({ ...form, storeCategory: e.target.value as StoreCategory })
                  }
                  required
                >
                  <option value="">--- Chọn tiểu mục ---</option>
                  <option value="thiet-bi-bay">Thiết bị bay</option>
                  <option value="phu-kien">Phụ kiện</option>
                  <option value="sach-du-luon">Sách dù lượn</option>
                  <option value="khoa-hoc-du-luon">Khóa học dù lượn</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1.5 text-gray-800">
                  Giá (VNĐ)
                </label>
                <input
                  type="number"
                  min={0}
                  className={glassInputStyle}
                  value={form.price ?? ""}
                  onChange={(e) => setForm({ ...form, price: Number(e.target.value || 0) })}
                  placeholder="vd: 2500000"
                  required
                />
              </div>
            </>
          )}

          {/* Tags */}
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

          {/* Content */}
          <div>
            <label className="block text-sm font-medium mb-1.5 text-gray-800">
              Nội dung (HTML)
            </label>
            <textarea
              className={`${glassInputStyle} min-h-[250px] md:min-h-[300px]`}
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              placeholder="<p>Mô tả / nội dung ...</p>"
              required
            />
          </div>

          {/* Options */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <div>
              <label className="text-sm font-medium text-gray-800 mr-2">
                Ngôn ngữ:
              </label>
              <select
                className="rounded-lg px-2 py-1 bg-white/30 border border-white/40 shadow-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={form.language}
                onChange={(e) => setForm({ ...form, language: e.target.value as any })}
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
                onChange={(e) => setForm({ ...form, isPublished: e.target.checked })}
              />
              Xuất bản ngay
            </label>
          </div>

          {/* Error */}
          {err && (
            <p className="text-red-700 font-medium text-sm p-3 bg-red-100/50 rounded-lg border border-red-300">
              {err}
            </p>
          )}

          {/* Actions */}
          <div className="flex items-center gap-4 pt-4">
            <button
              className="rounded-xl bg-blue-500 border border-blue-300 text-white px-6 py-2.5 font-medium shadow-md 
                         hover:bg-blue-600 transition-colors duration-300 
                         disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? "Đang tạo…" : isStore ? "Đăng sản phẩm" : "Tạo bài viết"}
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

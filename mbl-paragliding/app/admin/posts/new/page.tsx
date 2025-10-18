// mbl-paragliding/app/admin/posts/new/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import api from "@/lib/api";
import { authHeader, getToken } from "@/lib/auth";
import type { PostPayload } from "@/types/post";
import { useEffect } from "react";

export default function NewPostPage() {
  const router = useRouter();
  const [form, setForm] = useState<PostPayload>({
    title: "",
    coverImage: "",
    content: "",
    tags: [],
    language: "vi",
    isPublished: true,
  } as any);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    if (!getToken()) router.replace("/admin/login");
  }, [router]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErr(null);
    try {
      const payload: PostPayload = {
        ...form,
        tags: (form.tags as unknown as string[])
          ?? (typeof (form as any).tagsStr === "string"
                ? (form as any).tagsStr.split(",").map(s => s.trim()).filter(Boolean)
                : []),
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

  return (
    <div className="max-w-2xl">
      <h2 className="text-xl font-semibold mb-4">Tạo bài viết</h2>
      <form onSubmit={onSubmit} className="space-y-3">
        <div>
          <label className="block text-sm mb-1">Tiêu đề</label>
          <input
            className="w-full border rounded px-3 py-2"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Ảnh cover (URL)</label>
          <input
            className="w-full border rounded px-3 py-2"
            value={form.coverImage as any}
            onChange={(e) => setForm({ ...form, coverImage: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Tags (phân tách bằng dấu phẩy)</label>
          <input
            className="w-full border rounded px-3 py-2"
            placeholder="sapa, du lich"
            onChange={(e) => (setForm({ ...form, ...( { tags: undefined } as any ), ...( { tagsStr: e.target.value } as any ) }))}
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Nội dung (HTML)</label>
          <textarea
            className="w-full border rounded px-3 py-2 min-h-[200px]"
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            placeholder="<p>Nội dung...</p><img src='https://picsum.photos/800/400'/>"
            required
          />
        </div>
        <div className="flex items-center gap-3">
          <label className="text-sm">Ngôn ngữ:</label>
          <select
            className="border rounded px-2 py-1"
            value={form.language as any}
            onChange={(e) => setForm({ ...form, language: e.target.value })}
          >
            <option value="vi">vi</option>
            <option value="en">en</option>
          </select>
          <label className="text-sm flex items-center gap-2 ml-4">
            <input
              type="checkbox"
              checked={!!form.isPublished}
              onChange={(e) => setForm({ ...form, isPublished: e.target.checked })}
            />
            Xuất bản ngay
          </label>
        </div>
        {err && <p className="text-red-600 text-sm">{err}</p>}
        <button
          className="rounded bg-black text-white px-4 py-2 disabled:opacity-60"
          disabled={loading}
        >
          {loading ? "Đang tạo…" : "Tạo bài viết"}
        </button>
      </form>
    </div>
  );
}

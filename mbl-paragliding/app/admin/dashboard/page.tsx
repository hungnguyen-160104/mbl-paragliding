"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import api from "@/lib/api";
import { authHeader, getToken } from "@/lib/auth";
import type { Paginated, Post } from "@/types/post";

type ListResp = Paginated<Post>;

export default function AdminDashboardPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [data, setData] = useState<ListResp | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  // đọc page từ URL (?page=)
  const pageFromUrl = Number(searchParams.get("page") || "1");
  const [page, setPage] = useState<number>(pageFromUrl);
  const limit = 10;

  // đồng bộ page lên URL
  useEffect(() => {
    const usp = new URLSearchParams(window.location.search);
    usp.set("page", String(page));
    router.replace(`/admin/dashboard?${usp.toString()}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  // nạp danh sách bài
  async function load() {
    try {
      setLoading(true);
      setErr(null);
      const res = await api<ListResp>(`/api/posts?page=${page}&limit=${limit}`, {
        headers: { ...authHeader() },
      });
      setData(res);
    } catch (e: any) {
      // Nếu 401 → quay về login
      if (String(e?.message || "").includes("401")) {
        router.replace("/admin/login");
        return;
      }
      setErr(e?.message || "Không tải được danh sách");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!getToken()) {
      router.replace("/admin/login");
      return;
    }
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  // hành động: xoá bài
  async function handleDelete(id: string) {
    const ok = window.confirm("Xoá bài viết này?");
    if (!ok) return;
    try {
      await api(`/api/posts/${id}`, {
        method: "DELETE",
        headers: { ...authHeader() },
      });
      await load();
    } catch (e: any) {
      alert(e?.message || "Xoá thất bại");
    }
  }

  // hành động: publish/unpublish
  async function handleTogglePublish(id: string, current: boolean) {
    try {
      await api(`/api/posts/${id}/publish`, {
        method: "PATCH",
        headers: { ...authHeader() },
        body: JSON.stringify({ isPublished: !current }),
      });
      await load();
    } catch (e: any) {
      alert(e?.message || "Cập nhật trạng thái thất bại");
    }
  }

  const totalPages = useMemo(() => {
    if (!data) return 1;
    return Math.max(1, Math.ceil((data.total || 0) / (data.limit || limit)));
  }, [data]);

  if (loading) return <p>Đang tải danh sách…</p>;
  if (err) return <p className="text-red-600">{err}</p>;

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Bài viết</h2>
        <div className="flex gap-3">
          <button
            className="px-3 py-1 rounded border"
            onClick={() => load()}
            title="Làm mới"
          >
            Refresh
          </button>
          <Link href="/admin/posts/new" className="px-3 py-1 rounded bg-black text-white">
            + Tạo bài
          </Link>
        </div>
      </div>

      {!data?.items?.length ? (
        <div className="border rounded p-6 text-center">
          <p>Chưa có bài viết nào.</p>
          <div className="mt-3">
            <Link href="/admin/posts/new" className="underline">
              Tạo bài đầu tiên
            </Link>
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto border rounded">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-2 border">Tiêu đề</th>
                <th className="p-2 border">Slug</th>
                <th className="p-2 border">Trạng thái</th>
                <th className="p-2 border">Views</th>
                <th className="p-2 border">Cập nhật</th>
                <th className="p-2 border w-[220px]">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {data.items.map((p) => (
                <tr key={p._id} className="odd:bg-white even:bg-gray-50">
                  <td className="p-2 border align-top max-w-[320px]">
                    <div className="font-medium line-clamp-2">{p.title}</div>
                    {p.coverImage ? (
                      <div className="text-xs text-gray-500 truncate">
                        {p.coverImage}
                      </div>
                    ) : null}
                  </td>
                  <td className="p-2 border align-top">{p.slug}</td>
                  <td className="p-2 border align-top">
                    {p.isPublished ? (
                      <span className="px-2 py-0.5 rounded bg-green-100 text-green-700">
                        Đã xuất bản
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded bg-yellow-100 text-yellow-700">
                        Bản nháp
                      </span>
                    )}
                  </td>
                  <td className="p-2 border align-top text-center">{p.views}</td>
                  <td className="p-2 border align-top text-xs text-gray-500">
                    {new Date(p.updatedAt).toLocaleString()}
                  </td>
                  <td className="p-2 border align-top">
                    <div className="flex flex-wrap gap-2">
                      <Link
                        href={`/admin/posts/${p._id}/edit`}
                        className="px-2 py-1 border rounded hover:bg-gray-50"
                      >
                        Sửa
                      </Link>
                      <button
                        className="px-2 py-1 border rounded hover:bg-gray-50"
                        onClick={() => handleTogglePublish(p._id, p.isPublished)}
                      >
                        {p.isPublished ? "Ẩn (Unpublish)" : "Xuất bản"}
                      </button>
                      <button
                        className="px-2 py-1 border rounded text-red-600 hover:bg-red-50"
                        onClick={() => handleDelete(p._id)}
                      >
                        Xoá
                      </button>
                      <a
                        className="px-2 py-1 border rounded hover:bg-gray-50"
                        href={`/blog/${p.slug}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Xem công khai
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex items-center justify-between p-3 border-t bg-gray-50">
            <div className="text-sm text-gray-600">
              Trang {data.page} / {totalPages} — Tổng {data.total} bài
            </div>
            <div className="flex gap-2">
              <button
                className="px-3 py-1 border rounded disabled:opacity-50"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page <= 1}
              >
                ← Trước
              </button>
              <button
                className="px-3 py-1 border rounded disabled:opacity-50"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page >= totalPages}
              >
                Sau →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

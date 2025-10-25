// mbl-paragliding/lib/api.ts
// Mặc định gọi same-origin. Nếu cần gọi backend khác, dùng NEXT_PUBLIC_API_BASE_URL.
// Riêng các đường dẫn /api/* khi chạy trên trình duyệt sẽ luôn ưu tiên same-origin.

const isBrowser = typeof window !== "undefined";

function normalizeBase(raw: string) {
  return raw.replace(/\/$/, "");
}

async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const p = path.startsWith("/") ? path : `/${path}`;

  // Nếu đang ở browser và gọi /api/* => ưu tiên same-origin (BASE = "")
  const preferSameOrigin = isBrowser && p.startsWith("/api/");

  const raw =
    process.env.NEXT_PUBLIC_API_BASE_URL?.trim() ??
    (isBrowser ? "" : process.env.INTERNAL_API_URL || "http://localhost:4000");

  const BASE = preferSameOrigin ? "" : normalizeBase(raw);

  const res = await fetch(`${BASE}${p}`, {
    ...init,
    headers: { "Content-Type": "application/json", ...(init?.headers || {}) },
    cache: "no-store",
  });

  if (!res.ok) {
    const msg = await res.text().catch(() => "");
    throw new Error(msg || `Request failed: ${res.status}`);
  }

  return res.json() as Promise<T>;
}

export default api;

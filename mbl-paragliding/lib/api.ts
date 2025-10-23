// mbl-paragliding/lib/api.ts
// Gọi API theo relative URL mặc định (same-origin).
// Có thể override bằng NEXT_PUBLIC_API_BASE_URL khi cần.
const RAW =
  process.env.NEXT_PUBLIC_API_BASE_URL?.trim() ??
  (typeof window === "undefined"
    ? (process.env.INTERNAL_API_URL || "http://localhost:4000")
    : "");

const BASE = RAW.replace(/\/$/, ""); // bỏ / cuối nếu có

async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const p = path.startsWith("/") ? path : `/${path}`;
  const res = await fetch(`${BASE}${p}`, {
    ...init,
    headers: { "Content-Type": "application/json", ...(init?.headers || {}) },
    cache: "no-store",
  });
  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg || `Request failed: ${res.status}`);
  }
  return res.json() as Promise<T>;
}

export default api;

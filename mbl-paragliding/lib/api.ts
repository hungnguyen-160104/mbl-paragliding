// mbl-paragliding/lib/api.ts
const isBrowser = typeof window !== "undefined";

function normalizeBase(raw: string) {
  return raw.replace(/\/$/, "");
}
function isAbsoluteUrl(url: string) {
  return /^https?:\/\//i.test(url);
}

export default async function api<T>(path: string, init?: RequestInit): Promise<T> {
  if (isAbsoluteUrl(path)) {
    return fetchJson<T>(path, init);
  }
  const p = path.startsWith("/") ? path : `/${path}`;
  let base = "";

  const publicBase = (process.env.NEXT_PUBLIC_API_BASE_URL || "").trim();
  if (publicBase) {
    base = normalizeBase(publicBase); // Cloudflared/Production
  } else if (!isBrowser) {
    base = normalizeBase(process.env.INTERNAL_API_URL || "http://localhost:4000"); // SSR
  } else {
    base = ""; // Dev browser -> rely on next.config.mjs rewrites
  }

  return fetchJson<T>(`${base}${p}`, init);
}

async function fetchJson<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    cache: "no-store",
    headers: { "Content-Type": "application/json", ...(init?.headers || {}) },
    ...init,
  });
  const contentType = res.headers.get("content-type") || "";

  if (!res.ok) {
    const msg = await res.text().catch(() => "");
    throw new Error(msg || `${res.status} ${res.statusText}`);
  }
  if (res.status === 204) return {} as T;

  if (contentType.includes("application/json")) {
    return (await res.json()) as T;
  }
  try {
    const text = await res.text();
    return JSON.parse(text) as T;
  } catch {
    // chấp nhận non-JSON
    return undefined as T;
  }
}

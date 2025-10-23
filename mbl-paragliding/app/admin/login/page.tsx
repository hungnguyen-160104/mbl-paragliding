"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { setToken, getToken } from "@/lib/auth";
import type { LoginResponse } from "../../../types/auth";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState(""); // giữ rỗng mặc định
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (getToken()) router.replace("/admin/dashboard");
  }, [router]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await api<LoginResponse>("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
      });
      setToken(res.token);
      router.replace("/admin/dashboard");
    } catch (err: any) {
      setError(err?.message || "Đăng nhập thất bại");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: "url('/hinh-nen.jpg')",
      }}
    >
      {/* Overlay mờ nhẹ hơn */}
      <div className="absolute inset-0 bg-black/25 backdrop-blur-[2px] z-0" />

      {/* Glassmorphism Form */}
      <div
        className="relative z-10 w-full max-w-sm px-8 py-10 rounded-3xl 
                      bg-white/25 backdrop-blur-xl border border-white/30 shadow-2xl text-white"
      >
        <h1 className="text-3xl font-bold mb-8 text-center drop-shadow-md">
          Đăng nhập Admin
        </h1>

        {/* Form: autocomplete off, có 2 input ẩn để "đánh lừa" autofill */}
        <form onSubmit={onSubmit} className="space-y-5" autoComplete="off">
          {/* Dummy hidden fields to reduce browser autofill */}
          <input
            type="text"
            name="fake-username"
            id="fake-username"
            autoComplete="off"
            style={{ display: "none" }}
            tabIndex={-1}
          />
          <input
            type="password"
            name="fake-password"
            id="fake-password"
            autoComplete="new-password"
            style={{ display: "none" }}
            tabIndex={-1}
          />

          <div>
            <label className="block text-sm mb-2 text-white/90">Tài khoản</label>
            <input
              name="usernameReal"
              id="usernameReal"
              className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/30 
                         text-white placeholder-white/60 focus:outline-none 
                         focus:ring-2 focus:ring-white/60"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="off"
              placeholder="Tên tài khoản"
            />
          </div>

          <div>
            <label className="block text-sm mb-2 text-white/90">Mật khẩu</label>
            <input
              name="passwordReal"
              id="passwordReal"
              className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/30 
                         text-white placeholder-white/60 focus:outline-none 
                         focus:ring-2 focus:ring-white/60"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              placeholder="Mật khẩu"
            />
          </div>

          {error && <p className="text-red-300 text-sm text-center">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 rounded-lg bg-white/30 border border-white/30 
                       hover:bg-white/40 transition-all duration-300 text-lg 
                       font-semibold backdrop-blur-md disabled:opacity-60"
          >
            {loading ? "Đang đăng nhập…" : "Đăng nhập"}
          </button>
        </form>
      </div>
    </div>
  );
}

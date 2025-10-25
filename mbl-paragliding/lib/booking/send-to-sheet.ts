// lib/booking/send-to-sheet.ts
export async function postBookingToSheet(
  payload: any
): Promise<{ ok: boolean; message?: string }> {
  try {
    // Gọi API nội bộ để tránh CORS
    const res = await fetch("/api/gsheet", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const text = await res.text().catch(() => null);

    if (!res.ok) {
      let msg = text;
      try { msg = JSON.parse(text || "{}")?.message ?? msg; } catch {}
      return { ok: false, message: msg || `HTTP ${res.status}` };
    }

    try {
      const json = JSON.parse(text || "{}");
      return { ok: json.ok ?? true, message: json.message };
    } catch {
      return { ok: true, message: text || undefined };
    }
  } catch (e: any) {
    return { ok: false, message: e?.message || "Lỗi không xác định" };
  }
}

// Gửi dữ liệu booking sang Google Sheet (qua Apps Script endpoint)
// Yêu cầu biến môi trường: NEXT_PUBLIC_GSHEET_ENDPOINT
export async function postBookingToSheet(payload: any): Promise<{ ok: boolean; message?: string }> {
  try {
    const endpoint = process.env.NEXT_PUBLIC_GSHEET_ENDPOINT;
    if (!endpoint) {
      console.warn("Chưa cấu hình biến NEXT_PUBLIC_GSHEET_ENDPOINT");
      return { ok: false, message: "Thiếu endpoint Google Sheet" };
    }
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const text = await res.text();
      return { ok: false, message: text || `HTTP ${res.status}` };
    }
    return { ok: true };
  } catch (e: any) {
    return { ok: false, message: e?.message || "Lỗi không xác định" };
  }
}

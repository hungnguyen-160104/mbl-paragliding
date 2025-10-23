// Gửi thông báo qua EmailJS cho admin
// Yêu cầu biến môi trường:
// NEXT_PUBLIC_EMAILJS_SERVICE_ID
// NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
// NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
export async function notifyAdminByEmail(payload: any): Promise<{ ok: boolean; message?: string }> {
  try {
    const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      console.warn("Thiếu cấu hình EmailJS");
      return { ok: false, message: "Thiếu cấu hình EmailJS" };
    }

    const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        service_id: SERVICE_ID,
        template_id: TEMPLATE_ID,
        user_id: PUBLIC_KEY,
        template_params: {
          subject: "Thông tin đặt bay mới",
          content: JSON.stringify(payload, null, 2),
        },
      }),
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

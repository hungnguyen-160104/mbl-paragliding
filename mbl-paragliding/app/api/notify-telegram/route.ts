import { NextResponse } from "next/server";
import { computePrice, LOCATIONS, formatVND } from "@/lib/booking/calculate-price";

// ===== Types nhận từ client =====
type Addons = { pickup?: boolean; flycam?: boolean; camera360?: boolean };
type Contact = { phone?: string; email?: string; pickupLocation?: string; specialRequest?: string };
type Guest = {
  fullName?: string;
  dob?: string;
  gender?: string;
  idNumber?: string;
  weightKg?: number;
  nationality?: string;
};
type Payload = {
  location?: keyof typeof LOCATIONS | string; // ưu tiên key chuẩn
  locationName?: string;                       // tuỳ chọn, dùng map tên hiển thị khi thiếu key
  guestsCount?: number;
  dateISO?: string;
  timeSlot?: string;
  contact?: Contact;
  guests?: Guest[];
  addons?: Addons;
};

// ===== Utils =====
function escapeHtml(s?: string) {
  if (!s) return "";
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export async function POST(req: Request) {
  const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const rawIds =
    process.env.TELEGRAM_CHAT_IDS ??
    process.env.TELEGRAM_CHAT_ID ??
    "";

  const CHAT_IDS = rawIds.split(",").map((x) => x.trim()).filter(Boolean);

  if (!BOT_TOKEN || CHAT_IDS.length === 0) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Missing TELEGRAM_BOT_TOKEN hoặc TELEGRAM_CHAT_IDS/TELEGRAM_CHAT_ID trong .env.local",
      },
      { status: 500 }
    );
  }

  // ===== Nhận cả 2 format body: flat hoặc { payload: {...} }
  let raw: any = {};
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body" }, { status: 400 });
  }
  const body: Payload =
    raw && typeof raw === "object" && "payload" in raw && raw.payload && typeof raw.payload === "object"
      ? (raw.payload as Payload)
      : (raw as Payload);

  // ===== Location: giữ yêu cầu key hợp lệ, nhưng chấp nhận map từ locationName nếu client có gửi
  const acceptedKeys = Object.keys(LOCATIONS) as (keyof typeof LOCATIONS)[];
  const rawLocation = (body.location ?? "") as string;

  let locationKey = (rawLocation as keyof typeof LOCATIONS) || undefined;
  if (!locationKey || !LOCATIONS[locationKey]) {
    const byName = (body.locationName ?? "").toString().trim();
    if (byName) {
      const found = acceptedKeys.find((k) => LOCATIONS[k].name === byName);
      if (found) locationKey = found;
    }
  }
  if (!locationKey || !LOCATIONS[locationKey]) {
    return NextResponse.json(
      {
        ok: false,
        error: "Invalid location",
        received: String(body.location ?? ""),
        acceptedKeys,
      },
      { status: 400 }
    );
  }

  // ===== GuestsCount: chịu lỗi (fallback từ guests.length hoặc 1)
  let guestsCount = Number(body.guestsCount);
  if (!Number.isFinite(guestsCount) || guestsCount < 1) {
    guestsCount = Array.isArray(body.guests) && body.guests.length > 0 ? body.guests.length : 1;
  }

  // ===== Tính giá & dựng message
  const price = computePrice({
    location: locationKey,
    guestsCount,
    dateISO: body.dateISO,
    addons: body.addons || {},
  });

  const cfg = LOCATIONS[locationKey];
  const c = body.contact || {};

  const addonLines = Object.entries(price.addonsPerPerson)
    .filter(([, v]) => v > 0)
    .map(([k, v]) => `• ${k}: ${formatVND(v)} / khách`);

  const guestLines =
    (body.guests || [])
      .map((g, i) => {
        const attrs: string[] = [];
        if (g.dob) attrs.push(`DOB: ${escapeHtml(g.dob)}`);
        if (g.gender) attrs.push(escapeHtml(g.gender));
        if (g.idNumber) attrs.push(`ID: ${escapeHtml(g.idNumber)}`);
        if (typeof g.weightKg === "number") attrs.push(`Wt: ${g.weightKg}kg`);
        if (g.nationality) attrs.push(`QT: ${escapeHtml(g.nationality)}`);
        const details = attrs.length ? ` (${attrs.join(" · ")})` : "";
        return `${i + 1}. ${escapeHtml(g.fullName || "")}${details}`;
      })
      .join("\n") || "—";

  const createdAt = new Date().toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" });

  const sections: string[] = [
    `🛒 <b>ĐƠN ĐẶT BAY MỚI</b>`,
    `📍 <b>Điểm:</b> ${escapeHtml(cfg.name)}`,
    `📅 <b>Thời gian:</b> ${escapeHtml(body.dateISO || "")} ${escapeHtml(body.timeSlot || "")}`,
    `👥 <b>Số khách:</b> ${guestsCount}`,
    ``,
    `<b>Liên hệ</b>`,
    `• 📞 ${escapeHtml(c.phone || "")} · ✉️ ${escapeHtml(c.email || "")}`,
    c.pickupLocation ? `• 🚗 Điểm đón: ${escapeHtml(c.pickupLocation)}` : "",
    c.specialRequest ? `• 📝 Y/c đặc biệt: ${escapeHtml(c.specialRequest)}` : "",
    ``,
    `<b>Chi phí</b>`,
    `• Cơ bản/khách: ${formatVND(price.basePricePerPerson)}`,
    price.discountPerPerson > 0 ? `• Giảm nhóm/khách: -${formatVND(price.discountPerPerson)}` : "",
    addonLines.length ? `• Phụ thu/khách:\n${addonLines.map((l) => "   " + l).join("\n")}` : "",
    `• <b>Tổng tạm tính:</b> ${formatVND(price.totalAfterDiscount)}`,
    ``,
    `<b>Danh sách khách</b>`,
    guestLines,
    ``,
    `⏱️ ${createdAt}`,
  ].filter(Boolean);

  const text = sections.join("\n");

  // ===== Gửi Telegram tới nhiều người nhận =====
  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
  const results = await Promise.all(
    CHAT_IDS.map(async (chatId) => {
      try {
        const res = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: chatId,
            text,
            parse_mode: "HTML",
            disable_web_page_preview: true,
          }),
        });
        const data = await res.json();
        return { chat_id: chatId, ok: res.ok && data?.ok !== false, result: data };
      } catch (e: any) {
        return { chat_id: chatId, ok: false, error: e?.message || String(e) };
      }
    })
  );

  const failed = results.filter((r) => !r.ok);
  if (failed.length) {
    return NextResponse.json(
      { ok: false, error: "Some Telegram messages failed", details: results },
      { status: 502 }
    );
  }

  return NextResponse.json({
    ok: true,
    telegram: results.map((r) => ({
      chat_id: r.chat_id,
      message_id: (r as any).result?.result?.message_id,
    })),
  });
}

// backend-mbl/src/services/telegram.service.ts
type TelegramResult =
  | { chat_id: string; ok: true; result: any }
  | { chat_id: string; ok: false; error: string };

function readTelegramConfig() {
  const BOT_TOKEN = (process.env.TELEGRAM_BOT_TOKEN || "").trim();
  const idsRaw =
    (process.env.TELEGRAM_CHAT_IDS || process.env.TELEGRAM_CHAT_ID || "").trim();
  const CHAT_IDS = idsRaw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  return { BOT_TOKEN, CHAT_IDS };
}

export async function sendTelegramToAll(
  text: string,
  parseHTML = true
): Promise<TelegramResult[]> {
  const { BOT_TOKEN, CHAT_IDS } = readTelegramConfig();
  if (!BOT_TOKEN || CHAT_IDS.length === 0) {
    throw new Error("Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_IDS in backend .env");
  }
  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

  const results = await Promise.all(
    CHAT_IDS.map(async (chat_id) => {
      try {
        const res = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id,
            text,
            parse_mode: parseHTML ? "HTML" : undefined,
            disable_web_page_preview: true,
          }),
        });
        const data = await res.json();
        const ok = res.ok && data?.ok !== false;
        return ok
          ? ({ chat_id, ok: true, result: data } as const)
          : ({ chat_id, ok: false, error: JSON.stringify(data) } as const);
      } catch (e: any) {
        return { chat_id, ok: false, error: e?.message || String(e) } as const;
      }
    })
  );

  return results;
}

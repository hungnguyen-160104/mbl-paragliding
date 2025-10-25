// app/api/gsheet/route.ts
export async function POST(req: Request) {
  try {
    const payload = await req.json();
    const endpoint = process.env.NEXT_PUBLIC_GSHEET_ENDPOINT; // URL /exec của Apps Script

    if (!endpoint) {
      return new Response(JSON.stringify({ ok: false, message: "Thiếu endpoint" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    const r = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const text = await r.text(); // Apps Script có thể trả text/JSON
    return new Response(text || JSON.stringify({ ok: r.ok }), {
      status: r.status,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e: any) {
    return new Response(JSON.stringify({ ok: false, message: e.message || "Server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

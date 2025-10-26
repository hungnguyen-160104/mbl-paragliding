// backend-mbl/src/controllers/booking.controller.ts
import { Request, Response } from "express";
import spots from "../data/spots.json";

type BookingPayload = {
  location?: string;
  locationName?: string;
  guestsCount?: number;
  dateISO?: string;
  timeSlot?: string;
  contact?: {
    phone?: string;
    email?: string;
    pickupLocation?: string;
    specialRequest?: string;
  };
  guests?: Array<{
    fullName?: string;
    dob?: string;
    gender?: string;
    idNumber?: string;
    weightKg?: number;
    nationality?: string;
  }>;
  addons?: {
    pickup?: boolean;
    flycam?: boolean;
    camera360?: boolean;
  };
  price?: { currency?: string; perPerson?: number; total?: number };
  createdAt?: string;
};

const ACCEPTED_KEYS_ENV = (process.env.BOOKING_ACCEPTED_KEYS || "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

function acceptedKeys(): string[] {
  return ACCEPTED_KEYS_ENV.length ? ACCEPTED_KEYS_ENV : Object.keys(spots);
}
const displayName = (k: string) => (spots as Record<string, string>)[k] || k;

export function getLocations(_req: Request, res: Response) {
  const keys = acceptedKeys();
  const items = keys.map((key) => ({ key, name: displayName(key) }));
  res.json({ ok: true, items });
}

export function validateBooking(req: Request, res: Response) {
  const keys = acceptedKeys();
  const body = (req.body || {}) as BookingPayload;

  let key = (body.location || "").trim();
  if (!key || !keys.includes(key)) {
    const byName = (body.locationName || "").trim();
    const found = keys.find((k) => displayName(k) === byName);
    if (found) key = found;
  }

  const valid = !!key && keys.includes(key);
  return res.json({ ok: true, valid, key: valid ? key : undefined, acceptedKeys: keys });
}

export function createBooking(req: Request, res: Response) {
  const keys = acceptedKeys();
  const body = (req.body || {}) as BookingPayload;

  let key = (body.location || "").trim();
  if (!key || !keys.includes(key)) {
    const byName = (body.locationName || "").trim();
    const found = keys.find((k) => displayName(k) === byName);
    if (found) key = found;
  }
  if (!key || !keys.includes(key)) {
    return res.status(400).json({
      ok: false,
      error: "Invalid location",
      received: String(body.location || body.locationName || ""),
      acceptedKeys: keys,
    });
  }

  const normalized = {
    ...body,
    location: key,
    locationName: displayName(key),
    guestsCount:
      Number.isFinite(body.guestsCount) && Number(body.guestsCount) > 0
        ? Number(body.guestsCount)
        : (body.guests?.length || 1),
    createdAt: body.createdAt || new Date().toISOString(),
  };

  // (Tuỳ chọn) lưu DB tại đây, tạo bookingId...
  return res.json({ ok: true, booking: normalized });
}

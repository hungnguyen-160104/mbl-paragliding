"use client";

import React from "react";
import { useBookingStore } from "@/store/booking-store";
import { LOCATIONS } from "@/lib/booking/calculate-price";
import type { LocationKey } from "@/lib/booking/calculate-price";

function TimeOptions() {
  const slots: string[] = [];
  for (let h = 7; h <= 18; h++) {
    const hh = h.toString().padStart(2, "0");
    slots.push(`${hh}:00`);
  }
  return (
    <>
      {slots.map((s) => (
        <option key={s} value={s}>
          {s}
        </option>
      ))}
    </>
  );
}

export default function ContactInfoStep() {
  const data = useBookingStore((s) => s.data);
  const update = useBookingStore((s) => s.update);
  const back = useBookingStore((s) => s.back);
  const next = useBookingStore((s) => s.next);
  const setContact = useBookingStore((s) => s.setContact); // <- dùng setter riêng

  // ✅ Thu hẹp kiểu + phòng trường hợp chưa có location
  const cfg = data.location
    ? LOCATIONS[data.location as LocationKey]
    : undefined;

  const showPickupField =
    Boolean(data.addons?.pickup) &&
    Boolean(cfg?.addons?.pickup?.pricePerPersonVND);

  return (
    <form
      className="space-y-6"
      onSubmit={(e) => {
        e.preventDefault();
        next();
      }}
    >
      {/* Nếu chưa chọn địa điểm, nhắc người dùng */}
      {!cfg && (
        <p className="rounded-lg border px-3 py-2 text-sm text-amber-700 bg-amber-50">
          Vui lòng chọn điểm bay trước khi nhập thông tin liên hệ.
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-neutral-700">
            Ngày bay
          </label>
          <input
            type="date"
            value={data.dateISO || ""}
            onChange={(e) => update({ dateISO: e.target.value })}
            className="mt-2 w-full rounded-lg border px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-700">
            Khung giờ
          </label>
          <select
            value={data.timeSlot || ""}
            onChange={(e) => update({ timeSlot: e.target.value })}
            className="mt-2 w-full rounded-lg border px-3 py-2"
            required
          >
            <option value="" disabled>
              Chọn khung giờ
            </option>
            <TimeOptions />
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-neutral-700">
            Số điện thoại liên hệ
          </label>
          <input
            type="tel"
            placeholder="Ví dụ: 0912345678"
            value={data.contact?.phone || ""}
            onChange={(e) => setContact({ phone: e.target.value })}
            className="mt-2 w-full rounded-lg border px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-700">
            Email liên hệ
          </label>
          <input
            type="email"
            placeholder="ten@gmail.com"
            value={data.contact?.email || ""}
            onChange={(e) => setContact({ email: e.target.value })}
            className="mt-2 w-full rounded-lg border px-3 py-2"
            required
          />
        </div>
      </div>

      {showPickupField && (
        <div>
          <label className="block text-sm font-medium text-neutral-700">
            Điểm đón
          </label>
          <input
            type="text"
            placeholder="Nhập địa chỉ khách sạn / điểm đón"
            value={data.contact?.pickupLocation || ""}
            onChange={(e) => setContact({ pickupLocation: e.target.value })}
            className="mt-2 w-full rounded-lg border px-3 py-2"
          />
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-neutral-700">
          Yêu cầu đặc biệt
        </label>
        <textarea
          rows={3}
          placeholder="Ví dụ: yêu cầu hỗ trợ quay phim, cân nặng, dị ứng..."
          value={data.contact?.specialRequest || ""}
          onChange={(e) => setContact({ specialRequest: e.target.value })}
          className="mt-2 w-full rounded-lg border px-3 py-2"
        />
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          onClick={back}
          className="px-4 py-2 rounded-xl border"
        >
          Quay lại
        </button>
        <button
          type="submit"
          disabled={!cfg}
          className="px-5 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60"
        >
          Tiếp tục
        </button>
      </div>
    </form>
  );
}

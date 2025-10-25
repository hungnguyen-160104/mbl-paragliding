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
        <option key={s} value={s} className="bg-neutral-800 text-white">
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
  const setContact = useBookingStore((s) => s.setContact);

  const cfg = data.location
    ? LOCATIONS[data.location as LocationKey]
    : undefined;

  const showPickupField =
    Boolean(data.addons?.pickup) &&
    Boolean(cfg?.addons?.pickup?.pricePerPersonVND);

  // Style cho input (nền đen mờ, bên trong khung trắng mờ)
  const inputStyle =
    "mt-2 w-full rounded-lg border border-white/40 bg-black/30 px-3 py-2 text-white placeholder:text-white/70 backdrop-blur-sm";
  
  const labelStyle = "block text-base font-medium text-white";

  // === THAY ĐỔI: Style cho khung bọc (giống tóm tắt chi phí) ===
  const glassWrapperClass =
    "bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg p-5 space-y-6";
  // ==========================================================

  return (
    <form
      className="space-y-6 text-white" // space-y-6 này sẽ tạo khoảng cách giữa khung và nút
      onSubmit={(e) => {
        e.preventDefault();
        next();
      }}
    >
      {/* === THAY ĐỔI: Thêm 1 div bọc các trường input === */}
      <div className={glassWrapperClass}>
        {!cfg && (
          <p className="rounded-lg border border-amber-300/50 bg-amber-500/10 px-3 py-2 text-sm text-white backdrop-blur-sm">
            Vui lòng chọn điểm bay trước khi nhập thông tin liên hệ.
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={labelStyle}>Ngày bay</label>
            <input
              type="date"
              value={data.dateISO || ""}
              onChange={(e) => update({ dateISO: e.target.value })}
              className={`${inputStyle} [color-scheme:dark]`}
              required
            />
          </div>
          <div>
            <label className={labelStyle}>Khung giờ</label>
            <select
              value={data.timeSlot || ""}
              onChange={(e) => update({ timeSlot: e.target.value })}
              className={inputStyle}
              required
            >
              <option value="" disabled className="bg-neutral-800 text-gray-400">
                Chọn khung giờ
              </option>
              <TimeOptions />
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={labelStyle}>Số điện thoại liên hệ</label>
            <input
              type="tel"
              placeholder="Ví dụ: 0912345678"
              value={data.contact?.phone || ""}
              onChange={(e) => setContact({ phone: e.target.value })}
              className={inputStyle}
              required
            />
          </div>
          <div>
            <label className={labelStyle}>Email liên hệ</label>
            <input
              type="email"
              placeholder="ten@gmail.com"
              value={data.contact?.email || ""}
              onChange={(e) => setContact({ email: e.target.value })}
              className={inputStyle}
              required
            />
          </div>
        </div>

        {showPickupField && (
          <div>
            <label className={labelStyle}>Điểm đón</label>
            <input
              type="text"
              placeholder="Nhập địa chỉ khách sạn / điểm đón"
              value={data.contact?.pickupLocation || ""}
              onChange={(e) => setContact({ pickupLocation: e.target.value })}
              className={inputStyle}
            />
          </div>
        )}

        <div>
          <label className={labelStyle}>Yêu cầu đặc biệt</label>
          <textarea
            rows={3}
            placeholder="Ví dụ: yêu cầu hỗ trợ quay phim, cân nặng, dị ứng..."
            value={data.contact?.specialRequest || ""}
            onChange={(e) => setContact({ specialRequest: e.target.value })}
            className={inputStyle}
          />
        </div>
      </div>
      {/* === Kết thúc div bọc === */}


      {/* Các nút này nằm BÊN NGOÀI khung kính mờ */}
      <div className="flex justify-between">
        <button
          type="button"
          onClick={back}
          className="px-4 py-2 rounded-xl border border-white/40 bg-black/30 text-white hover:bg-black/50 transition backdrop-blur-sm"
        >
          Quay lại
        </button>
        <button
          type="submit"
          disabled={!cfg}
          className="px-5 py-2 rounded-xl bg-accent text-white font-semibold hover:bg-accent/90 transition disabled:opacity-60"
        >
          Tiếp tục
        </button>
      </div>
    </form>
  );
}
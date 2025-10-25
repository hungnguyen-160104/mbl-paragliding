"use client";
import React from "react";
import { useBookingStore } from "@/store/booking-store";
import { computePrice, formatVND, LOCATIONS } from "@/lib/booking/calculate-price";

export default function PriceSummary() {
  const data = useBookingStore((s) => s.data);
  const total = computePrice({
    location: data.location,
    guestsCount: data.guestsCount,
    dateISO: data.dateISO,
    addons: data.addons,
  });

  const cfg = LOCATIONS[data.location];

  return (
    <div
      className="
        rounded-2xl 
        bg-white/15 
        backdrop-blur-md 
        border border-white/20 
        shadow-xl 
        p-6 
        text-white
      "
    >
      <h3 className="text-xl font-semibold mb-4">Tóm tắt chi phí</h3>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span>Điểm bay</span>
          <span>{cfg.name}</span>
        </div>
        <div className="flex justify-between">
          <span>Số khách</span>
          <span>{data.guestsCount}</span>
        </div>

        <div className="border-t border-white/30 my-2" />

        <div className="flex justify-between">
          <span>Giá cơ bản / khách</span>
          <span>{formatVND(total.basePricePerPerson)}</span>
        </div>

        {Object.entries(total.addonsPerPerson).map(([k, v]) =>
          v > 0 ? (
            <div key={k} className="flex justify-between">
              <span>Phụ thu {k}</span>
              <span>{formatVND(v)} / khách</span>
            </div>
          ) : null
        )}



        {total.discountPerPerson > 0 && (
  <div className="flex justify-between text-white">
    <span>Giảm theo nhóm</span>
    <span>-{formatVND(total.discountPerPerson)} / khách</span>
  </div>
)}


        <div className="border-t border-white/30 my-2" />

        <div className="flex justify-between font-semibold text-lg">
          <span>Tổng tạm tính</span>
          <span>{formatVND(total.totalAfterDiscount)}</span>
        </div>
      </div>

      <p className="text-xs text-white/80 mt-3">
        * Giá tự động áp khuyến mãi theo số lượng. Một số điểm có giá cuối tuần khác ngày thường.
      </p>
    </div>
  );
}

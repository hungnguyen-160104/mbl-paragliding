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
    <div className="rounded-2xl bg-white shadow p-5">
      <h3 className="text-lg font-semibold">Tóm tắt chi phí</h3>
      <div className="mt-3 space-y-2 text-sm text-neutral-700">
        <div className="flex justify-between"><span>Điểm bay</span><span>{cfg.name}</span></div>
        <div className="flex justify-between"><span>Số khách</span><span>{data.guestsCount}</span></div>
        <div className="border-t my-2"></div>
        <div className="flex justify-between">
          <span>Giá cơ bản / khách</span>
          <span>{formatVND(total.basePricePerPerson)}</span>
        </div>
        {Object.entries(total.addonsPerPerson).map(([k, v]) => (
          v > 0 ? (
            <div key={k} className="flex justify-between">
              <span>Phụ thu {k}</span>
              <span>{formatVND(v)} / khách</span>
            </div>
          ) : null
        ))}
        {total.discountPerPerson > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Giảm theo nhóm</span>
            <span>-{formatVND(total.discountPerPerson)} / khách</span>
          </div>
        )}
        <div className="border-t my-2"></div>
        <div className="flex justify-between font-semibold">
          <span>Tổng tạm tính</span>
          <span>{formatVND(total.totalAfterDiscount)}</span>
        </div>
      </div>
      <p className="text-xs text-neutral-500 mt-3">
        * Giá tự động áp khuyến mãi theo số lượng. Một số điểm có giá cuối tuần khác ngày thường.
      </p>
    </div>
  );
}

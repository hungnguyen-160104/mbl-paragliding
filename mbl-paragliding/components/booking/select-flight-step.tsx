"use client";
import React from "react";
import { useBookingStore } from "@/store/booking-store";
import { LOCATIONS } from "@/lib/booking/calculate-price";
import ServiceOptions from "./service-options";

export default function SelectFlightStep() {
  const data = useBookingStore((s) => s.data);
  const setGuestsCount = useBookingStore((s) => s.setGuestsCount);
  const update = useBookingStore((s) => s.update);
  const next = useBookingStore((s) => s.next);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.values(LOCATIONS).map((loc) => (
          <label key={loc.key} className={`rounded-2xl border p-4 cursor-pointer hover:shadow ${data.location === loc.key ? "border-blue-600 ring-2 ring-blue-200" : "border-neutral-200"}`}>
            <input
              type="radio"
              name="location"
              checked={data.location === loc.key}
              onChange={() => update({ location: loc.key })}
              className="hidden"
            />
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-lg font-semibold">{loc.name}</div>
                <ul className="text-sm text-neutral-600 list-disc ml-5 mt-2">
                  {loc.included.slice(0, 4).map((it, i) => <li key={i}>{it}</li>)}
                </ul>
                {loc.excluded && <p className="text-xs text-neutral-500 mt-1">Không bao gồm: {loc.excluded.join(", ")}</p>}
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">{loc.basePriceVND().toLocaleString("vi-VN")}₫</div>
                <div className="text-xs text-neutral-500">/ khách (giá cơ bản)</div>
              </div>
            </div>
          </label>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-2xl border p-4">
          <label className="block text-sm font-medium text-neutral-700">Số lượng người bay</label>
          <input
            type="number"
            min={1}
            max={10}
            value={data.guestsCount}
            onChange={(e) => setGuestsCount(parseInt(e.target.value || "1", 10))}
            className="mt-2 w-full rounded-lg border px-3 py-2"
          />
          <p className="text-xs text-neutral-500 mt-1">Tối đa 10 khách mỗi lượt đặt.</p>
        </div>
        <div className="rounded-2xl border p-4">
          <p className="text-sm text-neutral-700">
            * Khuyến mãi nhóm áp dụng tự động theo số lượng khách. Chi tiết xem mục tóm tắt chi phí.
          </p>
        </div>
      </div>

      <ServiceOptions />

      <div className="flex justify-end">
        <button onClick={next} className="px-5 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700">
          Tiếp tục
        </button>
      </div>
    </div>
  );
}

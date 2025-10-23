"use client";
import React from "react";
import { useBookingStore } from "@/store/booking-store";

const STEPS = [
  { id: 1, label: "Chọn dịch vụ" },
  { id: 2, label: "Ngày & liên hệ" },
  { id: 3, label: "Khách bay" },
  { id: 4, label: "Xác nhận" },
  { id: 5, label: "Hoàn tất" },
];

export default function StepIndicator() {
  const step = useBookingStore((s) => s.step);

  return (
    <ol className="flex items-center justify-between gap-2">
      {STEPS.map((s, idx) => {
        const active = step === s.id;
        const done = step > s.id;
        return (
          <li key={s.id} className="flex-1">
            <div className="flex items-center">
              <div
                className={`flex size-9 items-center justify-center rounded-full border text-sm font-semibold
                ${done ? "bg-green-500 text-white border-green-500" : active ? "bg-blue-600 text-white border-blue-600" : "bg-white border-neutral-300 text-neutral-600"}`}
              >
                {done ? "✓" : s.id}
              </div>
              <div className="ml-3 text-sm font-medium text-neutral-700">{s.label}</div>
              {idx < STEPS.length - 1 && (
                <div className={`mx-3 h-px flex-1 ${step > s.id ? "bg-green-400" : "bg-neutral-200"}`}></div>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}

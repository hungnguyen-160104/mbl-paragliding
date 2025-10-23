"use client";
import React from "react";
import { useBookingStore } from "@/store/booking-store";

const genders = ["Nam", "Nữ", "Khác"] as const;

export default function GuestInfoStep() {
  const data = useBookingStore((s) => s.data);
  const setGuest = useBookingStore((s) => s.setGuest);
  const back = useBookingStore((s) => s.back);
  const next = useBookingStore((s) => s.next);

  return (
    <form
      className="space-y-6"
      onSubmit={(e) => { e.preventDefault(); next(); }}
    >
      <p className="text-sm text-neutral-700">
        Vui lòng điền đầy đủ & chính xác thông tin cho từng hành khách.
      </p>

      <div className="space-y-5">
        {Array.from({ length: data.guestsCount }).map((_, idx) => {
          const g = data.guests[idx] || {};
          return (
            <fieldset key={idx} className="rounded-2xl border p-4">
              <legend className="font-semibold">Khách {idx + 1}</legend>
              <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700">Họ và tên (passport)</label>
                  <input
                    type="text"
                    value={g.fullName || ""}
                    onChange={(e) => setGuest(idx, { fullName: e.target.value })}
                    className="mt-2 w-full rounded-lg border px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700">Ngày sinh</label>
                  <input
                    type="date"
                    value={g.dob || ""}
                    onChange={(e) => setGuest(idx, { dob: e.target.value })}
                    className="mt-2 w-full rounded-lg border px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700">Giới tính</label>
                  <select
                    className="mt-2 w-full rounded-lg border px-3 py-2"
                    value={(g.gender as any) || "Nam"}
                    onChange={(e) => setGuest(idx, { gender: e.target.value as any })}
                  >
                    {genders.map((x) => <option key={x} value={x}>{x}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700">Số CCCD/Passport</label>
                  <input
                    type="text"
                    value={g.idNumber || ""}
                    onChange={(e) => setGuest(idx, { idNumber: e.target.value })}
                    className="mt-2 w-full rounded-lg border px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700">Cân nặng (kg)</label>
                  <input
                    type="number"
                    min={20}
                    max={130}
                    value={g.weightKg ?? ""}
                    onChange={(e) => setGuest(idx, { weightKg: parseFloat(e.target.value) })}
                    className="mt-2 w-full rounded-lg border px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700">Quốc tịch</label>
                  <input
                    type="text"
                    value={g.nationality || ""}
                    onChange={(e) => setGuest(idx, { nationality: e.target.value })}
                    className="mt-2 w-full rounded-lg border px-3 py-2"
                  />
                </div>
              </div>
            </fieldset>
          );
        })}
      </div>

      <div className="flex justify-between">
        <button type="button" onClick={back} className="px-4 py-2 rounded-xl border">Quay lại</button>
        <button type="submit" className="px-5 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700">Tiếp tục</button>
      </div>
    </form>
  );
}

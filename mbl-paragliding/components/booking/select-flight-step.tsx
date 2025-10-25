"use client";
// 1. Thêm 'useState' từ React
import React, { useState } from "react";
import { useBookingStore } from "@/store/booking-store";
import { LOCATIONS } from "@/lib/booking/calculate-price";
import type { LocationKey } from "@/lib/booking/calculate-price";
import { motion } from "framer-motion";

export default function SelectFlightStep() {
  const data = useBookingStore((s) => s.data);
  const setGuestsCount = useBookingStore((s) => s.setGuestsCount);
  const update = useBookingStore((s) => s.update);
  const next = useBookingStore((s) => s.next);

  const [selected, setSelected] = useState<LocationKey | null>(
    (data.location as LocationKey) || null
  );

  // 2. Thêm state nội bộ để quản lý giá trị nhập (dạng string)
  // Giá trị ban đầu là 0, chuyển thành "0"
  const [guestInput, setGuestInput] = useState(
    (data.guestsCount || 0).toString()
  );

  const handleSelect = (key: LocationKey) => {
    update({ location: key });
    setSelected(key);
  };

  // 3. Tạo hàm xử lý mới cho ô nhập số lượng
  const handleGuestInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;

    // Chỉ cho phép nhập số
    if (/^[0-9]*$/.test(rawValue)) {
      // Cập nhật state nội bộ (dạng string)
      setGuestInput(rawValue);

      // Cập nhật state chung (dạng number)
      // Nếu là string rỗng "", parseInt sẽ là NaN, ta đổi thành 0
      const numValue = parseInt(rawValue, 10);
      setGuestsCount(isNaN(numValue) ? 0 : numValue);
    }
  };

  const selectedCfg = selected ? LOCATIONS[selected as LocationKey] : null;

  return (
    <div className="space-y-10 text-white">
      {/* ====== Lưới các điểm bay ====== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {Object.values(LOCATIONS).map((loc) => {
          const isActive = selected === loc.key;
          return (
            <motion.div
              key={loc.key}
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2 }}
              onClick={() => handleSelect(loc.key as LocationKey)}
              className={`cursor-pointer p-5 rounded-2xl border text-center backdrop-blur-lg transition-all duration-300
                ${
                  isActive
                    ? "bg-white/30 border-accent/70 shadow-xl"
                    : "bg-white/10 border-white/20 hover:bg-white/20"
                }`}
            >
              <h3 className="text-xl font-semibold mb-2">{loc.name}</h3>
              <div className="text-lg font-bold text-white">
                {loc.basePriceVND().toLocaleString("vi-VN")}₫
              </div>
              <p className="text-xs text-white mt-1">/ khách (giá cơ bản)</p>
            </motion.div>
          );
        })}
      </div>

      {/* ====== Khung mô tả chi tiết ====== */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-6 shadow-lg"
      >
        {!selectedCfg ? (
          <p className="text-center text-white">
            Vui lòng chọn{" "}
            <span className="text-white font-semibold">điểm bay</span> để xem
            mô tả chi tiết.
          </p>
        ) : (
          <div>
            <h4 className="text-2xl font-semibold mb-3 text-white">
              {selectedCfg.name}
            </h4>
            <ul className="list-disc ml-6 space-y-1 text-white text-sm">
              {selectedCfg.included?.map((it, i) => (
                <li key={i}>{it}</li>
              ))}
            </ul>

            {selectedCfg.excluded && (
              <p className="text-xs text-white mt-3">
                <strong>Không bao gồm:</strong>{" "}
                {selectedCfg.excluded.join(", ")}
              </p>
            )}
          </div>
        )}
      </motion.div>

      {/* ====== Số lượng khách (Đã cập nhật) ====== */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-5 shadow-md">
          <label className="block text-sm font-medium mb-2">
            Số lượng người bay
          </label>
          {/* 4. Cập nhật input để dùng state và handler mới */}
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={guestInput} // Dùng state nội bộ
            onChange={handleGuestInputChange} // Dùng handler mới
            className="w-full rounded-lg bg-white/20 border border-white/30 px-3 py-2 text-white placeholder-slate-300"
          />
        </div>

        <div className="rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-5 shadow-md text-sm text-white">
          * Khuyến mãi nhóm áp dụng tự động theo số lượng khách. Chi tiết xem
          trong mục tóm tắt chi phí.
        </div>
      </div>

      {/* ====== Dịch vụ tuỳ chọn (tự động đổi theo điểm bay) ====== */}
<div>
  <h4 className="text-xl font-semibold mb-4">Dịch vụ tuỳ chọn</h4>

  {!selectedCfg ? (
    <p className="text-slate-200 italic text-sm">
      Vui lòng chọn điểm bay để xem các dịch vụ khả dụng.
    </p>
  ) : (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {(Object.entries(selectedCfg.addons) as [string, any][]).map(
        ([key, conf]) => {
          const checked = (data.addons as any)?.[key];
          const disabled = conf.pricePerPersonVND === null;

          return (
            <label
              key={key}
              className={`flex flex-col gap-1 rounded-xl border backdrop-blur-md p-4 transition-all duration-200
                ${
                  checked
                    ? "bg-white/30 border-accent/70 shadow-lg"
                    : "bg-white/10 border-white/20 hover:bg-white/20"
                }
                ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  disabled={disabled}
                  checked={checked}
                  onChange={() =>
                    update({
                      addons: {
                        ...data.addons,
                        [key]: !checked,
                      },
                    })
                  }
                  className="h-5 w-5 accent-accent"
                />
                <span className="font-medium">{conf.label}</span>
              </div>

              {conf.pricePerPersonVND !== null ? (
                <p className="text-sm text-white">
                  {conf.pricePerPersonVND.toLocaleString("vi-VN")}₫ / khách
                </p>
              ) : (
                <p className="text-xs text-slate-300 italic mt-1">
                  Không khả dụng tại điểm bay này
                </p>
              )}

              {key === "pickup" && selected === "sapa" && (
                <p className="text-xs italic text-slate-300 mt-1">
                  Xe đón trả tại khách sạn (Trung tâm Sapa, Lao Chải, Tả Van)
                </p>
              )}
              {key === "pickup" && selected === "ha_noi" && (
                <p className="text-xs italic text-slate-300 mt-1">
                  Xe đón trả 2 chiều từ phố Trần Duy Hưng (Hà Nội)
                </p>
              )}
            </label>
          );
        }
      )}
    </div>
  )}
</div>


      {/* ====== Nút tiếp tục ====== */}
      <div className="flex justify-end">
        <button
          onClick={next}
          className="px-6 py-2.5 rounded-xl bg-accent text-white font-semibold hover:bg-accent/90 transition"
        >
          Tiếp tục
        </button>
      </div>
    </div>
  );
}
"use client";
import React from "react";
import { useBookingStore } from "@/store/booking-store";

const genders = ["Nam", "Nữ", "Khác"] as const;

export default function GuestInfoStep() {
  const data = useBookingStore((s) => s.data);
  const setGuest = useBookingStore((s) => s.setGuest);
  const back = useBookingStore((s) => s.back);
  const next = useBookingStore((s) => s.next);

  // === Định nghĩa style chung ===
  const glassWrapperClass =
    "bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg p-5 space-y-6";

  const inputStyle =
    "mt-2 w-full rounded-lg border border-white/40 bg-black/30 px-3 py-2 text-white placeholder:text-white/70 backdrop-blur-sm";
  
  const labelStyle = "block text-base font-medium text-white";
  // =============================

  return (
    <form
      className="space-y-6 text-white" // Thêm space-y-6 để tạo khoảng cách với nút
      onSubmit={(e) => { e.preventDefault(); next(); }}
    >
      {/* === Bọc nội dung form trong div kính mờ === */}
      <div className={glassWrapperClass}>
        <p className="text-sm text-white">
          Vui lòng điền đầy đủ & chính xác thông tin cho từng hành khách.
        </p>

        <div className="space-y-5">
          {Array.from({ length: data.guestsCount }).map((_, idx) => {
            const g = data.guests[idx] || {};
            return (
              // === THAY ĐỔI: Style cho fieldset ===
              <fieldset key={idx} className="rounded-2xl border border-white/40 p-4">
                <legend className="font-semibold text-white px-2">Khách {idx + 1}</legend>
                <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    {/* === THAY ĐỔI: Style cho label === */}
                    <label className={labelStyle}>Họ và tên (passport)</label>
                    <input
                      type="text"
                      value={g.fullName || ""}
                      onChange={(e) => setGuest(idx, { fullName: e.target.value })}
                      // === THAY ĐỔI: Style cho input ===
                      className={inputStyle}
                      required
                    />
                  </div>
                  <div>
                    <label className={labelStyle}>Ngày sinh</label>
                    <input
                      type="date"
                      value={g.dob || ""}
                      onChange={(e) => setGuest(idx, { dob: e.target.value })}
                      // === THAY ĐỔI: Style cho input ===
                      className={`${inputStyle} [color-scheme:dark]`}
                      required
                    />
                  </div>
                  <div>
                    <label className={labelStyle}>Giới tính</label>
                    <select
                      // === THAY ĐỔI: Style cho input ===
                      className={inputStyle}
                      value={(g.gender as any) || "Nam"}
                      onChange={(e) => setGuest(idx, { gender: e.target.value as any })}
                    >
                      {/* === THAY ĐỔI: Style cho option === */}
                      {genders.map((x) => <option key={x} value={x} className="bg-neutral-800 text-white">{x}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className={labelStyle}>Số CCCD/Passport</label>
                    <input
                      type="text"
                      value={g.idNumber || ""}
                      onChange={(e) => setGuest(idx, { idNumber: e.target.value })}
                      className={inputStyle}
                    />
                  </div>
                  <div>
                    <label className={labelStyle}>Cân nặng (kg)</label>
                    <input
                      type="text" // Đổi sang text để ẩn nút tăng/giảm
                      inputMode="decimal" // Hiển thị bàn phím số (cho phép dấu chấm)
                      value={g.weightKg ?? ""}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (val === "" || /^[0-9]*\.?[0-9]*$/.test(val)) {
                           setGuest(idx, { weightKg: parseFloat(val) || undefined })
                        }
                      }}
                      className={inputStyle}
                    />
                  </div>
                  <div>
                    <label className={labelStyle}>Quốc tịch</label>
                    <input
                      type="text"
                      value={g.nationality || ""}
                      onChange={(e) => setGuest(idx, { nationality: e.target.value })}
                      className={inputStyle}
                    />
                  </div>
                </div>
              </fieldset>
            );
          })}
        </div>
      </div>
      {/* === Kết thúc div bọc === */}


      {/* Các nút nằm BÊN NGOÀI khung kính mờ */}
      <div className="flex justify-between">
        <button 
          type="button" 
          onClick={back} 
          // === THAY ĐỔI: Style nút Quay lại ===
          className="px-4 py-2 rounded-xl border border-white/40 bg-black/30 text-white hover:bg-black/50 transition backdrop-blur-sm"
        >
          Quay lại
        </button>
        <button 
          type="submit" 
          // === THAY ĐỔI: Style nút Tiếp tục ===
          className="px-5 py-2 rounded-xl bg-accent text-white font-semibold hover:bg-accent/90 transition"
        >
          Tiếp tục
        </button>
      </div>
    </form>
  );
}
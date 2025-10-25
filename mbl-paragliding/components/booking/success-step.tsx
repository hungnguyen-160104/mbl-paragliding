"use client";
import React from "react";
import { useBookingStore } from "@/store/booking-store";
import { LOCATIONS } from "@/lib/booking/calculate-price";

export default function SuccessStep() {
  const data = useBookingStore((s) => s.data);
  const reset = useBookingStore((s) => s.reset);
  const cfg = LOCATIONS[data.location];

  const zaloQR = process.env.NEXT_PUBLIC_ZALO_QR_URL;
  const whatsappQR = process.env.NEXT_PUBLIC_WHATSAPP_QR_URL;

  const glassWrapperClass = "bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg p-5 space-y-6";
  const innerBlockClass = "rounded-2xl border border-white/40 p-4 text-center";

  // === THAY ĐỔI: Style cho nút bản đồ ===
  const mapButtonStyle = "inline-flex items-center justify-center px-2 py-1 ml-2 rounded-md bg-red-600 text-white text-xs font-semibold hover:bg-red-700 transition";
  // ======================================

  return (
    <div className="space-y-6 text-white">

      <div className={glassWrapperClass}>
        <h3 className="text-lg font-semibold text-white">HOÀN TẤT</h3>
        <p className="text-white/90">
          Cảm ơn đặt chỗ của bạn! Chúng tôi sẽ liên hệ trực tiếp để xác nhận thông tin chuyến bay.
          Nếu cần hỗ trợ nhanh, vui lòng liên hệ hotline hiển thị trên website.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {zaloQR && (
            <div className={innerBlockClass}>
              <div className="font-medium text-white">QR Zalo</div>
              <img src={zaloQR} alt="Zalo QR" className="mx-auto mt-2 max-h-64 rounded-lg" />
            </div>
          )}
          {whatsappQR && (
            <div className={innerBlockClass}>
              <div className="font-medium text-white">QR WhatsApp</div>
              <img src={whatsappQR} alt="WhatsApp QR" className="mx-auto mt-2 max-h-64 rounded-lg" />
            </div>
          )}
        </div>

        <div className="rounded-2xl border border-white/40 p-4">
          <h4 className="font-semibold text-white">Lưu ý trước chuyến bay</h4>
          <ol className="list-decimal ml-5 mt-2 space-y-1 text-sm text-white/80">
            <li>Có mặt tại điểm bay trước 30 phút để làm thủ tục Check-in.</li>
            <li>Trang phục: nên đi giày thể thao; không đi giày cao gót; quần áo dài tay màu sắc sặc sỡ; có thể đeo kính; chuẩn bị điện thoại còn trống ~4GB để nhận ảnh/video.</li>
            <li>
              Toạ độ điểm bay:
              {cfg.coordinates?.takeoff && (
                <>
                  {" "}Cất cánh: 
                  {/* === THAY ĐỔI: Sử dụng nút đỏ === */}
                  <a className={mapButtonStyle} href={cfg.coordinates.takeoff} target="_blank" rel="noreferrer">
                    Xem bản đồ
                  </a>
                </>
              )}
              {cfg.coordinates?.landing && (
                <>
                  {" "}• Hạ cánh: 
                  {/* === THAY ĐỔI: Sử dụng nút đỏ === */}
                  <a className={mapButtonStyle} href={cfg.coordinates.landing} target="_blank" rel="noreferrer">
                    Xem bản đồ
                  </a>
                </>
              )}
              {/* Thêm style tương tự nếu có điểm đón */}
              {cfg.coordinates?.pickup && (
                <>
                  {" "}• Điểm đón (HN):
                  <a className={mapButtonStyle} href={cfg.coordinates.pickup} target="_blank" rel="noreferrer">
                    Xem bản đồ
                  </a>
                </>
              )}
            </li>
          </ol>
        </div>
      </div>

      <div className="flex justify-end">
        <button 
          onClick={reset} 
          className="px-5 py-2 rounded-xl border border-white/40 bg-black/30 text-white hover:bg-black/50 transition backdrop-blur-sm"
        >
          Đặt chuyến khác
        </button>
      </div>
    </div>
  );
}
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

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">HOÀN TẤT</h3>
      <p>
        Cảm ơn đặt chỗ của bạn! Chúng tôi sẽ liên hệ trực tiếp để xác nhận thông tin chuyến bay.
        Nếu cần hỗ trợ nhanh, vui lòng liên hệ hotline hiển thị trên website.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {zaloQR && (
          <div className="rounded-2xl border p-4 text-center">
            <div className="font-medium">QR Zalo</div>
            <img src={zaloQR} alt="Zalo QR" className="mx-auto mt-2 max-h-64" />
          </div>
        )}
        {whatsappQR && (
          <div className="rounded-2xl border p-4 text-center">
            <div className="font-medium">QR WhatsApp</div>
            <img src={whatsappQR} alt="WhatsApp QR" className="mx-auto mt-2 max-h-64" />
          </div>
        )}
      </div>

      <div className="rounded-2xl border p-4">
        <h4 className="font-semibold">Lưu ý trước chuyến bay</h4>
        <ol className="list-decimal ml-5 mt-2 space-y-1 text-sm text-neutral-700">
          <li>Có mặt tại điểm bay trước 30 phút để làm thủ tục Check-in.</li>
          <li>Trang phục: nên đi giày thể thao; không đi giày cao gót; quần áo dài tay màu sắc sặc sỡ; có thể đeo kính; chuẩn bị điện thoại còn trống ~4GB để nhận ảnh/video.</li>
          <li>
            Toạ độ điểm bay:
            {cfg.coordinates?.takeoff && (
              <> {" "}Cất cánh: <a className="text-blue-600 underline" href={cfg.coordinates.takeoff} target="_blank">Xem bản đồ</a></>
            )}
            {cfg.coordinates?.landing && (
              <> {" "}• Hạ cánh: <a className="text-blue-600 underline" href={cfg.coordinates.landing} target="_blank">Xem bản đồ</a></>
            )}
            {cfg.coordinates?.pickup && (
              <> {" "}• Điểm đón (HN): <a className="text-blue-600 underline" href={cfg.coordinates.pickup} target="_blank">Xem bản đồ</a></>
            )}
          </li>
        </ol>
      </div>

      <div className="flex justify-end">
        <button onClick={reset} className="px-5 py-2 rounded-xl border">Đặt chuyến khác</button>
      </div>
    </div>
  );
}

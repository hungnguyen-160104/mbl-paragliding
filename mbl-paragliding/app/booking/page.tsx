"use client";

import React from "react";
import { useBookingStore } from "@/store/booking-store";
import SelectFlightStep from "@/components/booking/select-flight-step";
import ContactInfoStep from "@/components/booking/contact-info-step";
import GuestInfoStep from "@/components/booking/guest-info-step";
import ReviewConfirmStep from "@/components/booking/review-confirm-step";
import SuccessStep from "@/components/booking/success-step";
import StepIndicator from "@/components/booking/step-indicator";
import PriceSummary from "@/components/booking/price-summary";

export default function BookingPage() {
  const step = useBookingStore((s) => s.step);

  const backgroundStyle = {
    backgroundImage: "url('/hinh-nen.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundAttachment: "fixed",
  };

  const glassWrapperClass =
    "bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg p-5";

  return (
    <main className="min-h-screen" style={backgroundStyle}>
      <div className="mx-auto max-w-5xl px-4 py-8 text-white">
        
        <h1
          className="text-3xl font-bold tracking-tight"
          style={{ textShadow: "0 2px 4px rgba(0,0,0,0.5)" }}
        >
          Đặt bay (Book your flight)
        </h1>
        <p
          className="text-neutral-200 mt-1"
          style={{ textShadow: "0 1px 3px rgba(0,0,0,0.4)" }}
        >
          Điều hướng 5 bước • Lưu ý: thông tin & giá có thể thay đổi theo thời
          gian.
        </p>
        
        <div className={`mt-6 ${glassWrapperClass} text-white`}>
          <StepIndicator />
        </div>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6">
          
          {/* === QUAN TRỌNG: SỬ DỤNG CODE NÀY === */}
          {/* Chỉ bọc nền trắng cho bước 5 */}
          <div
            className={
              step === 5
                ? "rounded-2xl bg-white shadow p-5 text-neutral-900" // Bước 5: Nền trắng
                : "" // Các bước 1, 2, 3, 4: Không bọc
            }
          >
          {/* === KẾT THÚC THAY ĐỔI === */}

            {step === 1 && <SelectFlightStep />}
            {step === 2 && <ContactInfoStep />}
            {step === 3 && <GuestInfoStep />}
            {step === 4 && <ReviewConfirmStep />}
            {step === 5 && <SuccessStep />}
          </div>

          <aside className="h-fit sticky top-6">
            <div className={`${glassWrapperClass} text-white`}>
              <PriceSummary />
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
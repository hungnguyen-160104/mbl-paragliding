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

  return (
    <main className="min-h-screen bg-neutral-50">
      <div className="mx-auto max-w-5xl px-4 py-8">
        <h1 className="text-3xl font-bold tracking-tight">Đặt bay (Book your flight)</h1>
        <p className="text-neutral-600 mt-1">Điều hướng 5 bước • Lưu ý: thông tin & giá có thể thay đổi theo thời gian.</p>
        <div className="mt-6">
          <StepIndicator />
        </div>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6">
          <div className="rounded-2xl bg-white shadow p-5">
            {step === 1 && <SelectFlightStep />}
            {step === 2 && <ContactInfoStep />}
            {step === 3 && <GuestInfoStep />}
            {step === 4 && <ReviewConfirmStep />}
            {step === 5 && <SuccessStep />}
          </div>

          <aside className="h-fit sticky top-6">
            <PriceSummary />
          </aside>
        </div>
      </div>
    </main>
  );
}

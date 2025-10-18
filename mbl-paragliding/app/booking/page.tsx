"use client";

import { useState, useEffect } from "react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { StepIndicator } from "@/components/booking/step-indicator";
import { GuestCountStep } from "@/components/booking/guest-count-step";
import { GuestInfoStep } from "@/components/booking/guest-info-step";
import { OptionsStep } from "@/components/booking/options-step";
import { DiscountStep } from "@/components/booking/discount-step";
import { ReviewStep } from "@/components/booking/review-step";
import { ContactStep } from "@/components/booking/contact-step";
import type { BookingState, GuestInfo, DiscountCode } from "@/types/booking";
import { calculateTotal } from "@/lib/pricing";
import { useLanguage } from "@/contexts/language-context";

const TOTAL_STEPS = 6;

// ===== Fallback copy nếu translations.ts chưa có khóa booking =====
const COPY = {
  vi: {
    title: "Đặt tour bay dù lượn",
    subtitle: "Điền thông tin để đặt chuyến bay của bạn. Chúng tôi sẽ liên hệ xác nhận ngay.",
  },
  en: {
    title: "Book Your Paragliding Tour",
    subtitle: "Fill in your details to book your flight. We’ll contact you to confirm shortly.",
  },
  fr: {
    title: "Réserver votre vol en parapente",
    subtitle:
      "Renseignez vos informations pour réserver votre vol. Nous vous contacterons rapidement pour confirmer.",
  },
  ru: {
    title: "Забронировать полёт на параплане",
    subtitle:
      "Введите свои данные для бронирования. Мы свяжемся с вами для подтверждения в ближайшее время.",
  },
};

export default function BookingPage() {
  const { t, language } = useLanguage();
  const L = (COPY as any)[language] ?? COPY.en;
  const title = t?.booking?.title ?? L.title;
  const subtitle = t?.booking?.subtitle ?? L.subtitle;

  const [bookingState, setBookingState] = useState<BookingState>({
    step: 1,
    guestCount: 1,
    guests: [],
    options: {
      transfer: false,
      flycam: false,
      luggage: false,
    },
    subtotal: 0,
    discountAmount: 0,
    total: 0,
  });

  // Initialize guests when guest count changes
  useEffect(() => {
    if (bookingState.guestCount !== bookingState.guests.length) {
      const newGuests: GuestInfo[] = Array.from({ length: bookingState.guestCount }, (_, i) => {
        const existingGuest = bookingState.guests[i];
        return (
          existingGuest || {
            id: `guest-${i}`,
            name: "",
            phone: "",
            email: "",
            date: "",
            timeSlot: "morning" as const,
            pickup: "",
            note: "",
          }
        );
      });
      setBookingState((prev) => ({ ...prev, guests: newGuests }));
    }
  }, [bookingState.guestCount, bookingState.guests]);

  // Calculate total whenever relevant fields change
  useEffect(() => {
    const { subtotal, discountAmount, total } = calculateTotal(
      bookingState.guestCount,
      bookingState.options,
      bookingState.discountCode,
    );
    setBookingState((prev) => ({ ...prev, subtotal, discountAmount, total }));
  }, [bookingState.guestCount, bookingState.options, bookingState.discountCode]);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("mbl-booking", JSON.stringify(bookingState));
  }, [bookingState]);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("mbl-booking");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setBookingState(parsed);
      } catch (e) {
        console.error("[v0] Failed to parse saved booking state:", e);
      }
    }
  }, []);

  const handleGuestCountChange = (count: number) => {
    setBookingState((prev) => ({ ...prev, guestCount: count }));
  };

  const handleGuestsChange = (guests: GuestInfo[]) => {
    setBookingState((prev) => ({ ...prev, guests }));
  };

  const handleOptionsChange = (options: typeof bookingState.options) => {
    setBookingState((prev) => ({ ...prev, options }));
  };

  const handleDiscountApply = (code?: DiscountCode) => {
    setBookingState((prev) => ({ ...prev, discountCode: code }));
  };

  const nextStep = () => {
    setBookingState((prev) => ({ ...prev, step: Math.min(TOTAL_STEPS, prev.step + 1) }));
  };

  const prevStep = () => {
    setBookingState((prev) => ({ ...prev, step: Math.max(1, prev.step - 1) }));
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <Navigation />

      <section className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
                {title}
              </h1>
              <p className="text-lg text-muted-foreground">{subtitle}</p>
            </div>

            <StepIndicator currentStep={bookingState.step} totalSteps={TOTAL_STEPS} />

            <div className="mt-8">
              {bookingState.step === 1 && (
                <GuestCountStep
                  guestCount={bookingState.guestCount}
                  onGuestCountChange={handleGuestCountChange}
                  onNext={nextStep}
                />
              )}

              {bookingState.step === 2 && (
                <GuestInfoStep
                  guests={bookingState.guests}
                  onGuestsChange={handleGuestsChange}
                  onNext={nextStep}
                  onBack={prevStep}
                />
              )}

              {bookingState.step === 3 && (
                <OptionsStep
                  options={bookingState.options}
                  guestCount={bookingState.guestCount}
                  onOptionsChange={handleOptionsChange}
                  onNext={nextStep}
                  onBack={prevStep}
                />
              )}

              {bookingState.step === 4 && (
                <DiscountStep
                  discountCode={bookingState.discountCode}
                  subtotal={bookingState.subtotal}
                  discountAmount={bookingState.discountAmount}
                  total={bookingState.total}
                  onDiscountApply={handleDiscountApply}
                  onNext={nextStep}
                  onBack={prevStep}
                />
              )}

              {bookingState.step === 5 && (
                <ReviewStep bookingState={bookingState} onNext={nextStep} onBack={prevStep} />
              )}

              {bookingState.step === 6 && <ContactStep bookingState={bookingState} onBack={prevStep} />}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

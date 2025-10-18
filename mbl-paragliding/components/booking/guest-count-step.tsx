"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Minus, Plus } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";

interface GuestCountStepProps {
  guestCount: number;
  onGuestCountChange: (count: number) => void;
  onNext: () => void;
}

export function GuestCountStep({
  guestCount,
  onGuestCountChange,
  onNext,
}: GuestCountStepProps) {
  const { t } = useLanguage();

  // Nhóm booking trong translations (có thể không đủ khóa -> dùng fallback)
  const B = (t as any).booking ?? {};
  const GC = B.guestCount ?? {};

  const title: string = GC.title ?? "Number of Guests";
  const description: string =
    GC.description ??
    B.guestCountDescription ??
    "Select number of guests";
  const nextLabel: string =
    GC.next ?? B.next ?? B.continue ?? "Continue";
  const decreaseLabel: string = GC.decrease ?? "Decrease";
  const increaseLabel: string = GC.increase ?? "Increase";

  // Giới hạn số khách (tùy bạn thay đổi)
  const MIN = 1;
  const MAX = 12;

  const dec = () => onGuestCountChange(Math.max(MIN, guestCount - 1));
  const inc = () => onGuestCountChange(Math.min(MAX, guestCount + 1));

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="flex items-center justify-center gap-6">
          <Button
            aria-label={decreaseLabel}
            variant="outline"
            size="icon"
            onClick={dec}
            disabled={guestCount <= MIN}
          >
            <Minus size={20} />
          </Button>

          <div
            className="text-5xl font-bold text-primary w-24 text-center"
            aria-live="polite"
          >
            {guestCount}
          </div>

          <Button
            aria-label={increaseLabel}
            variant="outline"
            size="icon"
            onClick={inc}
            disabled={guestCount >= MAX}
          >
            <Plus size={20} />
          </Button>
        </div>

        <p className="text-center text-muted-foreground">{description}</p>

        <Button onClick={onNext} size="lg" className="w-full">
          {nextLabel}
        </Button>
      </CardContent>
    </Card>
  );
}

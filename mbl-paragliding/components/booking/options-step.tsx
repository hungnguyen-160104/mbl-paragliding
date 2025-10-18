"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import type { BookingOptions } from "@/types/booking"
import { formatVND, OPTION_PRICES } from "@/lib/pricing"
import { Car, Camera, Briefcase } from "lucide-react"

interface OptionsStepProps {
  options: BookingOptions
  guestCount: number
  onOptionsChange: (options: BookingOptions) => void
  onNext: () => void
  onBack: () => void
}

export function OptionsStep({ options, guestCount, onOptionsChange, onNext, onBack }: OptionsStepProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Dịch vụ thêm</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-start gap-4 p-4 border rounded-lg hover:border-primary transition-colors">
            <Checkbox
              id="transfer"
              checked={options.transfer}
              onCheckedChange={(checked) => onOptionsChange({ ...options, transfer: checked as boolean })}
            />
            <div className="flex-1">
              <Label htmlFor="transfer" className="flex items-center gap-2 text-base font-semibold cursor-pointer">
                <Car size={20} className="text-primary" />
                Dịch vụ đưa đón
              </Label>
              <p className="text-sm text-muted-foreground mt-1">Xe đưa đón từ khách sạn đến điểm bay và ngược lại</p>
              <p className="text-sm font-semibold text-primary mt-2">{formatVND(OPTION_PRICES.transfer)} / nhóm</p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 border rounded-lg hover:border-primary transition-colors">
            <Checkbox
              id="flycam"
              checked={options.flycam}
              onCheckedChange={(checked) => onOptionsChange({ ...options, flycam: checked as boolean })}
            />
            <div className="flex-1">
              <Label htmlFor="flycam" className="flex items-center gap-2 text-base font-semibold cursor-pointer">
                <Camera size={20} className="text-primary" />
                Chụp ảnh & Quay video Flycam
              </Label>
              <p className="text-sm text-muted-foreground mt-1">
                Quay video và chụp ảnh chuyên nghiệp trong suốt chuyến bay
              </p>
              <p className="text-sm font-semibold text-primary mt-2">
                {formatVND(OPTION_PRICES.flycam)} / khách × {guestCount} ={" "}
                {formatVND(OPTION_PRICES.flycam * guestCount)}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 border rounded-lg hover:border-primary transition-colors">
            <Checkbox
              id="luggage"
              checked={options.luggage}
              onCheckedChange={(checked) => onOptionsChange({ ...options, luggage: checked as boolean })}
            />
            <div className="flex-1">
              <Label htmlFor="luggage" className="flex items-center gap-2 text-base font-semibold cursor-pointer">
                <Briefcase size={20} className="text-primary" />
                Hành lý & Thiết bị
              </Label>
              <p className="text-sm text-muted-foreground mt-1">Dịch vụ giữ hành lý và cho thuê thiết bị bảo hộ</p>
              <p className="text-sm font-semibold text-primary mt-2">
                {formatVND(OPTION_PRICES.luggage)} / khách × {guestCount} ={" "}
                {formatVND(OPTION_PRICES.luggage * guestCount)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-4">
        <Button onClick={onBack} variant="outline" size="lg" className="flex-1 bg-transparent">
          Quay lại
        </Button>
        <Button onClick={onNext} size="lg" className="flex-1">
          Tiếp tục
        </Button>
      </div>
    </div>
  )
}

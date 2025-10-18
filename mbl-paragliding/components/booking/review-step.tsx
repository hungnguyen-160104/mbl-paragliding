"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { BookingState } from "@/types/booking"
import { formatVND, OPTION_PRICES } from "@/lib/pricing"
import { Calendar, Clock, MapPin, User, Phone, Mail, Car, Camera, Briefcase, Tag } from "lucide-react"

interface ReviewStepProps {
  bookingState: BookingState
  onNext: () => void
  onBack: () => void
}

const timeSlotLabels = {
  morning: "Sáng (7:00 - 10:00)",
  afternoon: "Chiều (15:00 - 17:00)",
  evening: "Tối (17:00 - 19:00)",
}

export function ReviewStep({ bookingState, onNext, onBack }: ReviewStepProps) {
  const { guests, options, subtotal, discountAmount, total, discountCode } = bookingState

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Xem lại thông tin đặt tour</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Guest Information */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Thông tin khách hàng</h3>
            <div className="space-y-4">
              {guests.map((guest, index) => (
                <div key={guest.id} className="p-4 border rounded-lg space-y-3">
                  <h4 className="font-semibold text-primary">Khách {index + 1}</h4>
                  <div className="grid md:grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center gap-2">
                      <User size={16} className="text-muted-foreground" />
                      <span>{guest.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone size={16} className="text-muted-foreground" />
                      <span>{guest.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail size={16} className="text-muted-foreground" />
                      <span>{guest.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-muted-foreground" />
                      <span>{new Date(guest.date).toLocaleDateString("vi-VN")}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={16} className="text-muted-foreground" />
                      <span>{timeSlotLabels[guest.timeSlot]}</span>
                    </div>
                    {guest.pickup && (
                      <div className="flex items-center gap-2">
                        <MapPin size={16} className="text-muted-foreground" />
                        <span>{guest.pickup}</span>
                      </div>
                    )}
                  </div>
                  {guest.note && (
                    <div className="text-sm">
                      <span className="font-semibold">Ghi chú: </span>
                      <span className="text-muted-foreground">{guest.note}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Selected Options */}
          <div className="border-t pt-6">
            <h3 className="font-semibold text-lg mb-4">Dịch vụ đã chọn</h3>
            <div className="space-y-2">
              {options.transfer && (
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Car size={20} className="text-primary" />
                    <span>Dịch vụ đưa đón</span>
                  </div>
                  <span className="font-semibold">{formatVND(OPTION_PRICES.transfer)}</span>
                </div>
              )}
              {options.flycam && (
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Camera size={20} className="text-primary" />
                    <span>Chụp ảnh & Quay video Flycam</span>
                  </div>
                  <span className="font-semibold">{formatVND(OPTION_PRICES.flycam * guests.length)}</span>
                </div>
              )}
              {options.luggage && (
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Briefcase size={20} className="text-primary" />
                    <span>Hành lý & Thiết bị</span>
                  </div>
                  <span className="font-semibold">{formatVND(OPTION_PRICES.luggage * guests.length)}</span>
                </div>
              )}
              {!options.transfer && !options.flycam && !options.luggage && (
                <p className="text-muted-foreground text-sm">Không có dịch vụ thêm</p>
              )}
            </div>
          </div>

          {/* Price Summary */}
          <div className="border-t pt-6 space-y-3">
            <div className="flex justify-between text-lg">
              <span>Tạm tính:</span>
              <span className="font-semibold">{formatVND(subtotal)}</span>
            </div>
            {discountCode && discountAmount > 0 && (
              <div className="flex justify-between text-lg text-primary">
                <div className="flex items-center gap-2">
                  <Tag size={16} />
                  <span>Giảm giá ({discountCode.code}):</span>
                </div>
                <span className="font-semibold">-{formatVND(discountAmount)}</span>
              </div>
            )}
            <div className="flex justify-between text-2xl font-bold border-t pt-3">
              <span>Tổng cộng:</span>
              <span className="text-primary">{formatVND(total)}</span>
            </div>
            <p className="text-sm text-muted-foreground italic">
              * Đây là giá tạm tính. Giá cuối cùng sẽ được xác nhận khi liên hệ với chúng tôi.
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-4">
        <Button onClick={onBack} variant="outline" size="lg" className="flex-1 bg-transparent">
          Quay lại
        </Button>
        <Button onClick={onNext} size="lg" className="flex-1">
          Liên hệ để chốt lịch
        </Button>
      </div>
    </div>
  )
}

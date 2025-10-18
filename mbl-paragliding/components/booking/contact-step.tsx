"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import type { BookingState } from "@/types/booking"
import { formatVND } from "@/lib/pricing"
import { submitBookingToGoogleSheets } from "@/lib/google-sheets"
import { MessageCircle, Send, CheckCircle2 } from "lucide-react"

interface ContactStepProps {
  bookingState: BookingState
  onBack: () => void
}

const timeSlotLabels = {
  morning: "Sáng (7:00 - 10:00)",
  afternoon: "Chiều (15:00 - 17:00)",
  evening: "Tối (17:00 - 19:00)",
}

export function ContactStep({ bookingState, onBack }: ContactStepProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const { guests, options, total, discountCode } = bookingState

  const generateMessage = () => {
    const mainGuest = guests[0]
    const optionsList = []
    if (options.transfer) optionsList.push("Đưa đón")
    if (options.flycam) optionsList.push("Flycam")
    if (options.luggage) optionsList.push("Hành lý")

    return `[MBL BOOKING REQUEST]

Khách: ${mainGuest.name}
SĐT: ${mainGuest.phone}
Email: ${mainGuest.email}
Số khách: ${guests.length}
Ngày bay: ${new Date(mainGuest.date).toLocaleDateString("vi-VN")}
Khung giờ: ${timeSlotLabels[mainGuest.timeSlot]}
${mainGuest.pickup ? `Điểm đón: ${mainGuest.pickup}` : ""}
${optionsList.length > 0 ? `Dịch vụ thêm: ${optionsList.join(", ")}` : ""}
${discountCode ? `Mã giảm giá: ${discountCode.code}` : ""}
Giá tạm tính: ${formatVND(total)}
${mainGuest.note ? `Ghi chú: ${mainGuest.note}` : ""}

Vui lòng xác nhận lịch bay cho tôi. Cảm ơn!`
  }

  const handleContact = async (platform: "zalo" | "whatsapp" | "messenger") => {
    if (!submitted) {
      setIsSubmitting(true)
      await submitBookingToGoogleSheets(bookingState)
      setSubmitted(true)
      setIsSubmitting(false)
    }

    const message = generateMessage()
    const encodedMessage = encodeURIComponent(message)

    // Open contact platform
    let url = ""
    switch (platform) {
      case "zalo":
        url = `https://zalo.me/84123456789`
        break
      case "whatsapp":
        url = `https://wa.me/84123456789?text=${encodedMessage}`
        break
      case "messenger":
        url = `https://m.me/mblparagliding?text=${encodedMessage}`
        break
    }

    window.open(url, "_blank")
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Chọn kênh liên hệ</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {submitted && (
            <Alert className="border-primary bg-primary/10">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              <AlertDescription className="text-primary">
                Thông tin đặt tour đã được ghi nhận. Vui lòng chọn kênh liên hệ để chốt lịch bay.
              </AlertDescription>
            </Alert>
          )}

          <p className="text-muted-foreground">
            Chọn một trong các kênh dưới đây để liên hệ trực tiếp với chúng tôi. Thông tin đặt tour của bạn sẽ được gửi
            tự động.
          </p>

          <div className="space-y-4">
            <Button
              onClick={() => handleContact("zalo")}
              size="lg"
              className="w-full h-16 text-lg bg-[#0068FF] hover:bg-[#0052CC] text-white"
              disabled={isSubmitting}
            >
              <MessageCircle size={24} className="mr-3" />
              {isSubmitting ? "Đang xử lý..." : "Liên hệ qua Zalo"}
            </Button>

            <Button
              onClick={() => handleContact("whatsapp")}
              size="lg"
              className="w-full h-16 text-lg bg-[#25D366] hover:bg-[#1EBE57] text-white"
              disabled={isSubmitting}
            >
              <MessageCircle size={24} className="mr-3" />
              {isSubmitting ? "Đang xử lý..." : "Liên hệ qua WhatsApp"}
            </Button>

            <Button
              onClick={() => handleContact("messenger")}
              size="lg"
              className="w-full h-16 text-lg bg-[#0084FF] hover:bg-[#006FD6] text-white"
              disabled={isSubmitting}
            >
              <Send size={24} className="mr-3" />
              {isSubmitting ? "Đang xử lý..." : "Liên hệ qua Messenger"}
            </Button>
          </div>

          <div className="border-t pt-6">
            <h3 className="font-semibold mb-3">Nội dung tin nhắn sẽ được gửi:</h3>
            <div className="p-4 bg-muted rounded-lg">
              <pre className="text-sm whitespace-pre-wrap font-mono">{generateMessage()}</pre>
            </div>
          </div>
        </CardContent>
      </Card>

      <Button onClick={onBack} variant="outline" size="lg" className="w-full bg-transparent">
        Quay lại
      </Button>
    </div>
  )
}

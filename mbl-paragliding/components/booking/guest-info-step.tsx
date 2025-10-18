"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import type { GuestInfo } from "@/types/booking"

interface GuestInfoStepProps {
  guests: GuestInfo[]
  onGuestsChange: (guests: GuestInfo[]) => void
  onNext: () => void
  onBack: () => void
}

export function GuestInfoStep({ guests, onGuestsChange, onNext, onBack }: GuestInfoStepProps) {
  const handleGuestChange = (index: number, field: keyof GuestInfo, value: string) => {
    const updatedGuests = [...guests]
    updatedGuests[index] = { ...updatedGuests[index], [field]: value }
    onGuestsChange(updatedGuests)
  }

  const isValid = guests.every((guest) => guest.name && guest.phone && guest.email && guest.date && guest.timeSlot)

  return (
    <div className="space-y-6">
      {guests.map((guest, index) => (
        <Card key={guest.id}>
          <CardHeader>
            <CardTitle className="text-lg">Khách {index + 1}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor={`name-${index}`}>Họ và tên *</Label>
                <Input
                  id={`name-${index}`}
                  value={guest.name}
                  onChange={(e) => handleGuestChange(index, "name", e.target.value)}
                  placeholder="Nguyễn Văn A"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`phone-${index}`}>Số điện thoại *</Label>
                <Input
                  id={`phone-${index}`}
                  type="tel"
                  value={guest.phone}
                  onChange={(e) => handleGuestChange(index, "phone", e.target.value)}
                  placeholder="+84 123 456 789"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`email-${index}`}>Email *</Label>
                <Input
                  id={`email-${index}`}
                  type="email"
                  value={guest.email}
                  onChange={(e) => handleGuestChange(index, "email", e.target.value)}
                  placeholder="email@example.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`date-${index}`}>Ngày bay *</Label>
                <Input
                  id={`date-${index}`}
                  type="date"
                  value={guest.date}
                  onChange={(e) => handleGuestChange(index, "date", e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`timeSlot-${index}`}>Khung giờ *</Label>
                <Select value={guest.timeSlot} onValueChange={(value) => handleGuestChange(index, "timeSlot", value)}>
                  <SelectTrigger id={`timeSlot-${index}`}>
                    <SelectValue placeholder="Chọn khung giờ" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="morning">Sáng (7:00 - 10:00)</SelectItem>
                    <SelectItem value="afternoon">Chiều (15:00 - 17:00)</SelectItem>
                    <SelectItem value="evening">Tối (17:00 - 19:00)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor={`pickup-${index}`}>Điểm đón (tùy chọn)</Label>
                <Input
                  id={`pickup-${index}`}
                  value={guest.pickup || ""}
                  onChange={(e) => handleGuestChange(index, "pickup", e.target.value)}
                  placeholder="Địa chỉ khách sạn"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor={`note-${index}`}>Ghi chú (tùy chọn)</Label>
              <Textarea
                id={`note-${index}`}
                value={guest.note || ""}
                onChange={(e) => handleGuestChange(index, "note", e.target.value)}
                placeholder="Yêu cầu đặc biệt, tình trạng sức khỏe..."
                rows={3}
              />
            </div>
          </CardContent>
        </Card>
      ))}

      <div className="flex gap-4">
        <Button onClick={onBack} variant="outline" size="lg" className="flex-1 bg-transparent">
          Quay lại
        </Button>
        <Button onClick={onNext} size="lg" className="flex-1" disabled={!isValid}>
          Tiếp tục
        </Button>
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import type { DiscountCode } from "@/types/booking"
import { DISCOUNT_CODES, formatVND } from "@/lib/pricing"
import { Tag, CheckCircle2, XCircle } from "lucide-react"

interface DiscountStepProps {
  discountCode?: DiscountCode
  subtotal: number
  discountAmount: number
  total: number
  onDiscountApply: (code?: DiscountCode) => void
  onNext: () => void
  onBack: () => void
}

export function DiscountStep({
  discountCode,
  subtotal,
  discountAmount,
  total,
  onDiscountApply,
  onNext,
  onBack,
}: DiscountStepProps) {
  const [codeInput, setCodeInput] = useState(discountCode?.code || "")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const handleApply = () => {
    const code = codeInput.trim().toUpperCase()
    if (!code) {
      onDiscountApply(undefined)
      setError("")
      setSuccess(false)
      return
    }

    const foundCode = DISCOUNT_CODES[code]
    if (foundCode) {
      onDiscountApply(foundCode)
      setError("")
      setSuccess(true)
    } else {
      setError("Mã giảm giá không hợp lệ")
      setSuccess(false)
    }
  }

  const handleRemove = () => {
    setCodeInput("")
    onDiscountApply(undefined)
    setError("")
    setSuccess(false)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Tag className="text-primary" />
            Mã giảm giá
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="discount-code">Nhập mã giảm giá (nếu có)</Label>
              <div className="flex gap-2">
                <Input
                  id="discount-code"
                  value={codeInput}
                  onChange={(e) => {
                    setCodeInput(e.target.value.toUpperCase())
                    setError("")
                    setSuccess(false)
                  }}
                  placeholder="VD: WELCOME10"
                  className="flex-1"
                />
                <Button onClick={handleApply} variant="outline">
                  Áp dụng
                </Button>
                {discountCode && (
                  <Button onClick={handleRemove} variant="outline">
                    Xóa
                  </Button>
                )}
              </div>
            </div>

            {error && (
              <Alert variant="destructive">
                <XCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {success && discountCode && (
              <Alert className="border-primary bg-primary/10">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <AlertDescription className="text-primary">
                  Mã giảm giá đã được áp dụng thành công!{" "}
                  {discountCode.type === "percent"
                    ? `Giảm ${discountCode.value}%`
                    : `Giảm ${formatVND(discountCode.value)}`}
                </AlertDescription>
              </Alert>
            )}
          </div>

          <div className="border-t pt-6 space-y-3">
            <h3 className="font-semibold mb-4">Mã giảm giá khả dụng</h3>
            <div className="space-y-2">
              {Object.values(DISCOUNT_CODES).map((code) => (
                <div
                  key={code.code}
                  className="flex items-center justify-between p-3 border rounded-lg hover:border-primary transition-colors cursor-pointer"
                  onClick={() => {
                    setCodeInput(code.code)
                    onDiscountApply(code)
                    setSuccess(true)
                    setError("")
                  }}
                >
                  <div>
                    <p className="font-semibold text-primary">{code.code}</p>
                    <p className="text-sm text-muted-foreground">
                      {code.type === "percent" ? `Giảm ${code.value}%` : `Giảm ${formatVND(code.value)}`}
                    </p>
                  </div>
                  <Button variant="ghost" size="sm">
                    Áp dụng
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t pt-6 space-y-3">
            <div className="flex justify-between text-lg">
              <span>Tạm tính:</span>
              <span className="font-semibold">{formatVND(subtotal)}</span>
            </div>
            {discountAmount > 0 && (
              <div className="flex justify-between text-lg text-primary">
                <span>Giảm giá:</span>
                <span className="font-semibold">-{formatVND(discountAmount)}</span>
              </div>
            )}
            <div className="flex justify-between text-2xl font-bold border-t pt-3">
              <span>Tổng cộng:</span>
              <span className="text-primary">{formatVND(total)}</span>
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

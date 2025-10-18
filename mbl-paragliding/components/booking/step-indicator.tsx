interface StepIndicatorProps {
  currentStep: number
  totalSteps: number
}

const steps = ["Số khách", "Thông tin", "Dịch vụ thêm", "Mã giảm giá", "Xem lại", "Liên hệ"]

export function StepIndicator({ currentStep, totalSteps }: StepIndicatorProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        {steps.slice(0, totalSteps).map((step, index) => (
          <div key={index} className="flex items-center flex-1">
            <div className="flex flex-col items-center flex-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
                  index + 1 <= currentStep ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}
              >
                {index + 1}
              </div>
              <div className="text-xs mt-2 text-center hidden sm:block">{step}</div>
            </div>
            {index < totalSteps - 1 && (
              <div
                className={`h-1 flex-1 mx-2 transition-colors ${index + 1 < currentStep ? "bg-primary" : "bg-muted"}`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

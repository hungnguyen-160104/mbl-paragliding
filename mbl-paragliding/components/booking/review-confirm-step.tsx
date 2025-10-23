"use client";
import React, { useState } from "react";
import { useBookingStore } from "@/store/booking-store";
import { computePrice, formatVND, LOCATIONS } from "@/lib/booking/calculate-price";
import { postBookingToSheet } from "@/lib/booking/send-to-sheet";
import { notifyAdminByEmail } from "@/lib/booking/send-email";

export default function ReviewConfirmStep() {
  const data = useBookingStore((s) => s.data);
  const update = useBookingStore((s) => s.update);
  const back = useBookingStore((s) => s.back);
  const next = useBookingStore((s) => s.next);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string|undefined>();

  const cfg = LOCATIONS[data.location];
  const bill = computePrice({ location: data.location, guestsCount: data.guestsCount, dateISO: data.dateISO, addons: data.addons });

  const handleConfirm = async () => {
    setSubmitting(true);
    setError(undefined);
    try {
      const payload = {
        ...data,
        locationName: cfg.name,
        price: bill,
        createdAt: new Date().toISOString(),
      };
      const toSheet = await postBookingToSheet(payload);
      const toEmail = await notifyAdminByEmail(payload);
      if (!toSheet.ok && !toEmail.ok) {
        setError(toSheet.message || toEmail.message || "Không thể gửi thông tin. Vui lòng thử lại.");
        setSubmitting(false);
        return;
      }
      next();
    } catch (e: any) {
      setError(e?.message || "Có lỗi xảy ra");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Vui lòng kiểm tra lại thông tin đặt bay</h3>

      <div className="rounded-2xl border p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div><span className="font-medium">Ngày bay: </span>{data.dateISO}</div>
          <div><span className="font-medium">Khung giờ: </span>{data.timeSlot}</div>
          <div><span className="font-medium">Điểm bay: </span>{cfg.name}</div>
          <div><span className="font-medium">Số khách: </span>{data.guestsCount}</div>
        </div>
      </div>

      <div className="rounded-2xl border p-4">
        <h4 className="font-semibold">Thông tin liên hệ</h4>
        <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div><span className="font-medium">SĐT: </span>{data.contact?.phone}</div>
          <div><span className="font-medium">Email: </span>{data.contact?.email}</div>
          {data.addons.pickup && data.contact?.pickupLocation && (
            <div className="md:col-span-2"><span className="font-medium">Điểm đón: </span>{data.contact?.pickupLocation}</div>
          )}
          {data.contact?.specialRequest && (
            <div className="md:col-span-2"><span className="font-medium">Yêu cầu đặc biệt: </span>{data.contact?.specialRequest}</div>
          )}
        </div>
      </div>

      <div className="rounded-2xl border p-4">
        <h4 className="font-semibold">Danh sách khách</h4>
        <div className="mt-2 space-y-2 text-sm">
          {data.guests.map((g, i) => (
            <div key={i} className="rounded-lg border p-3">
              <div><span className="font-medium">Khách {i + 1}:</span> {g.fullName}</div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-neutral-700">
                <div>Ngày sinh: {g.dob}</div>
                <div>Giới tính: {g.gender}</div>
                {g.idNumber ? <div>CCCD/Passport: {g.idNumber}</div> : null}
                {g.weightKg ? <div>Cân nặng: {g.weightKg} kg</div> : null}
                {g.nationality ? <div>Quốc tịch: {g.nationality}</div> : null}
              </div>
            </div>
          ))}
        </div>
      </div>

      <label className="flex items-start gap-3">
        <input
          type="checkbox"
          checked={data.acceptedTerms}
          onChange={(e) => update({ acceptedTerms: e.target.checked })}
          className="mt-1 h-4 w-4"
        />
        <span className="text-sm">
          Tôi đã đọc và đồng ý với mọi điều khoản dịch vụ. Tôi xác nhận thông tin đặt bay.
          {" "}
          <a className="text-blue-600 underline" href="/terms" target="_blank" rel="noreferrer">Xem điều khoản</a>
        </span>
      </label>

      {error && <div className="text-sm text-red-600">{error}</div>}

      <div className="flex justify-between">
        <button onClick={back} className="px-4 py-2 rounded-xl border">Quay lại</button>
        <button
          disabled={!data.acceptedTerms || submitting}
          onClick={handleConfirm}
          className="px-5 py-2 rounded-xl bg-green-600 text-white hover:bg-green-700 disabled:opacity-50"
        >
          {submitting ? "Đang gửi..." : "Xác nhận"}
        </button>
      </div>
    </div>
  );
}

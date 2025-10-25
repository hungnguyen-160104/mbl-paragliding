// Tính giá & khuyến mãi nhóm
// Ghi chú: Giá/khuyến mãi được cấu hình theo từng điểm bay.
// Một số điểm áp dụng giá cuối tuần khác giá ngày thường.

export type LocationKey = "sapa" | "khau_pha" | "da_nang" | "ha_noi";

export type AddonKey = "pickup" | "flycam" | "camera360";

export interface DiscountTier {
  minPersons: number; // ngưỡng số người
  offPerPersonVND: number; // giảm / khách
}

export interface AddonConfig {
  pricePerPersonVND: number | null; // null = không cung cấp dịch vụ
  label: string;
}

export interface LocationConfig {
  key: LocationKey;
  name: string;
  // basePriceVND có thể phụ thuộc ngày (ví dụ cuối tuần)
  basePriceVND: (dateISO?: string) => number;
  addons: Record<AddonKey, AddonConfig>;
  discountTiers: DiscountTier[];
  included: string[]; // mô tả dịch vụ đã bao gồm
  excluded?: string[]; // mô tả không bao gồm
  coordinates?: { takeoff?: string; landing?: string; pickup?: string };
  managerEmail?: string; // email quản lý nhận thông báo
}

const VN = (n: number) => new Intl.NumberFormat("vi-VN").format(n);

const isWeekend = (iso?: string) => {
  if (!iso) return false;
  const d = new Date(iso);
  const day = d.getUTCDay?.() ?? d.getDay();
  return day === 0 || day === 6;
};

export const LOCATIONS: Record<LocationKey, LocationConfig> = {
  sapa: {
    key: "sapa",
    name: "Lào Cai (Sapa)",
    basePriceVND: () => 2_190_000,
    addons: {
      pickup: { pricePerPersonVND: 100_000, label: "Xe đón trả (nội vùng Sapa)" },
      flycam: { pricePerPersonVND: 300_000, label: "Flycam (Drone camera)" },
      camera360: { pricePerPersonVND: 500_000, label: "Camera toàn cảnh 360" },
    },
    discountTiers: [
      { minPersons: 6, offPerPersonVND: 150_000 },
      { minPersons: 4, offPerPersonVND: 100_000 },
      { minPersons: 3, offPerPersonVND: 70_000 },
      { minPersons: 2, offPerPersonVND: 50_000 },
    ],
    included: [
      "01 chuyến bay dù lượn 8-15 phút (tuỳ gió)",
      "Quay phim & chụp hình từ GoPro",
      "Menu đồ uống (cà phê & trà tại điểm bay)",
      "Bảo hiểm dù lượn",
      "Giấy chứng nhận",
    ],
    coordinates: {
      takeoff: "https://maps.app.goo.gl/bGtKFTuxyZvJhsJZ9",
      landing: "https://maps.app.goo.gl/mYnh4KJVk3aQZLYC6",
    },
    managerEmail: "sapa.paragliding@gmail.com",
  },
  khau_pha: {
    key: "khau_pha",
    name: "Yên Bái (Đèo Khau Phạ - Mù Cang Chải)",
    basePriceVND: (iso) => (isWeekend(iso) ? 2_590_000 : 2_190_000),
    addons: {
      pickup: { pricePerPersonVND: null, label: "Đưa đón (không cung cấp)" },
      flycam: { pricePerPersonVND: 300_000, label: "Flycam (Drone camera)" },
      camera360: { pricePerPersonVND: 500_000, label: "Camera toàn cảnh 360" },
    },
    discountTiers: [
      { minPersons: 4, offPerPersonVND: 100_000 },
      { minPersons: 3, offPerPersonVND: 70_000 },
      { minPersons: 2, offPerPersonVND: 50_000 },
    ],
    included: [
      "01 chuyến bay dù lượn 8-15 phút (tuỳ gió)",
      "Quay phim & chụp hình từ GoPro",
      "Menu đồ uống (cà phê, trà tại điểm bay)",
      "Bảo hiểm dù lượn",
      "Giấy chứng nhận",
      "Xe lên/xuống núi",
      "Quà lưu niệm",
    ],
    coordinates: {
      takeoff: "https://maps.app.goo.gl/Z9X6BnNV4eaUKTE29",
      landing: "https://maps.app.goo.gl/QJWD6Em4b9RYYQMc8",
    },
    managerEmail: "mebayluon@gmail.com",
  },
  da_nang: {
    key: "da_nang",
    name: "Đà Nẵng (Bán đảo Sơn Trà)",
    basePriceVND: () => 1_790_000,
    addons: {
      pickup: { pricePerPersonVND: null, label: "Đưa đón (tự túc)" },
      flycam: { pricePerPersonVND: 300_000, label: "Flycam (Drone camera)" },
      camera360: { pricePerPersonVND: 500_000, label: "Camera toàn cảnh 360" },
    },
    discountTiers: [
      { minPersons: 4, offPerPersonVND: 100_000 },
      { minPersons: 3, offPerPersonVND: 70_000 },
      { minPersons: 2, offPerPersonVND: 50_000 },
    ],
    included: [
      "01 chuyến bay dù lượn 8-15 phút (tuỳ gió)",
      "Quay phim & chụp hình từ GoPro",
      "Nước uống",
      "Bảo hiểm dù lượn",
      "Giấy chứng nhận",
      "Xe lên/xuống núi",
    ],
    excluded: ["Bữa ăn", "Đưa đón từ trung tâm thành phố"],
    coordinates: {
      takeoff: "https://maps.app.goo.gl/6NDgTSg8PZb5BtGX8",
      landing: "https://maps.app.goo.gl/ETF9PiL4ijd5hYKQ6",
    },
    managerEmail: "mebayluon@gmail.com",
  },
  ha_noi: {
    key: "ha_noi",
    name: "Hà Nội (Đồi Bù / Viên Nam)",
    basePriceVND: () => 1_850_000,
    addons: {
      pickup: { pricePerPersonVND: 200_000, label: "Xe đón/trả 2 chiều từ Trần Duy Hưng" },
      flycam: { pricePerPersonVND: null, label: "Flycam (không cung cấp)" },
      camera360: { pricePerPersonVND: 500_000, label: "Camera 360" },
    },
    discountTiers: [
      { minPersons: 4, offPerPersonVND: 100_000 },
      { minPersons: 3, offPerPersonVND: 70_000 },
      { minPersons: 2, offPerPersonVND: 50_000 },
    ],
    included: [
      "01 chuyến bay dù lượn 8-20 phút (tuỳ gió)",
      "Quay phim & chụp hình từ GoPro",
      "Nước uống",
      "Bảo hiểm dù lượn",
      "Giấy chứng nhận",
      "Xe lên/xuống núi",
    ],
    excluded: ["Bữa ăn", "Flycam"],
    coordinates: {
      takeoff: "https://maps.app.goo.gl/RxfRus3UfSz2m4nP6",
      pickup: "https://maps.app.goo.gl/3vB2qYuThwBASQZj8",
    },
    managerEmail: "mebayluon@gmail.com",
  },
};

export interface BookingComputationInput {
  location: LocationKey;
  guestsCount: number;
  dateISO?: string;
  addons: { pickup?: boolean; flycam?: boolean; camera360?: boolean };
}

export interface BookingComputation {
  basePricePerPerson: number;
  discountPerPerson: number;
  addonsPerPerson: Record<AddonKey, number>;
  totalBeforeDiscount: number;
  totalDiscount: number;
  totalAfterDiscount: number;
}

export function computePrice(input: BookingComputationInput): BookingComputation {
  const cfg = LOCATIONS[input.location];
  const guests = Math.max(1, input.guestsCount || 1);
  const base = cfg.basePriceVND(input.dateISO);
  // discount: lấy ngưỡng cao nhất đạt được
  const tier = cfg.discountTiers.find((t) => guests >= t.minPersons) ?? { offPerPersonVND: 0, minPersons: 0 };
  const discountPerPerson = tier.offPerPersonVND || 0;

  const addonsPerPerson: Record<AddonKey, number> = { pickup: 0, flycam: 0, camera360: 0 };
  (Object.keys(addonsPerPerson) as AddonKey[]).forEach((k) => {
    const selected = (input.addons as any)[k];
    const price = cfg.addons[k].pricePerPersonVND;
    addonsPerPerson[k] = selected && price ? price : 0;
  });

  const addonsSumPerPerson = Object.values(addonsPerPerson).reduce((a, b) => a + b, 0);
  const totalBeforeDiscount = guests * (base + addonsSumPerPerson);
  const totalDiscount = guests * discountPerPerson;
  const totalAfterDiscount = totalBeforeDiscount - totalDiscount;

  return {
    basePricePerPerson: base,
    discountPerPerson,
    addonsPerPerson,
    totalBeforeDiscount,
    totalDiscount,
    totalAfterDiscount,
  };
}

// Helpers
export function formatVND(n: number) {
  return VN(n) + "₫";
}

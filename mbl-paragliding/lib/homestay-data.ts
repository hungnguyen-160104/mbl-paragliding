export interface RoomType {
  id: string
  nameKey: string
  price: number
  priceType: "per-guest" | "per-room" | "whole-home"
  capacity: {
    adults: number
    children?: number
  }
  image: string
  features: string[]
  description: string
}

export const roomTypes: RoomType[] = [
  {
    id: "single-room",
    nameKey: "singleRoom",
    price: 350000,
    priceType: "per-guest",
    capacity: {
      adults: 1,
      children: 1,
    },
    image: "/homestay/phong-don.jpg",
    features: ["breakfast", "wifi", "view", "handmade-tea"],
    description: "Có 2 phòng, tối đa 1 người lớn và 1 trẻ em dưới 5 tuổi, gồm 1 đệm đơn",
  },
  {
    id: "couple-attic",
    nameKey: "coupleAttic",
    price: 200000,
    priceType: "per-guest",
    capacity: {
      adults: 2,
      children: 2,
    },
    image: "/homestay/ap-mai.jpg",
    features: ["breakfast", "wifi", "attic-view", "handmade-tea"],
    description: "1 phòng áp mái lớn duy nhất, tối đa 2 người lớn và 2 trẻ em dưới 5 tuổi",
  },
  {
    id: "double-room",
    nameKey: "doubleRoom",
    price: 650000,
    priceType: "per-room",
    capacity: {
      adults: 4,
      children: 2,
    },
    image: "/homestay/phong-doi.jpg",
    features: ["breakfast", "wifi", "mountain-view", "family-friendly"],
    description: "2 Phòng lớn, tối đa 1 gia đình nhỏ (2 người lớn và 2 trẻ em dưới 5 tuổi) 1 đệm đôi lớn, view suối",
  },
  {
    id: "dormitory",
    nameKey: "dormitory",
    price: 180000,
    priceType: "per-guest",
    capacity: {
      adults: 20,
    },
    image: "/homestay/phong-cong-dong.jpg",
    features: ["breakfast", "wifi", "shared-space", "budget-friendly"],
    description: "1 phòng lớn - ở tối đa 20 đệm đơn/sàn",
  },
  {
    id: "whole-home-small",
    nameKey: "wholeHomeSmall",
    price: 2000000,
    priceType: "whole-home",
    capacity: {
      adults: 25,
    },
    image: "/homestay/nguyen-san.png",
    features: ["exclusive-use", "all-facilities", "group-friendly", "breakfast"],
    description:
      "Khách được sử dụng toàn bộ phần sàn công đồng, bao gồm các phòng áp mái. Ở tối đa 25 khách/sàn. Miễn phí trẻ em dưới 5 tuổi.",
  },
  {
    id: "whole-home-large",
    nameKey: "wholeHomeLarge",
    price: 4500000,
    priceType: "whole-home",
    capacity: {
      adults: 35,
    },
    image: "/homestay/nguyen-can.jpg",
    features: ["exclusive-use", "all-facilities", "large-group", "breakfast"],
    description:
      "Khách được sử dụng toàn bộ phần sàn công đồng, phòng đôi, đơn, các phòng áp mái. Ở tối đa 35 khách. Miễn phí trẻ em dưới 5 tuổi.",
  },
]

export interface MenuItem {
  category: string
  items: {
    name: string
    price: number
    unit?: string
  }[]
}

export const menuItems: MenuItem[] = [
  {
    category: "drinks",
    items: [
      { name: "Cà phê", price: 35000 },
      { name: "Trà", price: 30000 },
      { name: "Nước chanh", price: 25000 },
      { name: "Sinh tố", price: 40000 },
      { name: "Bia", price: 20000 },
      { name: "Nước ngọt", price: 15000 },
    ],
  },
  {
    category: "alcohol",
    items: [
      { name: "Rượu cắm", price: 100000, unit: "/lít" },
      { name: "Cẩm tú lệ", price: 80000, unit: "/lít" },
      { name: "Rượu mơ", price: 120000, unit: "/lít" },
    ],
  },
  {
    category: "food",
    items: [
      { name: "Cơm/mì tôm", price: 0 },
      { name: "Bò/gà/lợn", price: 0 },
      { name: "Cá hồi tươi sống", price: 0 },
      { name: "Cá tầm tươi sống", price: 0 },
      { name: "Các món lẩu/BBQ", price: 0 },
    ],
  },
]

export const amenities = [
  "free-handmade-tea",
  "free-parking",
  "free-wifi",
  "shared-bathroom",
  "bbq-area",
  "campfire",
  "karaoke",
  "swimming-pool",
  "camping-area",
  "team-building-space",
  "trekking-tours",
  "paragliding",
  "flycam-service",
]

export const locationInfo = {
  address: "Bản Lim Mông, Xã Cao Phạ, Huyện Mù Cang Chải, Tỉnh Yên Bái",
  distanceFromHanoi: "250km",
  travelTime: "5 giờ",
  nearbyAttractions: [
    { name: "Đèo Khau Phạ", distance: "40km" },
    { name: "Suối khoáng nóng", distance: "7 phút đi xe" },
    { name: "Ruộng bậc thang Mù Cang Chải", distance: "Ngay tại chỗ" },
  ],
}

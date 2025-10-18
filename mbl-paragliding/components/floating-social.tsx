"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import Image from "next/image"

export function FloatingSocial() {
  const socialLinks = [
    {
      name: "Facebook",
      iconSrc: "/social_icons/facebook.jpg",
      url: "https://www.facebook.com/mebayluon",
      color: "bg-[#1877F2] hover:bg-[#1877F2]/90", // Giữ màu nền cho button Facebook
      iconSize: 28 // Kích thước icon bên trong button
    },
    {
      name: "YouTube",
      iconSrc: "/social_icons/youtube.png",
      url: "https://www.youtube.com/@dangvm",
      color: "bg-[#FF0000] hover:bg-[#FF0000]/90", // Giữ màu nền cho button YouTube
      iconSize: 28
    },
    {
      name: "Zalo",
      iconSrc: "/social_icons/zalo.jpg",
      url: "https://zalo.me/0964073555",
      // KHÔNG CÓ THUỘC TÍNH 'color' NẾU BẠN MUỐN DÙNG NỀN TRẮNG CỦA ẢNH GỐC HOẶC ẢNH ĐÃ CÓ NỀN.
      // NẾU MUỐN MÀU NỀN CỦA BUTTON THÌ DÙNG 'color: "bg-[#0068FF] hover:bg-[#0068FF]/90"', VÀ DÙNG ẢNH TRONG SUỐT (.PNG)
      color: "bg-[#0068FF] hover:bg-[#0068FF]/90", // GIỮ LẠI MÀU NỀN CHO BUTTON ZALO NHƯ ẢNH MẪU
      iconSize: 32 // Icon Zalo có vẻ cần lớn hơn chút
    },
    {
      name: "WhatsApp",
      iconSrc: "/social_icons/whatsapp.jpg",
      url: "https://api.whatsapp.com/send/?phone=840964073555",
      color: "bg-[#25D366] hover:bg-[#25D366]/90", // Giữ màu nền cho button WhatsApp
      iconSize: 28
    },
    {
      name: "TikTok",
      iconSrc: "/social_icons/tiktok.jpg",
      url: "https://www.tiktok.com/@mebayluon_paragliding",
      color: "bg-black hover:bg-black/90", // Giữ màu nền cho button TikTok
      iconSize: 28
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 1 }}
      className="fixed right-6 bottom-6 z-50 flex flex-col gap-3"
    >
      {socialLinks.map((social, index) => (
        <motion.div
          key={social.name}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 1 + index * 0.1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            size="icon"
            className={`w-12 h-12 rounded-full shadow-lg ${social.color} flex items-center justify-center`} // Xóa padding, dùng flex để căn giữa
            onClick={() => window.open(social.url, "_blank")}
            title={social.name}
          >
            <Image
              src={social.iconSrc}
              alt={social.name}
              // Dùng kích thước iconSize đã định nghĩa hoặc 28 mặc định
              width={social.iconSize || 28} 
              height={social.iconSize || 28} 
              // Đảm bảo ảnh vừa vặn và không bị kéo dãn
              className="object-contain rounded-full" // Thêm rounded-full cho ảnh
            />
          </Button>
        </motion.div>
      ))}
    </motion.div>
  )
}
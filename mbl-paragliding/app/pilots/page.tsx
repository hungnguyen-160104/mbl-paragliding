"use client";

import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/language-context";
import { pilots } from "@/lib/pilots-data";
import Link from "next/link";
import { motion } from "framer-motion";
import { Phone } from "lucide-react";

type SafetyCopy = { title: string; items: { title: string; desc: string }[] };
const SAFETY_FALLBACK: Record<"vi" | "en" | "fr" | "ru", SafetyCopy> = {
  vi: {
    title: "Cam kết an toàn",
    items: [
      { title: "Đào tạo chuyên nghiệp", desc: "Tất cả phi công đều trải qua khóa đào tạo nghiêm ngặt và cập nhật kỹ năng thường xuyên." },
      { title: "Thiết bị chuẩn quốc tế", desc: "Sử dụng dù và thiết bị từ các thương hiệu hàng đầu, được kiểm tra định kỳ." },
      { title: "Bảo hiểm toàn diện", desc: "Mọi chuyến bay đều được bảo hiểm, đảm bảo an tâm tuyệt đối." },
    ],
  },
  en: {
    title: "Safety Commitment",
    items: [
      { title: "Professional training", desc: "All pilots complete rigorous training and frequent refreshers." },
      { title: "International-grade gear", desc: "Top brands, regularly inspected and maintained." },
      { title: "Comprehensive insurance", desc: "Every flight is insured for complete peace of mind." },
    ],
  },
  fr: {
    title: "Engagement sécurité",
    items: [
      { title: "Formation professionnelle", desc: "Programme rigoureux et remises à niveau régulières." },
      { title: "Équipement aux normes internationales", desc: "Marques de premier plan, contrôles périodiques." },
      { title: "Assurance complète", desc: "Chaque vol est assuré pour une sérénité totale." },
    ],
  },
  ru: {
    title: "Гарантия безопасности",
    items: [
      { title: "Профессиональная подготовка", desc: "Строгое обучение и регулярное повышение квалификации." },
      { title: "Оборудование международного уровня", desc: "Лучшие бренды, регулярные проверки и обслуживание." },
      { title: "Полное страхование", desc: "Каждый полёт застрахован — абсолютное спокойствие." },
    ],
  },
};

export default function PilotsPage() {
  const { t, language } = useLanguage();
  const P = t.pilots; // nhóm pilots trong translations.ts

  // Fallback an toàn nếu chưa có trong translations
  const safety: SafetyCopy = (P as any)?.safety ?? SAFETY_FALLBACK[language as keyof typeof SAFETY_FALLBACK];

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center mt-16">
        <div
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: "url(/dalat-city-pine-forests-aerial-view-vietnam.jpg)" }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 font-serif">
            {P?.title ?? (language === "vi" ? "Đội ngũ phi công" : language === "fr" ? "Nos Pilotes" : language === "ru" ? "Наши Пилоты" : "Our Pilots")}
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto text-balance">
            {P?.subtitle ??
              (language === "vi"
                ? "Gặp gỡ những phi công chuyên nghiệp sẽ đồng hành cùng bạn trên bầu trời"
                : language === "fr"
                ? "Rencontrez les pilotes professionnels qui vous accompagneront dans le ciel"
                : language === "ru"
                ? "Познакомьтесь с профессиональными пилотами, которые будут сопровождать вас в небе"
                : "Meet the professional pilots who will accompany you in the sky")}
          </p>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl font-bold font-serif">
              {P?.intro?.title ??
                (language === "vi"
                  ? "Chuyên nghiệp - An toàn - Tận tâm"
                  : language === "fr"
                  ? "Professionnel - Sûr - Dévoué"
                  : language === "ru"
                  ? "Профессионально — Безопасно — С заботой"
                  : "Professional - Safe - Dedicated")}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {P?.intro?.description ??
                (language === "vi"
                  ? "Tất cả phi công của chúng tôi đều được đào tạo bài bản theo tiêu chuẩn quốc tế, có chứng chỉ IPPI và nhiều năm kinh nghiệm bay."
                  : language === "fr"
                  ? "Tous nos pilotes sont formés selon les normes internationales, certifiés IPPI et expérimentés."
                  : language === "ru"
                  ? "Все наши пилоты обучены по международным стандартам, имеют сертификаты IPPI и большой опыт."
                  : "All our pilots are trained to international standards, hold IPPI certificates, and have years of experience.")}
            </p>
          </div>
        </div>
      </section>

      {/* Pilots Grid */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pilots.map((pilot, index) => (
              <motion.div
                key={pilot.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <Link href={`/pilots/${pilot.slug}`} aria-label={`${P?.viewProfile ?? "View Profile"}: ${pilot.name}`}>
                  <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group h-full">
                    <div className="relative h-80 overflow-hidden">
                      <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                        style={{ backgroundImage: `url(${pilot.avatar})` }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <h3 className="text-2xl font-bold mb-1">{pilot.name}</h3>
                        {pilot.nickname && <p className="text-sm opacity-90 mb-2">{pilot.nickname}</p>}
                        <p className="text-primary-foreground/90 font-medium">{pilot.role}</p>
                      </div>
                    </div>

                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="secondary" className="text-xs">
                            {pilot.experience}
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            {pilot.flights}
                          </Badge>
                        </div>

                        {pilot.phone && (
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Phone className="h-4 w-4" />
                            <span>{pilot.phone}</span>
                          </div>
                        )}

                        <Button className="w-full bg-transparent" variant="outline">
                          {P?.viewProfile ?? "View Profile"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Safety Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="text-4xl font-bold mb-8 font-serif">{safety.title}</h2>
            <div className="grid md:grid-cols-3 gap-8 text-left">
              {safety.items.map((s, i) => (
                <div key={i} className="space-y-3">
                  <h3 className="text-xl font-semibold">{s.title}</h3>
                  <p className="text-muted-foreground">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

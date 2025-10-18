"use client";

import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Wind, Shield, Award, Users, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { useLanguage } from "@/contexts/language-context";

const flyingSpots = [
  { nameKey: "muongHoaSapa", slug: "muong-hoa-sapa", locationKey: "saPa", price: 2190000, image: "/muong-hoa-sapa.jpg" },
  { nameKey: "sonTra",       slug: "son-tra",        locationKey: "daNang", price: 1790000, image: "/son-tra-da-nang.jpg" },
  { nameKey: "khauPha",      slug: "khau-pha",       locationKey: "yenBai", price: 2190000, image: "/mu-cang-chai-yen-bai-1.jpg" },
  { nameKey: "tramTau",      slug: "tram-tau",       locationKey: "yenBaiTramTau", price: 2000000, image: "/tram-tau-yen-bai.jpg" },
  { nameKey: "vienNam",      slug: "vien-nam",       locationKey: "hoaBinh", price: 1690000, image: "/vien-nam-hoa-binh.jpg" },
  { nameKey: "doiBu",        slug: "doi-bu",         locationKey: "haNoi",  price: 1690000, image: "/doi-bu-chuong-my.jpg" },
];

export default function HomePage() {
  const [hoveredSpot, setHoveredSpot] = useState<number | null>(null);
  const { t } = useLanguage();

  const locations = (t as any)?.spots?.locations ?? {};

  return (
    <main 
        className="min-h-screen relative bg-cover bg-center bg-fixed text-foreground" 
        style={{ backgroundImage: "url(/hinh-nen.jpg)" }}
    >
      <div className="absolute inset-0 bg-black/20 z-0" />

      {/* HERO SECTION */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden z-10">
        <motion.div 
            className="container mx-auto px-4 text-center text-white" 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 1, delay: 0.3 }}
        >
          <h1 className="text-6xl md:text-8xl font-bold mb-6 font-serif">{t.hero.title}</h1>
          <p className="text-2xl md:text-3xl mb-4 font-light">{t.hero.subtitle}</p>
          <p className="text-lg md:text-xl mb-10 max-w-3xl mx-auto opacity-90">{t.hero.description}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-lg bg-accent hover:bg-accent/90 h-14 px-8">
              <Link href="/booking">{t.hero.bookNow}</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-lg bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white hover:text-foreground h-14 px-8">
              <Link href="/about">{t.hero.learnMore}</Link>
            </Button>
          </div>
        </motion.div>

        <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2" animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-white/50 rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* SPOTS SECTION */}
      <section className="relative z-10 py-24" id="flying-spots">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.6 }} 
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-white">{t.spots.title}</h2>
            <p className="text-xl text-slate-100 max-w-2xl mx-auto">{t.spots.subtitle}</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {flyingSpots.map((spot, index) => {
              const spotData = locations[spot.nameKey] ?? {
                name: spot.slug.replace(/-/g, " "), location: spot.locationKey, description: "", highlight: "",
              };
              return (
                <motion.div
                  key={spot.slug}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onHoverStart={() => setHoveredSpot(index)}
                  onHoverEnd={() => setHoveredSpot(null)}
                  className="group relative overflow-hidden rounded-2xl bg-white/40 backdrop-blur-md shadow-lg hover:shadow-2xl border border-white/30 transition-all duration-500 cursor-pointer"
                >
                  <Link href={`/spots/${spot.slug}`}>
                    <div className="relative h-80 overflow-hidden">
                      <motion.div
                        className="absolute inset-0"
                        animate={{ scale: hoveredSpot === index ? 1.1 : 1 }}
                        transition={{ duration: 0.6 }}
                        style={{
                          backgroundImage: `url(${spot.image})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                      <div className="absolute top-4 left-4 flex items-center gap-2 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full">
                        <MapPin size={16} className="text-accent" />
                        <span className="text-sm font-semibold text-foreground">
                          {spotData.location}
                        </span>
                      </div>
                      <div className="absolute top-4 right-4 bg-accent/90 backdrop-blur-sm px-3 py-1.5 rounded-full">
                        <span className="text-sm font-bold text-white">
                          {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(spot.price)}
                        </span>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <h3 className="text-2xl font-bold mb-2 font-serif">{spotData.name}</h3>
                        {spotData.description && <p className="text-sm opacity-90 mb-1">{spotData.description}</p>}
                        {spotData.highlight && <p className="text-xs opacity-75 mb-4">{spotData.highlight}</p>}
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: hoveredSpot === index ? 1 : 0, y: hoveredSpot === index ? 0 : 20 }} transition={{ duration: 0.3 }}>
                          <Button variant="secondary" size="sm" className="bg-white text-foreground hover:bg-white/90">
                            {t.spots.viewDetails}
                          </Button>
                        </motion.div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="relative z-10 py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            className="text-5xl font-bold text-center mb-16 text-white"
          >
            {t.features.title}
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Shield, title: t.features.safety.title, description: t.features.safety.description, color: "text-red-600" },
              { icon: Award,  title: t.features.professional.title, description: t.features.professional.description, color: "text-red-600" },
              { icon: Wind,   title: t.features.experience.title, description: t.features.experience.description, color: "text-sky-600" },
              { icon: Users,  title: t.features.service.title, description: t.features.service.description, color: "text-yellow-600" },
            ].map((feature, index) => (
              <motion.div 
                key={feature.title} 
                initial={{ opacity: 0, y: 20 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }} 
                transition={{ duration: 0.5, delay: index * 0.1 }} 
                className="text-center space-y-4 p-6 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 hover:shadow-lg transition-shadow text-slate-800"
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/50 ${feature.color}`}>
                  <feature.icon size={32} />
                </div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="text-slate-700">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="relative z-10 py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }} 
                className="text-center relative z-10 py-20 px-6"
            >
              <h2 className="text-5xl md:text-6xl font-bold mb-6 text-white">{t.cta.title}</h2>
              <p className="text-xl md:text-2xl mb-10 max-w-2xl mx-auto text-slate-100 opacity-90">{t.cta.subtitle}</p>
              <Button asChild size="lg" variant="secondary" className="text-lg h-14 px-10 bg-white text-primary hover:bg-white/90">
                <Link href="/booking">{t.cta.button}</Link>
              </Button>
            </motion.div>
        </div>
      </section>
      
      {/* Footer - Đã bỏ hiệu ứng kính mờ */}
      <div className="relative z-10 pt-12 pb-6">
        <div className="container mx-auto">
             <Footer />
        </div>
      </div>
    </main>
  );
}
"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useLanguage } from "@/contexts/language-context"
import { pilots } from "@/lib/pilots-data"
import { motion } from "framer-motion"
import { Phone, MessageCircle, Send } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { useParams } from "next/navigation"

export default function PilotDetailPage() {
  const params = useParams()
  const slug = params.slug as string
  const { t, language } = useLanguage()

  const pilot = pilots.find((p) => p.slug === slug)

  if (!pilot) {
    notFound()
  }

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section with Pilot Image */}
      <section className="relative h-[60vh] flex items-end mt-16">
        <div
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${pilot.hero})`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/80" />
        </div>

        <div className="relative z-10 container mx-auto px-4 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-white"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-2 font-serif">{pilot.name}</h1>
            {pilot.nickname && <p className="text-xl md:text-2xl mb-4 opacity-90">{pilot.nickname}</p>}
            <p className="text-2xl text-primary-foreground/90 font-medium">{pilot.role}</p>
          </motion.div>
        </div>
      </section>

      {/* Quick Info Section */}
      <section className="py-12 bg-background border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">{pilot.experience}</div>
              <div className="text-sm text-muted-foreground">{t.pilots.experience}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">{pilot.flights}</div>
              <div className="text-sm text-muted-foreground">{t.pilots.flights}</div>
            </div>
            {pilot.hours && (
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">{pilot.hours}</div>
                <div className="text-sm text-muted-foreground">{t.pilots.hours}</div>
              </div>
            )}
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">{pilot.certificates.length}</div>
              <div className="text-sm text-muted-foreground">{t.pilots.certificates}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
            {/* Left Column - Bio & Details */}
            <div className="md:col-span-2 space-y-8">
              {/* Bio */}
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-2xl font-bold mb-4 font-serif">Giới thiệu</h2>
                  <p className="text-lg leading-relaxed text-muted-foreground">{pilot.bio[language]}</p>
                </CardContent>
              </Card>

              {/* Fun Facts */}
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-2xl font-bold mb-4 font-serif">{t.pilots.funFacts}</h2>
                  <ul className="space-y-3">
                    {pilot.funFacts[language].map((fact, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="text-primary text-xl">•</span>
                        <span className="text-muted-foreground leading-relaxed">{fact}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Achievements */}
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-2xl font-bold mb-4 font-serif">{t.pilots.achievements}</h2>
                  <ul className="space-y-3">
                    {pilot.achievements[language].map((achievement, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="text-primary text-xl">✓</span>
                        <span className="text-muted-foreground leading-relaxed">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Flying Style */}
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-2xl font-bold mb-4 font-serif">{t.pilots.flyingStyle}</h2>
                  <p className="text-lg leading-relaxed text-muted-foreground italic">
                    "{pilot.flyingStyle[language]}"
                  </p>
                </CardContent>
              </Card>

              {/* Gallery */}
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-2xl font-bold mb-4 font-serif">{t.pilots.gallery}</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {pilot.gallery.map((image, index) => (
                      <div
                        key={index}
                        className="relative aspect-square rounded-lg overflow-hidden group cursor-pointer"
                      >
                        <div
                          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                          style={{ backgroundImage: `url(${image})` }}
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Contact & Info */}
            <div className="space-y-6">
              {/* Contact Card */}
              <Card className="sticky top-24">
                <CardContent className="pt-6 space-y-6">
                  <div>
                    <h3 className="text-xl font-bold mb-4">{t.pilots.contact}</h3>
                    <div className="space-y-3">
                      <a
                        href={`tel:${pilot.phone}`}
                        className="flex items-center gap-3 p-3 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
                      >
                        <Phone className="h-5 w-5 text-primary" />
                        <span className="font-medium">{pilot.phone}</span>
                      </a>
                      <a
                        href={`https://zalo.me/${pilot.phone}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                      >
                        <MessageCircle className="h-5 w-5" />
                        <span className="font-medium">Zalo</span>
                      </a>
                      <a
                        href={`https://api.whatsapp.com/send/?phone=${pilot.phone}&text&type=phone_number&app_absent=0`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 rounded-lg bg-green-500 text-white hover:bg-green-600 transition-colors"
                      >
                        <Send className="h-5 w-5" />
                        <span className="font-medium">WhatsApp</span>
                      </a>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold mb-3">{t.pilots.specialties}</h3>
                    <div className="flex flex-wrap gap-2">
                      {pilot.specialties.map((specialty, index) => (
                        <Badge key={index} variant="secondary">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold mb-3">{t.pilots.certificates}</h3>
                    <div className="flex flex-wrap gap-2">
                      {pilot.certificates.map((cert, index) => (
                        <Badge key={index} variant="outline">
                          {cert}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Link href="/booking">
                    <Button className="w-full" size="lg">
                      {t.pilots.bookWithPilot}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

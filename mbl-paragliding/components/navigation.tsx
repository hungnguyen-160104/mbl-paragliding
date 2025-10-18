"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useLanguage } from "@/contexts/language-context"
import { motion, AnimatePresence } from "framer-motion"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { t } = useLanguage()
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10)
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsOpen(false)
    }

    window.addEventListener("scroll", handleScroll)
    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  // Khóa cuộn khi mở menu mobile
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto"
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isOpen])

  const navItems = [
    { href: "/", label: t.nav.home },
    { href: "/about", label: t.nav.about },
    { href: "/pilots", label: t.nav.pilots },
    { href: "/homestay", label: t.nav.homestay },
    { href: "/booking", label: t.nav.booking },
    { href: "/blog", label: t.nav.blog },
    { href: "/pre-notice", label: t.nav.preNotice },
    { href: "/contact", label: t.nav.contact },
  ]

  const navClasses = `
    fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out
    ${isScrolled
      ? "bg-white/60 backdrop-blur-lg shadow-md border-b border-gray-200/80"
      : "bg-transparent border-b border-transparent"}
  `

  const strongTextShadow = "0 2px 8px rgba(0, 0, 0, 0.7)"
  const subtleTextShadow = "0 1px 4px rgba(0, 0, 0, 0.5)"

  return (
    <>
      <nav className={navClasses}>
        <div className="mx-auto px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo + text */}
            <Link href="/" className="flex items-center gap-3">
              <div
                style={{
                  filter: isScrolled
                    ? "none"
                    : "drop-shadow(0 2px 5px rgb(0 0 0 / 0.6))",
                }}
              >
                <Image
                  src="/logo.png"
                  alt="Mebayluon Paragliding"
                  width={50}
                  height={50}
                  className="object-contain rounded-full"
                />
              </div>
              <div
                className="flex flex-col"
                style={{ textShadow: isScrolled ? "none" : strongTextShadow }}
              >
                <div
                  className={`text-xl font-bold tracking-wide transition-colors ${
                    isScrolled ? "text-gray-800" : "text-white"
                  }`}
                >
                  MEBAYLUON
                </div>
                <div
                  className={`text-xs hidden sm:block transition-colors tracking-wider antialiased ${
                    isScrolled ? "text-gray-500" : "text-white"
                  }`}
                >
                  Mebayluon paragliding
                </div>
              </div>
            </Link>
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-2">
              {navItems.map((item) => {
                const isActive = pathname === item.href
                const linkClasses = `text-sm font-medium rounded-full px-4 py-2 transition-all duration-300 transform hover:scale-105 ${
                  isScrolled
                    ? `text-gray-700 hover:bg-gray-100 ${
                        isActive ? "bg-primary/10 text-primary font-semibold" : ""
                      }`
                    : `border border-white/40 text-white hover:bg-white/20 hover:border-white ${
                        isActive ? "bg-white/20 border-white font-semibold" : ""
                      }`
                }`
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={linkClasses}
                    style={{ textShadow: isScrolled ? "none" : subtleTextShadow }}
                  >
                    {item.label}
                  </Link>
                )
              })}
              <div
                className={`transition-colors ${
                  isScrolled ? "text-gray-800" : "text-white"
                }`}
                style={{ textShadow: isScrolled ? "none" : subtleTextShadow }}
              >
                <LanguageSwitcher />
              </div>
              {/* 🔁 ĐỔI NÚT: "Đặt ngay" -> "Đăng nhập" */}
              <Button asChild className="ml-2 hover:scale-105 transition-transform duration-300">
                <Link href="/admin/login">Đăng nhập</Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-2 md:hidden">
              <div
                className={`transition-colors ${
                  isScrolled ? "text-gray-800" : "text-white"
                }`}
              >
                <LanguageSwitcher />
              </div>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`p-2 ${isScrolled ? "text-gray-800" : "text-white"}`}
                aria-label="Toggle menu"
                style={{
                  filter: isScrolled
                    ? "none"
                    : "drop-shadow(0 1px 2px rgb(0 0 0 / 0.6))",
                }}
              >
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-lg md:hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/20">
              <Link
                href="/"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3"
              >
                <Image
                  src="/logo.png"
                  alt="Logo"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div>
                  <h1 className="font-bold text-white">MEBAYLUON</h1>
                  <p className="text-xs text-slate-300">Mebayluon paragliding</p>
                </div>
              </Link>
              <button onClick={() => setIsOpen(false)} className="p-2 text-white">
                <X size={28} />
              </button>
            </div>

            {/* Links */}
            <nav className="mt-8 flex flex-col p-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`text-2xl py-4 transition-colors font-medium ${
                    pathname === item.href
                      ? "text-red-400"
                      : "text-slate-100 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* 🔁 ĐỔI NÚT: "Đặt ngay" -> "Đăng nhập" (mobile) */}
            <div className="absolute bottom-6 left-4 right-4">
              <Button asChild className="w-full bg-red-600 hover:bg-red-700 h-14 text-lg">
                <Link href="/admin/login" onClick={() => setIsOpen(false)}>
                  Đăng nhập
                </Link>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

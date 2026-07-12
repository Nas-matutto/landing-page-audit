"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X, ArrowRight } from "lucide-react"

export function Header() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [barDismissed, setBarDismissed] = useState(false)
  const showAnnouncementBar = pathname === "/" && !barDismissed

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleLogin = () => {
    window.open('https://app.talktomedata.com/login', '_blank')
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "liquid-glass-opaque shadow-sm" : "bg-transparent"
      }`}
    >
      {showAnnouncementBar && (
        <div
          className="relative flex items-center justify-center px-10 py-2"
          style={{ background: "linear-gradient(90deg, #185FA5, #2563eb, #7c3aed)" }}
        >
          <Link
            href="/free-guides/business-automation-checklist"
            className="flex items-center gap-2 text-white text-xs sm:text-sm font-medium hover:opacity-90 transition-opacity"
          >
            <span>Download a Free Business Automation Checklist</span>
            <ArrowRight className="w-3.5 h-3.5 shrink-0" />
          </Link>
          <button
            onClick={() => setBarDismissed(true)}
            aria-label="Dismiss"
            className="absolute right-3 p-1 text-white/60 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/android-chrome-192x192.png"
              alt="Talk to Me Data"
              width={192}
              height={192}
              priority
              className="h-9 w-9 sm:h-10 sm:w-10"
            />
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/#how-it-works"
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              How it works
            </Link>
            <Link
              href="/agents"
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Agents
            </Link>
            <Link
              href="/free-tools"
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Free Tools
            </Link>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/book-demo"
              className="relative overflow-hidden group bg-linear-to-r from-primary to-violet-500 text-white text-sm font-semibold px-5 py-2 rounded-lg shadow-md shadow-primary/25 hover:shadow-primary/40 hover:shadow-lg transition-all cursor-pointer"
            >
              <span className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
              <span className="relative">Book Demo</span>
            </Link>
          </div>

          <button
            className="md:hidden p-2 text-foreground hover:text-primary transition-colors cursor-pointer"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border bg-white">
            <nav className="flex flex-col gap-4">
              <Link
                href="/#how-it-works"
                className="text-sm font-medium text-foreground hover:text-primary transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                How it works
              </Link>
              <Link
                href="/agents"
                className="text-sm font-medium text-foreground hover:text-primary transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Agents
              </Link>
              <Link
                href="/free-tools"
                className="text-sm font-medium text-foreground hover:text-primary transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Free Tools
              </Link>
              <div className="flex flex-col gap-2 pt-2 border-t border-border">
                <Link
                  href="/book-demo"
                  onClick={() => setMobileMenuOpen(false)}
                  className="relative overflow-hidden group w-full bg-linear-to-r from-primary to-violet-500 text-white text-sm font-semibold py-2.5 rounded-lg shadow-md shadow-primary/20 cursor-pointer text-center"
                >
                  <span className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
                  <span className="relative">Book Demo</span>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

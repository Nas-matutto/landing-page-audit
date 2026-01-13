"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

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

  const handleSignUp = () => {
    window.open('https://app.talktomedata.com/signup', '_blank')
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "liquid-glass-opaque shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo - Gradient text from blue to lime without background box */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              TTMD
            </span>
          </Link>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/features"
              scroll={false}
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Features
            </Link>
            <Link
              href="/#how-it-works"
              scroll={true}
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              How it works
            </Link>
            <Link
              href="/pricing"
              scroll={false}
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Pricing
            </Link>
          </nav>

          {/* CTA Buttons - Desktop - Added Login text button and cursor-pointer class */}
          <div className="hidden md:flex items-center gap-4">
            <Button 
              variant="ghost" 
              className="text-sm font-medium cursor-pointer"
              onClick={handleLogin}
            >
              Login
            </Button>
            <Button
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6 shadow-lg cursor-pointer"
              size="default"
              onClick={handleSignUp}
            >
              Sign Up
            </Button>
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
                href="/features"
                scroll={true}
                className="text-sm font-medium text-foreground hover:text-primary transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Features
              </Link>
              <Link
                href="/#how-it-works"
                scroll={true}
                className="text-sm font-medium text-foreground hover:text-primary transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                How it works
              </Link>
              <Link
                href="/pricing"
                scroll={false}
                className="text-sm font-medium text-foreground hover:text-primary transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Pricing
              </Link>
              <div className="flex flex-col gap-2 pt-2 border-t border-border">
                <Button 
                  variant="ghost" 
                  className="w-full text-sm font-medium cursor-pointer"
                  onClick={() => {
                    handleLogin()
                    setMobileMenuOpen(false)
                  }}
                >
                  Login
                </Button>
                <Button
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-lg cursor-pointer"
                  onClick={() => {
                    handleSignUp()
                    setMobileMenuOpen(false)
                  }}
                >
                  Sign Up
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
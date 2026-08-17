"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, X, ArrowRight } from "lucide-react"
import { SIGNUP_URL } from "@/lib/links"

const NAV_LINKS = [
  { href: "/#how-it-works", label: "How it works" },
  { href: "/agents", label: "Agents" },
  { href: "/free-tools", label: "Free Tools" },
]

export function Header({ minimal = false }: { minimal?: boolean }) {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [barDismissed, setBarDismissed] = useState(false)
  const showAnnouncementBar = pathname === "/" && !barDismissed

  return (
    <>
      {showAnnouncementBar && (
        <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center bg-ink px-10 py-2">
          <Link
            href="/free-guides/business-automation-checklist"
            className="flex items-center gap-2 text-xs font-medium text-white/80 transition-colors hover:text-white sm:text-[13px]"
          >
            <span>Download a free business automation checklist</span>
            <ArrowRight className="h-3.5 w-3.5 shrink-0" />
          </Link>
          <button
            onClick={() => setBarDismissed(true)}
            aria-label="Dismiss"
            className="absolute right-3 cursor-pointer p-1 text-white/40 transition-colors hover:text-white"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      {/* Floating island: detached from the top edge, centered, and sized to its
          contents rather than spanning the viewport. */}
      <header
        className={`fixed left-0 right-0 z-40 px-4 pt-2 sm:px-6 sm:pt-6 ${
          showAnnouncementBar ? "top-9" : "top-0"
        }`}
      >
        <nav className="nav-glass mx-auto flex w-full max-w-[640px] items-center justify-between gap-4 rounded-[30px] border border-hairline px-5 py-3 sm:px-6">
          <Link href="/" className="flex shrink-0 items-center" aria-label="Talk to Me Data — home">
            <Image
              src="/android-chrome-192x192.png"
              alt="Talk to Me Data"
              width={192}
              height={192}
              priority
              className="h-8 w-8"
            />
          </Link>

          {!minimal && (
            <>
              {/* Nav, CTA and mobile menu are hidden in `minimal` mode (e.g. mid-way
                  through the /get-started flow) so visitors can't accidentally tap
                  out of the funnel. Only the logo stays. */}
              <div className="hidden items-center gap-6 md:flex">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-[15px] font-semibold tracking-[0.2px] text-ink transition-opacity hover:opacity-60"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              <a
                href={SIGNUP_URL}
                className="group relative hidden shrink-0 overflow-hidden rounded-full bg-ink px-4 py-2.5 text-[15px] font-semibold tracking-[0.2px] text-white transition-opacity hover:opacity-85 md:inline-flex"
              >
                <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-in-out group-hover:translate-x-full" />
                <span className="relative">Get Started</span>
              </a>

              <button
                className="cursor-pointer p-1 text-ink md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </>
          )}
        </nav>

        {!minimal && mobileMenuOpen && (
          <div className="nav-glass mx-auto mt-2 w-full max-w-[640px] rounded-3xl border border-hairline p-5 md:hidden">
            <nav className="flex flex-col gap-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[15px] font-semibold tracking-[0.2px] text-ink"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <a
                href={SIGNUP_URL}
                onClick={() => setMobileMenuOpen(false)}
                className="mt-1 inline-flex items-center justify-center rounded-full bg-ink px-4 py-3 text-[15px] font-semibold tracking-[0.2px] text-white"
              >
                Get Started
              </a>
            </nav>
          </div>
        )}
      </header>
    </>
  )
}

"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { GoogleAnalytics } from "@/components/google-analytics"
import { MetaPixel } from "@/components/meta-pixel"
import { OPEN_SETTINGS_EVENT, openCookieSettings, readConsent, saveConsent, useConsent, type ConsentChoice } from "@/lib/cookie-consent"

export function CookieBanner() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!readConsent()) setOpen(true)
    const show = () => setOpen(true)
    window.addEventListener(OPEN_SETTINGS_EVENT, show)
    return () => window.removeEventListener(OPEN_SETTINGS_EVENT, show)
  }, [])

  if (!open) return null

  const choose = (choice: ConsentChoice) => {
    setOpen(false)
    saveConsent(choice)
  }

  // Both choices get identical styling so rejecting is as easy as accepting.
  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie preferences"
      className="fixed bottom-4 left-4 right-4 z-50 sm:right-auto sm:max-w-sm rounded-xl border border-border bg-background/95 p-4 shadow-lg backdrop-blur"
    >
      <p className="text-sm leading-relaxed text-muted-foreground">
        We use necessary cookies to run this site. With your OK, we&rsquo;d also use analytics and advertising cookies to see how the site is used and measure our ads.{" "}
        <Link href="/privacy-policy#cookies" className="text-foreground underline underline-offset-4">
          Learn more
        </Link>
      </p>
      <div className="mt-3 grid grid-cols-2 gap-2">
        <Button variant="outline" size="sm" onClick={() => choose("necessary")}>
          Necessary only
        </Button>
        <Button variant="outline" size="sm" onClick={() => choose("all")}>
          Accept all
        </Button>
      </div>
    </div>
  )
}

export function CookieSettingsButton({ className }: { className?: string }) {
  return (
    <button type="button" onClick={openCookieSettings} className={className}>
      Cookie settings
    </button>
  )
}

// Analytics and advertising scripts that only load after "Accept all".
export function ConsentedScripts() {
  if (useConsent() !== "all") return null
  return (
    <>
      <GoogleAnalytics />
      <MetaPixel />
    </>
  )
}

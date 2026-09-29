import { useSyncExternalStore } from "react"

// "all" = analytics + advertising cookies allowed; "necessary" = only strictly necessary.
export type ConsentChoice = "all" | "necessary"

// Stored as a cookie on .talktomedata.com so app.talktomedata.com can honour the same choice.
const COOKIE_NAME = "ttmd_consent"
const MAX_AGE_SECONDS = 60 * 60 * 24 * 180 // ask again after 6 months
const CHANGE_EVENT = "ttmd:consent-change"
export const OPEN_SETTINGS_EVENT = "ttmd:open-cookie-settings"

// Cookies set by PostHog, Google Analytics and the Meta Pixel.
const TRACKING_COOKIE_PREFIXES = ["ph_", "_ga", "_gid", "_gat", "_fbp", "_fbc"]

function cookieDomain(): string | null {
  return window.location.hostname.endsWith("talktomedata.com") ? ".talktomedata.com" : null
}

export function readConsent(): ConsentChoice | null {
  if (typeof document === "undefined") return null
  const match = document.cookie.match(/(?:^|; )ttmd_consent=(all|necessary)(?:;|$)/)
  return match ? (match[1] as ConsentChoice) : null
}

function clearTrackingCookies() {
  const domain = cookieDomain()
  for (const pair of document.cookie.split("; ")) {
    const name = pair.split("=")[0]
    if (!TRACKING_COOKIE_PREFIXES.some(prefix => name.startsWith(prefix))) continue
    const expire = `${name}=; path=/; max-age=0`
    document.cookie = expire
    if (domain) document.cookie = `${expire}; domain=${domain}`
  }
}

export function saveConsent(choice: ConsentChoice) {
  const previous = readConsent()
  const domain = cookieDomain()
  const secure = window.location.protocol === "https:" ? "; Secure" : ""
  document.cookie =
    `${COOKIE_NAME}=${choice}; path=/; max-age=${MAX_AGE_SECONDS}; SameSite=Lax${secure}` +
    (domain ? `; domain=${domain}` : "")

  // Tracking scripts can't be switched off or reconfigured once running, so on any
  // change of mind reload the page (clearing tracking cookies if consent was withdrawn).
  if (previous && previous !== choice) {
    if (choice === "necessary") clearTrackingCookies()
    window.location.reload()
    return
  }
  window.dispatchEvent(new Event(CHANGE_EVENT))
}

export function openCookieSettings() {
  window.dispatchEvent(new Event(OPEN_SETTINGS_EVENT))
}

function subscribe(onChange: () => void) {
  window.addEventListener(CHANGE_EVENT, onChange)
  return () => window.removeEventListener(CHANGE_EVENT, onChange)
}

export function useConsent(): ConsentChoice | null {
  return useSyncExternalStore(subscribe, readConsent, () => null)
}

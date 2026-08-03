"use client"

import { useEffect } from "react"
import { useSearchParams } from "next/navigation"

/**
 * Fires the Meta `Schedule` conversion once a visitor lands here from a completed
 * Cal.com booking. This page is the success-redirect target configured on the
 * Cal.com event type, so reaching it means the booking was actually created.
 *
 * Cal.com forwards the booking details as query params (uid, title, startTime…)
 * when "forward params" is enabled on the redirect. We use `uid` as the Meta
 * event ID so a page refresh — or a later server-side Conversions API call for
 * the same booking — is deduplicated by Meta instead of counted twice.
 */
export function BookingConfirmedTracker() {
  const searchParams = useSearchParams()
  const bookingUid = searchParams.get("uid")

  useEffect(() => {
    // Belt-and-braces against refreshes when Cal.com didn't forward a uid.
    const key = `schedule-tracked:${bookingUid ?? "no-uid"}`
    if (sessionStorage.getItem(key)) return
    sessionStorage.setItem(key, "1")

    window.fbq?.(
      "track",
      "Schedule",
      { content_name: "Talk to Me Data demo call" },
      bookingUid ? { eventID: bookingUid } : undefined,
    )
  }, [bookingUid])

  return null
}

"use client"

import { useEffect } from "react"
import posthog from "posthog-js"

export function PostHogInit() {
  useEffect(() => {
    if (!posthog.__loaded) {
      posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
        api_host: "https://app.posthog.com",
      })
    }

    // Optional: make PostHog accessible in DevTools for testing
    (window as any).posthog = posthog

    // Automatically track page views
    posthog.capture('$pageview')

  }, [])

  return null
}

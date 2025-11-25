// components/PostHogInit.tsx
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
  }, [])

  return null
}

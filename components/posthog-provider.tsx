'use client'

import { useEffect, useState, Suspense } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import posthog from 'posthog-js'
import { useConsent } from '@/lib/cookie-consent'

function PostHogPageView() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Track pageviews on route change
    if (pathname) {
      let url = window.origin + pathname
      if (searchParams && searchParams.toString()) {
        url = url + `?${searchParams.toString()}`
      }
      posthog.capture('$pageview', {
        $current_url: url,
      })
    }
  }, [pathname, searchParams])

  return null
}

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  const consent = useConsent()
  const [ready, setReady] = useState(false)

  useEffect(() => {
    // Wait for a cookie choice. "all" uses cookies as normal; "necessary" runs PostHog
    // in cookieless mode (no cookies or storage, anonymous server-side hash). Changing
    // the choice reloads the page, so this only ever runs once per page load.
    if (!consent || ready) return
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com',
      // Enable in production, disable in development
      loaded: (posthog) => {
        if (process.env.NODE_ENV === 'development') posthog.debug()
      },
      capture_pageview: false, // We'll capture manually
      capture_pageleave: true,
      ...(consent === 'all'
        ? { cross_subdomain_cookie: true } // Share anonymous ID with app.talktomedata.com
        : { cookieless_mode: 'always' as const }), // Must also be enabled in PostHog project settings
    })
    setReady(true)
  }, [consent, ready])

  return (
    <>
      {ready && (
        <Suspense fallback={null}>
          <PostHogPageView />
        </Suspense>
      )}
      {children}
    </>
  )
}

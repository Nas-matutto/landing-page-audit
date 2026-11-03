'use client'

import { useEffect, useState, Suspense } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import type { PostHog } from 'posthog-js'
import { useConsent } from '@/lib/cookie-consent'

// posthog-js is a fifth of the site's JavaScript, and it does nothing until the
// visitor makes a cookie choice, so it's only downloaded then.
let client: PostHog | undefined

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
      client?.capture('$pageview', {
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
    let cancelled = false
    import('posthog-js').then(({ default: posthog }) => {
      if (cancelled) return
      client = posthog
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
    })
    return () => {
      cancelled = true
    }
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

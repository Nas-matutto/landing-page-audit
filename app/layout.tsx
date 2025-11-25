import React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

// Import client-only PostHog initializer
import { PostHogInit } from "@/components/PostHogInit"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "AI Landing Page Audits - Convert More Visitors Today",
  description:
    "Get fast, actionable AI landing-page audits that help startups convert more. Know exactly why visitors aren't converting and what to fix today.",
  generator: "v0.app",
  icons: {
    icon: [
      { url: "/icon-light-32x32.png", media: "(prefers-color-scheme: light)" },
      { url: "/icon-dark-32x32.png", media: "(prefers-color-scheme: dark)" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        {/* Client-side PostHog initialization */}
        <PostHogInit />

        {children}
        <Analytics />
      </body>
    </html>
  )
}

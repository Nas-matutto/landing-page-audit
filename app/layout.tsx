import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { PostHogProvider } from "@/components/posthog-provider"
import { GoogleAnalytics } from "@/components/google-analytics"
import { MetaPixel } from "@/components/meta-pixel"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Talk to me Data — Sales Intelligence Powered by Real Signals",
  description:
    "Find companies already using your competitors' tools. TTMD crawls job postings and reviews to surface warm sales prospects — no cold lists, just real signals.",
  keywords: [
    "sales intelligence",
    "competitor intelligence",
    "B2B prospecting",
    "signal-based outreach",
    "companies using HubSpot",
    "companies using Salesforce",
    "SaaS sales tools",
    "warm outreach",
  ],
  generator: "Next.js",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        <PostHogProvider>
          {children}
        </PostHogProvider>
        <GoogleAnalytics />
        <MetaPixel />
        <Analytics />
      </body>
    </html>
  )
}

import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { PostHogProvider } from "@/components/posthog-provider"
import { GoogleAnalytics } from "@/components/google-analytics"
import { MetaPixel } from "@/components/meta-pixel"
import { ChatWidgetLoader } from "@/components/chat-widget-loader"
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
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://talktomedata.com/#website",
      "name": "Talk to me Data",
      "url": "https://talktomedata.com",
    },
    {
      "@type": "Organization",
      "@id": "https://talktomedata.com/#organization",
      "name": "Talk to me Data",
      "url": "https://talktomedata.com",
      "logo": "https://talktomedata.com/favicon-96x96.png",
      "sameAs": [],
    },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`font-sans antialiased`}>
        <PostHogProvider>
          {children}
        </PostHogProvider>
        <ChatWidgetLoader />
        <GoogleAnalytics />
        <MetaPixel />
        <Analytics />
      </body>
    </html>
  )
}

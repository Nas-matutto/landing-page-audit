import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { PostHogProvider } from "@/components/posthog-provider"
import { CookieBanner, ConsentedScripts } from "@/components/cookie-consent"
import "./globals.css"

const geist = Geist({ subsets: ["latin"], variable: "--font-geist-sans", display: "swap" })
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" })

export const metadata: Metadata = {
  // Makes the shared preview image (app/opengraph-image.png) an absolute URL.
  metadataBase: new URL("https://talktomedata.com"),
  title: "TTMD | Talk to me Data - Build and Launch AI Agents",
  description:
    "TTMD (Talk to me Data) builds, hosts and manages AI agents for your business: customer support, booking, lead finding, invoices and more. Book a demo.",
  keywords: [
    "TTMD",
    "Talk to me Data",
    "AI agents",
    "AI agents for business",
    "custom AI agent",
    "AI automation",
    "business automation",
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
      "logo": "https://talktomedata.com/android-chrome-512x512.png",
      "sameAs": [],
    },
    // Primary navigation — signals preferred sitelinks to search engines
    {
      "@type": "SiteNavigationElement",
      "@id": "https://talktomedata.com/#nav-agents",
      "name": "Agents",
      "url": "https://talktomedata.com/agents",
    },
    {
      "@type": "SiteNavigationElement",
      "@id": "https://talktomedata.com/#nav-book-demo",
      "name": "Book a Demo",
      "url": "https://talktomedata.com/book-demo",
    },
    {
      "@type": "SiteNavigationElement",
      "@id": "https://talktomedata.com/#nav-free-tools",
      "name": "Free Tools",
      "url": "https://talktomedata.com/free-tools",
    },
    {
      "@type": "SiteNavigationElement",
      "@id": "https://talktomedata.com/#nav-free-guides",
      "name": "Free Guides",
      "url": "https://talktomedata.com/free-guides",
    },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`}>
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
        <CookieBanner />
        <ConsentedScripts />
        <Analytics />
      </body>
    </html>
  )
}

import type { Metadata } from 'next'
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/sections/hero-section"
import { PainPointsSection } from "@/components/sections/pain-points-section"
import { HowItWorksSection } from "@/components/sections/how-it-works-section"
import { WhatWeAnalyzeSection } from "@/components/sections/what-we-analyze-section"
import { FAQSection } from "@/components/sections/faq-section"
import { FinalCTASection } from "@/components/sections/final-cta-section"

export const metadata: Metadata = {
  title: 'Talk to me Data | Shopify Conversion Rate Optimization & Store Analysis',
  description: 'Talk to me Data provides instant AI-powered analysis of your Shopify store. Identify conversion blockers in product pages, checkout flow, site speed & mobile UX. Increase sales by 30-50% in 30 days.',
  keywords: [
    'Talk to me Data',
    'Shopify conversion rate optimization',
    'Shopify store optimization',
    'increase Shopify sales',
    'Shopify conversion analysis',
    'Shopify cart abandonment',
    'Shopify site speed',
    'Shopify mobile optimization',
    'Shopify checkout optimization',
    'Shopify product page optimization',
    'improve Shopify conversion rate',
    'Shopify CRO',
    'Shopify analytics'
  ],
  openGraph: {
    title: 'Talk to me Data | Increase Your Shopify Store Conversion Rate',
    description: 'AI-powered analysis identifies conversion blockers in your Shopify store. Get actionable recommendations to increase sales by 30-50%.',
    type: 'website',
    url: 'https://talktomedata.com',
    siteName: 'Talk to me Data',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Talk to me Data - Shopify Conversion Optimization'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Talk to me Data | Shopify Conversion Rate Optimization',
    description: 'Analyze your Shopify store in 60 seconds. Get AI-powered insights to increase conversions and sales.',
    images: ['/og-image.jpg'],
    creator: '@talktomedata'
  },
  alternates: {
    canonical: 'https://talktomedata.com'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  applicationName: 'Talk to me Data',
  authors: [{ name: 'Talk to me Data' }],
  generator: 'Next.js',
  referrer: 'origin-when-cross-origin',
}

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <PainPointsSection />
        <HowItWorksSection />
        <WhatWeAnalyzeSection />
        <FAQSection />
        <FinalCTASection />
      </main>
      <Footer />
    </div>
  )
}

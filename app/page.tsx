import type { Metadata } from 'next'
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/sections/hero-section"
import { PainPointsSection } from "@/components/sections/pain-points-section"
import { HowItWorksSection } from "@/components/sections/how-it-works-section"
import { WhatWeAnalyzeSection } from "@/components/sections/what-we-analyze-section"
import { PricingSection } from "@/components/sections/pricing-section"
import { FAQSection } from "@/components/sections/faq-section"
import { FinalCTASection } from "@/components/sections/final-cta-section"

export const metadata: Metadata = {
  title: "Talk to me Data | Find Companies Using Your Competitor's Tools",
  description: 'Sales intelligence powered by job postings and reviews. See which companies use specific SaaS products — then reach out with real context. Free to start.',
  keywords: [
    'sales intelligence',
    'competitor intelligence',
    'tech stack detection',
    'job posting signals',
    'B2B sales prospecting',
    'warm outreach',
    'companies using HubSpot',
    'companies using Salesforce',
    'SaaS sales tools',
    'signal-based outreach',
    'sales prospecting software',
    'account-based sales',
  ],
  openGraph: {
    title: "Talk to me Data | Find Companies Using Your Competitor's Tools",
    description: 'Sales intelligence powered by job postings and reviews. Find warm prospects instead of cold lists.',
    type: 'website',
    url: 'https://talktomedata.com',
    siteName: 'Talk to me Data',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Talk to me Data - Sales Signal Intelligence'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Talk to me Data | Signal-Based Sales Intelligence',
    description: "See which companies use your competitor's tools. Job posting + review signals, updated weekly.",
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
        <PricingSection />
        <FAQSection />
        <FinalCTASection />
      </main>
      <Footer />
    </div>
  )
}

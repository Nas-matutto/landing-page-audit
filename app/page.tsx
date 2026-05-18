import type { Metadata } from 'next'
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/sections/hero-section"
import { PainPointsSection } from "@/components/sections/pain-points-section"
import { HowItWorksSection } from "@/components/sections/how-it-works-section"
import { WhatWeAnalyzeSection } from "@/components/sections/what-we-analyze-section"
import { AgentHostingSection } from "@/components/sections/agent-hosting-section"
import { FAQSection } from "@/components/sections/faq-section"
import { FinalCTASection } from "@/components/sections/final-cta-section"

export const metadata: Metadata = {
  title: "Talk to me Data - AI Agents built, deployed, and hosted for you",
  description: "Tell us what you need to automate. We build, deploy, and host your custom AI agents for you. From brief to live AI Agent in 24 hours.",
  keywords: [
    "AI agents",
    "AI automation",
    "no-code AI",
    "custom AI agent",
    "AI deployment",
    "AI workflow automation",
    "AI customer support",
    "AI lead qualification",
  ],
  openGraph: {
    title: "Talk to me Data - AI Agents built, deployed, and hosted for you",
    description: "Tell us what you need to automate. We build, deploy, and host your custom AI agents for you in 24 hours.",
    type: 'website',
    url: 'https://talktomedata.com',
    siteName: 'Talk to me Data',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Talk to me Data - AI Agents built, deployed, and hosted for you',
    description: "No code. No complexity. We build your AI agent and you just use it.",
  },
  alternates: {
    canonical: 'https://talktomedata.com'
  },
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
        <AgentHostingSection />
        <FAQSection />
        <FinalCTASection />
      </main>
      <Footer />
    </div>
  )
}

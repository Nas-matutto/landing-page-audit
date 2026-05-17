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
  title: "Agently — AI agents built, deployed, and hosted for you",
  description: "Tell us what you need to automate. We build, deploy, and host your custom AI agent — you just use it. From brief to live in days.",
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
    title: "Agently — AI agents built, deployed, and hosted for you",
    description: "Tell us what you need to automate. We build, deploy, and host your custom AI agent — you just use it.",
    type: 'website',
    url: 'https://agently.ai',
    siteName: 'Agently',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Agently — AI agents built, deployed, and hosted for you',
    description: "No code. No complexity. We build your AI agent and you just use it.",
  },
  alternates: {
    canonical: 'https://agently.ai'
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

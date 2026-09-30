import type { Metadata } from 'next'
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/sections/hero-section"
import { WorkflowVsAgentsSection } from "@/components/sections/workflow-vs-agents-section"
import { HowItWorksSection } from "@/components/sections/how-it-works-section"
import { WhatWeAnalyzeSection } from "@/components/sections/what-we-analyze-section"
import { FAQSection } from "@/components/sections/faq-section"
import { FinalCTASection } from "@/components/sections/final-cta-section"

const BASE_URL = 'https://talktomedata.com'
const TITLE = "Talk to me Data - Build and launch AI agents in minutes"
const DESCRIPTION =
  "AI agents that do the work for you. Start free with a ready-made agent for social media or SEO, or get a custom agent built around your workflow. Just tell it what to do."

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "AI agents",
    "AI automation",
    "AI agents for business",
    "no-code AI agent",
    "AI social media agent",
    "AI SEO agent",
    "generative engine optimization",
    "custom AI agent",
    "business automation",
  ],
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: 'website',
    url: BASE_URL,
    siteName: 'Talk to me Data',
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: "No code. No workflows to wire. Tell your AI agent what to do, and it does the work.",
  },
  alternates: {
    canonical: BASE_URL
  },
}

// ── FAQ ───────────────────────────────────────────────────────────────────────

const FAQS = [
  {
    question: "What is Talk to me Data?",
    answer:
      "A platform of AI agents that do the work for you, not just show you a dashboard. Start with a ready-made agent for social media or SEO, or ask us to build one for any other job. You tell your agent what you want in plain English, and it gets it done.",
  },
  {
    question: "Is it free to start?",
    answer:
      "Yes. Sign up for free, pick an agent, and connect your accounts. You'll see your first analysis within minutes, before you commit to anything.",
  },
  {
    question: "Do I need any technical skills?",
    answer:
      "None. There's no code, no workflow to wire, and no API keys to manage. If you can describe the job in a sentence, your agent can take it from there.",
  },
  {
    question: "What can the ready-made agents do?",
    answer:
      "The Social Media Manager reads every post on Instagram, TikTok, YouTube and Facebook, tracks your competitors, writes and designs new posts in your brand kit, and posts them to Instagram, Facebook and TikTok. The SEO & GEO Agent connects to Google Search Console, finds the searches you can win, and writes pages built to rank on Google and get cited by ChatGPT, Claude and Perplexity, then publishes them to your site.",
  },
  {
    question: "What if I need an agent for something else?",
    answer:
      "Request a custom agent. Tell us the job and the tools you use, like chasing invoices, qualifying leads or sending a weekly report, and we build an agent around how your team works. We host and maintain it for you, and most are live within a few days.",
  },
  {
    question: "Will anything be posted or published without my approval?",
    answer:
      "Only if you switch it on. You can review every piece before it goes out, set it to publish on schedule, or get an email reminder with the finished post and share it yourself.",
  },
  {
    question: "How is this different from Zapier or n8n?",
    answer:
      "With workflow tools, you build every step by hand and rebuild it whenever something changes. An agent works from a plain-English brief, handles the edge cases itself, and adapts when your tools change. You describe the outcome, not the steps.",
  },
  {
    question: "Do I have to share my passwords? Is my data safe?",
    answer:
      "You never share a password. You connect accounts through each platform's own sign-in, and you can disconnect them at any time. Your agents only access the accounts you connect, and we never sell your data or use it to train AI models.",
  },
]

// ── Structured data ───────────────────────────────────────────────────────────

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${BASE_URL}#faq`,
  mainEntity: FAQS.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
}

// ── Page ──────────────────────────────────────────────────────────────────────
// The story runs: how it works, the agents you can start with, why agents beat
// workflow builders, then the objections and the ask.

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main>
        <HeroSection />
        <HowItWorksSection />
        <WhatWeAnalyzeSection />
        <WorkflowVsAgentsSection />
        <FAQSection items={FAQS} />
        <FinalCTASection />
      </main>
      <Footer />
    </div>
  )
}

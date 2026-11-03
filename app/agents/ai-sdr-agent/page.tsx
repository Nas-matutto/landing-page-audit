import { OG_IMAGE } from "@/lib/og"
import { AgentGuidesSection } from "@/components/blog/agent-guides-section"
import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FAQSection } from "@/components/sections/faq-section"
import { SdrAgentHero } from "@/components/sections/sdr-agent/hero"
import { SdrAgentOutcomes } from "@/components/sections/sdr-agent/features"
import {
  BeforeAfter,
  ChannelStrip,
  SdrFinalCta,
  SdrHowItWorks,
  SdrTryIt,
} from "@/components/sections/sdr-agent/sections"

const BASE_URL = "https://talktomedata.com"
const PAGE_URL = `${BASE_URL}/agents/ai-sdr-agent`

const TITLE = "AI SDR Agent: Fill Your Sales Pipeline Without Hiring | Talk to me Data"
const DESCRIPTION =
  "An AI SDR that fills your pipeline for you. It finds B2B buyers who match your ideal customer, writes a personal email to each one, handles every follow-up and sends from your own mailbox, so replies land straight in your inbox."

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "ai sdr",
    "ai sdr agent",
    "ai sales development rep",
    "ai outbound sales",
    "automated cold email",
    "ai lead generation b2b",
    "ai prospecting tool",
    "sales pipeline automation",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    images: [OG_IMAGE],
    title: TITLE,
    description: DESCRIPTION,
    type: "article",
    url: PAGE_URL,
    siteName: "Talk to me Data",
    publishedTime: "2026-11-03",
  },
  twitter: {
    images: [OG_IMAGE],
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
}

// ── FAQ ───────────────────────────────────────────────────────────────────────

const FAQS = [
  {
    question: "What does the AI SDR agent get me?",
    answer:
      "A pipeline that fills itself. You describe your ideal customer, and the agent finds the buyers who match, writes a personal email to each one and lines up every follow-up. You spend your time on the people who reply, not on lead lists and cold emails.",
  },
  {
    question: "Where does it find my leads?",
    answer:
      "It searches for B2B companies and people that match the customer you describe, then checks each one for a reason to talk now, such as hiring, raising money, growing the team or launching something new. Every lead comes with the reason it fits.",
  },
  {
    question: "Will the emails sound like a robot wrote them?",
    answer:
      "No. Each email is written for one person and opens on something true about their business, in your voice. It reads like a note from someone who did their homework, because the agent did.",
  },
  {
    question: "Does it send from my own email?",
    answer:
      "Yes, on paid plans it sends from your own Gmail or Outlook mailbox, under your name. Replies come straight to the inbox you already use, so you can step in the moment a buyer is interested.",
  },
  {
    question: "Do I need a sales team to use it?",
    answer:
      "No. It's built for founders and small teams who need more sales conversations but can't justify a full time SDR. It does the prospecting and the writing, so whoever handles sales can focus on the calls.",
  },
  {
    question: "How is it different from buying a lead list?",
    answer:
      "A lead list hands you names and leaves the work to you. Your agent finds the leads, tells you why each one fits right now, writes to them and follows up. You get conversations, not a spreadsheet.",
  },
  {
    question: "Is it free to start?",
    answer:
      "Yes. The SDR agent is included on every plan, Starter too. Sign up, describe who you sell to and see your first leads and emails in minutes.",
  },
]

// ── Structured data ───────────────────────────────────────────────────────────

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${PAGE_URL}#service`,
      name: "AI SDR Agent",
      serviceType: "AI Sales Development Agent",
      description: DESCRIPTION,
      url: PAGE_URL,
      provider: { "@type": "Organization", name: "Talk to me Data", url: BASE_URL },
      areaServed: "Worldwide",
    },
    {
      "@type": "FAQPage",
      "@id": `${PAGE_URL}#faq`,
      mainEntity: FAQS.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${PAGE_URL}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Agents", item: `${BASE_URL}/agents` },
        { "@type": "ListItem", position: 2, name: "AI SDR", item: PAGE_URL },
      ],
    },
  ],
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function AiSdrAgentPage() {
  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main>
        <SdrAgentHero />
        <ChannelStrip />
        <BeforeAfter />
        <SdrAgentOutcomes />
        <SdrTryIt />
        <SdrHowItWorks />
        <AgentGuidesSection agentHref="/agents/ai-sdr-agent" />
        <FAQSection eyebrow="FAQ" heading="Questions about the AI SDR agent" items={FAQS} />
        <SdrFinalCta />
      </main>
      <Footer />
    </div>
  )
}

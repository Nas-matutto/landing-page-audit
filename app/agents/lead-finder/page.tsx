import { OG_IMAGE } from "@/lib/og"
import { AgentGuidesSection } from "@/components/blog/agent-guides-section"
import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FAQSection } from "@/components/sections/faq-section"
import {
  LeadFinderDifference,
  LeadFinderFinalCta,
  LeadFinderHero,
  LeadFinderHowItWorks,
  LeadFinderQuotes,
  ToolStrip,
} from "@/components/sections/lead-finder/sections"

const BASE_URL = "https://talktomedata.com"
const PAGE_URL = `${BASE_URL}/agents/lead-finder`

export const metadata: Metadata = {
  title: "AI Lead Finder Agent - Built, Hosted & Managed | Talk to Me Data",
  description:
    "A custom AI lead finder agent that researches your ideal customer profile, finds matching companies and contacts, enriches their data, and delivers verified leads into your CRM automatically. We build, host, and manage it.",
  keywords: [
    "ai lead finder agent",
    "automated lead generation",
    "ai prospecting agent",
    "b2b lead finder ai",
    "ai lead research agent",
    "automated outbound leads",
    "ai agent for lead generation",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    images: [OG_IMAGE],
    title: "AI Lead Finder Agent - Built, Hosted & Managed | Talk to Me Data",
    description:
      "A custom AI lead finder agent that researches your ideal customer profile, finds matching companies and contacts, enriches their data, and delivers verified leads into your CRM automatically. We build, host, and manage it.",
    type: "article",
    url: PAGE_URL,
    siteName: "Talk to Me Data",
    publishedTime: "2026-06-25",
  },
  twitter: {
    images: [OG_IMAGE],
    card: "summary_large_image",
    title: "AI Lead Finder Agent - Built, Hosted & Managed | Talk to Me Data",
    description:
      "A custom AI lead finder agent that researches your ideal customer profile, finds matching companies and contacts, enriches their data, and delivers verified leads into your CRM automatically. We build, host, and manage it.",
  },
}

// ── FAQ ───────────────────────────────────────────────────────────────────────

const FAQS = [
  { question: "What is an AI lead finder agent?", answer: "It's an AI agent that researches your ideal customer profile, finds matching companies and contacts from across the web and data sources, enriches each lead with verified contact details and company context, and delivers them into your CRM automatically — every day." },
  { question: "How does it find leads?", answer: "We configure the agent with your ICP criteria — industry, company size, role, tech stack, and intent signals. It then searches across data sources and the web to find companies and contacts that match, enriches the data, deduplicates against your existing records, and pushes verified leads into your CRM." },
  { question: "How is this different from buying a lead list?", answer: "Lead lists are static, unverified, and shared with everyone. This agent finds leads specific to your exact ICP, enriches them with current data, deduplicates against your pipeline, and delivers a fresh set every day — so you always have current, relevant prospects." },
  { question: "Which CRMs does it integrate with?", answer: "HubSpot and Salesforce out of the box. We can connect it to most CRMs and outbound tools — including Apollo, Outreach, and Pipedrive." },
  { question: "How much does it cost?", answer: "A lead finder is a custom agent, so it starts on the Solo plan at $49 a month. To have it run on its own schedule and deliver new leads every day, pick Grow at $99 a month. Every plan is on our pricing page at talktomedata.com/pricing." },
  { question: "How long does it take to go live?", answer: "Most lead finder agents are live within days. After a short discovery call, we build, integrate, and deploy it for you — nothing to install on your side." },
  { question: "Do I need to manage AI accounts or data subscriptions?", answer: "No. We bundle and manage all data source access and model costs on our infrastructure. You get a working agent and a pipeline that fills itself — no subscriptions to manage." },
]

// ── Structured data ───────────────────────────────────────────────────────────

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${PAGE_URL}#service`,
      name: "Lead Finder AI Agent",
      serviceType: "Lead Finder AI Agent",
      description:
        "A custom AI lead finder agent that researches your ideal customer profile, finds matching companies and contacts, enriches their data, and delivers verified leads into your CRM automatically.",
      url: PAGE_URL,
      provider: { "@type": "Organization", name: "Talk to Me Data", url: BASE_URL },
      areaServed: "Worldwide",
    },
    {
      "@type": "FAQPage",
      "@id": `${PAGE_URL}#faq`,
      mainEntity: FAQS.map(faq => ({
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
        { "@type": "ListItem", position: 2, name: "Lead finder", item: PAGE_URL },
      ],
    },
  ],
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function LeadFinderPage() {
  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main>
        <LeadFinderHero />
        <ToolStrip />
        <LeadFinderDifference />
        <LeadFinderHowItWorks />
        <LeadFinderQuotes />
        <AgentGuidesSection agentHref="/agents/lead-finder" />
        <FAQSection eyebrow="FAQ" heading="Questions about the lead finder agent" items={FAQS} />
        <LeadFinderFinalCta />
      </main>
      <Footer />
    </div>
  )
}

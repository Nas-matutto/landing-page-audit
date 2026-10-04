import { OG_IMAGE } from "@/lib/og"
import { AgentGuidesSection } from "@/components/blog/agent-guides-section"
import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FAQSection } from "@/components/sections/faq-section"
import {
  DataEntryDifference,
  DataEntryFinalCta,
  DataEntryHero,
  DataEntryHowItWorks,
  DataEntryJobs,
  DataEntryToolStrip,
} from "@/components/sections/data-entry/sections"

const BASE_URL = "https://talktomedata.com"
const PAGE_URL = `${BASE_URL}/agents/data-entry-reporting`

const TITLE = "AI Data Entry & Reporting Agent: Built, Hosted & Managed | Talk to me Data"
const DESCRIPTION =
  "A custom AI data entry and reporting agent that pulls data from your tools, cleans and structures it, and sends ready-to-share reports on your schedule. We build, host and manage it."

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "ai data entry agent",
    "ai reporting agent",
    "automate data entry",
    "automated reporting ai",
    "ai data automation",
    "business intelligence automation",
    "ai agent for reporting",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    images: [OG_IMAGE],
    title: TITLE,
    description: DESCRIPTION,
    type: "article",
    url: PAGE_URL,
    siteName: "Talk to me Data",
    publishedTime: "2026-06-25",
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
    question: "What is an AI data entry and reporting agent?",
    answer:
      "It's an AI agent that connects to your business tools, pulls data on a schedule, cleans and structures it, and writes formatted reports for you. It sends them to your inbox, Slack or Google Drive, so nobody has to build them by hand.",
  },
  {
    question: "Which tools can it connect to?",
    answer:
      "Most business tools: CRMs like HubSpot and Salesforce, stores like Shopify, ad platforms like Meta and Google Ads, payment tools like Stripe, analytics like GA4, and spreadsheets. We set up every connection for you.",
  },
  {
    question: "Can it replace manual data entry?",
    answer:
      "Yes, for structured, repetitive data work. If your team copies data from forms, emails or one tool into another, the agent can do it for you, and clean and format the data before it lands.",
  },
  {
    question: "What do the reports look like?",
    answer:
      "We build them around the format you already use: weekly summaries, client reports, KPI trackers. You get a formatted document, spreadsheet or message, delivered wherever your team works.",
  },
  {
    question: "How much does it cost?",
    answer:
      "A reporting agent is a custom agent, so it starts on the Solo plan at $49 a month. To have it run on its own schedule and send reports without being asked, pick Grow at $99 a month. Every plan is on our pricing page at talktomedata.com/pricing.",
  },
  {
    question: "How long does it take to go live?",
    answer:
      "Most data entry and reporting agents are live within days. After a short discovery call, we build, connect and deploy it for you. There's nothing to install on your side.",
  },
  {
    question: "Do I need to manage API connections or data tools?",
    answer:
      "No. We manage every connection, data source and model cost on our infrastructure. You get accurate reports on schedule, with no technical setup.",
  },
]

// ── Structured data ───────────────────────────────────────────────────────────

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${PAGE_URL}#service`,
      name: "Data Entry & Reporting AI Agent",
      serviceType: "Data Entry & Reporting AI Agent",
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
        { "@type": "ListItem", position: 2, name: "Data entry & reporting", item: PAGE_URL },
      ],
    },
  ],
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function DataEntryReportingPage() {
  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main>
        <DataEntryHero />
        <DataEntryToolStrip />
        <DataEntryDifference />
        <DataEntryHowItWorks />
        <DataEntryJobs />
        <AgentGuidesSection agentHref="/agents/data-entry-reporting" />
        <FAQSection eyebrow="FAQ" heading="Questions about the reporting agent" items={FAQS} />
        <DataEntryFinalCta />
      </main>
      <Footer />
    </div>
  )
}

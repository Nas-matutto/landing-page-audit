import type { Metadata } from "next"
import { BarChart3, FileBarChart, Layers, Plug } from "lucide-react"
import { SiGooglesheets, SiHubspot, SiShopify, SiStripe } from "react-icons/si"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AgentHeroSection } from "@/components/sections/agent-detail/agent-hero-section"
import { AgentOverviewSection } from "@/components/sections/agent-detail/agent-overview-section"
import { AgentWorkflowSection } from "@/components/sections/agent-detail/agent-workflow-section"
import { AgentUseCasesSection } from "@/components/sections/agent-detail/agent-use-cases-section"
import { AgentHowWeBuildSection } from "@/components/sections/agent-detail/agent-how-we-build-section"
import { AgentImpactSection } from "@/components/sections/agent-detail/agent-impact-section"
import { AgentWhyUsSection } from "@/components/sections/agent-detail/agent-why-us-section"
import { AgentFaqSection } from "@/components/sections/agent-detail/agent-faq-section"
import { AgentCtaSection } from "@/components/sections/agent-detail/agent-cta-section"

const BASE_URL = "https://talktomedata.com"
const PAGE_URL = `${BASE_URL}/agents/data-entry-reporting`

export const metadata: Metadata = {
  title: "AI Data Entry & Reporting Agent — Built, Hosted & Managed | Talk to Me Data",
  description:
    "A custom AI data entry and reporting agent that pulls data from your tools, cleans and structures it, and generates ready-to-share reports automatically. We build, host, and manage it. Live in days.",
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
    title: "AI Data Entry & Reporting Agent — Built, Hosted & Managed | Talk to Me Data",
    description:
      "A custom AI data entry and reporting agent that pulls data from your tools, cleans and structures it, and generates ready-to-share reports automatically. We build, host, and manage it. Live in days.",
    type: "article",
    url: PAGE_URL,
    siteName: "Talk to Me Data",
    publishedTime: "2026-06-25",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Data Entry & Reporting Agent — Built, Hosted & Managed | Talk to Me Data",
    description:
      "A custom AI data entry and reporting agent that pulls data from your tools, cleans and structures it, and generates ready-to-share reports automatically. We build, host, and manage it. Live in days.",
  },
}

// ── Content ───────────────────────────────────────────────────────────────────

const GRADIENT = "linear-gradient(135deg, #0c4a6e 0%, #0284c7 55%, #7dd3fc 100%)"

const IMPACT = [
  { stat: "10+ hours", label: "typically saved per week on manual data work" },
  { stat: "Always current", label: "reports delivered automatically on your schedule" },
  { stat: "Days, not months", label: "from brief to a live reporting agent" },
]

const OVERVIEW = [
  "An AI data entry and reporting agent connects to the tools your business already uses — your CRM, e-commerce platform, ad accounts, spreadsheets, and more — pulls the relevant data on a schedule, cleans and structures it, and generates formatted reports ready to share with your team or clients.",
  "It's built for teams drowning in manual data work: agency owners compiling client reports, operations teams tracking KPIs across multiple platforms, or founders who want a weekly dashboard without hiring a data analyst. The agent does the extraction, transformation, and formatting automatically, so reporting is always up to date and never late.",
]

const WORKFLOW_STEPS = [
  {
    Icon: Plug,
    step: "01",
    title: "Connect your tools",
    description: "The agent pulls data from your CRM, ad platforms, e-commerce store, and spreadsheets automatically on a set schedule.",
  },
  {
    Icon: Layers,
    step: "02",
    title: "Clean & structure",
    description: "Raw data is normalised, deduplicated, and formatted — ready for analysis without any manual cleanup.",
  },
  {
    Icon: FileBarChart,
    step: "03",
    title: "Generate & deliver",
    description: "Formatted reports land in your inbox, Slack channel, or Google Drive automatically at the cadence you set.",
  },
]

const WORKFLOW_LOGOS = [
  { Icon: SiShopify, color: "#96BF48", label: "Shopify" },
  { Icon: SiGooglesheets, color: "#34A853", label: "Google Sheets" },
  { Icon: SiHubspot, color: "#FF7A59", label: "HubSpot" },
  { Icon: SiStripe, color: "#635BFF", label: "Stripe" },
]

const USE_CASES = [
  { title: "Automated data extraction", description: "Pulls data from your CRM, ad platforms, e-commerce store, and spreadsheets on a set schedule." },
  { title: "Data cleaning & structuring", description: "Normalises, deduplicates, and formats raw data so it's ready for analysis without manual cleanup." },
  { title: "Report generation", description: "Produces formatted, ready-to-share reports — weekly summaries, monthly dashboards, client reports." },
  { title: "Multi-source consolidation", description: "Combines data from different tools into a single view — no more copying between platforms." },
  { title: "Scheduled delivery", description: "Sends reports to your inbox, Slack, or Google Drive automatically at the cadence you set." },
  { title: "Data entry automation", description: "Moves structured data between systems — from forms to CRM, from orders to spreadsheets — without manual copying." },
]

const HOW_WE_BUILD = [
  { title: "Discovery", description: "You walk us through your current reporting workflow and the data sources you use — in one short call." },
  { title: "Build & integrate", description: "We connect the agent to your tools and configure the data extraction, transformation, and report templates." },
  { title: "Deploy & host", description: "The agent runs on a schedule on our infrastructure, pulling, processing, and delivering reports automatically." },
  { title: "Monitor & improve", description: "We monitor data quality, add new sources as needed, and refine reports as your business evolves." },
]

const WHY_US = [
  { title: "We handle the API costs", description: "All data source connections and model usage are managed on our side — no subscriptions or API bills." },
  { title: "Custom integrations included", description: "We connect the agent to your tools — Shopify, HubSpot, Google Sheets, Meta Ads, Stripe, and more." },
  { title: "Hosted & monitored for you", description: "It runs on our infrastructure on your chosen schedule, with monitoring to catch any data issues." },
  { title: "Built around your workflow", description: "Reports are structured and formatted the way your team already works — not a generic template." },
]

const FAQS = [
  { q: "What is an AI data entry and reporting agent?", a: "It's an AI agent that connects to your business tools, pulls data on a schedule, cleans and structures it, and generates formatted reports automatically — delivering them to your inbox, Slack, or Google Drive without manual work." },
  { q: "Which tools can it connect to?", a: "We can connect it to most business tools: CRMs like HubSpot and Salesforce, e-commerce platforms like Shopify, ad platforms like Meta and Google Ads, payment tools like Stripe, spreadsheets, and more. We handle all the integrations." },
  { q: "Can it replace manual data entry?", a: "Yes, for structured, repetitive data work. If your team currently copies data from forms, emails, or one platform into another, this agent can handle that automatically — including cleaning and formatting the data before it lands." },
  { q: "What do the reports look like?", a: "We build them around your existing reporting format — weekly summaries, client-ready dashboards, KPI trackers. The output is a formatted document, spreadsheet, or message delivered wherever your team works." },
  { q: "How long does it take to go live?", a: "Most data entry and reporting agents are live within days. After a short discovery call, we build, integrate, and deploy it for you — nothing to install on your side." },
  { q: "Do I need to manage API connections or data tools?", a: "No. We manage all integrations, data source access, and model costs on our infrastructure. You get accurate reports delivered automatically — no technical setup required." },
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
      description:
        "A custom AI data entry and reporting agent that pulls data from your tools, cleans and structures it, and generates ready-to-share reports automatically.",
      url: PAGE_URL,
      provider: { "@type": "Organization", name: "Talk to Me Data", url: BASE_URL },
      areaServed: "Worldwide",
    },
    {
      "@type": "FAQPage",
      "@id": `${PAGE_URL}#faq`,
      mainEntity: FAQS.map(faq => ({
        "@type": "Question",
        name: faq.q,
        acceptedAnswer: { "@type": "Answer", text: faq.a },
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
        <AgentHeroSection
          title="Data entry & reporting"
          gradient={GRADIENT}
          Icon={BarChart3}
          heroSubhead="An agent that pulls data from across your tools, cleans and structures it, and delivers accurate reports on a schedule — so your team spends time on decisions, not spreadsheets."
          impact={IMPACT}
          showBreadcrumb={false}
          showHeroStats={false}
        />
        <AgentOverviewSection paragraphs={OVERVIEW} />
        <AgentWorkflowSection
          heading="Accurate data, zero manual work"
          steps={WORKFLOW_STEPS}
          logos={WORKFLOW_LOGOS}
          logoSuffix="+ most business tools"
        />
        <AgentUseCasesSection agentTitle="Data entry & reporting" useCases={USE_CASES} />
        <AgentHowWeBuildSection steps={HOW_WE_BUILD} />
        <AgentImpactSection stats={IMPACT} />
        <AgentWhyUsSection items={WHY_US} />
        <AgentFaqSection faqs={FAQS} />
        <AgentCtaSection agentTitle="data entry & reporting" />
      </main>
      <Footer />
    </div>
  )
}

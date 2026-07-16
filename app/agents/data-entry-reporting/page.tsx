import type { Metadata } from "next"
import { BarChart3, FileBarChart, Layers, Plug, Combine, Clock, Table2 } from "lucide-react"
import { SiGooglesheets, SiHubspot, SiShopify, SiStripe, SiSlack, SiGoogleanalytics } from "react-icons/si"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AgentHeroSection } from "@/components/sections/agent-detail/agent-hero-section"
import { AgentTrustBand } from "@/components/sections/agent-detail/agent-trust-band"
import { AgentIntegrationsSection } from "@/components/sections/agent-detail/agent-integrations-section"
import { AgentOverviewSection } from "@/components/sections/agent-detail/agent-overview-section"
import { AgentWorkflowSection } from "@/components/sections/agent-detail/agent-workflow-section"
import { AgentUseCasesSection } from "@/components/sections/agent-detail/agent-use-cases-section"
import { AgentHowWeBuildSection } from "@/components/sections/agent-detail/agent-how-we-build-section"
import { AgentTestimonialsSection, type Testimonial } from "@/components/sections/agent-detail/agent-testimonials-section"
import { AgentWhyUsSection } from "@/components/sections/agent-detail/agent-why-us-section"
import { AgentFaqSection } from "@/components/sections/agent-detail/agent-faq-section"
import { AgentCtaSection } from "@/components/sections/agent-detail/agent-cta-section"
import { AgentSavingsCalculator } from "@/components/agent-savings-calculator"
import { DashboardMock, ConfigMock, ListMock, SyncMock } from "@/components/sections/agent-detail/mockups/agent-mocks"

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

const TRUST_STATS = [
  { value: "10+ hours", label: "saved / week" },
  { value: "Always current", label: "auto-delivered on schedule" },
  { value: "Days", label: "from brief to live" },
  { value: "Most tools", label: "CRM, ads, e-comm & more" },
]

const INTEGRATIONS = [
  { Icon: SiShopify, color: "#96BF48", label: "Shopify" },
  { Icon: SiGooglesheets, color: "#34A853", label: "Google Sheets" },
  { Icon: SiHubspot, color: "#FF7A59", label: "HubSpot" },
  { Icon: SiStripe, color: "#635BFF", label: "Stripe" },
  { Icon: SiGoogleanalytics, color: "#E37400", label: "GA4" },
  { Icon: SiSlack, color: "#4A154B", label: "Slack" },
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
    mockup: (
      <ConfigMock
        title="Connected sources"
        Icon={Plug}
        rows={[
          { label: "E-commerce", tags: ["Shopify", "Stripe"] },
          { label: "CRM", tags: ["HubSpot"] },
          { label: "Ads", tags: ["Meta Ads", "Google Ads"] },
          { label: "Sheets", tags: ["Google Sheets"] },
        ]}
      />
    ),
  },
  {
    Icon: Layers,
    step: "02",
    title: "Clean & structure",
    description: "Raw data is normalised, deduplicated, and formatted — ready for analysis without any manual cleanup.",
    mockup: (
      <ListMock
        title="Processing"
        Icon={Layers}
        count="12,480 rows"
        items={[
          { title: "Deduplicated", sub: "318 duplicates removed", badge: "Done", badgeTone: "green" },
          { title: "Normalised", sub: "Dates, currencies, names", badge: "Done", badgeTone: "green" },
          { title: "Validated", sub: "41 issues flagged", badge: "Review", badgeTone: "amber" },
        ]}
      />
    ),
  },
  {
    Icon: FileBarChart,
    step: "03",
    title: "Generate & deliver",
    description: "Formatted reports land in your inbox, Slack channel, or Google Drive automatically at the cadence you set.",
    mockup: (
      <SyncMock
        ToolIcon={SiSlack}
        toolColor="#4A154B"
        toolLabel="Delivered to Slack"
        note="every Monday 8am"
        rows={[
          { name: "Weekly KPI report", sub: "PDF · 6 pages" },
          { name: "Client dashboard", sub: "Acme Co." },
        ]}
        footerLabel="Reports delivered"
        footerValue="48"
      />
    ),
  },
]

const WORKFLOW_LOGOS = [
  { Icon: SiShopify, color: "#96BF48", label: "Shopify" },
  { Icon: SiGooglesheets, color: "#34A853", label: "Google Sheets" },
  { Icon: SiHubspot, color: "#FF7A59", label: "HubSpot" },
  { Icon: SiStripe, color: "#635BFF", label: "Stripe" },
]

const USE_CASES = [
  { Icon: Plug, title: "Automated data extraction", description: "Pulls data from your CRM, ad platforms, e-commerce store, and spreadsheets on a set schedule." },
  { Icon: Layers, title: "Data cleaning & structuring", description: "Normalises, deduplicates, and formats raw data so it's ready for analysis without manual cleanup." },
  { Icon: FileBarChart, title: "Report generation", description: "Produces formatted, ready-to-share reports — weekly summaries, monthly dashboards, client reports." },
  { Icon: Combine, title: "Multi-source consolidation", description: "Combines data from different tools into a single view — no more copying between platforms." },
  { Icon: Clock, title: "Scheduled delivery", description: "Sends reports to your inbox, Slack, or Google Drive automatically at the cadence you set." },
  { Icon: Table2, title: "Data entry automation", description: "Moves structured data between systems — from forms to CRM, from orders to spreadsheets — without manual copying." },
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

// SCAFFOLD: add real customer quotes here and the section renders automatically.
const TESTIMONIALS: Testimonial[] = []

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
          tag="AI Agents managed for you"
          heroSubhead="An agent that pulls data from across your tools, cleans and structures it, and delivers accurate reports on a schedule — so your team spends time on decisions, not spreadsheets."
          impact={IMPACT}
          showBreadcrumb={false}
          showHeroStats={false}
          visual={
            <DashboardMock
              browser="app.talktomedata.com/reports"
              title="Weekly report"
              subtitle="Auto-compiled from all your tools"
              badge={{ label: "Delivered", tone: "green" }}
              rows={[
                { name: "Revenue", meta: "$48,230", status: "+12%", tone: "green" },
                { name: "New customers", meta: "312", status: "+8%", tone: "green" },
                { name: "Ad spend", meta: "$9,120", status: "-4%", tone: "amber" },
                { name: "Conversion rate", meta: "3.4%", status: "+0.3pt", tone: "green" },
              ]}
            />
          }
          ctaLabel="Get started"
          ctaHref="/get-started"
          ctaNote="Takes 2 minutes · Live in days"
        />
        <AgentTrustBand stats={TRUST_STATS} />
        <AgentIntegrationsSection logos={INTEGRATIONS} suffix="+ most business tools" />
        <AgentOverviewSection paragraphs={OVERVIEW} />
        <AgentWorkflowSection
          heading="Accurate data, zero manual work"
          steps={WORKFLOW_STEPS}
          logos={WORKFLOW_LOGOS}
          logoSuffix="+ most business tools"
        />
        <AgentUseCasesSection agentTitle="Data entry & reporting" useCases={USE_CASES} />
        <AgentCtaSection
          agentTitle="data entry & reporting"
          heading="Ready to stop building reports by hand?"
          subheading="Tell us your data sources and format — we'll build an agent that compiles and delivers your reports automatically."
          ctaLabel="Get started"
          ctaHref="/get-started"
          note="Takes 2 minutes · No commitment"
        />
        <AgentHowWeBuildSection steps={HOW_WE_BUILD} />
        <section className="py-20 sm:py-24 bg-slate-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-4">What it saves</p>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 text-balance">
                See how many hours you&apos;ll get back
              </h2>
            </div>
            <AgentSavingsCalculator
              question="How many reports do you compile per month?"
              unitLabel="reports"
              min={4}
              max={200}
              step={2}
              defaultValue={20}
              period="month"
              manualMinsPer={90}
              aiSecsPer={120}
              manualNote="Pulling & formatting each report by hand at ~90 min"
              aiNote="The agent compiles & delivers — you just read"
              savedNoun="of reporting time"
              disclaimer="Based on ~90 min to compile a report manually vs the agent generating it automatically. Actual results vary by data sources."
            />
          </div>
        </section>
        <AgentTestimonialsSection testimonials={TESTIMONIALS} />
        <AgentWhyUsSection items={WHY_US} />
        <AgentFaqSection faqs={FAQS} />
        <AgentCtaSection
          agentTitle="data entry & reporting"
          subheading="Tell us what you want to automate and we'll show you exactly what your reporting agent can do — built, hosted, and managed for you."
          ctaLabel="Get started"
          ctaHref="/get-started"
          note="Takes 2 minutes · No commitment"
        />
      </main>
      <Footer />
    </div>
  )
}

import type { Metadata } from "next"
import { Camera, Database, Receipt, ScanLine } from "lucide-react"
import { SiQuickbooks, SiSage, SiXero, SiZoho, SiGmail } from "react-icons/si"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { InvoiceSavingsCalculator } from "@/components/invoice-savings-calculator"
import { AgentHeroSection } from "@/components/sections/agent-detail/agent-hero-section"
import { AgentTrustBand } from "@/components/sections/agent-detail/agent-trust-band"
import { AgentIntegrationsSection } from "@/components/sections/agent-detail/agent-integrations-section"
import { AgentOverviewSection } from "@/components/sections/agent-detail/agent-overview-section"
import { AgentDemoVideoSection } from "@/components/sections/agent-detail/agent-demo-video-section"
import { AgentWorkflowSection } from "@/components/sections/agent-detail/agent-workflow-section"
import { AgentHowWeBuildSection } from "@/components/sections/agent-detail/agent-how-we-build-section"
import { AgentTestimonialsSection, type Testimonial } from "@/components/sections/agent-detail/agent-testimonials-section"
import { AgentWhyUsSection } from "@/components/sections/agent-detail/agent-why-us-section"
import { AgentFaqSection } from "@/components/sections/agent-detail/agent-faq-section"
import { AgentCtaSection } from "@/components/sections/agent-detail/agent-cta-section"
import { DashboardMock, ListMock, ConfigMock, SyncMock } from "@/components/sections/agent-detail/mockups/agent-mocks"

const BASE_URL = "https://talktomedata.com"
const PAGE_URL = `${BASE_URL}/agents/invoice-processing`

export const metadata: Metadata = {
  title: "AI Invoice Processing Agent — Built, Hosted & Managed | Talk to Me Data",
  description:
    "A custom AI invoice processing agent that reads incoming invoices, extracts data, matches against POs, flags discrepancies, and routes for approval — automatically. We build, host, and manage it. Live in days.",
  keywords: [
    "ai invoice processing agent",
    "automate invoice processing",
    "ai accounts payable automation",
    "invoice data extraction ai",
    "automated invoice approval",
    "ai agent for invoices",
    "purchase order matching automation",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "AI Invoice Processing Agent — Built, Hosted & Managed | Talk to Me Data",
    description:
      "A custom AI invoice processing agent that reads incoming invoices, extracts data, matches against POs, flags discrepancies, and routes for approval — automatically. We build, host, and manage it. Live in days.",
    type: "article",
    url: PAGE_URL,
    siteName: "Talk to Me Data",
    publishedTime: "2026-06-30",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Invoice Processing Agent — Built, Hosted & Managed | Talk to Me Data",
    description:
      "A custom AI invoice processing agent that reads incoming invoices, extracts data, matches against POs, flags discrepancies, and routes for approval — automatically. We build, host, and manage it. Live in days.",
  },
}

// ── Content ───────────────────────────────────────────────────────────────────

const GRADIENT = "linear-gradient(135deg, #1e3a8a 0%, #3730a3 55%, #6366f1 100%)"

const IMPACT = [
  { stat: "Up to 90%", label: "faster end-to-end invoice processing" },
  { stat: "Near-zero", label: "manual data entry for standard invoices" },
  { stat: "Days, not months", label: "from brief to a live invoice processing agent" },
]

const TRUST_STATS = [
  { value: "Up to 90%", label: "faster processing" },
  { value: "Near-zero", label: "manual data entry" },
  { value: "Days", label: "from brief to live" },
  { value: "Any ERP", label: "QuickBooks, Xero & more" },
]

const INTEGRATIONS = [
  { Icon: SiQuickbooks, color: "#2CA01C", label: "QuickBooks" },
  { Icon: SiXero, color: "#13B5EA", label: "Xero" },
  { Icon: SiSage, color: "#00D639", label: "Sage" },
  { Icon: SiZoho, color: "#E42527", label: "Zoho Books" },
  { Icon: SiGmail, color: "#EA4335", label: "Gmail" },
]

const OVERVIEW = [
  "An AI invoice processing agent reads incoming invoices in any format - PDF, email attachment, or scanned document - extracts the key data fields, cross-references them against your purchase orders and supplier records, and routes each invoice through your approval workflow automatically. Exceptions and mismatches get flagged before they become problems.",
  "It's built for finance and operations teams spending hours every week on manual data entry, chasing approvals, and reconciling supplier statements. Whether you process tens or hundreds of invoices a month, the agent handles the repetitive work so your team focuses on the exceptions that actually need human judgement.",
]

const WORKFLOW_STEPS = [
  {
    Icon: Camera,
    step: "01",
    title: "Take a photo",
    description: "Snap the invoice on your phone or forward the PDF to a dedicated email address.",
    mockup: (
      <ListMock
        title="Incoming invoices"
        Icon={Camera}
        count="3 new"
        items={[
          { title: "Acme Supplies", sub: "INV-4821 · PDF", badge: "New", badgeTone: "blue" },
          { title: "Globex Ltd", sub: "Emailed · Photo", badge: "New", badgeTone: "blue" },
          { title: "Initech", sub: "INV-2290 · Scan", badge: "New", badgeTone: "blue" },
        ]}
      />
    ),
  },
  {
    Icon: ScanLine,
    step: "02",
    title: "AI reads & extracts",
    description:
      "The agent reads the invoice in seconds — vendor, line items, amounts, due date — no matter the format.",
    mockup: (
      <ConfigMock
        title="Extracted fields"
        Icon={ScanLine}
        rows={[
          { label: "Vendor", tags: ["Acme Supplies"] },
          { label: "Invoice #", tags: ["INV-4821"] },
          { label: "Amount", tags: ["$1,240.00"] },
          { label: "Due date", tags: ["30 Jul 2026"] },
          { label: "PO match", tags: ["✓ PO-8830"] },
        ]}
      />
    ),
  },
  {
    Icon: Database,
    step: "03",
    title: "Added to your system",
    description: "The extracted data is pushed directly into your accounting software, ready for approval.",
    mockup: (
      <SyncMock
        ToolIcon={SiQuickbooks}
        toolColor="#2CA01C"
        toolLabel="Posted to QuickBooks"
        note="2 flagged"
        rows={[
          { name: "Acme Supplies", sub: "INV-4821 · $1,240" },
          { name: "Globex Ltd", sub: "INV-3120 · $860" },
        ]}
        footerLabel="Processed this month"
        footerValue="486"
      />
    ),
  },
]

const WORKFLOW_LOGOS = [
  { Icon: SiQuickbooks, color: "#2CA01C", label: "QuickBooks" },
  { Icon: SiXero, color: "#13B5EA", label: "Xero" },
  { Icon: SiSage, color: "#00D639", label: "Sage" },
  { Icon: SiZoho, color: "#E42527", label: "Zoho Books" },
]

const HOW_WE_BUILD = [
  { title: "Discovery", description: "You walk us through your current invoice flow — formats, approval rules, and the systems you use — in one short call." },
  { title: "Build & integrate", description: "We configure the agent's extraction and matching logic, then connect it to your email inbox, ERP, and accounting tools." },
  { title: "Deploy & host", description: "The agent runs on our infrastructure, processing invoices as they arrive — nothing to install or maintain on your end." },
  { title: "Monitor & improve", description: "We monitor extraction accuracy, tune the matching rules, and add new suppliers or formats as your business evolves." },
]

const WHY_US = [
  { title: "We handle the API costs", description: "Document processing and model usage are bundled and managed on our side — no AI accounts or usage bills." },
  { title: "Custom integrations included", description: "We connect the agent to your inbox, ERP, and accounting tools — QuickBooks, Xero, NetSuite, SAP, and more." },
  { title: "Hosted & monitored for you", description: "It runs on our infrastructure with continuous monitoring, so every invoice gets processed reliably." },
  { title: "Tuned to your approval rules", description: "We configure routing logic to match your real workflow — by amount, supplier, department, or any other rule." },
]

// SCAFFOLD: add real customer quotes here and the section renders automatically.
const TESTIMONIALS: Testimonial[] = []

const FAQS = [
  { q: "What is an AI invoice processing agent?", a: "It's an AI agent that reads incoming invoices in any format, extracts the key data fields, matches them against your purchase orders, flags discrepancies, and routes each invoice through your approval workflow automatically — with no manual data entry." },
  { q: "What invoice formats does it handle?", a: "PDF attachments, scanned documents, and email-based invoices. The agent reads structured and unstructured layouts — you don't need suppliers to send invoices in a specific template." },
  { q: "How does PO matching work?", a: "Once the agent extracts the invoice data, it compares the vendor, line items, quantities, and amounts against your existing purchase orders. Matches are routed for approval; mismatches are flagged and held for a human to review before any payment is made." },
  { q: "Which accounting systems and ERPs does it connect to?", a: "We can integrate it with QuickBooks, Xero, NetSuite, SAP, and most other accounting tools and ERPs. We handle the integration — you don't need to configure any APIs." },
  { q: "How long does it take to go live?", a: "Most invoice processing agents are live within days. After a short discovery call to understand your formats and approval rules, we build, integrate, and deploy it for you." },
  { q: "Do I need to manage AI accounts or API keys?", a: "No. We manage all model access, document processing costs, and infrastructure on our side. You get a working agent — no DevOps and no usage bills." },
]

// ── Structured data ───────────────────────────────────────────────────────────

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${PAGE_URL}#service`,
      name: "Invoice Processing AI Agent",
      serviceType: "Invoice Processing AI Agent",
      description:
        "A custom AI invoice processing agent that reads incoming invoices, extracts data, matches against POs, flags discrepancies, and routes for approval — automatically.",
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
        { "@type": "ListItem", position: 2, name: "Invoice processing", item: PAGE_URL },
      ],
    },
  ],
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function InvoiceProcessingPage() {
  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main>
        <AgentHeroSection
          title="Invoice processing"
          gradient={GRADIENT}
          Icon={Receipt}
          tag="AI Agents managed for you"
          heroSubhead="An agent that reads every incoming invoice, extracts the data and adds it to your Accounting software - fully built, hosted, and managed by us."
          impact={IMPACT}
          showBreadcrumb={false}
          showHeroStats={false}
          visual={
            <DashboardMock
              browser="app.talktomedata.com/invoices"
              title="Invoices this month"
              subtitle="Read, matched & posted automatically"
              badge={{ label: "12 posted today", tone: "green" }}
              rows={[
                { name: "Acme Supplies", sub: "INV-4821 · $1,240", status: "Matched", tone: "green" },
                { name: "Globex Ltd", sub: "INV-3120 · $860", status: "Matched", tone: "green" },
                { name: "Initech", sub: "INV-2290 · $3,410", status: "Flagged", tone: "amber" },
                { name: "Umbrella Co", sub: "INV-7781 · $540", status: "Matched", tone: "green" },
              ]}
            />
          }
          ctaLabel="Get started"
          ctaHref="/get-started"
          ctaNote="Takes 2 minutes · Live in days"
        />
        <AgentTrustBand stats={TRUST_STATS} />
        <AgentIntegrationsSection logos={INTEGRATIONS} suffix="+ any ERP or accounting tool" />
        <AgentOverviewSection paragraphs={OVERVIEW} />
        <AgentDemoVideoSection
          youtubeEmbedUrl="https://www.youtube.com/embed/FKCW-EJV29Q?rel=0"
          title="Invoice Processing AI Agent — 45 Second Demo"
        />
        <AgentWorkflowSection
          heading="Photo to system in under 30 seconds"
          steps={WORKFLOW_STEPS}
          logos={WORKFLOW_LOGOS}
          logoSuffix="+ any ERP or accounting tool"
        />
        <AgentHowWeBuildSection steps={HOW_WE_BUILD} />
        <section className="py-20 sm:py-24 bg-slate-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-4">What it saves</p>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 text-balance">
                See how much time you&apos;ll get back
              </h2>
            </div>
            <InvoiceSavingsCalculator />
          </div>
        </section>
        <AgentCtaSection
          agentTitle="invoice processing"
          heading="Ready to stop keying in invoices?"
          subheading="Tell us your formats and approval rules — we'll build an agent that reads, matches, and posts every invoice for you."
          ctaLabel="Get started"
          ctaHref="/get-started"
          note="Takes 2 minutes · No commitment"
        />
        <AgentTestimonialsSection testimonials={TESTIMONIALS} />
        <AgentWhyUsSection items={WHY_US} />
        <AgentFaqSection faqs={FAQS} />
        <AgentCtaSection
          agentTitle="invoice processing"
          subheading="Tell us what you want to automate and we'll show you exactly what your invoice processing agent can do — built, hosted, and managed for you."
          ctaLabel="Get started"
          ctaHref="/get-started"
          note="Takes 2 minutes · No commitment"
        />
      </main>
      <Footer />
    </div>
  )
}

import type { Metadata } from "next"
import { Database, Search, Target } from "lucide-react"
import { SiHubspot, SiSalesforce } from "react-icons/si"
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
    title: "AI Lead Finder Agent - Built, Hosted & Managed | Talk to Me Data",
    description:
      "A custom AI lead finder agent that researches your ideal customer profile, finds matching companies and contacts, enriches their data, and delivers verified leads into your CRM automatically. We build, host, and manage it.",
    type: "article",
    url: PAGE_URL,
    siteName: "Talk to Me Data",
    publishedTime: "2026-06-25",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Lead Finder Agent - Built, Hosted & Managed | Talk to Me Data",
    description:
      "A custom AI lead finder agent that researches your ideal customer profile, finds matching companies and contacts, enriches their data, and delivers verified leads into your CRM automatically. We build, host, and manage it.",
  },
}

// ── Content ───────────────────────────────────────────────────────────────────

const GRADIENT = "linear-gradient(135deg, #064e3b 0%, #059669 55%, #6ee7b7 100%)"

const IMPACT = [
  { stat: "50–200", label: "verified leads typically delivered per week" },
  { stat: "Hours saved", label: "weekly on manual prospecting and research" },
  { stat: "Days, not months", label: "from brief to a live lead finder agent" },
]

const OVERVIEW = [
  "An AI lead finder agent starts with your ideal customer profile — the industries, company sizes, roles, and signals that indicate a strong fit — and then goes to work finding real companies and contacts that match. It enriches each lead with contact details, company context, and intent signals, and pushes them into your CRM ready for outreach.",
  "It's built for B2B teams who know who they want to sell to but don't have the time to research and source prospects manually. Instead of SDRs spending hours on LinkedIn and data tools, the agent runs that process daily in the background, delivering a consistent stream of warm, verified leads.",
]

const WORKFLOW_STEPS = [
  {
    Icon: Target,
    step: "01",
    title: "Define your ICP",
    description: "We configure the agent with your ideal customer profile — industry, company size, role, tech stack, and buying intent signals.",
  },
  {
    Icon: Search,
    step: "02",
    title: "Research & find matches",
    description: "The agent searches across data sources and the web, identifying companies and contacts that match your criteria daily.",
  },
  {
    Icon: Database,
    step: "03",
    title: "Enrich & deliver to CRM",
    description: "Leads are enriched with verified contact details and company context, then pushed into your CRM ready for outreach.",
  },
]

const WORKFLOW_LOGOS = [
  { Icon: SiHubspot, color: "#FF7A59", label: "HubSpot" },
  { Icon: SiSalesforce, color: "#00A1E0", label: "Salesforce" },
]

const USE_CASES = [
  { title: "ICP matching", description: "Finds companies that match your ideal customer profile by industry, size, tech stack, and growth signals." },
  { title: "Contact discovery", description: "Identifies the right decision-makers at each company — with name, role, and verified contact details." },
  { title: "Data enrichment", description: "Appends company context, LinkedIn URLs, firmographics, and intent signals to each lead automatically." },
  { title: "CRM delivery", description: "Pushes enriched leads straight into HubSpot, Salesforce, or your pipeline — ready for outreach." },
  { title: "Daily prospecting", description: "Runs on a schedule so new leads arrive in your CRM every day without manual work." },
  { title: "List deduplication", description: "Checks against existing contacts so you never import a lead that's already in your pipeline." },
]

const HOW_WE_BUILD = [
  { title: "Discovery", description: "You describe your ideal customer — industry, size, role, and any signals that indicate fit — in a short call." },
  { title: "Build & integrate", description: "We configure the agent's search criteria and connect it to your CRM and data sources." },
  { title: "Deploy & host", description: "The agent runs on a daily schedule on our infrastructure, continuously finding and enriching leads." },
  { title: "Monitor & improve", description: "We tune the ICP criteria as you learn which leads convert, so quality improves over time." },
]

const WHY_US = [
  { title: "We handle the API costs", description: "Data source access and model usage are bundled and managed on our side — no subscriptions or usage bills." },
  { title: "Custom integrations included", description: "We connect the agent to your CRM and data sources — HubSpot, Salesforce, Apollo, and more." },
  { title: "Hosted & monitored for you", description: "It runs on our infrastructure on a daily schedule, so your pipeline fills automatically." },
  { title: "Tuned to your ICP", description: "We refine the search criteria as you learn which leads convert, so quality compounds over time." },
]

const FAQS = [
  { q: "What is an AI lead finder agent?", a: "It's an AI agent that researches your ideal customer profile, finds matching companies and contacts from across the web and data sources, enriches each lead with verified contact details and company context, and delivers them into your CRM automatically — every day." },
  { q: "How does it find leads?", a: "We configure the agent with your ICP criteria — industry, company size, role, tech stack, and intent signals. It then searches across data sources and the web to find companies and contacts that match, enriches the data, deduplicates against your existing records, and pushes verified leads into your CRM." },
  { q: "How is this different from buying a lead list?", a: "Lead lists are static, unverified, and shared with everyone. This agent finds leads specific to your exact ICP, enriches them with current data, deduplicates against your pipeline, and delivers a fresh set every day — so you always have current, relevant prospects." },
  { q: "Which CRMs does it integrate with?", a: "HubSpot and Salesforce out of the box. We can connect it to most CRMs and outbound tools — including Apollo, Outreach, and Pipedrive." },
  { q: "How long does it take to go live?", a: "Most lead finder agents are live within days. After a short discovery call, we build, integrate, and deploy it for you — nothing to install on your side." },
  { q: "Do I need to manage AI accounts or data subscriptions?", a: "No. We bundle and manage all data source access and model costs on our infrastructure. You get a working agent and a pipeline that fills itself — no subscriptions to manage." },
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
        name: faq.q,
        acceptedAnswer: { "@type": "Answer", text: faq.a },
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
        <AgentHeroSection
          title="Lead finder"
          gradient={GRADIENT}
          Icon={Target}
          heroSubhead="An agent that researches your ideal customer, finds matching companies and contacts every day, and delivers enriched, verified leads straight into your CRM — no prospecting hours required."
          impact={IMPACT}
          showBreadcrumb={false}
          showHeroStats={false}
        />
        <AgentOverviewSection paragraphs={OVERVIEW} />
        <AgentWorkflowSection
          heading="A pipeline that fills itself"
          steps={WORKFLOW_STEPS}
          logos={WORKFLOW_LOGOS}
          logoSuffix="+ any CRM or outbound tool"
        />
        <AgentUseCasesSection agentTitle="Lead finder" useCases={USE_CASES} />
        <AgentHowWeBuildSection steps={HOW_WE_BUILD} />
        <AgentImpactSection stats={IMPACT} />
        <AgentWhyUsSection items={WHY_US} />
        <AgentFaqSection faqs={FAQS} />
        <AgentCtaSection agentTitle="lead finder" />
      </main>
      <Footer />
    </div>
  )
}

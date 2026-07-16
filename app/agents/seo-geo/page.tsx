import type { Metadata } from "next"
import { Search, FileText, Sparkles, UploadCloud, Link2, TrendingUp } from "lucide-react"
import { SiWordpress, SiWebflow, SiShopify, SiGhost, SiNotion } from "react-icons/si"
import { FaGoogle } from "react-icons/fa"
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
import { DashboardMock, ListMock, SyncMock } from "@/components/sections/agent-detail/mockups/agent-mocks"

const BASE_URL = "https://talktomedata.com"
const PAGE_URL = `${BASE_URL}/agents/seo-geo`

export const metadata: Metadata = {
  title: "AI SEO & GEO Agent — Built, Hosted & Managed | Talk to Me Data",
  description:
    "A custom AI SEO & GEO agent that researches what your buyers search on Google and ask AI, writes SEO-ready pages engineered to rank in both classic search and LLM answers, and publishes them to your site automatically. We build, host, and manage it.",
  keywords: [
    "ai seo agent",
    "geo agent",
    "generative engine optimization",
    "seo automation ai",
    "ai content that ranks",
    "rank in ai search",
    "ai agent for seo",
    "llm seo optimization",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "AI SEO & GEO Agent — Built, Hosted & Managed | Talk to Me Data",
    description:
      "A custom AI SEO & GEO agent that writes SEO-ready pages engineered to rank on Google and get cited by AI search — published to your site automatically. We build, host, and manage it.",
    type: "article",
    url: PAGE_URL,
    siteName: "Talk to Me Data",
    publishedTime: "2026-07-16",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI SEO & GEO Agent — Built, Hosted & Managed | Talk to Me Data",
    description:
      "A custom AI SEO & GEO agent that writes pages engineered to rank on Google and get cited by AI search — published automatically. We build, host, and manage it.",
  },
}

// ── Content ───────────────────────────────────────────────────────────────────

const GRADIENT = "linear-gradient(135deg, #9a3412 0%, #ea580c 55%, #fdba74 100%)"

const IMPACT = [
  { stat: "Google + AI", label: "pages that rank in search and in LLM answers" },
  { stat: "10+ pages", label: "researched, written, and published per month" },
  { stat: "Days, not months", label: "from brief to a live SEO & GEO agent" },
]

const TRUST_STATS = [
  { value: "Google + AI", label: "ranks in both" },
  { value: "10+ pages", label: "published / month" },
  { value: "Days", label: "from brief to live" },
  { value: "Any CMS", label: "WordPress, Webflow & more" },
]

const INTEGRATIONS = [
  { Icon: SiWordpress, color: "#21759B", label: "WordPress" },
  { Icon: SiWebflow, color: "#146EF5", label: "Webflow" },
  { Icon: SiShopify, color: "#96BF48", label: "Shopify" },
  { Icon: SiGhost, color: "#15171A", label: "Ghost" },
  { Icon: FaGoogle, color: "#4285F4", label: "Search Console" },
  { Icon: SiNotion, color: "#374151", label: "Notion" },
]

const OVERVIEW = [
  "An SEO & GEO agent researches the keywords and questions your customers actually search — on Google and in AI assistants like ChatGPT, Perplexity, and Google's AI Overviews — then writes and publishes pages engineered to rank in both. Every page is structured for classic SEO (titles, headings, schema, internal links) and for Generative Engine Optimization, so LLMs can find, understand, and cite your content.",
  "It's built for founders and marketing teams who know content drives growth but can't keep up with the pace — or with the new reality that buyers now ask AI, not just Google. Instead of briefing writers and wrestling with a CMS, you get a steady stream of ranking-ready pages published to your site automatically.",
]

const WORKFLOW_STEPS = [
  {
    Icon: Search,
    step: "01",
    title: "Find what people search",
    description: "The agent researches the keywords, questions, and AI prompts your buyers use — and the gaps your competitors are missing.",
    mockup: (
      <ListMock
        title="Keyword opportunities"
        Icon={Search}
        count="42 found"
        items={[
          { title: "best crm for agencies", sub: "2,400 searches / mo", badge: "Low difficulty", badgeTone: "green" },
          { title: "ai invoice processing", sub: "1,300 searches / mo", badge: "Medium", badgeTone: "amber" },
          { title: "what is generative engine optimization", sub: "AI-answer intent", badge: "GEO", badgeTone: "violet" },
        ]}
      />
    ),
  },
  {
    Icon: FileText,
    step: "02",
    title: "Write SEO + GEO pages",
    description: "It writes each page for readers and for ranking — titles, headings, schema, and quotable answer blocks that LLMs can cite.",
    mockup: (
      <ListMock
        title="Optimized for ranking"
        Icon={FileText}
        count="page ready"
        items={[
          { title: "Title & meta tags", sub: "Keyword-aligned", badge: "Optimized", badgeTone: "green" },
          { title: "Schema markup", sub: "Article + FAQ", badge: "Added", badgeTone: "green" },
          { title: "Answer blocks for AI", sub: "Quotable & citable", badge: "GEO", badgeTone: "violet" },
        ]}
      />
    ),
  },
  {
    Icon: TrendingUp,
    step: "03",
    title: "Publish & track",
    description: "Finished pages publish straight to your CMS. The agent tracks rankings in Google and citations in AI answers, and refreshes pages that slip.",
    mockup: (
      <SyncMock
        ToolIcon={SiWordpress}
        toolColor="#21759B"
        toolLabel="Published to WordPress"
        note="internal links added"
        rows={[
          { name: "Best CRM for agencies", sub: "#3 Google · cited by AI" },
          { name: "AI invoice tools guide", sub: "#1 Google" },
        ]}
        footerLabel="Pages ranking"
        footerValue="128"
      />
    ),
  },
]

const WORKFLOW_LOGOS = [
  { Icon: SiWordpress, color: "#21759B", label: "WordPress" },
  { Icon: SiWebflow, color: "#146EF5", label: "Webflow" },
  { Icon: SiGhost, color: "#15171A", label: "Ghost" },
]

const USE_CASES = [
  { Icon: Search, title: "Keyword & question research", description: "Finds the terms and questions your buyers search on Google and ask AI assistants — and the gaps worth winning." },
  { Icon: FileText, title: "SEO page writing", description: "Writes optimized pages — titles, headings, schema, internal links — built to rank in classic search." },
  { Icon: Sparkles, title: "GEO optimization", description: "Structures content so LLMs like ChatGPT and Perplexity can find, understand, and cite it in their answers." },
  { Icon: UploadCloud, title: "Auto-publishing", description: "Publishes finished pages straight to your CMS — WordPress, Webflow, Shopify, and more — no copy-paste." },
  { Icon: Link2, title: "Internal linking", description: "Builds a smart internal link structure across your site automatically as new pages go live." },
  { Icon: TrendingUp, title: "Rank & citation tracking", description: "Monitors your positions in Google and citations in AI answers, and refreshes pages that start to slip." },
]

const HOW_WE_BUILD = [
  { title: "Discovery", description: "You tell us your topics, target audience, and the searches you want to win — in one short call." },
  { title: "Build & integrate", description: "We configure the agent's research and writing style and connect it to your CMS and analytics." },
  { title: "Deploy & host", description: "The agent runs on a schedule on our infrastructure — researching, writing, and publishing pages automatically." },
  { title: "Monitor & improve", description: "We track rankings and AI citations, and the agent refreshes pages to keep them ranking as search evolves." },
]

const WHY_US = [
  { title: "We handle the API costs", description: "Research tools and model usage are bundled and managed on our side — no subscriptions or usage bills." },
  { title: "Custom integrations included", description: "We connect it to your CMS and analytics — WordPress, Webflow, Shopify, Search Console, and more." },
  { title: "Hosted & monitored for you", description: "It runs on our infrastructure on a schedule, publishing and refreshing pages without you lifting a finger." },
  { title: "Built for SEO and GEO", description: "Every page is engineered to rank on Google and to be cited by AI search — not one or the other." },
]

// SCAFFOLD: add real customer quotes here and the section renders automatically.
const TESTIMONIALS: Testimonial[] = []

const FAQS = [
  { q: "What is an SEO & GEO agent?", a: "It's an AI agent that researches what your audience searches on Google and asks AI assistants, writes pages optimized for both classic SEO and Generative Engine Optimization (GEO), and publishes them to your site automatically — then tracks how they rank." },
  { q: "What is GEO (Generative Engine Optimization)?", a: "GEO is optimizing your content so it gets surfaced and cited by AI systems like ChatGPT, Perplexity, and Google's AI Overviews. As more buyers ask AI instead of searching, GEO makes sure your business is the answer they're given — not a competitor." },
  { q: "How is this different from a normal SEO tool?", a: "Most tools help you research or draft — you still write, optimize, publish, and track. This agent does the full loop: research, write SEO + GEO-ready pages, publish to your CMS, and monitor rankings — and it's built, hosted, and managed for you." },
  { q: "Which CMS platforms does it publish to?", a: "WordPress, Webflow, Shopify, Ghost, and most modern CMSs. We handle the integration so pages go live automatically — nothing to copy and paste." },
  { q: "Will the content sound like AI spam?", a: "No. We train it on your voice and topics, and every page is structured for real readers first — clear, accurate, and genuinely useful. That's exactly what ranks in both Google and AI answers today." },
  { q: "How long does it take to go live?", a: "Most SEO & GEO agents are live within days. After a short discovery call, we build, integrate, and deploy it for you — nothing to install on your side." },
]

// ── Structured data ───────────────────────────────────────────────────────────

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${PAGE_URL}#service`,
      name: "SEO & GEO AI Agent",
      serviceType: "SEO & GEO AI Agent",
      description:
        "A custom AI SEO & GEO agent that researches keywords and AI prompts, writes SEO-ready pages engineered to rank on Google and get cited by AI search, and publishes them to your site automatically.",
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
        { "@type": "ListItem", position: 2, name: "SEO & GEO", item: PAGE_URL },
      ],
    },
  ],
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function SeoGeoPage() {
  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main>
        <AgentHeroSection
          title="SEO & GEO"
          gradient={GRADIENT}
          Icon={Search}
          tag="AI Agents managed for you"
          heroSubhead="An agent that researches what your buyers search on Google and ask AI, writes SEO-ready pages engineered to rank in both, and publishes them to your site — fully built, hosted, and managed by us."
          impact={IMPACT}
          showBreadcrumb={false}
          showHeroStats={false}
          visual={
            <DashboardMock
              browser="app.talktomedata.com/seo"
              title="Published pages"
              subtitle="Ranking on Google and in AI answers"
              badge={{ label: "+6 ranking this week", tone: "green" }}
              rows={[
                { name: "Best CRM for agencies", sub: "'best crm for agencies'", meta: "#3 Google", status: "Cited by AI", tone: "violet" },
                { name: "AI invoice tools guide", sub: "'ai invoice processing'", meta: "#1 Google", status: "Ranking", tone: "green" },
                { name: "Lead gen playbook", sub: "'b2b lead generation'", meta: "#5 Google", status: "Ranking", tone: "green" },
                { name: "What is GEO?", sub: "'generative engine optimization'", meta: "AI Overview", status: "Cited by AI", tone: "violet" },
              ]}
            />
          }
          ctaLabel="Get started"
          ctaHref="/get-started"
          ctaNote="Takes 2 minutes · Live in days"
        />
        <AgentTrustBand stats={TRUST_STATS} />
        <AgentIntegrationsSection logos={INTEGRATIONS} suffix="+ any CMS or analytics tool" />
        <AgentOverviewSection paragraphs={OVERVIEW} />
        <AgentWorkflowSection
          heading="Ranking-ready pages, published on autopilot"
          steps={WORKFLOW_STEPS}
          logos={WORKFLOW_LOGOS}
          logoSuffix="+ any CMS"
        />
        <AgentUseCasesSection agentTitle="SEO & GEO" useCases={USE_CASES} />
        <AgentCtaSection
          agentTitle="SEO & GEO"
          heading="Ready to rank on Google and in AI answers?"
          subheading="Tell us your topics and target searches — we'll build an agent that writes and publishes SEO + GEO pages for you."
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
              question="How many SEO pages do you publish per month?"
              unitLabel="pages"
              min={2}
              max={100}
              step={1}
              defaultValue={12}
              period="month"
              manualMinsPer={180}
              aiSecsPer={300}
              manualNote="Researching, writing & optimizing each page at ~3 hrs"
              aiNote="The agent researches, writes & publishes — you just review"
              savedNoun="of content & SEO time"
              disclaimer="Based on ~3 hrs to research, write, and optimize a page manually vs a quick review with the agent. Actual results vary by topic."
            />
          </div>
        </section>
        <AgentTestimonialsSection testimonials={TESTIMONIALS} />
        <AgentWhyUsSection items={WHY_US} />
        <AgentFaqSection faqs={FAQS} />
        <AgentCtaSection
          agentTitle="SEO & GEO"
          subheading="Tell us what you want to rank for and we'll show you exactly what your SEO & GEO agent can do — built, hosted, and managed for you."
          ctaLabel="Get started"
          ctaHref="/get-started"
          note="Takes 2 minutes · No commitment"
        />
      </main>
      <Footer />
    </div>
  )
}

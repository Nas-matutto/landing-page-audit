import type { Metadata } from "next"
import { MessageSquare, Send, UserPlus, Users, Zap, Gauge, CalendarCheck, Filter } from "lucide-react"
import { SiHubspot, SiSalesforce, SiSlack, SiGmail, SiWhatsapp, SiNotion } from "react-icons/si"
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
import { DashboardMock, ListMock, ChatMock, SyncMock } from "@/components/sections/agent-detail/mockups/agent-mocks"

const BASE_URL = "https://talktomedata.com"
const PAGE_URL = `${BASE_URL}/agents/lead-qualification`

export const metadata: Metadata = {
  title: "AI Lead Qualification Agent — Built, Hosted & Managed | Talk to Me Data",
  description:
    "A custom AI lead qualification agent that engages every inbound lead in seconds, asks qualifying questions, scores intent, and routes hot leads to your CRM. We build, host, and manage it. Live in days.",
  keywords: [
    "ai lead qualification agent",
    "qualify leads automatically",
    "ai sdr",
    "lead qualification automation",
    "ai lead scoring agent",
    "inbound lead automation",
    "ai agent for sales",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "AI Lead Qualification Agent — Built, Hosted & Managed | Talk to Me Data",
    description:
      "A custom AI lead qualification agent that engages every inbound lead in seconds, asks qualifying questions, scores intent, and routes hot leads to your CRM. We build, host, and manage it. Live in days.",
    type: "article",
    url: PAGE_URL,
    siteName: "Talk to Me Data",
    publishedTime: "2026-06-25",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Lead Qualification Agent — Built, Hosted & Managed | Talk to Me Data",
    description:
      "A custom AI lead qualification agent that engages every inbound lead in seconds, asks qualifying questions, scores intent, and routes hot leads to your CRM. We build, host, and manage it. Live in days.",
  },
}

// ── Content ───────────────────────────────────────────────────────────────────

const GRADIENT = "linear-gradient(135deg, #185FA5 0%, #2563eb 55%, #93c5fd 100%)"

const IMPACT = [
  { stat: "Typically 3×", label: "more qualified conversations for your team" },
  { stat: "Seconds", label: "to first response, day or night" },
  { stat: "Days, not months", label: "from brief to a live qualification agent" },
]

const TRUST_STATS = [
  { value: "3× more", label: "qualified conversations" },
  { value: "Seconds", label: "to first response, 24/7" },
  { value: "Days", label: "from brief to live" },
  { value: "Any CRM", label: "routes to your pipeline" },
]

const INTEGRATIONS = [
  { Icon: SiHubspot, color: "#FF7A59", label: "HubSpot" },
  { Icon: SiSalesforce, color: "#00A1E0", label: "Salesforce" },
  { Icon: SiSlack, color: "#4A154B", label: "Slack" },
  { Icon: SiGmail, color: "#EA4335", label: "Gmail" },
  { Icon: SiWhatsapp, color: "#25D366", label: "WhatsApp" },
  { Icon: SiNotion, color: "#374151", label: "Notion" },
]

const OVERVIEW = [
  "An AI lead qualification agent engages every inbound lead the moment they arrive, asks the questions your sales team would ask, scores how likely they are to buy, and routes the best ones to the right rep or into your CRM. It does this instantly, 24/7, in a natural conversation.",
  "It's built for teams losing deals to slow follow-up: agencies, B2B SaaS, real estate, and service businesses where speed-to-lead decides who wins. Instead of leads going cold in a shared inbox overnight, every one gets an immediate, qualifying response.",
]

const WORKFLOW_STEPS = [
  {
    Icon: UserPlus,
    step: "01",
    title: "Lead arrives",
    description: "A form fill, chat message, or DM comes in — the agent responds in seconds, before the lead goes cold.",
    mockup: (
      <ListMock
        title="New inbound"
        Icon={UserPlus}
        count="3 new"
        items={[
          { title: "Ava Thompson", sub: "Web form · Pricing page", badge: "New", badgeTone: "blue" },
          { title: "Marcus Lee", sub: "Live chat", badge: "New", badgeTone: "blue" },
          { title: "Priya Nair", sub: "Instagram DM", badge: "New", badgeTone: "blue" },
        ]}
      />
    ),
  },
  {
    Icon: MessageSquare,
    step: "02",
    title: "AI qualifies on the spot",
    description: "It asks your qualifying questions naturally, collects budget, timeline, and use case, and scores intent automatically.",
    mockup: (
      <ChatMock
        title="Qualifying chat"
        messages={[
          { from: "agent", text: "Hi Ava! What are you hoping to automate?" },
          { from: "them", text: "Lead research for our SDR team" },
          { from: "agent", text: "Got it — roughly how many leads a month, and what's your timeline?" },
          { from: "them", text: "~500/mo, want to start this quarter" },
        ]}
        footer="Scored 92 — Hot lead"
      />
    ),
  },
  {
    Icon: Send,
    step: "03",
    title: "Hot leads routed instantly",
    description: "Qualified leads are pushed into your CRM with scores and notes attached — or booked onto a rep's calendar directly.",
    mockup: (
      <SyncMock
        ToolIcon={SiHubspot}
        toolColor="#FF7A59"
        toolLabel="Routed to HubSpot"
        note="with notes & score"
        rows={[
          { name: "Ava Thompson", sub: "Score 92 · Assigned to Sam" },
          { name: "Marcus Lee", sub: "Score 78 · Nurture" },
        ]}
        footerLabel="Qualified this week"
        footerValue="86"
      />
    ),
  },
]

const WORKFLOW_LOGOS = [
  { Icon: SiHubspot, color: "#FF7A59", label: "HubSpot" },
  { Icon: SiSalesforce, color: "#00A1E0", label: "Salesforce" },
  { Icon: SiSlack, color: "#4A154B", label: "Slack" },
]

const USE_CASES = [
  { Icon: Zap, title: "Instant lead response", description: "Replies to new form fills, chats, and DMs in seconds — before a competitor gets there." },
  { Icon: MessageSquare, title: "Qualifying questions", description: "Asks about budget, timeline, team size, and use case, the way your best SDR would." },
  { Icon: Gauge, title: "Intent scoring", description: "Ranks each lead hot, warm, or cold based on their answers and behaviour, so reps prioritise correctly." },
  { Icon: Send, title: "CRM routing", description: "Pushes qualified leads — with notes and scores — straight into HubSpot, Salesforce, or your pipeline." },
  { Icon: CalendarCheck, title: "Meeting booking", description: "Books qualified prospects directly onto the right rep's calendar without back-and-forth." },
  { Icon: Filter, title: "Disqualify politely", description: "Filters out poor-fit leads with a helpful response, so your team never wastes a call." },
]

const HOW_WE_BUILD = [
  { title: "Discovery", description: "You tell us what a good lead looks like, your qualifying criteria, and where leads should go — in one short call." },
  { title: "Build & integrate", description: "We configure the agent's questions and scoring, then connect it to your forms, chat, and CRM." },
  { title: "Deploy & host", description: "We put it live on your site and inbound channels, running on our infrastructure. No setup on your end." },
  { title: "Monitor & improve", description: "We watch conversations, refine the scoring, and adjust as your ideal customer profile evolves." },
]

const WHY_US = [
  { title: "We handle the API costs", description: "Model usage is bundled and managed on our side — no AI accounts and no usage bills to track." },
  { title: "Custom integrations included", description: "We connect it to your forms, chat, and CRM — HubSpot, Salesforce, Slack, and more — so qualified leads land where your team works." },
  { title: "Hosted & monitored for you", description: "It runs on our infrastructure with 24/7 monitoring, so no lead ever goes unanswered." },
  { title: "Tuned to your sales process", description: "Asks your qualifying questions, scores against your criteria, and routes by your rules." },
]

// SCAFFOLD: add real customer quotes here and the section renders automatically.
const TESTIMONIALS: Testimonial[] = []

const FAQS = [
  { q: "What is an AI lead qualification agent?", a: "It's an AI software agent that engages every inbound lead instantly, asks qualifying questions, scores their intent, and routes the best leads to your sales team or CRM — automatically and 24/7." },
  { q: "How does it decide which leads are qualified?", a: "We configure it with your qualifying criteria — things like budget, timeline, company size, and use case. It asks those questions in a natural conversation, scores the answers, and ranks each lead hot, warm, or cold so your reps focus on the best ones." },
  { q: "Does it work with my CRM?", a: "Yes. We integrate it with CRMs like HubSpot and Salesforce so qualified leads are pushed in automatically with their conversation notes and score attached. It can also book meetings directly onto a rep's calendar." },
  { q: "Why does speed-to-lead matter?", a: "Leads are far more likely to convert when they get a response within minutes. This agent replies in seconds, around the clock, so leads never go cold waiting in an inbox overnight or over the weekend." },
  { q: "How long does it take to go live?", a: "Most lead qualification agents are live within days. After a short discovery call, we build, integrate, and deploy it for you — nothing to install or configure on your side." },
  { q: "Do I need to manage AI accounts or API keys?", a: "No. We manage all model access and API costs on our infrastructure. You get a working agent connected to your stack — no DevOps and no usage bills." },
]

// ── Structured data ───────────────────────────────────────────────────────────

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${PAGE_URL}#service`,
      name: "Lead Qualification AI Agent",
      serviceType: "Lead Qualification AI Agent",
      description:
        "A custom AI lead qualification agent that engages every inbound lead in seconds, asks qualifying questions, scores intent, and routes hot leads to your CRM.",
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
        { "@type": "ListItem", position: 2, name: "Lead qualification", item: PAGE_URL },
      ],
    },
  ],
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function LeadQualificationPage() {
  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main>
        <AgentHeroSection
          title="Lead qualification"
          gradient={GRADIENT}
          Icon={Users}
          tag="AI Agents managed for you"
          heroSubhead="An agent that replies to every inbound lead in seconds, qualifies them on the spot, and routes the hot ones straight to your team — fully built, hosted, and managed by us."
          impact={IMPACT}
          showBreadcrumb={false}
          showHeroStats={false}
          visual={
            <DashboardMock
              browser="app.talktomedata.com/leads"
              title="Leads today"
              subtitle="Qualified & scored automatically"
              badge={{ label: "+24 today", tone: "green" }}
              rows={[
                { name: "Ava Thompson", sub: "Northwind SaaS · Web form", score: 92, status: "Hot", tone: "green" },
                { name: "Marcus Lee", sub: "Brightloop · Live chat", score: 78, status: "Warm", tone: "violet" },
                { name: "Priya Nair", sub: "Cloudcart · Instagram DM", score: 64, status: "Warm", tone: "violet" },
                { name: "Tom Alvarez", sub: "Finlark · Web form", score: 38, status: "Cold", tone: "amber" },
              ]}
            />
          }
          ctaLabel="Get started"
          ctaHref="/get-started"
          ctaNote="Takes 2 minutes · Live in days"
        />
        <AgentTrustBand stats={TRUST_STATS} />
        <AgentIntegrationsSection logos={INTEGRATIONS} suffix="+ any CRM or calendar" />
        <AgentOverviewSection paragraphs={OVERVIEW} />
        <AgentWorkflowSection
          heading="Every lead qualified in seconds"
          steps={WORKFLOW_STEPS}
          logos={WORKFLOW_LOGOS}
          logoSuffix="+ any CRM or calendar"
        />
        <AgentUseCasesSection agentTitle="Lead qualification" useCases={USE_CASES} />
        <AgentCtaSection
          agentTitle="lead qualification"
          heading="Ready to stop losing leads to slow follow-up?"
          subheading="Tell us what a good lead looks like — we'll build an agent that qualifies and routes every inbound lead in seconds."
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
              question="How many inbound leads do you get per month?"
              unitLabel="leads"
              min={50}
              max={3000}
              step={25}
              defaultValue={400}
              period="month"
              manualMinsPer={8}
              aiSecsPer={30}
              manualNote="An SDR qualifying each lead at ~8 min"
              aiNote="The agent qualifies & routes — reps only take the hot ones"
              savedNoun="of qualifying time"
              disclaimer="Based on ~8 min manual qualification per lead vs the agent handling it instantly. Actual results vary by lead volume."
            />
          </div>
        </section>
        <AgentTestimonialsSection testimonials={TESTIMONIALS} />
        <AgentWhyUsSection items={WHY_US} />
        <AgentFaqSection faqs={FAQS} />
        <AgentCtaSection
          agentTitle="lead qualification"
          subheading="Tell us what you want to automate and we'll show you exactly what your lead qualification agent can do — built, hosted, and managed for you."
          ctaLabel="Get started"
          ctaHref="/get-started"
          note="Takes 2 minutes · No commitment"
        />
      </main>
      <Footer />
    </div>
  )
}

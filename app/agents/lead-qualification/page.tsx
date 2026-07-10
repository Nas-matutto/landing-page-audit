import type { Metadata } from "next"
import { MessageSquare, Send, UserPlus, Users } from "lucide-react"
import { SiHubspot, SiSalesforce, SiSlack } from "react-icons/si"
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
  },
  {
    Icon: MessageSquare,
    step: "02",
    title: "AI qualifies on the spot",
    description: "It asks your qualifying questions naturally, collects budget, timeline, and use case, and scores intent automatically.",
  },
  {
    Icon: Send,
    step: "03",
    title: "Hot leads routed instantly",
    description: "Qualified leads are pushed into your CRM with scores and notes attached — or booked onto a rep's calendar directly.",
  },
]

const WORKFLOW_LOGOS = [
  { Icon: SiHubspot, color: "#FF7A59", label: "HubSpot" },
  { Icon: SiSalesforce, color: "#00A1E0", label: "Salesforce" },
  { Icon: SiSlack, color: "#4A154B", label: "Slack" },
]

const USE_CASES = [
  { title: "Instant lead response", description: "Replies to new form fills, chats, and DMs in seconds — before a competitor gets there." },
  { title: "Qualifying questions", description: "Asks about budget, timeline, team size, and use case, the way your best SDR would." },
  { title: "Intent scoring", description: "Ranks each lead hot, warm, or cold based on their answers and behaviour, so reps prioritise correctly." },
  { title: "CRM routing", description: "Pushes qualified leads — with notes and scores — straight into HubSpot, Salesforce, or your pipeline." },
  { title: "Meeting booking", description: "Books qualified prospects directly onto the right rep's calendar without back-and-forth." },
  { title: "Disqualify politely", description: "Filters out poor-fit leads with a helpful response, so your team never wastes a call." },
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
          heroSubhead="An agent that replies to every inbound lead in seconds, qualifies them on the spot, and routes the hot ones straight to your team — fully built, hosted, and managed by us."
          impact={IMPACT}
          showBreadcrumb={false}
          showHeroStats={false}
        />
        <AgentOverviewSection paragraphs={OVERVIEW} />
        <AgentWorkflowSection
          heading="Every lead qualified in seconds"
          steps={WORKFLOW_STEPS}
          logos={WORKFLOW_LOGOS}
          logoSuffix="+ any CRM or calendar"
        />
        <AgentUseCasesSection agentTitle="Lead qualification" useCases={USE_CASES} />
        <AgentHowWeBuildSection steps={HOW_WE_BUILD} />
        <AgentImpactSection stats={IMPACT} />
        <AgentWhyUsSection items={WHY_US} />
        <AgentFaqSection faqs={FAQS} />
        <AgentCtaSection agentTitle="lead qualification" />
      </main>
      <Footer />
    </div>
  )
}

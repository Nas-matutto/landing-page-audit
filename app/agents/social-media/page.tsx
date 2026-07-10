import type { Metadata } from "next"
import { BarChart2, CalendarClock, Megaphone, PenLine } from "lucide-react"
import { SiBuffer, SiInstagram, SiTiktok } from "react-icons/si"
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
const PAGE_URL = `${BASE_URL}/agents/social-media`

export const metadata: Metadata = {
  title: "AI Social Media Agent — Built, Hosted & Managed | Talk to Me Data",
  description:
    "A custom AI social media agent that analyzes your best-performing content, drafts new posts for Instagram, LinkedIn, and more, and schedules them automatically. We build, host, and manage it. Live in days.",
  keywords: [
    "ai social media agent",
    "social media automation",
    "ai content creator",
    "automate social media posts",
    "ai instagram agent",
    "ai linkedin agent",
    "social media scheduling ai",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "AI Social Media Agent — Built, Hosted & Managed | Talk to Me Data",
    description:
      "A custom AI social media agent that analyzes your best-performing content, drafts new posts for Instagram, LinkedIn, and more, and schedules them automatically. We build, host, and manage it. Live in days.",
    type: "article",
    url: PAGE_URL,
    siteName: "Talk to Me Data",
    publishedTime: "2026-06-25",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Social Media Agent — Built, Hosted & Managed | Talk to Me Data",
    description:
      "A custom AI social media agent that analyzes your best-performing content, drafts new posts for Instagram, LinkedIn, and more, and schedules them automatically. We build, host, and manage it. Live in days.",
  },
}

// ── Content ───────────────────────────────────────────────────────────────────

const GRADIENT = "linear-gradient(135deg, #7c3aed 0%, #a855f7 55%, #f0abfc 100%)"

const IMPACT = [
  { stat: "10+ posts", label: "typically drafted per week, per channel" },
  { stat: "Hours saved", label: "weekly on content creation and scheduling" },
  { stat: "Days, not months", label: "from brief to a live social media agent" },
]

const OVERVIEW = [
  "An AI social media agent analyzes your existing content to understand what formats, topics, and hooks get the most engagement. It uses those patterns to draft new posts that sound like you — not generic AI — across Instagram, LinkedIn, X, and any other channel you're active on.",
  "It's built for founders, marketing teams, and service businesses who know they need to post consistently but can never find the time. Instead of starting from scratch every week, the agent does the drafting and scheduling — you spend a few minutes approving, not a few hours creating.",
]

const WORKFLOW_STEPS = [
  {
    Icon: BarChart2,
    step: "01",
    title: "Analyze what works",
    description: "The agent scans your past content to find the formats, topics, and hooks that drive the most engagement on each platform.",
  },
  {
    Icon: PenLine,
    step: "02",
    title: "Draft on-brand posts",
    description: "New posts are written in your voice and adapted for each platform — Instagram, LinkedIn, TikTok, and more.",
  },
  {
    Icon: CalendarClock,
    step: "03",
    title: "Schedule & publish",
    description: "Approved posts are queued at the best time for each channel and published automatically — no manual scheduling needed.",
  },
]

const WORKFLOW_LOGOS = [
  { Icon: SiInstagram, color: "#E1306C", label: "Instagram" },
  { Icon: SiTiktok, color: "#000000", label: "TikTok" },
  { Icon: SiBuffer, color: "#2C4BFF", label: "Buffer" },
]

const USE_CASES = [
  { title: "Content drafting", description: "Generates on-brand post drafts for each channel — copy, hooks, and formatting adapted per platform." },
  { title: "Performance analysis", description: "Reviews your past posts to identify the formats and topics your audience responds to most." },
  { title: "Scheduling", description: "Queues approved posts for the optimal time on each platform — no manual scheduling." },
  { title: "Repurposing", description: "Turns blog posts, case studies, or long-form content into a week of social posts automatically." },
  { title: "Trend monitoring", description: "Spots relevant industry conversations and suggests timely post ideas while they're still fresh." },
  { title: "Caption & hashtag generation", description: "Writes captions and selects relevant hashtags tuned to each platform's norms." },
]

const HOW_WE_BUILD = [
  { title: "Discovery", description: "You share your channels, brand voice, and content goals in a short call — we handle the rest." },
  { title: "Build & integrate", description: "We configure the agent, connect it to your channels and scheduling tool, and train it on your best-performing content." },
  { title: "Deploy & host", description: "The agent runs on our infrastructure — drafting, analyzing, and queuing posts on a schedule you control." },
  { title: "Monitor & improve", description: "We tune the output as your brand evolves and feed new performance data back into the agent." },
]

const WHY_US = [
  { title: "We handle the API costs", description: "Model usage is bundled and managed on our side — no AI accounts, no usage bills." },
  { title: "Custom integrations included", description: "We connect it to your scheduling tools and channels — Buffer, Later, Instagram, LinkedIn, and more." },
  { title: "Hosted & monitored for you", description: "It runs on our infrastructure around the clock, so posts keep flowing even when you're offline." },
  { title: "Trained on your voice", description: "We tune the agent on your existing content so posts sound like your brand, not a generic template." },
]

const FAQS = [
  { q: "What is an AI social media agent?", a: "It's an AI agent that studies your existing content, learns what performs best, and automatically drafts and schedules new posts for your channels — adapted to each platform's format and your brand's voice." },
  { q: "Which platforms does it support?", a: "Instagram, LinkedIn, X (Twitter), Facebook, and TikTok out of the box. We can connect it to any scheduling tool you already use, such as Buffer or Later." },
  { q: "Will the posts sound like me?", a: "Yes — that's the main design goal. We train the agent on your existing content so it learns your tone, topics, and formatting style. You'll review drafts before they publish, and we tune the output over time based on your feedback." },
  { q: "Do I still need to approve posts before they go live?", a: "That's your choice. The agent can queue posts for your review, or publish directly on a schedule you set — whichever fits your workflow." },
  { q: "How long does it take to go live?", a: "Most social media agents are live within days. After a short discovery call, we build, integrate, and deploy it for you — nothing to install on your side." },
  { q: "Do I need to manage AI accounts or API keys?", a: "No. We manage all model access and API costs on our infrastructure. You get a working agent — no DevOps and no usage bills." },
]

// ── Structured data ───────────────────────────────────────────────────────────

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${PAGE_URL}#service`,
      name: "Social Media AI Agent",
      serviceType: "Social Media AI Agent",
      description:
        "A custom AI social media agent that analyzes your best-performing content, drafts new posts for Instagram, LinkedIn, and more, and schedules them automatically.",
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
        { "@type": "ListItem", position: 2, name: "Social media", item: PAGE_URL },
      ],
    },
  ],
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function SocialMediaPage() {
  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main>
        <AgentHeroSection
          title="Social media"
          gradient={GRADIENT}
          Icon={Megaphone}
          heroSubhead="An agent that studies your best-performing content, drafts on-brand posts for every channel, and schedules them — so your social presence runs without you having to run it."
          impact={IMPACT}
          showBreadcrumb={false}
          showHeroStats={false}
        />
        <AgentOverviewSection paragraphs={OVERVIEW} />
        <AgentWorkflowSection
          heading="Your social presence — on autopilot"
          steps={WORKFLOW_STEPS}
          logos={WORKFLOW_LOGOS}
          logoSuffix="+ LinkedIn, X & more"
        />
        <AgentUseCasesSection agentTitle="Social media" useCases={USE_CASES} />
        <AgentHowWeBuildSection steps={HOW_WE_BUILD} />
        <AgentImpactSection stats={IMPACT} />
        <AgentWhyUsSection items={WHY_US} />
        <AgentFaqSection faqs={FAQS} />
        <AgentCtaSection agentTitle="social media" />
      </main>
      <Footer />
    </div>
  )
}

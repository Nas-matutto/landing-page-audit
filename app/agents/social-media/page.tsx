import type { Metadata } from "next"
import { BarChart2, CalendarClock, Megaphone, PenLine, Recycle, TrendingUp, Hash } from "lucide-react"
import { SiInstagram, SiTiktok, SiBuffer, SiYoutube } from "react-icons/si"
import { FaLinkedin, FaFacebook } from "react-icons/fa"
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

const TRUST_STATS = [
  { value: "10+ posts", label: "drafted / week" },
  { value: "Every channel", label: "IG, LinkedIn, TikTok & more" },
  { value: "Days", label: "from brief to live" },
  { value: "On-brand", label: "trained on your voice" },
]

const INTEGRATIONS = [
  { Icon: SiInstagram, color: "#E1306C", label: "Instagram" },
  { Icon: FaLinkedin, color: "#0A66C2", label: "LinkedIn" },
  { Icon: SiTiktok, color: "#010101", label: "TikTok" },
  { Icon: FaFacebook, color: "#1877F2", label: "Facebook" },
  { Icon: SiYoutube, color: "#FF0000", label: "YouTube" },
  { Icon: SiBuffer, color: "#2C4BFF", label: "Buffer" },
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
    mockup: (
      <ListMock
        title="Top performers"
        Icon={BarChart2}
        count="last 30 days"
        items={[
          { title: "Founder story", sub: "LinkedIn", badge: "+312% reach", badgeTone: "green" },
          { title: "How-to carousel", sub: "Instagram", badge: "+180% saves", badgeTone: "green" },
          { title: "Hot take", sub: "X", badge: "+95% reposts", badgeTone: "green" },
        ]}
      />
    ),
  },
  {
    Icon: PenLine,
    step: "02",
    title: "Draft on-brand posts",
    description: "New posts are written in your voice and adapted for each platform — Instagram, LinkedIn, TikTok, and more.",
    mockup: (
      <ListMock
        title="Drafts ready for review"
        Icon={PenLine}
        count="6"
        items={[
          { title: "LinkedIn post", sub: "'5 signs your ops need AI'", badge: "Ready", badgeTone: "blue" },
          { title: "Instagram caption", sub: "Behind the build 🎬", badge: "Ready", badgeTone: "blue" },
          { title: "TikTok hook", sub: "Automate invoices in 30s", badge: "Ready", badgeTone: "blue" },
        ]}
      />
    ),
  },
  {
    Icon: CalendarClock,
    step: "03",
    title: "Schedule & publish",
    description: "Approved posts are queued at the best time for each channel and published automatically — no manual scheduling needed.",
    mockup: (
      <SyncMock
        ToolIcon={SiBuffer}
        toolColor="#2C4BFF"
        toolLabel="Queued in Buffer"
        note="this week"
        rows={[
          { name: "Founder story", sub: "LinkedIn · Mon 9:00" },
          { name: "Product reel", sub: "Instagram · Tue 12:00" },
        ]}
        footerLabel="Posts scheduled"
        footerValue="12"
      />
    ),
  },
]

const WORKFLOW_LOGOS = [
  { Icon: SiInstagram, color: "#E1306C", label: "Instagram" },
  { Icon: SiTiktok, color: "#010101", label: "TikTok" },
  { Icon: SiBuffer, color: "#2C4BFF", label: "Buffer" },
]

const USE_CASES = [
  { Icon: PenLine, title: "Content drafting", description: "Generates on-brand post drafts for each channel — copy, hooks, and formatting adapted per platform." },
  { Icon: BarChart2, title: "Performance analysis", description: "Reviews your past posts to identify the formats and topics your audience responds to most." },
  { Icon: CalendarClock, title: "Scheduling", description: "Queues approved posts for the optimal time on each platform — no manual scheduling." },
  { Icon: Recycle, title: "Repurposing", description: "Turns blog posts, case studies, or long-form content into a week of social posts automatically." },
  { Icon: TrendingUp, title: "Trend monitoring", description: "Spots relevant industry conversations and suggests timely post ideas while they're still fresh." },
  { Icon: Hash, title: "Caption & hashtag generation", description: "Writes captions and selects relevant hashtags tuned to each platform's norms." },
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

// SCAFFOLD: add real customer quotes here and the section renders automatically.
const TESTIMONIALS: Testimonial[] = []

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
          tag="AI Agents managed for you"
          heroSubhead="An agent that studies your best-performing content, drafts on-brand posts for every channel, and schedules them — so your social presence runs without you having to run it."
          impact={IMPACT}
          showBreadcrumb={false}
          showHeroStats={false}
          visual={
            <DashboardMock
              browser="app.talktomedata.com/social"
              title="Content calendar"
              subtitle="Drafted, scheduled & on-brand"
              badge={{ label: "12 scheduled", tone: "green" }}
              rows={[
                { name: "Founder story", sub: "LinkedIn · Mon 9:00", status: "Scheduled", tone: "green" },
                { name: "Product reel", sub: "Instagram · Tue 12:00", status: "Scheduled", tone: "green" },
                { name: "Quick tip", sub: "TikTok · Wed 17:00", status: "Draft", tone: "amber" },
                { name: "Customer win", sub: "LinkedIn · Thu 9:00", status: "Scheduled", tone: "green" },
              ]}
            />
          }
          ctaLabel="Get started"
          ctaHref="/get-started"
          ctaNote="Takes 2 minutes · Live in days"
        />
        <AgentTrustBand stats={TRUST_STATS} />
        <AgentIntegrationsSection logos={INTEGRATIONS} suffix="+ LinkedIn, X & more" />
        <AgentOverviewSection paragraphs={OVERVIEW} />
        <AgentWorkflowSection
          heading="Your social presence — on autopilot"
          steps={WORKFLOW_STEPS}
          logos={WORKFLOW_LOGOS}
          logoSuffix="+ LinkedIn, X & more"
        />
        <AgentUseCasesSection agentTitle="Social media" useCases={USE_CASES} />
        <AgentCtaSection
          agentTitle="social media"
          heading="Ready to post consistently — without the work?"
          subheading="Tell us your channels and voice — we'll build a social agent that drafts and schedules on-brand posts every week."
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
              question="How many posts do you publish per week?"
              unitLabel="posts"
              min={3}
              max={60}
              step={1}
              defaultValue={12}
              period="week"
              manualMinsPer={40}
              aiSecsPer={300}
              manualNote="Creating each post from scratch at ~40 min"
              aiNote="The agent drafts & schedules — you just approve"
              savedNoun="of content time"
              disclaimer="Based on ~40 min to create a post manually vs a few minutes to review the agent's drafts. Actual results vary by format."
            />
          </div>
        </section>
        <AgentTestimonialsSection testimonials={TESTIMONIALS} />
        <AgentWhyUsSection items={WHY_US} />
        <AgentFaqSection faqs={FAQS} />
        <AgentCtaSection
          agentTitle="social media"
          subheading="Tell us what you want to automate and we'll show you exactly what your social media agent can do — built, hosted, and managed for you."
          ctaLabel="Get started"
          ctaHref="/get-started"
          note="Takes 2 minutes · No commitment"
        />
      </main>
      <Footer />
    </div>
  )
}

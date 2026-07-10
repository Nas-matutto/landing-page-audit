import type { Metadata } from "next"
import { Bot, CheckCircle, Headphones, MessageSquare } from "lucide-react"
import { SiIntercom, SiWhatsapp, SiZendesk } from "react-icons/si"
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
const PAGE_URL = `${BASE_URL}/agents/customer-support`

export const metadata: Metadata = {
  title: "AI Customer Support Agent — Built, Hosted & Managed | Talk to Me Data",
  description:
    "A custom AI customer support agent that answers FAQs, checks order status, handles refunds, and escalates to humans — across email, chat, and WhatsApp. We build, host, and manage it. Live in days.",
  keywords: [
    "ai customer support agent",
    "automate customer support",
    "ai support chatbot",
    "customer service automation",
    "ai helpdesk agent",
    "ai agent for customer service",
    "support ticket automation",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "AI Customer Support Agent — Built, Hosted & Managed | Talk to Me Data",
    description:
      "A custom AI customer support agent that answers FAQs, checks order status, handles refunds, and escalates to humans — across email, chat, and WhatsApp. We build, host, and manage it. Live in days.",
    type: "article",
    url: PAGE_URL,
    siteName: "Talk to Me Data",
    publishedTime: "2026-06-25",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Customer Support Agent — Built, Hosted & Managed | Talk to Me Data",
    description:
      "A custom AI customer support agent that answers FAQs, checks order status, handles refunds, and escalates to humans — across email, chat, and WhatsApp. We build, host, and manage it. Live in days.",
  },
}

// ── Content ───────────────────────────────────────────────────────────────────

const GRADIENT = "linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 55%, #60a5fa 100%)"

const IMPACT = [
  { stat: "Up to 90%", label: "of repetitive tickets resolved without a human" },
  { stat: "< 1 min", label: "typical first-response time, 24/7" },
  { stat: "Days, not months", label: "from brief to a live support agent" },
]

const OVERVIEW = [
  "An AI customer support agent is a software agent that reads incoming customer messages, understands what's being asked, and replies with accurate answers drawn from your help docs, policies, and order data. It works across the channels your customers already use — email, live chat, and WhatsApp — and it works around the clock.",
  "It's a fit for any team drowning in repetitive questions: e-commerce stores fielding \"where's my order?\", SaaS teams answering the same setup questions, or service businesses handling booking and billing queries. The agent clears the predictable volume so your people spend their time on the conversations that actually need a human.",
]

const WORKFLOW_STEPS = [
  {
    Icon: MessageSquare,
    step: "01",
    title: "Message arrives",
    description: "A customer sends a question via email, live chat, or WhatsApp — at any hour, any day of the week.",
  },
  {
    Icon: Bot,
    step: "02",
    title: "AI reads & responds",
    description: "The agent reads the message, pulls from your help docs and order data, and sends an accurate reply in seconds.",
  },
  {
    Icon: CheckCircle,
    step: "03",
    title: "Resolved or escalated",
    description: "Routine tickets are closed end-to-end. Complex cases are handed to your team with full conversation context attached.",
  },
]

const WORKFLOW_LOGOS = [
  { Icon: SiZendesk, color: "#03363D", label: "Zendesk" },
  { Icon: SiWhatsapp, color: "#25D366", label: "WhatsApp" },
  { Icon: SiIntercom, color: "#1F8DED", label: "Intercom" },
]

const USE_CASES = [
  { title: "Order status & tracking", description: "Answers \"where's my order?\" instantly by pulling live data from your store or shipping provider." },
  { title: "Returns & refunds", description: "Walks customers through your returns policy and kicks off refunds or replacements within your rules." },
  { title: "Product & FAQ answers", description: "Replies to questions about sizing, features, pricing, and availability — grounded in your real content." },
  { title: "Account & billing help", description: "Handles password resets, plan changes, and invoice questions without a human in the loop." },
  { title: "Smart escalation", description: "Recognises angry, complex, or high-value cases and hands them to your team with full context attached." },
  { title: "After-hours coverage", description: "Keeps responding overnight and on weekends, so customers never wait for business hours." },
]

const HOW_WE_BUILD = [
  { title: "Discovery", description: "You describe your support workflow, common tickets, and escalation rules in a 20-minute call — no specs or documents required." },
  { title: "Build & integrate", description: "We design and configure the agent, connect it to your help desk, store, and channels, and train it on your docs and policies." },
  { title: "Deploy & host", description: "We deploy it on our infrastructure and put it live on your email, chat, and WhatsApp. Nothing to install on your end." },
  { title: "Monitor & improve", description: "We monitor every conversation, tune answers, and retrain as your products and policies change." },
]

const WHY_US = [
  { title: "We handle the API costs", description: "Model usage is bundled and managed on our side — no AI accounts, no usage bills, no surprise overages for you." },
  { title: "Custom integrations included", description: "We wire the agent into your help desk, store, and channels — Zendesk, Intercom, Gmail, Shopify, WhatsApp, and more." },
  { title: "Hosted & monitored for you", description: "It runs on our infrastructure with 24/7 monitoring. If something breaks, we catch and fix it before you notice." },
  { title: "Tuned to your brand voice", description: "Answers sound like your team, follow your policies, and escalate exactly where you tell them to." },
]

const FAQS = [
  { q: "What is an AI customer support agent?", a: "It's an AI software agent that reads customer messages, understands the request, and replies with accurate answers from your help docs, policies, and order data — across email, chat, and WhatsApp. It resolves routine questions automatically and escalates anything complex to your team." },
  { q: "How is this different from a chatbot?", a: "Old chatbots follow rigid decision trees and break the moment a customer phrases something unexpectedly. This agent understands natural language, pulls live data from your systems, and takes real actions like checking an order or starting a refund — then hands off to a human with full context when needed." },
  { q: "Which channels does it support?", a: "Email, live chat on your website, and WhatsApp out of the box. We can also connect it to help desks like Zendesk and Intercom so it works inside the tools your team already uses." },
  { q: "Will it replace my support team?", a: "No — it removes the repetitive volume so your team focuses on the conversations that need a human. You decide which cases it handles end-to-end and which it escalates." },
  { q: "How long does it take to go live?", a: "Most support agents are live within days. After a short discovery call, we build, integrate, and deploy it for you — there's nothing to install or configure on your side." },
  { q: "Do I need to manage AI accounts or API keys?", a: "No. We manage all model access and API costs on our infrastructure. You get a working agent and a single point of contact — no DevOps, no usage bills." },
]

// ── Structured data ───────────────────────────────────────────────────────────

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${PAGE_URL}#service`,
      name: "Customer Support AI Agent",
      serviceType: "Customer Support AI Agent",
      description:
        "A custom AI customer support agent that answers FAQs, checks order status, handles refunds, and escalates to humans — across email, chat, and WhatsApp.",
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
        { "@type": "ListItem", position: 2, name: "Customer support", item: PAGE_URL },
      ],
    },
  ],
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function CustomerSupportPage() {
  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main>
        <AgentHeroSection
          title="Customer support"
          gradient={GRADIENT}
          Icon={Headphones}
          heroSubhead="An always-on support agent that resolves the repetitive tickets instantly and hands the rest to your team — fully built, hosted, and managed by us."
          impact={IMPACT}
          showBreadcrumb={false}
          showHeroStats={false}
        />
        <AgentOverviewSection paragraphs={OVERVIEW} />
        <AgentWorkflowSection
          heading="Tickets resolved before your team sees them"
          steps={WORKFLOW_STEPS}
          logos={WORKFLOW_LOGOS}
          logoSuffix="+ email, chat & more"
        />
        <AgentUseCasesSection agentTitle="Customer support" useCases={USE_CASES} />
        <AgentHowWeBuildSection steps={HOW_WE_BUILD} />
        <AgentImpactSection stats={IMPACT} />
        <AgentWhyUsSection items={WHY_US} />
        <AgentFaqSection faqs={FAQS} />
        <AgentCtaSection agentTitle="customer support" />
      </main>
      <Footer />
    </div>
  )
}

import {
  Headphones, Users, Calendar, FileText, Package, UserCheck,
  Receipt, HelpCircle,
} from "lucide-react"

// ─── Types ────────────────────────────────────────────────────────────────────

export type AgentDetail = {
  /** SEO */
  metaTitle: string
  metaDescription: string
  keywords: string[]
  publishedTime: string
  /** Hero */
  heroSubhead: string
  /** Overview — 1–2 short paragraphs */
  overview: string[]
  /** Use cases — concrete scenarios */
  useCases: { title: string; description: string }[]
  /** How we build it — the 4 steps */
  howWeBuild: { title: string; description: string }[]
  /** Illustrative impact — phrased as ranges ("up to", "typically") */
  impact: { stat: string; label: string }[]
  /** Why build it with us */
  whyUs: { title: string; description: string }[]
  /** GEO-friendly Q&A */
  faqs: { q: string; a: string }[]
}

export type Agent = {
  id: number
  slug: string
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>
  gradient: string
  title: string
  tagline: string
  stat: string
  description: string
  /** Present only for fully-built agents; drives the detail page. */
  detail?: AgentDetail
}

// ─── Data ─────────────────────────────────────────────────────────────────────

export const AGENTS: Agent[] = [
  {
    id: 1,
    slug: "customer-support",
    icon: Headphones,
    title: "Customer support",
    tagline: "Always-on support without the headcount",
    description:
      "Handles FAQs, order status, refunds, and complaints — across email, chat, and WhatsApp. Escalates to a human when needed.",
    gradient: "linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 55%, #60a5fa 100%)",
    stat: "Up to 90% of tickets resolved automatically",
    detail: {
      metaTitle: "AI Customer Support Agent — Built, Hosted & Managed | Talk to Me Data",
      metaDescription:
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
      publishedTime: "2026-06-25",
      heroSubhead:
        "An always-on support agent that resolves the repetitive tickets instantly and hands the rest to your team — fully built, hosted, and managed by us.",
      overview: [
        "An AI customer support agent is a software agent that reads incoming customer messages, understands what's being asked, and replies with accurate answers drawn from your help docs, policies, and order data. It works across the channels your customers already use — email, live chat, and WhatsApp — and it works around the clock.",
        "It's a fit for any team drowning in repetitive questions: e-commerce stores fielding \"where's my order?\", SaaS teams answering the same setup questions, or service businesses handling booking and billing queries. The agent clears the predictable volume so your people spend their time on the conversations that actually need a human.",
      ],
      useCases: [
        { title: "Order status & tracking", description: "Answers \"where's my order?\" instantly by pulling live data from your store or shipping provider." },
        { title: "Returns & refunds", description: "Walks customers through your returns policy and kicks off refunds or replacements within your rules." },
        { title: "Product & FAQ answers", description: "Replies to questions about sizing, features, pricing, and availability — grounded in your real content." },
        { title: "Account & billing help", description: "Handles password resets, plan changes, and invoice questions without a human in the loop." },
        { title: "Smart escalation", description: "Recognises angry, complex, or high-value cases and hands them to your team with full context attached." },
        { title: "After-hours coverage", description: "Keeps responding overnight and on weekends, so customers never wait for business hours." },
      ],
      howWeBuild: [
        { title: "Discovery", description: "You describe your support workflow, common tickets, and escalation rules in a 20-minute call — no specs or documents required." },
        { title: "Build & integrate", description: "We design and configure the agent, connect it to your help desk, store, and channels, and train it on your docs and policies." },
        { title: "Deploy & host", description: "We deploy it on our infrastructure and put it live on your email, chat, and WhatsApp. Nothing to install on your end." },
        { title: "Monitor & improve", description: "We monitor every conversation, tune answers, and retrain as your products and policies change." },
      ],
      impact: [
        { stat: "Up to 90%", label: "of repetitive tickets resolved without a human" },
        { stat: "< 1 min", label: "typical first-response time, 24/7" },
        { stat: "Days, not months", label: "from brief to a live support agent" },
      ],
      whyUs: [
        { title: "We handle the API costs", description: "Model usage is bundled and managed on our side — no AI accounts, no usage bills, no surprise overages for you." },
        { title: "Custom integrations included", description: "We wire the agent into your help desk, store, and channels — Zendesk, Intercom, Gmail, Shopify, WhatsApp, and more." },
        { title: "Hosted & monitored for you", description: "It runs on our infrastructure with 24/7 monitoring. If something breaks, we catch and fix it before you notice." },
        { title: "Tuned to your brand voice", description: "Answers sound like your team, follow your policies, and escalate exactly where you tell them to." },
      ],
      faqs: [
        { q: "What is an AI customer support agent?", a: "It's an AI software agent that reads customer messages, understands the request, and replies with accurate answers from your help docs, policies, and order data — across email, chat, and WhatsApp. It resolves routine questions automatically and escalates anything complex to your team." },
        { q: "How is this different from a chatbot?", a: "Old chatbots follow rigid decision trees and break the moment a customer phrases something unexpectedly. This agent understands natural language, pulls live data from your systems, and takes real actions like checking an order or starting a refund — then hands off to a human with full context when needed." },
        { q: "Which channels does it support?", a: "Email, live chat on your website, and WhatsApp out of the box. We can also connect it to help desks like Zendesk and Intercom so it works inside the tools your team already uses." },
        { q: "Will it replace my support team?", a: "No — it removes the repetitive volume so your team focuses on the conversations that need a human. You decide which cases it handles end-to-end and which it escalates." },
        { q: "How long does it take to go live?", a: "Most support agents are live within days. After a short discovery call, we build, integrate, and deploy it for you — there's nothing to install or configure on your side." },
        { q: "Do I need to manage AI accounts or API keys?", a: "No. We manage all model access and API costs on our infrastructure. You get a working agent and a single point of contact — no DevOps, no usage bills." },
      ],
    },
  },
  {
    id: 2,
    slug: "lead-qualification",
    icon: Users,
    title: "Lead qualification",
    tagline: "Only talk to leads worth your time",
    description:
      "Engages every inbound lead instantly, asks qualifying questions, scores intent, and routes hot leads to your inbox or CRM — 24/7.",
    gradient: "linear-gradient(135deg, #185FA5 0%, #2563eb 55%, #93c5fd 100%)",
    stat: "Typically 3× more qualified conversations",
    detail: {
      metaTitle: "AI Lead Qualification Agent — Built, Hosted & Managed | Talk to Me Data",
      metaDescription:
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
      publishedTime: "2026-06-25",
      heroSubhead:
        "An agent that replies to every inbound lead in seconds, qualifies them on the spot, and routes the hot ones straight to your team — fully built, hosted, and managed by us.",
      overview: [
        "An AI lead qualification agent engages every inbound lead the moment they arrive, asks the questions your sales team would ask, scores how likely they are to buy, and routes the best ones to the right rep or into your CRM. It does this instantly, 24/7, in a natural conversation.",
        "It's built for teams losing deals to slow follow-up: agencies, B2B SaaS, real estate, and service businesses where speed-to-lead decides who wins. Instead of leads going cold in a shared inbox overnight, every one gets an immediate, qualifying response.",
      ],
      useCases: [
        { title: "Instant lead response", description: "Replies to new form fills, chats, and DMs in seconds — before a competitor gets there." },
        { title: "Qualifying questions", description: "Asks about budget, timeline, team size, and use case, the way your best SDR would." },
        { title: "Intent scoring", description: "Ranks each lead hot, warm, or cold based on their answers and behaviour, so reps prioritise correctly." },
        { title: "CRM routing", description: "Pushes qualified leads — with notes and scores — straight into HubSpot, Salesforce, or your pipeline." },
        { title: "Meeting booking", description: "Books qualified prospects directly onto the right rep's calendar without back-and-forth." },
        { title: "Disqualify politely", description: "Filters out poor-fit leads with a helpful response, so your team never wastes a call." },
      ],
      howWeBuild: [
        { title: "Discovery", description: "You tell us what a good lead looks like, your qualifying criteria, and where leads should go — in one short call." },
        { title: "Build & integrate", description: "We configure the agent's questions and scoring, then connect it to your forms, chat, and CRM." },
        { title: "Deploy & host", description: "We put it live on your site and inbound channels, running on our infrastructure. No setup on your end." },
        { title: "Monitor & improve", description: "We watch conversations, refine the scoring, and adjust as your ideal customer profile evolves." },
      ],
      impact: [
        { stat: "Typically 3×", label: "more qualified conversations for your team" },
        { stat: "Seconds", label: "to first response, day or night" },
        { stat: "Days, not months", label: "from brief to a live qualification agent" },
      ],
      whyUs: [
        { title: "We handle the API costs", description: "Model usage is bundled and managed on our side — no AI accounts and no usage bills to track." },
        { title: "Custom integrations included", description: "We connect it to your forms, chat, and CRM — HubSpot, Salesforce, Slack, and more — so qualified leads land where your team works." },
        { title: "Hosted & monitored for you", description: "It runs on our infrastructure with 24/7 monitoring, so no lead ever goes unanswered." },
        { title: "Tuned to your sales process", description: "Asks your qualifying questions, scores against your criteria, and routes by your rules." },
      ],
      faqs: [
        { q: "What is an AI lead qualification agent?", a: "It's an AI software agent that engages every inbound lead instantly, asks qualifying questions, scores their intent, and routes the best leads to your sales team or CRM — automatically and 24/7." },
        { q: "How does it decide which leads are qualified?", a: "We configure it with your qualifying criteria — things like budget, timeline, company size, and use case. It asks those questions in a natural conversation, scores the answers, and ranks each lead hot, warm, or cold so your reps focus on the best ones." },
        { q: "Does it work with my CRM?", a: "Yes. We integrate it with CRMs like HubSpot and Salesforce so qualified leads are pushed in automatically with their conversation notes and score attached. It can also book meetings directly onto a rep's calendar." },
        { q: "Why does speed-to-lead matter?", a: "Leads are far more likely to convert when they get a response within minutes. This agent replies in seconds, around the clock, so leads never go cold waiting in an inbox overnight or over the weekend." },
        { q: "How long does it take to go live?", a: "Most lead qualification agents are live within days. After a short discovery call, we build, integrate, and deploy it for you — nothing to install or configure on your side." },
        { q: "Do I need to manage AI accounts or API keys?", a: "No. We manage all model access and API costs on our infrastructure. You get a working agent connected to your stack — no DevOps and no usage bills." },
      ],
    },
  },
  {
    id: 3,
    slug: "booking-scheduling",
    icon: Calendar,
    title: "Booking & scheduling",
    tagline: "Zero back-and-forth, full calendars",
    description:
      "Lets clients self-book, reschedule, and cancel — synced to your calendar. Sends reminders automatically and handles no-shows.",
    gradient: "linear-gradient(135deg, #1d4ed8 0%, #4338ca 55%, #818cf8 100%)",
    stat: "Typically saves 5+ hours per week",
    detail: {
      metaTitle: "AI Booking & Scheduling Agent — Built, Hosted & Managed | Talk to Me Data",
      metaDescription:
        "A custom AI booking and scheduling agent that lets clients self-book, reschedule, and cancel in a natural conversation — synced to your calendar, with automatic reminders. We build, host, and manage it. Live in days.",
      keywords: [
        "ai booking agent",
        "ai scheduling assistant",
        "automated appointment booking",
        "ai appointment scheduler",
        "booking automation agent",
        "ai agent for scheduling",
        "reduce no-shows automation",
      ],
      publishedTime: "2026-06-25",
      heroSubhead:
        "An agent that books, reschedules, and reminds — in a natural conversation, synced to your calendar — fully built, hosted, and managed by us.",
      overview: [
        "An AI booking and scheduling agent lets your clients book, reschedule, and cancel appointments through a simple conversation on your site, chat, or WhatsApp. It checks real availability, writes the appointment straight to your calendar, and sends reminders automatically to cut down no-shows.",
        "It's ideal for any appointment-driven business — clinics, salons, agencies, consultants, and home services — where staff lose hours to scheduling back-and-forth and revenue leaks through missed slots and no-shows.",
      ],
      useCases: [
        { title: "Self-service booking", description: "Clients book the right service and time in a natural chat — no forms, no phone tag." },
        { title: "Reschedule & cancel", description: "Handles changes automatically and frees the slot so it can be filled by someone else." },
        { title: "Calendar sync", description: "Writes every booking straight to Google Calendar or your scheduling tool in real time." },
        { title: "Automatic reminders", description: "Sends confirmation and reminder messages to cut no-shows before they happen." },
        { title: "No-show recovery", description: "Follows up on missed appointments and offers a new time automatically." },
        { title: "Smart availability", description: "Respects your hours, buffers, and staff assignments so it never double-books." },
      ],
      howWeBuild: [
        { title: "Discovery", description: "You tell us your services, hours, staff, and booking rules in a short call — no setup work on your end." },
        { title: "Build & integrate", description: "We configure the agent and connect it to your calendar and channels so it books against real availability." },
        { title: "Deploy & host", description: "We put it live on your site, chat, and WhatsApp, running on our infrastructure." },
        { title: "Monitor & improve", description: "We monitor bookings, refine the flow, and adjust reminders to keep your calendar full." },
      ],
      impact: [
        { stat: "5+ hours", label: "typically saved per week on scheduling admin" },
        { stat: "Fewer no-shows", label: "with automatic confirmations and reminders" },
        { stat: "Days, not months", label: "from brief to a live booking agent" },
      ],
      whyUs: [
        { title: "We handle the API costs", description: "Model usage is bundled and managed on our side — no AI accounts and no usage bills." },
        { title: "Custom integrations included", description: "We connect it to your calendar and channels — Google Calendar, your scheduling tool, WhatsApp, and chat." },
        { title: "Hosted & monitored for you", description: "It runs on our infrastructure with 24/7 monitoring, so bookings keep flowing around the clock." },
        { title: "Tuned to your rules", description: "Respects your hours, buffers, services, and staff assignments — it never double-books." },
      ],
      faqs: [
        { q: "What is an AI booking and scheduling agent?", a: "It's an AI software agent that lets clients book, reschedule, and cancel appointments in a natural conversation. It checks your real availability, writes bookings to your calendar, and sends automatic reminders to reduce no-shows — 24/7." },
        { q: "Does it sync with my calendar?", a: "Yes. We connect it to Google Calendar or your scheduling tool so every booking, reschedule, and cancellation updates in real time. It only ever offers slots you're actually available for." },
        { q: "How does it reduce no-shows?", a: "It automatically sends confirmation and reminder messages before each appointment, and can follow up on missed appointments to rebook them — so fewer slots go to waste." },
        { q: "Can clients book without filling out a form?", a: "Yes. Instead of forms or phone tag, clients just chat — on your website, live chat, or WhatsApp — and the agent handles the rest, including picking the right service and staff member." },
        { q: "How long does it take to go live?", a: "Most booking agents are live within days. After a short discovery call, we build, integrate, and deploy it for you — nothing to install on your side." },
        { q: "Do I need to manage AI accounts or API keys?", a: "No. We manage all model access and API costs on our infrastructure. You get a working agent connected to your calendar — no DevOps and no usage bills." },
      ],
    },
  },
  {
    id: 4,
    slug: "document-qa",
    icon: FileText,
    title: "Document Q&A",
    tagline: "Instant answers from your own content",
    description:
      "Upload manuals, policies, or reports. Your agent answers staff or client questions accurately — grounded in your actual documents.",
    gradient: "linear-gradient(135deg, #312e81 0%, #4f46e5 55%, #a5b4fc 100%)",
    stat: "Replaces hours of search daily",
  },
  {
    id: 5,
    slug: "order-tracking",
    icon: Package,
    title: "Order tracking",
    tagline: "Keep customers informed automatically",
    description:
      "Real-time order updates across any channel. Eliminates WISMO tickets before they're raised.",
    gradient: "linear-gradient(135deg, #3730a3 0%, #6d28d9 55%, #c4b5fd 100%)",
    stat: "Up to 80% fewer support tickets",
  },
  {
    id: 6,
    slug: "onboarding",
    icon: UserCheck,
    title: "Onboarding",
    tagline: "Guide every user to their first win",
    description:
      "Walks new users through your product step by step, answers setup questions, and nudges them toward activation milestones.",
    gradient: "linear-gradient(135deg, #4c1d95 0%, #7c3aed 55%, #c4b5fd 100%)",
    stat: "Higher activation, less churn",
  },
  {
    id: 7,
    slug: "invoice-processing",
    icon: Receipt,
    title: "Invoice processing",
    tagline: "Extract, validate, and route automatically",
    description:
      "Reads incoming invoices, extracts data, matches against POs, and routes for approval — no spreadsheet required.",
    gradient: "linear-gradient(135deg, #1e3a8a 0%, #3730a3 55%, #6366f1 100%)",
    stat: "90% faster invoice processing",
  },
  {
    id: 8,
    slug: "hr-helpdesk",
    icon: HelpCircle,
    title: "HR helpdesk",
    tagline: "Answer HR questions without involving HR",
    description:
      "Gives employees instant answers on leave, benefits, payroll, and procedures — drawn from your internal documentation.",
    gradient: "linear-gradient(135deg, #0f172a 0%, #1e40af 55%, #3b82f6 100%)",
    stat: "~70% of HR queries resolved automatically",
  },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function getAgentBySlug(slug: string): Agent | undefined {
  return AGENTS.find(a => a.slug === slug)
}

/** Slugs of agents with full detail content (i.e. that have a live detail page). */
export function getBuiltAgentSlugs(): string[] {
  return AGENTS.filter(a => a.detail).map(a => a.slug)
}

export function isAgentBuilt(agent: Agent): boolean {
  return Boolean(agent.detail)
}

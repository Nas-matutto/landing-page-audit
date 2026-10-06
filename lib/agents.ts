import {
  Headphones, Globe, House, Receipt, Search,
  Megaphone, Target, BarChart3,
} from "lucide-react"

// ─── Types ────────────────────────────────────────────────────────────────────

export type Agent = {
  id: number
  slug: string
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>
  gradient: string
  title: string
  tagline: string
  stat: string
  description: string
  // Structured outcome for the cards: a short figure + the unit it measures.
  metricValue: string
  metricLabel: string
}

// ─── Data ─────────────────────────────────────────────────────────────────────

export const AGENTS: Agent[] = [
  {
    id: 1,
    slug: "social-media",
    icon: Megaphone,
    title: "Social media",
    tagline: "Content that posts itself — built around what works",
    description:
      "Analyzes your past content, finds the formats and topics that perform best, and drafts new posts for every channel — scheduled and ready to publish.",
    gradient: "linear-gradient(135deg, #7c3aed 0%, #a855f7 55%, #f0abfc 100%)",
    stat: "Typically 10+ posts drafted per week",
    metricValue: "10+",
    metricLabel: "posts drafted / week",
  },
  {
    id: 2,
    slug: "lead-finder",
    icon: Target,
    title: "Lead finder",
    tagline: "A pipeline that fills itself while you sleep",
    description:
      "Researches your ideal customer profile, finds matching companies and contacts, enriches their data, and delivers warm, verified leads into your CRM every day.",
    gradient: "linear-gradient(135deg, #064e3b 0%, #059669 55%, #6ee7b7 100%)",
    stat: "Typically 50–200 verified leads per week",
    metricValue: "50–200",
    metricLabel: "verified leads / week",
  },
  {
    id: 3,
    slug: "data-entry-reporting",
    icon: BarChart3,
    title: "Data entry & reporting",
    tagline: "Accurate reports, zero manual data work",
    description:
      "Pulls data from your tools, cleans and structures it, and generates ready-to-share reports on a schedule — so your team spends time on decisions, not spreadsheets.",
    gradient: "linear-gradient(135deg, #0c4a6e 0%, #0284c7 55%, #7dd3fc 100%)",
    stat: "Typically saves 10+ hours of manual work per week",
    metricValue: "10+ hrs",
    metricLabel: "saved / week",
  },
  {
    id: 4,
    slug: "customer-support",
    icon: Headphones,
    title: "Customer support",
    tagline: "Always-on support without the headcount",
    description:
      "Handles FAQs, order status, refunds, and complaints — across email, chat, and WhatsApp. Escalates to a human when needed.",
    gradient: "linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 55%, #60a5fa 100%)",
    stat: "Up to 90% of tickets resolved automatically",
    metricValue: "90%",
    metricLabel: "tickets auto-resolved",
  },
  {
    id: 5,
    slug: "website-manager",
    icon: Globe,
    title: "Website manager",
    tagline: "Change your website in plain English",
    description:
      "Shows your live website and makes the changes you ask for, through GitHub or WordPress. Ideal for sites built with Claude Code and Codex.",
    gradient: "linear-gradient(135deg, #4338ca 0%, #6366f1 55%, #67e8f9 100%)",
    stat: "Most changes live in 1 to 3 minutes",
    metricValue: "1–3 min",
    metricLabel: "from request to live",
  },
  {
    id: 6,
    slug: "real-estate-agent",
    icon: House,
    title: "Real estate agent",
    tagline: "Find your next listing before anyone else",
    description:
      "An AI agent for realtors: finds homeowners likely to sell in public property records, pulls comps, and builds just-sold mailing lists with owner names and addresses.",
    gradient: "linear-gradient(135deg, #1d4ed8 0%, #4338ca 55%, #818cf8 100%)",
    stat: "Up to 100 likely sellers per search",
    metricValue: "100",
    metricLabel: "likely sellers / search",
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
    stat: "Up to 90% faster invoice processing",
    metricValue: "90%",
    metricLabel: "faster processing",
  },
  {
    id: 8,
    slug: "seo-geo",
    icon: Search,
    title: "SEO & GEO",
    tagline: "Pages that rank on Google and in AI answers",
    description:
      "Researches what your buyers search on Google and ask AI, writes SEO-ready pages engineered to rank in both, and publishes them to your site automatically.",
    gradient: "linear-gradient(135deg, #9a3412 0%, #ea580c 55%, #fdba74 100%)",
    stat: "10+ SEO + GEO pages published per month",
    metricValue: "10+ pages",
    metricLabel: "SEO + GEO, per month",
  },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────

const BUILT_SLUGS = new Set([
  "social-media",
  "lead-finder",
  "data-entry-reporting",
  "customer-support",
  "website-manager",
  "real-estate-agent",
  "invoice-processing",
  "seo-geo",
])

export function getAgentBySlug(slug: string): Agent | undefined {
  return AGENTS.find(a => a.slug === slug)
}

export function isAgentBuilt(agent: Agent): boolean {
  return BUILT_SLUGS.has(agent.slug)
}

import {
  Headphones, Users, Calendar, Receipt, HelpCircle,
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
    slug: "lead-qualification",
    icon: Users,
    title: "Lead qualification",
    tagline: "Only talk to leads worth your time",
    description:
      "Engages every inbound lead instantly, asks qualifying questions, scores intent, and routes hot leads to your inbox or CRM — 24/7.",
    gradient: "linear-gradient(135deg, #185FA5 0%, #2563eb 55%, #93c5fd 100%)",
    stat: "Typically 3× more qualified conversations",
    metricValue: "3×",
    metricLabel: "more qualified convos",
  },
  {
    id: 6,
    slug: "booking-scheduling",
    icon: Calendar,
    title: "Booking & scheduling",
    tagline: "Zero back-and-forth, full calendars",
    description:
      "Lets clients self-book, reschedule, and cancel — synced to your calendar. Sends reminders automatically and handles no-shows.",
    gradient: "linear-gradient(135deg, #1d4ed8 0%, #4338ca 55%, #818cf8 100%)",
    stat: "Typically saves 5+ hours per week",
    metricValue: "5+ hrs",
    metricLabel: "saved / week",
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
    slug: "hr-helpdesk",
    icon: HelpCircle,
    title: "HR helpdesk",
    tagline: "Answer HR questions without involving HR",
    description:
      "Gives employees instant answers on leave, benefits, payroll, and procedures — drawn from your internal documentation.",
    gradient: "linear-gradient(135deg, #0f172a 0%, #1e40af 55%, #3b82f6 100%)",
    stat: "~70% of HR queries resolved automatically",
    metricValue: "70%",
    metricLabel: "HR queries resolved",
  },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────

const BUILT_SLUGS = new Set([
  "social-media",
  "lead-finder",
  "data-entry-reporting",
  "customer-support",
  "lead-qualification",
  "booking-scheduling",
  "invoice-processing",
])

export function getAgentBySlug(slug: string): Agent | undefined {
  return AGENTS.find(a => a.slug === slug)
}

export function isAgentBuilt(agent: Agent): boolean {
  return BUILT_SLUGS.has(agent.slug)
}

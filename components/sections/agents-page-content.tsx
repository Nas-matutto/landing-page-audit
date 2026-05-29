"use client"

import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { useState, useEffect, useMemo } from "react"
import {
  Headphones, Users, Calendar, FileText, Package, UserCheck,
  Receipt, HelpCircle, ArrowRight, Zap, Check,
  Server, KeyRound, Bot, Activity, RefreshCw, Plug, Shield, LayoutDashboard,
} from "lucide-react"
import { CardStack, CardStackItem } from "@/components/ui/card-stack"
import { FaSlack, FaWhatsapp, FaGoogle } from "react-icons/fa"
import {
  SiNotion, SiSalesforce, SiHubspot, SiShopify, SiStripe,
  SiZendesk, SiGmail, SiAirtable, SiMailchimp, SiAsana,
  SiTrello, SiIntercom, SiJira,
} from "react-icons/si"

// ─── Rotating hero words ─────────────────────────────────────────────────────

const ROTATING_WORDS = ["Customer Service", "Marketing", "Sales", "HR", "Finance", "Operations"]

function RotatingWord() {
  const [index, setIndex] = useState(0)
  const titles = useMemo(() => ROTATING_WORDS, [])

  useEffect(() => {
    const id = setTimeout(() => setIndex(i => (i + 1) % titles.length), 2200)
    return () => clearTimeout(id)
  }, [index, titles])

  return (
    <span className="relative inline-flex justify-center w-full overflow-hidden" style={{ height: "1.15em" }}>
      {titles.map((word, i) => (
        <motion.span
          key={word}
          className="absolute font-bold bg-clip-text text-transparent bg-linear-to-r from-primary to-violet-500"
          initial={{ opacity: 0, y: 60 }}
          animate={index === i ? { opacity: 1, y: 0 } : { opacity: 0, y: index > i ? -60 : 60 }}
          transition={{ type: "spring", stiffness: 80, damping: 18 }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  )
}

// ─── Agent card data ──────────────────────────────────────────────────────────

type AgentItem = CardStackItem & {
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>
  gradient: string
  tagline: string
  stat: string
}

const AGENTS: AgentItem[] = [
  {
    id: 1,
    icon: Headphones,
    title: "Customer support",
    tagline: "Always-on support without the headcount",
    description: "Handles FAQs, order status, refunds, and complaints — across email, chat, and WhatsApp. Escalates to a human when needed.",
    gradient: "linear-gradient(135deg, #1e40af 0%, #2563eb 55%, #60a5fa 100%)",
    stat: "92% resolved automatically",
  },
  {
    id: 2,
    icon: Users,
    title: "Lead qualification",
    tagline: "Only talk to leads worth your time",
    description: "Engages every inbound lead instantly, asks qualifying questions, scores intent, and routes hot leads to your inbox or CRM — 24/7.",
    gradient: "linear-gradient(135deg, #0f766e 0%, #0d9488 55%, #2dd4bf 100%)",
    stat: "3× more qualified conversations",
  },
  {
    id: 3,
    icon: Calendar,
    title: "Booking & scheduling",
    tagline: "Zero back-and-forth, full calendars",
    description: "Lets clients self-book, reschedule, and cancel — synced to your calendar. Sends reminders automatically and handles no-shows.",
    gradient: "linear-gradient(135deg, #92400e 0%, #d97706 55%, #fbbf24 100%)",
    stat: "Saves 5+ hours per week",
  },
  {
    id: 4,
    icon: FileText,
    title: "Document Q&A",
    tagline: "Instant answers from your own content",
    description: "Upload manuals, policies, or reports. Your agent answers staff or client questions accurately — grounded in your actual documents.",
    gradient: "linear-gradient(135deg, #4c1d95 0%, #7c3aed 55%, #a78bfa 100%)",
    stat: "Replaces hours of search daily",
  },
  {
    id: 5,
    icon: Package,
    title: "Order tracking",
    tagline: "Keep customers informed automatically",
    description: "Real-time order updates across any channel. Eliminates WISMO tickets before they're raised.",
    gradient: "linear-gradient(135deg, #9a3412 0%, #ea580c 55%, #fb923c 100%)",
    stat: "Up to 80% fewer support tickets",
  },
  {
    id: 6,
    icon: UserCheck,
    title: "Onboarding",
    tagline: "Guide every user to their first win",
    description: "Walks new users through your product step by step, answers setup questions, and nudges them toward activation milestones.",
    gradient: "linear-gradient(135deg, #065f46 0%, #16a34a 55%, #4ade80 100%)",
    stat: "Higher activation, less churn",
  },
  {
    id: 7,
    icon: Receipt,
    title: "Invoice processing",
    tagline: "Extract, validate, and route automatically",
    description: "Reads incoming invoices, extracts data, matches against POs, and routes for approval — no spreadsheet required.",
    gradient: "linear-gradient(135deg, #881337 0%, #e11d48 55%, #fb7185 100%)",
    stat: "90% faster invoice processing",
  },
  {
    id: 8,
    icon: HelpCircle,
    title: "HR helpdesk",
    tagline: "Answer HR questions without involving HR",
    description: "Gives employees instant answers on leave, benefits, payroll, and procedures — drawn from your internal documentation.",
    gradient: "linear-gradient(135deg, #312e81 0%, #4f46e5 55%, #818cf8 100%)",
    stat: "~70% of HR queries resolved automatically",
  },
]

// ─── Responsive card dimensions ───────────────────────────────────────────────

type CardProps = { width: number; height: number; spreadDeg: number; overlap: number; maxVisible: number }

function useCardProps(): CardProps {
  const [props, setProps] = useState<CardProps>({ width: 500, height: 340, spreadDeg: 42, overlap: 0.44, maxVisible: 7 })
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth
      if (w < 480) {
        setProps({ width: w - 48, height: 260, spreadDeg: 0, overlap: 0, maxVisible: 1 })
      } else if (w < 640) {
        setProps({ width: w - 48, height: 270, spreadDeg: 16, overlap: 0.15, maxVisible: 3 })
      } else if (w < 1024) {
        setProps({ width: 440, height: 310, spreadDeg: 28, overlap: 0.36, maxVisible: 5 })
      } else {
        setProps({ width: 500, height: 340, spreadDeg: 42, overlap: 0.44, maxVisible: 7 })
      }
    }
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])
  return props
}

// ─── What we handle ───────────────────────────────────────────────────────────

const WE_HANDLE = [
  { icon: Server, title: "Cloud infrastructure", body: "Your agent runs on enterprise-grade hosting. Zero DevOps required on your end." },
  { icon: KeyRound, title: "AI model access & API keys", body: "We manage all API access — GPT-4, Claude, and more. You don't need any AI accounts." },
  { icon: Bot, title: "Agent design & configuration", body: "We design, train, and configure your agent from scratch based on a plain-language brief." },
  { icon: Activity, title: "24/7 monitoring & alerts", body: "Uptime monitoring around the clock. If something breaks, we catch and fix it before you notice." },
  { icon: Plug, title: "Integrations & connections", body: "We wire up your tools — email, CRM, Slack, Calendly, Zendesk. No API docs for you to read." },
  { icon: RefreshCw, title: "Ongoing updates", body: "As AI improves, so does your agent. We retrain and redeploy — you always have the latest." },
  { icon: Shield, title: "Security & data isolation", body: "Your data stays yours. Isolated environments, never used for training. Enterprise-grade by default." },
  { icon: LayoutDashboard, title: "Unified dashboard", body: "See all your agents, their activity, and status in one place — no logins to multiple tools." },
]

// ─── Integrations strip ───────────────────────────────────────────────────────

type IntegrationIcon = {
  Icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>
  color: string
  label: string
}

const ROW_1: IntegrationIcon[] = [
  { Icon: FaSlack, color: "#4A154B", label: "Slack" },
  { Icon: SiHubspot, color: "#FF7A59", label: "HubSpot" },
  { Icon: FaWhatsapp, color: "#25D366", label: "WhatsApp" },
  { Icon: SiSalesforce, color: "#00A1E0", label: "Salesforce" },
  { Icon: FaGoogle, color: "#4285F4", label: "Google" },
  { Icon: SiNotion, color: "#374151", label: "Notion" },
  { Icon: SiGmail, color: "#EA4335", label: "Gmail" },
  { Icon: SiShopify, color: "#7AB55C", label: "Shopify" },
]

const ROW_2: IntegrationIcon[] = [
  { Icon: SiStripe, color: "#635BFF", label: "Stripe" },
  { Icon: SiZendesk, color: "#03363D", label: "Zendesk" },
  { Icon: SiAirtable, color: "#18BFFF", label: "Airtable" },
  { Icon: SiMailchimp, color: "#e8a825", label: "Mailchimp" },
  { Icon: SiIntercom, color: "#1F8DED", label: "Intercom" },
  { Icon: SiJira, color: "#0052CC", label: "Jira" },
  { Icon: SiAsana, color: "#F06A6A", label: "Asana" },
  { Icon: SiTrello, color: "#0079BF", label: "Trello" },
]

function repeat<T>(arr: T[], times = 4): T[] {
  return Array.from({ length: times }).flatMap(() => arr)
}

function IntegrationsSection() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      {/* CSS keyframes injected inline — avoids modifying globals.css */}
      <style>{`
        @keyframes scroll-left {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes scroll-right {
          0%   { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .integ-scroll-left  { animation: scroll-left  35s linear infinite; }
        .integ-scroll-right { animation: scroll-right 35s linear infinite; }
      `}</style>

      <div className="max-w-4xl mx-auto px-6 text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1 mb-5 text-xs font-semibold rounded-full border border-primary/20 bg-primary/5 text-primary tracking-widest uppercase">
            ⚡ Integrations
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mb-4">
            Works with your existing tools
          </h2>
          <p className="text-lg text-slate-500 max-w-xl mx-auto">
            Your agents connect to the platforms you already use — no migrations, no new logins. We wire everything up for you.
          </p>
        </motion.div>
      </div>

      {/* Scrolling rows */}
      <div className="relative">
        {/* Row 1 — scrolls left */}
        <div className="flex gap-6 whitespace-nowrap integ-scroll-left mb-6">
          {repeat(ROW_1).map((item, i) => (
            <div
              key={`r1-${i}`}
              title={item.label}
              className="shrink-0 w-16 h-16 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center justify-center hover:shadow-md hover:border-slate-200 transition-shadow"
            >
              <item.Icon className="w-7 h-7" style={{ color: item.color }} />
            </div>
          ))}
        </div>

        {/* Row 2 — scrolls right */}
        <div className="flex gap-6 whitespace-nowrap integ-scroll-right">
          {repeat(ROW_2).map((item, i) => (
            <div
              key={`r2-${i}`}
              title={item.label}
              className="shrink-0 w-16 h-16 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center justify-center hover:shadow-md hover:border-slate-200 transition-shadow"
            >
              <item.Icon className="w-7 h-7" style={{ color: item.color }} />
            </div>
          ))}
        </div>

        {/* Fade overlays */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-linear-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-linear-to-l from-white to-transparent" />
      </div>
    </section>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export function AgentsPageContent() {
  const router = useRouter()
  const cardProps = useCardProps()

  return (
    <>
      {/* ── Hero ── light theme */}
      <section className="relative pt-32 pb-20 bg-linear-to-b from-slate-50 to-white overflow-hidden">
        {/* Subtle radial glow behind rotating text */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="w-150 h-100 bg-primary/8 rounded-full blur-[100px]" />
        </div>
        {/* Dot grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage: "radial-gradient(circle, #cbd5e1 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center"
        >
          <div className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Fully managed · Deployed in 24 hours
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-slate-900 leading-tight mb-4">
            AI agents built for
          </h1>
          <div className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-tight mb-8">
            <RotatingWord />
          </div>

          <p className="text-lg text-slate-500 leading-relaxed max-w-2xl mx-auto mb-10">
            We build, deploy, and host custom AI agents on our infrastructure. Tell us your workflow — your agent is live within 24 hours.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => router.push("/book-demo")}
              className="relative overflow-hidden group flex items-center gap-2 bg-linear-to-r from-primary to-violet-500 text-white font-semibold text-sm px-7 py-3.5 rounded-xl shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all cursor-pointer"
            >
              <span className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
              <span className="relative flex items-center gap-2">
                Book a free call <ArrowRight className="w-4 h-4" />
              </span>
            </button>
            <p className="text-sm text-slate-400">20-minute call · No commitment</p>
          </div>
        </motion.div>
      </section>

      {/* ── CardStack: agent showcase ── */}
      <section className="py-24 sm:py-32 bg-white overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-4"
            >
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mb-4">
                Explore Agents
              </h2>
              <p className="text-slate-500 max-w-xl mx-auto mb-2">
                Click any card in the stack to bring it forward. Drag or swipe to navigate.
              </p>
            </motion.div>

            <CardStack
              items={AGENTS}
              cardWidth={cardProps.width}
              cardHeight={cardProps.height}
              spreadDeg={cardProps.spreadDeg}
              overlap={cardProps.overlap}
              maxVisible={cardProps.maxVisible}
              autoAdvance
              intervalMs={3000}
              pauseOnHover
              showDots
              renderCard={(item: AgentItem, { active }) => (
                <div
                  className="relative h-full w-full flex flex-col justify-between p-7 overflow-hidden"
                  style={{ background: item.gradient }}
                >
                  {/* Decorative circle */}
                  <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-white/8 pointer-events-none" />
                  <div className="absolute -bottom-12 -left-8 w-36 h-36 rounded-full bg-black/10 pointer-events-none" />

                  {/* Top row: icon + label */}
                  <div className="relative flex items-start justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center ring-1 ring-white/20">
                      <item.icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest mt-1">
                      AI Agent
                    </span>
                  </div>

                  {/* Middle: title + tagline + description */}
                  <div className="relative">
                    <h3 className="text-2xl font-bold text-white mb-1">{item.title}</h3>
                    <p className="text-white/70 text-sm font-medium mb-2">{item.tagline}</p>
                    {active && item.description && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-white/55 text-sm leading-relaxed line-clamp-2"
                      >
                        {item.description}
                      </motion.p>
                    )}
                  </div>

                  {/* Bottom: stat + CTA */}
                  <div className="relative flex items-center justify-between">
                    <div className="flex items-center gap-2 bg-white/15 rounded-lg px-3 py-1.5 backdrop-blur-sm">
                      <Zap className="w-3.5 h-3.5 text-white/70 shrink-0" />
                      <span className="text-xs text-white font-semibold">{item.stat}</span>
                    </div>
                    {active && (
                      <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        onClick={e => { e.stopPropagation(); router.push("/book-demo") }}
                        className="flex items-center gap-1.5 text-xs font-bold text-white/80 hover:text-white transition-colors cursor-pointer"
                      >
                        Get this agent <ArrowRight className="w-3 h-3" />
                      </motion.button>
                    )}
                  </div>
                </div>
              )}
            />

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-center text-sm text-slate-400 mt-8"
            >
              Don't see your workflow?{" "}
              <button
                onClick={() => router.push("/book-demo")}
                className="text-primary font-semibold hover:underline cursor-pointer"
              >
                Tell us what you need →
              </button>
            </motion.p>
          </div>
        </div>
      </section>

      {/* ── AI Agents on Demand ── */}
      <section className="py-24 sm:py-32 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

              {/* Left: heading + description */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="lg:sticky lg:top-32"
              >
                <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-4">AI Agents on Demand</p>
                <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 mb-6 text-balance">
                  Plug and play.{" "}
                  <span className="bg-clip-text text-transparent bg-linear-to-r from-primary to-violet-500">
                    We handle everything.
                  </span>
                </h2>
                <p className="text-lg text-slate-500 leading-relaxed mb-8">
                  You don't need a server, an OpenAI account, or a developer on your team. Give us a brief — we handle every layer of the stack and hand you back a working agent.
                </p>

                {/* What you do */}
                <div className="rounded-2xl border border-slate-200 bg-white p-6">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">What you do</p>
                  <ul className="space-y-3">
                    {[
                      "Describe your workflow in plain language (once)",
                      "Get on a 20-minute call with our team",
                      "Use your live agent — request changes anytime",
                    ].map((step, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3.5 h-3.5 text-primary" />
                        </div>
                        <span className="text-sm text-slate-700 leading-relaxed">{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => router.push("/book-demo")}
                  className="relative overflow-hidden group mt-8 flex items-center gap-2 bg-linear-to-r from-primary to-violet-500 text-white font-semibold text-sm px-6 py-3 rounded-xl shadow-md shadow-primary/25 hover:shadow-primary/40 hover:shadow-lg transition-all cursor-pointer"
                >
                  <span className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
                  <span className="relative flex items-center gap-2">
                    Get started <ArrowRight className="w-4 h-4" />
                  </span>
                </button>
              </motion.div>

              {/* Right: what we handle grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest col-span-full mb-2">What we handle</p>
                {WE_HANDLE.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.06 }}
                    className="rounded-2xl border border-slate-200 bg-white p-5 hover:shadow-md hover:border-primary/20 transition-all"
                  >
                    <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                      <item.icon className="w-4 h-4 text-primary" />
                    </div>
                    <h3 className="text-sm font-bold text-slate-800 mb-1.5">{item.title}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed">{item.body}</p>
                  </motion.div>
                ))}
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ── Integrations ── */}
      <IntegrationsSection />

      {/* ── Bottom CTA ── */}
      <section className="py-24 bg-linear-to-br from-primary via-blue-600 to-violet-600 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-violet-400/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-blue-300/15 rounded-full blur-3xl" />
        </div>
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white text-balance mb-4">
              Ready to automate your first workflow?
            </h2>
            <p className="text-white/70 text-lg mb-8 max-w-xl mx-auto">
              Book a free 20-minute call. We'll tell you exactly what your agent can do and get it live within 24 hours.
            </p>
            <button
              onClick={() => router.push("/book-demo")}
              className="relative overflow-hidden group inline-flex items-center gap-2 bg-white text-primary font-bold px-8 py-4 rounded-xl text-base shadow-2xl shadow-black/20 hover:shadow-black/30 transition-all cursor-pointer"
            >
              <span className="absolute inset-0 bg-linear-to-r from-transparent via-primary/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
              <span className="relative flex items-center gap-2">
                Book a free call <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </button>
            <p className="text-white/40 text-sm mt-5">Free call · No commitment · Live in 24h if it's a fit</p>
          </motion.div>
        </div>
      </section>
    </>
  )
}

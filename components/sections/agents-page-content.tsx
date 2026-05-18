"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import { useState, useEffect, useMemo } from "react"
import {
  Headphones, Users, Calendar, FileText, Package, UserCheck,
  Receipt, HelpCircle, ArrowRight, Check, Zap, ChevronRight
} from "lucide-react"

const ROTATING_WORDS = [
  "Customer Service",
  "Marketing",
  "Sales",
  "HR",
  "Finance",
  "Operations",
]

const AGENTS = [
  {
    icon: Headphones,
    color: "#2563eb",
    glow: "rgba(37,99,235,0.25)",
    ring: "ring-blue-500/30",
    bg: "bg-blue-500/10",
    title: "Customer support",
    tagline: "Always-on support without the headcount",
    description: "Handles FAQs, order status, refunds, and complaints. Escalates intelligently when a human is needed — across email, chat, and WhatsApp.",
    capabilities: [
      "Answers FAQs from your knowledge base",
      "Tracks orders via your backend",
      "Handles returns & refunds",
      "Escalates to your team when needed",
      "Works across email, chat, WhatsApp",
    ],
    stat: "92% resolved automatically",
  },
  {
    icon: Users,
    color: "#0d9488",
    glow: "rgba(13,148,136,0.25)",
    ring: "ring-teal-500/30",
    bg: "bg-teal-500/10",
    title: "Lead qualification",
    tagline: "Only talk to leads worth your time",
    description: "Engages every inbound lead instantly, asks qualifying questions, scores intent, and routes hot leads straight to your inbox or CRM — 24/7.",
    capabilities: [
      "Qualifies leads based on your criteria",
      "Asks dynamic follow-up questions",
      "Scores and ranks by intent",
      "Routes to the right rep via Slack",
      "Logs everything to HubSpot/Pipedrive",
    ],
    stat: "3× more qualified conversations",
  },
  {
    icon: Calendar,
    color: "#d97706",
    glow: "rgba(217,119,6,0.25)",
    ring: "ring-amber-500/30",
    bg: "bg-amber-500/10",
    title: "Booking & scheduling",
    tagline: "Zero back-and-forth, full calendars",
    description: "Lets clients self-book, reschedule, and cancel — synced to your calendar. Sends reminders automatically and handles no-shows.",
    capabilities: [
      "Self-serve booking from any channel",
      "Real-time calendar availability sync",
      "Automated reminders via email/SMS",
      "Handles reschedules and cancellations",
      "Works with Google Calendar & Calendly",
    ],
    stat: "Saves 5+ hours per week",
  },
  {
    icon: FileText,
    color: "#7c3aed",
    glow: "rgba(124,58,237,0.25)",
    ring: "ring-violet-500/30",
    bg: "bg-violet-500/10",
    title: "Document Q&A",
    tagline: "Instant answers from your own content",
    description: "Upload manuals, policies, or reports. Your agent reads them and answers staff or client questions accurately — grounded in your actual documents.",
    capabilities: [
      "Trained on your PDFs and docs",
      "Cites the source page per answer",
      "Handles compliance & policy queries",
      "Updates when you add new documents",
      "Works for teams or external clients",
    ],
    stat: "Replaces hours of search daily",
  },
  {
    icon: Package,
    color: "#ea580c",
    glow: "rgba(234,88,12,0.25)",
    ring: "ring-orange-500/30",
    bg: "bg-orange-500/10",
    title: "Order tracking",
    tagline: "Keep customers informed automatically",
    description: "Connects to your fulfilment platform and gives real-time order updates. Eliminates WISMO tickets before they're raised.",
    capabilities: [
      "Real-time order status lookups",
      "Proactive shipping notifications",
      "Handles 'Where is my order?' queries",
      "Integrates with Shopify & WooCommerce",
      "Escalates exceptions to your team",
    ],
    stat: "Up to 80% fewer support tickets",
  },
  {
    icon: UserCheck,
    color: "#16a34a",
    glow: "rgba(22,163,74,0.25)",
    ring: "ring-emerald-500/30",
    bg: "bg-emerald-500/10",
    title: "Onboarding",
    tagline: "Guide every user to their first win",
    description: "Walks new users through your product step by step, answers setup questions, and nudges them toward activation milestones — hands-free.",
    capabilities: [
      "Personalised onboarding per user type",
      "Answers product questions in context",
      "Sends timely nudges and check-ins",
      "Tracks progress and flags drop-off",
      "Integrates with your product or CRM",
    ],
    stat: "Higher activation, less churn",
  },
  {
    icon: Receipt,
    color: "#e11d48",
    glow: "rgba(225,29,72,0.25)",
    ring: "ring-rose-500/30",
    bg: "bg-rose-500/10",
    title: "Invoice processing",
    tagline: "Extract, validate, and route automatically",
    description: "Reads incoming invoices from email or uploads, extracts data, matches against POs, and routes for approval — without anyone touching a spreadsheet.",
    capabilities: [
      "Extracts data from PDFs and images",
      "Matches invoices to POs automatically",
      "Flags discrepancies for human review",
      "Routes for approval via email/Slack",
      "Integrates with Xero & QuickBooks",
    ],
    stat: "90% faster invoice processing",
  },
  {
    icon: HelpCircle,
    color: "#4f46e5",
    glow: "rgba(79,70,229,0.25)",
    ring: "ring-indigo-500/30",
    bg: "bg-indigo-500/10",
    title: "HR helpdesk",
    tagline: "Answer HR questions without involving HR",
    description: "Gives employees instant answers on leave policies, benefits, payroll, and procedures — drawn from your internal documentation.",
    capabilities: [
      "Covers leave, benefits, payroll FAQs",
      "Trained on your employee handbook",
      "Handles onboarding paperwork queries",
      "Escalates sensitive issues to HR",
      "Available on Slack or your intranet",
    ],
    stat: "~70% of HR queries resolved automatically",
  },
]

function RotatingWord() {
  const [index, setIndex] = useState(0)
  const titles = useMemo(() => ROTATING_WORDS, [])

  useEffect(() => {
    const id = setTimeout(() => {
      setIndex(i => (i + 1) % titles.length)
    }, 2200)
    return () => clearTimeout(id)
  }, [index, titles])

  return (
    <span className="relative inline-flex justify-center w-full overflow-hidden h-[1.15em]">
      {titles.map((word, i) => (
        <motion.span
          key={word}
          className="absolute font-bold bg-clip-text text-transparent bg-linear-to-r from-primary to-violet-400"
          initial={{ opacity: 0, y: 60 }}
          animate={
            index === i
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: index > i ? -60 : 60 }
          }
          transition={{ type: "spring", stiffness: 80, damping: 18 }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  )
}

function AgentCard({ agent, index }: { agent: typeof AGENTS[0]; index: number }) {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: (index % 4) * 0.07 }}
      className="group relative rounded-2xl bg-slate-900 border border-white/8 overflow-hidden cursor-pointer transition-all duration-300 hover:border-white/20"
      style={{
        boxShadow: open ? `0 0 40px ${agent.glow}` : "none",
      }}
      onClick={() => setOpen(o => !o)}
    >
      {/* Glow layer on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at top left, ${agent.glow} 0%, transparent 65%)`,
        }}
      />

      <div className="relative p-6">
        {/* Icon + title row */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className={`w-11 h-11 rounded-xl ${agent.bg} ring-1 ${agent.ring} flex items-center justify-center shrink-0`}>
            <agent.icon className="w-5 h-5" style={{ color: agent.color }} />
          </div>
          <ChevronRight
            className="w-4 h-4 text-white/30 shrink-0 mt-1 transition-transform duration-300"
            style={{ transform: open ? "rotate(90deg)" : "rotate(0deg)" }}
          />
        </div>

        <h3 className="text-base font-bold text-white mb-1">{agent.title}</h3>
        <p className="text-xs font-medium mb-3" style={{ color: agent.color }}>{agent.tagline}</p>
        <p className="text-sm text-white/50 leading-relaxed">{agent.description}</p>

        {/* Expandable capabilities */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="mt-5 pt-5 border-t border-white/8">
                <ul className="space-y-2 mb-5">
                  {agent.capabilities.map((cap, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-white/60">
                      <Check className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: agent.color }} />
                      {cap}
                    </li>
                  ))}
                </ul>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5" style={{ color: agent.color }} />
                    <span className="text-xs font-semibold text-white/70">{agent.stat}</span>
                  </div>
                  <button
                    onClick={e => { e.stopPropagation(); router.push("/book-demo") }}
                    className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                    style={{ backgroundColor: `${agent.color}22`, color: agent.color }}
                  >
                    Get this agent <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

export function AgentsPageContent() {
  const router = useRouter()

  return (
    <>
      {/* Hero — dark */}
      <section className="relative min-h-[70vh] flex flex-col items-center justify-center bg-slate-950 overflow-hidden pt-24 pb-20">
        {/* Subtle grid background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        {/* Glow blobs */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-violet-600/10 rounded-full blur-[100px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center"
        >
          <div className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-white/60 text-xs font-semibold tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Fully managed · Deployed in 24h
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-tight mb-4">
            AI agents built for
          </h1>
          <div className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-tight mb-8">
            <RotatingWord />
          </div>

          <p className="text-lg text-white/50 leading-relaxed max-w-2xl mx-auto mb-10">
            We build, deploy, and host custom AI agents on our infrastructure. Tell us your workflow — we'll have your agent live within 24 hours.
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
            <p className="text-sm text-white/30">20-minute call · No commitment</p>
          </div>
        </motion.div>
      </section>

      {/* Agents grid — light */}
      <section className="py-24 sm:py-32 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-4">All agents</p>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mb-4">
                Click any agent to explore what it does
              </h2>
              <p className="text-slate-500 max-w-xl mx-auto">
                Each agent is custom-built for your business and fully hosted on our infrastructure. No code, no setup, no maintenance.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {AGENTS.map((agent, i) => (
                <AgentCard key={agent.title} agent={agent} index={i} />
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-10 text-center"
            >
              <p className="text-sm text-slate-400">
                Don't see your workflow? We build custom agents too.{" "}
                <button
                  onClick={() => router.push("/book-demo")}
                  className="text-primary font-semibold hover:underline cursor-pointer"
                >
                  Tell us what you need →
                </button>
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-24 bg-slate-950 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-primary/20 rounded-full blur-[100px]" />
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
            <p className="text-white/50 text-lg mb-8 max-w-xl mx-auto">
              Book a free 20-minute call. We'll tell you exactly what your agent can do and get it live within 24 hours.
            </p>
            <button
              onClick={() => router.push("/book-demo")}
              className="relative overflow-hidden group inline-flex items-center gap-2 bg-white text-slate-900 font-bold px-8 py-4 rounded-xl text-base hover:bg-white/90 transition-all cursor-pointer shadow-2xl shadow-black/40"
            >
              <span className="absolute inset-0 bg-linear-to-r from-transparent via-primary/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
              <span className="relative flex items-center gap-2">
                Book a free call <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </button>
            <p className="text-white/25 text-sm mt-5">Free call · No commitment · Live in 24h if it's a fit</p>
          </motion.div>
        </div>
      </section>
    </>
  )
}

"use client"

import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import {
  Headphones, Users, Calendar, FileText, Package, UserCheck,
  Receipt, HelpCircle, ArrowRight, Check, Zap
} from "lucide-react"

const AGENTS = [
  {
    icon: Headphones,
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-100",
    title: "Customer support agent",
    tagline: "Always-on support without the headcount",
    description: "Handles your most common customer questions automatically — order status, FAQs, refunds, and account queries. When something needs a human, it escalates intelligently.",
    capabilities: [
      "Answers FAQs from your knowledge base",
      "Tracks order status via your backend",
      "Handles returns, refunds, and complaints",
      "Escalates to your team when needed",
      "Works across email, chat, and WhatsApp",
    ],
    example: { label: "Response time", value: "< 2 seconds" },
    stat: "92% resolved without human",
  },
  {
    icon: Users,
    color: "text-teal-600",
    bg: "bg-teal-50",
    border: "border-teal-100",
    title: "Lead qualification agent",
    tagline: "Only talk to leads worth your time",
    description: "Engages every inbound lead the moment they arrive, asks the right qualifying questions, scores intent, and routes hot leads straight to your inbox or CRM — 24/7.",
    capabilities: [
      "Qualifies leads based on your criteria",
      "Asks dynamic follow-up questions",
      "Scores and ranks by intent signals",
      "Routes to the right rep via Slack or email",
      "Logs everything to HubSpot or Pipedrive",
    ],
    example: { label: "Avg response delay", value: "Instant" },
    stat: "3× more qualified conversations",
  },
  {
    icon: Calendar,
    color: "text-amber-600",
    bg: "bg-amber-50",
    border: "border-amber-100",
    title: "Booking & scheduling agent",
    tagline: "Zero back-and-forth, full calendars",
    description: "Lets clients self-book, reschedule, and cancel — synced directly to your calendar. Sends reminders automatically and handles no-shows gracefully.",
    capabilities: [
      "Self-serve booking from any channel",
      "Real-time calendar availability sync",
      "Automated reminders via email or SMS",
      "Handles reschedules and cancellations",
      "Works with Google Calendar and Calendly",
    ],
    example: { label: "No-show rate reduction", value: "↓ 60%" },
    stat: "Saves 5+ hours per week",
  },
  {
    icon: FileText,
    color: "text-violet-600",
    bg: "bg-violet-50",
    border: "border-violet-100",
    title: "Document Q&A agent",
    tagline: "Instant answers from your own content",
    description: "Upload your manuals, policies, contracts, or reports. Your agent reads them and answers staff or client questions accurately — grounded in your actual documents.",
    capabilities: [
      "Trained on your PDFs, docs, and sheets",
      "Cites the source page for every answer",
      "Handles policy, procedure, and compliance queries",
      "Updates when you upload new documents",
      "Works for internal teams or external clients",
    ],
    example: { label: "Accuracy", value: "Grounded in your docs" },
    stat: "Replaces hours of search time daily",
  },
  {
    icon: Package,
    color: "text-orange-600",
    bg: "bg-orange-50",
    border: "border-orange-100",
    title: "Order tracking agent",
    tagline: "Keep customers informed, automatically",
    description: "Connects to your fulfilment platform and gives customers real-time order updates across any channel. Reduces WISMO tickets by handling them before they're raised.",
    capabilities: [
      "Real-time order status lookups",
      "Proactive shipping update notifications",
      "Handles 'Where is my order?' queries",
      "Integrates with Shopify, WooCommerce, and more",
      "Escalates exceptions to your team",
    ],
    example: { label: "WISMO tickets eliminated", value: "Up to 80%" },
    stat: "Fewer support tickets, happier customers",
  },
  {
    icon: UserCheck,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    border: "border-emerald-100",
    title: "Onboarding agent",
    tagline: "Guide every new user to their first win",
    description: "Walks new clients or users through your product step by step, answers setup questions, and nudges them towards key activation milestones — all without manual touchpoints.",
    capabilities: [
      "Personalised onboarding flows per user type",
      "Answers product questions in context",
      "Sends timely nudges and check-ins",
      "Tracks progress and flags drop-off",
      "Integrates with your product or CRM",
    ],
    example: { label: "Time to first value", value: "↓ significantly" },
    stat: "Higher activation, less churn",
  },
  {
    icon: Receipt,
    color: "text-rose-600",
    bg: "bg-rose-50",
    border: "border-rose-100",
    title: "Invoice processing agent",
    tagline: "Extract, validate, and route invoices automatically",
    description: "Reads incoming invoices from email or uploads, extracts line items and totals, matches against purchase orders, and routes for approval — without anyone touching a spreadsheet.",
    capabilities: [
      "Extracts data from PDFs and images",
      "Matches invoices to POs automatically",
      "Flags discrepancies for human review",
      "Routes for approval via email or Slack",
      "Integrates with Xero, QuickBooks, and more",
    ],
    example: { label: "Processing time", value: "< 30 seconds per invoice" },
    stat: "Cuts invoice processing time by 90%",
  },
  {
    icon: HelpCircle,
    color: "text-indigo-600",
    bg: "bg-indigo-50",
    border: "border-indigo-100",
    title: "HR helpdesk agent",
    tagline: "Answer every HR question without involving HR",
    description: "Gives employees instant answers to HR questions — leave policies, benefits, payroll dates, and procedures — drawn from your internal documentation.",
    capabilities: [
      "Covers leave, benefits, and payroll FAQs",
      "Trained on your employee handbook",
      "Handles onboarding paperwork queries",
      "Escalates sensitive issues to HR team",
      "Available on Slack or your intranet",
    ],
    example: { label: "HR queries resolved automatically", value: "~70%" },
    stat: "Frees your HR team for real work",
  },
]

export function AgentsPageContent() {
  const router = useRouter()
  const goToDemo = () => router.push("/book-demo")

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-4">AI Agents</p>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-balance mb-6">
                Every agent we{" "}
                <span className="bg-clip-text text-transparent bg-linear-to-r from-primary to-violet-500">
                  build and host
                </span>
                {" "}for you
              </h1>
              <p className="text-lg text-slate-500 leading-relaxed max-w-2xl mx-auto mb-10">
                We build custom AI agents for the workflows that eat the most time in your business. Each one is fully hosted and monitored on our infrastructure — you just use it.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={goToDemo}
                  className="relative overflow-hidden group flex items-center gap-2 bg-linear-to-r from-primary to-violet-500 text-white font-semibold text-sm px-6 py-3 rounded-xl shadow-md shadow-primary/30 hover:shadow-lg hover:shadow-primary/40 transition-all cursor-pointer"
                >
                  <span className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
                  <span className="relative flex items-center gap-2">
                    Book a free call <ArrowRight className="w-4 h-4" />
                  </span>
                </button>
                <p className="text-sm text-slate-400">20-minute call · No commitment</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <div className="bg-slate-50 border-y border-slate-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 divide-x divide-slate-200 max-w-2xl mx-auto">
            {[
              { stat: "8+", label: "Agent types available" },
              { stat: "24h", label: "Average time to go live" },
              { stat: "100%", label: "Hosted & monitored by us" },
            ].map(({ stat, label }, i) => (
              <div key={i} className="py-6 text-center">
                <p className="text-2xl font-black text-foreground">{stat}</p>
                <p className="text-xs text-slate-500 mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Agents grid */}
      <section className="py-24 sm:py-32 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto space-y-8">
            {AGENTS.map((agent, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.05 }}
                className={`rounded-2xl border-2 ${agent.border} bg-white p-8 hover:shadow-md transition-shadow`}
              >
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Left: title + description */}
                  <div className="lg:col-span-2">
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`w-12 h-12 rounded-2xl ${agent.bg} flex items-center justify-center shrink-0`}>
                        <agent.icon className={`w-6 h-6 ${agent.color}`} />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-slate-900">{agent.title}</h2>
                        <p className={`text-sm font-semibold ${agent.color}`}>{agent.tagline}</p>
                      </div>
                    </div>
                    <p className="text-slate-500 leading-relaxed mb-6">{agent.description}</p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {agent.capabilities.map((cap, j) => (
                        <li key={j} className="flex items-start gap-2.5 text-sm text-slate-600">
                          <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                          {cap}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Right: stat card */}
                  <div className="flex flex-col gap-4">
                    <div className={`rounded-xl ${agent.bg} p-5 border ${agent.border}`}>
                      <div className="flex items-center gap-2 mb-3">
                        <Zap className={`w-4 h-4 ${agent.color}`} />
                        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Live example</span>
                      </div>
                      <div className="flex items-center justify-between rounded-lg bg-white/70 px-3 py-2 mb-2">
                        <span className="text-xs text-slate-400">{agent.example.label}</span>
                        <span className="text-xs font-semibold text-slate-700">{agent.example.value}</span>
                      </div>
                      <p className={`text-sm font-bold ${agent.color} mt-3`}>{agent.stat}</p>
                    </div>
                    <button
                      onClick={goToDemo}
                      className="group flex items-center justify-center gap-2 w-full py-3 rounded-xl border-2 border-slate-200 text-sm font-semibold text-slate-700 hover:border-primary/40 hover:text-primary transition-all cursor-pointer"
                    >
                      Get this agent
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
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
              Don't see exactly what you need?
            </h2>
            <p className="text-white/70 text-lg mb-8 max-w-xl mx-auto">
              We build custom agents for almost any workflow. Book a free call and describe what you want — we'll tell you if and how we can build it.
            </p>
            <button
              onClick={goToDemo}
              className="relative overflow-hidden group inline-flex items-center gap-2 bg-white text-primary font-bold px-8 py-4 rounded-xl text-base shadow-2xl shadow-black/20 hover:shadow-black/30 transition-all cursor-pointer"
            >
              <span className="absolute inset-0 bg-linear-to-r from-transparent via-primary/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
              <span className="relative flex items-center gap-2">
                Book a free call <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </button>
            <p className="text-white/40 text-sm mt-5">Free 20-minute call · No commitment · Live in 24 hours if it's a fit</p>
          </motion.div>
        </div>
      </section>
    </>
  )
}

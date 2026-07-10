import Link from "next/link"
import {
  ArrowRight, Check, ChevronDown, Sparkles,
  Camera, ScanLine, Database,
  BarChart2, PenLine, CalendarClock,
  Target, Search,
  Plug, Layers, FileBarChart,
  MessageSquare, Bot, CheckCircle,
  UserPlus, Send,
  CalendarCheck, Bell,
} from "lucide-react"
import {
  SiQuickbooks, SiXero, SiSage, SiZoho,
  SiInstagram, SiTiktok, SiBuffer,
  SiHubspot, SiSalesforce,
  SiShopify, SiGooglesheets, SiStripe,
  SiZendesk, SiWhatsapp, SiIntercom,
  SiSlack, SiGooglecalendar,
} from "react-icons/si"
import type { Agent, AgentDetail } from "@/lib/agents"
import { InvoiceSavingsCalculator } from "@/components/invoice-savings-calculator"

function CtaButton({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <Link
      href="/book-demo"
      className={`relative overflow-hidden group inline-flex items-center gap-2 bg-linear-to-r from-primary to-violet-500 text-white font-semibold text-sm px-7 py-3.5 rounded-xl shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all ${className}`}
    >
      <span className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
      <span className="relative flex items-center gap-2">{children}</span>
    </Link>
  )
}

// ── Shared workflow section ───────────────────────────────────────────────────

type WStep = {
  Icon: React.ComponentType<{ className?: string }>
  step: string
  title: string
  description: string
}

type WLogo = {
  Icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>
  color: string
  label: string
}

function WorkflowSection({
  heading,
  steps,
  logos,
  logoSuffix = "+ any other tool",
}: {
  heading: string
  steps: WStep[]
  logos: WLogo[]
  logoSuffix?: string
}) {
  return (
    <section className="py-20 sm:py-24 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-4">How it works</p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 text-balance">
              {heading}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {steps.map((s, i) => (
              <div key={i} className="relative">
                {i < steps.length - 1 && (
                  <div
                    className="hidden md:flex absolute top-10 z-10 items-center"
                    style={{ left: "calc(100% - 2.5rem)", width: "calc(100% - 5rem)" }}
                  >
                    <div className="flex-1 h-px bg-linear-to-r from-primary/30 to-primary/10" />
                    <ArrowRight className="w-4 h-4 text-primary/30 shrink-0" />
                  </div>
                )}
                <div className="bg-white rounded-2xl border border-slate-200 p-7 shadow-sm h-full flex flex-col">
                  <div className="flex items-center gap-4 mb-5">
                    <span className="text-3xl font-black text-slate-100 leading-none select-none">{s.step}</span>
                    <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <s.Icon className="w-5 h-5 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-base font-bold text-slate-800 mb-2">{s.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{s.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 px-8 py-7 flex flex-col sm:flex-row items-center gap-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 shrink-0">Works with</p>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-5">
              {logos.map(({ Icon, color, label }) => (
                <div key={label} className="flex items-center gap-2">
                  <Icon style={{ color }} className="w-6 h-6 shrink-0" />
                  <span className="text-sm font-semibold text-slate-600">{label}</span>
                </div>
              ))}
              {logoSuffix && <span className="text-sm text-slate-400">{logoSuffix}</span>}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Per-agent workflow data ───────────────────────────────────────────────────

const WORKFLOWS: Record<string, Parameters<typeof WorkflowSection>[0]> = {
  "social-media": {
    heading: "Your social presence — on autopilot",
    steps: [
      {
        Icon: BarChart2,
        step: "01",
        title: "Analyze what works",
        description:
          "The agent scans your past content to find the formats, topics, and hooks that drive the most engagement on each platform.",
      },
      {
        Icon: PenLine,
        step: "02",
        title: "Draft on-brand posts",
        description:
          "New posts are written in your voice and adapted for each platform — Instagram, LinkedIn, TikTok, and more.",
      },
      {
        Icon: CalendarClock,
        step: "03",
        title: "Schedule & publish",
        description:
          "Approved posts are queued at the best time for each channel and published automatically — no manual scheduling needed.",
      },
    ],
    logos: [
      { Icon: SiInstagram, color: "#E1306C", label: "Instagram" },
      { Icon: SiTiktok, color: "#000000", label: "TikTok" },
      { Icon: SiBuffer, color: "#2C4BFF", label: "Buffer" },
    ],
    logoSuffix: "+ LinkedIn, X & more",
  },

  "lead-finder": {
    heading: "A pipeline that fills itself",
    steps: [
      {
        Icon: Target,
        step: "01",
        title: "Define your ICP",
        description:
          "We configure the agent with your ideal customer profile — industry, company size, role, tech stack, and buying intent signals.",
      },
      {
        Icon: Search,
        step: "02",
        title: "Research & find matches",
        description:
          "The agent searches across data sources and the web, identifying companies and contacts that match your criteria daily.",
      },
      {
        Icon: Database,
        step: "03",
        title: "Enrich & deliver to CRM",
        description:
          "Leads are enriched with verified contact details and company context, then pushed into your CRM ready for outreach.",
      },
    ],
    logos: [
      { Icon: SiHubspot, color: "#FF7A59", label: "HubSpot" },
      { Icon: SiSalesforce, color: "#00A1E0", label: "Salesforce" },
    ],
    logoSuffix: "+ any CRM or outbound tool",
  },

  "data-entry-reporting": {
    heading: "Accurate data, zero manual work",
    steps: [
      {
        Icon: Plug,
        step: "01",
        title: "Connect your tools",
        description:
          "The agent pulls data from your CRM, ad platforms, e-commerce store, and spreadsheets automatically on a set schedule.",
      },
      {
        Icon: Layers,
        step: "02",
        title: "Clean & structure",
        description:
          "Raw data is normalised, deduplicated, and formatted — ready for analysis without any manual cleanup.",
      },
      {
        Icon: FileBarChart,
        step: "03",
        title: "Generate & deliver",
        description:
          "Formatted reports land in your inbox, Slack channel, or Google Drive automatically at the cadence you set.",
      },
    ],
    logos: [
      { Icon: SiShopify, color: "#96BF48", label: "Shopify" },
      { Icon: SiGooglesheets, color: "#34A853", label: "Google Sheets" },
      { Icon: SiHubspot, color: "#FF7A59", label: "HubSpot" },
      { Icon: SiStripe, color: "#635BFF", label: "Stripe" },
    ],
    logoSuffix: "+ most business tools",
  },

  "customer-support": {
    heading: "Tickets resolved before your team sees them",
    steps: [
      {
        Icon: MessageSquare,
        step: "01",
        title: "Message arrives",
        description:
          "A customer sends a question via email, live chat, or WhatsApp — at any hour, any day of the week.",
      },
      {
        Icon: Bot,
        step: "02",
        title: "AI reads & responds",
        description:
          "The agent reads the message, pulls from your help docs and order data, and sends an accurate reply in seconds.",
      },
      {
        Icon: CheckCircle,
        step: "03",
        title: "Resolved or escalated",
        description:
          "Routine tickets are closed end-to-end. Complex cases are handed to your team with full conversation context attached.",
      },
    ],
    logos: [
      { Icon: SiZendesk, color: "#03363D", label: "Zendesk" },
      { Icon: SiWhatsapp, color: "#25D366", label: "WhatsApp" },
      { Icon: SiIntercom, color: "#1F8DED", label: "Intercom" },
    ],
    logoSuffix: "+ email, chat & more",
  },

  "lead-qualification": {
    heading: "Every lead qualified in seconds",
    steps: [
      {
        Icon: UserPlus,
        step: "01",
        title: "Lead arrives",
        description:
          "A form fill, chat message, or DM comes in — the agent responds in seconds, before the lead goes cold.",
      },
      {
        Icon: MessageSquare,
        step: "02",
        title: "AI qualifies on the spot",
        description:
          "It asks your qualifying questions naturally, collects budget, timeline, and use case, and scores intent automatically.",
      },
      {
        Icon: Send,
        step: "03",
        title: "Hot leads routed instantly",
        description:
          "Qualified leads are pushed into your CRM with scores and notes attached — or booked onto a rep's calendar directly.",
      },
    ],
    logos: [
      { Icon: SiHubspot, color: "#FF7A59", label: "HubSpot" },
      { Icon: SiSalesforce, color: "#00A1E0", label: "Salesforce" },
      { Icon: SiSlack, color: "#4A154B", label: "Slack" },
    ],
    logoSuffix: "+ any CRM or calendar",
  },

  "booking-scheduling": {
    heading: "Booked, confirmed, and reminded — automatically",
    steps: [
      {
        Icon: MessageSquare,
        step: "01",
        title: "Client starts a chat",
        description:
          "Clients book through a natural conversation on your site, WhatsApp, or chat — no forms, no phone tag.",
      },
      {
        Icon: CalendarCheck,
        step: "02",
        title: "Agent checks availability",
        description:
          "Real availability is checked in real time and the booking is written to your calendar instantly — no double-booking possible.",
      },
      {
        Icon: Bell,
        step: "03",
        title: "Confirmed & reminded",
        description:
          "Confirmations go out immediately and automatic reminders cut no-shows before they happen.",
      },
    ],
    logos: [
      { Icon: SiGooglecalendar, color: "#4285F4", label: "Google Calendar" },
      { Icon: SiWhatsapp, color: "#25D366", label: "WhatsApp" },
      { Icon: SiSlack, color: "#4A154B", label: "Slack" },
    ],
    logoSuffix: "+ any scheduling tool",
  },
}

// ── Invoice-specific workflow (reuses WorkflowSection) ────────────────────────

const INVOICE_STEPS: WStep[] = [
  {
    Icon: Camera,
    step: "01",
    title: "Take a photo",
    description: "Snap the invoice on your phone or forward the PDF to a dedicated email address.",
  },
  {
    Icon: ScanLine,
    step: "02",
    title: "AI reads & extracts",
    description: "The agent reads the invoice in seconds — vendor, line items, amounts, due date — no matter the format.",
  },
  {
    Icon: Database,
    step: "03",
    title: "Added to your system",
    description: "The extracted data is pushed directly into your accounting software, ready for approval.",
  },
]

const INVOICE_LOGOS: WLogo[] = [
  { Icon: SiQuickbooks, color: "#2CA01C", label: "QuickBooks" },
  { Icon: SiXero,       color: "#13B5EA", label: "Xero" },
  { Icon: SiSage,       color: "#00D639", label: "Sage" },
  { Icon: SiZoho,       color: "#E42527", label: "Zoho Books" },
]

// ── Main template ─────────────────────────────────────────────────────────────

export function AgentDetailContent({ agent }: { agent: Agent & { detail: AgentDetail } }) {
  const { detail } = agent
  const Icon = agent.icon

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative pt-32 pb-16 bg-white overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div
            className="absolute -top-24 left-1/2 -translate-x-1/2 w-160 h-160 rounded-full blur-3xl opacity-10"
            style={{ background: agent.gradient }}
          />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          {!detail.hideBreadcrumb && (
            <nav aria-label="Breadcrumb" className="mb-8">
              <ol className="flex items-center justify-center gap-2 text-sm text-slate-400">
                <li><Link href="/agents" className="hover:text-primary transition-colors">Agents</Link></li>
                <li aria-hidden className="text-slate-300">/</li>
                <li className="text-slate-600 font-medium">{agent.title}</li>
              </ol>
            </nav>
          )}

          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 ring-1 ring-white/20 shadow-lg"
            style={{ background: agent.gradient }}
          >
            <Icon className="w-8 h-8 text-white" />
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-slate-900 leading-tight mb-5 text-balance">
            {agent.title}{" "}
            <span className="bg-clip-text text-transparent bg-linear-to-r from-primary to-violet-500">AI Agent</span>
          </h1>

          <p className="text-lg text-slate-500 leading-relaxed max-w-2xl mx-auto mb-9">
            {detail.heroSubhead}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <CtaButton>Book a free call <ArrowRight className="w-4 h-4" /></CtaButton>
            <p className="text-sm text-slate-400">20-minute call · Live in days</p>
          </div>

          {!detail.hideHeroStats && (
            <div className="flex flex-wrap items-center justify-center gap-3">
              {detail.impact.map((m, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-600"
                >
                  <Sparkles className="w-3.5 h-3.5 text-primary shrink-0" />
                  <span className="font-semibold text-slate-800">{m.stat}</span>
                  <span className="text-slate-400">·</span>
                  {m.label}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Overview ── */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-4">What it does</p>
          <div className="space-y-5">
            {detail.overview.map((para, i) => (
              <p key={i} className="text-lg text-slate-600 leading-relaxed">{para}</p>
            ))}
          </div>
        </div>
      </section>

      {/* ── Demo Video (invoice-processing only) ── */}
      {agent.slug === "invoice-processing" && (
        <section className="py-20 sm:py-24 bg-white border-t border-slate-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-10">
              <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-4">Demo</p>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 text-balance">
                Watch 45 seconds Demo
              </h2>
            </div>
            <div className="w-full aspect-video rounded-2xl overflow-hidden shadow-2xl shadow-slate-200 border border-slate-200">
              <iframe
                src="https://www.youtube.com/embed/FKCW-EJV29Q?rel=0"
                title="Invoice Processing AI Agent — 45 Second Demo"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          </div>
        </section>
      )}

      {/* ── Workflow ── */}
      {agent.slug === "invoice-processing" ? (
        <WorkflowSection
          heading="Photo to system in under 30 seconds"
          steps={INVOICE_STEPS}
          logos={INVOICE_LOGOS}
          logoSuffix="+ any ERP or accounting tool"
        />
      ) : WORKFLOWS[agent.slug] ? (
        <WorkflowSection {...WORKFLOWS[agent.slug]} />
      ) : (
        <section className="py-20 sm:py-24 bg-slate-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-14">
                <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-4">Use cases</p>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 text-balance">
                  What your {agent.title.toLowerCase()} agent handles
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {detail.useCases.map((uc, i) => (
                  <div key={i} className="rounded-2xl border border-slate-200 bg-white p-6 hover:shadow-md hover:border-primary/20 transition-all">
                    <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                      <Check className="w-4 h-4 text-primary" />
                    </div>
                    <h3 className="text-base font-bold text-slate-800 mb-1.5">{uc.title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">{uc.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── How we build it ── */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-4">How we build it</p>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 text-balance">
                From brief to live agent — done for you
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {detail.howWeBuild.map((step, i) => (
                <div key={i} className="relative bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                  <span className="text-4xl font-black text-slate-100 leading-none select-none">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-base font-bold text-slate-800 mt-4 mb-2">{step.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── What it saves ── */}
      {agent.slug === "invoice-processing" ? (
        <section className="py-20 sm:py-24 bg-slate-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-4">What it saves</p>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 text-balance">
                See how much time you&apos;ll get back
              </h2>
            </div>
            <InvoiceSavingsCalculator />
          </div>
        </section>
      ) : (
        <section className="py-20 sm:py-24 bg-slate-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-14">
                <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-4">What it saves</p>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 text-balance">
                  The impact, in practice
                </h2>
                <p className="mt-4 text-sm text-slate-400">
                  Illustrative outcomes — your results depend on your volume and workflow.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {detail.impact.map((m, i) => (
                  <div key={i} className="rounded-2xl border border-slate-200 bg-white p-8 text-center">
                    <p className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-linear-to-r from-primary to-violet-500 leading-tight">
                      {m.stat}
                    </p>
                    <p className="text-sm text-slate-500 mt-3 leading-relaxed">{m.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── Why build it with us ── */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-4">Why build it with us</p>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 text-balance">
                You don&apos;t manage a single thing
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {detail.whyUs.map((w, i) => (
                <div key={i} className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-6">
                  <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Check className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-800 mb-1.5">{w.title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">{w.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 sm:py-24 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-4">FAQ</p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 text-balance">
              Common questions
            </h2>
          </div>
          <div className="space-y-3">
            {detail.faqs.map((faq, i) => (
              <details key={i} className="group rounded-2xl border border-slate-200 bg-white px-6 py-1 [&_svg]:open:rotate-180">
                <summary className="flex items-center justify-between gap-4 cursor-pointer list-none py-5 text-base font-semibold text-slate-800">
                  {faq.q}
                  <ChevronDown className="w-5 h-5 text-slate-400 shrink-0 transition-transform" />
                </summary>
                <p className="text-sm text-slate-500 leading-relaxed pb-5 -mt-1">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-24 bg-linear-to-br from-primary via-blue-600 to-violet-600 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-violet-400/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-blue-300/15 rounded-full blur-3xl" />
        </div>
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white text-balance mb-4">
            Ready for your own {agent.title.toLowerCase()} agent?
          </h2>
          <p className="text-white/70 text-lg mb-8 max-w-xl mx-auto">
            Book a free 20-minute call. We&apos;ll tell you exactly what your agent can do and build it for you — API costs, integrations, and hosting included.
          </p>
          <Link
            href="/book-demo"
            className="relative overflow-hidden group inline-flex items-center gap-2 bg-white text-primary font-bold px-8 py-4 rounded-xl text-base shadow-2xl shadow-black/20 hover:shadow-black/30 transition-all"
          >
            <span className="absolute inset-0 bg-linear-to-r from-transparent via-primary/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
            <span className="relative flex items-center gap-2">
              Book a free call <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </Link>
          <p className="text-white/40 text-sm mt-5">Free call · No commitment · Built for you</p>
        </div>
      </section>
    </>
  )
}

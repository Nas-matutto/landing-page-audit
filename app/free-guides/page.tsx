import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { ArrowRight, Zap, Bot, Wrench } from "lucide-react"

export const metadata: Metadata = {
  title: "Free Guides — Talk to me Data",
  description:
    "Free downloadable guides on AI agents, automation, and how to build workflows that save your business time. No signup required.",
  alternates: {
    canonical: "https://talktomedata.com/free-guides",
  },
}

const guides = [
  {
    icon: Zap,
    tag: "Free Checklist",
    title: "The Business Automation Checklist",
    description:
      "Identify which tasks in your business are draining your time — and get a prioritised list of automations you can ship this week. Takes 20 minutes, saves 10+ hours.",
    stats: [
      { value: "20 min", label: "to complete" },
      { value: "10–15h", label: "saved per week" },
      { value: "No code", label: "required" },
    ],
    href: "/free-guides/business-automation-checklist",
    cta: "Get the free checklist",
    gradient: "linear-gradient(135deg, #185FA5, #2563eb)",
    lightBg: "bg-blue-50",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    tagColor: "bg-blue-100 text-blue-700",
  },
  {
    icon: Bot,
    tag: "Free Audit",
    title: "The AI Agent Readiness Audit",
    description:
      "Not sure if your business is ready for AI agents? This audit scores you across four dimensions — data, processes, team, and tooling — and gives you a clear action plan based on your results.",
    stats: [
      { value: "15 min", label: "to complete" },
      { value: "4 areas", label: "scored" },
      { value: "100%", label: "free" },
    ],
    href: "/free-guides/ai-agent-readiness-audit",
    cta: "Get the free audit",
    gradient: "linear-gradient(135deg, #6d28d9, #7c3aed)",
    lightBg: "bg-violet-50",
    iconBg: "bg-violet-100",
    iconColor: "text-violet-600",
    tagColor: "bg-violet-100 text-violet-700",
  },
  {
    icon: Wrench,
    tag: "Free Guide",
    title: "How to Build AI Agents",
    description:
      "A practical walkthrough of automating your manual work with AI agents — the tasks worth automating, how to build your first agent in Claude, the honest limits of the DIY path, and the done-for-you alternative.",
    stats: [
      { value: "2 paths", label: "DIY or done-for-you" },
      { value: "8", label: "workflows covered" },
      { value: "100%", label: "free" },
    ],
    href: "/free-guides/how-to-build-ai-agents",
    cta: "Get the free guide",
    gradient: "linear-gradient(135deg, #0f766e, #14b8a6)",
    lightBg: "bg-teal-50",
    iconBg: "bg-teal-100",
    iconColor: "text-teal-600",
    tagColor: "bg-teal-100 text-teal-700",
  },
]

export default function FreeGuidesPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-32 sm:pt-40 pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">

          {/* Hero */}
          <div className="text-center mb-14">
            <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-semibold rounded-full mb-4">
              Free Guides
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 mb-4">
              Guides to help you build smarter
            </h1>
            <p className="text-lg text-slate-500 max-w-xl mx-auto">
              Free downloadable guides on AI agents and automation for your business. No spam, no upsell — just useful.
            </p>
          </div>

          {/* Guide cards */}
          <div className="grid sm:grid-cols-2 gap-6 mb-8">
            {guides.map((guide) => {
              const Icon = guide.icon
              return (
                <Link
                  key={guide.href}
                  href={guide.href}
                  className="group flex flex-col rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg hover:border-slate-300 transition-all duration-200"
                >
                  {/* Coloured header */}
                  <div
                    className="px-7 pt-7 pb-10 relative overflow-hidden"
                    style={{ background: guide.gradient }}
                  >
                    {/* subtle grid texture */}
                    <div
                      className="absolute inset-0 opacity-10"
                      style={{
                        backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)",
                        backgroundSize: "20px 20px",
                      }}
                    />
                    <div className="relative">
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-white/20 text-white mb-4">
                        {guide.tag}
                      </span>
                      <div className="w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center mb-4">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <h2 className="text-xl font-bold text-white leading-snug">
                        {guide.title}
                      </h2>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="flex flex-col flex-1 bg-white px-7 py-6">
                    <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-1">
                      {guide.description}
                    </p>

                    {/* Stats row */}
                    <div className={`grid grid-cols-3 gap-2 rounded-xl p-4 mb-6 ${guide.lightBg}`}>
                      {guide.stats.map((s) => (
                        <div key={s.label} className="text-center">
                          <p className="text-sm font-bold text-slate-800">{s.value}</p>
                          <p className="text-xs text-slate-500 mt-0.5">{s.label}</p>
                        </div>
                      ))}
                    </div>

                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:gap-3 transition-all duration-200">
                      {guide.cta}
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>

          {/* More coming */}
          <div className="border border-dashed border-slate-200 rounded-2xl p-10 text-center">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">More coming soon</p>
            <p className="text-slate-400 text-sm">
              More guides on AI agents, lead generation, and automation dropping soon.
            </p>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  )
}

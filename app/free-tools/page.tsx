import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Free Tools — Talk to me Data",
  description:
    "Free calculators and resources for teams exploring AI automation. See how much time and money an AI agent could save your business — no signup required.",
  alternates: {
    canonical: "https://talktomedata.com/free-tools",
  },
}

const TOOLS = [
  {
    number: "01",
    href: "/free-tools/calculator",
    label: "Calculator",
    title: "Workflow Time Savings Calculator",
    description:
      "Enter how many hours your team spends on manual tasks each week. Get an instant estimate of time saved and annual cost — at $15/hr.",
    cta: "Open calculator →",
    gradient: "linear-gradient(135deg, #185FA5, #2563eb, #7c3aed)",
    icon: (
      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    number: "02",
    href: "/free-tools/workflow-mapper",
    label: "Mapper",
    title: "Agent Workflow Mapper",
    description:
      "Describe your trigger, list your steps, define your output. The tool renders a diagram showing which steps an AI agent can automate — downloadable as PNG.",
    cta: "Map my workflow →",
    gradient: "linear-gradient(135deg, #0D9488, #0891b2, #2563eb)",
    icon: (
      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
      </svg>
    ),
  },
  {
    number: "03",
    href: "/free-tools/brand-guidelines",
    label: "Brand Kit",
    title: "Brand Guidelines Generator",
    description:
      "Pick your fonts, colors, and tone of voice. Get a beautiful one-page brand guideline — download it as PNG and paste the text straight into your AI agent so it always stays on brand.",
    cta: "Build my brand kit →",
    gradient: "linear-gradient(135deg, #7c3aed, #db2777, #f59e0b)",
    icon: (
      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008z" />
      </svg>
    ),
  },
]

export default function FreeToolsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-32 sm:pt-40 pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">

          {/* Hero */}
          <div className="text-center mb-14">
            <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-semibold rounded-full mb-4">
              Free Tools
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 mb-4">
              Tools to help you work smarter
            </h1>
            <p className="text-lg text-slate-500 max-w-xl mx-auto">
              Free calculators and resources for teams exploring AI automation. No signup required.
            </p>
          </div>

          {/* Tool cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
            {TOOLS.map(tool => (
              <Link
                key={tool.href}
                href={tool.href}
                className="group border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Card header */}
                <div
                  className="px-7 py-6"
                  style={{ background: tool.gradient }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-white/15 flex items-center justify-center shrink-0">
                      {tool.icon}
                    </div>
                    <div>
                      <p className="text-white/70 text-xs font-semibold uppercase tracking-widest">Tool {tool.number}</p>
                      <h2 className="text-lg font-bold text-white leading-snug">{tool.title}</h2>
                    </div>
                  </div>
                </div>

                {/* Card body */}
                <div className="px-7 py-6 bg-white">
                  <p className="text-sm text-slate-500 leading-relaxed mb-5">{tool.description}</p>
                  <span className="inline-flex items-center text-sm font-semibold text-primary group-hover:underline">
                    {tool.cta}
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* Coming soon */}
          <div className="border border-dashed border-slate-200 rounded-2xl p-8 text-center">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">Coming soon</p>
            <p className="text-slate-500 text-sm">
              More free tools — ROI calculator, agent readiness audit, automation playbook generator
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

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
  {
    number: "04",
    href: "/free-tools/ai-learning-game",
    label: "Game",
    title: "AI Learning Game",
    description:
      "Think Pokémon, but every battle teaches you AI. Explore a pixel world and pick up real AI concepts one trivia duel at a time — right in your browser.",
    cta: "Play the game →",
    gradient: "linear-gradient(135deg, #f59e0b, #ea580c, #be123c)",
    icon: (
      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 01-.657.643 48.39 48.39 0 01-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 01-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 00-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 01-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 00.657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 01-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 005.427-.63 48.05 48.05 0 00.582-4.717.532.532 0 00-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.96.401v0a.656.656 0 00.658-.663 48.422 48.422 0 00-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 01-.61-.58v0z" />
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

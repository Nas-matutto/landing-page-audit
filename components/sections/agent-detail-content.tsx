import Link from "next/link"
import { ArrowRight, Check, ChevronDown, Sparkles } from "lucide-react"
import type { Agent, AgentDetail } from "@/lib/agents"

// Server component — no client interactivity. FAQ uses native <details> so the
// page stays fully static and SEO/GEO-friendly.

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

export function AgentDetailContent({ agent }: { agent: Agent & { detail: AgentDetail } }) {
  const { detail } = agent
  const Icon = agent.icon

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative pt-32 pb-16 bg-white overflow-hidden">
        {/* soft gradient glow */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[40rem] h-[40rem] rounded-full blur-3xl opacity-10" style={{ background: agent.gradient }} />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center justify-center gap-2 text-sm text-slate-400">
              <li><Link href="/agents" className="hover:text-primary transition-colors">Agents</Link></li>
              <li aria-hidden className="text-slate-300">/</li>
              <li className="text-slate-600 font-medium">{agent.title}</li>
            </ol>
          </nav>

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

          {/* Stat chips */}
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

      {/* ── Use cases ── */}
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
      <section className="py-20 sm:py-24 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-4">What it saves</p>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 text-balance">
                The impact, in practice
              </h2>
              <p className="mt-4 text-sm text-slate-400">Illustrative outcomes — your results depend on your volume and workflow.</p>
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

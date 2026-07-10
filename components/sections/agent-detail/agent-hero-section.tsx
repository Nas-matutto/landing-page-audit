import Link from "next/link"
import { ArrowRight, Sparkles } from "lucide-react"

type Props = {
  title: string
  gradient: string
  Icon: React.ComponentType<{ className?: string }>
  heroSubhead: string
  impact: { stat: string; label: string }[]
  showBreadcrumb?: boolean
  showHeroStats?: boolean
}

export function AgentHeroSection({
  title,
  gradient,
  Icon,
  heroSubhead,
  impact,
  showBreadcrumb = true,
  showHeroStats = true,
}: Props) {
  return (
    <section className="relative pt-32 pb-16 bg-white overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute -top-24 left-1/2 -translate-x-1/2 w-160 h-160 rounded-full blur-3xl opacity-10"
          style={{ background: gradient }}
        />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
        {showBreadcrumb && (
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center justify-center gap-2 text-sm text-slate-400">
              <li>
                <Link href="/agents" className="hover:text-primary transition-colors">
                  Agents
                </Link>
              </li>
              <li aria-hidden className="text-slate-300">/</li>
              <li className="text-slate-600 font-medium">{title}</li>
            </ol>
          </nav>
        )}

        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 ring-1 ring-white/20 shadow-lg"
          style={{ background: gradient }}
        >
          <Icon className="w-8 h-8 text-white" />
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-slate-900 leading-tight mb-5 text-balance">
          {title}{" "}
          <span className="bg-clip-text text-transparent bg-linear-to-r from-primary to-violet-500">
            AI Agent
          </span>
        </h1>

        <p className="text-lg text-slate-500 leading-relaxed max-w-2xl mx-auto mb-9">
          {heroSubhead}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Link
            href="/book-demo"
            className="relative overflow-hidden group inline-flex items-center gap-2 bg-linear-to-r from-primary to-violet-500 text-white font-semibold text-sm px-7 py-3.5 rounded-xl shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all"
          >
            <span className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
            <span className="relative flex items-center gap-2">
              Book a free call <ArrowRight className="w-4 h-4" />
            </span>
          </Link>
          <p className="text-sm text-slate-400">20-minute call · Live in days</p>
        </div>

        {showHeroStats && (
          <div className="flex flex-wrap items-center justify-center gap-3">
            {impact.map((m, i) => (
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
  )
}

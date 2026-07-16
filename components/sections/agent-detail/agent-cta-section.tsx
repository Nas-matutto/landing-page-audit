import Link from "next/link"
import { ArrowRight } from "lucide-react"

type Props = {
  agentTitle: string
  heading?: string
  subheading?: string
  ctaLabel?: string
  ctaHref?: string
  note?: string
}

export function AgentCtaSection({
  agentTitle,
  heading,
  subheading = "Book a free 20-minute call. We'll tell you exactly what your agent can do and build it for you — API costs, integrations, and hosting included.",
  ctaLabel = "Book a free call",
  ctaHref = "/book-demo",
  note = "Free call · No commitment · Built for you",
}: Props) {
  return (
    <section className="py-24 bg-linear-to-br from-primary via-blue-600 to-violet-600 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-violet-400/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-blue-300/15 rounded-full blur-3xl" />
      </div>
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-white text-balance mb-4">
          {heading ?? `Ready for your own ${agentTitle.toLowerCase()} agent?`}
        </h2>
        <p className="text-white/70 text-lg mb-8 max-w-xl mx-auto">
          {subheading}
        </p>
        <Link
          href={ctaHref}
          className="relative overflow-hidden group inline-flex items-center gap-2 bg-white text-primary font-bold px-8 py-4 rounded-xl text-base shadow-2xl shadow-black/20 hover:shadow-black/30 transition-all"
        >
          <span className="absolute inset-0 bg-linear-to-r from-transparent via-primary/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
          <span className="relative flex items-center gap-2">
            {ctaLabel} <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </span>
        </Link>
        <p className="text-white/40 text-sm mt-5">{note}</p>
      </div>
    </section>
  )
}

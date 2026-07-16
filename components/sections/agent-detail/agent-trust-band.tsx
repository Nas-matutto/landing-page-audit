import { Star } from "lucide-react"

export type TrustStat = { value: string; label: string }

type Props = {
  stats: TrustStat[]
  /** Optional — only pass a REAL rating. Omitted renders no rating (honest by default). */
  rating?: { score: string; source: string }
}

export function AgentTrustBand({ stats, rating }: Props) {
  return (
    <section className="bg-white py-8 sm:py-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-slate-100 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            {stats.map((s) => (
              <div key={s.label} className="px-4 py-5 text-center">
                <p className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">{s.value}</p>
                <p className="mt-1 text-xs text-slate-500 leading-snug">{s.label}</p>
              </div>
            ))}
          </div>

          {rating && (
            <div className="mt-5 flex items-center justify-center gap-2 text-sm text-slate-500">
              <span className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </span>
              <span className="font-semibold text-slate-700">{rating.score}</span>
              <span className="text-slate-400">on {rating.source}</span>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

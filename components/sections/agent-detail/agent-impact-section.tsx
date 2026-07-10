type Props = {
  stats: { stat: string; label: string }[]
  sectionLabel?: string
  heading?: string
  disclaimer?: boolean
}

export function AgentImpactSection({
  stats,
  sectionLabel = "What it saves",
  heading = "The impact, in practice",
  disclaimer = true,
}: Props) {
  return (
    <section className="py-20 sm:py-24 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-4">{sectionLabel}</p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 text-balance">
              {heading}
            </h2>
            {disclaimer && (
              <p className="mt-4 text-sm text-slate-400">
                Illustrative outcomes — your results depend on your volume and workflow.
              </p>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {stats.map((m, i) => (
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
  )
}

export type IntegrationLogo = {
  Icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>
  color: string
  label: string
}

type Props = {
  logos: IntegrationLogo[]
  heading?: string
  subhead?: string
  /** e.g. "+ any CRM or outbound tool" */
  suffix?: string
}

export function AgentIntegrationsSection({
  logos,
  heading = "Works with your stack",
  subhead = "Your agent plugs into the tools you already use — we wire up every connection for you.",
  suffix,
}: Props) {
  return (
    <section className="py-20 sm:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-4">Integrations</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 text-balance mb-4">
            {heading}
          </h2>
          <p className="text-lg text-slate-500 max-w-xl mx-auto mb-10">{subhead}</p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            {logos.map(({ Icon, color, label }) => (
              <div
                key={label}
                className="inline-flex items-center gap-2.5 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm transition-shadow hover:shadow-md"
              >
                <Icon className="h-5 w-5 shrink-0" style={{ color }} />
                <span className="text-sm font-semibold text-slate-700">{label}</span>
              </div>
            ))}
            {suffix && (
              <span className="inline-flex items-center rounded-xl border border-dashed border-slate-200 px-4 py-3 text-sm text-slate-400">
                {suffix}
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

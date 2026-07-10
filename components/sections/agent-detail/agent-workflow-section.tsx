import { ArrowRight } from "lucide-react"

export type WorkflowStep = {
  Icon: React.ComponentType<{ className?: string }>
  step: string
  title: string
  description: string
}

export type WorkflowLogo = {
  Icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>
  color: string
  label: string
}

type Props = {
  heading: string
  steps: WorkflowStep[]
  logos: WorkflowLogo[]
  logoSuffix?: string
}

export function AgentWorkflowSection({ heading, steps, logos, logoSuffix = "+ any other tool" }: Props) {
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

import { Check } from "lucide-react"

type UseCase = {
  title: string
  description: string
  Icon?: React.ComponentType<{ className?: string }>
}

type Props = {
  agentTitle: string
  useCases: UseCase[]
}

export function AgentUseCasesSection({ agentTitle, useCases }: Props) {
  return (
    <section className="py-20 sm:py-24 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-4">Use cases</p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 text-balance">
              What your {agentTitle.toLowerCase()} agent handles
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {useCases.map((uc, i) => {
              const Icon = uc.Icon ?? Check
              return (
                <div
                  key={i}
                  className="rounded-2xl border border-slate-200 bg-white p-6 hover:shadow-md hover:border-primary/20 transition-all"
                >
                  <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="w-4 h-4 text-primary" />
                  </div>
                  <h3 className="text-base font-bold text-slate-800 mb-1.5">{uc.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{uc.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

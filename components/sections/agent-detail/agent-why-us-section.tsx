import { Check } from "lucide-react"

type Props = {
  items: { title: string; description: string }[]
}

export function AgentWhyUsSection({ items }: Props) {
  return (
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
            {items.map((w, i) => (
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
  )
}

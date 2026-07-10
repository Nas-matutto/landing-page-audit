import { ChevronDown } from "lucide-react"

type Props = {
  faqs: { q: string; a: string }[]
}

export function AgentFaqSection({ faqs }: Props) {
  return (
    <section className="py-20 sm:py-24 bg-slate-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-4">FAQ</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 text-balance">
            Common questions
          </h2>
        </div>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <details
              key={i}
              className="group rounded-2xl border border-slate-200 bg-white px-6 py-1 [&_svg]:open:rotate-180"
            >
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
  )
}

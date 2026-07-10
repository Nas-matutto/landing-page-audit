type Props = {
  steps: { title: string; description: string }[]
}

export function AgentHowWeBuildSection({ steps }: Props) {
  return (
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
            {steps.map((step, i) => (
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
  )
}

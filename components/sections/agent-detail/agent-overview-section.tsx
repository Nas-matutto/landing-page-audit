type Props = {
  paragraphs: string[]
}

export function AgentOverviewSection({ paragraphs }: Props) {
  return (
    <section className="py-20 sm:py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-4">What it does</p>
        <div className="space-y-5">
          {paragraphs.map((para, i) => (
            <p key={i} className="text-lg text-slate-600 leading-relaxed">
              {para}
            </p>
          ))}
        </div>
      </div>
    </section>
  )
}

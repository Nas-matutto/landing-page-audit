type Props = {
  youtubeEmbedUrl: string
  title: string
  heading?: string
}

export function AgentDemoVideoSection({
  youtubeEmbedUrl,
  title,
  heading = "Watch 45 seconds Demo",
}: Props) {
  return (
    <section className="py-20 sm:py-24 bg-white border-t border-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-4">Demo</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 text-balance">
            {heading}
          </h2>
        </div>
        <div className="w-full aspect-video rounded-2xl overflow-hidden shadow-2xl shadow-slate-200 border border-slate-200">
          <iframe
            src={youtubeEmbedUrl}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        </div>
      </div>
    </section>
  )
}

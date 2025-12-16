import { Play } from "lucide-react"

export function DemoSection() {
  return (
    <section id="demo-section" className="py-16 sm:py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 text-balance">
              See{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Talk to me Data
              </span>{" "}
              in Action
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Watch how our AI-powered analysis identifies conversion bottlenecks and provides actionable
              recommendations in seconds.
            </p>
          </div>

          {/* Demo video placeholder */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-video bg-secondary/50 group cursor-pointer">
            {/* Video thumbnail */}
            <img src="/website-analytics-dashboard.png" alt="Demo video" className="w-full h-full object-cover" />

            {/* Play button overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
              <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                <Play className="w-8 h-8 text-primary-foreground ml-1" fill="currentColor" />
              </div>
            </div>

            {/* Duration badge */}
            <div className="absolute bottom-4 right-4 px-3 py-1 rounded-lg bg-black/70 text-white text-sm font-medium backdrop-blur-sm">
              2:34
            </div>
          </div>

          {/* Key highlights */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { number: "< 60s", label: "Analysis Time" },
              { number: "150+", label: "Data Points" },
              { number: "98%", label: "Accuracy Rate" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl sm:text-4xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

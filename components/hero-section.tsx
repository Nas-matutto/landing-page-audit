"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Zap } from "lucide-react"

export function HeroSection() {
  const handleGetFreeAnalysis = () => {
    window.open('https://app.talktomedata.com/signup', '_blank')
  }

  const handleWatchDemo = () => {
    const demoSection = document.getElementById('demo-section')
    if (demoSection) {
      demoSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <section className="relative pt-32 sm:pt-40 pb-16 sm:pb-24 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-[11px] sm:text-sm font-medium mb-6">
            <Zap className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="whitespace-nowrap">Transform Your Website Performance</span>
          </div>

          {/* Main headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-balance mb-6">
            Optimize Your Website for{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary to-accent">
              Maximum Conversions
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed text-pretty">
            Get instant, actionable insights on SEO, UX, messaging, speed, mobile performance, and structure. Make
            data-driven decisions that actually move the needle.
          </p>

          {/* CTA Button */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-6 text-lg shadow-xl group cursor-pointer"
              onClick={handleGetFreeAnalysis}
            >
              Get Free Analysis
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold px-8 py-6 text-lg bg-transparent cursor-pointer"
              onClick={handleWatchDemo}
            >
              Watch Demo
            </Button>
          </div>

          {/* Social proof */}
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-3 text-sm text-muted-foreground">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full bg-secondary border-2 border-background flex items-center justify-center text-xs font-semibold"
                >
                  {String.fromCharCode(64 + i)}
                </div>
              ))}
            </div>
            <span className="font-medium text-center sm:text-left">
              Join <span className="text-foreground font-semibold">2,000+</span> founders optimizing their websites
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

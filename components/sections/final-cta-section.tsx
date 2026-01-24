"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle2 } from "lucide-react"

export function FinalCTASection() {
  const handleGetAnalysis = () => {
    window.open('https://app.talktomedata.com/signup', '_blank')
  }

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Main content */}
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-6 text-balance">
              Stop Losing Sales to{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                Hidden Conversion Issues
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
              Every day without optimization costs you revenue. Get instant insights into what's blocking conversions on your Shopify store.
            </p>
          </div>

          {/* Benefits grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10 max-w-2xl mx-auto">
            {[
              "Analyze your store",
              "Get Shopify-specific recommendations",
              "Prioritized by revenue impact",
              "No credit card required"
            ].map((benefit, index) => (
              <div key={index} className="flex items-center gap-3 text-left">
                <div className="flex-shrink-0">
                  <CheckCircle2 className="w-5 h-5 text-accent" />
                </div>
                <span className="text-foreground font-medium">{benefit}</span>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="flex flex-col items-center gap-4">
            <Button
              size="lg"
              className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-semibold px-10 py-7 text-lg shadow-2xl group cursor-pointer"
              onClick={handleGetAnalysis}
            >
              Analyze My Shopify Store Free
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <p className="text-sm text-muted-foreground">
              Join 2,000+ Shopify stores already optimizing their conversions
            </p>
          </div>

          {/* Social proof stats */}
          <div className="mt-12 pt-12 border-t border-border">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
              {[
                { number: "2,000+", label: "Stores Analyzed" },
                { number: "37%", label: "Avg Conversion Increase" },
                { number: "60s", label: "Analysis Time" },
                { number: "$0", label: "To Get Started" }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-foreground mb-1">
                    {stat.number}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
"use client"

import { Card, CardContent } from "@/components/ui/card"
import { ShoppingCart, TrendingDown, Smartphone, Zap } from "lucide-react"

export function PainPointsSection() {
  const painPoints = [
    {
      icon: ShoppingCart,
      title: "80% Cart Abandonment?",
      description: "High abandonment rates are costing you thousands in lost revenue. We identify exactly what's driving customers away before checkout.",
      stat: "Average cart abandonment: 69.9%",
      statColor: "text-green-600"
    },
    {
      icon: TrendingDown,
      title: "Product Pages Not Converting?",
      description: "Your products get views but not sales. We analyze images, descriptions, trust signals, and CTAs to fix what's blocking purchases.",
      stat: "Average product page CVR: 1-2%",
      statColor: "text-green-600"
    },
    {
      icon: Zap,
      title: "Slow Site Killing Sales?",
      description: "Every second of load time costs 7% in conversions. We pinpoint theme bloat, unoptimized images, and app conflicts slowing you down.",
      stat: "3+ second load = 40% bounce rate",
      statColor: "text-green-600"
    },
    {
      icon: Smartphone,
      title: "Mobile Checkout Frustrating Customers?",
      description: "70% of traffic is mobile, but your checkout isn't optimized. We identify touch target issues, form friction, and mobile UX problems.",
      stat: "Mobile conversion 50% lower than desktop",
      statColor: "text-green-600"
    }
  ]

  return (
    <section className="py-16 sm:py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 text-balance">
              Is Your Shopify Store <span className="text-primary">Losing Sales</span> Every Day?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Most Shopify stores have critical conversion issues they don't even know about. We find them in 60 seconds.
            </p>
          </div>

          {/* Pain point cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {painPoints.map((point, index) => (
              <Card 
                key={index} 
                className="glass-card border-2 border-border hover:border-primary/50 transition-all duration-300 hover:shadow-xl group"
              >
                <CardContent className="p-6 sm:p-8">
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <point.icon className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-3">
                        {point.title}
                      </h3>
                      <p className="text-muted-foreground mb-4 leading-relaxed">
                        {point.description}
                      </p>
                      <div className={`text-sm font-semibold ${point.statColor} flex items-center gap-2`}>
                        <div className="w-1.5 h-1.5 rounded-full bg-current" />
                        {point.stat}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
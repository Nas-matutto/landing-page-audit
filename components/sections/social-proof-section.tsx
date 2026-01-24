"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Star, TrendingUp } from "lucide-react"

export function SocialProofSection() {
  const testimonials = [
    {
      storeName: "Urban Threads Co.",
      category: "Fashion & Apparel",
      result: "Product page conversion from 1.2% to 3.8%",
      timeframe: "30 days",
      quote: "The AI identified that our product images were too small and our Add to Cart button was buried below the fold on mobile. Two simple fixes increased our revenue by $18K in the first month.",
      author: "Sarah Chen",
      role: "Founder",
      improvement: "+217%",
      metric: "Conversion Rate"
    },
    {
      storeName: "Peak Performance Supplements",
      category: "Health & Wellness",
      result: "Cart abandonment reduced from 82% to 64%",
      timeframe: "45 days",
      quote: "I had no idea my checkout was so broken on mobile. The analysis showed me exactly where customers were dropping off. After fixing the mobile form fields and adding trust badges, we recovered thousands in lost sales.",
      author: "Michael Rodriguez",
      role: "Owner",
      improvement: "-22%",
      metric: "Cart Abandonment"
    },
    {
      storeName: "Cozy Home Essentials",
      category: "Home & Living",
      result: "Site speed improved from 5.2s to 1.8s",
      timeframe: "1 week",
      quote: "Our homepage was loading hero images that were 4MB each. The report gave us a prioritized list of exactly which images to compress and which apps to remove. Bounce rate dropped 35% immediately.",
      author: "Emily Parker",
      role: "E-commerce Manager",
      improvement: "+45%",
      metric: "Page Speed"
    }
  ]

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 text-balance">
              Real Results from <span className="text-primary">Real Shopify Stores</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              See how store owners like you increased conversions by identifying and fixing critical issues.
            </p>
          </div>

          {/* Testimonials grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {testimonials.map((testimonial, index) => (
              <Card 
                key={index} 
                className="glass-card border-2 border-border hover:border-primary/50 transition-all duration-300 hover:shadow-xl group"
              >
                <CardContent className="p-6 sm:p-8 flex flex-col h-full">
                  {/* Store info */}
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-foreground mb-1">
                      {testimonial.storeName}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.category}
                    </p>
                  </div>

                  {/* Metric improvement */}
                  <div className="mb-6 p-4 rounded-lg bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary/20">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-muted-foreground">
                        {testimonial.metric}
                      </span>
                      <span className="text-sm font-semibold text-primary">
                        {testimonial.timeframe}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-accent" />
                      <span className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                        {testimonial.improvement}
                      </span>
                    </div>
                    <p className="text-sm text-foreground mt-2 font-medium">
                      {testimonial.result}
                    </p>
                  </div>

                  {/* Quote */}
                  <div className="flex-1">
                    {/* Star rating */}
                    <div className="flex gap-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                      ))}
                    </div>
                    
                    <blockquote className="text-muted-foreground leading-relaxed mb-4 italic">
                      "{testimonial.quote}"
                    </blockquote>
                  </div>

                  {/* Author */}
                  <div className="pt-4 border-t border-border">
                    <p className="font-semibold text-foreground">
                      {testimonial.author}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-12 text-center">
            <p className="text-lg text-muted-foreground mb-2">
              Join these successful Shopify merchants
            </p>
            <p className="text-foreground font-semibold text-xl">
              Get your free store analysis and start increasing conversions today
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
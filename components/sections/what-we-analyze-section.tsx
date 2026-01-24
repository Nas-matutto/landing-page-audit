"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Package, ShoppingCart, CreditCard, Zap, Smartphone, Shield, Search, BarChart3 } from "lucide-react"

export function WhatWeAnalyzeSection() {
  const analysisCategories = [
    {
      icon: Package,
      title: "Product Pages",
      checks: [
        "Image quality and optimization",
        "Product description effectiveness",
        "Reviews and social proof placement",
        "Add to Cart button prominence",
        "Product variant presentation",
        "Cross-sell recommendations"
      ]
    },
    {
      icon: ShoppingCart,
      title: "Cart Experience",
      checks: [
        "Cart abandonment triggers",
        "Upsell and cross-sell opportunities",
        "Shipping cost transparency",
        "Cart page load speed",
        "Progress indicators",
        "Guest checkout availability"
      ]
    },
    {
      icon: CreditCard,
      title: "Checkout Flow",
      checks: [
        "Number of checkout steps",
        "Form field optimization",
        "Payment options visibility",
        "Trust signals and security badges",
        "Mobile checkout UX",
        "Error message clarity"
      ]
    },
    {
      icon: Zap,
      title: "Site Speed",
      checks: [
        "Page load time analysis",
        "Theme bloat detection",
        "App conflict identification",
        "Image compression opportunities",
        "Core Web Vitals scores",
        "Mobile vs desktop performance"
      ]
    },
    {
      icon: Smartphone,
      title: "Mobile Experience",
      checks: [
        "Touch target sizes (44px minimum)",
        "Mobile navigation usability",
        "Responsive image loading",
        "Mobile checkout friction",
        "Thumb-friendly button placement",
        "Horizontal scrolling issues"
      ]
    },
    {
      icon: Shield,
      title: "Trust & Social Proof",
      checks: [
        "Customer reviews implementation",
        "Testimonial placement",
        "Security badge visibility",
        "Return policy accessibility",
        "About page completeness",
        "Contact information clarity"
      ]
    },
    {
      icon: Search,
      title: "SEO & Discoverability",
      checks: [
        "Product meta descriptions",
        "Image alt tags",
        "URL structure optimization",
        "Collection page SEO",
        "Site search functionality",
        "Schema markup implementation"
      ]
    },
    {
      icon: BarChart3,
      title: "Analytics Setup",
      checks: [
        "Conversion tracking accuracy",
        "Funnel analysis setup",
        "Event tracking implementation",
        "Cart abandonment tracking",
        "Revenue attribution",
        "Customer journey mapping"
      ]
    }
  ]

  return (
    <section className="py-16 sm:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 text-balance">
              What We <span className="text-primary">Analyze</span> in Your Store
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              We scan 150+ conversion factors across 8 critical categories to identify what's blocking your sales.
            </p>
          </div>

          {/* Analysis categories grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {analysisCategories.map((category, index) => (
              <Card 
                key={index} 
                className="glass-card border-0 hover:shadow-xl transition-all duration-300 group"
              >
                <CardContent className="p-6">
                  {/* Icon */}
                  <div className="mb-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <category.icon className="w-6 h-6 text-primary" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-foreground mb-3">
                    {category.title}
                  </h3>

                  {/* Checks list */}
                  <ul className="space-y-2">
                    {category.checks.map((check, checkIndex) => (
                      <li 
                        key={checkIndex} 
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <div className="w-1 h-1 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <span className="leading-relaxed">{check}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Bottom stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {[
              { number: "150+", label: "Data Points Analyzed" },
              { number: "8", label: "Critical Categories" },
              { number: "60s", label: "Analysis Time" },
              { number: "100%", label: "Shopify Focused" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
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
    </section>
  )
}
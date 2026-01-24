"use client"

import { Card, CardContent } from "@/components/ui/card"
import { 
  Zap, 
  Eye, 
  Package, 
  Image as ImageIcon, 
  Star, 
  CreditCard, 
  Truck, 
  DollarSign, 
  Smartphone, 
  Shield, 
  ShoppingCart, 
  Mail, 
  Sparkles, 
  MessageCircle, 
  Clock 
} from "lucide-react"

export function WhatWeAnalyzeSection() {
  const analysisCategories = [
    {
      icon: Zap,
      title: "Page Speed (Mobile First)",
      description: "Fast loading, compressed images, lightweight theme"
    },
    {
      icon: Eye,
      title: "Clear Above-the-Fold Value Proposition",
      description: "Explain product, audience, benefits, and proof in 3 seconds"
    },
    {
      icon: Package,
      title: "Strong Product Page Structure",
      description: "Sticky Add to Cart, price near CTA, key benefits above fold, clear shipping & returns"
    },
    {
      icon: ImageIcon,
      title: "High-Quality Product Media",
      description: "Multiple images, lifestyle shots, close-ups, and video"
    },
    {
      icon: Star,
      title: "Social Proof",
      description: "Reviews near CTA, UGC photos, 'X people bought this today,' trust badges"
    },
    {
      icon: CreditCard,
      title: "Simple Checkout (Friction Removal)",
      description: "Guest checkout, Shop Pay/Apple Pay/Google Pay, minimal form fields"
    },
    {
      icon: Truck,
      title: "Clear Shipping & Returns Policy",
      description: "Delivery times visible, free/flat-rate shipping, simple returns copy"
    },
    {
      icon: DollarSign,
      title: "Pricing Psychology",
      description: "Anchoring, bundles, quantity discounts, free shipping thresholds"
    },
    {
      icon: Smartphone,
      title: "Mobile UX Optimization",
      description: "Large tap targets, thumb-friendly CTAs, no intrusive popups"
    },
    {
      icon: Shield,
      title: "On-Site Trust Signals",
      description: "Secure checkout messaging, real contact info, About page credibility, payment logos"
    },
    {
      icon: ShoppingCart,
      title: "Smart Upsells & Cross-Sells",
      description: "Cart drawer offers, post-purchase upsells, 'frequently bought together'"
    },
    {
      icon: Mail,
      title: "Exit Intent & Abandonment Capture",
      description: "Email/SMS popups, cart recovery flows, Klaviyo integration"
    },
    {
      icon: Sparkles,
      title: "Personalization",
      description: "Geo-based messages, returning visitor offers, dynamic product recommendations"
    },
    {
      icon: MessageCircle,
      title: "Live Chat / Fast Support",
      description: "AI chat or WhatsApp integration for quick customer questions"
    },
    {
      icon: Clock,
      title: "Scarcity & Urgency",
      description: "Low stock indicators, shipping cutoff timers, limited-time offers"
    }
  ]

  return (
    <section className="py-16 sm:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 text-balance">
              What We <span className="text-primary">Analyze</span> in Your Store
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              We scan 150+ conversion factors across 15 critical categories to identify what's blocking your sales.
            </p>
          </div>

          {/* Analysis categories - Horizontal scroll on mobile, grid on desktop */}
          <div className="relative">
            {/* Mobile: Horizontal scroll */}
            <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide md:hidden">
              {analysisCategories.map((category, index) => (
                <Card 
                  key={index} 
                  className="glass-card border-0 hover:shadow-xl transition-all duration-300 group flex-shrink-0 w-[280px] snap-start"
                >
                  <CardContent className="p-6 h-full flex flex-col">
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

                    {/* Description */}
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {category.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Desktop: Grid layout */}
            <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-5 gap-6">
              {analysisCategories.map((category, index) => (
                <Card 
                  key={index} 
                  className="glass-card border-0 hover:shadow-xl transition-all duration-300 group"
                >
                  <CardContent className="p-6 h-full flex flex-col">
                    {/* Icon */}
                    <div className="mb-4">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <category.icon className="w-6 h-6 text-primary" />
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-base font-bold text-foreground mb-3 leading-tight">
                      {category.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                      {category.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Scroll indicator for mobile */}
            <div className="md:hidden flex justify-center gap-2 mt-4">
              <div className="text-xs text-muted-foreground flex items-center gap-2">
                <span>Swipe to see more</span>
                <span className="text-primary">→</span>
              </div>
            </div>
          </div>

          {/* Bottom stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {[
              { number: "150+", label: "Data Points Analyzed" },
              { number: "15", label: "Critical Categories" },
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

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  )
}
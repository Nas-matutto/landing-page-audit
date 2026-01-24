"use client"

import { useState, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight } from "lucide-react"
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
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(true)

  const analysisCategories = [
    {
      icon: Zap,
      title: "Page Speed",
      checks: [
        "Mobile load time under 3s",
        "Image compression & format",
        "Theme bloat detection",
        "App conflict analysis"
      ]
    },
    {
      icon: Eye,
      title: "Above-the-Fold Value Proposition",
      checks: [
        "Clear product benefit",
        "Target audience clarity",
        "Social proof visibility",
        "CTA prominence"
      ]
    },
    {
      icon: Package,
      title: "Product Page Structure",
      checks: [
        "Sticky Add to Cart button",
        "Price near primary CTA",
        "Benefits above the fold",
        "Shipping & returns clarity"
      ]
    },
    {
      icon: ImageIcon,
      title: "Product Media Quality",
      checks: [
        "Multiple product angles",
        "Lifestyle photography",
        "Zoom functionality",
        "Video demonstrations"
      ]
    },
    {
      icon: Star,
      title: "Social Proof",
      checks: [
        "Reviews near Add to Cart",
        "UGC photos & videos",
        "Recent purchase notifications",
        "Trust badge placement"
      ]
    },
    {
      icon: CreditCard,
      title: "Checkout Optimization",
      checks: [
        "Guest checkout option",
        "Express payment buttons",
        "Minimal form fields",
        "Progress indicators"
      ]
    },
    {
      icon: Truck,
      title: "Shipping & Returns Policy",
      checks: [
        "Delivery timeframes visible",
        "Free shipping threshold",
        "Returns process clarity",
        "Shipping calculator access"
      ]
    },
    {
      icon: DollarSign,
      title: "Pricing Psychology",
      checks: [
        "Price anchoring tactics",
        "Bundle offers",
        "Quantity discounts",
        "Free shipping incentives"
      ]
    },
    {
      icon: Smartphone,
      title: "Mobile UX",
      checks: [
        "Touch target sizing (44px+)",
        "Thumb-zone CTA placement",
        "No intrusive popups",
        "Simplified navigation"
      ]
    },
    {
      icon: Shield,
      title: "Trust Signals",
      checks: [
        "Secure checkout badges",
        "Real contact information",
        "About page credibility",
        "Payment method logos"
      ]
    },
    {
      icon: ShoppingCart,
      title: "Upsells & Cross-Sells",
      checks: [
        "Cart drawer recommendations",
        "Post-purchase offers",
        "Frequently bought together",
        "Related product placement"
      ]
    },
    {
      icon: Mail,
      title: "Abandonment Recovery",
      checks: [
        "Exit intent popups",
        "Cart recovery emails",
        "SMS cart reminders",
        "Klaviyo integration"
      ]
    },
    {
      icon: Sparkles,
      title: "Personalization",
      checks: [
        "Geo-based messaging",
        "Returning visitor offers",
        "Dynamic recommendations",
        "Browsing history widgets"
      ]
    },
    {
      icon: MessageCircle,
      title: "Live Support",
      checks: [
        "Chat widget placement",
        "AI chatbot quality",
        "WhatsApp integration",
        "Response time indicators"
      ]
    },
    {
      icon: Clock,
      title: "Scarcity & Urgency",
      checks: [
        "Low stock indicators",
        "Shipping cutoff timers",
        "Limited-time offers",
        "Countdown timers"
      ]
    }
  ]

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300
      const newScrollLeft = direction === 'left' 
        ? scrollContainerRef.current.scrollLeft - scrollAmount
        : scrollContainerRef.current.scrollLeft + scrollAmount
      
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      })
    }
  }

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
      setShowLeftArrow(scrollLeft > 0)
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

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
              We examine 15 critical conversion categories to identify what's blocking your sales.
            </p>
          </div>

          {/* Analysis categories - Horizontal scroll on all devices with navigation arrows */}
          <div className="relative">
            {/* Left Arrow */}
            {showLeftArrow && (
              <button
                onClick={() => scroll('left')}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-background border-2 border-border shadow-lg flex items-center justify-center hover:bg-muted transition-colors cursor-pointer"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-5 h-5 text-foreground" />
              </button>
            )}

            {/* Right Arrow */}
            {showRightArrow && (
              <button
                onClick={() => scroll('right')}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-background border-2 border-border shadow-lg flex items-center justify-center hover:bg-muted transition-colors cursor-pointer"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-5 h-5 text-foreground" />
              </button>
            )}

            {/* Scrollable container */}
            <div 
              ref={scrollContainerRef}
              onScroll={handleScroll}
              className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide px-12"
            >
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
                    <h3 className="text-lg font-bold text-foreground mb-4">
                      {category.title}
                    </h3>

                    {/* Checks list */}
                    <ul className="space-y-2.5 flex-1">
                      {category.checks.map((check, checkIndex) => (
                        <li 
                          key={checkIndex} 
                          className="flex items-start gap-2 text-sm text-muted-foreground"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                          <span className="leading-relaxed">{check}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Scroll indicator */}
            <div className="flex justify-center gap-2 mt-4">
              <div className="text-xs text-muted-foreground flex items-center gap-2">
                <span>Scroll to see all categories</span>
                <span className="text-primary">→</span>
              </div>
            </div>
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
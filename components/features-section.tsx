"use client"

import {
  Search,
  Eye,
  MessageSquare,
  Zap,
  Smartphone,
  Layout,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { Card } from "@/components/ui/card"
import { useRef } from "react"

const features = [
  {
    icon: Search,
    title: "SEO Analysis",
    description:
      "Deep dive into your search rankings, meta tags, keywords, and technical SEO to maximize organic visibility.",
    benefits: ["Keyword optimization", "Meta tag analysis", "Schema markup review", "Technical SEO audit"],
  },
  {
    icon: Eye,
    title: "UX Optimization",
    description:
      "Identify friction points, improve user flows, and enhance the overall experience to keep visitors engaged.",
    benefits: ["User flow analysis", "Heat map insights", "Navigation optimization", "Accessibility checks"],
  },
  {
    icon: MessageSquare,
    title: "Messaging Review",
    description: "Ensure your value proposition is clear, compelling, and resonates with your target audience.",
    benefits: ["Copy effectiveness", "CTA optimization", "Value prop clarity", "Brand consistency"],
  },
  {
    icon: Zap,
    title: "Speed Performance",
    description:
      "Measure and optimize loading times, Core Web Vitals, and performance metrics that impact conversions.",
    benefits: ["Load time analysis", "Core Web Vitals", "Asset optimization", "Caching strategies"],
  },
  {
    icon: Smartphone,
    title: "Mobile Excellence",
    description: "Ensure flawless mobile experience with responsive design checks and mobile-specific optimizations.",
    benefits: ["Responsive design", "Touch targets", "Mobile speed", "Cross-device testing"],
  },
  {
    icon: Layout,
    title: "Structure & Layout",
    description: "Analyze information architecture, visual hierarchy, and content structure for maximum impact.",
    benefits: ["Visual hierarchy", "Content structure", "Call-to-action placement", "Information flow"],
  },
  {
    icon: CheckCircle,
    title: "Get A/B Test Recommendations",
    description: "Receive data-driven A/B test suggestions to validate changes and maximize conversion improvements.",
    benefits: [
      "Test hypothesis generation",
      "Priority recommendations",
      "Expected impact estimates",
      "Implementation guides",
    ],
  },
]

export function FeaturesSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" })
    }
  }

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" })
    }
  }

  return (
    <section className="py-16 sm:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 text-balance">
            Everything You Need to <span className="text-primary">Boost Conversions</span>
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            Our comprehensive analysis covers every aspect of your website that impacts conversion rates. Get actionable
            recommendations you can implement today.
          </p>
        </div>

        <div className="relative">
          {/* Left scroll button */}
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-background shadow-lg border-2 border-primary/20 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Right scroll button */}
          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-background shadow-lg border-2 border-primary/20 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Scrollable feature cards */}
          <div
            ref={scrollContainerRef}
            className="flex gap-4 overflow-x-auto scroll-smooth px-2 md:px-12 pb-4 hide-scrollbar snap-x snap-mandatory"
          >
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <Card
                  key={index}
                  className="flex-none w-[240px] sm:w-[280px] p-5 hover:shadow-lg transition-shadow border-2 hover:border-primary/20 snap-center"
                >
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>

                  {/* Description */}
                  <p className="text-muted-foreground mb-4 text-sm leading-relaxed">{feature.description}</p>

                  {/* Benefits list */}
                  <ul className="space-y-2">
                    {feature.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              )
            })}
          </div>
        </div>

        {/* CTA - Restructured CTA with lime highlighted text, button below on desktop, button full-width on mobile */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-col items-center gap-6 p-8 rounded-2xl bg-primary/5 border-2 border-primary/20 max-w-2xl">
            <div className="text-center">
              <h3 className="text-2xl sm:text-3xl font-bold mb-2">Ready to optimize your website?</h3>
              <p className="text-muted-foreground">Get your free analysis in under 60 seconds.</p>
            </div>
            <button className="w-full sm:w-auto px-8 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-lg shadow-lg transition-colors cursor-pointer whitespace-nowrap">
              Start Free Analysis
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

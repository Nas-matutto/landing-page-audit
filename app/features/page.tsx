"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Calculator, CheckSquare, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function FeaturesPage() {
  const features = [
    {
      title: "Conversion Rate Calculator",
      description: "Calculate your website's conversion rate and get personalized insights on how to improve it. Includes industry benchmarks and revenue impact analysis.",
      icon: Calculator,
      href: "/features/conversion-rate-calculator",
      category: "Analytics",
      color: "from-accent to-primary",
      features: [
        "Instant conversion rate calculation",
        "Industry benchmark comparisons",
        "Personalized improvement recommendations",
        "Revenue impact projections",
      ],
    },
     {
      title: "E-commerce Store Analyzer",
      description: "Get instant analysis of your online store with a conversion health score. Discover optimization opportunities across speed, UX, trust signals, and more. Completely free and unlimited.",
      icon: Search,
      href: "/features/store-analyzer",
      category: "Analysis",
      color: "from-accent to-primary",
      features: [
        "Instant conversion health score",
        "Real-time store scanning",
        "50+ factors analyzed automatically",
        "Unlimited free use"
      ],
    },
    {
      title: "Landing Page Checklist",
      description: "Get a customized optimization checklist based on your business type and growth stage. Know exactly what to prioritize for maximum conversion impact.",
      icon: CheckSquare,
      href: "/features/landing-page-checklist",
      category: "Optimization",
      color: "from-accent to-primary",
      features: [
        "Personalized to your business type",
        "Stage-specific recommendations",
        "Priority-based action items",
        "Interactive progress tracking",
      ],
    },
  ]

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-32 sm:pt-40 pb-16 sm:pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            {/* Page Header */}
            <div className="text-center mb-16">
              <div className="inline-block mb-4">
                <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-semibold rounded-full">
                  Free Tools
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6 text-balance">
                Free Conversion Optimization Tools
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Powerful, free tools to help you understand and improve your website's conversion rate. No signup required.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              {features.map((feature, index) => (
                <Card key={index} className="glass-card border-2 border-border hover:border-primary/50 transition-all shadow-lg hover:shadow-xl group">
                  <CardHeader>
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <feature.icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="mb-3">
                      <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
                        {feature.category}
                      </span>
                    </div>
                    <CardTitle className="text-2xl mb-2">{feature.title}</CardTitle>
                    <CardDescription className="text-base leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <ul className="space-y-3">
                      {feature.features.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-center gap-2 text-sm text-foreground">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <Link href={feature.href}>
                      <Button className={`w-full bg-gradient-to-r ${feature.color} hover:opacity-90 text-white font-semibold cursor-pointer group/btn`}>
                        Try This Tool
                        <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* CTA Section */}
            <div className="rounded-2xl overflow-hidden border-2 border-primary bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5 shadow-xl">
              <div className="p-8 md:p-12 text-center">
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Want More Than Just Tools?
                </h2>
                <p className="text-foreground mb-8 max-w-2xl mx-auto leading-relaxed text-lg">
                  Get a complete AI-powered analysis of your website. Discover exactly what's hurting your conversions and receive a prioritized action plan with specific fixes ranked by expected impact.
                </p>
                <Button 
                  className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-semibold py-6 px-8 cursor-pointer shadow-lg hover:shadow-xl transition-all text-lg"
                  onClick={() => window.open('https://app.talktomedata.com/signup', '_blank')}
                >
                  Get Free Website Analysis →
                </Button>
                <p className="text-sm text-muted-foreground mt-4">
                  Comprehensive analysis in 60 seconds • No credit card required
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
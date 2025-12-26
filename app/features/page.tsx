"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Calculator, TrendingUp, Zap } from "lucide-react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function FeaturesPage() {
  const features = [
    {
      title: "Conversion Rate Calculator",
      description: "Calculate your website's conversion rate and get personalized insights on how to improve it",
      icon: Calculator,
      href: "/features/conversion-rate-calculator",
      category: "Analytics",
    },
    // Add more features here as you build them
    // {
    //   title: "Feature Name",
    //   description: "Feature description",
    //   icon: TrendingUp,
    //   href: "/features/feature-slug",
    //   category: "Category",
    // },
  ]

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-32 sm:pt-40 pb-16 sm:pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            {/* Page Header */}
            <div className="text-center mb-16">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
                Free Conversion Tools
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Powerful calculators and tools to help you optimize your website's performance and boost conversions
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <Link key={index} href={feature.href}>
                  <Card className="glass-card border-0 h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                    <CardHeader>
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                        <feature.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div className="mb-2">
                        <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
                          {feature.category}
                        </span>
                      </div>
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                      <CardDescription className="text-base">
                        {feature.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <span className="text-primary font-semibold text-sm hover:underline">
                        Try it now →
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            {/* CTA Section */}
            <div className="mt-16 text-center">
              <Card className="glass-card border-0 bg-gradient-to-r from-primary/5 to-primary/10">
                <CardContent className="pt-8 pb-8">
                  <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                    Want a Full Website Analysis?
                  </h2>
                  <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                    Get detailed insights on UX, SEO, page speed, mobile optimization, and more with our AI-powered website analyzer.
                  </p>
                  <Link 
                    href="/signup"
                    className="inline-block bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-lg font-semibold transition-colors"
                  >
                    Analyze Your Website Free
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
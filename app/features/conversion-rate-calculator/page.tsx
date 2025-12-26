"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ArrowLeft, TrendingUp, AlertCircle } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react"

export default function ConversionRateCalculator() {
  const [visitors, setVisitors] = useState<string>("")
  const [conversions, setConversions] = useState<string>("")
  const [conversionRate, setConversionRate] = useState<number | null>(null)

  const calculateConversionRate = () => {
    const visitorNum = parseFloat(visitors)
    const conversionNum = parseFloat(conversions)

    if (isNaN(visitorNum) || isNaN(conversionNum) || visitorNum <= 0) {
      return
    }

    const rate = (conversionNum / visitorNum) * 100
    setConversionRate(rate)
  }

  const getInsight = (rate: number) => {
    if (rate >= 10) {
      return {
        status: "Excellent",
        color: "text-green-600",
        bgColor: "bg-green-100",
        message: "Your conversion rate is exceptional! You're in the top 10% of websites. Keep optimizing and testing to maintain this performance.",
      }
    } else if (rate >= 5) {
      return {
        status: "Good",
        color: "text-blue-600",
        bgColor: "bg-blue-100",
        message: "Your conversion rate is above average. Focus on A/B testing your CTAs and reducing friction points to push into the excellent range.",
      }
    } else if (rate >= 2) {
      return {
        status: "Average",
        color: "text-yellow-600",
        bgColor: "bg-yellow-100",
        message: "Your conversion rate is in the average range. Consider improving your value proposition, page speed, and trust signals to boost conversions.",
      }
    } else if (rate >= 1) {
      return {
        status: "Below Average",
        color: "text-orange-600",
        bgColor: "bg-orange-100",
        message: "Your conversion rate needs improvement. Focus on clarifying your value proposition, simplifying your conversion path, and optimizing page load speed.",
      }
    } else {
      return {
        status: "Critical",
        color: "text-red-600",
        bgColor: "bg-red-100",
        message: "Your conversion rate is critically low. Consider a complete landing page redesign focusing on clear messaging, strong CTAs, and mobile optimization.",
      }
    }
  }

  const getBenchmark = () => {
    return {
      ecommerce: "2-3%",
      saas: "3-5%",
      leadGen: "5-15%",
    }
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-32 sm:pt-40 pb-16 sm:pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            
            {/* Back button */}
            <Link href="/features" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 group">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>Back to Features</span>
            </Link>

            {/* Page Header */}
            <div className="text-center mb-12">
              <div className="inline-block mb-4">
                <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-semibold rounded-full">
                  Analytics Tool
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
                Conversion Rate Calculator
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Calculate your website's conversion rate and get actionable insights to improve performance
              </p>
            </div>

            {/* Calculator Card */}
            <Card className="glass-card border-0 mb-8">
              <CardHeader>
                <CardTitle className="text-2xl">Calculate Your Conversion Rate</CardTitle>
                <CardDescription className="text-base">
                  Enter your website traffic and conversions to see how you're performing
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="visitors" className="block text-sm font-medium mb-2">
                      Total Visitors
                    </label>
                    <input
                      id="visitors"
                      type="number"
                      value={visitors}
                      onChange={(e) => setVisitors(e.target.value)}
                      placeholder="e.g., 10000"
                      className="w-full rounded-lg border border-input bg-white/60 px-4 py-3 outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label htmlFor="conversions" className="block text-sm font-medium mb-2">
                      Total Conversions
                    </label>
                    <input
                      id="conversions"
                      type="number"
                      value={conversions}
                      onChange={(e) => setConversions(e.target.value)}
                      placeholder="e.g., 250"
                      className="w-full rounded-lg border border-input bg-white/60 px-4 py-3 outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>

                <Button
                  onClick={calculateConversionRate}
                  disabled={!visitors || !conversions}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold cursor-pointer h-12"
                >
                  Calculate Conversion Rate
                </Button>
              </CardContent>
            </Card>

            {/* Results Section */}
            {conversionRate !== null && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {/* Conversion Rate Display */}
                <Card className="glass-card border-0 bg-gradient-to-br from-primary/5 to-primary/10">
                  <CardContent className="pt-8 pb-8">
                    <div className="text-center">
                      <p className="text-muted-foreground mb-2">Your Conversion Rate</p>
                      <div className="flex items-center justify-center gap-2 mb-4">
                        <span className="text-6xl font-bold text-primary">
                          {conversionRate.toFixed(2)}%
                        </span>
                      </div>
                      <div className={`inline-block px-4 py-2 rounded-full ${getInsight(conversionRate).bgColor}`}>
                        <span className={`font-semibold ${getInsight(conversionRate).color}`}>
                          {getInsight(conversionRate).status}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Insight */}
                <Card className="glass-card border-0">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertCircle className="w-5 h-5 text-primary" />
                      What This Means
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {getInsight(conversionRate).message}
                    </p>
                  </CardContent>
                </Card>

                {/* Industry Benchmarks */}
                <Card className="glass-card border-0">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-primary" />
                      Industry Benchmarks
                    </CardTitle>
                    <CardDescription>
                      See how your conversion rate compares to industry averages
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="p-4 bg-muted/30 rounded-lg">
                        <p className="text-sm text-muted-foreground mb-1">E-commerce</p>
                        <p className="text-2xl font-bold">{getBenchmark().ecommerce}</p>
                      </div>
                      <div className="p-4 bg-muted/30 rounded-lg">
                        <p className="text-sm text-muted-foreground mb-1">SaaS</p>
                        <p className="text-2xl font-bold">{getBenchmark().saas}</p>
                      </div>
                      <div className="p-4 bg-muted/30 rounded-lg">
                        <p className="text-sm text-muted-foreground mb-1">Lead Generation</p>
                        <p className="text-2xl font-bold">{getBenchmark().leadGen}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Tips */}
                <Card className="glass-card border-0">
                  <CardHeader>
                    <CardTitle>5 Quick Ways to Improve Your Conversion Rate</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm flex-shrink-0 mt-0.5">
                          1
                        </span>
                        <div>
                          <p className="font-semibold">Clarify Your Value Proposition</p>
                          <p className="text-sm text-muted-foreground">Make it crystal clear what you offer and why visitors should choose you in the first 5 seconds</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm flex-shrink-0 mt-0.5">
                          2
                        </span>
                        <div>
                          <p className="font-semibold">Improve Page Speed</p>
                          <p className="text-sm text-muted-foreground">Every second of load time costs you 7% in conversions. Aim for under 3 seconds</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm flex-shrink-0 mt-0.5">
                          3
                        </span>
                        <div>
                          <p className="font-semibold">Add Trust Signals</p>
                          <p className="text-sm text-muted-foreground">Display customer testimonials, security badges, and client logos to build credibility</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm flex-shrink-0 mt-0.5">
                          4
                        </span>
                        <div>
                          <p className="font-semibold">Simplify Your Forms</p>
                          <p className="text-sm text-muted-foreground">Reduce form fields from 11 to 4 can increase conversions by 120%</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm flex-shrink-0 mt-0.5">
                          5
                        </span>
                        <div>
                          <p className="font-semibold">Optimize for Mobile</p>
                          <p className="text-sm text-muted-foreground">60% of traffic is mobile. Ensure your site works perfectly on all devices</p>
                        </div>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* CTA Section */}
            <div className="mt-12">
              <Card className="glass-card border-0 bg-gradient-to-r from-primary/5 to-primary/10">
                <CardContent className="pt-8 pb-8 text-center">
                  <h2 className="text-2xl font-bold mb-4">
                    Want a Complete Website Analysis?
                  </h2>
                  <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                    Get detailed insights on UX, SEO, page speed, mobile optimization, and conversion optimization with our AI-powered analyzer.
                  </p>
                  <Link href="/signup">
                    <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold cursor-pointer">
                      Analyze Your Website Free →
                    </Button>
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
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
    if (rate >= 7) {
      return {
        status: "Excellent",
        color: "text-green-800",
        bgColor: "bg-green-200",
        message: "Outstanding! Your conversion rate is in the top 5% of all websites. You're converting exceptionally well. Continue A/B testing and optimizing to maintain this elite performance.",
      }
    } else if (rate >= 4) {
      return {
        status: "Good",
        color: "text-green-600",
        bgColor: "bg-green-100",
        message: "Great work! Your conversion rate is above average and performing well. Focus on advanced optimization tactics like personalization and urgency elements to reach excellent status.",
      }
    } else if (rate >= 2) {
      return {
        status: "Average",
        color: "text-yellow-600",
        bgColor: "bg-yellow-100",
        message: "Your conversion rate is in the average range. There's significant room for improvement. Focus on clarifying your value proposition, improving page speed, and adding trust signals.",
      }
    } else if (rate >= 1) {
      return {
        status: "Below Average",
        color: "text-orange-600",
        bgColor: "bg-orange-100",
        message: "Your conversion rate is below industry standards. Immediate action needed. Prioritize simplifying your conversion path, improving mobile experience, and testing different CTAs.",
      }
    } else {
      return {
        status: "Low",
        color: "text-red-600",
        bgColor: "bg-red-100",
        message: "Critical: Your conversion rate is severely underperforming. This indicates fundamental issues with your website's value proposition, user experience, or technical performance. A comprehensive redesign may be necessary.",
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

            {/* CTA Section with Educational Content */}
            <div className="mt-12 space-y-8">
              <Card className="glass-card border-0 bg-gradient-to-r from-primary/5 to-primary/10">
                <CardContent className="pt-8 pb-8 text-center">
                  <h2 className="text-2xl font-bold mb-4">
                    Want a Complete Website Analysis?
                  </h2>
                  <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                    Get detailed insights on UX, SEO, page speed, mobile optimization, and conversion optimization with our AI-powered analyzer.
                  </p>
                  <a 
                    href="https://app.talktomedata.com/signup"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold cursor-pointer">
                      Analyze Your Website Free →
                    </Button>
                  </a>
                </CardContent>
              </Card>

              {/* Educational Content Section */}
              <div className="prose prose-lg max-w-none">
                <Card className="glass-card border-0">
                  <CardHeader>
                    <CardTitle className="text-2xl">Why Your Conversion Rate Matters More Than You Think</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6 text-muted-foreground leading-relaxed">
                    <p>
                      Your conversion rate is one of the most critical metrics for your online business success. It's the percentage of visitors who take a desired action on your website - whether that's making a purchase, signing up for a newsletter, or requesting a demo. Understanding and optimizing this number can be the difference between business growth and stagnation.
                    </p>

                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-3">The Power of Small Improvements</h3>
                      <p>
                        Here's why calculating and tracking your conversion rate is essential: even small improvements compound into massive revenue gains. If you're currently converting at 2% and improve to 3% (just a 1 percentage point increase), you've actually grown your conversions by 50%.
                      </p>
                      <p className="mt-3">
                        Let's put this in concrete terms: If you have 10,000 monthly visitors and increase your conversion rate from 2% to 3%, you go from 200 conversions to 300 conversions per month. At an average order value of $100, that's an additional $10,000 in monthly revenue, or $120,000 annually. All without spending a single dollar more on traffic acquisition.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-3">What's Considered a Good Conversion Rate?</h3>
                      <p>
                        Understanding where your conversion rate stands is crucial for setting realistic optimization goals:
                      </p>
                      <ul className="list-disc pl-6 space-y-2 mt-3">
                        <li><strong className="text-red-600">Under 1%:</strong> This is critically low and indicates serious problems with your website's value proposition, user experience, or technical performance. Immediate action is required.</li>
                        <li><strong className="text-orange-600">1-2%:</strong> Below average. Your site is underperforming compared to industry standards. Focus on fundamental improvements like clarifying your offer and simplifying the conversion path.</li>
                        <li><strong className="text-yellow-600">2-4%:</strong> Average. You're in the middle of the pack. There's significant room for improvement through systematic optimization and testing.</li>
                        <li><strong className="text-green-600">4-7%:</strong> Good. You're performing above average and doing many things right. Continue testing and refining to reach excellent status.</li>
                        <li><strong className="text-green-800">Above 7%:</strong> Excellent. You're in the top tier of websites. Your conversion optimization efforts are paying off significantly. Maintain this through continuous testing and improvement.</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-3">Why Knowing Your Conversion Rate is Critical</h3>
                      <p>
                        Many business owners focus exclusively on driving more traffic to their website. They invest heavily in ads, SEO, and content marketing—all while ignoring a fundamental truth: it's far cheaper and more profitable to convert more of your existing traffic than to acquire new visitors.
                      </p>
                      <p className="mt-3">
                        Calculating your conversion rate gives you a baseline for improvement. Without this number, you're flying blind. You can't improve what you don't measure. Once you know your current conversion rate, you can:
                      </p>
                      <ul className="list-disc pl-6 space-y-2 mt-3">
                        <li>Set realistic, data-driven goals for optimization</li>
                        <li>Calculate the ROI of conversion optimization efforts</li>
                        <li>Identify which pages or traffic sources convert best</li>
                        <li>Make informed decisions about where to invest resources</li>
                        <li>Track the impact of website changes and experiments</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-3">The Compounding Effect of Optimization</h3>
                      <p>
                        The beauty of conversion rate optimization is that improvements compound over time. When you increase your conversion rate by 2%, you're not just getting 2% more revenue - you're getting more data to optimize further, more customer feedback, more testimonials, and more resources to reinvest in growth.
                      </p>
                      <p className="mt-3">
                        Consider this: if you improve your conversion rate by just 0.5% per month through systematic testing and optimization, after 12 months you'll have increased your conversions by over 6%. For a business with $500,000 in annual revenue, that's an additional $30,000+ without increasing your marketing spend.
                      </p>
                    </div>

                    <div className="bg-primary/5 border-l-4 border-primary p-6 rounded-r-lg">
                      <h3 className="text-xl font-bold text-foreground mb-3">Take Action Today</h3>
                      <p>
                        Don't let your conversion rate remain a mystery. Sign up to <strong><a href="https://app.talktomedata.com/signup" target="_blank" rel="noopener noreferrer">Talk to me Data</a></strong> to understand exactly which sections of your website can be optimized for conversion. With the free report, you'll understand where you stand, and can start making incremental improvements. Remember: a website converting at 1% is leaving money on the table. A website converting at 5% or higher is a well-oiled revenue machine.
                      </p>
                      <p className="mt-3">
                        The difference between these two scenarios could be hundreds of thousands of dollars in annual revenue. Start tracking, start testing, and start optimizing today.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
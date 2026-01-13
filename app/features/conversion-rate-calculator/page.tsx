"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ArrowLeft, TrendingUp, AlertCircle, Calculator } from "lucide-react"
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
        message: "Critical: Your conversion rate is severely underperforming. This indicates fundamental issues with your website's value proposition, user experience, or technical performance. A comprehensive analysis is recommended.",
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
            <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 group">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>Back to Home</span>
            </Link>

            {/* Page Header - SEO Optimized */}
            <div className="text-center mb-12">
              <div className="inline-block mb-4">
                <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-semibold rounded-full">
                  Free Calculator Tool
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6 text-balance">
                Free Conversion Rate Calculator: Calculate Your Website's Performance
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Instantly calculate your website conversion rate and discover how to improve it. Get personalized insights and industry benchmarks—completely free.
              </p>
            </div>

            {/* Calculator Card */}
            <Card className="glass-card border-2 border-primary/20 mb-8 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Calculator className="w-6 h-6 text-primary" />
                  Calculate Your Conversion Rate
                </CardTitle>
                <CardDescription className="text-base">
                  Enter your website traffic and conversions to see how you're performing
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="visitors" className="block text-sm font-medium mb-2">
                      Total Visitors (per month)
                    </label>
                    <input
                      id="visitors"
                      type="number"
                      value={visitors}
                      onChange={(e) => setVisitors(e.target.value)}
                      placeholder="e.g., 10000"
                      className="w-full rounded-lg border-2 border-input bg-white/60 px-4 py-3 outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                      aria-label="Enter total number of website visitors"
                    />
                  </div>
                  <div>
                    <label htmlFor="conversions" className="block text-sm font-medium mb-2">
                      Total Conversions (per month)
                    </label>
                    <input
                      id="conversions"
                      type="number"
                      value={conversions}
                      onChange={(e) => setConversions(e.target.value)}
                      placeholder="e.g., 250"
                      className="w-full rounded-lg border-2 border-input bg-white/60 px-4 py-3 outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                      aria-label="Enter total number of conversions"
                    />
                  </div>
                </div>

                <Button
                  onClick={calculateConversionRate}
                  disabled={!visitors || !conversions}
                  className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-semibold cursor-pointer h-12 shadow-lg hover:shadow-xl transition-all"
                >
                  Calculate Conversion Rate →
                </Button>
              </CardContent>
            </Card>

            {/* Results Section */}
            {conversionRate !== null && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {/* Conversion Rate Display */}
                <Card className="glass-card border-0 bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10 shadow-xl">
                  <CardContent className="pt-8 pb-8">
                    <div className="text-center">
                      <p className="text-muted-foreground mb-2 text-lg">Your Conversion Rate</p>
                      <div className="flex items-center justify-center gap-2 mb-4">
                        <span className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
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
                <Card className="glass-card border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertCircle className="w-5 h-5 text-primary" />
                      What This Means for Your Business
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {getInsight(conversionRate).message}
                    </p>
                  </CardContent>
                </Card>

                {/* Early CTA - Gradient Style */}
                <div className="rounded-2xl overflow-hidden border-2 border-primary bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5 shadow-lg">
                  <div className="p-8">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                        <span className="text-2xl">🎯</span>
                      </div>
                      <h3 className="text-2xl font-bold text-foreground">Want to Improve Your Conversion Rate?</h3>
                    </div>
                    <p className="text-foreground mb-6 leading-relaxed">
                      Get a comprehensive AI-powered analysis of your website. Discover exactly what's hurting your conversions and receive a prioritized action plan to boost your results. Our analysis covers UX, SEO, messaging, speed, mobile optimization, and more.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button 
                        className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-semibold py-6 px-8 cursor-pointer shadow-lg hover:shadow-xl transition-all"
                        onClick={() => window.open('https://app.talktomedata.com/signup', '_blank')}
                      >
                        Get Free Website Analysis →
                      </Button>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>✓ Takes 60 seconds</span>
                        <span>•</span>
                        <span>✓ No credit card needed</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Industry Benchmarks */}
                <Card className="glass-card border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-primary" />
                      Industry Conversion Rate Benchmarks
                    </CardTitle>
                    <CardDescription>
                      See how your conversion rate compares to industry averages
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="p-4 bg-gradient-to-br from-muted/50 to-muted/30 rounded-lg border border-border">
                        <p className="text-sm text-muted-foreground mb-1">E-commerce</p>
                        <p className="text-2xl font-bold text-primary">{getBenchmark().ecommerce}</p>
                        <p className="text-xs text-muted-foreground mt-1">Online retail stores</p>
                      </div>
                      <div className="p-4 bg-gradient-to-br from-muted/50 to-muted/30 rounded-lg border border-border">
                        <p className="text-sm text-muted-foreground mb-1">SaaS</p>
                        <p className="text-2xl font-bold text-primary">{getBenchmark().saas}</p>
                        <p className="text-xs text-muted-foreground mt-1">Software as a service</p>
                      </div>
                      <div className="p-4 bg-gradient-to-br from-muted/50 to-muted/30 rounded-lg border border-border">
                        <p className="text-sm text-muted-foreground mb-1">Lead Generation</p>
                        <p className="text-2xl font-bold text-primary">{getBenchmark().leadGen}</p>
                        <p className="text-xs text-muted-foreground mt-1">B2B & services</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Tips */}
                <Card className="glass-card border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle>5 Proven Ways to Improve Your Conversion Rate</CardTitle>
                    <CardDescription>
                      Implement these strategies to boost your website performance
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      <li className="flex items-start gap-3">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-white text-sm flex-shrink-0 mt-0.5 font-semibold">
                          1
                        </span>
                        <div>
                          <p className="font-semibold text-foreground">Clarify Your Value Proposition</p>
                          <p className="text-sm text-muted-foreground">Make it crystal clear what you offer and why visitors should choose you in the first 5 seconds. A clear headline can improve conversions by 20-40%.</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-white text-sm flex-shrink-0 mt-0.5 font-semibold">
                          2
                        </span>
                        <div>
                          <p className="font-semibold text-foreground">Improve Page Speed</p>
                          <p className="text-sm text-muted-foreground">Every second of load time costs you 7% in conversions. Aim for under 3 seconds. Learn more in our <Link href="/blog/how-to-make-website-faster" className="text-primary hover:underline">website speed guide</Link>.</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-white text-sm flex-shrink-0 mt-0.5 font-semibold">
                          3
                        </span>
                        <div>
                          <p className="font-semibold text-foreground">Add Trust Signals</p>
                          <p className="text-sm text-muted-foreground">Display customer testimonials, security badges, and client logos to build credibility. Trust signals can increase conversions by 15-42%.</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-white text-sm flex-shrink-0 mt-0.5 font-semibold">
                          4
                        </span>
                        <div>
                          <p className="font-semibold text-foreground">Simplify Your Forms</p>
                          <p className="text-sm text-muted-foreground">Reducing form fields from 11 to 4 can increase conversions by 120%. Only ask for essential information.</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-white text-sm flex-shrink-0 mt-0.5 font-semibold">
                          5
                        </span>
                        <div>
                          <p className="font-semibold text-foreground">Optimize for Mobile</p>
                          <p className="text-sm text-muted-foreground">60%+ of traffic is mobile. Ensure buttons are 44x44 pixels minimum, text is readable, and forms work perfectly on small screens.</p>
                        </div>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Educational Content Section - SEO Optimized */}
            <div className="mt-12 space-y-8">
              
              {/* Main Educational Content */}
              <div className="prose prose-lg max-w-none">
                <Card className="glass-card border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-3xl">What is a Conversion Rate and Why Does It Matter?</CardTitle>
                    <CardDescription className="text-base">
                      Understanding conversion rates is essential for online business success
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6 text-muted-foreground leading-relaxed">
                    <div>
                      <h3 className="text-2xl font-bold text-foreground mb-3">How to Calculate Conversion Rate</h3>
                      <p>
                        A <strong>conversion rate</strong> is the percentage of website visitors who complete a desired action—whether that's making a purchase, signing up for a newsletter, requesting a demo, or downloading a resource. The conversion rate formula is simple:
                      </p>
                      <div className="bg-primary/5 border-2 border-primary/20 p-6 rounded-lg my-4">
                        <p className="text-center text-lg font-semibold text-foreground">
                          Conversion Rate = (Total Conversions ÷ Total Visitors) × 100
                        </p>
                      </div>
                      <p>
                        For example, if 10,000 people visit your website and 250 make a purchase, your conversion rate is (250 ÷ 10,000) × 100 = 2.5%.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold text-foreground mb-3">Why Your Conversion Rate Matters More Than Traffic</h3>
                      <p>
                        Many business owners obsess over driving more traffic to their website through ads, SEO, and content marketing—while ignoring a fundamental truth: <strong>it's far cheaper and more profitable to convert more of your existing traffic than to acquire new visitors.</strong>
                      </p>
                      <p className="mt-3">
                        Consider this real-world example: If you spend $10,000/month on ads driving 5,000 visitors at a 2% conversion rate, you get 100 conversions. Improve to 3% (a 50% relative increase), and you get 150 conversions—50% more results from the same budget. At $100 average order value, that's an extra $5,000 per month or $60,000 annually.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold text-foreground mb-3">What is a Good Conversion Rate?</h3>
                      <p>
                        Understanding where your conversion rate stands is crucial for setting realistic optimization goals. Here are industry-standard benchmarks:
                      </p>
                      <ul className="list-disc pl-6 space-y-2 mt-3">
                        <li><strong className="text-red-600">Under 1%:</strong> Critically low. Indicates serious problems with value proposition, user experience, or technical performance. Immediate action required.</li>
                        <li><strong className="text-orange-600">1-2%:</strong> Below average. Your site is underperforming. Focus on fundamental improvements like clarifying your offer and simplifying the conversion path.</li>
                        <li><strong className="text-yellow-600">2-4%:</strong> Average. You're in the middle of the pack. Significant room for improvement through systematic optimization.</li>
                        <li><strong className="text-green-600">4-7%:</strong> Good. Above average performance. Continue testing and refining to reach excellent status.</li>
                        <li><strong className="text-green-800">Above 7%:</strong> Excellent. Top 5% of websites. Your optimization efforts are paying off significantly.</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold text-foreground mb-3">The Compounding Effect of Small Improvements</h3>
                      <p>
                        The beauty of conversion rate optimization is that improvements compound over time. Let's break down the math:
                      </p>
                      <p className="mt-3">
                        A website with 10,000 monthly visitors converting at 2% generates 200 conversions. Here's what happens with various improvements:
                      </p>
                      <ul className="list-disc pl-6 space-y-2 mt-3">
                        <li><strong>Improve to 2.5%:</strong> 250 conversions (25% increase) = +$5,000/month at $100 AOV</li>
                        <li><strong>Improve to 3%:</strong> 300 conversions (50% increase) = +$10,000/month</li>
                        <li><strong>Improve to 4%:</strong> 400 conversions (100% increase) = +$20,000/month</li>
                        <li><strong>Improve to 5%:</strong> 500 conversions (150% increase) = +$30,000/month</li>
                      </ul>
                      <p className="mt-3">
                        These aren't hypothetical numbers. Many businesses achieve 2-3 percentage point improvements within 30-90 days of systematic optimization. Use our <Link href="/blog/increase-conversion-rate-30-days" className="text-primary hover:underline font-medium">30-day sprint method</Link> to see results fast.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold text-foreground mb-3">How to Improve Your Conversion Rate: Step-by-Step</h3>
                      <p>
                        Improving your conversion rate isn't about guesswork—it's about systematic analysis and implementation:
                      </p>
                      <ol className="list-decimal pl-6 space-y-3 mt-3">
                        <li>
                          <strong>Analyze your current performance:</strong> Use this calculator to establish your baseline. You can't improve what you don't measure.
                        </li>
                        <li>
                          <strong>Identify conversion barriers:</strong> Run a comprehensive website analysis to discover what's holding you back. Our <Link href="/blog/how-to-analyze-website-conversion-issues" className="text-primary hover:underline font-medium">conversion analysis guide</Link> walks through the complete process.
                        </li>
                        <li>
                          <strong>Prioritize high-impact changes:</strong> Focus on quick wins first—headline optimization, CTA improvements, trust signals. These require no coding and can improve conversions by 10-15%.
                        </li>
                        <li>
                          <strong>Implement technical optimizations:</strong> Address page speed, mobile optimization, and form simplification. Technical fixes typically add another 5-10% improvement.
                        </li>
                        <li>
                          <strong>Test and measure:</strong> Use A/B testing to validate changes. Track results weekly and iterate based on data.
                        </li>
                      </ol>
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold text-foreground mb-3">Using AI to Optimize Conversion Rates</h3>
                      <p>
                        Traditional conversion optimization requires expensive consultants and weeks of manual analysis. AI changes everything by analyzing your entire website in seconds, identifying issues humans might miss, and prioritizing fixes by expected impact.
                      </p>
                      <p className="mt-3">
                        <strong>Talk to me Data</strong> uses AI to analyze 150+ factors across your website—including SEO, UX, messaging, speed, mobile optimization, and site structure. Instead of spending $5,000-15,000 on manual audits that take weeks, get instant, comprehensive analysis for free. Learn more about <Link href="/blog/how-to-use-ai-to-improve-conversion-rate" className="text-primary hover:underline font-medium">using AI for conversion optimization</Link>.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold text-foreground mb-3">Common Conversion Rate Mistakes to Avoid</h3>
                      <p>
                        Many websites unknowingly sabotage their conversion rates. Here are the most common mistakes:
                      </p>
                      <ul className="list-disc pl-6 space-y-2 mt-3">
                        <li><strong>Unclear value proposition:</strong> Visitors can't understand what you offer in 5 seconds</li>
                        <li><strong>Slow page speed:</strong> Sites taking 3+ seconds to load lose 50%+ of visitors</li>
                        <li><strong>Poor mobile experience:</strong> 60% of traffic is mobile, but most sites aren't optimized</li>
                        <li><strong>Too many form fields:</strong> Asking for 10+ pieces of information kills conversions</li>
                        <li><strong>Missing trust signals:</strong> No testimonials, reviews, or security badges</li>
                        <li><strong>Weak CTAs:</strong> Generic "Submit" buttons instead of action-oriented copy</li>
                        <li><strong>Complex navigation:</strong> Visitors can't find what they need quickly</li>
                      </ul>
                    </div>

                    <div className="bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5 border-2 border-primary/20 p-8 rounded-2xl shadow-lg">
                      <h3 className="text-2xl font-bold text-foreground mb-3">Take Action: Optimize Your Conversion Rate Today</h3>
                      <p>
                        Now that you've calculated your conversion rate and understand its importance, it's time to improve it. A website converting at 1% is leaving massive revenue on the table. A website converting at 5%+ is a well-oiled revenue machine.
                      </p>
                      <p className="mt-3">
                        The difference between these scenarios could be hundreds of thousands of dollars in annual revenue. Don't let your conversion rate remain a mystery or accept mediocre performance.
                      </p>
                      <div className="mt-6">
                        <Button 
                          className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-semibold py-6 px-8 cursor-pointer shadow-lg hover:shadow-xl transition-all"
                          onClick={() => window.open('https://app.talktomedata.com/signup', '_blank')}
                        >
                          Get Your Free Conversion Analysis Now →
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground mt-4">
                        Discover exactly what's hurting your conversions. Our AI analyzes your entire website and provides a prioritized action plan. Results in 60 seconds—no credit card required.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Final CTA with Gradient */}
              <div className="rounded-2xl overflow-hidden border-2 border-accent bg-gradient-to-br from-accent/10 via-primary/5 to-accent/10 shadow-xl">
                <div className="p-8 text-center">
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center">
                      <span className="text-2xl">🚀</span>
                    </div>
                    <h3 className="text-2xl font-bold text-foreground">Ready to Double Your Conversion Rate?</h3>
                  </div>
                  <p className="text-foreground mb-6 max-w-2xl mx-auto leading-relaxed">
                    Get instant AI-powered insights on exactly what's holding back your conversions. Our comprehensive analysis covers everything from page speed to mobile optimization to messaging clarity. Start optimizing today—completely free.
                  </p>
                  <Button 
                    className="bg-gradient-to-r from-accent to-primary hover:from-accent/90 hover:to-primary/90 text-white font-semibold py-6 px-8 cursor-pointer shadow-lg hover:shadow-xl transition-all"
                    onClick={() => window.open('https://app.talktomedata.com/signup', '_blank')}
                  >
                    Analyze Your Website Free →
                  </Button>
                  <p className="text-sm text-muted-foreground mt-4">
                    Join 10,000+ founders optimizing their websites • No credit card required
                  </p>
                </div>
              </div>

            </div>

          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
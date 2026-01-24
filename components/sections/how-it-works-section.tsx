"use client"

import { useState } from "react"
import { ArrowRight, LinkIcon, ShoppingBag, AlertCircle, CheckCircle2 } from "lucide-react"
import { Card } from "@/components/ui/card"

export function HowItWorksSection() {
  const [url, setUrl] = useState("")
  const [analyzing, setAnalyzing] = useState(false)
  const [showResults, setShowResults] = useState(false)

  const handleAnalyze = () => {
    // Redirect to signup page with URL parameter if available
    if (url) {
      window.open(`https://app.talktomedata.com/signup?url=${encodeURIComponent(url)}`, '_blank')
    } else {
      window.open('https://app.talktomedata.com/signup', '_blank')
    }
  }

  return (
    <section id="how-it-works" className="py-16 sm:py-24 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 text-balance">
              How It <span className="text-primary">Works</span>
            </h2>
            <p className="text-lg text-muted-foreground text-pretty">
              Enter your Shopify store URL and get instant insights. Our AI analyzes your entire store in 60 seconds.
            </p>
          </div>

          {/* Interactive demo */}
          <Card className="p-6 sm:p-8 border-2 border-primary/20 shadow-xl">
            <div className="space-y-6">
              {/* URL Input */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative">
                  <ShoppingBag className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="yourstore.myshopify.com"
                    className="w-full pl-10 pr-4 py-3 border-2 border-border rounded-lg focus:outline-none focus:border-primary transition-colors text-base"
                    disabled={analyzing || showResults}
                  />
                </div>
                <button
                  onClick={handleAnalyze}
                  disabled={analyzing || showResults}
                  className="px-6 py-3 bg-primary hover:bg-primary/90 disabled:bg-muted disabled:text-muted-foreground text-primary-foreground font-semibold rounded-lg shadow-lg transition-colors cursor-pointer flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  {analyzing ? "Analyzing..." : showResults ? "Analyzed" : "Analyze Store"}
                  {!analyzing && !showResults && <ArrowRight className="w-5 h-5" />}
                </button>
              </div>

              {/* Loading state */}
              {analyzing && (
                <div className="space-y-3 animate-pulse">
                  <div className="h-3 bg-primary/20 rounded-full w-full" />
                  <div className="h-3 bg-primary/20 rounded-full w-3/4" />
                  <div className="h-3 bg-primary/20 rounded-full w-5/6" />
                </div>
              )}

              {/* Results */}
              {showResults && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  {/* Score display */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-xl bg-gradient-to-r from-primary/10 to-accent/10 border-2 border-primary/20">
                    <div className="text-center sm:text-left">
                      <div className="text-sm text-muted-foreground font-medium mb-1">Conversion Health Score</div>
                      <div className="text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                        73%
                      </div>
                    </div>
                    <div className="text-center sm:text-right">
                      <div className="text-sm text-muted-foreground font-medium mb-1">Issues Found</div>
                      <div className="text-3xl font-bold text-accent">18</div>
                    </div>
                  </div>

                  {/* Recommendations preview */}
                  <div className="space-y-3">
                    <h4 className="font-bold text-lg">Critical Issues Blocking Conversions</h4>
                    {[
                      {
                        category: "Product Pages",
                        issue: "Missing product reviews and social proof on 12 products",
                        impact: "High",
                        color: "bg-red-500",
                        icon: AlertCircle
                      },
                      {
                        category: "Site Speed",
                        issue: "Large hero images (3.2MB) slowing homepage load to 5.4s",
                        impact: "High",
                        color: "bg-red-500",
                        icon: AlertCircle
                      },
                      {
                        category: "Checkout",
                        issue: "Missing trust badges and security indicators at checkout",
                        impact: "High",
                        color: "bg-red-500",
                        icon: AlertCircle
                      },
                      {
                        category: "Mobile UX",
                        issue: "Add to Cart button too small on mobile (36px vs 44px min)",
                        impact: "Medium",
                        color: "bg-yellow-500",
                        icon: AlertCircle
                      },
                      {
                        category: "Cart",
                        issue: "No cart abandonment recovery email sequence detected",
                        impact: "Medium",
                        color: "bg-yellow-500",
                        icon: AlertCircle
                      },
                    ].map((rec, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 p-4 rounded-lg bg-muted/50 border border-border hover:border-primary/40 transition-colors"
                      >
                        <div className={`w-1.5 h-full ${rec.color} rounded-full shrink-0 mt-1`} />
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                            <span className="text-xs font-semibold text-primary">{rec.category}</span>
                            <span className="text-xs text-muted-foreground">• {rec.impact} Impact</span>
                          </div>
                          <p className="text-sm text-foreground leading-relaxed">{rec.issue}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* What you'll get */}
                  <div className="bg-accent/10 border-2 border-accent/20 rounded-lg p-4">
                    <h5 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-accent" />
                      Your Full Report Includes:
                    </h5>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                        Prioritized action plan ranked by revenue impact
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                        Specific fixes for product pages, cart, and checkout
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                        Mobile optimization recommendations
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                        Speed optimization quick wins
                      </li>
                    </ul>
                  </div>

                  {/* CTA */}
                  <button 
                    onClick={handleAnalyze}
                    className="w-full py-3 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-semibold rounded-lg shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    Get My Full Store Analysis
                    <ArrowRight className="w-5 h-5" />
                  </button>

                  {/* Reset button */}
                  <button
                    onClick={() => {
                      setShowResults(false)
                      setUrl("")
                    }}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer mx-auto block"
                  >
                    Try another store URL
                  </button>
                </div>
              )}
            </div>
          </Card>

          {/* Process steps */}
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Enter Your Store URL",
                description: "Paste your Shopify store URL and click analyze",
              },
              {
                step: "02",
                title: "AI Scans Your Store",
                description: "We analyze 150+ conversion factors across your entire store",
              },
              {
                step: "03",
                title: "Get Action Plan",
                description: "Receive prioritized recommendations ranked by revenue impact",
              },
            ].map((item, idx) => (
              <div key={idx} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 text-primary font-bold text-lg mb-4">
                  {item.step}
                </div>
                <h4 className="font-bold text-lg mb-2">{item.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
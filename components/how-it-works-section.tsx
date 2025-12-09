"use client"

import { useState } from "react"
import { ArrowRight, LinkIcon } from "lucide-react"
import { Card } from "@/components/ui/card"

export function HowItWorksSection() {
  const [url, setUrl] = useState("")
  const [analyzing, setAnalyzing] = useState(false)
  const [showResults, setShowResults] = useState(false)

  const handleAnalyze = () => {
    if (!url) return
    setAnalyzing(true)
    setTimeout(() => {
      setAnalyzing(false)
      setShowResults(true)
    }, 2000)
  }

  return (
    <section id="how-it-works" className="py-8 sm:py-12 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 text-balance">
              How It <span className="text-primary">Works</span>
            </h2>
            <p className="text-lg text-muted-foreground text-pretty">
              Simply add your URL and let us get to work. Our AI analyzes your entire website in seconds.
            </p>
          </div>

          {/* Interactive demo */}
          <Card className="p-6 sm:p-8 border-2 border-primary/20 shadow-xl">
            <div className="space-y-6">
              {/* URL Input */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative">
                  <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://yourwebsite.com"
                    className="w-full pl-10 pr-4 py-3 border-2 border-border rounded-lg focus:outline-none focus:border-primary transition-colors"
                    disabled={analyzing || showResults}
                  />
                </div>
                <button
                  onClick={handleAnalyze}
                  disabled={!url || analyzing || showResults}
                  className="px-6 py-3 bg-primary hover:bg-blue-600 disabled:bg-muted disabled:text-muted-foreground text-primary-foreground font-semibold rounded-lg shadow-lg transition-colors cursor-pointer flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  {analyzing ? "Analyzing..." : showResults ? "Analyzed" : "Analyze Now"}
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
                  <div className="flex items-center justify-between p-6 rounded-xl bg-gradient-to-r from-primary/10 to-accent/10 border-2 border-primary/20">
                    <div>
                      <div className="text-sm text-muted-foreground font-medium mb-1">Overall Score</div>
                      <div className="text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                        81%
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground font-medium mb-1">Opportunities Found</div>
                      <div className="text-3xl font-bold text-accent">24</div>
                    </div>
                  </div>

                  {/* Recommendations preview */}
                  <div className="space-y-3">
                    <h4 className="font-bold text-lg">Top Recommendations</h4>
                    {[
                      {
                        category: "SEO",
                        issue: "Missing meta descriptions on 8 pages",
                        impact: "High",
                        color: "bg-red-500",
                      },
                      {
                        category: "Speed",
                        issue: "Large images not optimized (2.4MB total)",
                        impact: "High",
                        color: "bg-red-500",
                      },
                      {
                        category: "UX",
                        issue: "CTA button contrast below WCAG standards",
                        impact: "Medium",
                        color: "bg-yellow-500",
                      },
                      {
                        category: "Mobile",
                        issue: "Touch targets smaller than 44px",
                        impact: "Medium",
                        color: "bg-yellow-500",
                      },
                    ].map((rec, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 p-4 rounded-lg bg-muted/50 border border-border hover:border-primary/40 transition-colors"
                      >
                        <div className={`w-1.5 h-full ${rec.color} rounded-full shrink-0 mt-1`} />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-semibold text-primary">{rec.category}</span>
                            <span className="text-xs text-muted-foreground">• {rec.impact} Impact</span>
                          </div>
                          <p className="text-sm text-foreground">{rec.issue}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <button className="w-full py-3 bg-accent hover:bg-accent/90 text-black font-semibold rounded-lg shadow-lg transition-colors cursor-pointer flex items-center justify-center gap-2">
                    Get Full Analysis Report
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
                    Try another URL
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
                title: "Enter URL",
                description: "Simply paste your website URL and click analyze",
              },
              {
                step: "02",
                title: "AI Analysis",
                description: "Our AI scans 150+ data points across all critical areas",
              },
              {
                step: "03",
                title: "Get Results",
                description: "Receive actionable recommendations ranked by impact",
              },
            ].map((item, idx) => (
              <div key={idx} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary font-bold text-lg mb-4">
                  {item.step}
                </div>
                <h4 className="font-bold text-lg mb-2">{item.title}</h4>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

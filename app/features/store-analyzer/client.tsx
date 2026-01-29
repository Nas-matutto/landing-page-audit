"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, CheckCircle2, AlertCircle, Loader2, ArrowRight, TrendingUp, Zap, Lock } from "lucide-react"

interface DetailedAnalysis {
  category: string
  score: number
  findings: string[]
  recommendation: string
  impact: string
}

interface AnalysisResult {
  score: number
  scoreRange: { min: number; max: number }
  url: string
  positives: {
    title: string
    description: string
  }[]
  issues: {
    category: string
    title: string
    impact: 'high' | 'medium' | 'low'
    description: string
  }[]
  detailedAnalysis: DetailedAnalysis[]
  totalIssues: number
}

export function StoreAnalyzerClient() {
  const [url, setUrl] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [error, setError] = useState("")

  const analyzeStore = async () => {
    if (!url) {
      setError("Please enter a store URL")
      return
    }

    // Add https:// if missing
    let finalUrl = url.trim()
    if (!finalUrl.match(/^https?:\/\//)) {
      finalUrl = 'https://' + finalUrl
    }

    setError("")
    setLoading(true)
    setResult(null)

    try {
      const response = await fetch('/api/analyze-store', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: finalUrl }),
      })

      if (!response.ok) {
        throw new Error('Analysis failed')
      }

      const data = await response.json()
      setResult(data)
    } catch (err) {
      setError("Failed to analyze store. Please check the URL and try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      analyzeStore()
    }
  }

  const handleSignup = () => {
    window.open('https://app.talktomedata.com/signup', '_blank')
  }

  // Categories that are locked (shown after signup CTA)
  const lockedCategories = [
    "Pricing Psychology",
    "Smart Upsells & Cross-Sells",
    "Exit Intent & Abandonment Capture",
    "Personalization",
    "Live Chat / Fast Support",
    "Scarcity & Urgency",
    "Above-the-Fold Value Proposition",
    "High-Quality Product Media",
    "Clear Shipping & Returns Policy",
    "On-Site Trust Signals",
    "Mobile UX Optimization"
  ]

  return (
    <div className="space-y-8">
      {/* Input Section */}
      <Card className="border-2 border-primary/20 shadow-xl">
        <CardContent className="p-6 sm:p-8">
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="yourstore.com"
                  className="pl-10 h-12 text-base border-2"
                  disabled={loading}
                />
              </div>
              <Button
                onClick={analyzeStore}
                disabled={loading}
                className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-semibold h-12 px-8 cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    Analyze Store
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </>
                )}
              </Button>
            </div>
            {error && (
              <div className="text-sm text-red-600 flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                {error}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Results Section */}
      {result && (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {/* Score Card */}
          <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
            <CardContent className="p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="text-center sm:text-left flex-1">
                  <div className="text-sm text-muted-foreground font-medium mb-2">
                    Estimated Conversion Score
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                      {result.scoreRange.min}% - {result.scoreRange.max}%
                    </div>
                  </div>
                  <div className="mt-3">
                    <Button
                      onClick={handleSignup}
                      variant="outline"
                      className="border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold cursor-pointer"
                    >
                      Sign Up to See Full Analysis
                    </Button>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-8 h-8 text-accent" />
                  <div className="text-sm text-muted-foreground">
                    <div className="font-semibold text-foreground">Potential Impact</div>
                    <div>+{Math.floor((100 - result.score) * 0.3)}-{Math.floor((100 - result.score) * 0.5)}% conversion increase</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Overview - Positive Points */}
          <div>
            <h3 className="text-2xl font-bold mb-4">Overview</h3>
            <div className="space-y-3">
              {result.positives.map((positive, index) => (
                <Card 
                  key={index}
                  className="border-l-4 border-l-green-500 hover:shadow-md transition-shadow"
                >
                  <CardContent className="p-5">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                          <CheckCircle2 className="w-5 h-5 text-green-600" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-foreground mb-1">
                          {positive.title}
                        </h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {positive.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Areas of Improvement */}
          <div>
            <h3 className="text-2xl font-bold mb-4">Areas of Improvement</h3>
            <div className="space-y-3">
              {result.issues.slice(0, 5).map((issue, index) => (
                <Card 
                  key={index}
                  className="border-l-4 hover:shadow-md transition-shadow"
                  style={{
                    borderLeftColor: issue.impact === 'high' ? '#ef4444' : 
                                     issue.impact === 'medium' ? '#f59e0b' : 
                                     '#10b981'
                  }}
                >
                  <CardContent className="p-5">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          issue.impact === 'high' ? 'bg-red-100' :
                          issue.impact === 'medium' ? 'bg-yellow-100' :
                          'bg-green-100'
                        }`}>
                          {issue.impact === 'high' ? (
                            <AlertCircle className="w-5 h-5 text-red-600" />
                          ) : issue.impact === 'medium' ? (
                            <Zap className="w-5 h-5 text-yellow-600" />
                          ) : (
                            <CheckCircle2 className="w-5 h-5 text-green-600" />
                          )}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs font-semibold text-primary uppercase">
                            {issue.category}
                          </span>
                          <span className={`text-xs font-semibold uppercase ${
                            issue.impact === 'high' ? 'text-red-600' :
                            issue.impact === 'medium' ? 'text-yellow-600' :
                            'text-green-600'
                          }`}>
                            {issue.impact} Impact
                          </span>
                        </div>
                        <h4 className="font-bold text-foreground mb-1">
                          {issue.title}
                        </h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {issue.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* High-Converting Signup CTA */}
          <Card className="border-2 border-accent/30 bg-gradient-to-br from-accent/10 via-primary/5 to-accent/10 shadow-xl">
            <CardContent className="p-8 sm:p-10">
              <div className="text-center max-w-2xl mx-auto">
                <div className="mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent mb-4">
                    <Lock className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
                    Unlock Your Complete Store Analysis
                  </h3>
                  <p className="text-lg text-muted-foreground mb-6">
                    Below are 4 out of 15 optimization categories. Get the full picture with detailed insights on pricing psychology, upsell opportunities, abandonment recovery, personalization, and 11 more critical areas.
                  </p>
                </div>

                <div className="grid sm:grid-cols-3 gap-4 mb-8">
                  <div className="p-4 rounded-lg bg-background/50 border border-border">
                    <div className="text-2xl font-bold text-primary mb-1">15+</div>
                    <div className="text-sm text-muted-foreground">Parameters Analyzed</div>
                  </div>
                  <div className="p-4 rounded-lg bg-background/50 border border-border">
                    <div className="text-2xl font-bold text-primary mb-1">100%</div>
                    <div className="text-sm text-muted-foreground">Free</div>
                  </div>
                  <div className="p-4 rounded-lg bg-background/50 border border-border">
                    <div className="text-2xl font-bold text-primary mb-1">60s</div>
                    <div className="text-sm text-muted-foreground">Setup Time</div>
                  </div>
                </div>

                <Button
                  onClick={handleSignup}
                  size="lg"
                  className="bg-gradient-to-r from-accent to-primary hover:from-accent/90 hover:to-primary/90 text-white font-bold px-10 py-7 text-lg shadow-2xl cursor-pointer mb-4"
                >
                  Get Full Report Free
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                
                <p className="text-sm font-semibold text-foreground">
                  No credit card required • Instant access • Free Analysis
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Detailed Analysis - 4 Categories Shown */}
          <div>
            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-2">Detailed Analysis</h3>
              <p className="text-muted-foreground">
                Here's what we found across 4 key conversion categories
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-4">
              {result.detailedAnalysis.map((analysis, index) => (
                <Card key={index} className="glass-card hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    {/* Category Header */}
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-bold text-lg text-foreground">{analysis.category}</h4>
                      <div className="flex items-center gap-2">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-xl font-bold ${
                          analysis.score >= 80 ? 'bg-green-100 text-green-700' :
                          analysis.score >= 60 ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {analysis.score}
                        </div>
                      </div>
                    </div>

                    {/* Findings */}
                    <div className="mb-4">
                      <div className="text-xs font-semibold text-muted-foreground uppercase mb-2">
                        What We Found
                      </div>
                      <ul className="space-y-2">
                        {analysis.findings.map((finding, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                            <span className="text-muted-foreground">{finding}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Recommendation */}
                    <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
                      <div className="text-xs font-semibold text-primary uppercase mb-1">
                        {analysis.impact}
                      </div>
                      <p className="text-sm text-foreground leading-relaxed">
                        {analysis.recommendation}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Locked Categories Preview */}
          <div>
            <div className="mb-4">
              <h3 className="text-xl font-bold text-muted-foreground flex items-center gap-2">
                <Lock className="w-5 h-5" />
                11 More Categories Available
              </h3>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {lockedCategories.map((category, index) => (
                <div 
                  key={index}
                  className="p-4 rounded-lg border-2 border-dashed border-border bg-muted/30 relative overflow-hidden group hover:border-primary/30 transition-colors"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative">
                    <Lock className="w-4 h-4 text-muted-foreground mb-2" />
                    <div className="text-sm font-semibold text-foreground">
                      {category}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 text-center">
              <Button
                onClick={handleSignup}
                variant="outline"
                className="border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold cursor-pointer"
              >
                Unlock All Categories Free
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* How It Works */}
      {!result && !loading && (
        <div className="grid sm:grid-cols-3 gap-6 mt-12">
          {[
            {
              step: "01",
              title: "Enter Your Store URL",
              description: "Paste your e-commerce store URL and click analyze"
            },
            {
              step: "02",
              title: "AI Analyzes Your Store",
              description: "We scan 15+ conversion factors in real-time"
            },
            {
              step: "03",
              title: "Get Instant Insights",
              description: "See your score and top priority optimizations"
            }
          ].map((item, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 text-primary font-bold text-lg mb-4">
                {item.step}
              </div>
              <h4 className="font-bold text-lg mb-2">{item.title}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
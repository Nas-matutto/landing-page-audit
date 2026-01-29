"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, CheckCircle2, AlertCircle, Loader2, ArrowRight, TrendingUp, Zap } from "lucide-react"

interface AnalysisResult {
  score: number
  url: string
  issues: {
    category: string
    title: string
    impact: 'high' | 'medium' | 'low'
    description: string
  }[]
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

    // Basic URL validation
    if (!url.match(/^https?:\/\/.+/)) {
      setError("Please enter a valid URL starting with http:// or https://")
      return
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
        body: JSON.stringify({ url }),
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
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="https://yourstore.com"
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
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {/* Score Card */}
          <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
            <CardContent className="p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="text-center sm:text-left">
                  <div className="text-sm text-muted-foreground font-medium mb-2">
                    Conversion Health Score
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-6xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                      {result.score}%
                    </div>
                    <div className="text-left">
                      <div className={`text-sm font-semibold ${
                        result.score >= 80 ? 'text-green-600' : 
                        result.score >= 60 ? 'text-yellow-600' : 
                        'text-red-600'
                      }`}>
                        {result.score >= 80 ? 'Great!' : result.score >= 60 ? 'Good' : 'Needs Work'}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {result.totalIssues} optimization opportunities found
                      </div>
                    </div>
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

          {/* Top 5 Issues */}
          <div>
            <h3 className="text-2xl font-bold mb-4">Top Priority Issues</h3>
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

          {/* More Issues Available */}
          <Card className="border-2 border-accent/20 bg-gradient-to-br from-accent/5 to-primary/5">
            <CardContent className="p-6 sm:p-8 text-center">
              <div className="mb-4">
                <div className="text-4xl font-bold text-foreground mb-2">
                  +{result.totalIssues - 5} More Issues
                </div>
                <p className="text-muted-foreground">
                  We found {result.totalIssues - 5} additional optimization opportunities across page speed, mobile UX, checkout flow, and more.
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-accent" />
                  <span className="text-sm text-foreground font-medium">
                    Get your complete analysis with step-by-step fix instructions
                  </span>
                </div>
                <Button
                  onClick={handleSignup}
                  className="bg-gradient-to-r from-accent to-primary hover:from-accent/90 hover:to-primary/90 text-white font-semibold px-8 py-6 text-lg cursor-pointer"
                >
                  Get Full Report Free →
                </Button>
                <p className="text-xs text-muted-foreground">
                  No credit card required • Instant access • Unlimited use
                </p>
              </div>
            </CardContent>
          </Card>
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
              description: "We scan 50+ conversion factors in real-time"
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
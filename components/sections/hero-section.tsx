"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Search } from "lucide-react"
import { AuroraBackground } from "@/components/ui/aurora-background"

const DEMO_TOOLS = ["HubSpot", "Salesforce", "Notion", "Linear", "Slack", "Pipedrive", "Intercom"]

const DEMO_RESULTS: Record<string, { name: string; domain: string; signals: number; type: string }[]> = {
  HubSpot: [
    { name: "Acme Corp", domain: "acmecorp.com", signals: 4, type: "Job posting" },
    { name: "TechFlow Inc", domain: "techflow.io", signals: 2, type: "G2 review" },
    { name: "GrowthLab", domain: "growthlab.co", signals: 3, type: "Job posting" },
  ],
  Salesforce: [
    { name: "Vertex Systems", domain: "vertexsys.com", signals: 6, type: "Job posting" },
    { name: "Meridian SaaS", domain: "meridiansaas.com", signals: 3, type: "Capterra" },
    { name: "Orbit CRM", domain: "orbitcrm.io", signals: 2, type: "Job posting" },
  ],
  Notion: [
    { name: "Baseline Studio", domain: "baseline.studio", signals: 2, type: "Reddit" },
    { name: "Craft & Co", domain: "craftandco.io", signals: 5, type: "Job posting" },
    { name: "Loop Agency", domain: "loopagency.com", signals: 1, type: "G2 review" },
  ],
  Linear: [
    { name: "Shipfast Labs", domain: "shipfast.dev", signals: 3, type: "Job posting" },
    { name: "Cortex Build", domain: "cortexbuild.io", signals: 2, type: "Reddit" },
    { name: "Nova Engineering", domain: "novaeng.com", signals: 4, type: "Job posting" },
  ],
  Slack: [
    { name: "Pebble Health", domain: "pebblehealth.co", signals: 7, type: "Job posting" },
    { name: "Driftwood Co", domain: "driftwood.co", signals: 3, type: "G2 review" },
    { name: "Fern Analytics", domain: "fernanalytics.io", signals: 2, type: "Job posting" },
  ],
}

const POPULAR_TOOLS = [
  "HubSpot", "Salesforce", "Notion", "Linear", "Slack",
  "Pipedrive", "Intercom", "Zendesk", "Mixpanel", "Segment",
  "Figma", "Webflow", "Airtable", "Monday.com", "Asana",
]

export function HeroSection() {
  const [query, setQuery] = useState("")
  const [placeholder, setPlaceholder] = useState("")
  const [toolIndex, setToolIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [results, setResults] = useState<typeof DEMO_RESULTS[string] | null>(null)
  const [isSearching, setIsSearching] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  // Typewriter effect for placeholder
  useEffect(() => {
    if (query) return
    const currentTool = DEMO_TOOLS[toolIndex]
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (charIndex < currentTool.length) {
          setPlaceholder(currentTool.slice(0, charIndex + 1))
          setCharIndex(c => c + 1)
        } else {
          setTimeout(() => setIsDeleting(true), 1400)
        }
      } else {
        if (charIndex > 0) {
          setPlaceholder(currentTool.slice(0, charIndex - 1))
          setCharIndex(c => c - 1)
        } else {
          setIsDeleting(false)
          setToolIndex(i => (i + 1) % DEMO_TOOLS.length)
        }
      }
    }, isDeleting ? 60 : 90)
    return () => clearTimeout(timeout)
  }, [charIndex, isDeleting, toolIndex, query])

  const handleSearch = (searchTool?: string) => {
    const tool = searchTool ?? query.trim()
    if (!tool) return
    setIsSearching(true)
    setTimeout(() => {
      const key = Object.keys(DEMO_RESULTS).find(k => k.toLowerCase() === tool.toLowerCase())
      setResults(key ? DEMO_RESULTS[key] : DEMO_RESULTS["HubSpot"])
      setIsSearching(false)
    }, 800)
  }

  const handleChipClick = (tool: string) => {
    setQuery(tool)
    handleSearch(tool)
  }

  return (
    <AuroraBackground className="min-h-screen pt-20">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.7, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center w-full max-w-4xl mx-auto px-4 sm:px-6 text-center"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold tracking-widest uppercase"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          Signal Intelligence for Sales Teams
        </motion.div>

        {/* Headline */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-balance leading-[1.05] mb-6">
          See every company using{" "}
          <span className="bg-clip-text text-transparent bg-linear-to-r from-primary via-blue-400 to-violet-500">
            your competitor's tools
          </span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
          We scan job postings and product reviews to surface which companies rely on specific SaaS products.
          Start warm outreach with real signals — not guesswork.
        </p>

        {/* Search box */}
        <div className="w-full max-w-2xl mx-auto mb-6">
          <div className="relative flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-2xl p-2 shadow-xl shadow-blue-100/40">
            <Search className="ml-3 w-5 h-5 text-slate-400 shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleSearch()}
              placeholder={query ? "" : (placeholder || "Type a SaaS tool...")}
              className="flex-1 bg-transparent text-base text-slate-800 placeholder:text-slate-400 outline-none px-2 py-2"
              aria-label="Search for a SaaS tool"
            />
            <button
              onClick={() => handleSearch()}
              disabled={isSearching}
              className="flex items-center gap-2 bg-primary hover:bg-primary/90 disabled:opacity-60 text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition-all cursor-pointer whitespace-nowrap"
            >
              {isSearching ? (
                <span className="flex items-center gap-2">
                  <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Searching
                </span>
              ) : (
                <>Find companies <ArrowRight className="w-4 h-4" /></>
              )}
            </button>
          </div>

          {/* Demo results */}
          {results && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-3 bg-white/90 backdrop-blur-sm border border-slate-200 rounded-2xl overflow-hidden shadow-xl shadow-blue-100/30"
            >
              <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Companies using {query || "this tool"}
                </span>
                <span className="text-xs text-slate-400">Demo · 3 of 247</span>
              </div>
              {results.map((r, i) => (
                <div key={i} className={`flex items-center gap-4 px-4 py-3.5 ${i < results.length - 1 ? "border-b border-slate-100" : ""} ${i === 2 ? "opacity-40" : ""}`}>
                  <div className="w-8 h-8 rounded-lg bg-linear-to-br from-primary/10 to-violet-100 flex items-center justify-center shrink-0">
                    <span className="text-xs font-bold text-primary">{r.name[0]}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-800">{r.name}</p>
                    <p className="text-xs text-slate-400 font-mono">{r.domain}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="inline-flex items-center gap-1 text-xs bg-primary/8 text-primary px-2 py-0.5 rounded-full font-medium">
                      {r.signals} signals · {r.type}
                    </span>
                  </div>
                </div>
              ))}
              <div className="px-4 py-3 bg-linear-to-r from-primary/5 to-violet-50 flex items-center justify-between">
                <span className="text-xs text-slate-500">244 more companies hidden</span>
                <button
                  className="text-xs font-semibold text-primary hover:text-primary/80 flex items-center gap-1 cursor-pointer"
                  onClick={() => window.open("#", "_blank")}
                >
                  Sign up to see all <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </motion.div>
          )}
        </div>

        {/* Popular tools chips */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {POPULAR_TOOLS.slice(0, 10).map(tool => (
            <button
              key={tool}
              onClick={() => handleChipClick(tool)}
              className="px-3 py-1.5 text-xs font-medium text-slate-600 bg-white/60 hover:bg-white border border-slate-200 hover:border-primary/30 hover:text-primary rounded-full transition-all cursor-pointer backdrop-blur-sm"
            >
              {tool}
            </button>
          ))}
        </div>

        {/* Social proof */}
        <p className="text-sm text-slate-500">
          <span className="font-semibold text-slate-700">Free to start</span> · No credit card ·{" "}
          <span className="font-semibold text-slate-700">10 free searches</span> every month
        </p>
      </motion.div>
    </AuroraBackground>
  )
}

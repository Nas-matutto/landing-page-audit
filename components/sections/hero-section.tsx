"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Search } from "lucide-react"
import { useRouter } from "next/navigation"
import { AuroraBackground } from "@/components/ui/aurora-background"

const DEMO_TOOLS = ["HubSpot", "Salesforce", "Notion", "Linear", "Slack", "Pipedrive", "Intercom"]

const POPULAR_TOOLS = [
  "HubSpot", "Salesforce", "Notion", "Linear", "Slack",
  "Pipedrive", "Intercom", "Zendesk", "Mixpanel", "Segment",
]

export function HeroSection() {
  const router = useRouter()
  const [query, setQuery] = useState("")
  const [placeholder, setPlaceholder] = useState("")
  const [toolIndex, setToolIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  // Typewriter placeholder animation only
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

  const goToDemo = () => router.push("/book-demo")

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
          className="inline-flex items-center gap-2 mb-6 sm:mb-8 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold tracking-widest uppercase"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          Signal Intelligence for Sales Teams
        </motion.div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-balance leading-[1.08] mb-5">
          See every company using{" "}
          <span className="bg-clip-text text-transparent bg-linear-to-r from-primary via-blue-400 to-violet-500">
            your competitor's tools
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed">
          We crawl the internet to find who's using tools similar to yours, so you can start warm outreach based on real signals — and not guesswork
        </p>

        {/* Search box — typing is visual only; any action goes to Book Demo */}
        <div className="w-full max-w-2xl mx-auto mb-5">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-2xl p-2 shadow-xl shadow-blue-100/40">
            <div className="flex items-center flex-1 min-w-0">
              <Search className="ml-3 w-4 h-4 text-slate-400 shrink-0" />
              <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                onKeyDown={e => { if (e.key === "Enter") goToDemo() }}
                placeholder={query ? "" : (placeholder || "Type a SaaS tool...")}
                className="flex-1 min-w-0 bg-transparent text-sm text-slate-800 placeholder:text-slate-400 outline-none px-2 py-2.5"
                aria-label="Search for a SaaS tool"
              />
            </div>
            <button
              onClick={goToDemo}
              className="relative overflow-hidden group flex items-center justify-center gap-2 bg-linear-to-r from-primary to-violet-500 text-white font-semibold text-sm px-5 py-2.5 rounded-xl shadow-md shadow-primary/30 hover:shadow-lg hover:shadow-primary/40 transition-all cursor-pointer whitespace-nowrap"
            >
              <span className="absolute inset-0 bg-linear-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
              <span className="relative flex items-center gap-2">
                Find companies <ArrowRight className="w-4 h-4" />
              </span>
            </button>
          </div>
        </div>

        {/* Tool labels — display only, not interactive */}
        <div className="flex flex-wrap justify-center gap-x-3 gap-y-2 mb-8 sm:mb-10 max-w-xl mx-auto">
          {POPULAR_TOOLS.map(tool => (
            <span
              key={tool}
              className="text-xs text-slate-500"
            >
              {tool}
            </span>
          ))}
          <span className="text-xs text-slate-400 italic">and more</span>
        </div>
      </motion.div>
    </AuroraBackground>
  )
}

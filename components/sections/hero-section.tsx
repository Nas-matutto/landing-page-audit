"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { HeroVideo } from "@/components/ui/hero-video"
import { IntegrationMarquee } from "@/components/ui/integration-marquee"
import { SIGNUP_URL } from "@/lib/links"

// What the agent does for you, one result at a time. The last one is the whole
// pitch, so it takes the brand's Signal Blue to stand out from the rest.
const OUTCOMES = [
  { text: "grows your social media" },
  { text: "grows your SEO" },
  { text: "finds you new leads" },
  { text: "manages your website" },
  { text: "gets you cited by AI" },
  { text: "runs your business", className: "text-[#0072D5]!" },
]

/**
 * The outcomes sit in one grid cell, so the box keeps one height and nothing
 * below it jumps as they rotate. Each stays on one line: on phones the title
 * scales with the screen so "grows your social media" fits.
 */
function RotatingOutcome() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setTimeout(() => setIndex((i) => (i + 1) % OUTCOMES.length), 2400)
    return () => clearTimeout(id)
  }, [index])

  return (
    <span className="grid overflow-hidden pb-[0.12em]">
      {OUTCOMES.map((o, i) => (
        <motion.span
          key={o.text}
          aria-hidden={index !== i}
          className={`display col-start-1 row-start-1 whitespace-nowrap ${o.className ?? ""}`}
          initial={false}
          animate={index === i ? { opacity: 1, y: 0 } : { opacity: 0, y: index > i ? -60 : 60 }}
          transition={{ type: "spring", stiffness: 80, damping: 18 }}
        >
          {o.text}
        </motion.span>
      ))}
    </span>
  )
}

const FEATHER: React.CSSProperties = {
  maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent), linear-gradient(to bottom, transparent, black 7%, black 86%, transparent)",
  maskComposite: "intersect",
  WebkitMaskComposite: "source-in",
}

export function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden bg-white pt-36 sm:pt-44 lg:pt-36">
      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-10 px-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:gap-8 lg:px-8">
        <div className="rise-in text-center lg:text-left">
          <h1 className="display text-[clamp(1.375rem,7.4vw,2.5rem)] sm:text-[clamp(2.5rem,7vw,4.5rem)] lg:text-[clamp(2.25rem,3.5vw,3rem)]">
            <span className="block whitespace-nowrap">Get an AI Agent that</span>
            <RotatingOutcome />
          </h1>

          <p className="lede mx-auto mt-5 max-w-lg text-base sm:mt-6 sm:text-xl lg:mx-0">
            Agents that bring in customers and do the work for you, around the clock. Start free, no card needed.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start">
            <a
              href={SIGNUP_URL}
              className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-ink px-5 py-3 text-[15px] font-semibold tracking-[0.2px] text-white transition-opacity hover:opacity-85 sm:w-auto"
            >
              <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-in-out group-hover:translate-x-full" />
              <span className="relative flex items-center gap-2">
                Get Started <ArrowRight className="h-4 w-4" />
              </span>
            </a>
            <Link
              href="/book-demo"
              className="inline-flex w-full items-center justify-center rounded-full border border-hairline px-5 py-3 text-[15px] font-semibold tracking-[0.2px] text-ink transition-colors hover:bg-mist sm:w-auto"
            >
              Book Demo
            </Link>
          </div>
        </div>

        {/* The agent walks in, sits down with a coffee and gets to work (a 440 KB
            encode of the 4.3 MB original, on pure white). The clip ends on a
            close-up that runs off the frame (the cap's crown included), so all four
            edges are feathered into the page, as the still before it was. */}
        <div className="rise-in mx-auto w-full max-w-105 sm:max-w-120 lg:max-w-none" style={{ animationDelay: "0.15s" }}>
          <div style={FEATHER}>
            <HeroVideo
              src="/videos/home-agent-hero.mp4"
              poster="/videos/home-agent-hero-poster.jpg"
              alt="Talk to me Data's AI agent walking in to start work at his laptop"
              sizes="(min-width: 1024px) 520px, (min-width: 640px) 480px, 420px"
              className="rounded-none"
            />
          </div>
        </div>
      </div>

      {/* Integration marks drift past below the fold-line, bled to the full page width. */}
      <div className="rise-in mt-6 pb-4 sm:mt-8" style={{ animationDelay: "0.2s" }}>
        <p className="mb-6 text-center text-[13px] text-faint">
          Your AI Agents integrate seamlessly with any app you use
        </p>
        <IntegrationMarquee />
      </div>
    </section>
  )
}

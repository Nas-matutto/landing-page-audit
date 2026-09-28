"use client"

import { useEffect, useRef, useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

// The game is a self-contained static bundle served from /public/ai-quest-free.
const GAME_SRC = "/ai-quest-free/index.html"

export default function AiLearningGamePage() {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [height, setHeight] = useState(700)

  // The iframe is same-origin, so size it to the game page's content instead of
  // guessing a fixed height (the mobile layout adds an on-screen D-pad below the game).
  useEffect(() => {
    const iframe = iframeRef.current
    if (!iframe) return
    let observer: ResizeObserver | undefined

    const attach = () => {
      const body = iframe.contentDocument?.body
      if (!body) return
      observer?.disconnect()
      observer = new ResizeObserver(() => {
        setHeight(Math.ceil(body.getBoundingClientRect().height))
      })
      observer.observe(body)
    }

    iframe.addEventListener("load", attach)
    if (iframe.contentDocument?.readyState === "complete") attach()
    return () => {
      iframe.removeEventListener("load", attach)
      observer?.disconnect()
    }
  }, [])

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-28 sm:pt-36 pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <Link
            href="/free-tools"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            All free tools
          </Link>

          <div className="-mx-4 sm:mx-0 sm:rounded-2xl sm:border sm:border-slate-200 overflow-hidden shadow-sm">
            <iframe
              ref={iframeRef}
              src={GAME_SRC}
              title="AI Quest — AI learning game"
              className="block w-full border-0"
              style={{ height }}
            />
          </div>

          <p className="text-center text-sm text-slate-500 mt-6">
            Click the game once to enable keyboard controls. Progress is saved in your browser.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  )
}

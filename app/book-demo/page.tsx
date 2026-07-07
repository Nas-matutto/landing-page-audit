"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { CheckCircle2, ChevronLeft, Play } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { GoogleCalendarButton } from "@/components/google-calendar-button"

const BENEFITS = [
  "Tell us the workflow you want to automate",
  "We'll show you exactly what your agent could do",
  "Get a clear timeline from brief to live",
  "Ask questions before committing to anything",
]

export default function BookDemoPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      <main className="flex-1 pt-24 sm:pt-32 pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-primary transition-colors mb-10"
            >
              <ChevronLeft className="w-4 h-4" />
              Back to home
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              {/* Left: Copy */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 mb-5 text-balance">
                  Let's build your first AI agent
                </h1>
                <p className="text-lg text-slate-500 leading-relaxed mb-10">
                  Book a free 20-minute call with our team. Tell us what you want to automate — we'll tell you exactly what's possible and how fast we can get it live.
                </p>

                <ul className="space-y-4 mb-10">
                  {BENEFITS.map((b, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + i * 0.08, duration: 0.4 }}
                      className="flex items-start gap-3"
                    >
                      <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                      </div>
                      <span className="text-sm text-slate-700 leading-relaxed">{b}</span>
                    </motion.li>
                  ))}
                </ul>

                <div className="p-5 rounded-2xl bg-linear-to-br from-primary/5 to-violet-50 border border-primary/10">
                  <p className="text-sm font-semibold text-slate-800 mb-1">No commitment, just a conversation</p>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    We start with a free call to understand your workflow. If we're a good fit, we'll have your agent live within 24 hours of the brief.
                  </p>
                </div>
              </motion.div>

              {/* Right: Google Calendar */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-100/80 p-8"
              >
                <h2 className="text-xl font-bold text-slate-900 mb-2">Pick a time that works for you</h2>
                <p className="text-sm text-slate-500 mb-8">
                  Choose a slot directly in our calendar. The call is free, 20 minutes, and no preparation needed.
                </p>

                <GoogleCalendarButton />

                <p className="text-center text-xs text-slate-400 mt-8">
                  You'll receive a calendar invite with a video call link right after booking.
                </p>

                <div className="mt-6 pt-6 border-t border-slate-100">
                  <p className="text-sm text-slate-500 mb-3 text-center font-medium">Want to watch a video Demo first?</p>
                  <Link
                    href="/watch-demo"
                    className="relative overflow-hidden group inline-flex items-center justify-center gap-2 w-full bg-linear-to-r from-primary to-violet-500 text-white font-semibold text-sm px-6 py-3 rounded-xl shadow-md shadow-primary/25 hover:shadow-primary/40 transition-all"
                  >
                    <span className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
                    <span className="relative flex items-center gap-2">
                      <Play className="w-4 h-4" />
                      Watch Demo
                    </span>
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

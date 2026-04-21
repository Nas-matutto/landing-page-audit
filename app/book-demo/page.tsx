"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { CheckCircle2, ChevronLeft } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { GoogleCalendarButton } from "@/components/google-calendar-button"

const BENEFITS = [
  "See live demo of job posting & review signals",
  "Get a list of companies using any competitor tool",
  "Understand pricing & what's included",
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
                  See TTMD in action
                </h1>
                <p className="text-lg text-slate-500 leading-relaxed mb-10">
                  Book a 20-minute demo with our team. We'll walk you through exactly how signal-based prospecting works — and whether it's the right fit for your sales workflow.
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
                  <p className="text-sm font-semibold text-slate-800 mb-1">Book a Demo to get access</p>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    Access to TTMD is through a demo first. We want to make sure it's the right fit and set you up for success from day one.
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
                <h2 className="text-xl font-bold text-slate-900 mb-2">Pick a time that works</h2>
                <p className="text-sm text-slate-500 mb-8">
                  Choose a slot directly in our calendar. The call is 20 minutes, no preparation needed.
                </p>

                <GoogleCalendarButton />

                <p className="text-center text-xs text-slate-400 mt-8">
                  You'll receive a calendar invite with a video call link right after booking.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

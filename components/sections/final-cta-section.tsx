"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { SIGNUP_URL } from "@/lib/links"

const STATS = [
  { stat: "Free", label: "To get started" },
  { stat: "Minutes", label: "To your first analysis" },
  { stat: "Zero code", label: "Just plain English" },
]

export function FinalCTASection() {
  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="display text-[clamp(2.25rem,5.5vw,4rem)]">
              Put your first agent to work today
            </h2>
            <p className="lede mx-auto mt-6 max-w-xl text-lg">
              Start free with a ready-made agent for social media or SEO. Or tell us the job you want off your plate,
              and we&apos;ll build an agent for it.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href={SIGNUP_URL}
                className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-ink px-5 py-3 text-[15px] font-semibold tracking-[0.2px] text-white transition-opacity hover:opacity-85 sm:w-auto"
              >
                <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-in-out group-hover:translate-x-full" />
                <span className="relative flex items-center gap-2">
                  Get Started
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </a>
              <Link
                href="/book-demo"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-hairline px-5 py-3 text-[15px] font-semibold tracking-[0.2px] text-ink transition-colors hover:bg-mist sm:w-auto"
              >
                Book Demo
              </Link>
            </div>

            <p className="mt-6 text-[13px] text-faint">
              Free to start · No code · You stay in control
            </p>

            <div className="mx-auto mt-14 grid max-w-xl grid-cols-3 gap-6 border-t border-hairline pt-10 sm:gap-8">
              {STATS.map(({ stat, label }) => (
                <div key={stat} className="text-center">
                  <p className="text-xl font-semibold tracking-[-0.02em] text-ink sm:text-2xl">{stat}</p>
                  <p className="mt-1 text-xs text-faint">{label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

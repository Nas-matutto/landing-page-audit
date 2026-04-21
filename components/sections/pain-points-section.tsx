"use client"

import { motion } from "framer-motion"
import { X, Check } from "lucide-react"

const cold = [
  "Buy a list of 10,000 random companies",
  "Send the same email to everyone",
  "Hope someone happens to need you",
  "1–3% response rate on a good day",
]

const warm = [
  "Search for companies using a competitor",
  "See real signals: job posts + reviews",
  "Reach out with context that resonates",
  "Dramatically higher reply rates",
]

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

const item = {
  hidden: { opacity: 0, x: -12 },
  show: { opacity: 1, x: 0 },
}

export function PainPointsSection() {
  return (
    <section className="py-24 sm:py-32 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-4">The old way vs. the new way</p>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-balance">
              Cold outreach is broken.{" "}
              <span className="bg-clip-text text-transparent bg-linear-to-r from-primary to-violet-500">
                Signals fix it.
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Cold outreach card */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-2xl border-2 border-red-100 bg-red-50/50 p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                  <X className="w-4 h-4 text-red-500" />
                </div>
                <h3 className="font-bold text-lg text-slate-800">Cold outreach</h3>
              </div>
              <motion.ul
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="space-y-3"
              >
                {cold.map((text, i) => (
                  <motion.li key={i} variants={item} className="flex items-start gap-3 text-slate-600">
                    <X className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                    <span className="text-sm leading-relaxed">{text}</span>
                  </motion.li>
                ))}
              </motion.ul>
              <div className="mt-6 pt-6 border-t border-red-100">
                <p className="text-2xl font-bold text-red-500">~1%</p>
                <p className="text-xs text-slate-500 mt-1">Average response rate</p>
              </div>
            </motion.div>

            {/* Signal-based card */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="rounded-2xl border-2 border-primary/20 bg-primary/5 p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center">
                  <Check className="w-4 h-4 text-primary" />
                </div>
                <h3 className="font-bold text-lg text-slate-800">Signal-based outreach</h3>
              </div>
              <motion.ul
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="space-y-3"
              >
                {warm.map((text, i) => (
                  <motion.li key={i} variants={item} className="flex items-start gap-3 text-slate-700">
                    <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <span className="text-sm leading-relaxed">{text}</span>
                  </motion.li>
                ))}
              </motion.ul>
              <div className="mt-6 pt-6 border-t border-primary/15">
                <p className="text-2xl font-bold text-primary">5–15×</p>
                <p className="text-xs text-slate-500 mt-1">Higher reply rates with context</p>
              </div>
            </motion.div>
          </div>

          {/* Stat bar */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 grid grid-cols-3 divide-x divide-slate-200 border border-slate-200 rounded-2xl overflow-hidden bg-slate-50"
          >
            {[
              { stat: "247M+", label: "Job postings scanned" },
              { stat: "50+", label: "SaaS tools covered" },
              { stat: "Weekly", label: "Data refresh cadence" },
            ].map(({ stat, label }, i) => (
              <div key={i} className="py-6 text-center">
                <p className="text-2xl sm:text-3xl font-bold text-foreground">{stat}</p>
                <p className="text-xs text-slate-500 mt-1">{label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

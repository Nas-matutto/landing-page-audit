"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

export function FinalCTASection() {
  return (
    <section className="py-24 sm:py-32 bg-primary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white text-balance mb-6">
              Stop guessing. Start with signals.
            </h2>
            <p className="text-lg text-white/70 mb-10 max-w-xl mx-auto leading-relaxed">
              Find the companies already using your competitors' tools. Start free — no credit card, no setup, no fluff.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => window.open("#", "_blank")}
                className="group flex items-center gap-2 bg-white text-primary font-bold px-8 py-4 rounded-xl text-base hover:bg-white/90 transition-all shadow-xl cursor-pointer"
              >
                Find warm prospects free
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <p className="text-white/50 text-sm">10 free searches every month · No card needed</p>
            </div>

            <div className="mt-16 pt-12 border-t border-white/15 grid grid-cols-2 sm:grid-cols-4 gap-8">
              {[
                { stat: "200+", label: "Tools covered" },
                { stat: "10K+", label: "Companies indexed" },
                { stat: "Weekly", label: "Data refresh" },
                { stat: "$0", label: "To get started" },
              ].map(({ stat, label }, i) => (
                <div key={i} className="text-center">
                  <p className="text-2xl sm:text-3xl font-black text-white">{stat}</p>
                  <p className="text-xs text-white/50 mt-1">{label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

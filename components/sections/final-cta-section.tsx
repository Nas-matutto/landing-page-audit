"use client"

import { motion } from "framer-motion"
import { ArrowRight, CalendarDays } from "lucide-react"
import { useRouter } from "next/navigation"

export function FinalCTASection() {
  const router = useRouter()
  const goToDemo = () => router.push("/book-demo")

  return (
    <section className="py-24 sm:py-32 bg-linear-to-br from-primary via-blue-600 to-violet-600 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-violet-400/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-blue-300/15 rounded-full blur-3xl" />
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white text-balance mb-6">
              Ready to prospect smarter?
            </h2>
            <p className="text-lg text-white/70 mb-10 max-w-xl mx-auto leading-relaxed">
              Book a 20-minute demo with our team. We'll show you exactly which companies are using your competitors' tools and get you set up if it's a fit.
            </p>

            <button
              onClick={goToDemo}
              className="relative overflow-hidden group inline-flex items-center gap-2 bg-white text-primary font-bold px-8 py-4 rounded-xl text-base shadow-2xl shadow-black/20 hover:shadow-black/30 transition-all cursor-pointer"
            >
              <span className="absolute inset-0 bg-linear-to-r from-transparent via-primary/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
              <span className="relative flex items-center gap-2">
                <CalendarDays className="w-4 h-4" />
                Book your demo
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </button>

            <p className="text-white/40 text-sm mt-5">
              20-minute call · No commitment required · We'll follow up within 24h
            </p>

            <div className="mt-14 pt-10 border-t border-white/15 grid grid-cols-3 gap-6 sm:gap-8 max-w-xl mx-auto">
              {[
                { stat: "10K+", label: "Companies indexed" },
                { stat: "Weekly", label: "Data refresh" },
                { stat: "Personalized", label: "Onboarding" },
              ].map(({ stat, label }, i) => (
                <div key={i} className="text-center">
                  <p className="text-xl sm:text-2xl font-black text-white">{stat}</p>
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

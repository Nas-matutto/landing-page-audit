"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { IntegrationMarquee } from "@/components/ui/integration-marquee"
import { SIGNUP_URL } from "@/lib/links"

export function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden bg-white pt-36 sm:pt-44">
      <div className="relative mx-auto w-full max-w-4xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h1 className="display text-[clamp(2.75rem,7.5vw,5rem)]">
            Build and launch an AI Agent in minutes
          </h1>

          <p className="lede mx-auto mt-6 max-w-lg text-lg sm:text-xl">
            Automate any task with prompting. Start for free today.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
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

          <p className="mt-7 text-[13px] text-faint">
            Your AI Agents integrate seamlessly with any app you use
          </p>
        </motion.div>
      </div>

      {/* Integration marks drift past below the fold-line as the hero's visual,
          bled to the full page width. */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        className="mt-14 pb-4 sm:mt-16"
      >
        <IntegrationMarquee />
      </motion.div>
    </section>
  )
}

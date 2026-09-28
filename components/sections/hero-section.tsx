"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { IntegrationMarquee } from "@/components/ui/integration-marquee"
import { SIGNUP_URL } from "@/lib/links"

export function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden bg-white pt-36 sm:pt-44 lg:pt-36">
      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-10 px-6 lg:grid-cols-2 lg:gap-8 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center lg:text-left"
        >
          <h1 className="display text-[clamp(2.75rem,7.5vw,5rem)] lg:text-[clamp(3rem,4.4vw,4rem)]">
            Build and launch an AI Agent in minutes
          </h1>

          <p className="lede mx-auto mt-6 max-w-lg text-lg sm:text-xl lg:mx-0">
            Automate any task with prompting. Start for free today.
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
        </motion.div>

        {/* Brand ambassador at work — the image is flattened onto pure white with feathered
            edges, so it sits on the section background without a visible frame. */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
          className="mx-auto w-full max-w-105 sm:max-w-120 lg:max-w-none"
        >
          <Image
            src="/hero_ambassador.webp"
            alt="Talk to me Data's AI agent ambassador working on a laptop, surrounded by dashboards for social media, analytics, projects and music"
            width={1024}
            height={1024}
            priority
            className="h-auto w-full select-none"
            draggable={false}
          />
        </motion.div>
      </div>

      {/* Integration marks drift past below the fold-line, bled to the full page width. */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        className="mt-6 pb-4 sm:mt-8"
      >
        <p className="mb-6 text-center text-[13px] text-faint">
          Your AI Agents integrate seamlessly with any app you use
        </p>
        <IntegrationMarquee />
      </motion.div>
    </section>
  )
}

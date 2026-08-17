"use client"

import Link from "next/link"
import { ArrowRight, Bot } from "lucide-react"
import { motion } from "framer-motion"
import { FaSlack, FaWhatsapp, FaGoogle } from "react-icons/fa"
import {
  SiNotion, SiSalesforce, SiHubspot, SiShopify, SiStripe,
  SiZendesk, SiGmail, SiAirtable, SiMailchimp, SiAsana,
  SiTrello, SiIntercom, SiJira,
} from "react-icons/si"
import { SIGNUP_URL } from "@/lib/links"

type OrbitIcon = {
  Icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>
  color: string
  label: string
}

const ORBITS: { icons: OrbitIcon[]; durationS: number; sizeRem: number }[] = [
  {
    sizeRem: 16,
    durationS: 20,
    icons: [
      { Icon: FaSlack, color: "#4A154B", label: "Slack" },
      { Icon: SiHubspot, color: "#FF7A59", label: "HubSpot" },
      { Icon: FaWhatsapp, color: "#25D366", label: "WhatsApp" },
      { Icon: SiSalesforce, color: "#00A1E0", label: "Salesforce" },
      { Icon: FaGoogle, color: "#4285F4", label: "Google" },
      { Icon: SiNotion, color: "#374151", label: "Notion" },
    ],
  },
  {
    sizeRem: 26,
    durationS: 32,
    icons: [
      { Icon: SiShopify, color: "#7AB55C", label: "Shopify" },
      { Icon: SiStripe, color: "#635BFF", label: "Stripe" },
      { Icon: SiGmail, color: "#EA4335", label: "Gmail" },
      { Icon: SiZendesk, color: "#03363D", label: "Zendesk" },
      { Icon: SiAirtable, color: "#18BFFF", label: "Airtable" },
      { Icon: SiMailchimp, color: "#e8a825", label: "Mailchimp" },
    ],
  },
  {
    sizeRem: 36,
    durationS: 46,
    icons: [
      { Icon: SiIntercom, color: "#1F8DED", label: "Intercom" },
      { Icon: SiAsana, color: "#F06A6A", label: "Asana" },
      { Icon: SiJira, color: "#0052CC", label: "Jira" },
      { Icon: SiTrello, color: "#0079BF", label: "Trello" },
    ],
  },
]

function OrbitRing({ icons, durationS, sizeRem }: typeof ORBITS[0]) {
  return (
    <motion.div
      className="absolute rounded-full border border-hairline"
      style={{ width: `${sizeRem}rem`, height: `${sizeRem}rem` }}
      animate={{ rotate: 360 }}
      transition={{ duration: durationS, repeat: Infinity, ease: "linear" }}
    >
      {icons.map((item, idx) => {
        const angle = (idx / icons.length) * 2 * Math.PI
        const x = 50 + 50 * Math.cos(angle)
        const y = 50 + 50 * Math.sin(angle)
        return (
          <motion.div
            key={item.label}
            className="absolute"
            style={{ left: `${x}%`, top: `${y}%`, transform: "translate(-50%, -50%)" }}
            animate={{ rotate: -360 }}
            transition={{ duration: durationS, repeat: Infinity, ease: "linear" }}
          >
            {/* The integration marks are the only saturated colour in the hero —
                everything framing them stays monochrome. */}
            <div
              className="flex h-11 w-11 items-center justify-center rounded-full border border-hairline bg-white"
              title={item.label}
            >
              <item.Icon className="h-5 w-5" style={{ color: item.color }} />
            </div>
          </motion.div>
        )
      })}
    </motion.div>
  )
}

// Shared orbit canvas — 36rem × 36rem, scaled by caller
function OrbitCanvas() {
  return (
    <div className="relative flex items-center justify-center" style={{ width: "36rem", height: "36rem" }}>
      {/* Center icon */}
      <div className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full bg-ink">
        <Bot className="h-9 w-9 text-white" />
      </div>
      {ORBITS.map((orbit, i) => (
        <div key={i} className="absolute inset-0 flex items-center justify-center">
          <OrbitRing {...orbit} />
        </div>
      ))}
    </div>
  )
}

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
            Customer support · Lead qualification · Booking · Document Q&A · and more
          </p>
        </motion.div>
      </div>

      {/* The integration orbit sits below the fold-line as the hero's visual,
          bled to the full page width and faded into the section edges. */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        className="relative mt-16 flex justify-center overflow-hidden sm:mt-20"
        style={{ height: "clamp(300px, 42vw, 460px)" }}
      >
        <div className="absolute top-0 origin-top scale-[0.5] sm:scale-[0.7] lg:scale-[0.85]">
          <OrbitCanvas />
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-white to-transparent" />
      </motion.div>
    </section>
  )
}

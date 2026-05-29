"use client"

import { useRouter } from "next/navigation"
import { ArrowRight, Bot } from "lucide-react"
import { motion } from "framer-motion"
import { FaSlack, FaWhatsapp, FaGoogle } from "react-icons/fa"
import {
  SiNotion, SiSalesforce, SiHubspot, SiShopify, SiStripe,
  SiZendesk, SiGmail, SiAirtable, SiMailchimp, SiAsana,
  SiTrello, SiIntercom, SiJira,
} from "react-icons/si"

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
      className="absolute rounded-full border border-dashed border-slate-200"
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
            <div
              className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center ring-1 ring-slate-100"
              title={item.label}
            >
              <item.Icon className="w-5 h-5" style={{ color: item.color }} />
            </div>
          </motion.div>
        )
      })}
    </motion.div>
  )
}

export function HeroSection() {
  const router = useRouter()

  return (
    <section className="relative w-full min-h-screen flex items-center bg-white overflow-hidden pt-20">
      {/* Dot grid background */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(circle, #e2e8f0 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      {/* Fade-out mask so dots don't show at edges */}
      <div className="pointer-events-none absolute inset-0 bg-linear-to-r from-white via-transparent to-white" />
      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-white via-transparent to-white" />

      <div className="relative w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 flex items-center">
        {/* ── Left: text ── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full lg:w-1/2 z-10 py-20"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.08] mb-6 text-slate-900 text-balance">
            Your AI agents,{" "}
            <span className="bg-clip-text text-transparent bg-linear-to-r from-primary via-blue-400 to-violet-500">
              built and running
            </span>{" "}
            in days - not months.
          </h1>

          <p className="text-lg text-slate-500 leading-relaxed max-w-xl mb-8">
            Tell us what you need to automate. We build, deploy, and host your custom AI agent - you just use it.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => router.push("/book-demo")}
              className="relative overflow-hidden group inline-flex items-center justify-center gap-2 bg-linear-to-r from-primary to-violet-500 text-white font-semibold text-sm px-6 py-3 rounded-xl shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all cursor-pointer"
            >
              <span className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
              <span className="relative flex items-center gap-2">
                Book a free call <ArrowRight className="w-4 h-4" />
              </span>
            </button>
            <button
              onClick={() => router.push("/agents")}
              className="inline-flex items-center justify-center gap-2 border border-slate-200 bg-white text-slate-700 font-semibold text-sm px-6 py-3 rounded-xl hover:border-primary/40 hover:text-primary transition-all cursor-pointer"
            >
              Explore Agents
            </button>
          </div>

          <p className="mt-6 text-xs text-slate-400 leading-relaxed">
            Customer support · Lead qualification · Booking · Document Q&A · and more
          </p>
        </motion.div>

        {/* ── Right: orbit animation ── */}
        <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-1/2 overflow-hidden">
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ transform: "translateX(22%)" }}
          >
            {/* Center icon */}
            <div className="relative z-10 w-20 h-20 rounded-full bg-linear-to-br from-primary to-violet-500 flex items-center justify-center shadow-xl shadow-primary/30">
              <Bot className="w-10 h-10 text-white" />
            </div>

            {/* Orbit rings — each centered on the same point */}
            {ORBITS.map((orbit, i) => (
              <div key={i} className="absolute inset-0 flex items-center justify-center">
                <OrbitRing {...orbit} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

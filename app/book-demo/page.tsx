"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, CalendarDays, Check, Play } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Ambassador } from "@/components/ui/ambassador"
import { FAQSection } from "@/components/sections/faq-section"
import { SIGNUP_URL } from "@/lib/links"

const BENEFITS = [
  "Tell us the job you want off your plate",
  "See exactly what your agent could do with the tools you already use",
  "Get a clear timeline from brief to live",
  "Ask anything before you commit",
]

const CALL_STEPS = [
  {
    n: "01",
    title: "You describe the job",
    body: "Chasing invoices, qualifying leads, answering support, sending a weekly report. Walk us through how it's done today.",
  },
  {
    n: "02",
    title: "We map the agent",
    body: "We show you what an agent would take over, which of your tools it connects to, and where you stay in control.",
  },
  {
    n: "03",
    title: "You decide",
    body: "If it's a fit, we build the agent around how your team works, then host and maintain it for you. If not, no hard feelings.",
  },
]

const FAQS = [
  {
    question: "Is the call really free?",
    answer:
      "Yes. It's a free 20-minute video call with no commitment. If an agent isn't the right fit for your workflow, we'll tell you.",
  },
  {
    question: "Do I need to prepare anything?",
    answer:
      "No. Come with the job you want off your plate and a rough idea of the tools you use. We'll take it from there.",
  },
  {
    question: "How quickly can my agent go live?",
    answer:
      "Most custom agents are live within a few days of the brief. We'll give you a clear timeline for yours on the call.",
  },
  {
    question: "Who looks after the agent once it's built?",
    answer:
      "We do. We host and maintain every custom agent, and adjust it when your tools or process change.",
  },
  {
    question: "Can I try an agent before booking a call?",
    answer:
      "Yes. Start free with a ready-made agent for social media or SEO. Connect your accounts and you'll see your first analysis within minutes.",
  },
]

// Cal.com booking page — opens in a new tab. The booked-call conversion itself is
// tracked on /booking-confirmed, which Cal.com redirects to after a successful booking.
const CAL_BOOKING_URL = "https://cal.com/nas-mansurali/talk-to-me-data-demo"

// Upper-funnel signal only (not the optimisation event): who opened the calendar.
function trackBookCallClick() {
  window.fbq?.("trackCustom", "BookCallClick", { source: "book-demo" })
}

function readCookie(name: string): string | undefined {
  return document.cookie
    .split("; ")
    .find((c) => c.startsWith(`${name}=`))
    ?.split("=")[1]
}

/**
 * Carries the Meta click/browser cookies into the Cal.com booking so the server-side
 * Conversions API event (app/api/cal-webhook) can attribute the booking to the ad
 * that produced it. Cal.com stores `metadata[key]` query params on the booking and
 * hands them back in the webhook payload.
 */
function useCalBookingUrl() {
  const [url, setUrl] = useState(CAL_BOOKING_URL)

  useEffect(() => {
    // Cookies are only readable client-side, and _fbp is set by the pixel after
    // hydration — so build the enriched URL in an effect, not during render.
    const params = new URLSearchParams()
    const fbp = readCookie("_fbp")
    if (fbp) params.set("metadata[fbp]", fbp)
    const fbc = readCookie("_fbc")
    if (fbc) params.set("metadata[fbc]", fbc)

    if (params.size > 0) setUrl(`${CAL_BOOKING_URL}?${params.toString()}`)
  }, [])

  return url
}

export default function BookDemoPage() {
  const calBookingUrl = useCalBookingUrl()

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      <main className="flex-1">
        <section className="bg-white pt-36 pb-24 sm:pt-44 sm:pb-32 lg:pt-36">
          <div className="mx-auto grid w-full max-w-6xl items-start gap-12 px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
            {/* Left: the pitch */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-center lg:text-left"
            >
              <p className="eyebrow mb-5">Book a demo</p>
              <h1 className="display text-[clamp(2.75rem,7.5vw,5rem)] lg:text-[clamp(3rem,4.4vw,4rem)]">
                Let&apos;s build your first AI agent
              </h1>
              <p className="lede mx-auto mt-6 max-w-lg text-lg sm:text-xl lg:mx-0">
                Book a free 20-minute call. Tell us the job you want off your plate, and we&apos;ll show you what
                your agent could do and how fast it can go live.
              </p>

              <ul className="mx-auto mt-10 max-w-md space-y-3 text-left lg:mx-0">
                {BENEFITS.map((b, i) => (
                  <motion.li
                    key={b}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + i * 0.08, duration: 0.4 }}
                    className="flex items-start gap-3"
                  >
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-ink text-white">
                      <Check className="h-3 w-3" />
                    </span>
                    <span className="text-[15px] leading-relaxed text-ink">{b}</span>
                  </motion.li>
                ))}
              </ul>

              <p className="mt-10 text-[13px] text-faint">Free call · No commitment · No preparation needed</p>
            </motion.div>

            {/* Right: the booking card */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
              className="overflow-hidden rounded-3xl border border-hairline bg-white"
            >
              <div className="flex items-end justify-between gap-4 border-b border-hairline bg-mist px-8 pt-6">
                <div className="mb-6 rounded-2xl rounded-bl-sm bg-ink px-3.5 py-2.5 text-[13px] font-medium text-white">
                  Which job should I take off your plate?
                </div>
                <Ambassador pose="wave" sizes="120px" priority className="h-28 w-24 shrink-0" />
              </div>

              <div className="p-8">
                <h2 className="text-xl font-semibold tracking-[-0.01em] text-ink">Pick a time that works for you</h2>
                <p className="mt-2 text-sm leading-relaxed text-quiet">
                  Choose a slot in our calendar. You&apos;ll get an invite with a video call link right after booking.
                </p>

                <a
                  href={calBookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={trackBookCallClick}
                  className="group relative mt-8 inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-ink px-5 py-3.5 text-[15px] font-semibold tracking-[0.2px] text-white transition-opacity hover:opacity-85"
                >
                  <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-in-out group-hover:translate-x-full" />
                  <span className="relative flex items-center gap-2">
                    <CalendarDays className="h-4 w-4" />
                    Book a free call
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </a>

                <div className="mt-8 border-t border-hairline pt-6">
                  <p className="mb-3 text-center text-sm text-quiet">Want to see it first?</p>
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <Link
                      href="/watch-demo"
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-hairline px-5 py-3 text-[15px] font-semibold tracking-[0.2px] text-ink transition-colors hover:bg-mist"
                    >
                      <Play className="h-4 w-4" />
                      Watch the demo
                    </Link>
                    <a
                      href={SIGNUP_URL}
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-hairline px-5 py-3 text-[15px] font-semibold tracking-[0.2px] text-ink transition-colors hover:bg-mist"
                    >
                      Start free
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* What happens on the call */}
        <section className="border-y border-hairline bg-mist py-24 sm:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl">
              <div className="mb-14 text-center sm:mb-16">
                <p className="eyebrow mb-5">On the call</p>
                <h2 className="display mx-auto max-w-3xl text-[clamp(2rem,4.5vw,3.25rem)]">
                  Twenty minutes, one clear answer
                </h2>
                <p className="lede mx-auto mt-6 max-w-2xl text-base sm:text-lg">
                  You describe the outcome, not the steps. We tell you whether an agent can do it and what it takes.
                </p>
              </div>

              <ol className="grid gap-4 md:grid-cols-3">
                {CALL_STEPS.map((step, i) => (
                  <motion.li
                    key={step.n}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                    className="rounded-3xl border border-hairline bg-white p-6"
                  >
                    <span className="select-none font-mono text-sm font-medium text-faint">{step.n}</span>
                    <h3 className="mt-3 text-lg font-semibold tracking-[-0.01em] text-ink">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-quiet">{step.body}</p>
                  </motion.li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <FAQSection heading="Before you book" items={FAQS} />
      </main>

      <Footer />
    </div>
  )
}

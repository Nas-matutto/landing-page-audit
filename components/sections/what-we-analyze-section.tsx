"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import type { LucideIcon } from "lucide-react"
import { ArrowRight, ArrowUpRight, BarChart3, Calendar, Headphones, Receipt, Target, Users } from "lucide-react"
import { Ambassador } from "@/components/ui/ambassador"
import { SocialAgentShowcase } from "@/components/sections/social-agent-showcase"
import { SeoAgentShowcase } from "@/components/sections/seo-agent-showcase"

// Two halves: the ready-made agents anyone can sign up for today, then the
// custom agents we've built for other businesses, ending on the open invitation
// to request any agent at all.

const CUSTOM_AGENTS: { title: string; description: string; href: string; Icon: LucideIcon }[] = [
  {
    title: "Lead Finder",
    description: "Researches your ideal customer and delivers verified, ready-to-contact leads to your CRM every day.",
    href: "/agents/lead-finder",
    Icon: Target,
  },
  {
    title: "Lead Qualification",
    description: "Replies to every inbound lead in seconds, qualifies them, and routes the hot ones to your team.",
    href: "/agents/lead-qualification",
    Icon: Users,
  },
  {
    title: "Customer Support",
    description: "Resolves the repetitive tickets instantly across email, chat and WhatsApp, and hands the rest to you.",
    href: "/agents/customer-support",
    Icon: Headphones,
  },
  {
    title: "Invoice Processing",
    description: "Reads every invoice, extracts each line item, and enters it straight into your accounting software.",
    href: "/agents/invoice-processing",
    Icon: Receipt,
  },
  {
    title: "Booking & Scheduling",
    description: "Books, reschedules and sends reminders in a natural conversation, synced to your calendar.",
    href: "/agents/booking-scheduling",
    Icon: Calendar,
  },
  {
    title: "Data Entry & Reporting",
    description: "Pulls data from across your tools, cleans it up, and delivers accurate reports on a schedule.",
    href: "/agents/data-entry-reporting",
    Icon: BarChart3,
  },
]

// Examples of briefs, to show the range. They're prompts, not case studies.
const REQUEST_IDEAS = [
  "Chase overdue invoices",
  "Answer supplier emails",
  "Sync orders to our ERP",
  "Log sales calls in the CRM",
  "Screen job applicants",
  "Send a weekly KPI report to Slack",
]

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
}

export function WhatWeAnalyzeSection() {
  return (
    <section id="use-cases" className="border-y border-hairline bg-mist py-24 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          {/* Heading */}
          <motion.div {...fadeUp} className="mb-16 text-center sm:mb-20">
            <p className="eyebrow mb-5">AI agents</p>
            <h2 className="display mx-auto max-w-3xl text-[clamp(2rem,4.5vw,3.25rem)]">
              Start with a ready-made agent. Or have one built for you.
            </h2>
            <p className="lede mx-auto mt-6 max-w-2xl text-base sm:text-lg">
              Two agents are ready to use today. Beyond those, we build custom agents around any workflow your
              business runs. Here&apos;s what other businesses have asked for.
            </p>
          </motion.div>

          {/* ── 01 · Ready-made ── */}
          <PartHeader
            number="01"
            label="Ready to use"
            title="Pre-built agents you can start using right away"
            aside="Sign up, connect your accounts, and put them to work."
          />
          <div className="space-y-6">
            <motion.div {...fadeUp}>
              <SocialAgentShowcase />
            </motion.div>
            <motion.div {...fadeUp}>
              <SeoAgentShowcase />
            </motion.div>
          </div>

          {/* ── 02 · Custom-built ── */}
          <div className="mt-24 sm:mt-32">
            <PartHeader
              number="02"
              label="Built to order"
              title="Custom agents other businesses asked us to build"
              aside="Each one is tailored to the team using it: their tools, their rules, their way of working."
            />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {CUSTOM_AGENTS.map((agent, i) => (
                <motion.div key={agent.href} {...fadeUp} transition={{ duration: 0.5, delay: (i % 3) * 0.06 }}>
                  <Link
                    href={agent.href}
                    className="group flex h-full flex-col rounded-3xl border border-hairline bg-white p-6 transition-colors hover:border-ink"
                  >
                    <div className="mb-8 flex items-start justify-between">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full border border-hairline text-ink transition-colors group-hover:border-ink group-hover:bg-ink group-hover:text-white">
                        <agent.Icon className="h-[18px] w-[18px]" />
                      </span>
                      <ArrowUpRight className="h-5 w-5 text-faint transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink" />
                    </div>
                    <h4 className="mb-2 text-lg font-semibold tracking-[-0.01em] text-ink">{agent.title}</h4>
                    <p className="text-sm leading-relaxed text-quiet">{agent.description}</p>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Request any agent */}
            <motion.div
              {...fadeUp}
              className="relative mt-6 overflow-hidden rounded-3xl bg-ink p-6 text-white sm:p-10 lg:p-12"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:32px_32px]"
              />

              <div className="relative grid items-center gap-10 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-16">
                <div>
                  <p className="eyebrow mb-5 text-white/50">Your workflow, automated</p>
                  <h3 className="text-balance text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold leading-none tracking-[-0.022em] text-white">
                    Don&apos;t see what you need? Request any agent.
                  </h3>
                  <p className="mt-5 max-w-lg text-base font-light leading-relaxed text-white/70">
                    Every business runs differently, so most of what we build is made to order. Describe the work you
                    want off your plate, using the tools you already have, and we&apos;ll build an agent tailored to exactly
                    how your team works. Then we host and maintain it for you.
                  </p>

                  <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                    <Link
                      href="/get-started"
                      className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-white px-5 py-3 text-[15px] font-semibold tracking-[0.2px] text-ink transition-opacity hover:opacity-90"
                    >
                      <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-ink/10 to-transparent transition-transform duration-700 ease-in-out group-hover:translate-x-full" />
                      <span className="relative flex items-center gap-2">
                        Request a custom agent <ArrowRight className="h-4 w-4" />
                      </span>
                    </Link>
                    <Link
                      href="/agents"
                      className="inline-flex items-center gap-2 text-[15px] font-semibold text-white/70 transition-colors hover:text-white"
                    >
                      Explore all agents
                    </Link>
                  </div>
                  <p className="mt-4 text-sm text-white/40">No code on your side · Live in 24 hours</p>
                </div>

                {/* The ambassador, taking requests */}
                <div className="rounded-[22px] border border-white/15 bg-white/5 p-4 sm:p-5">
                  <div className="flex items-end gap-3">
                    <Ambassador pose="wave" sizes="140px" className="h-29.5 w-26 shrink-0" />
                    <div className="relative mb-3 rounded-2xl rounded-bl-sm bg-white px-3.5 py-2.5 text-[13px] font-medium leading-snug text-ink">
                      What should I take off your plate?
                      <span aria-hidden className="absolute -left-1.5 bottom-3 h-3 w-3 rotate-45 bg-white" />
                    </div>
                  </div>
                  <p className="eyebrow mb-3 mt-4 text-white/50">For example</p>
                  <ul className="flex flex-wrap gap-2">
                    {REQUEST_IDEAS.map((idea) => (
                      <li
                        key={idea}
                        className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-white/85 ring-1 ring-white/15"
                      >
                        {idea}
                      </li>
                    ))}
                    <li className="rounded-full px-3 py-1.5 text-xs font-medium text-white/50 border border-dashed border-white/25">
                      …or anything else
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

function PartHeader({ number, label, title, aside }: { number: string; label: string; title: string; aside: string }) {
  return (
    <motion.div
      {...fadeUp}
      className="mb-8 flex flex-col gap-4 border-b border-hairline pb-6 md:flex-row md:items-end md:justify-between md:gap-12"
    >
      <div>
        <p className="eyebrow mb-3">
          <span className="text-ink">{number}</span> · {label}
        </p>
        <h3 className="max-w-xl text-2xl font-semibold tracking-[-0.02em] text-ink sm:text-3xl">{title}</h3>
      </div>
      <p className="max-w-xs text-sm leading-relaxed text-quiet md:text-right">{aside}</p>
    </motion.div>
  )
}

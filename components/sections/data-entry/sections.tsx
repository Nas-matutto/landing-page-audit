"use client"

import { motion } from "framer-motion"
import { Check, Sparkles, Wrench, X } from "lucide-react"
import { SiAirtable, SiGoogleanalytics, SiGooglesheets, SiHubspot, SiShopify, SiStripe } from "react-icons/si"
import { FaSlack } from "react-icons/fa"
import { Ambassador } from "@/components/ui/ambassador"
import { GhostCta, PrimaryCta, Reveal } from "@/components/sections/social-agent/parts"
import { SIGNUP_URL } from "@/lib/links"
import { CleanPanel, DeliverPanel, ReportPanel, SourcesPanel } from "./mocks"

// The /agents/data-entry-reporting page, in the style of the lead finder page:
// what it does, how it works, what it handles, questions.

// ── Hero ────────────────────────────────────────────────────────────────────

const VERBS = ["Pulls the data", "Cleans it", "Sends the report"]

const DONE = [
  { text: "Pulled data from 6 tools", note: "Shopify, HubSpot, GA4 and more", delay: 0.9 },
  { text: "Cleaned 12,480 rows", note: "318 duplicates removed", delay: 1.8 },
  { text: "Sent the weekly report", note: "to Slack and email", delay: 2.7 },
]

export function DataEntryHero() {
  return (
    <section className="relative w-full overflow-hidden bg-white pb-20 pt-36 sm:pt-44 lg:pb-28 lg:pt-36">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-14 px-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-10 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center lg:text-left"
        >
          <p className="eyebrow mb-5">AI Data Entry & Reporting Agent</p>
          <h1 className="display text-[clamp(2.75rem,7.5vw,5rem)] lg:text-[clamp(3rem,4.4vw,4rem)]">An AI agent that writes your reports for you</h1>
          <p className="lede mx-auto mt-6 max-w-lg text-lg sm:text-xl lg:mx-0">
            It pulls the numbers from your tools, cleans them up, and sends a ready-to-share report on your schedule. No more copying between spreadsheets.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start">
            <PrimaryCta href={SIGNUP_URL}>Get Started</PrimaryCta>
            <GhostCta href="#how-it-works">See how it works</GhostCta>
          </div>

          <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 lg:justify-start">
            {VERBS.map((verb) => (
              <li key={verb} className="flex items-center gap-2 text-sm font-medium text-ink">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-ink text-white">
                  <Check className="h-3 w-3" />
                </span>
                {verb}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
          className="relative mx-auto w-full max-w-xl pb-10 lg:max-w-none lg:pb-0"
        >
          <ReportPanel rows={3} stage />

          <Ambassador
            pose="wave"
            sizes="180px"
            className="pointer-events-none absolute -bottom-4 -left-1 h-[220px] w-[110px] drop-shadow-xl sm:-bottom-2 sm:left-2 sm:h-[240px] sm:w-[120px] lg:-bottom-12"
            priority
          />

          <ul className="absolute -bottom-2 right-0 flex flex-col items-end gap-2 sm:-right-4 sm:bottom-6 lg:-right-6">
            {DONE.map((d) => (
              <motion.li
                key={d.text}
                initial={{ opacity: 0, x: 16, scale: 0.96 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 0.4, delay: d.delay, ease: "easeOut" }}
                className="flex items-center gap-2.5 rounded-full border border-hairline bg-white py-1.5 pl-1.5 pr-4 shadow-lg shadow-black/5"
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ink text-white">
                  <Check className="h-3.5 w-3.5" />
                </span>
                <span className="text-xs font-semibold text-ink sm:text-[13px]">
                  {d.text} <span className="hidden font-normal text-quiet sm:inline">· {d.note}</span>
                </span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  )
}

// ── Where data comes from ───────────────────────────────────────────────────

const TOOLS = [
  { Icon: SiShopify, label: "Shopify" },
  { Icon: SiStripe, label: "Stripe" },
  { Icon: SiHubspot, label: "HubSpot" },
  { Icon: SiGoogleanalytics, label: "GA4" },
  { Icon: SiGooglesheets, label: "Google Sheets" },
  { Icon: SiAirtable, label: "Airtable" },
  { Icon: FaSlack, label: "Slack" },
]

export function DataEntryToolStrip() {
  return (
    <section className="border-y border-hairline bg-white px-6 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 xl:flex-row">
        <p className="eyebrow">Pulls data from</p>
        <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
          {TOOLS.map(({ Icon, label }) => (
            <li key={label} className="flex items-center gap-2 text-sm font-medium text-ink">
              <Icon className="h-4 w-4" aria-hidden />
              {label}
            </li>
          ))}
        </ul>
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-quiet">+ most business tools</p>
      </div>
    </section>
  )
}

// ── Does, not supports ──────────────────────────────────────────────────────

const SUPPORTS = [
  "Shows you charts, but someone still has to pull the numbers together",
  "Needs exporting, copying and pasting every week",
  "Leaves you to spot duplicates and typos by hand",
  "Waits for you to log in instead of sending you the report",
]

const DOES = [
  "Pulls the numbers from every tool on a schedule",
  "Cleans the data and flags anything that looks wrong",
  "Writes the report in the format your team already uses",
  "Sends it to your inbox, Slack or Google Drive",
]

export function DataEntryDifference() {
  return (
    <section className="bg-mist px-6 py-20 sm:py-28 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-12 text-center">
          <p className="eyebrow mb-5">The difference</p>
          <h2 className="display mx-auto max-w-3xl text-[clamp(2rem,4.5vw,3.25rem)]">Dashboards show you data. This agent does the work.</h2>
        </Reveal>

        <div className="grid grid-cols-1 items-stretch gap-5 lg:grid-cols-2 lg:gap-6">
          <Reveal className="flex flex-col rounded-3xl border border-hairline bg-white p-7 sm:p-8">
            <div className="mb-2 flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-full border border-hairline text-quiet">
                <Wrench className="h-4 w-4" />
              </div>
              <span className="eyebrow">Spreadsheets and dashboards</span>
            </div>
            <h3 className="mb-6 text-xl font-semibold tracking-[-0.01em] text-ink">Supports you</h3>
            <ul className="mt-auto space-y-3.5">
              {SUPPORTS.map((point) => (
                <li key={point} className="flex items-start gap-2.5">
                  <X className="mt-0.5 h-4 w-4 shrink-0 text-faint" />
                  <span className="text-sm leading-relaxed text-quiet">{point}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.1} className="relative flex flex-col overflow-hidden rounded-3xl bg-ink p-7 sm:p-8">
            <div className="mb-2 flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-white">
                <Sparkles className="h-4 w-4" />
              </div>
              <span className="eyebrow text-white/50">Your AI agent</span>
            </div>
            <h3 className="mb-6 text-xl font-semibold tracking-[-0.01em] text-white">Does it for you</h3>
            <ul className="mt-auto space-y-3.5 pr-24 sm:pr-32">
              {DOES.map((point) => (
                <li key={point} className="flex items-start gap-2.5">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-white" />
                  <span className="text-sm leading-relaxed text-white/80">{point}</span>
                </li>
              ))}
            </ul>
            <Ambassador pose="thumbs-up" sizes="180px" className="pointer-events-none absolute -right-2 bottom-0 h-[150px] w-[130px] sm:h-[190px] sm:w-[165px]" />
          </Reveal>
        </div>
      </div>
    </section>
  )
}

// ── How it works ────────────────────────────────────────────────────────────

const STEPS = [
  {
    n: "01",
    title: "Connect your tools",
    body: "Your store, CRM, analytics, ad accounts and spreadsheets. We set up the connections, and the agent pulls fresh data on a schedule.",
    visual: <SourcesPanel />,
  },
  {
    n: "02",
    title: "It cleans and checks the data",
    body: "Duplicates removed, dates and currencies matched, and anything that looks wrong flagged for you to review.",
    visual: <CleanPanel />,
  },
  {
    n: "03",
    title: "The report lands where you work",
    body: "A formatted report in your inbox, Slack channel or Google Drive, every day, week or month. Built the way your team already reads it.",
    visual: <DeliverPanel />,
  },
]

export function DataEntryHowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-24 border-y border-hairline bg-mist px-6 py-20 sm:py-28 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-12 text-center">
          <p className="eyebrow mb-5">How it works</p>
          <h2 className="display mx-auto max-w-2xl text-[clamp(2rem,4.5vw,3.25rem)]">From scattered data to a finished report, in three steps</h2>
        </Reveal>
        <div className="grid gap-5 lg:grid-cols-3">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.08} className="flex min-w-0 flex-col rounded-3xl border border-hairline bg-white p-6 sm:p-7">
              <span className="font-mono text-lg font-medium text-faint">{s.n}</span>
              <h3 className="mt-5 text-xl font-semibold tracking-[-0.01em] text-ink">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-quiet">{s.body}</p>
              <div className="mt-6 min-w-0">{s.visual}</div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── What it handles ─────────────────────────────────────────────────────────

const JOBS = [
  { title: "Weekly and monthly reports", body: "KPI summaries, sales numbers and marketing results, compiled and sent without anyone touching a spreadsheet." },
  { title: "Client reports", body: "One report per client, in your agency's format, ready to forward the moment it arrives." },
  { title: "Data entry between tools", body: "Moves data from forms to your CRM, or from orders to a spreadsheet, without manual copying." },
  { title: "One view across tools", body: "Combines your store, CRM, ads and analytics into a single set of numbers you can trust." },
  { title: "Cleanup and checks", body: "Removes duplicates, matches formats and flags missing or odd values before they reach a report." },
  { title: "On your schedule", body: "Daily, weekly or monthly. Reports go to your inbox, Slack or Google Drive at the time you choose." },
]

export function DataEntryJobs() {
  return (
    <section className="bg-white px-6 py-20 sm:py-28 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-12 max-w-3xl">
          <p className="eyebrow mb-5">What it handles</p>
          <h2 className="display text-[clamp(2rem,4.5vw,3.25rem)]">The data work nobody wants to do</h2>
          <p className="lede mt-5 max-w-2xl text-base sm:text-lg">
            Built for agency owners compiling client reports, operations teams tracking KPIs across platforms, and founders who want a weekly dashboard without hiring an analyst.
          </p>
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {JOBS.map((j, i) => (
            <Reveal key={j.title} delay={(i % 3) * 0.05} className="rounded-3xl border border-hairline bg-white p-7 transition-colors hover:border-ink">
              <span className="font-mono text-sm font-medium text-faint">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-4 text-lg font-semibold tracking-[-0.01em] text-ink">{j.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-quiet">{j.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Final CTA ───────────────────────────────────────────────────────────────

export function DataEntryFinalCta() {
  return (
    <section className="bg-white px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <Reveal className="relative mx-auto max-w-6xl overflow-hidden rounded-[32px] bg-ink px-7 py-14 text-white sm:px-12 sm:py-16 lg:py-20">
        <div className="relative z-10 max-w-xl">
          <h2 className="display text-[clamp(2.25rem,5vw,3.75rem)] text-white!">Stop building reports by hand</h2>
          <p className="mt-6 max-w-md text-lg font-light leading-snug text-white/65">
            Tell us where your data lives and how your reports look. We&apos;ll set up your agent with you, and reports start arriving on schedule.
          </p>
          <div className="mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
            <a
              href={SIGNUP_URL}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-[15px] font-semibold tracking-[0.2px] text-ink transition-opacity hover:opacity-90"
            >
              Get Started
            </a>
            <a
              href="/book-demo"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-5 py-3 text-[15px] font-semibold tracking-[0.2px] text-white transition-colors hover:bg-white/10"
            >
              Book Demo
            </a>
          </div>
          <p className="mt-6 text-xs text-white/40">Previews on this page use sample data.</p>
        </div>
        <Ambassador pose="thumbs-up" sizes="360px" className="pointer-events-none absolute -bottom-2 -right-6 hidden h-[300px] w-[270px] sm:block lg:right-8 lg:h-[380px] lg:w-[340px]" />
      </Reveal>
    </section>
  )
}

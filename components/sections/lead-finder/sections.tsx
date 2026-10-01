"use client"

import { motion } from "framer-motion"
import { Check, Quote, Sparkles, Wrench, X } from "lucide-react"
import { SiAirtable, SiGmail, SiHubspot, SiNotion, SiSalesforce } from "react-icons/si"
import { FaLinkedin, FaSlack } from "react-icons/fa"
import { Ambassador } from "@/components/ui/ambassador"
import { GhostCta, PrimaryCta, Reveal } from "@/components/sections/social-agent/parts"
import { SIGNUP_URL } from "@/lib/links"
import { CrmPanel, IcpPanel, LeadsPanel, MatchesPanel } from "./mocks"

// The /agents/lead-finder page, in the style of the social and SEO agent
// pages, kept short: what it does, how it works, proof, questions.

// ── Hero ────────────────────────────────────────────────────────────────────

const VERBS = ["Finds", "Enriches", "Delivers"]

const DONE = [
  { text: "Found 48 companies that fit", note: "from your ideal customer", delay: 0.9 },
  { text: "Enriched 112 contacts", note: "verified emails and roles", delay: 1.8 },
  { text: "Synced to HubSpot", note: "duplicates skipped", delay: 2.7 },
]

export function LeadFinderHero() {
  return (
    <section className="relative w-full overflow-hidden bg-white pb-20 pt-36 sm:pt-44 lg:pb-28 lg:pt-36">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-14 px-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-10 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center lg:text-left"
        >
          <p className="eyebrow mb-5">AI Lead Finder Agent</p>
          <h1 className="display text-[clamp(2.75rem,7.5vw,5rem)] lg:text-[clamp(3rem,4.4vw,4rem)]">An AI agent that fills your pipeline every day</h1>
          <p className="lede mx-auto mt-6 max-w-lg text-lg sm:text-xl lg:mx-0">
            Tell it who you sell to. It finds the companies and people that fit, verifies their details, and puts them in your CRM.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start">
            <PrimaryCta href={SIGNUP_URL}>Get Started</PrimaryCta>
            <GhostCta href="#demo">Watch the demo</GhostCta>
          </div>

          <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 lg:justify-start">
            {VERBS.map((verb) => (
              <li key={verb} className="flex items-center gap-2 text-sm font-medium text-ink">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-ink text-white">
                  <Check className="h-3 w-3" />
                </span>
                It {verb.toLowerCase()}
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
          <LeadsPanel rows={3} stage />

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

// ── Where leads land ────────────────────────────────────────────────────────

const TOOLS = [
  { Icon: SiHubspot, label: "HubSpot" },
  { Icon: SiSalesforce, label: "Salesforce" },
  { Icon: SiGmail, label: "Gmail" },
  { Icon: FaLinkedin, label: "LinkedIn" },
  { Icon: FaSlack, label: "Slack" },
  { Icon: SiAirtable, label: "Airtable" },
  { Icon: SiNotion, label: "Notion" },
]

export function ToolStrip() {
  return (
    <section className="border-y border-hairline bg-white px-6 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 xl:flex-row">
        <p className="eyebrow">Delivers leads into</p>
        <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
          {TOOLS.map(({ Icon, label }) => (
            <li key={label} className="flex items-center gap-2 text-sm font-medium text-ink">
              <Icon className="h-4 w-4" aria-hidden />
              {label}
            </li>
          ))}
        </ul>
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-quiet">+ any CRM or outbound tool</p>
      </div>
    </section>
  )
}

// ── Does, not supports ──────────────────────────────────────────────────────

const SUPPORTS = [
  "Sells you a static list that everyone else bought too",
  "Leaves you to check every email and job title",
  "Ignores who's already in your CRM",
  "Needs someone to export and import it every week",
]

const DOES = [
  "Finds new companies that fit your ideal customer, every day",
  "Verifies each contact and adds why they're a fit",
  "Skips anyone already in your pipeline",
  "Puts them straight into your CRM, ready for outreach",
]

export function LeadFinderDifference() {
  return (
    <section className="bg-mist px-6 py-20 sm:py-28 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-12 text-center">
          <p className="eyebrow mb-5">The difference</p>
          <h2 className="display mx-auto max-w-3xl text-[clamp(2rem,4.5vw,3.25rem)]">Lead lists hand you homework. This agent does it.</h2>
        </Reveal>

        <div className="grid grid-cols-1 items-stretch gap-5 lg:grid-cols-2 lg:gap-6">
          <Reveal className="flex flex-col rounded-3xl border border-hairline bg-white p-7 sm:p-8">
            <div className="mb-2 flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-full border border-hairline text-quiet">
                <Wrench className="h-4 w-4" />
              </div>
              <span className="eyebrow">Lead lists and data tools</span>
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

// ── Demo ────────────────────────────────────────────────────────────────────

export function LeadFinderDemo() {
  return (
    <section id="demo" className="scroll-mt-24 bg-white px-6 py-20 sm:py-28 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <Reveal className="mb-10 text-center">
          <p className="eyebrow mb-5">See it work</p>
          <h2 className="display mx-auto max-w-2xl text-[clamp(2rem,4.5vw,3.25rem)]">Watch it find and deliver leads</h2>
        </Reveal>
        <Reveal className="rounded-[26px] border border-hairline bg-mist p-2">
          <div className="relative aspect-video overflow-hidden rounded-[18px] border border-hairline bg-ink">
            <iframe
              src="https://www.youtube.com/embed/VuuO47J3ql8?rel=0"
              title="AI Lead Finder Agent — Demo"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
            />
          </div>
        </Reveal>
      </div>
    </section>
  )
}

// ── How it works ────────────────────────────────────────────────────────────

const STEPS = [
  {
    n: "01",
    title: "Tell it who you sell to",
    body: "Industry, company size, the roles you want to reach and the signals that mean they're ready to buy. Change it whenever you learn more.",
    visual: <IcpPanel />,
  },
  {
    n: "02",
    title: "It finds and checks every lead",
    body: "Every day it searches the web and data sources for companies that fit, finds the right person, and verifies their details.",
    visual: <MatchesPanel />,
  },
  {
    n: "03",
    title: "Leads land in your CRM",
    body: "New leads go into HubSpot, Salesforce or your outbound tool with the reason they fit, and anyone you already have is skipped.",
    visual: <CrmPanel />,
  },
]

export function LeadFinderHowItWorks() {
  return (
    <section className="border-y border-hairline bg-mist px-6 py-20 sm:py-28 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-12 text-center">
          <p className="eyebrow mb-5">How it works</p>
          <h2 className="display mx-auto max-w-2xl text-[clamp(2rem,4.5vw,3.25rem)]">From ideal customer to CRM, in three steps</h2>
        </Reveal>
        <div className="grid gap-5 lg:grid-cols-3">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.08} className="flex flex-col rounded-3xl border border-hairline bg-white p-6 sm:p-7">
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

// ── Customers ───────────────────────────────────────────────────────────────

// Real customer quotes (attribution provided by the client).
const QUOTES = [
  { quote: "Every day I log in, I have 100 new leads waiting in my inbox. Keep them coming!", author: "Alba S.", role: "Head of Growth" },
  { quote: "This is probably the easiest way I've ever gotten leads in my life.", author: "Daniel A.", role: "Founder" },
  {
    quote: "I love the “Signal Agent” that just pulls insights from my leads. Makes it a lot easier to personalize my outbound campaigns.",
    author: "Matteo C.",
    role: "Account Exec.",
  },
]

export function LeadFinderQuotes() {
  return (
    <section className="bg-white px-6 py-20 sm:py-28 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-12 text-center">
          <p className="eyebrow mb-5">From our customers</p>
          <h2 className="display mx-auto max-w-2xl text-[clamp(2rem,4.5vw,3.25rem)]">Leads waiting every morning</h2>
        </Reveal>
        <div className="grid gap-5 md:grid-cols-3">
          {QUOTES.map((q, i) => (
            <Reveal key={q.author} delay={i * 0.08} className="flex flex-col rounded-3xl border border-hairline bg-white p-7">
              <Quote className="h-5 w-5 text-ink" />
              <p className="mt-4 flex-1 text-[15px] leading-relaxed text-ink">{q.quote}</p>
              <p className="mt-6 text-sm font-semibold text-ink">{q.author}</p>
              <p className="text-sm text-quiet">{q.role}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Final CTA ───────────────────────────────────────────────────────────────

export function LeadFinderFinalCta() {
  return (
    <section className="bg-white px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <Reveal className="relative mx-auto max-w-6xl overflow-hidden rounded-[32px] bg-ink px-7 py-14 text-white sm:px-12 sm:py-16 lg:py-20">
        <div className="relative z-10 max-w-xl">
          <h2 className="display text-[clamp(2.25rem,5vw,3.75rem)] text-white!">Let an agent fill your pipeline</h2>
          <p className="mt-6 max-w-md text-lg font-light leading-snug text-white/65">
            Tell us who you sell to. We&apos;ll set up your lead finder with you, and new leads start arriving in your CRM.
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
          <p className="mt-6 text-xs text-white/40">Previews on this page use sample leads.</p>
        </div>
        <Ambassador pose="thumbs-up" sizes="360px" className="pointer-events-none absolute -bottom-2 -right-6 hidden h-[300px] w-[270px] sm:block lg:right-8 lg:h-[380px] lg:w-[340px]" />
      </Reveal>
    </section>
  )
}

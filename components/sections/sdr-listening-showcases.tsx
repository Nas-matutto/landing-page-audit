"use client"

import { useState } from "react"
import { AnimatePresence, MotionConfig, motion } from "framer-motion"
import { ArrowRight, Check, Mail, MessageCircle, Sparkles } from "lucide-react"
import { FaLinkedin, FaMicrosoft } from "react-icons/fa"
import type { IconType } from "react-icons"
import { SiFacebook, SiGmail, SiInstagram, SiReddit, SiX } from "react-icons/si"
import { Bricolage_Grotesque } from "next/font/google"
import { SIGNUP_URL } from "@/lib/links"
import { cn } from "@/lib/utils"

// ── SDR AI Agent and Social Listening showcases ─────────────────────────────
// The fourth and fifth ready-made agents, in the same dark panel as the Social,
// SEO and Website showcases, lit in the reds of the SDR's card in the app and
// the teal and blue of Social Listening's. Each demo runs on sample data: pick
// a sample business and see what the agent hands back.

const display = Bricolage_Grotesque({ subsets: ["latin"], display: "swap" })

interface Chip {
  Icon: IconType
  label: string
  color: string
}

// ── Shared shell ────────────────────────────────────────────────────────────

function Shell({
  glow,
  title,
  blurb,
  chips,
  features,
  picker,
  children,
}: {
  glow: React.ReactNode
  title: string
  blurb: string
  chips: Chip[]
  features: string[]
  picker: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <MotionConfig reducedMotion="user">
      <div className="group relative h-full overflow-hidden rounded-3xl bg-zinc-950 text-white shadow-xl">
        {glow}

        <div className="relative grid h-full content-center gap-10 p-6 sm:p-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12 lg:p-12">
          {/* Copy */}
          <div className="flex min-w-0 flex-col justify-center">
            <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white/90 ring-1 ring-white/15 backdrop-blur">
              <Sparkles className="h-3 w-3" />
              Ready-made agent
            </span>

            <h3 className={cn(display.className, "mt-4 text-4xl font-bold tracking-tight sm:text-5xl")}>{title}</h3>
            <p className="mt-4 max-w-md text-base leading-relaxed text-white/70">{blurb}</p>

            <div className="mt-5 flex flex-wrap gap-2">
              {chips.map(({ Icon, label, color }) => (
                <span key={label} className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-zinc-900 shadow-sm">
                  <Icon className="h-3.5 w-3.5" style={{ color }} />
                  {label}
                </span>
              ))}
            </div>

            <div className="mt-6">{picker}</div>

            <ul className="mt-7 space-y-2.5">
              {features.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm text-white/85">
                  <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/20">
                    <Check className="h-2.5 w-2.5" />
                  </span>
                  {f}
                </li>
              ))}
            </ul>

            <a
              href={SIGNUP_URL}
              className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-white px-5 py-3 text-[15px] font-semibold text-zinc-950 shadow-lg transition-colors hover:bg-zinc-100"
            >
              Start free
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>

          {/* Demo */}
          <div className="min-w-0 self-center">{children}</div>
        </div>
      </div>
    </MotionConfig>
  )
}

function Picker<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string
  options: { id: T; label: string }[]
  value: T
  onChange: (id: T) => void
}) {
  return (
    <>
      <p className="mb-2.5 text-[11px] font-semibold uppercase tracking-wider text-white/50">{label}</p>
      <div role="group" aria-label={label} className="flex flex-wrap gap-2">
        {options.map((o) => {
          const active = o.id === value
          return (
            <button
              key={o.id}
              type="button"
              aria-pressed={active}
              onClick={() => onChange(o.id)}
              className={cn(
                "cursor-pointer rounded-full px-3.5 py-2 text-xs font-semibold transition-all",
                active ? "bg-white text-zinc-900 shadow-lg ring-2 ring-white/40" : "bg-white/10 text-white/80 ring-1 ring-white/15 hover:bg-white/15",
              )}
            >
              {o.label}
            </button>
          )
        })}
      </div>
    </>
  )
}

/** The white app window both demos sit in. */
function Window({ title, right, children }: { title: string; right?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-2xl bg-white text-zinc-900 shadow-2xl">
      <div className="flex items-center gap-1.5 border-b border-zinc-100 bg-zinc-50 px-3 py-2.5">
        {["#FF5F57", "#FEBC2E", "#28C840"].map((c) => (
          <span key={c} className="h-2 w-2 rounded-full" style={{ background: c }} />
        ))}
        <span className="ml-2 text-[11px] font-semibold text-zinc-500">{title}</span>
        {right && <span className="ml-auto">{right}</span>}
      </div>
      <div className="min-h-[400px] p-4 sm:p-5">{children}</div>
    </div>
  )
}

// ── SDR AI Agent ────────────────────────────────────────────────────────────

type IcpId = "agencies" | "saas" | "clinics"

interface Lead {
  name: string
  role: string
  company: string
  fit: string
  subject: string
  email: string
}

const ICPS: Record<IcpId, { label: string; brief: string; leads: Lead[] }> = {
  agencies: {
    label: "Marketing agencies",
    brief: "Marketing agencies with 10 to 50 people that need more qualified inbound leads.",
    leads: [
      {
        name: "Maya Collins",
        role: "Founder",
        company: "Northwind Creative",
        fit: "Hiring 2 account managers, posting about growth",
        subject: "Northwind's new account manager roles",
        email: "Hi Maya, saw Northwind is hiring two account managers, so I'm guessing new client demand is up. We help agencies like yours turn that demand into booked calls without adding headcount. Worth a 15 minute look this week?",
      },
      {
        name: "Daniel Okafor",
        role: "Head of Growth",
        company: "Brightside Media",
        fit: "Just launched a new service line",
        subject: "Selling Brightside's new service line",
        email: "Hi Daniel, congrats on the new service line. The first 90 days decide whether it sells. We find and write to the right buyers for you every day, so the pipeline is there from week one. Open to a quick chat?",
      },
      {
        name: "Priya Nair",
        role: "Managing Director",
        company: "Loop & Lantern",
        fit: "Team grew 40% this year",
        subject: "Keeping Loop & Lantern's pipeline full",
        email: "Hi Priya, growing a team 40% means the pipeline has to keep up. We fill it with verified leads and tailored outreach, running in the background. Can I show you how it works on your market?",
      },
    ],
  },
  saas: {
    label: "B2B SaaS",
    brief: "B2B SaaS companies with 20 to 200 people selling to operations teams.",
    leads: [
      {
        name: "Tom Hardwick",
        role: "VP Sales",
        company: "Stackline",
        fit: "Opened a new sales office in Austin",
        subject: "Stackline's Austin team",
        email: "Hi Tom, a new office means new reps who need a full pipeline on day one. We find and warm up the right accounts for them every morning. Worth a short call to see it on Stackline's market?",
      },
      {
        name: "Elena Vasquez",
        role: "Head of Revenue",
        company: "Fieldwise",
        fit: "Raised a Series A last month",
        subject: "Putting Fieldwise's Series A to work",
        email: "Hi Elena, congrats on the round. Now comes the pressure to grow pipeline fast. We research your ideal buyers and write to each one, so your team only speaks to people who reply. Open to 15 minutes?",
      },
      {
        name: "Sam Whitfield",
        role: "CEO",
        company: "Routegrid",
        fit: "Posted about outbound being hard",
        subject: "Your post on outbound",
        email: "Hi Sam, your post on how hard outbound is rang true. We take the research and first emails off your plate and leave you only the replies. Shall I send over a sample list for Routegrid?",
      },
    ],
  },
  clinics: {
    label: "Dental clinics",
    brief: "Independent dental clinics in the US looking to grow private patient numbers.",
    leads: [
      {
        name: "Dr. Rachel Kim",
        role: "Owner",
        company: "Maple Street Dental",
        fit: "Opened a second location",
        subject: "Filling Maple Street's new chairs",
        email: "Hi Dr. Kim, congrats on the second location. New chairs need new patients fast. We find local people looking for a dentist and reach out for you, so the diary fills. Want a quick look at how?",
      },
      {
        name: "Dr. James Ortiz",
        role: "Practice Owner",
        company: "Harbor Smiles",
        fit: "Recently added cosmetic services",
        subject: "Getting Harbor Smiles' cosmetic work booked",
        email: "Hi Dr. Ortiz, adding cosmetic services is a smart move, now they need to be found. We reach the right local patients with tailored messages every day. Can I show you a sample?",
      },
      {
        name: "Dr. Aisha Rahman",
        role: "Founder",
        company: "Bright Path Dentistry",
        fit: "Reviews mention a long wait for slots",
        subject: "Bright Path's busy diary",
        email: "Hi Dr. Rahman, a waiting list is a good problem. We help busy clinics fill the quieter slots with new private patients, with no extra admin for your team. Worth a conversation?",
      },
    ],
  },
}

const ICP_ORDER: IcpId[] = ["agencies", "saas", "clinics"]

export function SdrAgentShowcase() {
  const [icp, setIcp] = useState<IcpId>("agencies")
  const [picked, setPicked] = useState(0)
  const data = ICPS[icp]
  const lead = data.leads[picked]

  return (
    <Shell
      glow={<SdrGlow />}
      title="SDR AI Agent"
      blurb="Fills your pipeline for you. Describe your ideal customer, and your agent finds them, checks they fit, writes to each one and lines up every follow-up."
      chips={[
        { Icon: SiGmail, label: "Gmail", color: "#EA4335" },
        { Icon: FaMicrosoft, label: "Outlook", color: "#0078D4" },
        { Icon: FaLinkedin, label: "LinkedIn", color: "#0A66C2" },
        { Icon: SiX, label: "X", color: "#000000" },
        { Icon: SiInstagram, label: "Instagram", color: "#E4405F" },
      ]}
      features={[
        "Finds B2B leads that match your ideal customer",
        "Writes a tailored email sequence for every lead",
        "Sends from your own mailbox on paid plans",
      ]}
      picker={
        <Picker
          label="Try a sample customer"
          options={ICP_ORDER.map((id) => ({ id, label: ICPS[id].label }))}
          value={icp}
          onChange={(id) => {
            setIcp(id)
            setPicked(0)
          }}
        />
      }
    >
      <Window title="SDR AI Agent" right={<span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">3 leads today</span>}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={icp} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }}>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">Your ideal customer</p>
            <p className="mt-1 rounded-xl bg-zinc-50 px-3 py-2.5 text-sm leading-snug text-zinc-700">{data.brief}</p>

            <p className="mb-2 mt-4 text-[11px] font-semibold uppercase tracking-wider text-zinc-400">Found, checked and ready to contact</p>
            <ul className="space-y-1.5">
              {data.leads.map((l, i) => (
                <li key={l.name}>
                  <button
                    type="button"
                    aria-pressed={picked === i}
                    onClick={() => setPicked(i)}
                    className={cn(
                      "flex w-full cursor-pointer items-center gap-3 rounded-xl border px-3 py-2.5 text-left transition-colors",
                      picked === i ? "border-zinc-900 bg-zinc-50" : "border-zinc-200 hover:bg-zinc-50",
                    )}
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zinc-900 text-[11px] font-bold text-white">
                      {l.name.replace("Dr. ", "").split(" ").map((p) => p[0]).join("")}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-semibold">{l.name}</span>
                      <span className="block truncate text-xs text-zinc-500">
                        {l.role}, {l.company}
                      </span>
                    </span>
                    <span className="hidden shrink-0 rounded-full bg-zinc-100 px-2 py-0.5 text-[10px] font-medium text-zinc-600 sm:block">{l.fit}</span>
                  </button>
                </li>
              ))}
            </ul>

            <div className="mt-4 rounded-xl border border-zinc-200 p-3.5">
              <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
                <Mail className="h-3.5 w-3.5" />
                Email drafted for {lead.name}
              </div>
              <p className="mt-2 text-sm font-semibold">{lead.subject}</p>
              <p className="mt-1 text-[13px] leading-relaxed text-zinc-600">{lead.email}</p>
              <p className="mt-3 text-[11px] text-zinc-400">Follow-ups lined up for day 3 and day 7</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </Window>
    </Shell>
  )
}

function SdrGlow() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <div className="absolute -left-20 -top-28 h-80 w-80 rounded-full bg-[#EF4444]/40 blur-3xl" />
      <div className="absolute -bottom-32 left-1/4 h-96 w-96 rounded-full bg-[#F43F5E]/35 blur-3xl transition-opacity duration-500 group-hover:opacity-80" />
      <div className="absolute left-1/2 top-1/3 h-72 w-72 rounded-full bg-[#FB923C]/25 blur-3xl" />
      <div className="absolute -top-24 right-0 h-72 w-72 rounded-full bg-white/15 blur-3xl" />
      <div className="absolute -bottom-24 -right-16 h-80 w-80 rounded-full bg-[#DC2626]/40 blur-3xl" />
      <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:32px_32px]" />
    </div>
  )
}

// ── Social Listening ────────────────────────────────────────────────────────

type BizId = "bookkeeping" | "skincare" | "coaching"

interface Mention {
  platform: "Reddit" | "X" | "Facebook"
  where: string
  who: string
  post: string
  match: "Strong match" | "Good match"
  reply: string
  dm: string
}

const PLATFORM_ICON: Record<Mention["platform"], { Icon: IconType; color: string }> = {
  Reddit: { Icon: SiReddit, color: "#FF4500" },
  X: { Icon: SiX, color: "#000000" },
  Facebook: { Icon: SiFacebook, color: "#0866FF" },
}

const BUSINESSES: Record<BizId, { label: string; brief: string; mentions: Mention[] }> = {
  bookkeeping: {
    label: "Bookkeeping app",
    brief: "People struggling to keep track of invoices and expenses as freelancers.",
    mentions: [
      {
        platform: "Reddit",
        where: "r/freelance",
        who: "u/designdaily_",
        post: "Tax time again and my receipts are a mess. What do you all use to track expenses without losing a weekend to it?",
        match: "Strong match",
        reply: "I feel this every year. The thing that fixed it for me was snapping receipts into one app as they happen, so tax time is a 10 minute export, not a weekend. Happy to share my setup if useful.",
        dm: "Hi, saw your post on r/freelance. If you want, I can show you the simple setup I use for receipts. No pitch, just the steps.",
      },
      {
        platform: "X",
        where: "@kaylawrites",
        who: "Kayla M.",
        post: "Chasing three clients for unpaid invoices today. There has to be a better way than spreadsheets.",
        match: "Strong match",
        reply: "Unpaid invoices are the worst part of freelancing. Automatic reminders sent on day 7 and day 14 got most of mine paid without an awkward email from me.",
        dm: "Hi Kayla, saw your post about chasing invoices. We built something that sends the reminders for you, happy to show you in two minutes.",
      },
      {
        platform: "Facebook",
        where: "Freelancers Collective",
        who: "Ben Ashworth",
        post: "Anyone know a simple way to see what I actually earned this quarter? My accounts are all over the place.",
        match: "Good match",
        reply: "A tool that pulls your income and expenses into one view fixes this fast. Mine shows profit for the quarter in two clicks. Want me to send the name?",
        dm: "Hi Ben, saw your question in Freelancers Collective. Glad to point you to a simple way to see quarterly profit.",
      },
    ],
  },
  skincare: {
    label: "Skincare brand",
    brief: "People looking for gentle products for sensitive, easily irritated skin.",
    mentions: [
      {
        platform: "Reddit",
        where: "r/SkincareAddiction",
        who: "u/sensitive_sarah",
        post: "Everything stings my face. Looking for a moisturiser with no fragrance that won't break me out. Please help.",
        match: "Strong match",
        reply: "Stinging usually points to fragrance or too many actives. A plain, fragrance free moisturiser with ceramides is the safest place to start, and patch test it behind your ear first.",
        dm: "Hi Sarah, saw your post. If you'd like, I can suggest a couple of fragrance free options that work well for reactive skin.",
      },
      {
        platform: "X",
        where: "@glowwithjo",
        who: "Jo",
        post: "Does anyone have a gentle cleanser that doesn't leave my skin tight? Dry and sensitive, tried everything.",
        match: "Strong match",
        reply: "Tightness after cleansing means it's stripping your barrier. A cream or milk cleanser used once a day at night is kinder, with just water in the morning.",
        dm: "Hi Jo, saw your post on cleansers. Happy to share what's worked for other dry, sensitive skin types.",
      },
      {
        platform: "Facebook",
        where: "Clean Beauty Swap",
        who: "Marcus T.",
        post: "Buying skincare for my wife who has eczema. Where do I even start?",
        match: "Good match",
        reply: "Look for short ingredient lists, no fragrance, and products tested on eczema prone skin. A fragrance free balm is a gentle first step.",
        dm: "Hi Marcus, saw your post. I can send a short list of eczema friendly options if that helps.",
      },
    ],
  },
  coaching: {
    label: "Fitness coach",
    brief: "Busy people who want to get fit but can't stay consistent with training.",
    mentions: [
      {
        platform: "Reddit",
        where: "r/loseit",
        who: "u/restart_again",
        post: "Started gym three times this year and quit each time by week 3. How do you actually stay consistent?",
        match: "Strong match",
        reply: "Most people quit because the plan is too big. Two short sessions a week you never skip beats five you drop by week three. Build the habit first, then add.",
        dm: "Hi, saw your post on r/loseit. If you want, I can share the simple two day plan my clients start with.",
      },
      {
        platform: "X",
        where: "@mike_runs_late",
        who: "Mike",
        post: "Working 60 hour weeks and I'm out of shape. No idea how to fit training in.",
        match: "Strong match",
        reply: "Twenty minutes, three times a week, done at home, is enough to feel a real difference. Pick fixed days and treat them like meetings.",
        dm: "Hi Mike, saw your post. Happy to share a 20 minute routine built for people with packed weeks.",
      },
      {
        platform: "Facebook",
        where: "Busy Parents Fitness",
        who: "Laura Bennett",
        post: "New mum wanting to get strong again but I only have the baby's nap windows. Any ideas?",
        match: "Good match",
        reply: "Nap windows work well for short, focused sessions. Fifteen minutes of strength work with a couple of key moves adds up fast. Congratulations on the baby!",
        dm: "Hi Laura, saw your post. I can send a 15 minute nap time workout if you'd like.",
      },
    ],
  },
}

const BIZ_ORDER: BizId[] = ["bookkeeping", "skincare", "coaching"]

export function ListeningAgentShowcase() {
  const [biz, setBiz] = useState<BizId>("bookkeeping")
  const [picked, setPicked] = useState(0)
  const data = BUSINESSES[biz]
  const m = data.mentions[picked]

  return (
    <Shell
      glow={<ListeningGlow />}
      title="Social Listening"
      blurb="Turns online conversations into customers. Your agent finds people asking for what you sell, skips the noise, and drafts a helpful reply and DM for you to send."
      chips={[
        { Icon: SiReddit, label: "Reddit", color: "#FF4500" },
        { Icon: SiX, label: "X", color: "#000000" },
        { Icon: SiFacebook, label: "Facebook", color: "#0866FF" },
        { Icon: SiInstagram, label: "Instagram", color: "#E4405F" },
        { Icon: FaLinkedin, label: "LinkedIn", color: "#0A66C2" },
      ]}
      features={[
        "Reads Reddit, X, Threads, YouTube, LinkedIn, Facebook and Instagram",
        "Skips the self-promotion, vendors and job posts",
        "Drafts a reply and a DM for you to send",
      ]}
      picker={
        <Picker
          label="Try a sample business"
          options={BIZ_ORDER.map((id) => ({ id, label: BUSINESSES[id].label }))}
          value={biz}
          onChange={(id) => {
            setBiz(id)
            setPicked(0)
          }}
        />
      }
    >
      <Window title="Social Listening" right={<span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">3 people to reply to</span>}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={biz} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }}>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">Who you want to reach</p>
            <p className="mt-1 rounded-xl bg-zinc-50 px-3 py-2.5 text-sm leading-snug text-zinc-700">{data.brief}</p>

            <p className="mb-2 mt-4 text-[11px] font-semibold uppercase tracking-wider text-zinc-400">Found in the last day</p>
            <ul className="space-y-1.5">
              {data.mentions.map((x, i) => {
                const { Icon, color } = PLATFORM_ICON[x.platform]
                return (
                  <li key={x.who}>
                    <button
                      type="button"
                      aria-pressed={picked === i}
                      onClick={() => setPicked(i)}
                      className={cn(
                        "flex w-full cursor-pointer items-start gap-3 rounded-xl border px-3 py-2.5 text-left transition-colors",
                        picked === i ? "border-zinc-900 bg-zinc-50" : "border-zinc-200 hover:bg-zinc-50",
                      )}
                    >
                      <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white shadow-sm ring-1 ring-zinc-200">
                        <Icon className="h-3.5 w-3.5" style={{ color }} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="flex items-center justify-between gap-2 text-xs text-zinc-500">
                          <span className="truncate">
                            {x.who} in {x.where}
                          </span>
                          <span className="shrink-0 rounded-full bg-zinc-100 px-2 py-0.5 text-[10px] font-medium text-zinc-600">{x.match}</span>
                        </span>
                        <span className="mt-0.5 line-clamp-2 block text-[13px] leading-snug text-zinc-800">{x.post}</span>
                      </span>
                    </button>
                  </li>
                )
              })}
            </ul>

            <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
              <div className="rounded-xl border border-zinc-200 p-3.5">
                <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
                  <MessageCircle className="h-3.5 w-3.5" />
                  Reply drafted
                </div>
                <p className="mt-2 text-[13px] leading-relaxed text-zinc-600">{m.reply}</p>
              </div>
              <div className="rounded-xl border border-zinc-200 p-3.5">
                <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
                  <Mail className="h-3.5 w-3.5" />
                  DM drafted
                </div>
                <p className="mt-2 text-[13px] leading-relaxed text-zinc-600">{m.dm}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </Window>
    </Shell>
  )
}

function ListeningGlow() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <div className="absolute -left-20 -top-28 h-80 w-80 rounded-full bg-[#14B8A6]/40 blur-3xl" />
      <div className="absolute -bottom-32 left-1/4 h-96 w-96 rounded-full bg-[#0EA5E9]/35 blur-3xl transition-opacity duration-500 group-hover:opacity-80" />
      <div className="absolute left-1/2 top-1/3 h-72 w-72 rounded-full bg-[#6366F1]/25 blur-3xl" />
      <div className="absolute -top-24 right-0 h-72 w-72 rounded-full bg-white/15 blur-3xl" />
      <div className="absolute -bottom-24 -right-16 h-80 w-80 rounded-full bg-[#0D9488]/40 blur-3xl" />
      <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:32px_32px]" />
    </div>
  )
}

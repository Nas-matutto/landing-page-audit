import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import type { LucideIcon } from "lucide-react"
import { ArrowUpRight, Check, Clock, Gamepad2, Palette, Workflow } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Ambassador } from "@/components/ui/ambassador"
import { GhostCta, PrimaryCta, Reveal } from "@/components/sections/social-agent/parts"
import { SIGNUP_URL } from "@/lib/links"

export const metadata: Metadata = {
  title: "Free Tools — Talk to me Data",
  description:
    "Free AI tools: a social media page analyzer that tells you how to grow your Instagram, plus calculators and resources that show what an AI agent could do for your business.",
  alternates: {
    canonical: "https://talktomedata.com/free-tools",
  },
}

const TOOLS: { number: string; href: string; title: string; description: string; cta: string; Icon: LucideIcon }[] = [
  {
    number: "01",
    href: "/free-tools/calculator",
    title: "Workflow Time Savings Calculator",
    description:
      "Enter how many hours your team spends on manual tasks each week. Get an instant estimate of the time saved and what it costs you a year, at $15/hr.",
    cta: "Open calculator",
    Icon: Clock,
  },
  {
    number: "02",
    href: "/free-tools/workflow-mapper",
    title: "Agent Workflow Mapper",
    description:
      "Describe your trigger, list your steps and define your output. It draws a diagram of which steps an AI agent can take over, ready to download as a PNG.",
    cta: "Map my workflow",
    Icon: Workflow,
  },
  {
    number: "03",
    href: "/free-tools/brand-guidelines",
    title: "Brand Guidelines Generator",
    description:
      "Pick your fonts, colours and tone of voice. Get a one-page brand guideline as a PNG, plus the text to paste into your AI agent so it always stays on brand.",
    cta: "Build my brand kit",
    Icon: Palette,
  },
  {
    number: "04",
    href: "/free-tools/ai-learning-game",
    title: "AI Learning Game",
    description:
      "Think Pokémon, but every battle teaches you AI. Explore a pixel world and pick up real AI concepts one trivia duel at a time, right in your browser.",
    cta: "Play the game",
    Icon: Gamepad2,
  },
]

// The featured tool's jobs, shown landing in turn like the social agent's hero.
const ANALYZER_DONE = [
  { text: "Analyzed your last 30 posts", note: "views, engagement, captions" },
  { text: "Found your best Reel length", note: "15 to 30 seconds" },
  { text: "Wrote your growth plan", note: "do, fix and try" },
]

const COMING_SOON = ["ROI calculator", "Agent readiness audit", "Automation playbook generator"]

export default function FreeToolsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        {/* Hero */}
        <section className="relative w-full overflow-hidden bg-white pb-16 pt-36 sm:pt-44 lg:pb-20 lg:pt-40">
          <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-6 lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)] lg:px-8">
            <Reveal className="text-center lg:text-left">
              <p className="eyebrow mb-5">Free tools</p>
              <h1 className="display text-[clamp(2.75rem,7.5vw,5rem)] lg:text-[clamp(3rem,4.8vw,4.25rem)]">
                Free tools to see what an AI agent can do for you
              </h1>
              <p className="lede mx-auto mt-6 max-w-lg text-lg sm:text-xl lg:mx-0">
                Let our AI agent analyze your Instagram page, work out the hours you&apos;d save, map which steps an agent can take over and build your brand kit. No signup needed.
              </p>
            </Reveal>

            {/* The ambassador, pointing you to the tools */}
            <Reveal delay={0.1} className="mx-auto flex items-end gap-3 lg:mx-0 lg:justify-self-end">
              <Ambassador pose="wave" sizes="200px" className="h-[260px] w-[130px] shrink-0 sm:h-[320px] sm:w-[160px]" priority />
              <div className="relative mb-24 max-w-[13rem] rounded-2xl rounded-bl-sm border border-hairline bg-white px-4 py-3 text-[14px] font-medium leading-snug text-ink shadow-lg shadow-black/5">
                Pick a tool and try it. It&apos;s free, and there&apos;s no signup.
              </div>
            </Reveal>
          </div>
        </section>

        {/* Tools */}
        <section className="border-y border-hairline bg-mist px-6 py-20 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-6xl">
            {/* Featured: the social media page analyzer, in the social agent's look */}
            <Reveal className="mb-4">
              <Link
                href="/free-tools/social-media-analyzer"
                className="group relative grid overflow-hidden rounded-[32px] border border-hairline bg-white transition-colors hover:border-ink lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]"
              >
                <div className="relative z-10 flex flex-col p-7 sm:p-10">
                  <span className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-hairline bg-white px-3 py-1.5 text-xs font-semibold text-ink">
                    <span className="h-2 w-2 rounded-full bg-[#DD2A7B]" /> New · Free AI tool
                  </span>
                  <h2 className="display text-[clamp(2rem,4.5vw,3rem)] leading-[1.05]">Social Media Page Analyzer</h2>
                  <p className="lede mt-4 max-w-md text-[17px]">
                    Enter your Instagram handle and our AI agent analyzes your page, finds what&apos;s working and tells you how to grow it. Free, in
                    your inbox in a minute.
                  </p>
                  <ul className="mt-7 space-y-2.5">
                    {["Measures your latest posts against your own average", "Finds your best Reel length and caption style", "Tells you what to do, fix and try next"].map(item => (
                      <li key={item} className="flex items-center gap-2.5 text-sm font-medium text-ink">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-ink text-white">
                          <Check className="h-3 w-3" />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <span className="mt-9 inline-flex w-fit items-center gap-2 rounded-full bg-ink px-5 py-3 text-[15px] font-semibold text-white transition-opacity group-hover:opacity-85">
                    Analyze my page
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </div>

                {/* The sample analysis, with the agent and the jobs he finishes */}
                <div className="relative min-h-[340px] border-t border-hairline bg-mist lg:border-l lg:border-t-0">
                  <div className="absolute inset-x-8 top-8 bottom-0 overflow-hidden rounded-t-2xl border border-b-0 border-hairline bg-white shadow-xl shadow-black/5 sm:inset-x-14 sm:top-10">
                    <Image
                      src="/free-tools/instagram-snapshot-sample.png"
                      alt="A sample analysis PDF from the social media page analyzer"
                      width={1241}
                      height={1754}
                      sizes="(min-width: 1024px) 520px, 100vw"
                      className="h-auto w-full"
                    />
                  </div>
                  <Ambassador
                    pose="wave"
                    sizes="140px"
                    className="pointer-events-none absolute -bottom-2 left-0 hidden h-[220px] w-[110px] drop-shadow-xl sm:block"
                  />
                  <ul className="absolute bottom-5 right-4 flex flex-col items-end gap-2 sm:right-6">
                    {ANALYZER_DONE.map(d => (
                      <li key={d.text} className="flex items-center gap-2.5 rounded-full border border-hairline bg-white py-1.5 pl-1.5 pr-4 shadow-lg shadow-black/5">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ink text-white">
                          <Check className="h-3.5 w-3.5" />
                        </span>
                        <span className="text-xs font-semibold text-ink sm:text-[13px]">
                          {d.text} <span className="hidden font-normal text-quiet sm:inline">· {d.note}</span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Link>
            </Reveal>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {TOOLS.map((tool, i) => (
                <Reveal key={tool.href} delay={(i % 2) * 0.06} className="h-full">
                  <Link
                    href={tool.href}
                    className="group flex h-full flex-col rounded-3xl border border-hairline bg-white p-7 transition-colors hover:border-ink sm:p-8"
                  >
                    <div className="mb-8 flex items-start justify-between">
                      <span className="flex h-11 w-11 items-center justify-center rounded-full border border-hairline text-ink transition-colors group-hover:border-ink group-hover:bg-ink group-hover:text-white">
                        <tool.Icon className="h-5 w-5" />
                      </span>
                      <span className="font-mono text-sm font-medium text-faint">{tool.number}</span>
                    </div>
                    <h2 className="mb-2 text-xl font-semibold tracking-[-0.01em] text-ink">{tool.title}</h2>
                    <p className="text-sm leading-relaxed text-quiet">{tool.description}</p>
                    <span className="mt-auto inline-flex items-center gap-1.5 pt-7 text-sm font-semibold text-ink">
                      {tool.cta}
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>

            {/* Coming soon */}
            <Reveal className="mt-4 flex flex-col items-center gap-4 rounded-3xl border border-dashed border-hairline bg-white/60 p-7 text-center sm:flex-row sm:justify-between sm:text-left">
              <p className="eyebrow">Coming soon</p>
              <ul className="flex flex-wrap justify-center gap-2">
                {COMING_SOON.map((item) => (
                  <li key={item} className="rounded-full border border-hairline bg-white px-3 py-1.5 text-xs font-medium text-quiet">
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-white px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <Reveal className="relative mx-auto max-w-6xl overflow-hidden rounded-[32px] bg-ink px-7 py-14 text-white sm:px-12 sm:py-16 lg:py-20">
            <div className="relative z-10 max-w-xl">
              <h2 className="display text-[clamp(2.25rem,5vw,3.75rem)] text-white!">Ready to hand the work to an agent?</h2>
              <p className="mt-6 max-w-md text-lg font-light leading-snug text-white/65">
                Start free with a ready-made agent for social media or SEO, or tell us the job and we&apos;ll build one for you.
              </p>
              <div className="mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
                <PrimaryCta href={SIGNUP_URL} className="bg-white text-ink">
                  Get Started
                </PrimaryCta>
                <GhostCta href="/get-started" className="border-white/25 text-white hover:bg-white/10">
                  Request a custom agent
                </GhostCta>
              </div>
            </div>
            <Ambassador
              pose="thumbs-up"
              sizes="360px"
              className="pointer-events-none absolute -bottom-2 -right-6 hidden h-[300px] w-[270px] sm:block lg:right-8 lg:h-[380px] lg:w-[340px]"
            />
          </Reveal>
        </section>
      </main>
      <Footer />
    </div>
  )
}

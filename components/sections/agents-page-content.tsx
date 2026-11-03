import Link from "next/link"
import Image from "next/image"
import {
  ArrowRight, ArrowUpRight, Wand2,
  Server, Sparkles, Repeat, Activity, RefreshCw, Plug, Shield, LayoutDashboard,
  BarChart3, House, Receipt, Target,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { PREBUILT_AGENTS } from "@/lib/prebuilt-agents"
import { SIGNUP_URL } from "@/lib/links"
import { IntegrationMarquee } from "@/components/ui/integration-marquee"
import { PrebuiltAgentCard } from "@/components/sections/prebuilt-agent-card"
import { AgentsRotatingWord } from "@/components/sections/agents-rotating-word"

// ─── Custom agents we've built ──────────────────────────────────────────────

const CUSTOM_BUILDS: { title: string; result: string; href: string; Icon: LucideIcon }[] = [
  { title: "Lead Finder", result: "50 to 200 verified leads in your CRM every week", href: "/agents/lead-finder", Icon: Target },
  { title: "Invoice Processing", result: "Every invoice read and entered into your accounts, up to 90% faster", href: "/agents/invoice-processing", Icon: Receipt },
  { title: "Real Estate Agent", result: "Up to 100 likely sellers per search, with comps and mailing lists", href: "/agents/real-estate-agent", Icon: House },
  { title: "Data Entry & Reporting", result: "Reports on schedule and 10+ hours of manual work back every week", href: "/agents/data-entry-reporting", Icon: BarChart3 },
]

// ─── Two ways in ────────────────────────────────────────────────────────────

const PATHS = [
  {
    eyebrow: "Pre-built agents",
    title: "Working for you in minutes",
    steps: ["Sign up free, no card needed", "Pick an agent and connect your account", "Watch the results come in"],
    cta: { label: "Start free", href: SIGNUP_URL, external: true },
  },
  {
    eyebrow: "Custom agents",
    title: "Built around your workflow",
    steps: ["Tell us the job in plain language", "We build it with you on a free call", "It does the work, every day"],
    cta: { label: "Book a free call", href: "/book-demo", external: false },
  },
]

const WE_HANDLE = [
  { icon: Server, title: "Runs around the clock", body: "Your agents live on our cloud. Nothing to install, host or maintain." },
  { icon: Sparkles, title: "The best AI, included", body: "Claude, ChatGPT and Gemini are built in. No API keys or AI accounts needed." },
  { icon: Repeat, title: "Works on autopilot", body: "On paid plans your agents run on their own: weekly refreshes, daily leads, posts on schedule." },
  { icon: Plug, title: "Plugs into your tools", body: "Instagram, Search Console, GitHub, WordPress, Gmail, Outlook and more, in a few clicks." },
  { icon: Activity, title: "Monitored 24/7", body: "If something breaks, we catch it and fix it before it costs you a result." },
  { icon: RefreshCw, title: "Gets better over time", body: "As AI improves, so do your agents. No upgrades for you to manage." },
  { icon: Shield, title: "Your data stays yours", body: "Isolated environments, never used for training. Secure by default." },
  { icon: LayoutDashboard, title: "One dashboard", body: "Every agent's results, and the actions they've used, in one place." },
]

// ─── Main component ───────────────────────────────────────────────────────────

export function AgentsPageContent() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-white pb-20 pt-36 sm:pt-44 lg:pb-24 lg:pt-40">
        <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-10 lg:px-8">
          <div className="rise-in text-center lg:text-left">
            <h1 className="display text-[clamp(2.5rem,6.5vw,4.5rem)]">AI agents built for</h1>
            <div className="mb-8 mt-1 text-[clamp(2.5rem,6.5vw,4.5rem)]">
              <AgentsRotatingWord className="lg:justify-start" />
            </div>

            <p className="lede mx-auto mb-10 max-w-2xl text-lg lg:mx-0 lg:max-w-xl">
              Pre-built agents that grow your social media, rank your site, update your website and fill your pipeline,
              working from the day you sign up. Need something else? We build a custom agent around your workflow.
            </p>

            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start">
              <a
                href={SIGNUP_URL}
                className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-ink px-5 py-3 text-[15px] font-semibold tracking-[0.2px] text-white transition-opacity hover:opacity-85 sm:w-auto"
              >
                <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-in-out group-hover:translate-x-full" />
                <span className="relative flex items-center gap-2">
                  Start free <ArrowRight className="h-4 w-4" />
                </span>
              </a>
              <Link
                href="/book-demo"
                className="inline-flex w-full items-center justify-center rounded-full border border-hairline px-5 py-3 text-[15px] font-semibold tracking-[0.2px] text-ink transition-colors hover:bg-mist sm:w-auto"
              >
                Book a free call
              </Link>
            </div>
            <p className="mt-5 text-[13px] text-faint">Every agent free to try · 50 actions a month · No card required</p>
          </div>

          {/* Brand ambassador — waves hello beside the headline; stacks under the CTAs on mobile */}
          <div className="rise-in relative mx-auto w-[180px] sm:w-[210px] lg:w-[250px] xl:w-[270px]" style={{ animationDelay: "0.15s" }}>
            <div
              aria-hidden
              className="absolute -bottom-2 left-1/2 h-5 w-[78%] -translate-x-1/2 rounded-[50%] bg-ink/10 blur-md"
            />
            <div className="float-y">
              <Image
                src="/agent_ambassador_v3.webp"
                alt="Talk to me Data's AI agent ambassador waving hello"
                width={519}
                height={1013}
                priority
                className="relative h-auto w-full select-none"
                draggable={false}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Explore Agents: the app's ready-made cards, plus custom ── */}
      <section id="explore" className="py-24 sm:py-32 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="reveal text-center mb-14">
              <p className="eyebrow mb-5">Pre-built agents</p>
              <h2 className="display mb-4 text-[clamp(1.75rem,4vw,2.75rem)]">
                Five agents, ready to work today
              </h2>
              <p className="lede mx-auto max-w-xl text-lg">
                Every one is included on every plan, the free one too. Pick an agent, connect your account and it gets
                to work.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {PREBUILT_AGENTS.map((agent) => (
                <div key={agent.id} className="reveal">
                  <PrebuiltAgentCard agent={agent} />
                </div>
              ))}

              {/* Custom agent: the light card beside the five dark ones */}
              <div className="reveal">
                <Link
                  href="/book-demo"
                  className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-hairline bg-mist p-6 transition-all duration-300 hover:-translate-y-1 hover:border-ink"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-hairline bg-white text-ink">
                    <Wand2 className="h-5 w-5" />
                  </div>
                  <h3 className="mt-6 text-xl font-bold leading-tight tracking-tight text-ink sm:text-2xl">Custom agent</h3>
                  <p className="mt-2 text-sm leading-relaxed text-quiet">
                    Got a job none of these do? Describe it in plain language and we&apos;ll build an agent that does it
                    for you, every day.
                  </p>
                  <ul className="mb-6 mt-4 space-y-2 text-sm text-ink/80">
                    {["Chase overdue invoices", "Log every sales call in your CRM", "Send a weekly KPI report to Slack"].map((idea) => (
                      <li key={idea} className="flex items-center gap-2">
                        <span className="h-1 w-1 shrink-0 rounded-full bg-ink" />
                        {idea}
                      </li>
                    ))}
                  </ul>
                  <span className="mt-auto inline-flex items-center gap-2 self-start rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white transition-opacity group-hover:opacity-85">
                    Talk to us
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </div>
            </div>

            {/* Custom agents we've already built: proof the custom route delivers */}
            <div className="reveal mt-16">
              <p className="eyebrow mb-5 text-center">Custom agents we&apos;ve built</p>
              <div className="grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-4">
                {CUSTOM_BUILDS.map(({ title, result, href, Icon }) => (
                  <Link key={href} href={href} className="group flex flex-col bg-white p-5 transition-colors hover:bg-mist">
                    <div className="flex items-center justify-between">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full border border-hairline text-ink">
                        <Icon className="h-4 w-4" />
                      </div>
                      <ArrowUpRight className="h-4 w-4 text-faint transition-colors group-hover:text-ink" />
                    </div>
                    <h3 className="mt-4 text-sm font-semibold text-ink">{title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-quiet">{result}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Two ways in, and what we take care of ── */}
      <section className="border-y border-hairline bg-mist py-24 sm:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

              {/* Left: heading + the two paths */}
              <div className="reveal lg:sticky lg:top-32">
                <p className="eyebrow mb-5">How it works</p>
                <h2 className="display mb-6 text-[clamp(2rem,4.5vw,3.25rem)]">
                  Pick an agent, or get one built for you
                </h2>
                <p className="lede mb-8 text-lg">
                  Either way, you get the result without the setup. No servers, no AI accounts, no developer on your team.
                </p>

                <div className="grid gap-4 sm:grid-cols-2">
                  {PATHS.map((path) => (
                    <div key={path.eyebrow} className="flex flex-col rounded-3xl border border-hairline bg-white p-6">
                      <p className="eyebrow">{path.eyebrow}</p>
                      <p className="mt-2 text-base font-semibold text-ink">{path.title}</p>
                      <ol className="mb-6 mt-4 space-y-3">
                        {path.steps.map((step, i) => (
                          <li key={step} className="flex items-start gap-3">
                            <span className="mt-px flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-hairline text-[11px] font-semibold tabular-nums text-ink">
                              {i + 1}
                            </span>
                            <span className="text-sm leading-relaxed text-quiet">{step}</span>
                          </li>
                        ))}
                      </ol>
                      {path.cta.external ? (
                        <a href={path.cta.href} className="group mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-ink">
                          {path.cta.label}
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                        </a>
                      ) : (
                        <Link href={path.cta.href} className="group mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-ink">
                          {path.cta.label}
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: what we handle grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <p className="eyebrow col-span-full mb-2">Taken care of for you</p>
                {WE_HANDLE.map((item, i) => (
                  <div key={i} className="reveal rounded-3xl border border-hairline bg-white p-5 transition-colors hover:border-ink">
                    <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-full border border-hairline">
                      <item.icon className="h-4 w-4 text-ink" />
                    </div>
                    <h3 className="mb-1.5 text-sm font-semibold text-ink">{item.title}</h3>
                    <p className="text-xs leading-relaxed text-quiet">{item.body}</p>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ── Integrations ── */}
      <section className="overflow-hidden bg-white py-24">
        <div className="mx-auto mb-12 max-w-4xl px-6 text-center">
          <div className="reveal">
            <p className="eyebrow mb-5">Integrations</p>
            <h2 className="display mb-4 text-[clamp(1.75rem,4vw,2.75rem)]">
              Works with your existing tools
            </h2>
            <p className="lede mx-auto max-w-xl text-lg">
              Your agents get results inside the platforms you already use. No migrations, no new logins: connect in a
              few clicks, or we wire it up for you.
            </p>
          </div>
        </div>

        <IntegrationMarquee />
      </section>

      {/* ── Bottom CTA ── */}
      <section className="border-t border-hairline bg-mist py-24 sm:py-32">
        <div className="container relative mx-auto px-4 text-center sm:px-6 lg:px-8">
          <div className="reveal">
            <h2 className="display text-[clamp(2rem,4.5vw,3.25rem)]">
              Put your first agent to work today
            </h2>
            <p className="lede mx-auto mt-6 max-w-xl text-lg">
              Start free with any pre-built agent. Need a custom one? Book a free 20-minute call and we&apos;ll tell you
              exactly what it can do for you.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href={SIGNUP_URL}
                className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-ink px-5 py-3 text-[15px] font-semibold tracking-[0.2px] text-white transition-opacity hover:opacity-85 sm:w-auto"
              >
                <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-in-out group-hover:translate-x-full" />
                <span className="relative flex items-center gap-2">
                  Start free
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </a>
              <Link
                href="/book-demo"
                className="inline-flex w-full items-center justify-center rounded-full border border-hairline bg-white px-5 py-3 text-[15px] font-semibold tracking-[0.2px] text-ink transition-colors hover:bg-mist sm:w-auto"
              >
                Book a free call
              </Link>
            </div>
            <p className="mt-6 text-[13px] text-faint">Free forever plan · No card required · Cancel any time</p>
          </div>
        </div>
      </section>
    </>
  )
}

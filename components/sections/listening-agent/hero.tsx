import Image from "next/image"
import { Check } from "lucide-react"
import { SIGNUP_URL } from "@/lib/links"
import { GhostCta, PrimaryCta } from "@/components/sections/social-agent/parts"

// The Social Listening agent in his black hoodie and AI cap, waving hello.
// Black and white like the brand, so the page needs no accent colour.

const OUTCOMES = ["Warm leads every day", "No more scrolling", "Replies ready to send"]

// What a day with the agent looks like, landing in turn as the page loads.
const DONE = [
  { text: "14 people asking for you, found", note: "in the last day", delay: 1.2 },
  { text: "Spam and job posts skipped", note: "only real buyers", delay: 2.2 },
  { text: "14 replies and DMs drafted", note: "ready to send", delay: 3.2 },
]

export function ListeningAgentHero() {
  return (
    <section className="relative w-full overflow-hidden bg-white pb-20 pt-36 sm:pt-44 lg:pb-28 lg:pt-36">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-14 px-6 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-12 lg:px-8">
        <div className="rise-in text-center lg:text-left">
          <p className="eyebrow mb-5 inline-flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-ink" aria-hidden />
            AI Social Listening Agent
          </p>
          <h1 className="display text-[clamp(2.75rem,7.5vw,5rem)] lg:text-[clamp(3rem,4.6vw,4.25rem)]">
            Turn people asking for what you sell into customers
          </h1>
          <p className="lede mx-auto mt-6 max-w-lg text-lg sm:text-xl lg:mx-0">
            Your agent finds the posts where people ask for exactly what you offer, skips the noise and drafts the reply. You just hit send.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start">
            <PrimaryCta href={SIGNUP_URL}>Find my customers</PrimaryCta>
            <GhostCta href="#try-it">See who it finds</GhostCta>
          </div>

          <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 lg:justify-start">
            {OUTCOMES.map((o) => (
              <li key={o} className="flex items-center gap-2 text-sm font-medium text-ink">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-ink text-white">
                  <Check className="h-3 w-3" />
                </span>
                {o}
              </li>
            ))}
          </ul>
        </div>

        {/* The agent, with the day's results */}
        <div className="rise-in relative mx-auto w-full max-w-[520px]" style={{ animationDelay: "0.15s" }}>
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div className="absolute -right-10 -top-10 h-56 w-56 rounded-full bg-ink/10 blur-3xl" />
            <div className="absolute -bottom-12 -left-12 h-64 w-64 rounded-full bg-ink/10 blur-3xl" />
          </div>

          <div className="relative rounded-[40px] bg-mist p-2.5 shadow-2xl shadow-black/10 ring-1 ring-hairline">
            <div className="relative aspect-square w-full overflow-hidden rounded-[32px] bg-white">
              <Image
                src="/Social-listening-body-agent.jpeg"
                alt="The Talk to me Data social listening agent, in a black hoodie and AI cap, waving hello"
                width={1024}
                height={1024}
                sizes="(min-width: 1024px) 460px, 80vw"
                priority
                className="absolute bottom-0 left-[2%] h-auto w-[88%]"
              />
            </div>
            <span className="absolute left-6 top-6 inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 text-[11px] font-semibold text-ink shadow-sm ring-1 ring-hairline backdrop-blur">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ink opacity-50 motion-reduce:hidden" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-ink" />
              </span>
              Listening for you
            </span>
          </div>

          {/* He's drawn a little small and to the left, so the chips fit in the empty top right. Where the
              card is too narrow for that (phones, and the two-column layout below xl), they sit under it. */}
          <ul className="relative mt-5 flex flex-col items-center gap-2 sm:absolute sm:-right-8 sm:top-24 sm:mt-0 sm:items-end lg:relative lg:right-auto lg:top-auto lg:mt-5 lg:items-center xl:absolute xl:-right-16 xl:top-24 xl:mt-0 xl:items-end">
            {DONE.map((d) => (
              <li
                key={d.text}
                style={{ animationDelay: `${d.delay}s` }}
                className="pop-in flex items-center gap-2.5 rounded-full border border-hairline bg-white py-1.5 pl-1.5 pr-4 shadow-lg shadow-black/5"
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ink text-white">
                  <Check className="h-3.5 w-3.5" />
                </span>
                <span className="text-xs font-semibold text-ink sm:text-[13px]">
                  {d.text} <span className="font-normal text-quiet sm:hidden">· {d.note}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

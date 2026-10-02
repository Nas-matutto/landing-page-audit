import { Ambassador } from "@/components/ui/ambassador"
import { GhostCta, PrimaryCta, Reveal } from "@/components/sections/social-agent/parts"
import { SIGNUP_URL } from "@/lib/links"

/** Full-width sign-up band for blog listing pages (index, topic hubs, author). */
export function BlogCtaBand() {
  return (
    <section className="bg-white px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <Reveal className="relative mx-auto max-w-6xl overflow-hidden rounded-[32px] bg-ink px-7 py-14 text-white sm:px-12 sm:py-16 lg:py-20">
        <div className="relative z-10 max-w-xl">
          <h2 className="display text-[clamp(2.25rem,5vw,3.75rem)] text-white!">Skip the build. Let an agent do the work.</h2>
          <p className="mt-6 max-w-md text-lg font-light leading-snug text-white/65">
            Sign up free and start with a ready-made agent for social media or SEO. No code, no card required.
          </p>
          <div className="mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
            <PrimaryCta href={SIGNUP_URL} className="bg-white text-ink">
              Sign up free
            </PrimaryCta>
            <GhostCta href="/agents" className="border-white/25 text-white hover:bg-white/10">
              Browse the agents
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
  )
}

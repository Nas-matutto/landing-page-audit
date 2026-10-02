import type { ReactNode } from "react"
import { Ambassador } from "@/components/ui/ambassador"
import { PrimaryCta } from "@/components/sections/social-agent/parts"
import { SIGNUP_URL } from "@/lib/links"

/**
 * The blog's call to action: an ink panel with the ambassador and a sign-up
 * button. The heading is a <p>, not a heading, so CTAs stay out of the
 * article outline and the table of contents.
 */
export function SignupCta({
  heading,
  children,
  eyebrow,
  button = "Sign up free",
}: {
  heading: ReactNode
  children?: ReactNode
  eyebrow?: string
  button?: string
}) {
  return (
    <aside className="relative my-12 overflow-hidden rounded-[28px] bg-ink px-7 py-10 sm:px-10 sm:py-12">
      <div className="relative z-10 max-w-md">
        {eyebrow && <p className="eyebrow mb-4 text-white/50!">{eyebrow}</p>}
        <p className="display text-[clamp(1.6rem,3.4vw,2.25rem)] text-white!">{heading}</p>
        {children && <div className="mt-4 text-[15px] font-light leading-relaxed text-white/65">{children}</div>}
        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
          <PrimaryCta href={SIGNUP_URL} className="bg-white text-ink">
            {button}
          </PrimaryCta>
          <p className="text-center text-[13px] text-white/45 sm:text-left">Free plan · No card required</p>
        </div>
      </div>
      <Ambassador
        pose="thumbs-up"
        sizes="220px"
        className="pointer-events-none absolute -bottom-3 right-0 hidden h-60 w-50 sm:block lg:right-4"
      />
    </aside>
  )
}

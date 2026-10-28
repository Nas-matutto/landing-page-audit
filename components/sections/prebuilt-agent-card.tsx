import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Check } from "lucide-react"
import { FaLinkedin, FaMicrosoft } from "react-icons/fa"
import {
  SiClaude, SiFacebook, SiGithub, SiGmail, SiGooglegemini, SiGooglesearchconsole, SiInstagram,
  SiOpenai, SiReddit, SiTiktok, SiWordpress, SiX, SiYoutube,
} from "react-icons/si"
import type { IconType } from "react-icons"
import { SIGNUP_URL } from "@/lib/links"
import type { PrebuiltAgent, PrebuiltAgentId } from "@/lib/prebuilt-agents"
import { cn } from "@/lib/utils"

// The app's ready-made agent card (app-TTDM components/dashboard/ready-made-agents.tsx
// → ReadyMadeSquareCard, detailed), so the agent a visitor picks here looks the
// same once they've signed up: a dark panel lit in the colours of the places
// the agent works, with those places' logos along the top.

const LOGOS: Record<PrebuiltAgentId, { Icon: IconType; color: string; label: string }[]> = {
  social_manager: [
    { Icon: SiInstagram, color: "#E4405F", label: "Instagram" },
    { Icon: SiTiktok, color: "#000000", label: "TikTok" },
    { Icon: SiYoutube, color: "#FF0000", label: "YouTube" },
    { Icon: SiFacebook, color: "#0866FF", label: "Facebook" },
  ],
  seo_manager: [
    { Icon: SiGooglesearchconsole, color: "#458CF5", label: "Google Search Console" },
    { Icon: SiOpenai, color: "#10A37F", label: "ChatGPT" },
    { Icon: SiGooglegemini, color: "#4285F4", label: "Gemini" },
    { Icon: SiClaude, color: "#D97757", label: "Claude" },
  ],
  website_manager: [
    { Icon: SiGithub, color: "#181717", label: "GitHub" },
    { Icon: SiWordpress, color: "#21759B", label: "WordPress" },
  ],
  sdr_agent: [
    { Icon: SiGmail, color: "#EA4335", label: "Gmail" },
    { Icon: FaMicrosoft, color: "#0078D4", label: "Outlook" },
    { Icon: FaLinkedin, color: "#0A66C2", label: "LinkedIn" },
    { Icon: SiX, color: "#000000", label: "X" },
    { Icon: SiInstagram, color: "#E4405F", label: "Instagram" },
  ],
  social_listening: [
    { Icon: SiReddit, color: "#FF4500", label: "Reddit" },
    { Icon: SiX, color: "#000000", label: "X" },
    { Icon: SiFacebook, color: "#0866FF", label: "Facebook" },
    { Icon: SiInstagram, color: "#E4405F", label: "Instagram" },
  ],
}

/** Each agent's glow: five blurred colours from the app's *Glow components. */
const GLOWS: Record<PrebuiltAgentId, [string, string, string, string, string]> = {
  social_manager: ["#F58529", "#DD2A7B", "#8134AF", "#25F4EE", "#FF0033"],
  seo_manager: ["#4285F4", "#10A37F", "#FBBC04", "#D97757", "#9B72CB"],
  website_manager: ["#6366F1", "#06B6D4", "#A3E635", "#FFFFFF", "#8B5CF6"],
  sdr_agent: ["#EF4444", "#F43F5E", "#FB923C", "#FFFFFF", "#DC2626"],
  social_listening: ["#14B8A6", "#0EA5E9", "#6366F1", "#FFFFFF", "#0D9488"],
}

function Glow({ id }: { id: PrebuiltAgentId }) {
  const [a, b, c, d, e] = GLOWS[id]
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <div className="absolute -left-20 -top-28 h-80 w-80 rounded-full opacity-35 blur-3xl" style={{ background: a }} />
      <div className="absolute -bottom-32 left-1/4 h-96 w-96 rounded-full opacity-35 blur-3xl transition-opacity duration-500 group-hover:opacity-25" style={{ background: b }} />
      <div className="absolute left-1/2 top-1/3 h-72 w-72 rounded-full opacity-25 blur-3xl" style={{ background: c }} />
      <div className="absolute -top-24 right-0 h-72 w-72 rounded-full opacity-15 blur-3xl" style={{ background: d }} />
      <div className="absolute -bottom-24 -right-16 h-80 w-80 rounded-full opacity-35 blur-3xl" style={{ background: e }} />
      {/* Fine grid keeps the glow from reading as a flat gradient */}
      <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:32px_32px]" />
    </div>
  )
}

export function AgentFace({ src, size = 40, className }: { src: string; size?: number; className?: string }) {
  return (
    <span
      aria-hidden
      className={cn("relative inline-block shrink-0 overflow-hidden rounded-full bg-mist", className)}
      style={{ width: size, height: size }}
    >
      <Image src={src} alt="" width={256} height={256} sizes={`${size}px`} className="h-full w-full object-cover" />
    </span>
  )
}

export function PrebuiltAgentCard({ agent }: { agent: PrebuiltAgent }) {
  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-3xl bg-ink p-6 text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/25">
      <Glow id={agent.id} />

      <div className="relative flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5">
          {LOGOS[agent.id].map(({ Icon, color, label }) => (
            <span key={label} title={label} className="flex h-7 w-7 items-center justify-center rounded-lg bg-white shadow-sm">
              <Icon aria-label={label} className="h-[15px] w-[15px]" style={{ color }} />
            </span>
          ))}
        </div>
        <span className="shrink-0 rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider ring-1 ring-white/20">
          Free to start
        </span>
      </div>

      <div className="relative mt-6 flex flex-1 flex-col">
        <div className="flex items-center gap-2.5">
          <AgentFace src={agent.face} size={40} className="shadow-lg ring-2 ring-white/25" />
          <h3 className="min-w-0 text-xl font-bold leading-tight tracking-tight sm:text-2xl">{agent.title}</h3>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-white/70">{agent.blurb}</p>
        <ul className="mb-6 mt-4 space-y-2">
          {agent.features.map((f) => (
            <li key={f} className="flex items-start gap-2 text-sm text-white/85">
              <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/20">
                <Check className="h-2.5 w-2.5" />
              </span>
              {f}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2">
          <a
            href={SIGNUP_URL}
            className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink shadow-lg transition-colors hover:bg-mist"
          >
            Start free
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
          {agent.href && (
            <Link href={agent.href} className="text-sm font-semibold text-white/70 underline-offset-4 transition-colors hover:text-white hover:underline">
              See how it works
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

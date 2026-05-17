import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Agently — AI agents built, deployed, and hosted for you",
  description:
    "Tell us what you need to automate. We build, deploy, and host your custom AI agent — from brief to live in days, not months.",
  keywords: ["AI agents", "AI automation", "no-code AI", "custom AI agent", "AI deployment", "AI workflow"],
  openGraph: {
    title: "Agently — AI agents built, deployed, and hosted for you",
    description:
      "Tell us what you need to automate. We build, deploy, and host your custom AI agent — you just use it.",
    type: "website",
  },
}

// ─── Inline SVG icons ────────────────────────────────────────────────────────

function RobotIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="9" width="18" height="12" rx="2" stroke="#185FA5" strokeWidth="1.5" />
      <circle cx="9" cy="15" r="1.5" fill="#185FA5" />
      <circle cx="15" cy="15" r="1.5" fill="#185FA5" />
      <path d="M12 9V6" stroke="#185FA5" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="12" cy="4.5" r="1.5" stroke="#185FA5" strokeWidth="1.5" />
      <path d="M8 9V8.5a4 4 0 0 1 8 0V9" stroke="#185FA5" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function ChatIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#185FA5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  )
}

function CogIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#185FA5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  )
}

function RocketIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#185FA5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  )
}

function HeadsetIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
      <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
    </svg>
  )
}

function UserCheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <polyline points="16 11 18 13 22 9" />
    </svg>
  )
}

function CalendarIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  )
}

function FileTextIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <line x1="10" y1="9" x2="8" y2="9" />
    </svg>
  )
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <>
      {/* Global smooth scroll */}
      <style>{`html { scroll-behavior: smooth; }`}</style>

      <div
        className="min-h-screen bg-white text-[#111]"
        style={{ fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}
      >

        {/* ── NAV ──────────────────────────────────────────────────── */}
        <nav className="sticky top-0 z-50 bg-white border-b border-[#e5e5e5]">
          <div className="max-w-5xl mx-auto px-6 flex items-center justify-between h-[56px]">

            <a href="/" className="flex items-center gap-[7px] font-semibold text-[15px] text-[#111] no-underline">
              <RobotIcon size={18} />
              Agently
            </a>

            <div className="hidden md:flex items-center gap-7 text-[13.5px] text-[#555]">
              <a href="#how-it-works" className="hover:text-[#111] transition-colors no-underline">How it works</a>
              <a href="#use-cases" className="hover:text-[#111] transition-colors no-underline">Use cases</a>
              <a href="#pricing" className="hover:text-[#111] transition-colors no-underline">Pricing</a>
            </div>

            <a
              href="#contact"
              className="hidden md:inline-flex text-[13px] font-medium border border-[#e5e5e5] px-4 py-[7px] rounded hover:border-[#185FA5] hover:text-[#185FA5] transition-colors no-underline"
            >
              Get started
            </a>

            {/* Mobile: condensed CTA only */}
            <a
              href="#contact"
              className="md:hidden text-[13px] font-medium no-underline"
              style={{ color: "#185FA5" }}
            >
              Get started
            </a>
          </div>
        </nav>

        {/* ── HERO ─────────────────────────────────────────────────── */}
        <section className="border-b border-[#e5e5e5] py-24 md:py-36">
          <div className="max-w-2xl mx-auto px-6 text-center">

            <div
              className="inline-flex items-center gap-2 border border-[#e5e5e5] px-[14px] py-[5px] rounded-full text-[12px] tracking-wide text-[#888] mb-10"
            >
              ✦ No code. No complexity.
            </div>

            <h1
              className="font-bold tracking-tight leading-[1.1] mb-6"
              style={{ fontSize: "clamp(2.25rem, 5vw, 3.75rem)" }}
            >
              Your AI agents,{" "}
              <span style={{ color: "#185FA5" }}>built and running</span>{" "}
              in days — not months.
            </h1>

            <p className="text-[1.0625rem] leading-relaxed text-[#555] max-w-lg mx-auto mb-10">
              Tell us what you need to automate. We build, deploy, and host your custom AI agent — you just use it.
            </p>

            <div className="flex items-center justify-center gap-3 flex-wrap">
              <a
                href="#contact"
                className="inline-flex items-center bg-[#185FA5] text-white text-[14px] font-medium px-6 py-[10px] rounded hover:bg-[#144d8a] transition-colors no-underline"
              >
                Book a free call →
              </a>
              <a
                href="#use-cases"
                className="inline-flex items-center border border-[#e5e5e5] text-[#444] text-[14px] px-6 py-[10px] rounded hover:border-[#bbb] transition-colors no-underline"
              >
                See examples
              </a>
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS ─────────────────────────────────────────── */}
        <section id="how-it-works" className="border-b border-[#e5e5e5] py-20">
          <div className="max-w-5xl mx-auto px-6">

            <p className="text-[11px] uppercase tracking-[0.18em] text-[#999] mb-14">How it works</p>

            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#e5e5e5]">

              <div className="pb-10 md:pb-0 md:pr-12">
                <span className="block font-mono text-[11px] text-[#ccc] tracking-[0.2em] mb-7">01</span>
                <div className="w-9 h-9 flex items-center justify-center rounded mb-5" style={{ backgroundColor: "#E6F1FB" }}>
                  <ChatIcon />
                </div>
                <h3 className="font-semibold text-[15px] text-[#111] mb-2 tracking-[-0.01em]">Tell us your workflow</h3>
                <p className="text-[13.5px] text-[#666] leading-relaxed">
                  Describe what you want to automate — in plain language, no specs needed.
                </p>
              </div>

              <div className="py-10 md:py-0 md:px-12">
                <span className="block font-mono text-[11px] text-[#ccc] tracking-[0.2em] mb-7">02</span>
                <div className="w-9 h-9 flex items-center justify-center rounded mb-5" style={{ backgroundColor: "#E6F1FB" }}>
                  <CogIcon />
                </div>
                <h3 className="font-semibold text-[15px] text-[#111] mb-2 tracking-[-0.01em]">We build your agent</h3>
                <p className="text-[13.5px] text-[#666] leading-relaxed">
                  Our team designs, trains, and configures your agent on our platform.
                </p>
              </div>

              <div className="pt-10 md:pt-0 md:pl-12">
                <span className="block font-mono text-[11px] text-[#ccc] tracking-[0.2em] mb-7">03</span>
                <div className="w-9 h-9 flex items-center justify-center rounded mb-5" style={{ backgroundColor: "#E6F1FB" }}>
                  <RocketIcon />
                </div>
                <h3 className="font-semibold text-[15px] text-[#111] mb-2 tracking-[-0.01em]">You go live</h3>
                <p className="text-[13.5px] text-[#666] leading-relaxed">
                  Your agent is deployed and hosted. We monitor it. You just watch it work.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── USE CASES ─────────────────────────────────────────────── */}
        <section id="use-cases" className="border-b border-[#e5e5e5] py-20">
          <div className="max-w-5xl mx-auto px-6">

            <p className="text-[11px] uppercase tracking-[0.18em] text-[#999] mb-14">What businesses use it for</p>

            {/* gap-px + parent bg creates hairline 1px separators between cells */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-[#e5e5e5]">

              <div className="bg-white p-8 hover:bg-[#fafafa] transition-colors">
                <div className="w-9 h-9 flex items-center justify-center rounded mb-5" style={{ backgroundColor: "#185FA5" }}>
                  <HeadsetIcon />
                </div>
                <h3 className="font-semibold text-[15px] text-[#111] mb-1 tracking-[-0.01em]">Customer support agent</h3>
                <p className="text-[12px] font-medium mb-3" style={{ color: "#185FA5" }}>Answers questions 24/7</p>
                <p className="text-[13.5px] text-[#666] leading-relaxed">
                  Handles FAQs, tracks orders, and escalates complex issues — without a support team on call.
                </p>
              </div>

              <div className="bg-white p-8 hover:bg-[#fafafa] transition-colors">
                <div className="w-9 h-9 flex items-center justify-center rounded mb-5" style={{ backgroundColor: "#0D9488" }}>
                  <UserCheckIcon />
                </div>
                <h3 className="font-semibold text-[15px] text-[#111] mb-1 tracking-[-0.01em]">Lead qualification agent</h3>
                <p className="text-[12px] font-medium mb-3" style={{ color: "#0D9488" }}>Captures and scores inbound leads</p>
                <p className="text-[13.5px] text-[#666] leading-relaxed">
                  Engages visitors, asks qualifying questions, and routes hot leads directly to your inbox.
                </p>
              </div>

              <div className="bg-white p-8 hover:bg-[#fafafa] transition-colors">
                <div className="w-9 h-9 flex items-center justify-center rounded mb-5" style={{ backgroundColor: "#D97706" }}>
                  <CalendarIcon />
                </div>
                <h3 className="font-semibold text-[15px] text-[#111] mb-1 tracking-[-0.01em]">Booking &amp; scheduling agent</h3>
                <p className="text-[12px] font-medium mb-3" style={{ color: "#D97706" }}>Automates appointments</p>
                <p className="text-[13.5px] text-[#666] leading-relaxed">
                  Lets clients self-book, reschedule, and get reminders — synced to your calendar automatically.
                </p>
              </div>

              <div className="bg-white p-8 hover:bg-[#fafafa] transition-colors">
                <div className="w-9 h-9 flex items-center justify-center rounded mb-5" style={{ backgroundColor: "#7C3AED" }}>
                  <FileTextIcon />
                </div>
                <h3 className="font-semibold text-[15px] text-[#111] mb-1 tracking-[-0.01em]">Document Q&amp;A agent</h3>
                <p className="text-[12px] font-medium mb-3" style={{ color: "#7C3AED" }}>Answers from your own docs</p>
                <p className="text-[13.5px] text-[#666] leading-relaxed">
                  Upload your manuals, policies, or reports. Your agent answers staff or client questions instantly.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── STATS STRIP ───────────────────────────────────────────── */}
        <section className="border-b border-[#e5e5e5]" style={{ backgroundColor: "#F5F5F5" }}>
          <div className="max-w-5xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#e5e5e5]">

              <div className="py-12 px-8 text-center">
                <p className="font-bold text-[#111] tracking-tight mb-1" style={{ fontSize: "clamp(1.75rem, 3vw, 2.25rem)" }}>
                  3 days
                </p>
                <p className="text-[13px] text-[#666]">Average time from brief to live agent</p>
              </div>

              <div className="py-12 px-8 text-center">
                <p className="font-bold text-[#111] tracking-tight mb-1" style={{ fontSize: "clamp(1.75rem, 3vw, 2.25rem)" }}>
                  Zero code
                </p>
                <p className="text-[13px] text-[#666]">Required from your side — ever</p>
              </div>

              <div className="py-12 px-8 text-center">
                <p className="font-bold text-[#111] tracking-tight mb-1" style={{ fontSize: "clamp(1.75rem, 3vw, 2.25rem)" }}>
                  100%
                </p>
                <p className="text-[13px] text-[#666]">Managed hosting, monitoring &amp; updates</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── BOTTOM CTA ────────────────────────────────────────────── */}
        <section id="pricing" className="border-b border-[#e5e5e5] py-24 md:py-32">
          <div className="max-w-lg mx-auto px-6 text-center">
            <h2
              className="font-bold text-[#111] tracking-tight leading-[1.15] mb-5"
              style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)" }}
            >
              Ready to automate your first workflow?
            </h2>
            <p className="text-[15px] text-[#555] leading-relaxed mb-9">
              Book a free 20-minute call. We&apos;ll tell you exactly what&apos;s possible for your business.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center bg-[#185FA5] text-white text-[15px] font-medium px-8 py-[12px] rounded hover:bg-[#144d8a] transition-colors no-underline"
            >
              Book a free call →
            </a>
          </div>
        </section>

        {/* ── FOOTER ────────────────────────────────────────────────── */}
        <footer className="border-t border-[#e5e5e5] py-7">
          <div className="max-w-5xl mx-auto px-6 flex items-center justify-between">
            <a href="/" className="flex items-center gap-[7px] font-semibold text-[14px] text-[#111] no-underline">
              <RobotIcon size={16} />
              Agently
            </a>
            <p className="text-[12px] text-[#999]">© 2026 Agently. All rights reserved.</p>
          </div>
        </footer>

      </div>
    </>
  )
}

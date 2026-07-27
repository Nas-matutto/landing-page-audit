import type { Metadata } from "next"
import { ArrowRight, Mail } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Your AI Agent Demo — Talk to Me Data",
  description:
    "See what your custom AI agent can do, then book your onboarding call.",
  // End-of-funnel page — no reason for search engines to index it.
  robots: { index: false, follow: false },
}

const DEMO_VIDEO_URL =
  process.env.NEXT_PUBLIC_DEMO_VIDEO_URL ?? "https://www.youtube.com/embed/vM5USyYEK1g"

// Inline Cal.com booking embed shown at the top of the page. `embed=true` renders
// the self-contained booking UI (no cal.com chrome); month view + light theme match
// the rest of the onboarding page.
const CAL_EMBED_URL =
  "https://cal.com/nas-mansurali/talk-to-me-data-demo?embed=true&layout=month_view&theme=light"

// Bottom "Book a free call" CTA — opens the booking calendar in a new tab.
const BOOK_CALL_CALENDAR_URL = "https://calendar.app.google/GSeoPp4MKBQC9Xn77"

export default function GetStartedOnboardingPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col items-center px-4 sm:px-6 pb-24">
        <div className="w-full max-w-4xl pt-24 sm:pt-32 animate-in fade-in duration-500">
          <div className="text-center mb-8">
            <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-3">You're all set — last step</p>
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 text-balance mb-3">
              Book your personalized onboarding call below
            </h1>
            <p className="text-slate-500 max-w-md mx-auto">
              Pick a time that works for you — we'll walk through exactly what your AI agent can do, live.
            </p>
          </div>

          {/* Cal.com inline booking embed — open slots shown directly on the page. */}
          <div className="w-full rounded-2xl overflow-hidden shadow-2xl shadow-slate-200 border border-slate-200 bg-white">
            <iframe
              src={CAL_EMBED_URL}
              title="Book your onboarding call — Talk to Me Data"
              className="w-full h-180"
              loading="lazy"
            />
          </div>

          {/* Demo video — does NOT autoplay; the visitor presses play if they want it. */}
          <div className="mt-16 text-center mb-6">
            <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-3">Your agent, in action</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 text-balance">
              Prefer to see it first? Watch the demo
            </h2>
          </div>
          <div className="w-full aspect-video rounded-2xl overflow-hidden shadow-2xl shadow-slate-200 border border-slate-200">
            <iframe
              src={`${DEMO_VIDEO_URL}?rel=0`}
              title="Talk to Me Data — Product Demo"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>

          {/* Post-video CTAs */}
          <div className="mt-16 rounded-3xl bg-linear-to-br from-primary via-blue-600 to-violet-600 relative overflow-hidden px-8 py-14 text-center">
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute -top-16 -right-16 w-64 h-64 bg-violet-400/20 rounded-full blur-3xl" />
              <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-blue-300/15 rounded-full blur-3xl" />
            </div>
            <div className="relative">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 text-balance">
                Ready to talk about your workflow?
              </h2>
              <p className="text-white/70 mb-8 max-w-md mx-auto">
                Book a free 20-minute call and we'll tell you exactly what your agent can do — API costs, integrations, and hosting included.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={BOOK_CALL_CALENDAR_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative overflow-hidden group inline-flex items-center gap-2 bg-white text-primary font-bold px-8 py-4 rounded-xl text-base shadow-2xl shadow-black/20 hover:shadow-black/30 transition-all"
                >
                  <span className="absolute inset-0 bg-linear-to-r from-transparent via-primary/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
                  <span className="relative flex items-center gap-2">
                    Book a free call <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </a>
                <a
                  href="mailto:nas@talktomedata.com"
                  className="inline-flex items-center gap-2 text-white/80 hover:text-white font-semibold text-sm transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  Email a question
                </a>
              </div>
              <p className="text-white/40 text-xs mt-6">Free call · No commitment · Built for you</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

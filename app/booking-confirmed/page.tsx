import { Suspense } from "react"
import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, CalendarCheck, Mail } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BookingConfirmedTracker } from "@/components/booking-confirmed-tracker"

export const metadata: Metadata = {
  title: "Your call is booked — Talk to Me Data",
  description: "Your free 20-minute call is confirmed. Check your inbox for the calendar invite.",
  // Conversion page — reached only after booking, never from search.
  robots: { index: false, follow: false },
}

export default function BookingConfirmedPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      {/* Fires the Meta `Schedule` event. useSearchParams needs a Suspense boundary. */}
      <Suspense fallback={null}>
        <BookingConfirmedTracker />
      </Suspense>

      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 pt-24 sm:pt-32 pb-24">
        <div className="w-full max-w-xl text-center animate-in fade-in duration-500">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-8">
            <CalendarCheck className="w-8 h-8 text-primary" />
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mb-4 text-balance">
            You're booked — see you on the call
          </h1>
          <p className="text-lg text-slate-500 leading-relaxed mb-10">
            A calendar invite with the video call link is on its way to your inbox. Nothing to prepare —
            just come with the workflow you'd like to automate.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/get-started"
              className="relative overflow-hidden group inline-flex items-center justify-center gap-2 bg-linear-to-r from-primary to-violet-500 text-white font-bold text-base px-8 py-4 rounded-xl shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all"
            >
              <span className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
              <span className="relative flex items-center gap-2">
                Watch the demo while you wait
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </Link>
            <a
              href="mailto:nas@talktomedata.com"
              className="inline-flex items-center gap-2 text-slate-500 hover:text-primary font-semibold text-sm transition-colors"
            >
              <Mail className="w-4 h-4" />
              Email a question
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

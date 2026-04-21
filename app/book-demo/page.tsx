"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, CheckCircle2, ChevronLeft } from "lucide-react"
import { Header } from "@/components/header"

const BENEFITS = [
  "See live demo of job posting & review signals",
  "Get a list of companies using any competitor tool",
  "Understand pricing & what's included",
  "Ask questions before committing to anything",
]

export default function BookDemoPage() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    role: "",
    tools: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.company) return
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="pt-24 sm:pt-32 pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-primary transition-colors mb-10"
            >
              <ChevronLeft className="w-4 h-4" />
              Back to home
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              {/* Left: Copy */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/8 border border-primary/15 text-primary text-xs font-semibold tracking-widest uppercase mb-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  Early access
                </div>

                <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 mb-5 text-balance">
                  See TTMD in action
                </h1>
                <p className="text-lg text-slate-500 leading-relaxed mb-10">
                  We're onboarding a select group of sales teams. Book a 20-minute demo to see exactly how signal-based prospecting works — and whether it's right for your workflow.
                </p>

                <ul className="space-y-4 mb-10">
                  {BENEFITS.map((b, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + i * 0.08, duration: 0.4 }}
                      className="flex items-start gap-3"
                    >
                      <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                      </div>
                      <span className="text-sm text-slate-700 leading-relaxed">{b}</span>
                    </motion.li>
                  ))}
                </ul>

                <div className="p-5 rounded-2xl bg-linear-to-br from-primary/5 to-violet-50 border border-primary/10">
                  <p className="text-sm font-semibold text-slate-800 mb-1">Limited availability</p>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    We're keeping early access small to ensure every customer gets proper onboarding. Spots fill up fast — book yours now.
                  </p>
                </div>
              </motion.div>

              {/* Right: Form */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
              >
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    className="rounded-2xl border border-primary/20 bg-primary/5 p-10 text-center"
                  >
                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5">
                      <CheckCircle2 className="w-7 h-7 text-primary" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-3">You're on the list</h2>
                    <p className="text-slate-500 text-sm leading-relaxed mb-6">
                      Thanks, {form.name.split(" ")[0]}. We'll reach out to {form.email} within 24 hours to schedule your demo.
                    </p>
                    <Link
                      href="/"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
                    >
                      Back to home <ArrowRight className="w-4 h-4" />
                    </Link>
                  </motion.div>
                ) : (
                  <form
                    onSubmit={handleSubmit}
                    className="rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-100/80 p-8"
                  >
                    <h2 className="text-xl font-bold text-slate-900 mb-6">Request your demo</h2>

                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                            Full name <span className="text-primary">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            value={form.name}
                            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                            placeholder="Alex Johnson"
                            className="w-full px-3.5 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all placeholder:text-slate-400"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                            Work email <span className="text-primary">*</span>
                          </label>
                          <input
                            type="email"
                            required
                            value={form.email}
                            onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                            placeholder="alex@company.com"
                            className="w-full px-3.5 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all placeholder:text-slate-400"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                          Company <span className="text-primary">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={form.company}
                          onChange={e => setForm(f => ({ ...f, company: e.target.value }))}
                          placeholder="Your company name"
                          className="w-full px-3.5 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all placeholder:text-slate-400"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                          Your role
                        </label>
                        <select
                          value={form.role}
                          onChange={e => setForm(f => ({ ...f, role: e.target.value }))}
                          className="w-full px-3.5 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all text-slate-700 bg-white cursor-pointer"
                        >
                          <option value="">Select your role</option>
                          <option>Founder / CEO</option>
                          <option>Head of Sales</option>
                          <option>Sales Rep / AE</option>
                          <option>RevOps / Sales Ops</option>
                          <option>Marketing</option>
                          <option>Other</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                          Which tools are your prospects using? (optional)
                        </label>
                        <input
                          type="text"
                          value={form.tools}
                          onChange={e => setForm(f => ({ ...f, tools: e.target.value }))}
                          placeholder="e.g. HubSpot, Salesforce, Notion..."
                          className="w-full px-3.5 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all placeholder:text-slate-400"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="relative mt-6 w-full overflow-hidden group rounded-xl py-3.5 text-sm font-bold text-white bg-linear-to-r from-primary to-violet-500 shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:shadow-xl transition-all cursor-pointer"
                    >
                      <span className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
                      <span className="relative flex items-center justify-center gap-2">
                        Book my demo
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </button>

                    <p className="text-center text-xs text-slate-400 mt-4">
                      No spam. We'll only email you about your demo.
                    </p>
                  </form>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

"use client"

import { motion } from "framer-motion"
import { Search, Building2, Send } from "lucide-react"

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Search a competitor's tool",
    description: "Type in any SaaS product — HubSpot, Salesforce, Notion, Linear, whatever your prospect might already be using.",
    terminal: [
      { prompt: "$", cmd: 'search --tool "HubSpot"' },
      { out: "Scanning job postings..." },
      { out: "Parsing G2 reviews..." },
      { out: "Cross-referencing Capterra..." },
    ],
  },
  {
    number: "02",
    icon: Building2,
    title: "Get a verified company list",
    description: "We surface companies with real evidence — a job description mentioning the tool, or a review from one of their employees.",
    terminal: [
      { out: "Found 247 companies using HubSpot" },
      { out: "" },
      { out: "→ Acme Corp         (4 signals)" },
      { out: "→ TechFlow Inc      (2 signals)" },
      { out: "→ GrowthLab         (3 signals)" },
      { out: "→ ... 244 more" },
    ],
  },
  {
    number: "03",
    icon: Send,
    title: "Reach out with real context",
    description: "Know exactly what tools your prospect uses before you send a single word. Reference their stack, address their pain points, close more deals.",
    terminal: [
      { out: 'Hey Sarah,' },
      { out: '' },
      { out: "Saw Acme is hiring for a" },
      { out: `"HubSpot admin" role — sounds` },
      { out: `like you're scaling fast.` },
      { out: '' },
      { out: 'We help teams like yours...' },
    ],
  },
]

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-24 sm:py-32 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-4">How it works</p>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-balance">
              Three steps to warmer outreach
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="relative"
              >
                {/* Connector line */}
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-px bg-linear-to-r from-primary/30 to-transparent -translate-y-1/2 z-0" style={{ width: "calc(100% - 4rem)", left: "calc(100% - 2rem)" }} />
                )}

                <div className="relative z-10 bg-white rounded-2xl border border-slate-200 p-6 h-full flex flex-col shadow-sm hover:shadow-md transition-shadow">
                  {/* Step number + icon */}
                  <div className="flex items-center gap-3 mb-5">
                    <span className="text-4xl font-black text-slate-100 leading-none select-none">{step.number}</span>
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <step.icon className="w-5 h-5 text-primary" />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-slate-800 mb-2">{step.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed mb-5">{step.description}</p>

                  {/* Terminal preview */}
                  <div className="mt-auto rounded-xl bg-slate-900 p-4 font-mono text-xs overflow-hidden">
                    <div className="flex gap-1.5 mb-3">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                    </div>
                    {step.terminal.map((line, j) => (
                      <div key={j} className="leading-relaxed">
                        {"prompt" in line ? (
                          <span>
                            <span className="text-green-400">{line.prompt} </span>
                            <span className="text-slate-200">{line.cmd}</span>
                          </span>
                        ) : (
                          <span className="text-slate-400">{line.out || " "}</span>
                        )}
                      </div>
                    ))}
                    <span className="inline-block w-1.5 h-3.5 bg-slate-400 ml-0.5 animate-pulse" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

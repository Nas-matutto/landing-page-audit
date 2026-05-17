"use client"

import { motion } from "framer-motion"
import { MessageSquare, Settings, Rocket } from "lucide-react"

const steps = [
  {
    number: "01",
    icon: MessageSquare,
    title: "Tell us your workflow",
    description: "Describe what you want to automate — in plain language, no specs needed.",
    terminal: [
      { prompt: "$", cmd: "describe your workflow" },
      { out: "> What do you want to automate?" },
      { out: "You: Handle customer support emails" },
      { out: "> Any specific tools or channels?" },
      { out: "You: Gmail + Zendesk" },
      { out: "> Got it. We'll build that." },
    ],
  },
  {
    number: "02",
    icon: Settings,
    title: "We build your agent",
    description: "Our team designs, trains, and configures your agent on our platform.",
    terminal: [
      { out: "Building your agent..." },
      { out: "" },
      { out: "✓ Workflow mapped" },
      { out: "✓ Agent configured" },
      { out: "✓ Connected to Gmail + Zendesk" },
      { out: "✓ Testing responses..." },
      { out: "✓ Agent ready" },
    ],
  },
  {
    number: "03",
    icon: Rocket,
    title: "You go live",
    description: "Your agent is deployed and hosted. We monitor it. You just watch it work.",
    terminal: [
      { out: "agent status: live ✓" },
      { out: "" },
      { out: "→ 24 tickets handled today" },
      { out: "→ 92% resolved automatically" },
      { out: "→ 3 escalated to your team" },
      { out: "" },
      { out: "Uptime: 99.9%" },
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
              Three steps to your first AI agent
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

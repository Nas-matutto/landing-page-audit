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
    <section id="how-it-works" className="border-y border-hairline bg-mist py-24 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <p className="eyebrow mb-5">How it works</p>
            <h2 className="display text-[clamp(2rem,4.5vw,3.25rem)]">
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
                {/* Connector line — the steps are a real sequence, so the rule
                    between them carries order rather than decoration. */}
                {i < steps.length - 1 && (
                  <div className="absolute top-8 z-0 hidden h-px w-full -translate-y-1/2 bg-hairline lg:block" style={{ width: "calc(100% - 4rem)", left: "calc(100% - 2rem)" }} />
                )}

                <div className="relative z-10 flex h-full flex-col rounded-3xl border border-hairline bg-white p-6">
                  {/* Step number + icon */}
                  <div className="mb-5 flex items-center gap-3">
                    <span className="select-none font-mono text-2xl font-medium leading-none text-faint">{step.number}</span>
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-hairline">
                      <step.icon className="h-4.5 w-4.5 text-ink" />
                    </div>
                  </div>

                  <h3 className="mb-2 text-lg font-semibold tracking-[-0.01em] text-ink">{step.title}</h3>
                  <p className="mb-5 text-sm leading-relaxed text-quiet">{step.description}</p>

                  {/* Terminal preview */}
                  <div className="mt-auto overflow-hidden rounded-2xl bg-ink p-4 font-mono text-xs">
                    <div className="mb-3 flex gap-1.5">
                      <div className="h-2.5 w-2.5 rounded-full bg-white/20" />
                      <div className="h-2.5 w-2.5 rounded-full bg-white/20" />
                      <div className="h-2.5 w-2.5 rounded-full bg-white/20" />
                    </div>
                    {step.terminal.map((line, j) => (
                      <div key={j} className="leading-relaxed">
                        {"prompt" in line ? (
                          <span>
                            <span className="text-white/40">{line.prompt} </span>
                            <span className="text-white">{line.cmd}</span>
                          </span>
                        ) : (
                          <span className="text-white/55">{line.out || " "}</span>
                        )}
                      </div>
                    ))}
                    <span className="ml-0.5 inline-block h-3.5 w-1.5 animate-pulse bg-white/50" />
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

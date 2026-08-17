"use client"

import { motion } from "framer-motion"
import { Shield, Activity, Settings2, LayoutDashboard, RefreshCw, Plug } from "lucide-react"

const HOSTING_FEATURES = [
  {
    icon: LayoutDashboard,
    title: "One dashboard for all agents",
    description: "See every agent you run in one place — their status, activity, and recent conversations. No logging into multiple tools.",
  },
  {
    icon: Activity,
    title: "Real-time monitoring",
    description: "We watch your agents around the clock. If something behaves unexpectedly, we catch it and fix it before you notice.",
  },
  {
    icon: RefreshCw,
    title: "Automatic updates",
    description: "As AI models improve, your agents improve too. We handle all updates and retraining — nothing for you to manage.",
  },
  {
    icon: Shield,
    title: "Secure by default",
    description: "Your data stays yours. Agents run in isolated environments, and we never share or train on your business data.",
  },
  {
    icon: Settings2,
    title: "Changes on request",
    description: "Need to tweak how your agent responds or expand what it does? Just tell us — we handle the update and redeploy.",
  },
  {
    icon: Plug,
    title: "No infrastructure required",
    description: "No servers, no APIs to maintain, no DevOps overhead. We host everything so you can focus entirely on your business.",
  },
]

export function AgentHostingSection() {
  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Left: copy */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <p className="eyebrow mb-5">Managed hosting</p>
              <h2 className="display mb-6 text-[clamp(2rem,4.5vw,3.25rem)]">
                Your agents run on our infrastructure
              </h2>
              <p className="lede mb-8 text-lg">
                You don't need a server, a developer, or an IT team. Once your agent is live, we handle everything - hosting, monitoring, updates, and support. You just use it.
              </p>

              {/* Platform preview card */}
              <div className="rounded-3xl border border-hairline bg-white p-6">
                <div className="mb-5 flex items-center justify-between">
                  <span className="text-sm font-semibold text-ink">Your agents</span>
                  <span className="eyebrow">Live</span>
                </div>
                <div className="space-y-3">
                  {[
                    { name: "Customer support agent", status: "Active", handled: "142 conversations today" },
                    { name: "Lead qualification agent", status: "Active", handled: "38 leads scored today" },
                    { name: "Booking agent", status: "Active", handled: "17 appointments booked" },
                  ].map((agent, i) => (
                    <div key={i} className="flex items-center justify-between rounded-2xl bg-mist px-4 py-3">
                      <div>
                        <p className="text-xs font-semibold text-ink">{agent.name}</p>
                        <p className="mt-0.5 text-[11px] text-faint">{agent.handled}</p>
                      </div>
                      <span className="flex items-center gap-1.5 text-[11px] font-semibold text-quiet">
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-ink" />
                        {agent.status}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex items-center justify-between border-t border-hairline pt-4">
                  <span className="text-xs text-faint">All agents monitored 24/7</span>
                  <span className="text-xs font-semibold text-ink">Uptime: 99.9%</span>
                </div>
              </div>
            </motion.div>

            {/* Right: feature grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {HOSTING_FEATURES.map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="rounded-3xl border border-hairline bg-white p-5 transition-colors hover:bg-mist"
                >
                  <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-full border border-hairline">
                    <feature.icon className="h-4 w-4 text-ink" />
                  </div>
                  <h3 className="mb-1.5 text-sm font-semibold text-ink">{feature.title}</h3>
                  <p className="text-xs leading-relaxed text-quiet">{feature.description}</p>
                </motion.div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}

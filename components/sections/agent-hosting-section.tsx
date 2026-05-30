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
    <section className="py-24 sm:py-32 bg-slate-50">
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
              <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-4">Managed hosting</p>
              <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-balance mb-6">
                Your agents run on{" "}
                <span className="bg-clip-text text-transparent bg-linear-to-r from-primary to-violet-500">
                  our infrastructure
                </span>
              </h2>
              <p className="text-lg text-slate-500 leading-relaxed mb-8">
                You don't need a server, a developer, or an IT team. Once your agent is live, we handle everything - hosting, monitoring, updates, and support. You just use it.
              </p>

              {/* Platform preview card */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between mb-5">
                  <span className="text-sm font-bold text-slate-800">Your agents</span>
                  <span className="text-xs text-slate-400">Live</span>
                </div>
                <div className="space-y-3">
                  {[
                    { name: "Customer support agent", status: "Active", handled: "142 conversations today" },
                    { name: "Lead qualification agent", status: "Active", handled: "38 leads scored today" },
                    { name: "Booking agent", status: "Active", handled: "17 appointments booked" },
                  ].map((agent, i) => (
                    <div key={i} className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
                      <div>
                        <p className="text-xs font-semibold text-slate-700">{agent.name}</p>
                        <p className="text-[11px] text-slate-400 mt-0.5">{agent.handled}</p>
                      </div>
                      <span className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        {agent.status}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-400">All agents monitored 24/7</span>
                  <span className="text-xs font-semibold text-primary">Uptime: 99.9%</span>
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
                  className="rounded-2xl border border-slate-200 bg-white p-5 hover:shadow-md transition-shadow"
                >
                  <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                    <feature.icon className="w-4.5 h-4.5 text-primary" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-800 mb-1.5">{feature.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}

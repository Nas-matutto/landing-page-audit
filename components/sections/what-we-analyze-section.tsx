"use client"

import { motion } from "framer-motion"
import { Briefcase, MessageSquare, Star, Hash } from "lucide-react"

const JOB_EXAMPLES = [
  {
    role: "Sales Operations Manager",
    company: "Vertex Systems",
    snippet: "...3+ years of experience with **Salesforce** CRM. Familiarity with HubSpot is a plus...",
    signals: ["Salesforce", "HubSpot"],
  },
  {
    role: "Sr. Software Engineer",
    company: "Orbit CRM",
    snippet: "...our stack includes **Linear** for project tracking and **Notion** for documentation...",
    signals: ["Linear", "Notion"],
  },
  {
    role: "Head of Growth",
    company: "Meridian SaaS",
    snippet: "...you'll own our **Intercom** setup and work with **Mixpanel** for funnel analytics...",
    signals: ["Intercom", "Mixpanel"],
  },
]

const UGC_EXAMPLES = [
  {
    source: "G2",
    icon: Star,
    reviewer: "VP of Sales, TechFlow Inc",
    snippet: "We've been using **HubSpot** for 2 years. The CRM is solid but the reporting is...",
    signals: ["HubSpot"],
    color: "text-orange-500",
    bg: "bg-orange-50",
  },
  {
    source: "Reddit",
    icon: Hash,
    reviewer: "r/salesforce · 234 upvotes",
    snippet: "Anyone else migrating from **Salesforce** to **Pipedrive**? We just finished the switch and...",
    signals: ["Salesforce", "Pipedrive"],
    color: "text-blue-500",
    bg: "bg-blue-50",
  },
  {
    source: "Capterra",
    icon: MessageSquare,
    reviewer: "Operations Lead, GrowthLab",
    snippet: "Switched to **Monday.com** after trying Asana and Jira. The integrations with **Slack** are...",
    signals: ["Monday.com", "Slack"],
    color: "text-green-500",
    bg: "bg-green-50",
  },
]

function HighlightedText({ text }: { text: string }) {
  const parts = text.split(/\*\*(.*?)\*\*/g)
  return (
    <span>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <span key={i} className="font-semibold text-primary bg-primary/8 px-0.5 rounded">
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </span>
  )
}

export function WhatWeAnalyzeSection() {
  return (
    <section id="signals" className="py-24 sm:py-32 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-4">Signal sources</p>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-balance">
              Where we find the signals
            </h2>
            <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto">
              Companies reveal their tech stack constantly — in the jobs they post and the reviews they write. We read all of it so you don't have to.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Job Postings */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-800">Job Postings</h3>
                  <p className="text-xs text-slate-500">Greenhouse · Lever · Ashby · Workable</p>
                </div>
              </div>
              <p className="text-sm text-slate-500 mb-5 leading-relaxed">
                Job descriptions are goldmines. When a company hires for "Salesforce Admin" or lists "HubSpot experience required", they're telling you exactly what they use.
              </p>
              <div className="space-y-3">
                {JOB_EXAMPLES.map((ex, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    className="rounded-xl border border-slate-200 bg-slate-50 p-4"
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <p className="text-sm font-semibold text-slate-800">{ex.role}</p>
                        <p className="text-xs text-slate-500 font-mono">{ex.company}</p>
                      </div>
                      <div className="flex gap-1 shrink-0">
                        {ex.signals.map(s => (
                          <span key={s} className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">{s}</span>
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed italic">
                      "<HighlightedText text={ex.snippet} />"
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* UGC Signals */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-violet-600" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-800">Reviews & Community</h3>
                  <p className="text-xs text-slate-500">G2 · Capterra · Reddit · Product Hunt</p>
                </div>
              </div>
              <p className="text-sm text-slate-500 mb-5 leading-relaxed">
                When employees write reviews or discuss tools online, they name the products they use. We parse these mentions to confirm adoption — and sometimes catch who's unhappy with a competitor.
              </p>
              <div className="space-y-3">
                {UGC_EXAMPLES.map((ex, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    className="rounded-xl border border-slate-200 bg-slate-50 p-4"
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${ex.bg} ${ex.color}`}>
                          <ex.icon className="w-3 h-3" />
                          {ex.source}
                        </span>
                        <p className="text-xs text-slate-500">{ex.reviewer}</p>
                      </div>
                      <div className="flex gap-1 shrink-0">
                        {ex.signals.map(s => (
                          <span key={s} className="text-xs bg-violet-100 text-violet-700 px-2 py-0.5 rounded-full font-medium">{s}</span>
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed italic">
                      "<HighlightedText text={ex.snippet} />"
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

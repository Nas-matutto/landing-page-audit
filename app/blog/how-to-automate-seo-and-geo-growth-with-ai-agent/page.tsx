"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Calendar, Clock, ArrowLeft, ArrowRight, ChevronDown, Search, TrendingUp, Sparkles, Repeat } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const faqs = [
  {
    q: "What is the difference between SEO and GEO?",
    a: "SEO (search engine optimization) is about ranking in traditional search results like Google's blue links. GEO (generative engine optimization) is about being cited and quoted inside AI answers — Google's AI Overviews, ChatGPT, Perplexity, and Gemini. They overlap, but GEO rewards clear, well-structured, citable content that an AI can lift and attribute to you. The agent is trained to optimize for both at once.",
  },
  {
    q: "How does the agent connect to my Google Search Console?",
    a: "We connect it to your Google Search Console property through Google's official API during onboarding — read-only. From then on the agent can pull your real clicks, impressions, average position, and query-level data whenever it runs, so every recommendation is based on your actual performance rather than generic best practices.",
  },
  {
    q: "Does the agent publish content automatically, or do I approve it first?",
    a: "Both modes are supported. You can run it in a review-first mode where every draft lands in your inbox or CMS as a draft for approval, or in full autopilot where it writes and publishes on a schedule. Most clients start in review mode and switch specific content types to autopilot once they trust the output.",
  },
  {
    q: "How often does the agent run?",
    a: "On demand whenever you ask it, and on a recurring schedule — typically a weekly run that re-pulls your Search Console data, refreshes its list of opportunities, and produces new or updated content. You set the cadence.",
  },
  {
    q: "What CMS or publishing platforms does it work with?",
    a: "It publishes into most common stacks — WordPress, Webflow, Ghost, Shopify blogs, or a headless CMS via API. If you have a custom setup, we wire the publishing step to your platform during the build.",
  },
  {
    q: "Can Talk to Me Data build and host this agent for me?",
    a: "Yes. We build, connect, and host the SEO and GEO agent on our infrastructure — the Search Console integration, the model access, the training on your brand and SEO/GEO best practices, and the publishing connection — so there is nothing to set up on your side.",
  },
]

function FAQ() {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <div className="space-y-3">
      {faqs.map((faq, i) => (
        <div key={i} className="border-2 border-border rounded-xl overflow-hidden">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full p-5 text-left flex items-center justify-between hover:bg-muted/40 transition-colors cursor-pointer"
          >
            <span className="font-semibold text-foreground pr-4 text-sm">{faq.q}</span>
            <ChevronDown className={`w-4 h-4 text-primary shrink-0 transition-transform ${open === i ? "rotate-180" : ""}`} />
          </button>
          {open === i && (
            <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed border-t border-border pt-4">
              {faq.a}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

function CtaButtons({ variant = "light" }: { variant?: "light" | "dark" }) {
  if (variant === "dark") {
    return (
      <div className="flex flex-col sm:flex-row gap-3">
        <Link href="/get-started" className="inline-flex items-center justify-center gap-2 bg-white text-primary font-semibold text-sm px-6 py-3 rounded-xl hover:bg-white/90 transition-colors">
          Get Started <ArrowRight className="w-4 h-4" />
        </Link>
        <Link href="/agents/seo-geo" className="inline-flex items-center justify-center gap-2 border border-white/40 bg-white/10 text-white font-semibold text-sm px-6 py-3 rounded-xl hover:bg-white/20 transition-colors backdrop-blur-sm">
          <Sparkles className="w-4 h-4" /> Learn More
        </Link>
      </div>
    )
  }
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <Link href="/get-started" className="inline-flex items-center justify-center gap-2 bg-linear-to-r from-primary to-violet-500 text-white font-semibold text-sm px-6 py-3 rounded-xl hover:opacity-90 transition-opacity">
        Get Started <ArrowRight className="w-4 h-4" />
      </Link>
      <Link href="/agents/seo-geo" className="inline-flex items-center justify-center gap-2 border border-slate-300 text-foreground font-semibold text-sm px-6 py-3 rounded-xl hover:border-primary hover:text-primary transition-colors">
        <Sparkles className="w-4 h-4" /> Learn More
      </Link>
    </div>
  )
}

export default function AutomateSeoGeoPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-32 sm:pt-40 pb-16 sm:pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">

            <Link href="/blog" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 group">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>Back to Blog</span>
            </Link>

            <article>
              <div className="mb-10">
                <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-semibold rounded-full">AI Agents</span>
                <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mt-5 mb-5 leading-tight text-slate-900">
                  How to Automate SEO and GEO Growth With an AI Agent
                </h1>
                <div className="flex items-center gap-6 text-muted-foreground text-sm">
                  <div className="flex items-center gap-2"><Calendar className="w-4 h-4" /><span>July 17, 2026</span></div>
                  <div className="flex items-center gap-2"><Clock className="w-4 h-4" /><span>11 min read</span></div>
                </div>
              </div>

              {/* Hero image */}
              <div className="mb-10 rounded-2xl overflow-hidden border border-slate-200">
                <Image
                  src="/blog/Google_Search_Console_Ggraph_GEO.png"
                  alt="Google Search Console clicks and impressions climbing after an AI SEO and GEO agent takes over"
                  width={1200}
                  height={630}
                  className="w-full h-auto"
                  priority
                />
              </div>

              <div className="prose prose-lg max-w-none">
                <div className="space-y-6 text-muted-foreground leading-relaxed">

                  <p>
                    Most businesses know they should be doing SEO. Far fewer actually keep up with it. Ranking higher means constantly reading your <a href="https://search.google.com/search-console/about" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google Search Console</a> data, spotting the queries where you're close to page one, writing content that targets them, and publishing it consistently — week after week. It's not hard work so much as relentless work, and it's the first thing that slips when the team gets busy.
                  </p>
                  <p>
                    This guide shows you how to hand that entire loop to an AI agent. The agent reads your Search Console insights, finds the keywords where you can realistically rank higher, is trained on both SEO and GEO best practices so the content it writes is built to rank, and then writes and publishes that content on autopilot — on request or automatically every week. The result is the kind of steady climb you see in the chart above: more impressions, more clicks, better positions, without you touching a spreadsheet.
                  </p>

                  {/* TL;DR */}
                  <div className="bg-primary/8 border-l-4 border-primary p-6 my-8 rounded-r-lg">
                    <h3 className="text-xl font-bold text-foreground mb-3">TL;DR</h3>
                    <ul className="list-disc pl-6 space-y-2 text-foreground">
                      <li>The agent connects to your Google Search Console and reads your real clicks, impressions, average position, and query data</li>
                      <li>It finds opportunities — queries where you rank on page two, high-impression low-click pages, and content gaps</li>
                      <li>It's trained on SEO <em>and</em> GEO (generative engine optimization), so content is built to rank in Google <strong>and</strong> get cited in AI answers</li>
                      <li>It pulls data on request or automatically every week, and refreshes its list of opportunities each run</li>
                      <li>It writes and publishes optimized content on autopilot — review-first or fully hands-off</li>
                      <li>Talk to Me Data builds, connects, and hosts the whole thing for you</li>
                    </ul>
                  </div>

                  <h2 className="text-3xl font-bold text-foreground mt-12 mb-4">Why SEO and GEO Are Hard to Keep Up With</h2>
                  <p>
                    Search visibility is a compounding asset, but only if you feed it consistently. The problem is that doing it properly is a chain of small, repetitive jobs: export the Search Console data, find the queries sitting at positions 8–20 where a small push could reach page one, check which pages get impressions but almost no clicks, decide what to write, actually write it well, optimize it, and publish it. Miss a few weeks and the momentum stalls.
                  </p>
                  <p>
                    On top of that, the target moved. Search is no longer just ten blue links. A growing share of queries now get answered directly by <strong>generative engines</strong> — Google's AI Overviews, ChatGPT, Perplexity, and Gemini — that read the web, synthesize an answer, and cite a handful of sources. Optimizing to be one of those cited sources is a discipline of its own: <strong>GEO, or generative engine optimization</strong>. If you're only writing for classic SEO, you're leaving the fastest-growing surface of search on the table. New to the concept of agents doing this kind of work? Our primer on <Link href="/blog/what-are-ai-agents" className="text-primary hover:underline">what AI agents actually are</Link> is a good starting point.
                  </p>

                  <h2 className="text-3xl font-bold text-foreground mt-12 mb-4">How the SEO &amp; GEO Agent Works</h2>
                  <p>
                    The agent that powers <Link href="/agents/seo-geo" className="text-primary hover:underline">Talk to Me Data's SEO &amp; GEO automation</Link> runs a simple loop: read the data, find the opportunities, write to rank, and publish. Here's each step.
                  </p>

                  <div className="my-6 space-y-5">
                    <div className="border-l-4 border-primary pl-6 bg-primary/5 p-5 rounded-r-xl">
                      <div className="flex items-center gap-2 mb-2">
                        <Search className="w-4 h-4 text-primary" />
                        <h4 className="text-base font-bold text-foreground">Step 1 — Analyze your Search Console insights</h4>
                      </div>
                      <p className="text-sm">The agent connects to your Google Search Console and pulls the numbers that matter: total clicks, impressions, average CTR, and average position, right down to the individual query and page. It reads the trend, not just the snapshot, so it understands what's gaining traction and what's slipping.</p>
                    </div>
                    <div className="border-l-4 border-primary pl-6 bg-primary/5 p-5 rounded-r-xl">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="w-4 h-4 text-primary" />
                        <h4 className="text-base font-bold text-foreground">Step 2 — Find opportunities to rank higher</h4>
                      </div>
                      <p className="text-sm">From that data it surfaces the highest-leverage moves: "striking distance" queries sitting on page two that a focused piece could push onto page one, pages with high impressions but a weak click-through rate that need a better title or intro, keyword clusters you have authority on but haven't fully covered, and questions your audience asks that no page answers yet.</p>
                    </div>
                    <div className="border-l-4 border-primary pl-6 bg-primary/5 p-5 rounded-r-xl">
                      <div className="flex items-center gap-2 mb-2">
                        <Sparkles className="w-4 h-4 text-primary" />
                        <h4 className="text-base font-bold text-foreground">Step 3 — Write content built to rank (SEO + GEO)</h4>
                      </div>
                      <p className="text-sm">The agent is trained on your brand voice and on current SEO and GEO best practices, so it doesn't just write — it writes to rank. That means proper search intent matching, clean heading structure, internal links, and schema for classic SEO, plus the clear, quotable, well-sourced formatting that gets content cited inside AI Overviews and answer engines for GEO.</p>
                    </div>
                    <div className="border-l-4 border-primary pl-6 bg-primary/5 p-5 rounded-r-xl">
                      <div className="flex items-center gap-2 mb-2">
                        <Repeat className="w-4 h-4 text-primary" />
                        <h4 className="text-base font-bold text-foreground">Step 4 — Publish on autopilot</h4>
                      </div>
                      <p className="text-sm">Finally it publishes — straight into your CMS as a draft for review, or fully hands-off on a schedule. Run it on demand when you want a push, or let the weekly run re-pull your data, refresh the opportunity list, and ship new content without anyone lifting a finger.</p>
                    </div>
                  </div>

                  {/* How the agent accesses your data — with mid image */}
                  <h2 className="text-3xl font-bold text-foreground mt-12 mb-4">How the Agent Accesses Your Data to Make Informed Decisions</h2>
                  <p>
                    The reason the output is useful — instead of generic AI filler — is that the agent works from your real numbers. During onboarding we connect it to your Google Search Console property through Google's official API, read-only. From then on, every time it runs it reaches into your live data and analyzes your actual performance before it decides what to write.
                  </p>

                  <div className="my-8 rounded-2xl overflow-hidden border border-slate-200">
                    <Image
                      src="/blog/Agent_analyzing_website_SEO.png"
                      alt="An AI agent extracting website performance data from Google Search Console — total clicks, impressions, average CTR, and average position"
                      width={1200}
                      height={630}
                      className="w-full h-auto"
                    />
                  </div>

                  <p>
                    Because the decisions are grounded in your own clicks, impressions, and positions, the agent isn't guessing at what "good SEO content" looks like in the abstract. It knows which of <em>your</em> queries are close to breaking through, which of <em>your</em> pages are underperforming their impressions, and where <em>your</em> next piece of content will move the needle. That's the difference between an AI that produces words and an agent that produces growth.
                  </p>

                  {/* Mid-article CTA */}
                  <div className="my-12 rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
                    <div className="bg-linear-to-r from-primary to-violet-500 px-8 py-5">
                      <p className="text-white/80 text-xs font-semibold uppercase tracking-widest mb-1">Put it to work</p>
                      <h3 className="text-xl font-bold text-white">Let an agent read your Search Console and grow your rankings.</h3>
                    </div>
                    <div className="bg-white px-8 py-6">
                      <p className="text-foreground mb-5 leading-relaxed text-sm">
                        We build, connect, and host the SEO &amp; GEO agent for your site — trained on your brand and wired to your Search Console and CMS. Start now, or learn more about the agent first.
                      </p>
                      <CtaButtons variant="light" />
                    </div>
                  </div>

                  <h2 className="text-3xl font-bold text-foreground mt-12 mb-4">On Request, or Automatically Every Week</h2>
                  <p>
                    You don't have to choose between control and consistency. Ask the agent for a data pull or a new article whenever you want one — "show me this month's striking-distance keywords" or "write a piece targeting the queries we're losing clicks on" — and it responds on demand. Or set a schedule and let the weekly run handle it: re-pull the Search Console data, recompute the opportunities, and produce fresh content while you focus on the business.
                  </p>
                  <p>
                    Over time this is what drives the compounding curve. A steady weekly cadence of data-informed, well-optimized content is exactly what search engines and generative engines reward — and exactly what most teams can't sustain by hand.
                  </p>

                  <h2 className="text-3xl font-bold text-foreground mt-12 mb-4">Why GEO Matters as Much as SEO Now</h2>
                  <p>
                    Ranking a blue link is still valuable, but more and more journeys now start — and sometimes end — inside an AI answer. When someone asks ChatGPT, Perplexity, or Google's AI Overview a question in your space, the engine reads the web and cites a few sources. Being one of those cited sources puts your brand in front of the user at the exact moment of intent, often above the traditional results.
                  </p>
                  <p>
                    GEO is how you earn those citations: clear answers near the top of the page, well-structured headings, factual and sourced claims, and formatting an AI can lift cleanly and attribute. Because the agent is trained on both disciplines, every piece it writes is built to do double duty — rank in classic search and get quoted by the answer engines — so you compound visibility on both surfaces at once.
                  </p>

                  <h2 className="text-3xl font-bold text-foreground mt-12 mb-4">Frequently Asked Questions</h2>
                </div>
              </div>

              {/* FAQ */}
              <div className="my-6">
                <FAQ />
              </div>

              <div className="prose prose-lg max-w-none">
                <div className="space-y-6 text-muted-foreground leading-relaxed">

                  <h2 className="text-3xl font-bold text-foreground mt-12 mb-4">Summary</h2>
                  <p>
                    Keeping up with SEO and GEO by hand means endlessly reading Search Console, hunting for opportunities, writing to rank, and publishing on a schedule — the kind of relentless routine that quietly falls behind. An AI agent closes that loop. It reads your real search data, finds the queries where you can climb, writes content trained on SEO and GEO best practices, and publishes it on request or automatically every week.
                  </p>
                  <p>
                    If you'd rather not wire any of it up yourself, we build, connect, and host the whole agent for you — grounded in your own data from day one.
                  </p>

                  {/* Final CTA */}
                  <div className="my-12 rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
                    <div
                      className="relative px-8 py-10"
                      style={{
                        background: "linear-gradient(135deg, #185FA5, #2563eb, #7c3aed)",
                        backgroundImage: "linear-gradient(135deg, #185FA5, #2563eb, #7c3aed), radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)",
                        backgroundSize: "100% 100%, 24px 24px",
                      }}
                    >
                      <h3 className="text-2xl font-bold text-white mb-3">Want the SEO &amp; GEO agent built for your business?</h3>
                      <p className="text-white/80 mb-6 leading-relaxed max-w-xl text-sm">
                        We build, deploy, and host an AI agent that reads your Google Search Console, finds ranking opportunities, and writes and publishes optimized content on autopilot. Get started, or learn more about the agent.
                      </p>
                      <CtaButtons variant="dark" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Related */}
              <div className="mt-12 pt-8 border-t border-border">
                <h3 className="text-lg font-bold text-foreground mb-5">Related reading</h3>
                <div className="space-y-3">
                  <Link href="/agents/seo-geo" className="group flex items-center gap-3 p-4 rounded-xl border border-border hover:border-primary/40 hover:bg-primary/3 transition-all">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                    <span className="text-sm text-slate-600 group-hover:text-primary transition-colors">The SEO &amp; GEO AI Agent — built, hosted &amp; managed</span>
                  </Link>
                  <Link href="/blog/how-to-build-social-media-ai-agent" className="group flex items-center gap-3 p-4 rounded-xl border border-border hover:border-primary/40 hover:bg-primary/3 transition-all">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                    <span className="text-sm text-slate-600 group-hover:text-primary transition-colors">How to Build a Social Media AI Agent (With the Exact Prompt to Copy)</span>
                  </Link>
                  <Link href="/blog/what-are-ai-agents" className="group flex items-center gap-3 p-4 rounded-xl border border-border hover:border-primary/40 hover:bg-primary/3 transition-all">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                    <span className="text-sm text-slate-600 group-hover:text-primary transition-colors">What Are AI Agents? A Plain-English Guide for Business Owners</span>
                  </Link>
                  <Link href="/blog/ai-agents-for-small-business" className="group flex items-center gap-3 p-4 rounded-xl border border-border hover:border-primary/40 hover:bg-primary/3 transition-all">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                    <span className="text-sm text-slate-600 group-hover:text-primary transition-colors">AI Agents for Small Business: Automating Operations Without a Tech Team</span>
                  </Link>
                </div>
              </div>
            </article>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

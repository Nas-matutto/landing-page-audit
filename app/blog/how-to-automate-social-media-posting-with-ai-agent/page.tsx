"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Calendar, Clock, ArrowLeft, Copy, Check, CheckCircle2, ChevronDown, Bot } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const AGENT_PROMPT = `You are the autonomous social media agent for [Company]. You run the entire content cycle end to end - analyse, plan, create, and deliver - without needing a human to prompt each step.

STEP 1 - CONNECT & ANALYSE YOUR CHANNELS
Read the connected accounts (Instagram, TikTok, LinkedIn, YouTube, X, Facebook). Learn the brand voice, the best-performing formats and hooks, the posting cadence, and which topics drive reach, saves, and engagement.

STEP 2 - STUDY THE COMPETITION
Analyse competitor and adjacent accounts in the niche. Identify their top-performing posts, the hooks and formats that consistently work, the content gaps you can own, and the trends worth riding right now.

STEP 3 - BUILD A DATA-DRIVEN CONTENT PLAN
Turn what you learned into a concrete plan for the period ahead: the themes, the format of each post (reel, carousel, short, thread, static), the posting schedule per platform, and the goal of every post. Justify each choice with the data.

STEP 4 - CREATE THE CONTENT
Produce everything each post needs: images, short-form video, and copy, adapted to each platform's format and aspect ratio, plus a ready-to-use caption with a hook and hashtags. Keep it on-brand and platform-native.

STEP 5 - DELIVER TO THE FOLDER
Save every finished asset and caption into the shared folder (e.g. Google Drive), organised by platform and date, so all that is left for a human to do is hit post. Nothing is published without approval.

STEP 6 - LEARN & REFINE
After posts go live, read the results, compare them against the plan, and update your understanding of what works. EThe agent gets progressively better at writting hooks, it gets better timing, better formats, etc, making performance compounds over time.`

const faqs = [
  {
    q: "Which platforms does the social media agent support?",
    a: "All the major ones, including Instagram, TikTok, LinkedIn, YouTube, X (Twitter), and Facebook. It adapts each post to the platform's native format and aspect ratio, so a short-form video, a carousel, and a thread are each built the way that platform expects rather than copy-pasted across all of them.",
  },
  {
    q: "Does it actually create the images and videos, or just the text?",
    a: "It creates everything a post needs: images, short-form video, and the written copy, plus a ready-to-use caption with hooks and hashtags. You get finished, on-brand assets for each platform, not just a content calendar or a list of ideas.",
  },
  {
    q: "Does it post automatically, or do I stay in control?",
    a: "By default it does everything up to the moment of publishing and saves the finished posts into your folder, so a human just reviews and hits post. If you'd rather it publish directly on a schedule, it can - you choose how much control to keep.",
  },
  {
    q: "How does it know what content will perform?",
    a: "It analyzes your own channels to learn what already works for your audience, and studies competitor and niche accounts to spot the hooks, formats, and topics that are performing right now. Every decision in the content plan is grounded in that data rather than guesswork.",
  },
  {
    q: "Does it get better over time?",
    a: "Yes. After posts go live, the agent reads the results, compares them against the plan, and refines its understanding of what works — better hooks, better timing, better formats. The more it posts, the sharper the plan gets, so results compound over time.",
  },
  {
    q: "Can Talk to Me Data build and host this agent for me?",
    a: "Yes. We build, connect, and host the agent on our infrastructure, including the channel connections, the model, the content generation, and the delivery to your folder - so there's nothing to configure or maintain on your side. Book a demo and we'll get you onboarded in days.",
  },
]

function PromptBlock() {
  const [copied, setCopied] = useState(false)
  const [showCapture, setShowCapture] = useState(false)
  const [email, setEmail] = useState("")
  const [emailStatus, setEmailStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  function handleCopy() {
    navigator.clipboard.writeText(AGENT_PROMPT)
    setCopied(true)
    setShowCapture(true)
    setTimeout(() => setCopied(false), 2000)
  }

  async function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.includes("@")) return
    setEmailStatus("loading")
    try {
      const res = await fetch("/api/capture-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "prompt_social_media_agent" }),
      })
      if (!res.ok) throw new Error()
      setEmailStatus("success")
    } catch {
      setEmailStatus("error")
    }
  }

  return (
    <div className="my-8">
      <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
        <div
          className="flex items-center justify-between px-5 py-3"
          style={{ background: "linear-gradient(135deg, #0f172a, #1e1b4b)" }}
        >
          <span className="text-xs font-semibold text-white/50 uppercase tracking-widest">Agent Prompt</span>
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer"
            style={copied
              ? { background: "rgba(34,197,94,0.15)", color: "#86efac" }
              : { background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.8)" }}
          >
            {copied ? <><Check className="w-3.5 h-3.5" />Copied!</> : <><Copy className="w-3.5 h-3.5" />Copy prompt</>}
          </button>
        </div>
        <pre
          className="text-sm leading-relaxed p-6 overflow-x-auto whitespace-pre-wrap text-slate-700 bg-slate-50 font-mono"
          style={{ fontFamily: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace" }}
        >
          {AGENT_PROMPT}
        </pre>
      </div>

      {showCapture && (
        <div className="mt-4 rounded-2xl border-2 border-violet-200 bg-violet-50 p-6">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-violet-100 flex items-center justify-center shrink-0 mt-0.5">
              <Check className="w-4 h-4 text-violet-600" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-violet-900 mb-0.5 text-sm">Prompt copied!</p>
              {emailStatus === "success" ? (
                <div className="flex items-center gap-2 mt-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                  <p className="text-slate-600 text-sm">You're in - we'll send new prompts as we build them.</p>
                </div>
              ) : (
                <>
                  <p className="text-violet-700 text-sm mb-4">Interested in building AI Agents?</p>
                  <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-2.5">
                    <input
                      type="email"
                      required
                      placeholder="you@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex-1 px-4 py-2.5 rounded-xl border border-violet-200 bg-white text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-300 transition"
                    />
                    <button
                      type="submit"
                      disabled={emailStatus === "loading"}
                      className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white disabled:opacity-60 cursor-pointer whitespace-nowrap transition hover:opacity-90"
                      style={{ background: "linear-gradient(135deg, #6d28d9, #7c3aed)" }}
                    >
                      {emailStatus === "loading" ? "Sending…" : "Yes, send me more →"}
                    </button>
                  </form>
                  {emailStatus === "error" && (
                    <p className="text-red-500 text-xs mt-2">Something went wrong - please try again.</p>
                  )}
                  <p className="text-xs text-violet-400 mt-2">No spam. Unsubscribe any time.</p>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

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

export default function AutomateSocialMediaPostingPage() {
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
                  How to Automate Social Media Posting with an AI Agent
                </h1>
                <div className="flex items-center gap-6 text-muted-foreground text-sm">
                  <div className="flex items-center gap-2"><Calendar className="w-4 h-4" /><span>July 23, 2026</span></div>
                  <div className="flex items-center gap-2"><Clock className="w-4 h-4" /><span>13 min read</span></div>
                </div>
              </div>

              {/* Hero image */}
              <div className="mb-10 rounded-2xl overflow-hidden border border-slate-200">
                <Image
                  src="/blog/social-media-ai-agent-cover.png"
                  alt="An AI social media agent creating images, videos, and captions for Instagram, TikTok, LinkedIn, YouTube, X, and Facebook"
                  width={1200}
                  height={630}
                  className="w-full h-auto"
                  priority
                />
              </div>

              <div className="prose prose-lg max-w-none">
                <div className="space-y-6 text-muted-foreground leading-relaxed">

                  <p>
                    Staying consistent on social media is one of the hardest, most relentless jobs in a business. It
                    never stops asking for more: another reel, another carousel, another caption, another week of ideas
                    that have to be fresh, on-brand, and actually worth watching. Most teams either burn hours they
                    don&apos;t have on it, pay an agency a fortune, or quietly let their accounts go stale.
                  </p>
                  <p>
                    This guide shows you how to automate social media posting with an AI agent that runs the entire
                    content cycle - end to end, and largely on its own. It connects to your channels and studies them,
                    analyses your competitors, builds a data-driven content plan, creates the actual posts (images,
                    videos, and captions) for every platform, and drops the finished work into a folder so all you do is
                    hit publish. Then it watches what happens and gets better. If you&apos;re new to the concept, our
                    primer on <Link href="/blog/what-are-ai-agents" className="text-primary hover:underline">what AI agents actually are</Link> is a good place to start, and if you&apos;d like to build one from scratch, see our
                    walkthrough on <Link href="/blog/how-to-build-social-media-ai-agent" className="text-primary hover:underline">how to build a social media AI agent</Link>.
                  </p>

                  {/* TL;DR */}
                  <div className="bg-primary/8 border-l-4 border-primary p-6 my-8 rounded-r-lg">
                    <h3 className="text-xl font-bold text-foreground mb-3">TL;DR</h3>
                    <ul className="list-disc pl-6 space-y-2 text-foreground">
                      <li>The agent connects to your channels and learns your voice, formats, and what already performs</li>
                      <li>It analyses competitors and the niche to find winning hooks, formats, and content gaps</li>
                      <li>It produces a <strong>data-driven content plan</strong> - themes, formats, and a schedule per platform</li>
                      <li>It <strong>creates the posts</strong>: images, videos, and text with ready-to-use captions, tailored to each platform</li>
                      <li>It saves everything to <strong>your folder of choice</strong> - you just review and post</li>
                      <li>It <strong>learns as it goes</strong>, refining the plan every cycle so results compound</li>
                      <li>It runs <strong>independently, with no human intervention</strong> needed between steps</li>
                    </ul>
                  </div>

                  <h2 className="text-3xl font-bold text-foreground mt-12 mb-4">The Problem With Doing Social Media Manually</h2>
                  <p>
                    Manual social media isn&apos;t hard because any single post is hard - it&apos;s hard because it never
                    ends. Every week resets the pressure to come up with fresh ideas, research what&apos;s trending,
                    design the visuals, shoot or edit the video, write captions that actually hook, and then remember to
                    post it all at the right time on the right platform. Miss a week and the algorithm punishes you;
                    keep up and it quietly eats your most creative hours.
                  </p>
                  <p>
                    It&apos;s also a job that fragments across skills. Good social needs a strategist who knows what to
                    post, a designer who can make it look right, an editor for video, a copywriter for captions, and an
                    analyst to read the numbers and adjust. Most businesses have none of those roles dedicated to it, so
                    one overstretched person does all five badly, or the work simply doesn&apos;t happen.
                  </p>
                  <p>
                    The usual &quot;automation&quot; (like a scheduling tool) only solves the smallest part of the problem.
                    It queues posts you still have to invent, design, and write yourself. An AI agent is different: it
                    doesn&apos;t just schedule the work, it <em>does</em> the work - the research, the plan, the creation,
                    and the learning - and it does it continuously without waiting to be told. For the wider picture of
                    what that unlocks, see our guide on <Link href="/blog/ai-agents-for-small-business" className="text-primary hover:underline">AI agents for small business</Link>.
                  </p>

                  <h2 className="text-3xl font-bold text-foreground mt-12 mb-4">How the Social Media Agent Works, End to End</h2>
                  <p>
                    The agent behind <Link href="/agents/social-media" className="text-primary hover:underline">Talk to Me Data&apos;s social media automation</Link> runs a full, repeating cycle. It moves through six stages on its own — analysing, planning, creating,
                    delivering, and learning - and comes back around sharper each time. Here is exactly what happens at
                    each stage.
                  </p>

                  {/* Step 1 */}
                  <h3 className="text-2xl font-bold text-foreground mt-10 mb-3">Step 1: It connects to your channels and analyses them</h3>
                  <p>
                    First, the agent is given access to your social accounts - Instagram, TikTok, LinkedIn, YouTube, X,
                    Facebook, or whichever you use. Before it creates anything, it studies what you already have. It
                    reads your history to understand your brand voice and visual style, and it looks at the numbers to
                    learn what genuinely works for <em>your</em> audience.
                  </p>
                  <p>Concretely, it works out things like:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>which formats (reels, carousels, shorts, threads, statics) earn the most reach, saves, and engagement;</li>
                    <li>the hooks, topics, and angles your audience responds to;</li>
                    <li>your best posting times and cadence per platform;</li>
                    <li>the tone and visual identity that make a post unmistakably yours.</li>
                  </ul>
                  <p>
                    This is the foundation. Everything the agent produces later is anchored to what your own data says
                    works, not to a generic template.
                  </p>

                  {/* Step 2 */}
                  <h3 className="text-2xl font-bold text-foreground mt-10 mb-3">Step 2: It analyses your competitors&apos; pages and top-performing posts</h3>
                  <p>
                    Next, the agent looks outward. It studies competitor and adjacent accounts in your niche to see
                    what&apos;s working beyond your own feed - because the fastest way to know what will land is to see
                    what already has. It surfaces their best-performing posts and reverse-engineers <em>why</em> they
                    worked: the hook, the format, the pacing, the topic.
                  </p>
                  <p>From that competitive read it identifies:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>the hooks and formats consistently over-performing in your space right now;</li>
                    <li>content gaps and angles competitors are missing that you can own;</li>
                    <li>trends and formats worth riding while they&apos;re still fresh;</li>
                    <li>benchmarks for what &quot;good&quot; looks like in your category.</li>
                  </ul>
                  <p>
                    The result is a picture of the whole playing field - your strengths plus the opportunities around you
                    - rather than a feed built in a vacuum.
                  </p>

                  {/* Step 3 */}
                  <h3 className="text-2xl font-bold text-foreground mt-10 mb-3">Step 3: It provides a data-driven content plan</h3>
                  <p>
                    With both reads in hand, the agent turns insight into a concrete plan for the period ahead. This
                    isn&apos;t a vague list of ideas - it&apos;s a real calendar with a rationale behind every slot. For
                    each post it decides the theme, the format, the platform, the timing, and the goal, and it can tell
                    you why each choice was made based on the data.
                  </p>
                  <p>A typical plan specifies, for each piece of content:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>the topic and angle, mapped to a theme that&apos;s proven to perform;</li>
                    <li>the format and platform it&apos;s built for, and why;</li>
                    <li>the day and time to post it;</li>
                    <li>the objective is reach, saves, engagement, clicks, or conversions.</li>
                  </ul>
                  <p>
                    You get a coherent, defensible strategy for the weeks ahead in minutes, instead of staring at a blank
                    calendar wondering what to post.
                  </p>

                  {/* Step 4 */}
                  <h3 className="text-2xl font-bold text-foreground mt-10 mb-3">Step 4: It builds the posts: images, videos, text, and captions for every platform</h3>
                  <p>
                    This is where most tools stop and the agent keeps going. It doesn&apos;t hand you a plan and wish you
                    luck — it produces the finished content. For every item in the plan it creates the actual assets, and
                    it tailors each one to the platform it&apos;s destined for rather than reusing a single file
                    everywhere.
                  </p>
                  <p>For each post, the agent produces:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Images</strong> — on-brand graphics and visuals in the right dimensions for each platform;</li>
                    <li><strong>Videos</strong> — short-form video cut and formatted for reels, shorts, and TikTok;</li>
                    <li><strong>Text and captions</strong> — a ready-to-use caption with a strong hook, the right tone, and hashtags;</li>
                    <li><strong>Platform-native variants</strong> — the same idea adapted to each platform&apos;s format and aspect ratio.</li>
                  </ul>
                  <p>
                    What you end up with is a set of complete, publish-ready posts. Not a brief, not a mood board, but
                    the real thing, captioned and ready to go.
                  </p>

                  {/* Step 5 */}
                  <h3 className="text-2xl font-bold text-foreground mt-10 mb-3">Step 5: It saves the posts to your folder — you just post</h3>
                  <p>
                    Every finished asset and caption is saved directly into the folder of your choice - a Google Drive
                    folder, for example - neatly organised by platform and date. Nothing goes out without your say-so, so
                    you keep full editorial control while skipping every step that came before it. When you sit down to
                    post, the work is simply <em>there</em>, done.
                  </p>
                  <p>
                    All that&apos;s left for a human to do is open the folder, give it a final glance, and hit post. And
                    if you&apos;d rather remove even that step, the agent can publish directly on a schedule instead — the
                    choice of how much control to keep is yours.
                  </p>

                  {/* Step 6 */}
                  <h3 className="text-2xl font-bold text-foreground mt-10 mb-3">Step 6: It keeps learning and refines the plan as it goes</h3>
                  <p>
                    The cycle doesn&apos;t end at publishing — that&apos;s where the agent gets smarter. Once posts are
                    live, it reads the results, compares them against what the plan predicted, and updates its model of
                    what works for your audience. Every round, the plan gets sharper: better hooks, better timing, better
                    formats, fewer misses.
                  </p>
                  <p>
                    That&apos;s the compounding advantage of an agent over a one-off content batch. A freelancer or an
                    agency starts from scratch each month; the agent carries everything it has learned forward, so month
                    three is meaningfully better than month one, and it keeps improving for as long as it runs.
                  </p>

                  {/* Autonomy highlight */}
                  <div className="my-10 rounded-2xl border-2 border-primary/20 bg-primary/5 p-6">
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary shrink-0">
                        <Bot className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-foreground mb-1.5">It runs independently - no human in the loop</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          The defining feature of this agent is autonomy. It moves from analysing your channels, to
                          studying competitors, to planning, to creating, to delivering, and back to learning
                          <strong className="text-foreground"> without a person prompting each step</strong>. You&apos;re
                          not feeding it briefs or nudging it along - it drives the whole cycle itself and simply hands
                          you finished posts. The only human touch required is the final approval before publishing, and
                          even that is optional.
                        </p>
                      </div>
                    </div>
                  </div>

                  <h2 className="text-3xl font-bold text-foreground mt-12 mb-4">The Prompt</h2>
                  <p>
                    Here&apos;s the exact prompt behind the agent. Paste it into your AI agent orchestration interface —
                    whether that&apos;s Talk to Me Data or a <a href="https://claude.ai" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Claude</a> project with your social accounts and a <a href="https://www.google.com/drive/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google Drive</a> folder connected. Swap
                    {" "}<code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">[Company]</code> for your business name and point it at the channels and folder you want it to work from.
                  </p>

                </div>
              </div>

              {/* Prompt block */}
              <PromptBlock />

              <div className="prose prose-lg max-w-none">
                <div className="space-y-6 text-muted-foreground leading-relaxed">

                  <h2 className="text-3xl font-bold text-foreground mt-12 mb-4">What You Need to Set It Up</h2>
                  <div className="my-6 space-y-4">
                    <div className="border border-border rounded-xl p-5">
                      <h4 className="font-bold text-foreground mb-1">Access to your social channels</h4>
                      <p className="text-sm">Connections to the accounts you want the agent to work on — Instagram, TikTok, LinkedIn, YouTube, X, or Facebook. This is what lets it analyse your history, learn what works, and build platform-native content.</p>
                    </div>
                    <div className="border border-border rounded-xl p-5">
                      <h4 className="font-bold text-foreground mb-1">A capable, multimodal model</h4>
                      <p className="text-sm">A model like <a href="https://claude.ai" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Claude</a> with tool use, plus image and video generation. This is the engine that reads the data, writes the plan and captions, and creates the visuals for each platform.</p>
                    </div>
                    <div className="border border-border rounded-xl p-5">
                      <h4 className="font-bold text-foreground mb-1">A folder to deliver into</h4>
                      <p className="text-sm">A shared destination like a <a href="https://www.google.com/drive/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google Drive</a> folder where the agent saves finished posts, organised by platform and date, ready for you to review and publish.</p>
                    </div>
                  </div>

                  <div className="rounded-xl border-2 border-primary/20 bg-primary/5 p-5">
                    <p className="font-semibold text-foreground mb-1 text-sm">Don&apos;t want to wire up the channels, model, and delivery yourself?</p>
                    <p className="text-sm text-muted-foreground mb-3">
                      Talk to Me Data builds, connects, and hosts this agent for you - the channel connections, the model, the content generation, and the delivery to your folder. Nothing to configure or maintain on your side.
                    </p>
                    <Link href="/agents/social-media" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
                      See the social media agent →
                    </Link>
                  </div>

                  <h2 className="text-3xl font-bold text-foreground mt-12 mb-4">What You Get Out of It</h2>
                  <div className="my-6 overflow-x-auto">
                    <table className="w-full border-collapse border-2 border-border rounded-lg text-sm">
                      <thead>
                        <tr className="bg-muted/50">
                          <th className="border border-border p-4 text-left text-foreground font-bold">Before (manual)</th>
                          <th className="border border-border p-4 text-left text-foreground font-bold">After (AI agent)</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-border p-4">Stare at a blank calendar every week</td>
                          <td className="border border-border p-4 font-semibold text-foreground">A data-driven plan produced automatically</td>
                        </tr>
                        <tr className="bg-muted/20">
                          <td className="border border-border p-4">Design, film, and write every post by hand</td>
                          <td className="border border-border p-4 font-semibold text-foreground">Images, videos, and captions created for you</td>
                        </tr>
                        <tr>
                          <td className="border border-border p-4">Guess what will perform</td>
                          <td className="border border-border p-4 font-semibold text-foreground">Decisions grounded in your data and competitors&apos;</td>
                        </tr>
                        <tr className="bg-muted/20">
                          <td className="border border-border p-4">Reformat the same idea for each platform</td>
                          <td className="border border-border p-4 font-semibold text-foreground">Platform-native variants built automatically</td>
                        </tr>
                        <tr>
                          <td className="border border-border p-4">Results plateau; every month restarts</td>
                          <td className="border border-border p-4 font-semibold text-foreground">The agent learns and improves each cycle</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Mid-article CTA */}
                  <div className="my-12 rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
                    <div className="bg-linear-to-r from-primary to-violet-500 px-8 py-5">
                      <p className="text-white/80 text-xs font-semibold uppercase tracking-widest mb-1">See it for yourself</p>
                      <h3 className="text-xl font-bold text-white">Have the whole cycle run for you, from plan to finished posts.</h3>
                    </div>
                    <div className="bg-white px-8 py-6">
                      <p className="text-foreground mb-5 leading-relaxed text-sm">
                        Explore the social media agent to see exactly what it produces, or tell us your channels and we&apos;ll build, connect, and host it for you.
                      </p>
                      <div className="flex flex-col sm:flex-row gap-3">
                        <Link href="/agents/social-media" className="inline-flex items-center justify-center gap-2 bg-linear-to-r from-primary to-violet-500 text-white font-semibold text-sm px-6 py-3 rounded-xl hover:opacity-90 transition-opacity">
                          See the social media agent →
                        </Link>
                        <Link href="/get-started" className="inline-flex items-center justify-center gap-2 border border-slate-300 text-foreground font-semibold text-sm px-6 py-3 rounded-xl hover:border-primary hover:text-primary transition-colors">
                          Get started →
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Keyword section + CTAs */}
                  <div className="my-12">
                    <h2 className="text-3xl font-bold text-foreground mb-4">How to automate social media posting without hiring an agency</h2>
                    <p className="mb-6">
                      The goal isn&apos;t just to schedule posts — it&apos;s to remove the entire content pipeline from
                      your plate. An AI agent handles the strategy, the creation, and the learning, and leaves you with a
                      folder of finished, on-brand posts to approve. You keep a consistent, high-quality presence across
                      every platform without an agency retainer or a full-time hire, and it gets better the longer it runs.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 not-prose">
                      <Link
                        href="/agents/social-media"
                        className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:border-primary/40 hover:shadow-md transition-all no-underline"
                      >
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-2">See the agent</p>
                          <h3 className="text-lg font-bold text-foreground mb-1.5">Learn More</h3>
                          <p className="text-sm text-muted-foreground">See exactly how the AI social media agent plans, creates, and delivers content, and how we build it around your brand.</p>
                        </div>
                        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                          Explore the social media agent →
                        </span>
                      </Link>
                      <Link
                        href="/get-started"
                        className="group flex flex-col justify-between rounded-2xl bg-linear-to-br from-primary to-violet-500 p-6 shadow-sm hover:opacity-95 transition-opacity no-underline"
                      >
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-widest text-white/70 mb-2">Ready to go</p>
                          <h3 className="text-lg font-bold text-white mb-1.5">Get Started</h3>
                          <p className="text-sm text-white/80">Tell us your channels and brand and we&apos;ll build, connect, and host your social media agent — live in days.</p>
                        </div>
                        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-white">
                          Start now →
                        </span>
                      </Link>
                    </div>
                  </div>

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
                    Automating social media used to mean a scheduling tool that still left you to invent, design, and
                    write every post. An AI agent changes that. It connects to your channels and learns them, analyses
                    your competitors, builds a data-driven content plan, creates the images, videos, and captions for
                    every platform, and saves the finished posts to your folder — then learns from the results and
                    refines the plan every cycle. It runs the whole thing independently, with no human intervention
                    needed between steps.
                  </p>
                  <p>
                    The prompt above is ready to use. Connect a capable model, your channels, and a folder, drop the
                    prompt in, and let the analysing, planning, and creating run themselves. If you&apos;d rather skip the
                    setup entirely, we build, connect, and host the whole thing for you.
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
                      <h3 className="text-2xl font-bold text-white mb-3">Want the social media agent built for your business?</h3>
                      <p className="text-white/80 mb-6 leading-relaxed max-w-xl text-sm">
                        We build, deploy, and host an AI agent that plans, creates, and delivers your content across every platform — autonomously. Tell us your channels, or explore the agent first.
                      </p>
                      <div className="flex flex-col sm:flex-row gap-3">
                        <Link href="/get-started" className="inline-flex items-center justify-center gap-2 bg-white text-primary font-semibold text-sm px-6 py-3 rounded-xl hover:bg-white/90 transition-colors">
                          Get started →
                        </Link>
                        <Link href="/agents/social-media" className="inline-flex items-center justify-center gap-2 border border-white/40 bg-white/10 text-white font-semibold text-sm px-6 py-3 rounded-xl hover:bg-white/20 transition-colors backdrop-blur-sm">
                          See the social media agent
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Related */}
              <div className="mt-12 pt-8 border-t border-border">
                <h3 className="text-lg font-bold text-foreground mb-5">Related reading</h3>
                <div className="space-y-3">
                  <Link href="/agents/social-media" className="group flex items-center gap-3 p-4 rounded-xl border border-border hover:border-primary/40 hover:bg-primary/3 transition-all">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                    <span className="text-sm text-slate-600 group-hover:text-primary transition-colors">The Social Media AI Agent — built, hosted &amp; managed</span>
                  </Link>
                  <Link href="/blog/how-to-build-social-media-ai-agent" className="group flex items-center gap-3 p-4 rounded-xl border border-border hover:border-primary/40 hover:bg-primary/3 transition-all">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                    <span className="text-sm text-slate-600 group-hover:text-primary transition-colors">How to Build a Social Media AI Agent (With the Exact Prompt to Copy)</span>
                  </Link>
                  <Link href="/blog/ai-agents-for-small-business" className="group flex items-center gap-3 p-4 rounded-xl border border-border hover:border-primary/40 hover:bg-primary/3 transition-all">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                    <span className="text-sm text-slate-600 group-hover:text-primary transition-colors">AI Agents for Small Business: Automating Operations Without a Tech Team</span>
                  </Link>
                  <Link href="/blog/what-are-ai-agents" className="group flex items-center gap-3 p-4 rounded-xl border border-border hover:border-primary/40 hover:bg-primary/3 transition-all">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                    <span className="text-sm text-slate-600 group-hover:text-primary transition-colors">What Are AI Agents? A Plain-English Guide for Business Owners</span>
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

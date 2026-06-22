"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Calendar, Clock, ArrowLeft, Copy, Check, CheckCircle2, ChevronDown } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const AGENT_PROMPT = `You analyze the user's own Instagram content, surface what works, and propose new ideas modeled on the top performers. Run once per request.

STEP 1 - SCRAPE
Use the Apify action "Run Actor Sync & Get Dataset Items":
- actor: apify/instagram-scraper
- input: { "directUrls": ["https://www.instagram.com/[YOUR_HANDLE]/"], "resultsType": "posts", "resultsLimit": 40 }
(Confirm the field names against the actor's Input tab.)

STEP 2 - ANALYZE (focus on reels/videos)
- Rank posts by performance: views first, then engagement rate ((likes + comments) / views).
- Identify the TOP ~10 performers.
- Best hooks: extract the first line / first ~10 words of each top post's caption - this is the textual hook (you cannot see the video). Note recurring patterns: questions, numbers, bold claims, "how to", contrarian takes, etc.
- Best topics/formats: the themes and formats that appear most among the top performers.

STEP 3 - GENERATE IDEAS
Propose 10 new content ideas modeled on the winners. For each: a ready-to-use hook written in the style of your top performers + the topic/angle + one line on why it should work (which winning pattern it echoes).

STEP 4 - WRITE TO SHEET (spreadsheet [YOUR_SHEET_ID], tab "Content Analysis")
- Block A "Top Performers": one row per top post — Date, URL, Topic, Hook, Views, Likes, Comments, Engagement Rate.
- Block B "Winning Patterns": the recurring hook styles + topics.
- Block C "New Ideas": the 10 ideas — Hook, Topic/Angle, Why it works.
Read existing rows first (Batch Get) and don't duplicate posts already logged.

Finish with a short chat summary: the top 3 hooks and your 3 strongest new ideas.`

const faqs = [
  {
    q: "Does this work for accounts with a small following?",
    a: "Yes. The agent analyzes relative performance within your own account, so it will be comparing your posts against each other, not against industry benchmarks. Even with a few hundred followers, it surfaces meaningful patterns from your last 40 posts.",
  },
  {
    q: "Can I use this for TikTok or LinkedIn instead of Instagram?",
    a: "The prompt as written uses Apify's Instagram scraper. Apify has scrapers for TikTok, LinkedIn, and most other major platforms, so you can swap the actor ID and input fields in Step 1, and adjust the field names in Steps 2 and 4 to match the data structure each scraper returns.",
  },
  {
    q: "Can Talk to Me Data build this Agent for me?",
    a: "Absolutely. We can build it for you so you don't have to worry about Claude API credits, API Keys, Apify and Google Sheets integrations etc. Just book a Demo and we will get you onboarded onto the platform.",
  },
  {
    q: "Is the Apify Instagram scraper free?",
    a: "Apify offers a free tier with $5 of monthly compute credit. Scraping 40 posts typically uses a fraction of that. For regular use (running the agent weekly), a paid plan is more practical.",
  },
  {
    q: "What if Claude can't see the video content?",
    a: "The agent explicitly works around this as it analyzes captions, hooks (first ~10 words), engagement metrics, and topics rather than the visual content. In practice, caption hooks are often the primary driver of performance anyway, so this limitation rarely matters.",
  },
  {
    q: "How often should I run this agent?",
    a: "Once a week is a reasonable cadence for most accounts. The agent reads existing rows from the Sheet before writing, so it won't duplicate posts already logged. Running it weekly keeps your pattern analysis fresh as new posts accumulate.",
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
      {/* Prompt block */}
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

      {/* Email capture — shown after copying */}
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

export default function SocialMediaAIAgentPage() {
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
                  How to Build a Social Media AI Agent for Instagram (With the Exact Prompt to Copy)
                </h1>
                <div className="flex items-center gap-6 text-muted-foreground text-sm">
                  <div className="flex items-center gap-2"><Calendar className="w-4 h-4" /><span>June 22, 2026</span></div>
                  <div className="flex items-center gap-2"><Clock className="w-4 h-4" /><span>10 min read</span></div>
                </div>
              </div>

              {/* Hero image */}
              <div className="mb-10 rounded-2xl overflow-hidden border border-slate-200">
                <Image
                  src="/Instagram_AI_Agent.png"
                  alt="Simple Instagram AI Agent diagram — how it works"
                  width={1200}
                  height={675}
                  className="w-full h-auto"
                  priority
                />
              </div>

              <div className="prose prose-lg max-w-none">
                <div className="space-y-6 text-muted-foreground leading-relaxed">

                  <p>
                    Most social media advice tells you to "post consistently" and "know your audience.", but what it doesn't tell you is how to find the patterns inside your own account that actually predict what performs, and how to use those patterns to systematically generate content ideas that are more likely to work.
                  </p>
                  <p>
                    That's what this agent does. It scrapes your own Instagram posts, ranks them by performance, extracts the hooks and topics from your top performers, generates 10 new content ideas modeled on those winners, and logs everything to a Google Sheet - without you touching a single spreadsheet. And yes, of course you can also run the same Agent to look at your competitors' or inspiring creators' accounts.
                  </p>

                  {/* TL;DR */}
                  <div className="bg-primary/8 border-l-4 border-primary p-6 my-8 rounded-r-lg">
                    <h3 className="text-xl font-bold text-foreground mb-3">TL;DR</h3>
                    <ul className="list-disc pl-6 space-y-2 text-foreground">
                      <li>The agent scrapes your last 40 Instagram posts using <a href="https://apify.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Apify</a></li>
                      <li>Ranks them by views, then engagement rate, and identifies your top ~10 performers</li>
                      <li>Extracts the hooks and topics that keep appearing in your best content</li>
                      <li>Generates 10 new ideas, each with a ready-to-use hook and reasoning</li>
                      <li>Writes everything to a Google Sheet, deduplicating against existing rows</li>
                      <li>Works with <a href="https://claude.ai" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Claude</a> (Pro or API) using Apify and Google Sheets integrations</li>
                    </ul>
                  </div>

                  <h2 className="text-3xl font-bold text-foreground mt-12 mb-4">What a Social Media AI Agent Actually Does</h2>
                  <p>
                    A social media AI agent is different from asking ChatGPT to "write me 5 Instagram captions." The difference is data it uses, because instead of generating generic content based on what it was trained on, this agent starts from your specific account - your actual posts, your actual performance numbers, your actual audience's reactions.
                  </p>
                  <p>
                    The result is content ideas that are modeled on what has demonstrably worked for you, not what works for some average creator in your niche. Your top performers become the training set for your next batch of content, meaning the likelihood of better engagement is higher.
                  </p>
                  <p>
                    It also builds institutional knowledge. Every time the agent runs, your Google Sheet grows - your winning patterns get documented, your top hooks get archived, and new ideas get logged alongside the reasoning behind them. Over time, you end up with a living content strategy document that gets smarter every week.
                  </p>

                  <h2 className="text-3xl font-bold text-foreground mt-12 mb-4">What You Need to Set It Up</h2>
                  <div className="my-6 space-y-4">
                    <div className="border border-border rounded-xl p-5">
                      <h4 className="font-bold text-foreground mb-1">Claude Pro or API access</h4>
                      <p className="text-sm">The agent uses Claude with tool use enabled. <a href="https://claude.ai" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Claude Pro</a> works if you connect the Apify and Google Sheets MCP integrations. API access works if you're building a more automated setup.</p>
                    </div>
                    <div className="border border-border rounded-xl p-5">
                      <h4 className="font-bold text-foreground mb-1">An Apify account</h4>
                      <p className="text-sm"><a href="https://apify.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Apify</a> runs the Instagram scraper. They have a free tier ($5/month of compute credit) which covers many runs. The <a href="https://apify.com/apify/instagram-scraper" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Instagram scraper actor</a> is pre-built — you don't need to configure anything beyond the input fields the prompt specifies.</p>
                    </div>
                    <div className="border border-border rounded-xl p-5">
                      <h4 className="font-bold text-foreground mb-1">A Google Sheet</h4>
                      <p className="text-sm"><a href="https://sheets.new" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Create a new spreadsheet</a> and add a tab called "Content Analysis." The agent will create three blocks inside it: Top Performers, Winning Patterns, and New Ideas. Copy the Sheet ID from the URL (the long string between /d/ and /edit).</p>
                    </div>
                    <div className="border border-border rounded-xl p-5">
                      <h4 className="font-bold text-foreground mb-1">Your Instagram handle</h4>
                      <p className="text-sm">Your public Instagram username. The account needs to be public for the scraper to access it. If your account is private, you'll need to use Apify's authenticated scraping options.</p>
                    </div>
                  </div>

                  <div className="rounded-xl border-2 border-primary/20 bg-primary/5 p-5">
                    <p className="font-semibold text-foreground mb-1 text-sm">Don't want to set all of this up yourself?</p>
                    <p className="text-sm text-muted-foreground mb-3">
                      Talk to Me Data builds and deploys agents like this for businesses - fully connected to your accounts, running on a schedule, with no API keys, integration config, or maintenance on your side.
                    </p>
                    <Link href="/book-demo" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
                      Book a free call to get it built for you →
                    </Link>
                  </div>

                  <h2 className="text-3xl font-bold text-foreground mt-12 mb-4">How the Agent Works - Step by Step</h2>

                  <div className="my-6 space-y-5">
                    <div className="border-l-4 border-primary pl-6 bg-primary/5 p-5 rounded-r-xl">
                      <h4 className="text-base font-bold text-foreground mb-2">Step 1 - Scrape your posts</h4>
                      <p className="text-sm">The agent calls the <a href="https://apify.com/apify/instagram-scraper" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Apify Instagram scraper</a> with your handle and pulls your last 40 posts. For each post it retrieves the caption, post URL, publish date, view count, like count, and comment count. Reels and videos take priority in the analysis since they typically carry more distributable reach than static images.</p>
                    </div>
                    <div className="border-l-4 border-primary pl-6 bg-primary/5 p-5 rounded-r-xl">
                      <h4 className="text-base font-bold text-foreground mb-2">Step 2 - Rank and analyze</h4>
                      <p className="text-sm">Posts are ranked by views first (reach), then by engagement rate - calculated as (likes + comments) / views. This two-tier ranking separates posts that were broadly distributed from those that generated genuine audience interaction. The top ~10 performers become the analysis set.</p>
                      <p className="text-sm mt-2">For each top performer, the agent extracts the hook: the first line or first ~10 words of the caption. It can't see the video itself, but the hook is usually the most influential variable anyway as it's what determines whether someone stops scrolling. Patterns across hooks are identified: questions, numbers, "how to" frames, bold claims, contrarian angles.</p>
                    </div>
                    <div className="border-l-4 border-primary pl-6 bg-primary/5 p-5 rounded-r-xl">
                      <h4 className="text-base font-bold text-foreground mb-2">Step 3 - Generate 10 new ideas</h4>
                      <p className="text-sm">Using the winning patterns as a template, the agent generates 10 new content ideas. Each idea comes with a ready-to-use hook (written in the style of your top performers), the topic and angle, and a one-line explanation of which winning pattern it echoes and why it should work. These aren't generic suggestions - they're modeled on what your specific audience has responded to.</p>
                    </div>
                    <div className="border-l-4 border-primary pl-6 bg-primary/5 p-5 rounded-r-xl">
                      <h4 className="text-base font-bold text-foreground mb-2">Step 4 - Log to Google Sheets</h4>
                      <p className="text-sm">The agent reads your existing Sheet first (Batch Get) to avoid duplicating posts already logged. It then writes three structured blocks: Top Performers (one row per post with all performance data), Winning Patterns (the recurring hooks and topics), and New Ideas (the 10 new ideas with hooks and reasoning). The Sheet becomes your running content strategy document.</p>
                    </div>
                  </div>

                  <h2 className="text-3xl font-bold text-foreground mt-12 mb-4">The Prompt</h2>
                  <p>
                    Paste this directly into your AI Agent orchestration interface - whether it's Talk to Me Data or Claude Project. Before running, replace <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">[YOUR_HANDLE]</code> with your Instagram username and <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">[YOUR_SHEET_ID]</code> with the ID from your Google Sheet URL. Make sure your Apify and Google Sheets integrations are connected in Claude's settings.
                  </p>

                </div>
              </div>

              {/* Prompt block — outside prose for full styling control */}
              <PromptBlock />

              <div className="prose prose-lg max-w-none">
                <div className="space-y-6 text-muted-foreground leading-relaxed">

                  <h2 className="text-3xl font-bold text-foreground mt-12 mb-4">How to Connect the Integrations</h2>

                  <div className="my-6">
                    <h3 className="text-xl font-bold text-foreground mb-3">Apify</h3>
                    <ol className="list-decimal pl-6 space-y-3 text-sm">
                      <li>Create a free account at <a href="https://apify.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">apify.com</a></li>
                      <li>Go to <strong>Settings → Integrations</strong> and copy your API token</li>
                      <li>In <a href="https://claude.ai" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Claude</a>, go to <strong>Settings → Integrations → Apify</strong> and paste the token</li>
                      <li>The agent will then be able to call the <a href="https://apify.com/apify/instagram-scraper" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Instagram scraper actor</a> directly</li>
                    </ol>
                  </div>

                  <div className="my-6">
                    <h3 className="text-xl font-bold text-foreground mb-3">Google Sheets</h3>
                    <ol className="list-decimal pl-6 space-y-3 text-sm">
                      <li>In Claude, go to <strong>Settings → Integrations → Google Drive / Sheets</strong> and authorize your Google account</li>
                      <li>Create a new Google Sheet and add a tab named exactly <strong>"Content Analysis"</strong></li>
                      <li>Copy the Sheet ID from the URL: it's the string between <code className="bg-muted px-1.5 py-0.5 rounded font-mono">/d/</code> and <code className="bg-muted px-1.5 py-0.5 rounded font-mono">/edit</code></li>
                      <li>Replace <code className="bg-muted px-1.5 py-0.5 rounded font-mono">[YOUR_SHEET_ID]</code> in the prompt with that value</li>
                    </ol>
                  </div>

                  <h2 className="text-3xl font-bold text-foreground mt-12 mb-4">What You Get Out of It</h2>

                  <div className="my-6 overflow-x-auto">
                    <table className="w-full border-collapse border-2 border-border rounded-lg text-sm">
                      <thead>
                        <tr className="bg-muted/50">
                          <th className="border border-border p-4 text-left text-foreground font-bold">Output</th>
                          <th className="border border-border p-4 text-left text-foreground font-bold">Where</th>
                          <th className="border border-border p-4 text-left text-foreground font-bold">What it contains</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-border p-4 font-semibold text-foreground">Top Performers</td>
                          <td className="border border-border p-4">Sheet, Block A</td>
                          <td className="border border-border p-4">Date, URL, Hook, Views, Likes, Comments, Engagement Rate</td>
                        </tr>
                        <tr className="bg-muted/20">
                          <td className="border border-border p-4 font-semibold text-foreground">Winning Patterns</td>
                          <td className="border border-border p-4">Sheet, Block B</td>
                          <td className="border border-border p-4">Recurring hook styles, topic categories, format types</td>
                        </tr>
                        <tr>
                          <td className="border border-border p-4 font-semibold text-foreground">New Content Ideas</td>
                          <td className="border border-border p-4">Sheet, Block C</td>
                          <td className="border border-border p-4">10 hooks, topics, and reasoning for each idea</td>
                        </tr>
                        <tr className="bg-muted/20">
                          <td className="border border-border p-4 font-semibold text-foreground">Chat Summary</td>
                          <td className="border border-border p-4">Claude reply</td>
                          <td className="border border-border p-4">Top 3 hooks + 3 strongest new ideas at a glance</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <h2 className="text-3xl font-bold text-foreground mt-12 mb-4">Tips for Customising the Prompt</h2>
                  <div className="my-6 space-y-4">
                    <div className="border-l-4 border-slate-300 pl-5 py-1">
                      <h4 className="font-bold text-foreground mb-1">Change the platform</h4>
                      <p className="text-sm">Apify has scrapers for <a href="https://apify.com/clockworks/tiktok-scraper" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">TikTok</a>, LinkedIn, YouTube, and most other platforms. Swap the actor ID in Step 1 and adjust field names in Steps 2 and 4 to match what each scraper returns.</p>
                    </div>
                    <div className="border-l-4 border-slate-300 pl-5 py-1">
                      <h4 className="font-bold text-foreground mb-1">Increase the post sample</h4>
                      <p className="text-sm">Change <code className="bg-muted px-1 rounded font-mono">"resultsLimit": 40</code> to 80 or 100 for a larger sample. More data means more reliable pattern detection, though it increases processing time slightly.</p>
                    </div>
                    <div className="border-l-4 border-slate-300 pl-5 py-1">
                      <h4 className="font-bold text-foreground mb-1">Add competitor analysis</h4>
                      <p className="text-sm">Add a second scrape call in Step 1 with a competitor's handle. In Step 2, instruct the agent to compare their top performers against yours and identify gaps - topics they're winning on that you haven't covered.</p>
                    </div>
                    <div className="border-l-4 border-slate-300 pl-5 py-1">
                      <h4 className="font-bold text-foreground mb-1">Generate more ideas</h4>
                      <p className="text-sm">Change "Propose 10 new content ideas" in Step 3 to 20 or 30. You'll get a larger bank to pull from when planning your content calendar.</p>
                    </div>
                    <div className="border-l-4 border-slate-300 pl-5 py-1">
                      <h4 className="font-bold text-foreground mb-1">Automate it on a schedule</h4>
                      <p className="text-sm">Using the Claude API, you can wrap this in a cron job that runs every Sunday night so your Sheet updates automatically. The deduplication logic in Step 4 ensures you never log the same post twice. If you'd rather skip the infrastructure entirely, <Link href="/book-demo" className="text-primary hover:underline font-medium">Talk to Me Data handles the scheduling, hosting, and monitoring for you</Link>.</p>
                    </div>
                  </div>

                  {/* Mid-article CTA */}
                  <div className="my-12 rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
                    <div className="bg-linear-to-r from-primary to-violet-500 px-8 py-5">
                      <p className="text-white/80 text-xs font-semibold uppercase tracking-widest mb-1">Want this built for you?</p>
                      <h3 className="text-xl font-bold text-white">We can build and deploy this agent for your business.</h3>
                    </div>
                    <div className="bg-white px-8 py-6">
                      <p className="text-foreground mb-5 leading-relaxed text-sm">
                        If you'd rather have a production-ready version — connected to your accounts, running on a schedule, with monitoring and error handling — we build these for clients. Book a free call to discuss what that looks like.
                      </p>
                      <Link href="/book-demo" className="inline-flex items-center gap-2 bg-linear-to-r from-primary to-violet-500 text-white font-semibold text-sm px-6 py-3 rounded-xl hover:opacity-90 transition-opacity">
                        Book a free call →
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
                    A social media AI agent shifts content strategy from guesswork to data. Instead of generating ideas based on vague intuition about what your audience likes, you start from performance evidence - your actual top posts - and work outward from there.
                  </p>
                  <p>
                    The agent handles the tedious parts: pulling data, ranking posts, identifying hook patterns, generating ideas, and logging everything to a Sheet. You get a structured, up-to-date content strategy document every time you run it, and a batch of ready-to-use hooks that are grounded in what's actually worked on your account.
                  </p>
                  <p>
                    The prompt above is ready to use. Replace the two placeholders, make sure your integrations are connected, and run it. The first time you see your own patterns laid out in a Sheet, it's genuinely surprising how clear the signal is.
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
                      <h3 className="text-2xl font-bold text-white mb-3">Want a custom AI agent built for your business?</h3>
                      <p className="text-white/80 mb-6 leading-relaxed max-w-xl text-sm">
                        We build, deploy, and host AI agents tailored to your workflows. Book a free 20-minute call and we'll walk through what's possible.
                      </p>
                      <Link href="/book-demo" className="inline-flex items-center gap-2 bg-white text-primary font-semibold text-sm px-6 py-3 rounded-xl hover:bg-white/90 transition-colors">
                        Book a free call →
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Related */}
              <div className="mt-12 pt-8 border-t border-border">
                <h3 className="text-lg font-bold text-foreground mb-5">Related reading</h3>
                <div className="space-y-3">
                  <Link href="/blog/how-to-build-ai-lead-finder-agent" className="group flex items-center gap-3 p-4 rounded-xl border border-border hover:border-primary/40 hover:bg-primary/3 transition-all">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                    <span className="text-sm text-slate-600 group-hover:text-primary transition-colors">How to Build an AI Agent That Finds and Qualifies B2B Leads</span>
                  </Link>
                  <Link href="/blog/what-are-ai-agents" className="group flex items-center gap-3 p-4 rounded-xl border border-border hover:border-primary/40 hover:bg-primary/3 transition-all">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                    <span className="text-sm text-slate-600 group-hover:text-primary transition-colors">What Are AI Agents? A Plain-English Guide for Business Owners</span>
                  </Link>
                  <Link href="/free-guides/business-automation-checklist" className="group flex items-center gap-3 p-4 rounded-xl border border-border hover:border-primary/40 hover:bg-primary/3 transition-all">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                    <span className="text-sm text-slate-600 group-hover:text-primary transition-colors">Free Guide: The Business Automation Checklist</span>
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

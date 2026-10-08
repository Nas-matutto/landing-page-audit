import Link from "next/link"
import { ArrowRight, Search, TrendingUp, Sparkles, Repeat, Cpu, Plug } from "lucide-react"
import { Figure } from "@/components/blog/figure"
import { SignupCta } from "@/components/blog/signup-cta"
import { BlogPostShell } from "@/components/blog/post-shell"
import { PromptBlock } from "@/components/blog/prompt-block"
import { buildPostMetadata, type Faq } from "@/lib/blog"
import { SIGNUP_URL } from "@/lib/links"

const SLUG = "how-to-automate-seo-and-geo-growth-with-ai-agent"

export const metadata = buildPostMetadata(SLUG)

const faqs: Faq[] = [
  {
    question: "What is the difference between SEO and GEO?",
    answer: "SEO (search engine optimization) is about ranking in traditional search results like Google's blue links. GEO (generative engine optimization) is about being cited and quoted inside AI answers: Google's AI Overviews, ChatGPT, Perplexity, and Gemini. They overlap, but GEO rewards clear, well-structured, citable content that an AI can lift and attribute to you. The agent is trained to optimize for both at once.",
  },
  {
    question: "How does the agent connect to my Google Search Console?",
    answer: "The AI Agent connects to your Google Search Console property through Google's official API during the onboarding process. From then on the agent can pull your real clicks, impressions, average position, and query-level data whenever it runs, so every recommendation is based on your actual performance rather than generic best practices.",
  },
  {
    question: "Does the agent publish content automatically, or do I approve it first?",
    answer: "Both modes are supported. You can run it in a review-first mode where every draft lands in your inbox or CMS as a draft for approval, or in full autopilot where it writes and publishes on a schedule. Most clients start in review mode and switch specific content types to autopilot once they trust the output.",
  },
  {
    question: "How often does the agent run?",
    answer: "On demand whenever you ask it, and on a recurring schedule, typically a weekly run that re-pulls your Search Console data, refreshes its list of opportunities, and produces new or updated content. You set the cadence.",
  },
  {
    question: "What CMS or publishing platforms does it work with?",
    answer: "It publishes into most common stacks, such as WordPress, Webflow, Ghost, Shopify blogs, or a headless CMS via API. If you have a custom setup, we wire the publishing step to your platform during the build.",
  },
  {
    question: "Can Talk to Me Data build and host this agent for me?",
    answer: "Yes. We build, connect, and host the SEO and GEO agent on our infrastructure: the Search Console integration, the model access, the training on your brand and SEO/GEO best practices, and the publishing connection, so there is nothing to set up on your side.",
  },
]

const SEO_AGENT_PROMPT = `You are an elite SEO and GEO (Generative Engine Optimization) content strategist. Each
run you connect to Google Search Console, report on week-on-week performance, find the
highest-ROI content opportunities, and append everything to ONE running Google Doc.

## MODE — decide this FIRST, before calling any tool
Read the user's request and pick ONE mode:
- SPECIFIC REQUEST (e.g. "write a blog on X", "give me the data for page Y", "which queries
  rank 11–20"): do ONLY that. Use the minimum tools needed, answer directly, and do NOT run
  the weekly report or touch the report doc unless explicitly asked.
- NO SPECIFIC REQUEST, or "run the report" / "weekly report" / a scheduled run: perform the
  full workflow (Steps 1–5 below) and write to the report doc.
Never do more work, more tool calls, or more tokens than the request requires.

## FIXED TARGETS (do not deviate)
- PROPERTY: siteUrl = "sc-domain:yourdomain.com"   ← the ONLY property to analyze.
- REPORT DOC: documentId = "google document ID" ← the ONLY doc to write to.

## STEP 1 — PERFORMANCE (WEEK ON WEEK)
Use GOOGLE_SEARCH_CONSOLE_SEARCH_ANALYTICS_QUERY on the fixed property to compare the
last complete 7 days ("this week") vs the 7 days before that ("last week"):
- Totals: clicks, impressions, CTR, average position — this week vs last week, with %
  change for each.
- Top movers by PAGE and by QUERY: biggest gainers and biggest losers in clicks and in
  position. Call out anything that dropped sharply (possible issue) and anything rising
  (momentum to reinforce).
Write a short, plain-English verdict: are we improving, flat, or slipping, and why.

## STEP 2 — PROGRESS ON PRIOR RECOMMENDATIONS
Call GOOGLEDOCS_GET_DOCUMENT_PLAINTEXT on the fixed documentId and read last week's
report. For each opportunity you recommended previously, check the current GSC data and
state the outcome: e.g. "Recommended improving /pricing (was pos 14) → now pos 9, clicks
+40%." Be honest when something didn't move or got worse.

## STEP 3 — FIND NEW OPPORTUNITIES
Query the last 3 months (by QUERY, by PAGE, and by QUERY+PAGE). Identify and rank by
upside ÷ effort:
- STRIKING DISTANCE: queries at position 8–20 with high impressions (small effort → page 1).
- HIGH-IMPRESSION / LOW-CTR: strong rank but CTR below expected (~28% #1, ~15% #2-3,
  ~10% #4-6) → title/meta/intent fix, not new content.
- CONTENT GAPS: high-impression query CLUSTERS with no strong dedicated page → new
  content. Group related queries into ONE target page each (topic cluster), never one
  page per keyword.
- RISING QUERIES and CANNIBALIZATION (multiple pages competing → consolidate).
Estimate traffic upside (impressions × realistic CTR uplift). Surface the top 8–12 only.

## STEP 4 — BUILD-READY BRIEF PER OPPORTUNITY
For each: primary + secondary/semantic keywords; search intent and winning format;
target URL (new, or existing URL to fix — cite its current pos/CTR); title tag (≤60 char,
keyword front-loaded) + meta description; full H1–H2–H3 outline; target word count and
required entities/questions/facts; internal links; effort (S/M/L) and priority.

## GEO — OPTIMIZE FOR AI ANSWER ENGINES (ChatGPT, Perplexity, Google AI Overviews)
Every brief must be built to be CITED by LLMs: lead with a direct self-contained answer in
the first 1–2 sentences; structure for extraction (question-style headers, short
definitional sentences, FAQ blocks, comparison tables, numbered steps, TL;DR); front-load
statistics, named entities, dates and concrete facts; recommend schema markup
(Article/FAQPage/HowTo/Product); establish E-E-A-T (author expertise, sources, first-hand
experience). Use web_search to see who currently ranks and what AI Overviews say, so each
brief reflects the real competitive bar.

## STEP 5 — DELIVER TO THE ONE RUNNING DOC
You already read the current contents in Step 2. Now rewrite the ENTIRE doc with
GOOGLEDOCS_UPDATE_DOCUMENT_MARKDOWN so the NEWEST report is at the TOP and every previous
report is preserved unchanged below it. Structure this run's section as:

# Week of [date range]
1. Performance vs last week (totals table + % change, top movers, verdict)
2. Progress on prior recommendations
3. Ranked opportunity table (opportunity, type, current pos, impressions, est. upside,
   effort, priority)
4. Full build-ready brief for each opportunity, in priority order

After calling GOOGLEDOCS_UPDATE_DOCUMENT_MARKDOWN, inspect the tool result. If it is not
successful (e.g. PERMISSION_DENIED, or any error), STOP: report the EXACT error text to the
user, state clearly that the document was NOT updated, and do NOT invent a link, a "staging
copy", or a success message. Only after a successful write, call
GOOGLEDOCS_GET_DOCUMENT_PLAINTEXT and confirm this week's heading is present before reporting
done. Never claim success you did not verify.


Then a horizontal rule (---) and the entire previous content below it. Never delete or
summarize older weeks — the doc is a permanent running log. Be specific and numeric
everywhere; every claim must trace to real GSC data. Return the doc link when done.`


export default function AutomateSeoGeoPage() {
  return (
    <BlogPostShell slug={SLUG} faqs={faqs}>
      <div className="prose prose-lg max-w-none">
        <div className="space-y-6 text-neutral-600 leading-relaxed">

          <p className="text-lg text-ink">
            <strong>To automate SEO, connect an AI agent to your Google Search Console so it pulls your clicks, impressions and rankings every week, picks out the keywords you can realistically move onto page one, then writes and publishes content that targets them.</strong> Keyword analysis, content briefs, drafting, on-page optimization and publishing can all be automated. Strategy, final review and link building still need a human.
          </p>
          <p>
            Most businesses know they should be investing time in SEO and GEO, but not many actually keep up with it. Ranking higher means constantly reading your <a href="https://search.google.com/search-console/about" target="_blank" rel="noopener noreferrer" className="text-ink underline decoration-ink/25 underline-offset-4 hover:decoration-ink">Google Search Console</a> data, spotting the queries where you're close to page one, writing content that targets them, and publishing it consistently, week after week. It's not hard work so much as relentless work, and it's the first thing that slips when the team gets busy.
          </p>
          <p>
            This guide shows you how to hand that entire loop to an AI agent. The agent reads your Search Console insights, finds the keywords where you can realistically rank higher, is trained on both SEO and GEO best practices so the content it writes is built to rank, and then writes and publishes that content on autopilot, on request or automatically every week. The result is the kind of steady climb you see in the chart above: more impressions, more clicks, better positions, without you touching a spreadsheet.
          </p>

          {/* TL;DR */}
          <div className="rounded-2xl border border-hairline bg-mist p-6 my-8">
            <h2 className="text-xl font-semibold tracking-[-0.02em] text-ink mb-3">TL;DR</h2>
            <ul className="list-disc pl-6 space-y-2 text-ink">
              <li>The agent connects to your Google Search Console and reads your real clicks, impressions, average position, and query data</li>
              <li>It finds opportunities from queries where you rank on page two, high-impression low-click pages, and content gaps</li>
              <li>It's trained on SEO <em>and</em> GEO (generative engine optimization), so content is built to rank in Google <strong>and</strong> get cited in AI answers</li>
              <li>It pulls data on request or automatically every week, and refreshes its list of opportunities each run</li>
              <li>It writes and publishes optimized content on autopilot: review-first or fully hands-off</li>
              <li>Talk to Me Data builds, connects, and hosts the whole thing for you</li>
            </ul>
          </div>

          <h2 id="which-parts-of-seo-can-you-automate" className="text-3xl font-semibold tracking-[-0.02em] text-ink mt-12 mb-4">Which Parts of SEO Can You Automate?</h2>
          <p>
            Most of the weekly SEO workload is analysis and production, which is exactly what an AI agent is good at. The judgment calls and the relationship work are not. Here is how the work splits:
          </p>
          <div className="my-6 overflow-x-auto rounded-xl border border-hairline">
            <table className="w-full text-left text-sm">
              <thead className="bg-mist text-ink">
                <tr>
                  <th className="p-4 font-semibold">SEO task</th>
                  <th className="p-4 font-semibold">Automate it?</th>
                  <th className="p-4 font-semibold">How an agent does it</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                <tr><td className="p-4 font-medium text-ink">Performance reporting</td><td className="p-4">Yes</td><td className="p-4">Pulls clicks, impressions, CTR and position from the Search Console API and compares week on week</td></tr>
                <tr><td className="p-4 font-medium text-ink">Keyword opportunity research</td><td className="p-4">Yes</td><td className="p-4">Finds queries ranking in positions 8–20 with high impressions, plus pages with high impressions but low CTR</td></tr>
                <tr><td className="p-4 font-medium text-ink">Content briefs</td><td className="p-4">Yes</td><td className="p-4">Groups related queries into one target page and outlines the H2s, questions and entities to cover</td></tr>
                <tr><td className="p-4 font-medium text-ink">Writing articles</td><td className="p-4">Yes, with review</td><td className="p-4">Drafts in your brand voice, structured for both Google and AI answer engines</td></tr>
                <tr><td className="p-4 font-medium text-ink">On-page optimization</td><td className="p-4">Yes</td><td className="p-4">Rewrites titles and meta descriptions, adds internal links, FAQ sections and schema markup</td></tr>
                <tr><td className="p-4 font-medium text-ink">Publishing</td><td className="p-4">Yes</td><td className="p-4">Pushes drafts or live posts into WordPress, Webflow, Ghost or a headless CMS via API</td></tr>
                <tr><td className="p-4 font-medium text-ink">Technical SEO fixes</td><td className="p-4">Partly</td><td className="p-4">Can flag slow pages, broken links and indexing issues; fixes usually need a developer</td></tr>
                <tr><td className="p-4 font-medium text-ink">Link building and digital PR</td><td className="p-4">Mostly no</td><td className="p-4">Can research prospects and draft pitches, but earning links is relationship work</td></tr>
                <tr><td className="p-4 font-medium text-ink">Strategy and positioning</td><td className="p-4">No</td><td className="p-4">Deciding which audiences and topics matter to the business stays with you</td></tr>
              </tbody>
            </table>
          </div>

          <h2 id="why-is-seo-so-hard-to-keep-up-with" className="text-3xl font-semibold tracking-[-0.02em] text-ink mt-12 mb-4">Why Is SEO So Hard to Keep Up With?</h2>
          <p>
            Search visibility is a compounding asset, but only if you feed it consistently. The problem is that doing it properly is a chain of small, repetitive jobs: export the Search Console data, find the queries sitting at positions 8–20 where a small push could reach page one, check which pages get impressions but almost no clicks, decide what to write, actually write it well, optimize it, and publish it. Miss a few weeks and the momentum stalls.
          </p>
          <p>
            On top of that, the target moved. Search is no longer just ten blue links. A growing share of queries now get answered directly by <strong>generative engines</strong> (Google's AI Overviews, ChatGPT, Perplexity, and Gemini) that read the web, synthesize an answer, and cite a handful of sources. Optimizing to be one of those cited sources is a discipline of its own: <strong>GEO, or generative engine optimization</strong>. If you're only writing for classic SEO, you're leaving the fastest-growing surface of search on the table. To find the questions worth targeting there, see our step-by-step guide to <Link href="/blog/how-to-automate-keyword-research-for-geo" className="text-ink underline decoration-ink/25 underline-offset-4 hover:decoration-ink">automating keyword research for GEO</Link>. New to the concept of agents doing this kind of work? Our primer on <Link href="/blog/what-are-ai-agents" className="text-ink underline decoration-ink/25 underline-offset-4 hover:decoration-ink">what AI agents actually are</Link> is a good starting point.
          </p>

          <h2 id="how-does-an-ai-seo-agent-work" className="text-3xl font-semibold tracking-[-0.02em] text-ink mt-12 mb-4">How Does an AI SEO Agent Work?</h2>
          <p>
            The agent that powers <Link href="/agents/seo-geo" className="text-ink underline decoration-ink/25 underline-offset-4 hover:decoration-ink">Talk to Me Data's SEO &amp; GEO automation</Link> runs a simple loop: read the data, find the opportunities, write to rank, and publish. Here's each step.
          </p>

          <div className="my-6 space-y-5">
            <div className="rounded-2xl border border-hairline bg-mist p-5">
              <div className="flex items-center gap-2 mb-2">
                <Search className="w-4 h-4 text-ink" />
                <h3 className="text-base font-semibold text-ink">Step 1: Analyze your Search Console insights</h3>
              </div>
              <p className="text-sm">The agent connects to your Google Search Console and pulls the numbers that matter: total clicks, impressions, average CTR, and average position, right down to the individual query and page. It reads the trend, not just the snapshot, so it understands what's gaining traction and what's slipping.</p>
            </div>
            <div className="rounded-2xl border border-hairline bg-mist p-5">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-ink" />
                <h3 className="text-base font-semibold text-ink">Step 2: Find opportunities to rank higher</h3>
              </div>
              <p className="text-sm">From that data it surfaces the highest-leverage moves: "striking distance" queries sitting on page two that a focused piece could push onto page one, pages with high impressions but a weak click-through rate that need a better title or intro, keyword clusters you have authority on but haven't fully covered, and questions your audience asks that no page answers yet.</p>
            </div>
            <div className="rounded-2xl border border-hairline bg-mist p-5">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-ink" />
                <h3 className="text-base font-semibold text-ink">Step 3: Write content built to rank (SEO + GEO)</h3>
              </div>
              <p className="text-sm">The agent is trained on your brand voice and on current SEO and GEO best practices, so it doesn't just write; it writes to rank higher. That means proper search intent matching, clean heading structure, internal links, and schema for classic SEO, plus the clear, quotable, well-sourced formatting that gets content cited inside AI Overviews and answer engines for GEO.</p>
            </div>
            <div className="rounded-2xl border border-hairline bg-mist p-5">
              <div className="flex items-center gap-2 mb-2">
                <Repeat className="w-4 h-4 text-ink" />
                <h3 className="text-base font-semibold text-ink">Step 4: Publish on autopilot</h3>
              </div>
              <p className="text-sm">Finally it publishes, straight into your CMS as a draft for review, or fully hands-off on a schedule. Run it on demand when you want a push, or let the weekly run re-pull your data, refresh the opportunity list, and ship new content without anyone lifting a finger.</p>
            </div>
          </div>

          <h2 id="how-does-the-agent-use-your-search-console-data" className="text-3xl font-semibold tracking-[-0.02em] text-ink mt-12 mb-4">How Does the Agent Use Your Search Console Data?</h2>
          <p>
            The reason the output is useful (instead of generic AI filler) is that the agent works from your real numbers. During onboarding we connect it to your Google Search Console property through Google's official API, read-only. From then on, every time it runs it reaches into your live data and analyzes your actual performance before it decides what to write.
          </p>

          <Figure
            src="/blog/Agent_analyzing_website_SEO.png"
            alt="An AI agent extracting website performance data from Google Search Console: total clicks, impressions, average CTR, and average position"
            caption="Each run starts from live Search Console data: total clicks, impressions, average CTR and average position, broken down by query and page."
          />

          <p>
            Because the decisions are grounded in your own clicks, impressions, and positions, the agent isn't guessing at what "good SEO content" looks like in the abstract. It knows which of <em>your</em> queries are close to breaking through, which of <em>your</em> pages are underperforming their impressions, and where <em>your</em> next piece of content will move the needle. That's the difference between an AI that produces words and an agent that produces growth.
          </p>

          <SignupCta eyebrow="Put it to work" heading="Let an agent read your Search Console and grow your rankings">
            The SEO &amp; GEO agent is ready-made. Sign up free, connect Google Search Console, and it starts finding the searches you can win.
          </SignupCta>

          <h2 id="how-often-should-an-seo-agent-run" className="text-3xl font-semibold tracking-[-0.02em] text-ink mt-12 mb-4">How Often Should an SEO Agent Run?</h2>
          <p>
            You don't have to choose between control and consistency. Ask the agent for a data pull or a new article whenever you want one ("show me this month's striking-distance keywords" or "write a piece targeting the queries we're losing clicks on") and it responds on demand. Or set a schedule and let the weekly run handle it: re-pull the Search Console data, recompute the opportunities, and produce fresh content while you focus on the business.
          </p>
          <p>
            Over time this is what drives the compounding curve. A steady weekly cadence of data-informed, well-optimized content is exactly what search engines and generative engines reward, and exactly what most teams can't sustain by hand.
          </p>

          <h2 id="what-is-geo-and-why-does-it-matter-as-much-as-seo" className="text-3xl font-semibold tracking-[-0.02em] text-ink mt-12 mb-4">What Is GEO, and Why Does It Matter as Much as SEO?</h2>
          <p>
            Ranking a blue link is still valuable, but more and more journeys now start, and sometimes end, inside an AI answer. When someone asks ChatGPT, Perplexity, or Google's AI Overview a question in your space, the engine reads the web and cites a few sources. Being one of those cited sources puts your brand in front of the user at the exact moment of intent, often above the traditional results.
          </p>
          <p>
            GEO is how you earn those citations: clear answers near the top of the page, well-structured headings, factual and sourced claims, and formatting an AI can lift cleanly and attribute. Because the agent is trained on both disciplines, every piece it writes is built to do double duty: rank in classic search and get quoted by the answer engines, so you compound visibility on both surfaces at once.
          </p>

          <div className="my-8 overflow-hidden rounded-2xl border border-hairline">
            <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
              <iframe
                className="absolute inset-0 h-full w-full"
                src="https://www.youtube.com/embed/aT3CD-h4TsE"
                title="How to automate SEO and GEO growth with an AI agent"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>

          <h2 id="how-to-build-your-own-seo-agent-free-prompt" className="text-3xl font-semibold tracking-[-0.02em] text-ink mt-12 mb-4">How to Build Your Own SEO Agent (Free Prompt)</h2>
          <p>
            You can run this agent yourself. You need three pieces: a capable model such as <a href="https://claude.ai" target="_blank" rel="noopener noreferrer" className="text-ink underline decoration-ink/25 underline-offset-4 hover:decoration-ink">Claude</a>, connectors that give it access to Google Search Console and Google Docs (for example MCP connectors in Claude, or the Search Console API called from an automation platform like n8n or Make), and a system prompt that tells it what to do on each run.
          </p>
          <p>
            Here is the system prompt we use. It tells the agent how to read your Search Console, report week-on-week performance, find the highest-ROI opportunities, write build-ready and GEO-optimized briefs, and keep everything in one running Google Doc as a permanent log. Copy it, swap in your own property and document IDs, and you have the brain of the agent.
          </p>

          <PromptBlock prompt={SEO_AGENT_PROMPT} label="SEO / GEO Agent: System Prompt" />

          {/* A prompt alone isn't an agent */}
          <div className="my-8 rounded-2xl border border-hairline bg-mist p-6">
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-ink shrink-0">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-ink mb-1.5">A prompt on its own isn&apos;t an agent</h3>
                <p className="text-sm text-neutral-600 leading-relaxed mb-3">
                  This system prompt is only the instructions. To actually do the job, your agent also needs two more things: a <span className="inline-flex items-center gap-1 font-semibold text-ink"><Cpu className="w-3.5 h-3.5" />model</span> to run and reason on, and <span className="inline-flex items-center gap-1 font-semibold text-ink"><Plug className="w-3.5 h-3.5" />connectors</span> that give it live access to your tools: Google Search Console, Google Docs, and web search. Wiring those up, including authentication, permissions, scheduling, and error handling, is where most do-it-yourself builds stall.
                </p>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  If you&apos;d rather skip the setup, <a href={SIGNUP_URL} className="font-semibold text-ink underline decoration-ink/25 underline-offset-4 hover:decoration-ink">sign up free</a>: the ready-made SEO &amp; GEO agent comes with the model and connectors already in place.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

      <div className="prose prose-lg max-w-none">
        <div className="space-y-6 text-neutral-600 leading-relaxed">

          <h2 id="summary" className="text-3xl font-semibold tracking-[-0.02em] text-ink mt-12 mb-4">Summary</h2>
          <p>
            Keeping up with SEO and GEO by hand means endlessly reading Search Console, hunting for opportunities, writing to rank, and publishing on a schedule, the kind of relentless routine that quietly falls behind. An AI agent closes that loop. It reads your real search data, finds the queries where you can climb, writes content trained on SEO and GEO best practices, and publishes it on request or automatically every week.
          </p>
          <p>
            If you'd rather not wire any of it up yourself, we build, connect, and host the whole agent for you, grounded in your own data from day one.
          </p>

          <SignupCta heading="Want the SEO and GEO agent working on your site?">
            Sign up free, connect Google Search Console, and the agent starts finding ranking opportunities and writing content built for Google and AI answers.
          </SignupCta>
        </div>
      </div>
    </BlogPostShell>
  )
}

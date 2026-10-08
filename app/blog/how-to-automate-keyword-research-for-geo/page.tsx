import Link from "next/link"
import { SignupCta } from "@/components/blog/signup-cta"
import { BlogPostShell } from "@/components/blog/post-shell"
import { PromptBlock } from "@/components/blog/prompt-block"
import { buildPostMetadata, type Faq } from "@/lib/blog"

const SLUG = "how-to-automate-keyword-research-for-geo"

export const metadata = buildPostMetadata(SLUG)

const LINK = "text-ink underline decoration-ink/25 underline-offset-4 hover:decoration-ink"
const H2 = "text-3xl font-semibold tracking-[-0.02em] text-ink mt-12 mb-4"

const faqs: Faq[] = [
  {
    question: "What is GEO keyword research?",
    answer:
      "GEO keyword research is finding the questions and prompts people type into AI answer engines (ChatGPT, Perplexity, Gemini, Claude and Google's AI Overviews and AI Mode) about your topic, then checking which brands and pages those engines cite in their answers. It replaces a list of short keywords with a map of conversational prompts, the sub-questions behind them, and where you are visible or missing.",
  },
  {
    question: "Is there search volume data for ChatGPT prompts?",
    answer:
      "Not from OpenAI. ChatGPT, Perplexity and Gemini don't publish what people ask them. Some paid tools, such as Ahrefs Brand Radar, build large prompt databases from People Also Ask questions and their own keyword data, but any volume they show is an estimate. The most reliable free signals are your Google Search Console question queries, People Also Ask, Reddit threads and the questions your customers ask in sales calls and support tickets.",
  },
  {
    question: "Can I reuse my SEO keyword research for GEO?",
    answer:
      "Yes, as the starting point. Your SEO keywords, especially question queries and long queries from Search Console, are the best seed list you have. What changes is the next step: each keyword is rewritten as the full prompts different buyers would type into a chatbot, expanded into the sub-questions the AI searches for, and checked for who currently gets cited.",
  },
  {
    question: "How many prompts should I track for GEO?",
    answer:
      "Start with 20 to 50 prompts per product or service line, chosen from your highest-value topics. That is enough to see which clusters you are missing from without drowning in data. Add prompts as you publish new pages, and drop ones that never mention any brand at all.",
  },
  {
    question: "How often should I re-run GEO keyword research?",
    answer:
      "Weekly for the visibility check and monthly for the full research. AI answers change from one run to the next, so a single check is a snapshot, not a ranking. Re-running the same prompts every week shows the trend, which is what tells you whether a new or updated page started getting cited.",
  },
  {
    question: "Can I automate GEO keyword research for free?",
    answer:
      "Mostly, yes. Google Search Console is free, Claude or ChatGPT with web search can rewrite keywords into prompts, generate fan-out questions and check citations, and Google Sheets can hold the results. The cost is your time running it every week. Paid GEO tools add prompt volume estimates and automatic tracking across engines, and a hosted agent can run the whole loop on a schedule.",
  },
]

const GEO_KEYWORD_AGENT_PROMPT = `You are a GEO (Generative Engine Optimization) keyword researcher for [Business Name], which sells [product or service] to [audience].

GOAL
Find the prompts our buyers type into ChatGPT, Perplexity, Gemini and Google AI Mode, check who those engines cite today, and return a ranked list of topic clusters to write.

INPUTS
- Google Search Console property: [sc-domain:yourdomain.com]
- Google Sheet for results: [sheet name or ID]
- Competitors: [competitor1.com, competitor2.com, competitor3.com]

STEPS
1. SEED. From Search Console, pull the last 3 months of queries. Keep queries that are questions (start with how, what, why, which, can, should, is, does) or are 6+ words long. Keep the top 50 by impressions.
2. PROMPTS. Rewrite each seed as 3 to 5 prompts a real buyer would type into a chatbot. Vary the persona (owner, marketer, freelancer), the intent (learn, compare, choose, fix) and add a realistic situation ("we're a 10-person agency", "small budget").
3. FAN-OUT. For each prompt, list the 4 to 6 sub-questions an AI engine would need to search to answer it well.
4. VALIDATE. Use web search to check People Also Ask and Reddit threads for each topic. Drop prompts nobody seems to ask. Add real questions you find that are missing.
5. VISIBILITY. For the top 20 prompts, search the web as the engines would and record which brands are mentioned, which URLs are cited, and whether [yourdomain.com] appears. Mark each prompt "cited", "mentioned" or "absent".
6. CLUSTER AND SCORE. Group prompts that one page could answer into a cluster. Score each cluster 1 to 5 on business value, citation gap (competitors cited, we're not) and proof (we have first-hand data, examples or expertise). Priority = value x gap x proof.
7. BRIEF. For the top 5 clusters write a brief: target prompt, primary keyword, the fan-out questions as H2s, the direct 40 to 60 word answer to open with, facts or data we must include, schema to add, and the existing pages to link from.

RULES
- Never invent search volumes or prompt volumes. If you have no number, write "no data".
- Treat AI answers as a sample, not a ranking. Record the date of every check.
- One page per cluster, never one page per prompt.
- If Search Console or the sheet can't be reached, stop and report the exact error.

OUTPUT
Add a tab to the sheet named with today's date, with three sections: Prompts (prompt, persona, intent, cluster, visibility), Clusters (cluster, score, why) and Briefs. Reply with the top 5 clusters and the sheet link.`

/** Keyword → who, what, situation → prompts. Inline SVG, so the labels are crawlable text. */
function KeywordToPromptDiagram() {
  const prompts = [
    ["“I run a small agency. How do I find out", "what clients ask ChatGPT about our niche?”"],
    ["“Is keyword research still worth doing", "now that people search with AI?”"],
    ["“What's the quickest way to check if", "Perplexity recommends my brand?”"],
  ]
  const modifiers = ["+ who is asking", "+ what they want", "+ their situation"]
  return (
    <figure className="my-8">
      <svg viewBox="0 0 780 270" role="img" aria-labelledby="kw-prompt-title" className="h-auto w-full rounded-2xl border border-hairline bg-mist">
        <title id="kw-prompt-title">
          One SEO keyword, keyword research for AI search, becomes several conversational prompts once you add who is asking, what they want and their situation
        </title>
        <defs>
          <marker id="kw-prompt-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto">
            <path d="M0,0 L10,5 L0,10 z" fill="#141414" />
          </marker>
        </defs>
        <text x="115" y="88" textAnchor="middle" fontSize="11" fontWeight="700" letterSpacing="1.5" fill="#717171">SEO KEYWORD</text>
        <rect x="20" y="100" width="190" height="70" rx="12" fill="white" stroke="#141414" strokeWidth="1.5" strokeDasharray="5 4" />
        <text x="115" y="130" textAnchor="middle" fontSize="13" fontFamily="monospace" fill="#141414">keyword research</text>
        <text x="115" y="148" textAnchor="middle" fontSize="13" fontFamily="monospace" fill="#141414">for ai search</text>
        <path d="M215,135 L250,135" stroke="#141414" strokeWidth="2.5" markerEnd="url(#kw-prompt-arrow)" />
        {modifiers.map((m, i) => (
          <g key={m}>
            <rect x="258" y={84 + i * 38} width="150" height="28" rx="14" fill="#141414" />
            <text x="333" y={102 + i * 38} textAnchor="middle" fontSize="12" fontWeight="600" fill="white">{m}</text>
          </g>
        ))}
        <text x="590" y="28" textAnchor="middle" fontSize="11" fontWeight="700" letterSpacing="1.5" fill="#717171">PROMPTS PEOPLE TYPE</text>
        {prompts.map((lines, i) => (
          <g key={lines[0]}>
            <path d={`M413,135 C440,135 440,${75 + i * 80} 465,${75 + i * 80}`} fill="none" stroke="#adadad" strokeWidth="1.5" markerEnd="url(#kw-prompt-arrow)" />
            <rect x="470" y={42 + i * 80} width="295" height="66" rx="14" fill="white" stroke="#141414" strokeWidth="1.5" />
            {lines.map((line, j) => (
              <text key={line} x="486" y={70 + i * 80 + j * 17} fontSize="12" fill="#141414">{line}</text>
            ))}
          </g>
        ))}
      </svg>
      <figcaption className="mt-3 text-center text-sm text-quiet">
        SEO keyword research stops at the keyword. GEO keyword research keeps going until you have the full questions real buyers type.
      </figcaption>
    </figure>
  )
}

/** One prompt → the engine's background searches → a cited answer. */
function FanOutDiagram() {
  const subQueries = [
    "best GEO tools 2026",
    "Ahrefs Brand Radar review",
    "Profound vs Peec AI",
    "track ChatGPT mentions",
    "free GEO keyword research",
  ]
  return (
    <figure className="my-8">
      <svg viewBox="0 0 780 290" role="img" aria-labelledby="fan-out-title" className="h-auto w-full rounded-2xl border border-hairline bg-mist">
        <title id="fan-out-title">
          Query fan-out: an AI engine splits one prompt about GEO keyword research tools into several background searches, then cites the pages that answered them
        </title>
        <defs>
          <marker id="fan-out-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto">
            <path d="M0,0 L10,5 L0,10 z" fill="#141414" />
          </marker>
        </defs>
        <rect x="20" y="100" width="175" height="90" rx="14" fill="white" stroke="#141414" strokeWidth="1.5" />
        <text x="36" y="124" fontSize="10" fontWeight="700" letterSpacing="1.5" fill="#717171">THE PROMPT</text>
        <text x="36" y="146" fontSize="12" fill="#141414">“Which GEO keyword</text>
        <text x="36" y="163" fontSize="12" fill="#141414">research tools are</text>
        <text x="36" y="180" fontSize="12" fill="#141414">worth paying for?”</text>
        <path d="M200,145 L232,145" stroke="#141414" strokeWidth="2.5" markerEnd="url(#fan-out-arrow)" />
        <rect x="240" y="110" width="120" height="70" rx="35" fill="#141414" />
        <text x="300" y="141" textAnchor="middle" fontSize="13" fontWeight="700" fill="white">AI engine</text>
        <text x="300" y="159" textAnchor="middle" fontSize="11" fill="#adadad">fans out</text>
        {subQueries.map((q, i) => {
          const y = 22 + i * 52
          return (
            <g key={q}>
              <path d={`M362,145 C390,145 385,${y + 18} 408,${y + 18}`} fill="none" stroke="#adadad" strokeWidth="1.5" markerEnd="url(#fan-out-arrow)" />
              <rect x="413" y={y} width="210" height="36" rx="10" fill="white" stroke="#141414" strokeWidth="1.2" />
              <text x="425" y={y + 22} fontSize="11.5" fontFamily="monospace" fill="#141414">{q}</text>
              <path d={`M626,${y + 18} C650,${y + 18} 645,145 660,145`} fill="none" stroke="#adadad" strokeWidth="1.5" />
            </g>
          )
        })}
        <path d="M660,145 L668,145" stroke="#141414" strokeWidth="2.5" markerEnd="url(#fan-out-arrow)" />
        <rect x="672" y="105" width="95" height="80" rx="14" fill="white" stroke="#141414" strokeWidth="1.5" />
        <text x="719" y="138" textAnchor="middle" fontSize="12" fontWeight="700" fill="#141414">Answer</text>
        <text x="719" y="155" textAnchor="middle" fontSize="11" fill="#717171">cites the pages</text>
        <text x="719" y="170" textAnchor="middle" fontSize="11" fill="#717171">it found</text>
      </svg>
      <figcaption className="mt-3 text-center text-sm text-quiet">
        The sub-searches are where citations are won. A page that answers them clearly is far more likely to be one of the sources the final answer links to.
      </figcaption>
    </figure>
  )
}

/** The seven steps as a weekly loop. */
function GeoResearchPipelineDiagram() {
  const top = [
    { n: "01", title: "Seed from", title2: "Search Console", sub: "question + long queries" },
    { n: "02", title: "Rewrite as", title2: "prompts", sub: "persona × intent" },
    { n: "03", title: "Expand with", title2: "fan-out", sub: "the AI's sub-questions" },
    { n: "04", title: "Validate with", title2: "real questions", sub: "PAA, Reddit, sales calls" },
  ]
  const bottom = [
    { n: "05", title: "Check AI", title2: "visibility", sub: "who gets cited today" },
    { n: "06", title: "Score and", title2: "cluster", sub: "value × gap × proof" },
    { n: "07", title: "Write the", title2: "brief", sub: "one page per cluster" },
  ]
  const box = (b: (typeof top)[number], x: number, y: number) => (
    <g key={b.n}>
      <rect x={x} y={y} width="165" height="88" rx="12" fill="white" stroke="#141414" strokeWidth="1.5" />
      <text x={x + 14} y={y + 22} fontSize="11" fontFamily="monospace" fill="#adadad">{b.n}</text>
      <text x={x + 14} y={y + 42} fontSize="13" fontWeight="700" fill="#141414">{b.title}</text>
      <text x={x + 14} y={y + 58} fontSize="13" fontWeight="700" fill="#141414">{b.title2}</text>
      <text x={x + 14} y={y + 76} fontSize="11" fill="#717171">{b.sub}</text>
    </g>
  )
  return (
    <figure className="my-8">
      <svg viewBox="0 0 780 330" role="img" aria-labelledby="geo-pipeline-title" className="h-auto w-full rounded-2xl border border-hairline bg-mist">
        <title id="geo-pipeline-title">
          The automated GEO keyword research loop: seed from Search Console, rewrite as prompts, expand with fan-out, validate with real questions, check AI visibility, score and cluster, write the brief, then repeat weekly
        </title>
        <defs>
          <marker id="geo-pipeline-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto">
            <path d="M0,0 L10,5 L0,10 z" fill="#141414" />
          </marker>
        </defs>
        {top.map((b, i) => box(b, 20 + i * 195, 30))}
        {[0, 1, 2].map(i => (
          <path key={i} d={`M${190 + i * 195},74 L${210 + i * 195},74`} stroke="#141414" strokeWidth="2.5" markerEnd="url(#geo-pipeline-arrow)" />
        ))}
        <path d="M687,122 L687,190" stroke="#141414" strokeWidth="2.5" markerEnd="url(#geo-pipeline-arrow)" />
        {bottom.map((b, i) => box(b, 605 - i * 195, 200))}
        {[0, 1].map(i => (
          <path key={i} d={`M${600 - i * 195},244 L${580 - i * 195},244`} stroke="#141414" strokeWidth="2.5" markerEnd="url(#geo-pipeline-arrow)" />
        ))}
        <path d="M215,244 C102,244 102,210 102,126" fill="none" stroke="#adadad" strokeWidth="2" strokeDasharray="5 5" markerEnd="url(#geo-pipeline-arrow)" />
        <text x="112" y="168" fontSize="11" fontWeight="600" fill="#141414">repeat</text>
        <text x="112" y="183" fontSize="11" fontWeight="600" fill="#141414">weekly</text>
        <text x="390" y="318" textAnchor="middle" fontSize="11" fill="#717171">Steps 1 to 4 build the prompt map. Steps 5 to 7 turn it into work.</text>
      </svg>
      <figcaption className="mt-3 text-center text-sm text-quiet">
        Every step is something an AI agent can run. The loop matters more than any single run, because AI answers shift week to week.
      </figcaption>
    </figure>
  )
}

/** Business value × citation gap, the matrix used in step 6. */
function PriorityMatrixDiagram() {
  const quadrants = [
    { x: 110, y: 30, title: "Defend and refresh", sub: ["High value, you're already cited.", "Keep the page current."], dark: false },
    { x: 440, y: 30, title: "Write these first", sub: ["High value, competitors cited", "and you're not."], dark: true },
    { x: 110, y: 160, title: "Leave for now", sub: ["Low value, already covered.", "No action needed."], dark: false },
    { x: 440, y: 160, title: "Batch later", sub: ["Easy gaps on low-value prompts.", "Good for FAQ sections."], dark: false },
  ]
  return (
    <figure className="my-8">
      <svg viewBox="0 0 780 340" role="img" aria-labelledby="priority-matrix-title" className="h-auto w-full rounded-2xl border border-hairline bg-mist">
        <title id="priority-matrix-title">
          GEO priority matrix: business value on the vertical axis and citation gap on the horizontal axis. High value with a big gap means write these first.
        </title>
        {quadrants.map(q => (
          <g key={q.title}>
            <rect x={q.x} y={q.y} width="320" height="120" rx="14" fill={q.dark ? "#141414" : "white"} stroke="#141414" strokeWidth="1.5" />
            <text x={q.x + 22} y={q.y + 46} fontSize="17" fontWeight="700" fill={q.dark ? "white" : "#141414"}>{q.title}</text>
            {q.sub.map((line, j) => (
              <text key={line} x={q.x + 22} y={q.y + 72 + j * 17} fontSize="12" fill={q.dark ? "#d4d4d4" : "#717171"}>{line}</text>
            ))}
          </g>
        ))}
        <path d="M95,290 L95,30" stroke="#141414" strokeWidth="1.5" />
        <path d="M95,290 L770,290" stroke="#141414" strokeWidth="1.5" />
        <text x="60" y="160" textAnchor="middle" fontSize="12" fontWeight="700" fill="#141414" transform="rotate(-90 60 160)">Business value</text>
        <text x="110" y="312" fontSize="11" fill="#717171">You're cited</text>
        <text x="760" y="312" textAnchor="end" fontSize="11" fill="#717171">Competitors cited, you're absent</text>
        <text x="435" y="330" textAnchor="middle" fontSize="12" fontWeight="700" fill="#141414">Citation gap</text>
      </svg>
      <figcaption className="mt-3 text-center text-sm text-quiet">
        Sort every prompt cluster into one of four boxes. The top right is your content calendar for the next month.
      </figcaption>
    </figure>
  )
}

/** Free sources of real questions, grouped by where they come from. */
function PromptSourcesDiagram() {
  const groups = [
    { title: "Your own data", items: ["Search Console questions", "Site search terms", "Support tickets", "Sales call notes"] },
    { title: "The open web", items: ["People Also Ask", "Reddit and Quora", "YouTube comments", "Review sites"] },
    { title: "The AI engines", items: ["Follow-up suggestions", "Fan-out sub-questions", "Prompt tracking tools", "AI Overviews"] },
  ]
  return (
    <figure className="my-8">
      <svg viewBox="0 0 780 250" role="img" aria-labelledby="prompt-sources-title" className="h-auto w-full rounded-2xl border border-hairline bg-mist">
        <title id="prompt-sources-title">
          Where to find the prompts people ask ChatGPT: your own data, the open web and the AI engines themselves
        </title>
        {groups.map((g, i) => {
          const x = 20 + i * 250
          return (
            <g key={g.title}>
              <rect x={x} y="20" width="240" height="210" rx="14" fill="white" stroke="#141414" strokeWidth="1.5" />
              <rect x={x} y="20" width="240" height="44" rx="14" fill="#141414" />
              <rect x={x} y="50" width="240" height="14" fill="#141414" />
              <text x={x + 120} y="48" textAnchor="middle" fontSize="13" fontWeight="700" fill="white">{g.title}</text>
              {g.items.map((item, j) => (
                <g key={item}>
                  <circle cx={x + 24} cy={95 + j * 36} r="4" fill="#141414" />
                  <text x={x + 38} y={99 + j * 36} fontSize="13" fill="#141414">{item}</text>
                </g>
              ))}
            </g>
          )
        })}
      </svg>
      <figcaption className="mt-3 text-center text-sm text-quiet">
        No AI engine publishes its prompts, so you triangulate. Questions that show up in two or more columns are the ones worth writing for.
      </figcaption>
    </figure>
  )
}

export default function HowToAutomateGeoKeywordResearchPage() {
  return (
    <BlogPostShell slug={SLUG} faqs={faqs}>
      <div className="space-y-6 text-neutral-600 leading-relaxed">
        <p className="text-lg text-ink">
          <strong>
            To automate keyword research for GEO, pull the question and long-tail queries from Google Search Console,
            have an AI agent rewrite each one as the prompts real buyers type into ChatGPT, Perplexity and Gemini, expand
            them into the sub-questions those engines search for, check who gets cited today, and turn the gaps into
            content briefs on a weekly schedule.
          </strong>{" "}
          This guide walks through all seven steps, the tools for each, and the exact agent prompt we use.
        </p>
        <p>
          Classic keyword research gives you short phrases and a search volume. AI search doesn&apos;t work in short
          phrases. People ask ChatGPT full questions with their situation attached, the engine quietly runs several
          searches behind the scenes, and the answer cites a handful of sources. Keyword research for AI search has to
          find those questions and those sources. Doing that by hand every week is slow; it is also exactly the kind
          of repetitive, data-heavy loop an AI agent handles well.
        </p>

        <div className="rounded-2xl border border-hairline bg-mist p-6 my-8">
          <h2 className="text-xl font-semibold tracking-[-0.02em] text-ink mb-3">TL;DR</h2>
          <ul className="list-disc pl-6 space-y-2 text-ink">
            <li>GEO keyword research maps the <strong>prompts</strong> people ask AI engines and <strong>who gets cited</strong>, not just keywords and volume</li>
            <li>Your best seed list is free: question queries and 6+ word queries in Google Search Console</li>
            <li>An LLM rewrites each keyword into realistic prompts (persona × intent × situation), then lists the <strong>fan-out</strong> sub-questions behind them</li>
            <li>Validate with real questions from People Also Ask, Reddit, support tickets and sales calls, since no AI engine publishes prompt volumes</li>
            <li>Check ChatGPT, Perplexity, Gemini and Google AI Mode for who is cited, score each cluster on value, gap and proof, and brief the winners</li>
            <li>Run it weekly. One agent prompt below automates the whole loop</li>
          </ul>
        </div>

        <h2 id="what-is-geo-keyword-research" className={H2}>What Is GEO Keyword Research?</h2>
        <p>
          GEO keyword research is the process of finding the questions people ask AI answer engines about your topic,
          and checking which brands and pages those engines cite in their answers. GEO stands for generative engine
          optimization: getting your content quoted and linked by ChatGPT, Perplexity, Gemini, Claude and Google&apos;s
          AI Overviews and AI Mode. (Our guide to{" "}
          <Link href="/blog/how-to-automate-seo-and-geo-growth-with-ai-agent" className={LINK}>automating SEO and GEO with an AI agent</Link>{" "}
          covers the bigger picture.)
        </p>
        <p>It shares a starting point with SEO keyword research but ends somewhere different:</p>
        <div className="my-6 overflow-x-auto rounded-xl border border-hairline">
          <table className="w-full text-left text-sm">
            <thead className="bg-mist text-ink">
              <tr>
                <th className="p-4 font-semibold"></th>
                <th className="p-4 font-semibold">SEO keyword research</th>
                <th className="p-4 font-semibold">GEO keyword research</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              <tr><td className="p-4 font-medium text-ink">Unit of research</td><td className="p-4">A keyword of 2 to 4 words</td><td className="p-4">A full prompt, often 10 to 30 words, with context</td></tr>
              <tr><td className="p-4 font-medium text-ink">Demand signal</td><td className="p-4">Monthly search volume</td><td className="p-4">No official volume; triangulated from questions people really ask</td></tr>
              <tr><td className="p-4 font-medium text-ink">What you compete for</td><td className="p-4">A position on page one</td><td className="p-4">A mention or a citation inside the answer</td></tr>
              <tr><td className="p-4 font-medium text-ink">Who you compete with</td><td className="p-4">The ten blue links</td><td className="p-4">The few sources the engine picks for each sub-question</td></tr>
              <tr><td className="p-4 font-medium text-ink">How you measure it</td><td className="p-4">Rank tracking</td><td className="p-4">Repeated prompt checks: cited, mentioned or absent</td></tr>
              <tr><td className="p-4 font-medium text-ink">Output</td><td className="p-4">A keyword list</td><td className="p-4">A prompt map grouped into clusters, one page per cluster</td></tr>
            </tbody>
          </table>
        </div>

        <h2 id="why-doesnt-normal-keyword-research-work-for-ai-search" className={H2}>Why Doesn&apos;t Normal Keyword Research Work for AI Search?</h2>
        <p>
          Normal keyword research misses how AI search actually picks its sources. Two things are different.
        </p>
        <p>
          <strong className="text-ink">People ask in full sentences, with their situation attached.</strong> Nobody
          types &quot;keyword research for ai search&quot; into ChatGPT. They type &quot;I run a small agency, how do I find out
          what clients ask ChatGPT about our niche?&quot; The keyword is still in there, but the persona and the context
          decide what a good answer looks like, and which page gets cited.
        </p>

        <KeywordToPromptDiagram />

        <p>
          <strong className="text-ink">The engine searches more than the prompt.</strong> Google describes a technique
          called <em>query fan-out</em>: AI Mode breaks a question into subtopics and runs many searches at once on the
          user&apos;s behalf, then combines what it finds into one answer (see{" "}
          <a href="https://blog.google/products/search/google-search-ai-mode-update/" target="_blank" rel="noopener noreferrer" className={LINK}>Google&apos;s AI Mode announcement</a>).
          ChatGPT and Perplexity work in a similar way when they browse. The pages that get cited are often the ones
          that best answer one of those hidden sub-questions, not the one that matches the original wording.
        </p>

        <FanOutDiagram />

        <p>
          So GEO keyword research has to answer three questions SEO tools don&apos;t: what do people actually ask, what
          does the engine search for to answer it, and who gets cited when it does.
        </p>

        <h2 id="how-to-automate-keyword-research-for-geo-step-by-step" className={H2}>How to Automate Keyword Research for GEO, Step by Step</h2>
        <p>
          Here is the full loop. Each step is written so you can do it by hand first, then hand it to an agent. The
          agent prompt further down runs all seven.
        </p>

        <GeoResearchPipelineDiagram />

        <h3 className="text-xl font-semibold tracking-[-0.01em] text-ink mt-8 mb-3">Step 1: Seed from Google Search Console</h3>
        <p>
          Your Search Console data is the best free seed list you have, because it shows the questions people already
          associate with your site. Open the Performance report, set the date range to the last three months, and add
          a Query filter using <strong>Custom (regex)</strong>. Two filters do most of the work:
        </p>
        <div className="my-6 overflow-x-auto rounded-xl border border-hairline">
          <table className="w-full text-left text-sm">
            <thead className="bg-mist text-ink">
              <tr>
                <th className="p-4 font-semibold">Filter</th>
                <th className="p-4 font-semibold">Regex to paste</th>
                <th className="p-4 font-semibold">What it finds</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              <tr><td className="p-4 font-medium text-ink">Questions</td><td className="p-4 font-mono text-xs text-ink">{"^(how|what|why|which|who|when|where|can|does|do|is|are|should)\\b"}</td><td className="p-4">Queries phrased as questions, the closest thing to a prompt</td></tr>
              <tr><td className="p-4 font-medium text-ink">Long queries</td><td className="p-4 font-mono text-xs text-ink">{"^(\\S+\\s){5,}\\S+$"}</td><td className="p-4">Queries of six words or more, which carry the most context</td></tr>
            </tbody>
          </table>
        </div>
        <p>
          Export both and keep the top 50 by impressions. Google counts AI Mode clicks and impressions in these same
          reports, and its newer{" "}
          <a href="https://developers.google.com/search/blog/2026/06/gen-ai-performance-reports" target="_blank" rel="noopener noreferrer" className={LINK}>generative AI performance reports</a>{" "}
          show which of your pages appear in AI Overviews and AI Mode. Note those pages: they are your starting
          GEO footprint.
        </p>
        <p>
          <strong className="text-ink">To automate it:</strong> connect the agent to the Search Console API (read-only)
          and have it run both filters on every run, so the seed list refreshes itself.
        </p>

        <h3 className="text-xl font-semibold tracking-[-0.01em] text-ink mt-8 mb-3">Step 2: Rewrite each keyword as real prompts</h3>
        <p>
          A model like Claude or ChatGPT turns each seed into the prompts different buyers would type. Give it a
          simple formula: <strong>persona × intent × situation</strong>. Persona is who is asking (owner, marketer,
          freelancer). Intent is what they want (learn, compare, choose, fix). Situation is the detail people add
          (&quot;we&apos;re a 10-person team&quot;, &quot;on a small budget&quot;, &quot;we use WordPress&quot;).
        </p>
        <p>
          Ask for three to five prompts per seed and tell the model to write the way people type into a chatbot,
          not the way marketers write headlines. Fifty seeds become 150 to 250 prompts in a few minutes.
        </p>

        <h3 className="text-xl font-semibold tracking-[-0.01em] text-ink mt-8 mb-3">Step 3: Expand each prompt with fan-out questions</h3>
        <p>
          Next, ask the model to play the engine: &quot;To answer this prompt well, which four to six searches would you
          run?&quot; The answer is a close stand-in for the fan-out queries an AI engine sends in the background. These
          sub-questions are gold. They become the H2s of the page you write, and each one is a separate chance to be
          the source the engine cites.
        </p>
        <p>
          If you use Perplexity or ChatGPT with search on, you can also open the sources panel on an answer to see
          which searches and pages it actually used.
        </p>

        <h3 className="text-xl font-semibold tracking-[-0.01em] text-ink mt-8 mb-3">Step 4: Validate with questions real people ask</h3>
        <p>
          Generated prompts are a hypothesis. Before you build on them, check that people really ask these things.
          The fastest checks are Google&apos;s People Also Ask boxes, Reddit and Quora threads, and the questions in your
          own support inbox and sales calls. Drop prompts you can&apos;t find any trace of, and add the real questions you
          find that the model missed. The next section covers these sources in more detail.
        </p>

        <h3 className="text-xl font-semibold tracking-[-0.01em] text-ink mt-8 mb-3">Step 5: Check who AI search cites today</h3>
        <p>
          Now run your top 20 prompts through the engines your buyers use: ChatGPT (with search), Perplexity, Gemini
          and Google AI Mode. For each answer, log which brands are mentioned, which URLs are cited, and whether you
          appear. A simple sheet is enough:
        </p>
        <div className="my-6 overflow-x-auto rounded-xl border border-hairline">
          <table className="w-full text-left text-sm">
            <thead className="bg-mist text-ink">
              <tr>
                <th className="p-4 font-semibold">Prompt</th>
                <th className="p-4 font-semibold">Engine</th>
                <th className="p-4 font-semibold">Brands mentioned</th>
                <th className="p-4 font-semibold">URLs cited</th>
                <th className="p-4 font-semibold">You</th>
                <th className="p-4 font-semibold">Checked</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              <tr>
                <td className="p-4 text-ink">Which GEO keyword research tools are worth paying for?</td>
                <td className="p-4">Perplexity</td>
                <td className="p-4">[brand A], [brand B]</td>
                <td className="p-4">[competitor].com/blog/…</td>
                <td className="p-4 font-medium text-ink">Absent</td>
                <td className="p-4">[date]</td>
              </tr>
              <tr>
                <td className="p-4 text-ink">…</td>
                <td className="p-4">ChatGPT</td>
                <td className="p-4">…</td>
                <td className="p-4">…</td>
                <td className="p-4 font-medium text-ink">Cited / Mentioned / Absent</td>
                <td className="p-4">…</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          One warning: AI answers vary from run to run, and by user and location. Treat each check as a sample. Run
          the same prompts weekly and look at the trend, not one result.
        </p>
        <p>
          <strong className="text-ink">To automate it:</strong> a do-it-yourself agent can approximate this with web
          search, which shows the pages engines are likely to draw from. To log the real answers at scale, use the
          engines&apos; APIs or a prompt tracking tool from the table below.
        </p>

        <SignupCta eyebrow="Skip the spreadsheet" heading="Let an agent find the searches and prompts you can win">
          The SEO &amp; GEO agent reads your Search Console, researches what your buyers search on Google and ask AI,
          checks which AI tools cite you, and writes the pages to close the gaps. Sign up free and connect your site.
        </SignupCta>

        <h3 className="text-xl font-semibold tracking-[-0.01em] text-ink mt-8 mb-3">Step 6: Score and cluster the prompts</h3>
        <p>
          Group prompts that one page could answer into a cluster. A few hundred prompts usually collapse into a much
          shorter list of topics. Then score each cluster from 1 to 5 on three things:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong className="text-ink">Business value:</strong> would someone asking this become a customer?</li>
          <li><strong className="text-ink">Citation gap:</strong> are competitors cited while you are absent?</li>
          <li><strong className="text-ink">Proof:</strong> do you have first-hand data, examples or expertise to add? AI engines favor pages with facts they can quote.</li>
        </ul>
        <p>Multiply the three. The highest scores land in the top right of this matrix:</p>

        <PriorityMatrixDiagram />

        <h3 className="text-xl font-semibold tracking-[-0.01em] text-ink mt-8 mb-3">Step 7: Turn each cluster into a brief, and schedule the loop</h3>
        <p>
          A GEO brief is a normal content brief with three extras. It names the <strong>target prompt</strong>, not
          just the keyword. It lists the <strong>fan-out questions as H2s</strong>. And it drafts the{" "}
          <strong>40 to 60 word direct answer</strong> the page opens with, since that is the passage most likely to be
          quoted. Add the facts the page must include, the schema to use (Article, FAQPage, HowTo) and the existing
          pages that should link to it.
        </p>
        <p>
          Then put the loop on a schedule. Re-run steps 1 and 5 weekly to catch new questions and track citations, and
          the full research monthly. The schedule is what turns a one-off project into a system.
        </p>

        <h2 id="how-to-find-prompts-people-ask-chatgpt" className={H2}>How Do You Find the Prompts People Ask ChatGPT?</h2>
        <p>
          You find the prompts people ask ChatGPT by triangulating, because OpenAI doesn&apos;t publish them. There is no
          Search Console for ChatGPT. Instead, combine three kinds of sources and trust the questions that show up in
          more than one.
        </p>

        <PromptSourcesDiagram />

        <ul className="list-disc pl-6 space-y-2">
          <li><strong className="text-ink">Your own data.</strong> Search Console question queries, your site search, support tickets and sales call notes. These are the closest thing to a buyer&apos;s raw prompt, and nobody else has them.</li>
          <li><strong className="text-ink">The open web.</strong> People Also Ask, Reddit, Quora, YouTube comments and review sites show how people phrase problems in their own words. Tools like AlsoAsked and AnswerThePublic speed this up.</li>
          <li><strong className="text-ink">The AI engines themselves.</strong> Ask ChatGPT or Perplexity a seed question and note the follow-up questions it suggests. Use fan-out (step 3) to see what the engine searches. And if you pay for a prompt tracking tool, its prompt database shows which questions it has seen.</li>
        </ul>
        <p>
          A practical tip: sales calls are underrated. The way a prospect describes their problem on a call is almost
          exactly how they describe it to ChatGPT the night before.
        </p>

        <h2 id="what-are-the-best-geo-keyword-research-tools" className={H2}>What Are the Best GEO Keyword Research Tools?</h2>
        <p>
          The best GEO keyword research tools are the ones that cover each step of the loop. No single tool does all
          seven, so most teams combine a free data source, an LLM and one tracking tool:
        </p>
        <div className="my-6 overflow-x-auto rounded-xl border border-hairline">
          <table className="w-full text-left text-sm">
            <thead className="bg-mist text-ink">
              <tr>
                <th className="p-4 font-semibold">Tool</th>
                <th className="p-4 font-semibold">Step it covers</th>
                <th className="p-4 font-semibold">What it does for GEO</th>
                <th className="p-4 font-semibold">Cost</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              <tr><td className="p-4 font-medium text-ink">Google Search Console</td><td className="p-4">1, 5</td><td className="p-4">Question and long queries from your real traffic; AI Mode data and generative AI reports</td><td className="p-4">Free</td></tr>
              <tr><td className="p-4 font-medium text-ink">Claude or ChatGPT</td><td className="p-4">2, 3, 6, 7</td><td className="p-4">Rewrites keywords as prompts, lists fan-out questions, clusters and writes briefs</td><td className="p-4">Free tier or subscription</td></tr>
              <tr><td className="p-4 font-medium text-ink">Perplexity</td><td className="p-4">3, 5</td><td className="p-4">Shows the sources behind each answer, so you see who is cited</td><td className="p-4">Free tier</td></tr>
              <tr><td className="p-4 font-medium text-ink">AlsoAsked, AnswerThePublic</td><td className="p-4">4</td><td className="p-4">Maps People Also Ask and autocomplete questions around a topic</td><td className="p-4">Free tier, paid plans</td></tr>
              <tr><td className="p-4 font-medium text-ink">Ahrefs Brand Radar</td><td className="p-4">4, 5</td><td className="p-4">AI visibility across a large prompt index, plus tracking for your own prompts</td><td className="p-4">Paid</td></tr>
              <tr><td className="p-4 font-medium text-ink">Semrush AI toolkit</td><td className="p-4">4, 5</td><td className="p-4">Brand visibility and mentions in AI answers alongside classic keyword data</td><td className="p-4">Paid</td></tr>
              <tr><td className="p-4 font-medium text-ink">Profound, Peec AI, Otterly.AI</td><td className="p-4">5</td><td className="p-4">Dedicated prompt tracking across ChatGPT, Perplexity, Gemini and AI Overviews</td><td className="p-4">Paid</td></tr>
              <tr><td className="p-4 font-medium text-ink">Google Sheets</td><td className="p-4">All</td><td className="p-4">Holds the prompt map, visibility log and briefs the agent writes to</td><td className="p-4">Free</td></tr>
            </tbody>
          </table>
        </div>
        <p>
          Prompt volume numbers from paid tools are estimates built from panels, People Also Ask data and keyword databases. They are useful
          for comparing prompts with each other, not as exact demand. Tools in this space change quickly, so check
          current features before you buy.
        </p>

        <h2 id="geo-keyword-research-agent-prompt" className={H2}>Copy the GEO Keyword Research Agent Prompt</h2>
        <p>
          This prompt runs all seven steps. Paste it into a Claude Project (or any agent builder), connect Google
          Search Console, Google Sheets and web search, and swap the brackets for your details. New to agents? Our
          guide on{" "}
          <Link href="/blog/how-to-build-an-ai-agent" className={LINK}>how to build an AI agent</Link>{" "}
          covers the setup.
        </p>

        <PromptBlock prompt={GEO_KEYWORD_AGENT_PROMPT} label="GEO keyword research agent" leadSource="prompt_geo_keyword_research" />

        <p>
          Run it on demand the first few times and read every output. When the clusters look right, trigger it on a
          weekly schedule with n8n, Make or a hosted agent. Long runs in a chat app can hit usage limits halfway
          through, which is the usual reason to move a research agent onto a schedule with its own hosting.
        </p>

        <h2 id="what-does-a-geo-prompt-map-look-like" className={H2}>What Does a GEO Prompt Map Look Like? (A Worked Example)</h2>
        <p>
          A GEO prompt map links each target keyword to the prompts behind it and the questions a page must answer.
          Here is the real map we built for this article. The five keywords we targeted are on the left; the
          right-hand column shows where this page answers each one.
        </p>
        <div className="my-6 overflow-x-auto rounded-xl border border-hairline">
          <table className="w-full text-left text-sm">
            <thead className="bg-mist text-ink">
              <tr>
                <th className="p-4 font-semibold">Target keyword</th>
                <th className="p-4 font-semibold">A prompt behind it</th>
                <th className="p-4 font-semibold">Fan-out questions</th>
                <th className="p-4 font-semibold">Answered in</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              <tr>
                <td className="p-4 font-medium text-ink">how to automate keyword research for geo</td>
                <td className="p-4">&quot;Can an AI agent do my GEO keyword research every week?&quot;</td>
                <td className="p-4">What are the steps? What can be automated? What does it cost?</td>
                <td className="p-4"><a href="#how-to-automate-keyword-research-for-geo-step-by-step" className={LINK}>The seven steps</a>, <a href="#geo-keyword-research-agent-prompt" className={LINK}>agent prompt</a></td>
              </tr>
              <tr>
                <td className="p-4 font-medium text-ink">geo keyword research tools</td>
                <td className="p-4">&quot;Which GEO tools are worth paying for if I&apos;m a small team?&quot;</td>
                <td className="p-4">Free vs paid? Which track ChatGPT? Is prompt volume accurate?</td>
                <td className="p-4"><a href="#what-are-the-best-geo-keyword-research-tools" className={LINK}>Tools table</a></td>
              </tr>
              <tr>
                <td className="p-4 font-medium text-ink">keyword research for ai search</td>
                <td className="p-4">&quot;Is keyword research still worth doing now people use AI?&quot;</td>
                <td className="p-4">How is it different from SEO? Why don&apos;t keyword tools work?</td>
                <td className="p-4"><a href="#what-is-geo-keyword-research" className={LINK}>SEO vs GEO table</a>, <a href="#why-doesnt-normal-keyword-research-work-for-ai-search" className={LINK}>fan-out</a></td>
              </tr>
              <tr>
                <td className="p-4 font-medium text-ink">how to find prompts people ask chatgpt</td>
                <td className="p-4">&quot;How do I find out what customers ask ChatGPT about my industry?&quot;</td>
                <td className="p-4">Does OpenAI share data? Which sources are free? Can tools estimate it?</td>
                <td className="p-4"><a href="#how-to-find-prompts-people-ask-chatgpt" className={LINK}>Prompt sources</a></td>
              </tr>
              <tr>
                <td className="p-4 font-medium text-ink">automate geo content optimization</td>
                <td className="p-4">&quot;Once I know the prompts, how do I make my pages get cited?&quot;</td>
                <td className="p-4">What makes a page citable? Can AI write it? How do I keep it current?</td>
                <td className="p-4"><a href="#how-to-automate-geo-content-optimization" className={LINK}>Next section</a></td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          Notice that five keywords became one page, not five. They share most of their fan-out questions, so one
          thorough page has a better chance of being cited for all of them than five thin ones.
        </p>

        <h2 id="how-to-automate-geo-content-optimization" className={H2}>How Do You Automate GEO Content Optimization After the Research?</h2>
        <p>
          You automate GEO content optimization by feeding each brief to an agent that writes or updates the page in a
          citable format, publishes it, and re-checks the same prompts a week later. The research tells you what to
          write; the format decides whether you get quoted.
        </p>
        <p>
          The original{" "}
          <a href="https://arxiv.org/abs/2311.09735" target="_blank" rel="noopener noreferrer" className={LINK}>GEO research paper</a>{" "}
          from Princeton and partners (published at KDD 2024) found that methods such as adding statistics, quotations
          and source citations could raise a page&apos;s visibility in generative engine answers by up to 40%. In practice,
          a citable page has:
        </p>
        <ol className="list-decimal pl-6 space-y-2">
          <li><strong className="text-ink">A direct answer first.</strong> 40 to 60 words that answer the target prompt on their own.</li>
          <li><strong className="text-ink">Question-style H2s</strong> taken from the fan-out list, each answered in its first sentence.</li>
          <li><strong className="text-ink">Facts an engine can lift:</strong> numbers, named tools, dates and sources, plus your own data where you have it.</li>
          <li><strong className="text-ink">Tables and numbered steps</strong> for comparisons and how-tos.</li>
          <li><strong className="text-ink">FAQ and Article schema</strong>, a named author and a visible updated date.</li>
          <li><strong className="text-ink">Internal links</strong> from related pages, so the cluster reads as one body of expertise.</li>
        </ol>
        <p>
          Every item on that list can be checked and applied by an agent. Closing the loop matters most: when the
          weekly visibility check shows a page is still absent for its prompts, the agent revisits the brief and
          updates the page. That is what our{" "}
          <Link href="/agents/seo-geo" className={LINK}>SEO &amp; GEO agent</Link>{" "}
          does: it reads your Search Console, finds the searches you can win, writes pages built for Google and AI
          answers, publishes them to WordPress, Webflow, Shopify or Ghost, and tracks what slips.
        </p>

        <h2 id="summary" className={H2}>Summary</h2>
        <p>
          Keyword research for AI search starts where SEO keyword research ends. Take your Search Console questions,
          rewrite them as the prompts real buyers type, expand them with fan-out, validate them against questions
          people really ask, then check who ChatGPT, Perplexity, Gemini and Google AI Mode cite. Score the gaps, brief
          one page per cluster, and repeat weekly.
        </p>
        <p>
          You can run that loop by hand with free tools, automate it with the agent prompt above, or hand the whole
          thing, research to publishing, to an agent that runs it for you.
        </p>

        <SignupCta heading="Get cited by AI search without running the loop yourself">
          Sign up free, connect Google Search Console, and the SEO &amp; GEO agent starts finding the prompts and searches
          you can win, then writes the pages to win them.
        </SignupCta>
      </div>
    </BlogPostShell>
  )
}

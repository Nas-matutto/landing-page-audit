import type { ReactNode } from "react"
import Link from "next/link"
import { SignupCta } from "@/components/blog/signup-cta"
import { BlogPostShell } from "@/components/blog/post-shell"
import { Figure } from "@/components/blog/figure"
import { PromptBlock } from "@/components/blog/prompt-block"
import { buildPostMetadata, type Faq } from "@/lib/blog"

const SLUG = "how-to-get-cited-by-chatgpt"

export const metadata = buildPostMetadata(SLUG)

const H2 = "text-3xl font-semibold tracking-[-0.02em] text-ink mt-12 mb-4"
const H3 = "text-xl font-semibold tracking-[-0.01em] text-ink mt-8 mb-3"
const LINK = "text-ink underline decoration-ink/25 underline-offset-4 hover:decoration-ink"
const IMG = "/blog/how-to-get-cited-by-chatgpt"
const DATA_CSV = `${IMG}/ai-crawler-access-top-1000-websites-oct-2026.csv`

const faqs: Faq[] = [
  {
    question: "How do I get my website cited by ChatGPT?",
    answer:
      "Make sure ChatGPT's search crawler, OAI-SearchBot, is allowed in your robots.txt and not blocked by your firewall or CDN, get the page indexed in Google and Bing, and write it so the first two sentences answer the question directly. Back the answer with facts, sources and your own data, use question-style headings, and get mentioned on the other sites that AI answers already cite.",
  },
  {
    question: "Does blocking GPTBot stop ChatGPT from citing my site?",
    answer:
      "No. GPTBot is OpenAI's training crawler; blocking it only opts your content out of training future models. ChatGPT search uses a different crawler, OAI-SearchBot. OpenAI says sites that block OAI-SearchBot will not be shown in ChatGPT search answers. You can block GPTBot and allow OAI-SearchBot at the same time, and in our October 2026 study, 45 of the 92 top websites that block GPTBot do exactly that.",
  },
  {
    question: "Is GEO different from SEO?",
    answer:
      "GEO (generative engine optimization) builds on SEO rather than replacing it. AI answer engines pick their sources from pages they can crawl and that rank in search, so technical SEO and rankings come first. GEO adds the parts that make a page easy to quote: a direct answer up top, one question per section, verifiable facts and original data, and mentions on other trusted sites.",
  },
  {
    question: "How long does it take to get cited by AI search?",
    answer:
      "Crawler changes are quick: OpenAI says robots.txt changes take about 24 hours to reach ChatGPT search. Content changes take as long as it takes the page to be recrawled and to rank, usually a few days to a few weeks for an existing page and longer for a new one. Because AI answers vary from one run to the next, track the same questions weekly rather than judging from a single check.",
  },
  {
    question: "Do I need an llms.txt file or special schema to get cited?",
    answer:
      "Google says you don't need new machine-readable files, AI text files or special schema.org markup to appear in AI Overviews or AI Mode. An llms.txt file is cheap to publish and harmless, but don't expect it to move citations on its own. Normal structured data still helps, as long as it matches the text visible on the page.",
  },
  {
    question: "How can I tell if ChatGPT or Google AI Overviews send me traffic?",
    answer:
      "Google counts clicks from AI Overviews and AI Mode inside the normal Web search type in Search Console; it doesn't report them separately. Visits from ChatGPT, Perplexity, Claude and Gemini usually show up as referral traffic from their domains, such as chatgpt.com and perplexity.ai, in your analytics. To see citations that don't produce a click, ask the engines your buyers' questions on a schedule and record who they cite.",
  },
  {
    question: "Can I pay to be cited by ChatGPT?",
    answer:
      "Not in the organic answer. Citations in ChatGPT search, Perplexity and Google's AI features come from their own crawling and ranking, not from payment. The levers you control are crawler access, rankings, how quotable your pages are, and how often trusted sites mention you.",
  },
]

const ROBOTS_TXT = `# Let AI search engines find and cite your pages
User-agent: OAI-SearchBot
User-agent: Claude-SearchBot
User-agent: PerplexityBot
Disallow: /admin/

# Optional: opt out of AI model training
User-agent: GPTBot
User-agent: ClaudeBot
User-agent: CCBot
Disallow: /

# Everyone else, including Googlebot and Bingbot
User-agent: *
Disallow: /admin/

Sitemap: https://yourdomain.com/sitemap.xml`

const VISIBILITY_PROMPT = `You are an AI visibility analyst for [Business Name] ([yourdomain.com]), which sells [product or service] to [audience].

GOAL
Find out whether AI search tools cite us for the questions our buyers ask, who they cite instead, and what to fix first.

QUESTIONS
[Paste 10 to 20 questions your buyers ask, for example "What is the best [product] for a small [type of business]?"]

STEPS
1. For each question, search the web and list the 3 to 5 sources you would cite in a good answer.
2. Note whether [yourdomain.com] is one of them, and which page.
3. For every source cited instead of us, say why it was picked: a direct answer in its first lines, original data, a comparison table, a recent update, a trusted third-party site, or a heading that matches the question.
4. Sort the questions into three groups: cited, close (we have a page but it isn't cited) and missing (we have no page that answers it).

RULES
- Only report sources you actually found. Never guess or invent URLs.
- If you can't search the web, stop and say so.

OUTPUT
A table with: question, cited (yes or no), who is cited instead, why, and the one change most likely to get us cited.
Then the top 3 pages to write or fix, in order.`

function DiagramFrame({ id, title, caption, viewBox, children }: { id: string; title: string; caption: string; viewBox: string; children: ReactNode }) {
  return (
    <figure className="my-8">
      <svg viewBox={viewBox} role="img" aria-labelledby={id} className="h-auto w-full rounded-2xl border border-hairline bg-mist">
        <title id={id}>{title}</title>
        <defs>
          <marker id={`${id}-arrow`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto">
            <path d="M0,0 L10,5 L0,10 z" fill="#141414" />
          </marker>
        </defs>
        {children}
      </svg>
      <figcaption className="mt-3 text-center text-sm text-quiet">{caption}</figcaption>
    </figure>
  )
}

/** Question → fan-out searches → crawlable candidate pages → answer with citations. */
function HowAiPicksSourcesDiagram() {
  const box = (x: number, title: string, lines: string[], dark = false) => (
    <g>
      <rect x={x} y="40" width="168" height="110" rx="12" fill={dark ? "#141414" : "white"} stroke="#141414" strokeWidth="1.5" />
      <text x={x + 84} y="74" textAnchor="middle" fontSize="14" fontWeight="700" fill={dark ? "white" : "#141414"}>{title}</text>
      {lines.map((line, i) => (
        <text key={line} x={x + 84} y={98 + i * 16} textAnchor="middle" fontSize="11" fill={dark ? "#d4d4d4" : "#717171"}>{line}</text>
      ))}
    </g>
  )
  return (
    <DiagramFrame
      id="ai-sources-title"
      viewBox="0 0 780 230"
      title="How AI search picks the sources it cites: the question is split into several searches, the engine gathers pages it is allowed to crawl and that rank, then writes an answer citing the clearest ones"
      caption="A page has to clear every gate to be cited. Blocking the search crawler removes it at the second step, however good it is."
    >
      {box(14, "1. Question", ["“Best CRM for a", "small agency?”"])}
      {box(206, "2. Fan-out searches", ["agency CRM features,", "CRM pricing, reviews"])}
      {box(398, "3. Candidate pages", ["Crawlable, indexed", "and ranking"])}
      {box(590, "4. Answer + citations", ["Quotes the clearest,", "best-supported pages"], true)}
      {[182, 374, 566].map(x => (
        <path key={x} d={`M${x + 2},95 L${x + 20},95`} stroke="#141414" strokeWidth="2.5" markerEnd="url(#ai-sources-title-arrow)" />
      ))}
      <text x="482" y="180" textAnchor="middle" fontSize="12" fontWeight="600" fill="#141414">Gate: can the AI search crawler reach the page?</text>
      <text x="482" y="200" textAnchor="middle" fontSize="11" fill="#717171">OAI-SearchBot (ChatGPT), Claude-SearchBot, PerplexityBot, Googlebot</text>
    </DiagramFrame>
  )
}

const STUDY = [
  { group: "Classic search", rows: [
    { bot: "Bingbot", who: "Bing", pct: 0.6, n: 3 },
  ] },
  { group: "AI search crawlers", rows: [
    { bot: "OAI-SearchBot", who: "ChatGPT search", pct: 9.8, n: 47 },
    { bot: "Claude-SearchBot", who: "Claude search", pct: 11.1, n: 53 },
    { bot: "PerplexityBot", who: "Perplexity", pct: 15.4, n: 74 },
  ] },
  { group: "AI training crawlers", rows: [
    { bot: "Google-Extended", who: "Gemini", pct: 16.7, n: 80 },
    { bot: "GPTBot", who: "OpenAI training", pct: 19.2, n: 92 },
    { bot: "ClaudeBot", who: "Anthropic training", pct: 19.8, n: 95 },
    { bot: "CCBot", who: "Common Crawl", pct: 21.7, n: 104 },
  ] },
]

/** Horizontal bars: % of the 479 sites in the study that block each crawler. */
function CrawlerBlockChart() {
  const x0 = 290
  const scale = 400 / 25
  const fills: Record<string, string> = { "Classic search": "#adadad", "AI search crawlers": "#141414", "AI training crawlers": "#717171" }
  let y = 52
  const rows: ReactNode[] = []
  for (const group of STUDY) {
    rows.push(<text key={group.group} x="20" y={y} fontSize="11" fontWeight="700" fill="#141414" letterSpacing="0.06em">{group.group.toUpperCase()}</text>)
    y += 14
    for (const row of group.rows) {
      const w = row.pct * scale
      rows.push(
        <g key={row.bot}>
          <text x="20" y={y + 13} fontSize="13" fontWeight="600" fill="#141414">{row.bot}</text>
          <text x="160" y={y + 13} fontSize="11" fill="#717171">{row.who}</text>
          {w > 0 && <rect x={x0} y={y + 2} width={Math.max(w, 3)} height="16" rx="4" fill={fills[group.group]} />}
          <text x={x0 + Math.max(w, 0) + 8} y={y + 14} fontSize="12" fontWeight="600" fill="#141414">{row.pct.toFixed(1)}% ({row.n})</text>
        </g>,
      )
      y += 26
    }
    y += 14
  }
  return (
    <DiagramFrame
      id="crawler-block-chart-title"
      viewBox={`0 0 780 ${y + 14}`}
      title="Share of the top 1,000 websites (479 sites that allow Googlebot) that block each crawler in robots.txt, October 2026: Bingbot 0.6%, OAI-SearchBot 9.8%, Claude-SearchBot 11.1%, PerplexityBot 15.4%, Google-Extended 16.7%, GPTBot 19.2%, ClaudeBot 19.8%, CCBot 21.7%"
      caption="Top sites block AI training crawlers about twice as often as AI search crawlers. Source: Talk to me Data analysis of robots.txt files, 20 October 2026."
    >
      {[0, 5, 10, 15, 20, 25].map(t => (
        <g key={t}>
          <line x1={x0 + t * scale} x2={x0 + t * scale} y1="30" y2={y - 6} stroke="#141414" strokeOpacity="0.08" />
          <text x={x0 + t * scale} y="22" textAnchor="middle" fontSize="10" fill="#717171">{t}%</text>
        </g>
      ))}
      {rows}
    </DiagramFrame>
  )
}

export default function HowToGetCitedByChatGPTPage() {
  return (
    <BlogPostShell slug={SLUG} faqs={faqs}>
      <div className="space-y-6 text-neutral-600 leading-relaxed">
        <p className="text-lg text-ink">
          <strong>
            To get cited by ChatGPT and other AI search tools, let their search crawlers reach your site, rank in normal
            search for the question, and write pages that answer it in the first two sentences, backed by facts,
            sources and your own data.
          </strong>{" "}
          AI answer engines quote pages they can crawl, that already rank, and that make a clear, trustworthy answer
          easy to lift.
        </p>
        <p>
          This guide covers how ChatGPT, Claude, Perplexity, Gemini and Google&apos;s AI Overviews choose their sources,
          the nine steps we follow to get pages cited, and a study we ran this month of which AI crawlers the
          world&apos;s top 1,000 websites let in. One finding surprised us: about 1 in 6 of the biggest sites block at
          least one AI search engine from reading them, which leaves the citations to everyone else.
        </p>

        <div className="rounded-2xl border border-hairline bg-mist p-6 my-8">
          <h2 className="text-xl font-semibold tracking-[-0.02em] text-ink mb-3">How to get cited by ChatGPT and AI search in 9 steps</h2>
          <ol className="list-decimal pl-6 space-y-2 text-ink">
            <li><strong>Let the AI search crawlers in:</strong> OAI-SearchBot, Claude-SearchBot and PerplexityBot, in robots.txt and in your firewall or CDN.</li>
            <li><strong>Get indexed and ranking</strong> in Google and Bing, because AI answers pick from pages that rank.</li>
            <li><strong>Find the questions your buyers ask AI,</strong> not just the keywords they type into Google.</li>
            <li><strong>Answer in the first two sentences</strong> of the page, in words an AI could quote on their own.</li>
            <li><strong>Use question-style headings,</strong> one question per section, each answered in its first sentence.</li>
            <li><strong>Add facts, sources and your own data,</strong> with dates and links.</li>
            <li><strong>Use tables, lists and FAQs</strong> as real HTML text, with structured data that matches the page.</li>
            <li><strong>Get mentioned on other sites</strong> that AI answers already cite: reviews, comparisons, forums and press.</li>
            <li><strong>Update and track:</strong> refresh pages that slip and check the same questions every week.</li>
          </ol>
        </div>

        <h2 id="how-does-chatgpt-decide-which-websites-to-cite" className={H2}>How Does ChatGPT Decide Which Websites to Cite?</h2>
        <p>
          ChatGPT cites pages it found by searching the web for your question, so it can only cite pages its search
          crawler can reach and that rank for the searches it runs. When a question needs fresh or specific
          information, ChatGPT search, Perplexity, Claude and Google&apos;s AI features run one or more web searches, read
          the best results and write an answer that links to the pages they used.
        </p>
        <p>
          Google calls the multiple-search step <strong>query fan-out</strong>: its AI Overviews and AI Mode{" "}
          <a href="https://developers.google.com/search/docs/appearance/ai-features" className={LINK} target="_blank" rel="noopener">
            may issue several related searches across subtopics
          </a>{" "}
          to build one answer. That is why a single page can be cited for questions it never mentions word for word, and
          why pages that each answer one sub-question clearly get picked so often.
        </p>

        <HowAiPicksSourcesDiagram />

        <p>Three things follow from how this works:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong className="text-ink">Access comes first.</strong> A page the search crawler can&apos;t read is never a candidate.</li>
          <li><strong className="text-ink">Rankings still matter.</strong> The candidates come from search results, so classic SEO is the entry ticket. Google says there are <a href="https://developers.google.com/search/docs/appearance/ai-features" className={LINK} target="_blank" rel="noopener">no special requirements</a> for its AI features beyond being indexed and eligible for a snippet.</li>
          <li><strong className="text-ink">Clarity wins the citation.</strong> Among the candidates, the engine quotes the pages whose answer is easiest to lift and best supported.</li>
        </ul>

        <h2 id="do-websites-block-ai-search-crawlers" className={H2}>Do Websites Block AI Search Crawlers? (Our Study of the Top 1,000 Websites)</h2>
        <p>
          Yes. In our October 2026 study, <strong>16.1% of the world&apos;s top websites block at least one AI search
          crawler</strong> in their robots.txt file, and <strong>9.8% block ChatGPT&apos;s search crawler</strong>, OAI-SearchBot.
          Every site that does this has taken itself out of those answers, whatever the quality of its content.
        </p>
        <p>
          We took the 1,000 most popular domains in the{" "}
          <a href="https://tranco-list.eu/" className={LINK} target="_blank" rel="noopener">Tranco research ranking</a>,
          downloaded each site&apos;s robots.txt on 20 October 2026, and checked which crawlers each file lets in. We kept
          the 479 sites that publish robots.txt rules and allow Googlebot, so every site in the sample wants to be found
          in search.
        </p>

        <CrawlerBlockChart />

        <div className="my-6 overflow-x-auto rounded-xl border border-hairline">
          <table className="w-full text-left text-sm">
            <thead className="bg-mist text-ink">
              <tr>
                <th className="p-4 font-semibold">Crawler</th>
                <th className="p-4 font-semibold">What it&apos;s for</th>
                <th className="p-4 font-semibold">If you block it</th>
                <th className="p-4 font-semibold text-right">Top sites blocking</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              <tr><td className="p-4 font-medium text-ink">OAI-SearchBot</td><td className="p-4">ChatGPT search</td><td className="p-4">Not shown in ChatGPT search answers</td><td className="p-4 text-right">9.8%</td></tr>
              <tr><td className="p-4 font-medium text-ink">GPTBot</td><td className="p-4">OpenAI model training</td><td className="p-4">Content not used to train OpenAI models; no effect on ChatGPT search</td><td className="p-4 text-right">19.2%</td></tr>
              <tr><td className="p-4 font-medium text-ink">Claude-SearchBot</td><td className="p-4">Claude search</td><td className="p-4">Less visible in Claude&apos;s search answers</td><td className="p-4 text-right">11.1%</td></tr>
              <tr><td className="p-4 font-medium text-ink">ClaudeBot</td><td className="p-4">Anthropic model training</td><td className="p-4">Content left out of future training data</td><td className="p-4 text-right">19.8%</td></tr>
              <tr><td className="p-4 font-medium text-ink">PerplexityBot</td><td className="p-4">Perplexity&apos;s search index</td><td className="p-4">Less visible in Perplexity answers</td><td className="p-4 text-right">15.4%</td></tr>
              <tr><td className="p-4 font-medium text-ink">Google-Extended</td><td className="p-4">Gemini training and grounding</td><td className="p-4">Not used by Gemini; no effect on Google Search or AI Overviews</td><td className="p-4 text-right">16.7%</td></tr>
              <tr><td className="p-4 font-medium text-ink">Googlebot</td><td className="p-4">Google Search, AI Overviews and AI Mode</td><td className="p-4">Gone from Google entirely</td><td className="p-4 text-right">n/a (all sites in the sample allow it)</td></tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm">
          Sources for what each crawler does: <a href="https://developers.openai.com/api/docs/bots" className={LINK} target="_blank" rel="noopener">OpenAI</a>,{" "}
          <a href="https://support.claude.com/en/articles/8896518" className={LINK} target="_blank" rel="noopener">Anthropic</a>,{" "}
          <a href="https://docs.perplexity.ai/docs/resources/perplexity-crawlers" className={LINK} target="_blank" rel="noopener">Perplexity</a> and{" "}
          <a href="https://developers.google.com/search/docs/appearance/ai-features" className={LINK} target="_blank" rel="noopener">Google</a>, checked October 2026.
        </p>

        <h3 className={H3}>What the study found</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong className="text-ink">Training crawlers are blocked about twice as often as search crawlers.</strong> 19.2% block GPTBot, but 9.8% block OAI-SearchBot.</li>
          <li><strong className="text-ink">Half of the sites that block GPTBot still allow ChatGPT search.</strong> 45 of the 92 sites blocking OpenAI&apos;s training crawler leave OAI-SearchBot in, so they stay citable without giving up their content for training.</li>
          <li><strong className="text-ink">Some of the biggest names are out of ChatGPT search answers.</strong> Amazon, The New York Times, the BBC, CNN, Bloomberg, Facebook, Instagram and Pinterest all block OAI-SearchBot, either by name or with a catch-all rule.</li>
          <li><strong className="text-ink">Classic search is almost never blocked.</strong> Only 3 of the 479 sites block Bingbot, against 47 blocking ChatGPT&apos;s search crawler.</li>
        </ul>
        <p>
          For a smaller business, the takeaway is practical. Every big site that shuts out an AI search crawler is one
          fewer source competing for the citation in that engine. If your own robots.txt or CDN is doing the same by
          accident, you are giving those citations away.
        </p>

        <h3 className={H3}>How we ran the study</h3>
        <p className="text-sm">
          Sample: the top 1,000 domains of Tranco list GQG5K (generated 19 October 2026). We requested
          https://domain/robots.txt, then https://www.domain/robots.txt, on 20 October 2026. 506 domains returned a
          robots.txt file with rules; many of the rest are infrastructure domains with no website. Of the 506, the 479
          that allow Googlebot form the sample. Each file was evaluated with the rules of the robots.txt standard (RFC
          9309): a crawler follows the group that names it, or the catch-all group if none does, and a site counts as
          blocking a crawler if a typical article URL is disallowed for it. Limits: robots.txt is only one way to block
          a crawler (firewalls and CDNs can block without it), so these numbers are a floor, and some sites serve
          different files to different visitors.{" "}
          <a href={DATA_CSV} className={LINK} download>Download the full results (CSV, 479 sites)</a>. You&apos;re
          welcome to use the data with a link to this page.
        </p>

        <h2 id="how-to-get-cited-by-chatgpt-step-by-step" className={H2}>How to Get Cited by ChatGPT, Step by Step</h2>
        <p>
          These are the nine steps we follow for every page we want AI search to quote. The first two decide whether a
          page can be cited at all; the rest decide whether it will be.
        </p>

        <h3 className={H3}>Step 1: Let the AI search crawlers in</h3>
        <p>
          Open yourdomain.com/robots.txt and check that OAI-SearchBot, Claude-SearchBot, PerplexityBot, Googlebot and
          Bingbot are not disallowed, either by name or by a catch-all <code>User-agent: *</code> rule. Then check your
          CDN or firewall: some hosting and security settings block AI crawlers without touching robots.txt. Google lists
          this exact check, including &quot;through any CDN or hosting provider&quot;, in its{" "}
          <a href="https://developers.google.com/search/docs/appearance/ai-features" className={LINK} target="_blank" rel="noopener">guidance for AI features</a>.
        </p>
        <p>If you want AI search but not AI training, a robots.txt like this does both:</p>

        <PromptBlock prompt={ROBOTS_TXT} label="robots.txt" copyLabel="Copy" />

        <p>
          One detail catches a lot of sites out: a crawler follows only the group that names it. Once you add a group for
          OAI-SearchBot, it ignores your <code>User-agent: *</code> rules, so copy any paths you want kept private (like{" "}
          <code>/admin/</code> above) into the named group too. We left Google-Extended out of the training block on
          purpose, because Google says it also controls grounding in other Google AI products such as Gemini, which cite sources of their own.
          OpenAI says robots.txt changes take{" "}
          <a href="https://developers.openai.com/api/docs/bots" className={LINK} target="_blank" rel="noopener">about 24 hours</a> to reach ChatGPT search.
        </p>

        <h3 className={H3}>Step 2: Get indexed and ranking in Google and Bing</h3>
        <p>
          Verify your site in Google Search Console and Bing Webmaster Tools, submit your sitemap to both, and fix any
          pages that aren&apos;t indexed. AI answers draw their candidates from search results, so a page on page five
          for every search it could match rarely gets cited. OpenAI has said ChatGPT search uses third-party search
          providers alongside its own crawler, and Bing is widely reported to be one of them, so Bing Webmaster Tools is
          worth the ten minutes it takes.
        </p>

        <h3 className={H3}>Step 3: Find the questions your buyers ask AI</h3>
        <p>
          People ask AI tools full questions with context (&quot;what&apos;s the best CRM for a 10-person agency on a small
          budget?&quot;), not two-word keywords. Start from the question queries in your Search Console data, rewrite them
          as the prompts different buyers would type, and check who gets cited for each today. Our guide to{" "}
          <Link href="/blog/how-to-automate-keyword-research-for-geo" className={LINK}>automating keyword research for GEO</Link>{" "}
          walks through this step by step, with a prompt that does it for you.
        </p>

        <h3 className={H3}>Step 4: Answer the question in the first two sentences</h3>
        <p>
          Put a 40 to 60 word answer at the very top of the page, written so it still makes sense if it is the only part
          someone reads. AI engines lift short, complete passages. A page that spends three paragraphs warming up before
          it answers gives them nothing to quote, even if the answer further down is better than anyone else&apos;s.
        </p>

        <Figure
          src={`${IMG}/seo-geo-agent-page-built-to-be-quoted.png`}
          alt="The SEO and GEO agent's draft of a page titled Best CRM for Agencies in 2026, with a highlighted direct answer for AI to quote, question-style H2 headings and a checklist: keyword-first title, question headings, direct answer, FAQ schema, internal links and sources cited"
          width={1296}
          height={1025}
          caption="How our SEO & GEO agent structures a page to be quoted, shown on a sample site: the answer AI can lift sits on top, and every heading is a question. Every page it writes has to pass the checklist at the bottom."
        />

        <h3 className={H3}>Step 5: Use question-style headings, one question per section</h3>
        <p>
          Phrase each H2 as a question people actually ask (&quot;How much does an agency CRM cost?&quot;, not
          &quot;Pricing&quot;) and answer it in the first sentence underneath. Each section then works as a standalone answer
          to one of the fan-out searches, which is exactly the unit an AI engine is looking for. Keep one idea per
          section; a heading that covers three questions answers none of them cleanly.
        </p>

        <h3 className={H3}>Step 6: Add facts, sources and your own data</h3>
        <p>
          Back every claim with a number, a named source or something you measured, and date it. In the research paper
          that coined the term GEO,{" "}
          <a href="https://arxiv.org/abs/2311.09735" className={LINK} target="_blank" rel="noopener">Aggarwal et al. (KDD 2024)</a>{" "}
          found that content changes like these could boost a source&apos;s visibility in generative engine answers by up
          to 40%. Original data works best of all, because it gives the engine something it can only get from you. The
          study in this post is an example: anyone who wants to quote how many sites block AI crawlers has to cite
          its source.
        </p>

        <SignupCta eyebrow="Let the agent do it" heading="Get every page written to be quoted by AI">
          The SEO &amp; GEO agent reads your Search Console, finds the questions you can win on Google and in AI answers,
          and writes pages with the direct answer, question headings, sources and FAQ already built in. Sign up free and
          connect your site.
        </SignupCta>

        <h3 className={H3}>Step 7: Use tables, lists and FAQs as real text</h3>
        <p>
          Comparisons belong in HTML tables, processes in numbered lists, and common follow-up questions in an FAQ
          section. All of it must be real text on the page, not text inside an image, so a crawler can read it. Add
          structured data such as FAQ markup where it fits, but treat it as a description of the page, not a shortcut:
          Google says structured data has to match the visible text, and that no special schema is needed for its AI
          features.
        </p>

        <h3 className={H3}>Step 8: Get mentioned on the sites AI already cites</h3>
        <p>
          AI answers often cite third-party pages, such as comparison articles, review sites, forum threads and
          industry lists, alongside or instead of brand websites. Run your buyers&apos; questions, note which outside pages
          get cited, and work on being included in them: ask happy customers for reviews, pitch the authors of
          comparison articles, answer questions in the communities your buyers use, and share your original data with
          the people who write about your industry.
        </p>

        <h3 className={H3}>Step 9: Update pages and track the same questions every week</h3>
        <p>
          Refresh the pages that matter on a schedule: update the numbers, add what has changed, and show the date it was
          updated. Then re-check the same set of questions every week. AI answers change from one run to the next, so a
          single check is a snapshot; the weekly trend is what tells you whether a change worked.
        </p>

        <h2 id="how-do-you-check-if-chatgpt-cites-your-website" className={H2}>How Do You Check If ChatGPT Cites Your Website?</h2>
        <p>
          Ask ChatGPT, Perplexity, Claude and Gemini the questions your buyers ask, with web search on, and record which
          sources each one cites. Do it from a logged-out or fresh session where you can, because personalisation can
          change answers. Twenty questions checked every week tells you far more than two hundred checked once.
        </p>
        <p>You can hand most of the work to an AI tool with web search. Copy this prompt, fill in the brackets, and run it in ChatGPT or Claude:</p>

        <PromptBlock prompt={VISIBILITY_PROMPT} label="AI visibility check prompt" leadSource="prompt_get_cited_by_chatgpt" />

        <p>
          For traffic rather than citations, two places help. Google counts clicks from AI Overviews and AI Mode inside
          the normal Web search type in Search Console; it doesn&apos;t split them out. Visits from ChatGPT, Perplexity,
          Claude and Gemini usually appear as referrals from their domains in your analytics, such as chatgpt.com and
          perplexity.ai.
        </p>

        <Figure
          src={`${IMG}/seo-geo-agent-am-i-cited-by-chatgpt.png`}
          alt="A chat with the SEO and GEO agent: asked Am I cited by ChatGPT, it checks ChatGPT, Claude, Perplexity and Gemini, finds the site cited on 3 pages, and suggests a billable hours FAQ to win a question where Claude cites a competitor"
          width={1376}
          height={1105}
          caption="The same check, run by our SEO & GEO agent on a sample site. It doesn't stop at yes or no: it finds the question where a competitor is cited instead and proposes the page that would win it."
        />

        <h2 id="how-do-you-automate-geo-with-an-ai-agent" className={H2}>How Do You Automate GEO With an AI Agent?</h2>
        <p>
          An AI agent can run the whole loop on a schedule: read your Search Console data, find the questions you can
          win, write or refresh pages built to be quoted, publish them, and check every week which AI tools cite each
          page. That is what our{" "}
          <Link href="/agents/seo-geo" className={LINK}>SEO &amp; GEO agent</Link> does, and the guide to{" "}
          <Link href="/blog/how-to-automate-seo-and-geo-growth-with-ai-agent" className={LINK}>automating SEO and GEO with an AI agent</Link>{" "}
          shows how to build a version yourself.
        </p>

        <Figure
          src={`${IMG}/seo-geo-agent-rankings-and-ai-citations.png`}
          alt="The SEO and GEO agent's Rankings panel: each page's Google position and movement next to the AI tools that cite it, with Best CRM for agencies at number 3 and cited by ChatGPT, Perplexity and Gemini, and Pricing slipping and being refreshed"
          width={1296}
          height={705}
          caption="Tracking both halves in one place, on a sample site: where each page ranks on Google, and which AI answers cite it. A page that slips gets rewritten before it loses the citation."
        />

        <h2 id="what-doesnt-help-you-get-cited-by-ai" className={H2}>What Doesn&apos;t Help You Get Cited by AI?</h2>
        <p>Some popular GEO advice does little or nothing. Skip these, or at least don&apos;t expect them to move citations:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong className="text-ink">An llms.txt file on its own.</strong> Google says you don&apos;t need new machine-readable files or &quot;AI text files&quot; for its AI features. We publish one because it&apos;s cheap, but it&apos;s not why pages get cited.</li>
          <li><strong className="text-ink">Special schema for AI.</strong> There is no AI-only markup. Normal structured data that matches the page is enough.</li>
          <li><strong className="text-ink">Blocking GPTBot to &quot;protect&quot; content and expecting citations to drop, or to rise.</strong> GPTBot only covers training. Citations in ChatGPT depend on OAI-SearchBot.</li>
          <li><strong className="text-ink">Hundreds of thin AI-written pages.</strong> Pages that don&apos;t rank never become candidates, and pages with nothing new give an engine no reason to quote them.</li>
          <li><strong className="text-ink">Writing for the AI instead of the reader.</strong> The pages that get quoted are the ones that answer a real person&apos;s question best. Keyword lists and robotic phrasing help neither.</li>
        </ul>

        <h2 id="summary" className={H2}>Summary</h2>
        <p>
          AI search engines cite pages they can crawl, that rank for the searches they run, and that answer the question
          clearly with evidence. So the work is in that order: let OAI-SearchBot, Claude-SearchBot and PerplexityBot in,
          get indexed and ranking in Google and Bing, then make every page quotable with a direct answer, question
          headings, facts, sources and your own data, and get mentioned on the sites AI already trusts.
        </p>
        <p>
          Our study of the top 1,000 websites shows how much room there is: about 1 in 6 of them block at least one AI
          search crawler, and half of the sites that block OpenAI&apos;s training crawler still let ChatGPT search in.
          Check your own robots.txt today; it&apos;s the fastest GEO win there is.
        </p>

        <SignupCta heading="Get found on Google and quoted by AI">
          Sign up free, connect Google Search Console, and the SEO &amp; GEO agent finds the questions you can win, writes
          the pages, and tracks which AI tools cite you every week.
        </SignupCta>
      </div>
    </BlogPostShell>
  )
}

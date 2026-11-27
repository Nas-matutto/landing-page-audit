import type { ReactNode } from "react"
import Image from "next/image"
import Link from "next/link"
import { Check } from "lucide-react"
import { SignupCta } from "@/components/blog/signup-cta"
import { BlogPostShell } from "@/components/blog/post-shell"
import { Figure } from "@/components/blog/figure"
import { PromptBlock } from "@/components/blog/prompt-block"
import { buildPostMetadata, type Faq } from "@/lib/blog"

// The one guide to getting cited by AI search. On 2026-11-27 it absorbed
// /blog/how-to-get-cited-by-chatgpt-perplexity-and-claude (now a 301 to here),
// which targeted the same searches: that post's earned-mentions, llms.txt,
// speed and metadata steps live on as steps 4 to 9.
const SLUG = "how-to-get-cited-by-chatgpt"

export const metadata = buildPostMetadata(SLUG)

// Themed like /agents/seo-geo: the SEO agent's dark green (--seo) on soft green.
const GREEN = "#24573a"

const H2 = "text-3xl font-semibold tracking-[-0.02em] text-ink mt-14 mb-4"
const H2_STEP = "text-3xl font-semibold tracking-[-0.02em] text-ink mt-3"
const H3 = "text-xl font-semibold tracking-[-0.01em] text-ink mt-8 mb-3"
const LINK = "text-ink underline decoration-seo/40 underline-offset-4 hover:decoration-seo"
const IMG = "/blog/how-to-get-cited-by-chatgpt"
const CRAWLER_CSV = `${IMG}/ai-crawler-access-top-1000-websites-oct-2026.csv`
const LLMS_CSV = `${IMG}/llms-txt-adoption-top-1000-websites-nov-2026.csv`

const faqs: Faq[] = [
  {
    question: "How do I get my website cited by ChatGPT?",
    answer:
      "Make sure ChatGPT's search crawler, OAI-SearchBot, is allowed in your robots.txt and not blocked by your firewall or CDN, get the page indexed in Google and Bing, and write it so the first two sentences answer the question directly. Back the answer with facts, sources and your own data, use question-style headings, and get quoted in the roundups, reviews and comparison articles that ChatGPT already cites for your buyers' questions.",
  },
  {
    question: "How do I get Perplexity to cite my website?",
    answer:
      "Allow PerplexityBot in your robots.txt and in your firewall or CDN, because Perplexity builds its own index with it. Then make sure your page answers the question near the top with facts and dates, and get mentioned in the third-party articles Perplexity already lists as sources for that question. Perplexity shows numbered sources on every answer, so it is the easiest engine to audit by hand.",
  },
  {
    question: "How do I get Claude to cite my website?",
    answer:
      "Allow Claude-SearchBot (Claude's search crawler) and Claude-User (used when Claude opens a page for a user) in robots.txt. You can still block ClaudeBot, which only collects training data. Claude cites pages it finds through web search, so being indexed and ranking for the question, and being quoted on the sites that rank, matter as much as the page itself.",
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
      "Crawler changes are quick: OpenAI says robots.txt changes take about 24 hours to reach ChatGPT search. A mention in an article that is already cited can show up as soon as the engines re-read that article, often within days. New or rewritten pages take as long as they take to be recrawled and to rank, usually a few weeks. Because AI answers vary from one run to the next, track the same questions weekly rather than judging from a single check.",
  },
  {
    question: "Do I need an llms.txt file or special schema to get cited?",
    answer:
      "Neither is required. Google says you don't need new machine-readable files, AI text files or special schema.org markup to appear in AI Overviews or AI Mode, and no major AI search engine has said it uses llms.txt to choose citations. An llms.txt takes under an hour to publish and gives AI tools a correct summary of your business, so it is worth adding; in our November 2026 check, 22.1% of the world's top websites publish one. Normal structured data still helps, as long as it matches the text visible on the page.",
  },
  {
    question: "Does page speed affect AI citations?",
    answer:
      "Indirectly, yes. AI search tools often fetch pages live while the user waits, and most AI crawlers don't run JavaScript, so a slow page or one that only shows its text after scripts load may give them nothing to read. Speed also feeds Google rankings, which AI answers draw their candidates from. Aim for a server response under 0.8 seconds and the main content in the raw HTML.",
  },
  {
    question: "How do I find the articles ChatGPT cites for my topic?",
    answer:
      "Ask ChatGPT, Perplexity and Claude the questions your buyers ask, with web search on, and copy every source they cite into a sheet. Repeat each question a few times and on different days, because answers vary. The pages that come up again and again across engines are the ones worth getting quoted in.",
  },
  {
    question: "How can I tell if ChatGPT or Google AI Overviews send me traffic?",
    answer:
      "Google counts clicks from AI Overviews and AI Mode inside the normal Web search type in Search Console; it doesn't report them separately. Visits from ChatGPT, Perplexity, Claude and Gemini usually show up as referral traffic from their domains, such as chatgpt.com, perplexity.ai and claude.ai, in your analytics. To see citations that don't produce a click, ask the engines your buyers' questions on a schedule and record who they cite.",
  },
  {
    question: "Can I pay to be cited by ChatGPT?",
    answer:
      "Not in the organic answer. Citations in ChatGPT search, Perplexity and Google's AI features come from their own crawling and ranking, not from payment. Some roundup sites sell placements, which should be clearly disclosed, but paying doesn't guarantee an engine will keep citing that article. Earned inclusion, through a useful product, original data and genuine reviews, lasts longer.",
  },
]

const ROBOTS_TXT = `# AI search: let these in so you can be cited
User-agent: OAI-SearchBot
User-agent: ChatGPT-User
User-agent: PerplexityBot
User-agent: Perplexity-User
User-agent: Claude-SearchBot
User-agent: Claude-User
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

const LLMS_TXT = `# [Your Business Name]

> [One or two sentences: what you sell, who it's for and where you operate.
> Write it the way you'd want an AI to describe you.]

## Products and services
- [Product or service](https://yourdomain.com/product): what it does, who it's for, price from
- [Pricing](https://yourdomain.com/pricing): plans and what each includes

## Guides
- [Your best guide](https://yourdomain.com/blog/guide): the question it answers

## Company
- [About](https://yourdomain.com/about): who you are, founded, location
- [Customer reviews](https://yourdomain.com/reviews)
- [Contact](https://yourdomain.com/contact)`

const HEAD_METADATA = `<title>Best CRM for Small Agencies (2026): 7 Picks Compared</title>
<meta name="description" content="The best CRM for a small agency in 2026, compared on price, client portals and time tracking. Updated monthly." />
<link rel="canonical" href="https://yourdomain.com/best-crm-for-agencies" />
<meta property="og:title" content="Best CRM for Small Agencies (2026)" />
<meta property="og:image" content="https://yourdomain.com/og/best-crm.png" />

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Best CRM for Small Agencies (2026): 7 Picks Compared",
  "datePublished": "2026-03-02",
  "dateModified": "2026-11-10",
  "author": { "@type": "Person", "name": "Your Name", "url": "https://yourdomain.com/about" },
  "publisher": {
    "@type": "Organization",
    "name": "Your Business",
    "url": "https://yourdomain.com",
    "sameAs": ["https://www.linkedin.com/company/your-business", "https://www.g2.com/products/your-product"]
  }
}
</script>`

const RECOMMENDATIONS_PROMPT = `You are an AI search analyst for [Business Name] ([yourdomain.com]). We sell [product or service] to [audience] in [location, if local].

GOAL
Find out who AI search recommends ahead of us, why, and which sources those recommendations come from.

QUESTIONS
[Paste 10 to 20 questions your buyers ask, for example:
"What is the best [product] for a [type of business]?"
"[Competitor] vs [another competitor]: which is better for [use case]?"
"What should I look for in a [product] if I [situation]?"]

STEPS
1. Search the web for each question and write the answer a buyer would get.
2. List every brand you recommend, in order, and the reason you give for each.
3. List every source you used: the URL, the type of page (brand site, roundup, review site, forum, news, video) and which brands it mentions.
4. Note whether [Business Name] is recommended, mentioned or missing.

THEN
5. Make a table of the sources that appear for more than one question, with the brands each one mentions and whether we are in it.
6. For the 3 competitors recommended most, sum up the reasons AI gives for picking them and the evidence behind each reason.
7. Give the 5 actions most likely to get us recommended: articles to get quoted in, pages to write or fix, and facts we should publish.

RULES
- Only report sources you actually found. Never invent URLs, brands or quotes.
- If you can't search the web, stop and say so.`

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

/** An SVG figure on the SEO agent's soft green, with a crawlable <title>. */
function DiagramFrame({ id, title, caption, viewBox, children }: { id: string; title: string; caption: string; viewBox: string; children: ReactNode }) {
  return (
    <figure className="my-8">
      <svg viewBox={viewBox} role="img" aria-labelledby={id} className="h-auto w-full rounded-2xl border border-seo/15 bg-seo-soft">
        <title id={id}>{title}</title>
        <defs>
          <marker id={`${id}-arrow`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto">
            <path d="M0,0 L10,5 L0,10 z" fill="#141414" />
          </marker>
          <marker id={`${id}-arrow-green`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto">
            <path d="M0,0 L10,5 L0,10 z" fill={GREEN} />
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

/** Route A: your page is the source. Route B: an article AI trusts mentions you. Both end in the answer. */
function TwoRoutesDiagram() {
  const box = (x: number, y: number, w: number, title: string, sub: string, tone: "white" | "green" | "ink" = "white") => (
    <g>
      <rect x={x} y={y} width={w} height="62" rx="12" fill={tone === "green" ? GREEN : tone === "ink" ? "#141414" : "white"} stroke={tone === "white" ? "#141414" : "none"} strokeWidth="1.5" />
      <text x={x + w / 2} y={y + 27} textAnchor="middle" fontSize="13.5" fontWeight="700" fill={tone === "white" ? "#141414" : "white"}>{title}</text>
      <text x={x + w / 2} y={y + 46} textAnchor="middle" fontSize="11" fill={tone === "white" ? "#717171" : "#d9e8de"}>{sub}</text>
    </g>
  )
  return (
    <DiagramFrame
      id="two-routes-title"
      viewBox="0 0 780 300"
      title="Two routes to being named in an AI answer. Route A: your own page ranks for the question and is cited directly. Route B: you are quoted in a roundup, review or comparison article that the AI already cites, so the AI names you while citing that article. Route B often works for buying questions where your own page doesn't rank yet."
      caption="Most guides only cover route A. For “best X for Y” questions, route B is often the faster way in, because the article AI cites already exists and already ranks."
    >
      <text x="20" y="34" fontSize="11" fontWeight="700" letterSpacing="1.2" fill={GREEN}>ROUTE A · YOUR OWN PAGE</text>
      {box(20, 48, 190, "Your page", "answers the question")}
      {box(260, 48, 190, "Ranks in search", "Google, Bing, own index")}
      <path d="M212,79 L256,79" stroke="#141414" strokeWidth="2.5" markerEnd="url(#two-routes-title-arrow)" />

      <text x="20" y="176" fontSize="11" fontWeight="700" letterSpacing="1.2" fill={GREEN}>ROUTE B · ARTICLES AI ALREADY CITES</text>
      {box(20, 190, 190, "You, quoted", "in a roundup or review", "green")}
      {box(260, 190, 190, "Article AI trusts", "already cited for it")}
      <path d="M212,221 L256,221" stroke={GREEN} strokeWidth="2.5" markerEnd="url(#two-routes-title-arrow-green)" />

      {box(540, 119, 220, "AI answer", "“Top picks: …, You, …” + sources", "ink")}
      <path d="M452,79 C500,79 500,140 536,148" fill="none" stroke="#141414" strokeWidth="2.5" markerEnd="url(#two-routes-title-arrow)" />
      <path d="M452,221 C500,221 500,162 536,158" fill="none" stroke={GREEN} strokeWidth="2.5" markerEnd="url(#two-routes-title-arrow-green)" />
      <text x="650" y="216" textAnchor="middle" fontSize="11.5" fill="#141414">ChatGPT · Perplexity · Claude</text>
      <text x="650" y="234" textAnchor="middle" fontSize="11" fill="#717171">name you either way</text>
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
  const fills: Record<string, string> = { "Classic search": "#adadad", "AI search crawlers": GREEN, "AI training crawlers": "#717171" }
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

/** Our llms.txt study, as bars: share of the sample that serves each file. */
function LlmsTxtChart() {
  const rows = [
    { label: "Publish /llms.txt", sub: "all 479 top sites", pct: 22.1, n: "106 of 479" },
    { label: "Publish /llms.txt", sub: "top 100 only", pct: 13.0, n: "6 of 46" },
    { label: "Also publish /llms-full.txt", sub: "all 479 top sites", pct: 3.8, n: "18 of 479" },
  ]
  const x0 = 270
  const scale = 440 / 30
  return (
    <DiagramFrame
      id="llms-txt-chart-title"
      viewBox="0 0 780 210"
      title="Share of the world's top websites that publish an llms.txt file, November 2026: 22.1% of 479 top sites (106), 13.0% of the 46 sites in the top 100 (6), and 3.8% also publish llms-full.txt (18)"
      caption="About 1 in 5 of the world's biggest websites already publish an llms.txt. Source: Talk to me Data check of 479 top sites (Tranco top 1,000 that allow Googlebot), 13 November 2026."
    >
      {[0, 10, 20, 30].map(t => (
        <g key={t}>
          <line x1={x0 + t * scale} x2={x0 + t * scale} y1="34" y2="186" stroke="#141414" strokeOpacity="0.08" />
          <text x={x0 + t * scale} y="26" textAnchor="middle" fontSize="10" fill="#717171">{t}%</text>
        </g>
      ))}
      {rows.map((row, i) => {
        const y = 48 + i * 46
        return (
          <g key={row.label + row.sub}>
            <text x="20" y={y + 14} fontSize="13" fontWeight="600" fill="#141414">{row.label}</text>
            <text x="20" y={y + 30} fontSize="11" fill="#717171">{row.sub}</text>
            <rect x={x0} y={y + 4} width={row.pct * scale} height="20" rx="5" fill={i === 0 ? GREEN : i === 1 ? "#5c8a6d" : "#9dbfa9"} />
            <text x={x0 + row.pct * scale + 8} y={y + 19} fontSize="12" fontWeight="600" fill="#141414">{row.pct.toFixed(1)}% ({row.n})</text>
          </g>
        )
      })}
    </DiagramFrame>
  )
}

/** What an AI crawler gets from a server-rendered page versus a page that builds its text with JavaScript. */
function CrawlerViewDiagram() {
  return (
    <DiagramFrame
      id="crawler-view-title"
      viewBox="0 0 780 290"
      title="What an AI crawler sees. A server-rendered page returns the full text of the answer in its HTML, so the crawler can read and quote it. A page that builds its content with JavaScript returns an almost empty shell to crawlers that don't run JavaScript, so there is nothing to quote."
      caption="Most AI crawlers read the HTML your server sends and stop there. If your answer only appears after JavaScript runs, to them the page is blank."
    >
      {[
        { x: 20, head: "Server-rendered page", ok: true },
        { x: 410, head: "JavaScript-only page", ok: false },
      ].map(col => (
        <g key={col.head}>
          <text x={col.x + 175} y="32" textAnchor="middle" fontSize="13" fontWeight="700" fill={col.ok ? GREEN : "#141414"}>{col.head}</text>
          <rect x={col.x} y="46" width="350" height="190" rx="12" fill="white" stroke={col.ok ? GREEN : "#141414"} strokeWidth="1.5" />
          <rect x={col.x} y="46" width="350" height="26" rx="12" fill={col.ok ? GREEN : "#141414"} />
          <rect x={col.x} y="60" width="350" height="12" fill={col.ok ? GREEN : "#141414"} />
          <text x={col.x + 14} y="64" fontSize="11" fontFamily="monospace" fill="white">what the crawler receives</text>
          {col.ok ? (
            <g fontFamily="monospace" fontSize="11" fill="#141414">
              <text x={col.x + 14} y="96">&lt;h1&gt;Best CRM for agencies&lt;/h1&gt;</text>
              <text x={col.x + 14} y="116">&lt;p&gt;The best CRM for a small</text>
              <text x={col.x + 14} y="132">agency in 2026 is …&lt;/p&gt;</text>
              <text x={col.x + 14} y="152">&lt;h2&gt;How much does it cost?&lt;/h2&gt;</text>
              <text x={col.x + 14} y="172">&lt;table&gt;7 CRMs compared&lt;/table&gt;</text>
              <text x={col.x + 14} y="192">&lt;h2&gt;FAQ&lt;/h2&gt; …</text>
            </g>
          ) : (
            <g fontFamily="monospace" fontSize="11" fill="#141414">
              <text x={col.x + 14} y="96">&lt;div id=&quot;root&quot;&gt;&lt;/div&gt;</text>
              <text x={col.x + 14} y="116">&lt;script src=&quot;app.js&quot;&gt;&lt;/script&gt;</text>
              <text x={col.x + 14} y="152" fill="#717171">(the answer appears only after</text>
              <text x={col.x + 14} y="168" fill="#717171">the script runs, which most</text>
              <text x={col.x + 14} y="184" fill="#717171">AI crawlers never do)</text>
            </g>
          )}
          <circle cx={col.x + 175} cy="262" r="12" fill={col.ok ? GREEN : "#141414"} />
          <text x={col.x + 175} y="267" textAnchor="middle" fontSize="13" fontWeight="700" fill="white">{col.ok ? "✓" : "✕"}</text>
          <text x={col.x + 195} y="267" fontSize="12" fontWeight="600" fill="#141414">{col.ok ? "Quotable" : "Nothing to quote"}</text>
        </g>
      ))}
    </DiagramFrame>
  )
}

/** How the SEO & GEO agent handles the "articles AI already cites" work, with the agent himself. */
function AgentCitationsPanel() {
  const jobs = [
    "Asks ChatGPT, Perplexity, Claude and Gemini your buyers' questions every week",
    "Lists every article, review site and thread they cite, ranked by how often",
    "Flags the ones that name your competitors but not you",
    "Tells you which to go after first, and what to offer each one",
    "Re-checks weekly, so you see when a mention turns into a citation",
  ]
  return (
    <aside className="relative my-10 overflow-hidden rounded-[28px] border border-seo/15 bg-seo-soft p-6 sm:p-8">
      <div aria-hidden className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-seo/15 blur-3xl" />
      <div className="relative grid items-center gap-6 sm:grid-cols-[minmax(0,1fr)_170px]">
        <div>
          <p className="eyebrow mb-3 inline-flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-seo" aria-hidden />
            How we do it for you
          </p>
          <p className="text-2xl font-semibold tracking-[-0.02em] text-ink">Our SEO &amp; GEO agent finds the articles AI cites and gets you into them</p>
          <ul className="mt-5 space-y-2.5">
            {jobs.map(job => (
              <li key={job} className="flex items-start gap-2.5">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-seo text-white">
                  <Check className="h-3 w-3" />
                </span>
                <span className="text-[15px] leading-relaxed text-ink">{job}</span>
              </li>
            ))}
          </ul>
          <Link href="/agents/seo-geo" className="mt-6 inline-flex text-sm font-semibold text-seo underline decoration-seo/30 underline-offset-4 hover:decoration-seo">
            See how the SEO &amp; GEO agent works
          </Link>
        </div>
        <Image
          src={`${IMG}/seo-geo-agent-walking-and-waving.webp`}
          alt="The Talk to me Data SEO and GEO agent, in a green hoodie and cap, walking and waving"
          width={593}
          height={976}
          sizes="170px"
          className="mx-auto h-auto w-32 sm:w-full"
        />
      </div>
    </aside>
  )
}

/** The badge above each step's H2. The H2 itself stays inline in the page so the table of contents can find it. */
function Step({ n }: { n: number }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-seo-soft px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-seo">
      Step {n}
    </span>
  )
}

export default function HowToGetCitedByChatGPTPage() {
  return (
    <BlogPostShell slug={SLUG} faqs={faqs}>
      <div className="space-y-6 text-neutral-600 leading-relaxed">
        <p className="text-lg text-ink">
          <strong>
            To get cited by ChatGPT, Perplexity and Claude, let their search crawlers reach your site, rank in normal
            search for the question, get quoted in the articles they already cite, and write pages that answer the
            question in the first two sentences, backed by facts, sources and your own data.
          </strong>{" "}
          AI answer engines quote pages they can crawl, that already rank, and that make a clear, trustworthy answer
          easy to lift.
        </p>
        <p>
          This guide covers how ChatGPT, Perplexity, Claude, Gemini and Google&apos;s AI Overviews choose their sources,
          the 10 steps we follow to get pages cited, and two studies we ran of the world&apos;s top 1,000 websites: which
          AI crawlers they let in (October 2026) and how many publish an llms.txt file (November 2026). One finding
          surprised us: about 1 in 6 of the biggest sites block at least one AI search engine from reading them, which
          leaves the citations to everyone else.
        </p>
        <p>
          Most advice about AI search stops at your own website. But when a buyer asks “what&apos;s the best tool for
          this?”, the engines often answer from roundups, review sites and comparison articles, and name the brands those
          articles mention. So this guide covers both halves: making your own pages the source, and becoming one of those
          mentions.
        </p>

        <div className="my-8 rounded-2xl border border-seo/15 bg-seo-soft p-6">
          <h2 className="mb-3 text-xl font-semibold tracking-[-0.02em] text-ink">How to get cited by ChatGPT and AI search in 10 steps</h2>
          <ol className="list-decimal space-y-2 pl-6 text-ink marker:font-semibold marker:text-seo">
            <li><strong>Let the AI search crawlers in:</strong> OAI-SearchBot, PerplexityBot and Claude-SearchBot, in robots.txt and in your firewall or CDN.</li>
            <li><strong>Get indexed and ranking</strong> in Google and Bing, because AI answers pick from pages that rank.</li>
            <li><strong>Find the questions your buyers ask AI,</strong> not just the keywords they type into Google.</li>
            <li><strong>Get quoted in the articles AI already cites</strong> for those questions. This is the step most sites skip.</li>
            <li><strong>Check who AI recommends ahead of you,</strong> the reasons it gives, and the sources behind them.</li>
            <li><strong>Write pages AI wants to quote:</strong> a direct answer up top, question headings, facts, sources and your own data.</li>
            <li><strong>Publish an llms.txt file</strong> that sums up your business and links your best pages.</li>
            <li><strong>Make pages fast and readable without JavaScript,</strong> so crawlers get the full text first time.</li>
            <li><strong>Fill in your metadata:</strong> titles, descriptions, dates, author and structured data that match the page.</li>
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

        <h3 className={H3}>How do ChatGPT, Perplexity and Claude differ?</h3>
        <p>They all work this way, but each has its own crawlers and its own source of search results:</p>

        <div className="my-6 overflow-x-auto rounded-xl border border-hairline">
          <table className="w-full text-left text-sm">
            <thead className="bg-seo-soft text-ink">
              <tr>
                <th className="p-4 font-semibold"></th>
                <th className="p-4 font-semibold">ChatGPT search</th>
                <th className="p-4 font-semibold">Perplexity</th>
                <th className="p-4 font-semibold">Claude</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              <tr>
                <td className="p-4 font-medium text-ink">Crawlers to allow</td>
                <td className="p-4">OAI-SearchBot, ChatGPT-User</td>
                <td className="p-4">PerplexityBot, Perplexity-User</td>
                <td className="p-4">Claude-SearchBot, Claude-User</td>
              </tr>
              <tr>
                <td className="p-4 font-medium text-ink">Where its results come from</td>
                <td className="p-4">Its own crawler plus third-party search providers (Bing is widely reported)</td>
                <td className="p-4">Its own index, built by PerplexityBot</td>
                <td className="p-4">Web search, widely reported to draw on Brave Search</td>
              </tr>
              <tr>
                <td className="p-4 font-medium text-ink">How it shows sources</td>
                <td className="p-4">Inline links and a Sources panel</td>
                <td className="p-4">Numbered sources on every answer</td>
                <td className="p-4">Inline citations with links</td>
              </tr>
              <tr>
                <td className="p-4 font-medium text-ink">Training crawler (safe to block)</td>
                <td className="p-4">GPTBot</td>
                <td className="p-4">None separate</td>
                <td className="p-4">ClaudeBot</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm">
          Crawler names from <a href="https://developers.openai.com/api/docs/bots" className={LINK} target="_blank" rel="noopener">OpenAI</a>,{" "}
          <a href="https://docs.perplexity.ai/docs/resources/perplexity-crawlers" className={LINK} target="_blank" rel="noopener">Perplexity</a> and{" "}
          <a href="https://support.claude.com/en/articles/8896518" className={LINK} target="_blank" rel="noopener">Anthropic</a>, checked November 2026.
        </p>

        <h3 className={H3}>Which sources do they cite?</h3>
        <p>
          It depends on the question. For a factual question (“how long does a website redesign take?”), the cited
          sources are often the brands and experts who answer it best. For a buying question (“best CRM for a small
          agency”), the sources are often third-party articles: roundups, review sites, comparison pages and forum
          threads. The engine then names the brands those articles mention. That gives you two routes in.
        </p>

        <TwoRoutesDiagram />

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
            <thead className="bg-seo-soft text-ink">
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
          <a href={CRAWLER_CSV} className={LINK} download>Download the full results (CSV, 479 sites)</a>. You&apos;re
          welcome to use the data with a link to this page.
        </p>

        <h2 id="how-to-get-cited-by-chatgpt-step-by-step" className={H2}>How to Get Cited by ChatGPT, Step by Step</h2>
        <p>
          These are the 10 steps we follow for every page and brand we want AI search to quote. The first two decide
          whether a page can be cited at all. Steps 3 to 5 tell you where to focus, and the rest make your pages the
          easiest source to quote.
        </p>

        <div className="pt-6">
          <Step n={1} />
          <h2 id="how-do-you-let-ai-search-crawlers-reach-your-site" className={H2_STEP}>
            How Do You Let AI Search Crawlers Reach Your Site?
          </h2>
        </div>
        <p>
          Open yourdomain.com/robots.txt and check that OAI-SearchBot, PerplexityBot, Claude-SearchBot, Googlebot and
          Bingbot are not disallowed, either by name or by a catch-all <code>User-agent: *</code> rule. Then check your
          CDN or firewall (Cloudflare, for example, has a setting that blocks AI bots), because those can block crawlers
          without touching robots.txt. Google lists this exact check, including &quot;through any CDN or hosting
          provider&quot;, in its{" "}
          <a href="https://developers.google.com/search/docs/appearance/ai-features" className={LINK} target="_blank" rel="noopener">guidance for AI features</a>.
        </p>
        <p>This robots.txt lets all three engines&apos; search crawlers in, and optionally opts you out of AI training:</p>

        <PromptBlock prompt={ROBOTS_TXT} label="robots.txt" copyLabel="Copy" />

        <p>
          One detail catches a lot of sites out: a crawler follows only the group that names it. Once you add a group for
          OAI-SearchBot, it ignores your <code>User-agent: *</code> rules, so copy any paths you want kept private (like{" "}
          <code>/admin/</code> above) into the named group too. The <code>-User</code> agents are the ones the engines
          use when they open a page live for someone, so let those in as well. We left Google-Extended out of the training
          block on purpose, because Google says it also controls grounding in other Google AI products such as Gemini,
          which cite sources of their own. OpenAI says robots.txt changes take{" "}
          <a href="https://developers.openai.com/api/docs/bots" className={LINK} target="_blank" rel="noopener">about 24 hours</a> to reach ChatGPT search.
        </p>

        <div className="pt-6">
          <Step n={2} />
          <h2 id="how-do-you-get-indexed-in-google-and-bing" className={H2_STEP}>
            How Do You Get Indexed and Ranking in Google and Bing?
          </h2>
        </div>
        <p>
          Verify your site in Google Search Console and Bing Webmaster Tools, submit your sitemap to both, and fix any
          pages that aren&apos;t indexed. AI answers draw their candidates from search results, so a page on page five
          for every search it could match rarely gets cited. OpenAI has said ChatGPT search uses third-party search
          providers alongside its own crawler, and Bing is widely reported to be one of them, so Bing Webmaster Tools is
          worth the ten minutes it takes.
        </p>

        <div className="pt-6">
          <Step n={3} />
          <h2 id="which-questions-do-your-buyers-ask-ai" className={H2_STEP}>
            Which Questions Do Your Buyers Ask AI?
          </h2>
        </div>
        <p>
          People ask AI tools full questions with context (&quot;what&apos;s the best CRM for a 10-person agency on a small
          budget?&quot;), not two-word keywords. Start from the question queries in your Search Console data, rewrite them
          as the prompts different buyers would type, and add the buying questions you hear from customers: “best
          [product] for [type of business]”, “[competitor] alternatives” and “[competitor A] vs [competitor B]”. Keep
          10 to 20 of them; you will use the same list in steps 4, 5 and 10. Our guide to{" "}
          <Link href="/blog/how-to-automate-keyword-research-for-geo" className={LINK}>automating keyword research for GEO</Link>{" "}
          walks through this with a prompt that does it for you.
        </p>

        <div className="pt-6">
          <Step n={4} />
          <h2 id="why-get-quoted-in-articles-ai-already-cites" className={H2_STEP}>
            Why Does Getting Quoted in Articles AI Already Cites Matter So Much?
          </h2>
        </div>
        <p>
          <strong className="text-ink">
            Because for buying questions, ChatGPT, Perplexity and Claude often recommend the brands named in the articles
            they cite, not the brands with the best website.
          </strong>{" "}
          If a “best project management tools for agencies” roundup is cited in most answers to that question and you
          aren&apos;t in it, you are missing from the answer. Get into that article and you can be named in the answer
          straight away, even before your own page ranks.
        </p>
        <p>It also has three side effects that help your own pages:</p>
        <ul className="list-disc space-y-2 pl-6">
          <li><strong className="text-ink">The article already ranks.</strong> You borrow its position instead of waiting months to earn your own.</li>
          <li><strong className="text-ink">It counts across engines.</strong> The same roundup is often cited by ChatGPT, Perplexity and Claude, so one mention can show up in all three.</li>
          <li><strong className="text-ink">It builds trust in your brand as an entity.</strong> The more independent sites describe you consistently, the more confidently an AI describes you too.</li>
        </ul>

        <h3 className={H3}>How do you find the articles AI cites for your topic?</h3>
        <p>
          Ask each question from step 3 in ChatGPT, Perplexity and Claude with web search on, and copy every cited source
          into a sheet with the question, the engine and the brands it mentions. Run each question two or three times on
          different days, because answers vary. Then sort by how often each URL appears. The pages cited again and again,
          by more than one engine, are your shortlist.
        </p>

        <h3 className={H3}>How do you get quoted in those articles?</h3>
        <p>
          Give the author a reason to include you that makes their article better. What that reason is depends on the type
          of page:
        </p>

        <div className="my-6 overflow-x-auto rounded-xl border border-hairline">
          <table className="w-full text-left text-sm">
            <thead className="bg-seo-soft text-ink">
              <tr>
                <th className="p-4 font-semibold">Type of cited page</th>
                <th className="p-4 font-semibold">How to get in</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              <tr><td className="p-4 font-medium text-ink">“Best X for Y” roundups</td><td className="p-4">Email the author with the one thing you do best for that audience, a free account to test, and a fact or customer result they can quote.</td></tr>
              <tr><td className="p-4 font-medium text-ink">Comparison and “X vs Y” articles</td><td className="p-4">Send an accurate, dated feature and pricing sheet, and point out anything about you that&apos;s out of date. Authors like corrections that keep them right.</td></tr>
              <tr><td className="p-4 font-medium text-ink">Review sites (G2, Capterra, Trustpilot, Google)</td><td className="p-4">Ask happy customers for reviews that name the use case (“great for small agencies”), since AI often repeats those phrases.</td></tr>
              <tr><td className="p-4 font-medium text-ink">Reddit and forum threads</td><td className="p-4">Answer the question honestly, say who you are, and only mention your product where it really fits. Spam gets removed and remembered.</td></tr>
              <tr><td className="p-4 font-medium text-ink">Industry news and data roundups</td><td className="p-4">Publish original data (a survey, a study, your own numbers) and share it with the journalists who cover your space.</td></tr>
              <tr><td className="p-4 font-medium text-ink">YouTube reviews and tutorials</td><td className="p-4">Offer creators early access or a walkthrough. Perplexity and Google&apos;s AI features regularly cite videos.</td></tr>
            </tbody>
          </table>
        </div>
        <p>
          Start with the three or four URLs cited most, because one mention there is worth more than ten on pages AI
          never reads. Keep your pitch short, and make it about their readers rather than your launch.
        </p>

        <AgentCitationsPanel />

        <div className="pt-6">
          <Step n={5} />
          <h2 id="who-is-ai-recommending-ahead-of-you" className={H2_STEP}>
            Who Is AI Recommending Ahead of You, and Why?
          </h2>
        </div>
        <p>
          Ask the engines your buyers&apos; questions and write down which brands they recommend, in what order, the
          reasons they give, and the sources behind each reason. That tells you exactly what to fix. If ChatGPT
          recommends a competitor “because it has a free plan and integrates with QuickBooks”, and you have both, the
          problem is that no source it reads says so about you yet.
        </p>
        <p>The reasons usually fall into one of four gaps:</p>
        <ul className="list-disc space-y-2 pl-6">
          <li><strong className="text-ink">A source gap:</strong> competitors are in the articles AI cites and you aren&apos;t. Fix it with step 4.</li>
          <li><strong className="text-ink">A page gap:</strong> no page of yours answers the question. Write it (step 6).</li>
          <li><strong className="text-ink">A fact gap:</strong> you have the feature, price or result, but it isn&apos;t written anywhere a crawler can read. Publish it on your site and in your llms.txt (step 7).</li>
          <li><strong className="text-ink">A trust gap:</strong> competitors have more reviews, more mentions and more data. That takes longer, so start now.</li>
        </ul>
        <p>Copy this prompt into ChatGPT or Claude with web search on, fill in the brackets, and run it once a month:</p>

        <PromptBlock prompt={RECOMMENDATIONS_PROMPT} label="Who AI recommends instead of you" leadSource="prompt_get_cited_chatgpt_perplexity_claude" />

        <Figure
          src={`${IMG}/seo-geo-agent-am-i-cited-by-chatgpt.png`}
          alt="A chat with the SEO and GEO agent: asked Am I cited by ChatGPT, it checks ChatGPT, Claude, Perplexity and Gemini, finds the site cited on 3 pages, and suggests a billable hours FAQ to win a question where Claude cites a competitor"
          width={1376}
          height={1105}
          caption="Our SEO & GEO agent running this check on a sample site. It doesn't stop at yes or no: it finds the question where Claude cites a competitor instead, and proposes the page that would win it back."
        />

        <SignupCta eyebrow="Let the agent do it" heading="See who AI recommends ahead of you" accent="seo">
          Sign up free and connect your site. The SEO &amp; GEO agent checks ChatGPT, Perplexity, Claude and Gemini for your
          buyers&apos; questions, finds the articles they cite, and shows you what to fix first.
        </SignupCta>

        <div className="pt-6">
          <Step n={6} />
          <h2 id="how-do-you-write-a-page-ai-wants-to-quote" className={H2_STEP}>
            How Do You Write a Page AI Wants to Quote?
          </h2>
        </div>
        <p>
          Answer the question in the first 40 to 60 words, in a passage that makes sense on its own, then give each
          follow-up question its own heading with the answer in the first sentence underneath. AI engines lift short,
          complete passages. A page that spends three paragraphs warming up before it answers gives them nothing to quote,
          even if the answer further down is better than anyone else&apos;s.
        </p>

        <Figure
          src={`${IMG}/seo-geo-agent-page-built-to-be-quoted.png`}
          alt="The SEO and GEO agent's draft of a page titled Best CRM for Agencies in 2026, with a highlighted direct answer for AI to quote, question-style H2 headings and a checklist: keyword-first title, question headings, direct answer, FAQ schema, internal links and sources cited"
          width={1296}
          height={1025}
          caption="How our SEO & GEO agent structures a page to be quoted, shown on a sample site: the answer AI can lift sits on top, and every heading is a question. Every page it writes has to pass the checklist at the bottom."
        />

        <h3 className={H3}>Use question-style headings, one question per section</h3>
        <p>
          Phrase each H2 as a question people actually ask (&quot;How much does an agency CRM cost?&quot;, not
          &quot;Pricing&quot;) and answer it in the first sentence underneath. Each section then works as a standalone answer
          to one of the fan-out searches, which is exactly the unit an AI engine is looking for. Keep one idea per
          section; a heading that covers three questions answers none of them cleanly.
        </p>

        <h3 className={H3}>Add facts, sources and your own data</h3>
        <p>
          Back every claim with a number, a named source or something you measured, and date it. In the research paper
          that coined the term GEO,{" "}
          <a href="https://arxiv.org/abs/2311.09735" className={LINK} target="_blank" rel="noopener">Aggarwal et al. (KDD 2024)</a>{" "}
          found that adding statistics, quotes and citations could boost a source&apos;s visibility in generative engine
          answers by up to 40%. Original data works best of all, because it gives the engine something it can only get
          from you. The two studies in this post are examples: anyone who wants to quote how many sites block AI crawlers,
          or publish an llms.txt, has to cite their source.
        </p>

        <h3 className={H3}>Put tables, lists and FAQs in real text, and be honest</h3>
        <p>
          Comparisons belong in HTML tables, processes in numbered lists, and common follow-up questions in an FAQ
          section. All of it must be real text on the page, not text inside an image, so a crawler can read it. Compare
          honestly too, including where a competitor is the better fit: engines avoid citing pure sales pages.
        </p>

        <div className="pt-6">
          <Step n={7} />
          <h2 id="should-you-add-an-llms-txt-file" className={H2_STEP}>
            Should You Add an llms.txt File?
          </h2>
        </div>
        <p>
          Yes, as long as you see it as a cheap helper and not a ranking switch. An llms.txt is a plain Markdown file at
          yourdomain.com/llms.txt that tells AI tools what your business does and links your most important pages, so a
          model or agent can understand your site without crawling all of it. It was{" "}
          <a href="https://llmstxt.org/" className={LINK} target="_blank" rel="noopener">proposed by Jeremy Howard of Answer.AI</a>{" "}
          in September 2024.
        </p>
        <p>
          Be clear about its limits. No major AI search engine has said it uses llms.txt to choose citations, and Google
          says you don&apos;t need{" "}
          <a href="https://developers.google.com/search/docs/appearance/ai-features" className={LINK} target="_blank" rel="noopener">AI text files or special markup</a>{" "}
          for its AI features. What it does well is give any AI that reads it a correct, current summary of you, in your
          words: your products, prices, audience and best guides. That closes the fact gap from step 5.
        </p>

        <h3 className={H3}>How many top websites publish an llms.txt? (Our November 2026 check)</h3>
        <p>
          <strong className="text-ink">22.1% of the world&apos;s top websites publish an llms.txt file</strong>, and 3.8%
          also publish the longer llms-full.txt. We checked the same 479 sites from our robots.txt study (the Tranco top
          1,000 domains that publish robots.txt rules and allow Googlebot) on 13 November 2026.
        </p>

        <LlmsTxtChart />

        <ul className="list-disc space-y-2 pl-6">
          <li><strong className="text-ink">Software and infrastructure companies lead.</strong> Cloudflare, GitHub, Stripe, Shopify, HubSpot, Slack, Zendesk, Dropbox and Calendly all publish one.</li>
          <li><strong className="text-ink">Publishers are joining too.</strong> Fox News, Business Insider, Time and Weather.com serve one, though Time&apos;s is a usage policy rather than a site map.</li>
          <li><strong className="text-ink">The very biggest sites lag.</strong> Only 6 of the 46 sites in the top 100 publish one (13.0%), against 22.1% overall.</li>
          <li><strong className="text-ink">Four sites send mixed signals.</strong> Bloomberg, the Daily Mail (both domains) and La Repubblica publish an llms.txt but block at least one AI search crawler in robots.txt.</li>
        </ul>
        <p className="text-sm">
          Method: we requested https://domain/llms.txt, then https://www.domain/llms.txt, and counted a site if it
          returned a 200 response with a text file that starts with a Markdown heading, not an HTML page. Limits: some
          sites serve different responses to different visitors (Bloomberg&apos;s file did not appear for every request we
          made), so treat these numbers as a snapshot.{" "}
          <a href={LLMS_CSV} className={LINK} download>Download the results (CSV, 479 sites)</a>. You&apos;re welcome to use
          the data with a link to this page.
        </p>

        <h3 className={H3}>What should your llms.txt include?</h3>
        <p>Keep it short and factual. This template covers what most small businesses need:</p>

        <PromptBlock prompt={LLMS_TXT} label="llms.txt template" copyLabel="Copy" />

        <p>
          Serve it as plain text at the root of your domain and keep it up to date, since an out-of-date price in your
          llms.txt is worse than none. We generate{" "}
          <a href="/llms.txt" className={LINK}>our own llms.txt</a> from the same list that builds our blog, so every new
          guide is added the moment it&apos;s published.
        </p>

        <div className="pt-6">
          <Step n={8} />
          <h2 id="does-page-speed-affect-whether-ai-cites-you" className={H2_STEP}>
            Does Page Speed Affect Whether AI Cites You?
          </h2>
        </div>
        <p>
          Yes, in two ways. When ChatGPT, Perplexity or Claude opens your page during an answer, it does so while the user
          waits, so a page that is slow to respond risks being skipped for a faster one. And speed is part of how Google
          ranks pages, which is where AI answers find many of their candidates.
        </p>
        <p>
          The bigger issue is often JavaScript, not raw speed. When Vercel analysed crawler traffic across its network, it
          found that{" "}
          <a href="https://vercel.com/blog/the-rise-of-the-ai-crawler" className={LINK} target="_blank" rel="noopener">none of the major AI crawlers it tracked ran JavaScript</a>,
          including OpenAI&apos;s and Anthropic&apos;s. They read the HTML your server sends and stop.
        </p>

        <CrawlerViewDiagram />

        <p>Aim for these, and test with Google&apos;s PageSpeed Insights:</p>
        <div className="my-6 overflow-x-auto rounded-xl border border-hairline">
          <table className="w-full text-left text-sm">
            <thead className="bg-seo-soft text-ink">
              <tr>
                <th className="p-4 font-semibold">Check</th>
                <th className="p-4 font-semibold">Target</th>
                <th className="p-4 font-semibold">Why it matters for AI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              <tr><td className="p-4 font-medium text-ink">Main content in the raw HTML</td><td className="p-4">The answer visible in “view source”</td><td className="p-4">Most AI crawlers don&apos;t run JavaScript</td></tr>
              <tr><td className="p-4 font-medium text-ink">Time to first byte (TTFB)</td><td className="p-4"><a href="https://web.dev/articles/ttfb" className={LINK} target="_blank" rel="noopener">0.8 seconds or less</a></td><td className="p-4">Live fetches happen while the user waits</td></tr>
              <tr><td className="p-4 font-medium text-ink">Largest Contentful Paint (LCP)</td><td className="p-4"><a href="https://web.dev/articles/vitals" className={LINK} target="_blank" rel="noopener">2.5 seconds or less</a></td><td className="p-4">A Core Web Vital that feeds Google rankings</td></tr>
              <tr><td className="p-4 font-medium text-ink">No content behind pop-ups or logins</td><td className="p-4">Answer readable without clicking</td><td className="p-4">Crawlers can&apos;t close a cookie wall or sign in</td></tr>
              <tr><td className="p-4 font-medium text-ink">Page weight</td><td className="p-4">Compressed images, few scripts</td><td className="p-4">Lighter pages respond and render faster</td></tr>
            </tbody>
          </table>
        </div>
        <p>
          Our guide on <Link href="/blog/how-to-make-website-faster" className={LINK}>how to make your website faster</Link>{" "}
          walks through the fixes that make the biggest difference.
        </p>

        <div className="pt-6">
          <Step n={9} />
          <h2 id="which-metadata-helps-ai-understand-your-pages" className={H2_STEP}>
            Which Metadata Helps AI Understand Your Pages?
          </h2>
        </div>
        <p>
          A clear title, an accurate meta description, a canonical URL, visible publish and update dates, a named author,
          and structured data that describes the page and your business. None of it is AI-only; it&apos;s the same metadata
          Google uses, and it helps every engine work out what a page is about, who wrote it and whether it&apos;s current.
        </p>
        <div className="my-6 overflow-x-auto rounded-xl border border-hairline">
          <table className="w-full text-left text-sm">
            <thead className="bg-seo-soft text-ink">
              <tr>
                <th className="p-4 font-semibold">Metadata</th>
                <th className="p-4 font-semibold">What it tells AI search</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              <tr><td className="p-4 font-medium text-ink">Title tag</td><td className="p-4">The question the page answers. Lead with it, keep it under 60 characters.</td></tr>
              <tr><td className="p-4 font-medium text-ink">Meta description</td><td className="p-4">A one-sentence summary that search results, and often the engines, show.</td></tr>
              <tr><td className="p-4 font-medium text-ink">Canonical URL</td><td className="p-4">Which version of the page to cite when there are duplicates.</td></tr>
              <tr><td className="p-4 font-medium text-ink">datePublished and dateModified</td><td className="p-4">That the facts are current. Show the updated date on the page too.</td></tr>
              <tr><td className="p-4 font-medium text-ink">Author with a profile link</td><td className="p-4">Who stands behind the claims, and their expertise.</td></tr>
              <tr><td className="p-4 font-medium text-ink">Organization schema with sameAs</td><td className="p-4">That your site, LinkedIn, review profiles and listings are the same business.</td></tr>
              <tr><td className="p-4 font-medium text-ink">FAQ, Product or HowTo schema</td><td className="p-4">The structure of the answer, as long as it matches the visible text.</td></tr>
            </tbody>
          </table>
        </div>
        <p>Here is what that looks like in a page&apos;s head:</p>

        <PromptBlock prompt={HEAD_METADATA} label="Example page metadata" copyLabel="Copy" />

        <p>
          Two rules keep it working. First, the structured data must match what&apos;s on the page; Google ignores, and
          can penalise, markup that describes content nobody can see. Second, only change dateModified when the content
          really changes. Bumping the date without updating anything is easy to spot and erodes trust.
        </p>

        <div className="pt-6">
          <Step n={10} />
          <h2 id="how-do-you-check-if-chatgpt-cites-your-website" className={H2_STEP}>
            How Do You Check If ChatGPT Cites Your Website?
          </h2>
        </div>
        <p>
          Keep the fixed list of buyer questions from step 3 and check them in ChatGPT, Perplexity, Claude and Gemini every
          week, with web search on, recording whether you are cited, mentioned or missing, and who is cited instead. Do it
          from a logged-out or fresh session where you can, because personalisation can change answers. Twenty questions
          checked every week tells you far more than two hundred checked once, because AI answers change from one run to
          the next.
        </p>
        <p>You can hand most of the work to an AI tool with web search. Copy this prompt, fill in the brackets, and run it in ChatGPT or Claude:</p>

        <PromptBlock prompt={VISIBILITY_PROMPT} label="AI visibility check prompt" leadSource="prompt_get_cited_by_chatgpt" />

        <p>
          For traffic rather than citations, two places help. Google counts clicks from AI Overviews and AI Mode inside
          the normal Web search type in Search Console; it doesn&apos;t split them out. Visits from ChatGPT, Perplexity,
          Claude and Gemini usually appear as referrals from their domains in your analytics, such as chatgpt.com,
          perplexity.ai and claude.ai. Many citations never produce a click, though, so the weekly check is the real
          measure.
        </p>
        <p>
          When a page slips, refresh it: update the numbers, add what has changed, and show the date it was updated.
          The weekly trend then tells you whether the change worked.
        </p>

        <h2 id="how-do-you-automate-geo-with-an-ai-agent" className={H2}>How Do You Automate GEO With an AI Agent?</h2>
        <p>
          An AI agent can run the whole loop on a schedule: read your Search Console data, find the questions you can
          win, find the articles AI cites for them, write or refresh pages built to be quoted, publish them, and check
          every week which AI tools cite each page. That is what our{" "}
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
          <li><strong className="text-ink">An llms.txt file on its own.</strong> It helps AI describe you correctly (step 7), but it&apos;s not why pages get cited. Crawler access, rankings and mentions do that.</li>
          <li><strong className="text-ink">Special schema for AI.</strong> There is no AI-only markup. Normal structured data that matches the page is enough.</li>
          <li><strong className="text-ink">Blocking GPTBot to &quot;protect&quot; content and expecting citations to drop, or to rise.</strong> GPTBot only covers training. Citations in ChatGPT depend on OAI-SearchBot.</li>
          <li><strong className="text-ink">Hundreds of thin AI-written pages.</strong> Pages that don&apos;t rank never become candidates, and pages with nothing new give an engine no reason to quote them.</li>
          <li><strong className="text-ink">Writing for the AI instead of the reader.</strong> The pages that get quoted are the ones that answer a real person&apos;s question best. Keyword lists and robotic phrasing help neither.</li>
        </ul>

        <h2 id="summary" className={H2}>Summary</h2>
        <p>
          ChatGPT, Perplexity and Claude cite pages they can crawl, that rank for the searches they run, and that answer
          the question clearly with evidence. For buying questions they lean heavily on third-party articles, so the
          fastest way into the answer is often to be quoted in the roundups, reviews and comparisons they already cite,
          while your own pages catch up.
        </p>
        <p>
          So the order is: let OAI-SearchBot, PerplexityBot and Claude-SearchBot in; get indexed and ranking in Google and
          Bing; find the articles AI cites and get into them; check who AI recommends ahead of you and why; write pages
          built to be quoted; and back it all with an llms.txt file, fast server-rendered pages and honest metadata. Then
          check the same questions every week.
        </p>
        <p>
          Our studies of the top 1,000 websites show how much room there is: about 1 in 6 of them block at least one AI
          search crawler, and only about 1 in 5 publish an llms.txt. Check your own robots.txt today; it&apos;s the fastest
          GEO win there is.
        </p>

        <SignupCta heading="Get found on Google and quoted by AI" accent="seo">
          Sign up free and connect Google Search Console. The SEO &amp; GEO agent finds the questions you can win and the
          articles AI cites for them, shows who it recommends ahead of you, writes the pages to close the gap, and tracks
          your citations every week.
        </SignupCta>
      </div>
    </BlogPostShell>
  )
}

import type { ReactNode } from "react"
import Image from "next/image"
import Link from "next/link"
import { Check } from "lucide-react"
import { SignupCta } from "@/components/blog/signup-cta"
import { BlogPostShell } from "@/components/blog/post-shell"
import { Figure } from "@/components/blog/figure"
import { PromptBlock } from "@/components/blog/prompt-block"
import { buildPostMetadata, type Faq } from "@/lib/blog"

const SLUG = "how-to-get-cited-by-chatgpt-perplexity-and-claude"

export const metadata = buildPostMetadata(SLUG)

// Themed like /agents/seo-geo: the SEO agent's dark green (--seo) on soft green.
const GREEN = "#24573a"
const GREEN_SOFT = "#edf5f0"

const H2 = "text-3xl font-semibold tracking-[-0.02em] text-ink mt-14 mb-4"
const H2_STEP = "text-3xl font-semibold tracking-[-0.02em] text-ink mt-3"
const H3 = "text-xl font-semibold tracking-[-0.01em] text-ink mt-8 mb-3"
const LINK = "text-ink underline decoration-seo/40 underline-offset-4 hover:decoration-seo"
const IMG = `/blog/${SLUG}`
const CHATGPT_POST_IMG = "/blog/how-to-get-cited-by-chatgpt"
const DATA_CSV = `${IMG}/llms-txt-adoption-top-1000-websites-nov-2026.csv`

const faqs: Faq[] = [
  {
    question: "How do I get cited by ChatGPT, Perplexity and Claude?",
    answer:
      "Let their search crawlers in (OAI-SearchBot, PerplexityBot and Claude-SearchBot), get indexed in Google and Bing, and get quoted in the roundups, reviews and comparison articles these engines already cite for your buyers' questions. Then write pages that answer each question in the first two sentences, publish an llms.txt file, keep pages fast and readable without JavaScript, fill in your metadata, and check every week who AI recommends ahead of you.",
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
    question: "Does an llms.txt file help you get cited by AI?",
    answer:
      "It helps AI tools and agents understand your site quickly, but no major AI search engine has said it uses llms.txt to choose citations, and Google says you don't need AI text files for its AI features. It takes under an hour to publish, so add one, but don't expect it to replace crawler access, rankings and mentions. In our November 2026 check, 22.1% of the world's top websites publish one.",
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
    question: "Can I pay to be featured in the articles AI cites?",
    answer:
      "Some roundup sites sell placements, and if you buy one it should be clearly disclosed. Paying doesn't guarantee that ChatGPT or Perplexity will keep citing that article. Earned inclusion, through a useful product, original data and genuine reviews, tends to last longer and also builds the trust signals AI engines look for.",
  },
  {
    question: "How long does it take to get cited by AI search?",
    answer:
      "Crawler access changes reach ChatGPT search in about 24 hours, according to OpenAI. A mention in an article that is already cited can show up as soon as the engines re-read that article, often within days. New pages take as long as they take to be indexed and rank, usually weeks. Track the same questions every week rather than judging from one check.",
  },
]

const ROBOTS_TXT = `# AI search: let these in so you can be cited
User-agent: OAI-SearchBot
User-agent: ChatGPT-User
User-agent: PerplexityBot
User-agent: Perplexity-User
User-agent: Claude-SearchBot
User-agent: Claude-User
Allow: /

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

function Step({ n }: { n: number }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-seo-soft px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-seo">
      Step {n}
    </span>
  )
}

export default function HowToGetCitedByChatGptPerplexityAndClaudePage() {
  return (
    <BlogPostShell slug={SLUG} faqs={faqs}>
      <div className="space-y-6 text-neutral-600 leading-relaxed">
        <p className="text-lg text-ink">
          <strong>
            To get cited by ChatGPT, Perplexity and Claude, let their search crawlers read your site, get quoted in the
            articles they already cite for your buyers&apos; questions, and publish pages that answer those questions in
            the first two sentences.
          </strong>{" "}
          Then support it with the technical basics: an llms.txt file, fast pages that don&apos;t depend on JavaScript,
          and clean metadata.
        </p>
        <p>
          Most advice about AI search stops at your own website. But when a buyer asks “what&apos;s the best tool for
          this?”, ChatGPT, Perplexity and Claude often answer from roundups, review sites and comparison articles, and
          name the brands those articles mention. This playbook covers both halves: how to become one of those mentions,
          and how to make your own pages the source. It includes a check we ran this week of how many of the world&apos;s
          top websites publish an llms.txt file.
        </p>
        <p>
          If you want the deep dive on crawlers, our guide on{" "}
          <Link href="/blog/how-to-get-cited-by-chatgpt" className={LINK}>how to get cited by ChatGPT</Link> has our study of
          which AI crawlers the top 1,000 websites block.
        </p>

        <div className="my-8 rounded-2xl border border-seo/15 bg-seo-soft p-6">
          <h2 className="mb-3 text-xl font-semibold tracking-[-0.02em] text-ink">How to get cited by ChatGPT, Perplexity and Claude in 8 steps</h2>
          <ol className="list-decimal space-y-2 pl-6 text-ink marker:font-semibold marker:text-seo">
            <li><strong>Let all three in:</strong> allow OAI-SearchBot, PerplexityBot and Claude-SearchBot, and get indexed in Google and Bing.</li>
            <li><strong>Get quoted in the articles AI already cites</strong> for your buyers&apos; questions. This is the step most sites skip.</li>
            <li><strong>Check who AI recommends ahead of you,</strong> the reasons it gives, and the sources behind them.</li>
            <li><strong>Write pages AI wants to quote:</strong> a direct answer up top, question headings, facts and your own data.</li>
            <li><strong>Publish an llms.txt file</strong> that sums up your business and links your best pages.</li>
            <li><strong>Make pages fast and readable without JavaScript,</strong> so crawlers get the full text first time.</li>
            <li><strong>Fill in your metadata:</strong> titles, descriptions, dates, author and structured data that match the page.</li>
            <li><strong>Track the same questions every week</strong> across all three engines.</li>
          </ol>
        </div>

        <h2 id="how-do-chatgpt-perplexity-and-claude-choose-which-sources-to-cite" className={H2}>
          How Do ChatGPT, Perplexity and Claude Choose Which Sources to Cite?
        </h2>
        <p>
          All three search the web for the question, read the pages that come back, and cite the ones that answer it most
          clearly and credibly. So a page can only be cited if the engine&apos;s crawler can reach it and it shows up in the
          searches the engine runs. Where those searches come from differs a little between them:
        </p>

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
        <p>
          The part that matters for strategy is what they cite. For a factual question (“how long does a website
          redesign take?”), the cited sources are often the brands and experts who answer it best. For a buying question
          (“best CRM for a small agency”), the sources are often third-party articles: roundups, review sites, comparison
          pages and forum threads. The engine then names the brands those articles mention. That gives you two routes in.
        </p>

        <TwoRoutesDiagram />

        <div className="pt-6">
          <Step n={1} />
          <h2 id="can-chatgpt-perplexity-and-claude-reach-your-site" className={H2_STEP}>
            Can ChatGPT, Perplexity and Claude Reach Your Site?
          </h2>
        </div>
        <p>
          Check before anything else, because a page their crawlers can&apos;t read is never cited, however good it is.
          Open yourdomain.com/robots.txt and make sure the search crawlers in the table above aren&apos;t disallowed by
          name or by a catch-all <code>User-agent: *</code> rule. Then check your CDN or firewall (Cloudflare, for
          example, has a setting that blocks AI bots), because those can block crawlers without touching robots.txt.
        </p>
        <p>This robots.txt lets all three engines&apos; search crawlers in:</p>

        <PromptBlock prompt={ROBOTS_TXT} label="robots.txt" copyLabel="Copy" />

        <p>
          A crawler follows only the group that names it, so copy any private paths into the named group too. Then verify
          your site in Google Search Console and Bing Webmaster Tools and submit your sitemap to both. Our{" "}
          <Link href="/blog/how-to-get-cited-by-chatgpt" className={LINK}>study of the top 1,000 websites</Link> found
          that 16.1% of them block at least one AI search crawler, so don&apos;t assume yours is open.
        </p>

        <div className="pt-6">
          <Step n={2} />
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
        <p>It also has three side effects that help route A:</p>
        <ul className="list-disc space-y-2 pl-6">
          <li><strong className="text-ink">The article already ranks.</strong> You borrow its position instead of waiting months to earn your own.</li>
          <li><strong className="text-ink">It counts across engines.</strong> The same roundup is often cited by ChatGPT, Perplexity and Claude, so one mention can show up in all three.</li>
          <li><strong className="text-ink">It builds trust in your brand as an entity.</strong> The more independent sites describe you consistently, the more confidently an AI describes you too.</li>
        </ul>

        <h3 className={H3}>How do you find the articles AI cites for your topic?</h3>
        <p>
          Write down 10 to 20 questions your buyers really ask (“best [product] for [type of business]”, “[competitor]
          alternatives”, “[competitor A] vs [competitor B]”). Ask each one in ChatGPT, Perplexity and Claude with web search
          on, and copy every cited source into a sheet with the question, the engine and the brands it mentions. Run each
          question two or three times on different days, because answers vary. Then sort by how often each URL appears.
          The pages cited again and again, by more than one engine, are your shortlist.
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
          <Step n={3} />
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
          <li><strong className="text-ink">A source gap:</strong> competitors are in the articles AI cites and you aren&apos;t. Fix it with step 2.</li>
          <li><strong className="text-ink">A page gap:</strong> no page of yours answers the question. Write it (step 4).</li>
          <li><strong className="text-ink">A fact gap:</strong> you have the feature, price or result, but it isn&apos;t written anywhere a crawler can read. Publish it on your site and in your llms.txt.</li>
          <li><strong className="text-ink">A trust gap:</strong> competitors have more reviews, more mentions and more data. That takes longer, so start now.</li>
        </ul>
        <p>Copy this prompt into ChatGPT or Claude with web search on, fill in the brackets, and run it once a month:</p>

        <PromptBlock prompt={RECOMMENDATIONS_PROMPT} label="Who AI recommends instead of you" leadSource="prompt_get_cited_chatgpt_perplexity_claude" />

        <Figure
          src={`${CHATGPT_POST_IMG}/seo-geo-agent-am-i-cited-by-chatgpt.png`}
          alt="A chat with the SEO and GEO agent: asked Am I cited by ChatGPT, it checks ChatGPT, Claude, Perplexity and Gemini, finds the site cited on 3 pages, and suggests a billable hours FAQ to win a question where Claude cites a competitor"
          width={1376}
          height={1105}
          caption="Our SEO & GEO agent running this check on a sample site. It finds the question where Claude cites a competitor instead, and proposes the page that would win it back."
        />

        <p>
          The <Link href="/agents/seo-geo" className={LINK}>SEO &amp; GEO agent</Link> runs this review for you every week.
          It shows which brands each engine recommends for your questions, the reasons it gives and the sources behind
          them, then turns each gap into a job: an article to get quoted in, a page to write, or a fact to publish.
        </p>

        <SignupCta eyebrow="Let the agent do it" heading="See who AI recommends ahead of you" accent="seo">
          Sign up free and connect your site. The SEO &amp; GEO agent checks ChatGPT, Perplexity, Claude and Gemini for your
          buyers&apos; questions, finds the articles they cite, and shows you what to fix first.
        </SignupCta>

        <div className="pt-6">
          <Step n={4} />
          <h2 id="how-do-you-write-a-page-ai-wants-to-quote" className={H2_STEP}>
            How Do You Write a Page AI Wants to Quote?
          </h2>
        </div>
        <p>
          Answer the question in the first 40 to 60 words, in a passage that makes sense on its own, then give each
          follow-up question its own heading with the answer in the first sentence underneath. AI engines lift short,
          complete passages. A page that warms up for three paragraphs gives them nothing to quote.
        </p>
        <ul className="list-disc space-y-2 pl-6">
          <li><strong className="text-ink">Question headings:</strong> “How much does an agency CRM cost?”, not “Pricing”.</li>
          <li><strong className="text-ink">Facts with dates and sources:</strong> prices, numbers and claims an engine can check. In the paper that coined the term GEO, <a href="https://arxiv.org/abs/2311.09735" className={LINK} target="_blank" rel="noopener">Aggarwal et al. (KDD 2024)</a> found adding statistics, quotes and citations could lift a source&apos;s visibility in AI answers by up to 40%.</li>
          <li><strong className="text-ink">Original data:</strong> something only you can publish, so anyone quoting it has to cite you.</li>
          <li><strong className="text-ink">Tables and lists as real text,</strong> never inside images.</li>
          <li><strong className="text-ink">Honest comparisons,</strong> including where a competitor is the better fit. Engines avoid citing pure sales pages.</li>
        </ul>

        <Figure
          src={`${CHATGPT_POST_IMG}/seo-geo-agent-page-built-to-be-quoted.png`}
          alt="The SEO and GEO agent's draft of a page titled Best CRM for Agencies in 2026, with a highlighted direct answer for AI to quote, question-style H2 headings and a checklist: keyword-first title, question headings, direct answer, FAQ schema, internal links and sources cited"
          width={1296}
          height={1025}
          caption="A page drafted by our SEO & GEO agent for a sample site. The quotable answer sits on top, every heading is a question, and the page has to pass the checklist before it can be published."
        />

        <p>
          To find which questions to write for in the first place, our guide to{" "}
          <Link href="/blog/how-to-automate-keyword-research-for-geo" className={LINK}>automating keyword research for GEO</Link>{" "}
          turns your Search Console data into the prompts buyers type into AI.
        </p>

        <div className="pt-6">
          <Step n={5} />
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
          words: your products, prices, audience and best guides. That helps with the “fact gap” from step 3.
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
          <a href={DATA_CSV} className={LINK} download>Download the results (CSV, 479 sites)</a>. You&apos;re welcome to use
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
          <Step n={6} />
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
          <Step n={7} />
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
          <Step n={8} />
          <h2 id="how-do-you-track-whether-ai-cites-you" className={H2_STEP}>
            How Do You Track Whether ChatGPT, Perplexity and Claude Cite You?
          </h2>
        </div>
        <p>
          Keep a fixed list of 20 or so buyer questions and check them in all three engines every week, recording whether
          you are cited, mentioned or missing, and who is cited instead. Twenty questions checked weekly tells you far more
          than two hundred checked once, because AI answers change from one run to the next.
        </p>
        <p>
          For traffic, look for referrals from chatgpt.com, perplexity.ai and claude.ai in your analytics. Many citations
          never produce a click, though, so the weekly check is the real measure. Our{" "}
          <Link href="/agents/seo-geo" className={LINK}>SEO &amp; GEO agent</Link> tracks this alongside your Google
          rankings, and our guide to{" "}
          <Link href="/blog/how-to-automate-seo-and-geo-growth-with-ai-agent" className={LINK}>automating SEO and GEO with an AI agent</Link>{" "}
          shows how to build a version of that loop yourself.
        </p>

        <h2 id="summary" className={H2}>Summary</h2>
        <p>
          ChatGPT, Perplexity and Claude cite pages they can reach, that show up in their searches, and that answer the
          question clearly with evidence. For buying questions they lean heavily on third-party articles, so the fastest
          way into the answer is often to be quoted in the roundups, reviews and comparisons they already cite, while your
          own pages catch up.
        </p>
        <p>
          So the order is: let OAI-SearchBot, PerplexityBot and Claude-SearchBot in; find the articles AI cites and get
          into them; check who AI recommends ahead of you and why; write pages built to be quoted; and back it all with an
          llms.txt file, fast server-rendered pages and honest metadata. Then check the same questions every week.
        </p>

        <SignupCta heading="Get cited by ChatGPT, Perplexity and Claude" accent="seo">
          Sign up free and connect Google Search Console. The SEO &amp; GEO agent finds the articles AI cites for your
          buyers&apos; questions, shows who it recommends ahead of you, writes the pages to close the gap, and tracks your
          citations every week.
        </SignupCta>
      </div>
    </BlogPostShell>
  )
}

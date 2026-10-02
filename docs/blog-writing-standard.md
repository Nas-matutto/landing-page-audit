# Blog writing standard

Every post should rank in Google **and** be quotable by AI answer engines (ChatGPT, Perplexity, Gemini, Google AI Overviews). This is the checklist. `app/blog/how-to-build-an-ai-agent/page.tsx` is the reference example.

## 1. One keyword, one URL

- Each post targets **one primary query** (e.g. "how to build an AI agent"). Before writing, check that no existing post or `/agents/*` page already targets it. If one does, update that page instead.
- Blog posts answer **informational** queries ("how to…", "what is…"). `/agents/*` pages target **commercial** queries ("AI SEO agent", "social media automation service"). Set `agentPage` in the registry so the two link to each other.
- Assign the post to one category in `lib/blog.ts`. Categories are the topic clusters.

## 2. Registry entry (`lib/blog.ts`)

- `title`: the H1. Lead with the keyword.
- `seoTitle`: the `<title>`, **≤ 60 characters**, keyword first. Only needed if the H1 is longer.
- `description`: **≤ 155 characters**. Say what the reader gets, and include the keyword naturally.
- `dateModified`: bump it **only** when the content meaningfully changes. Refresh pillar posts every quarter.
- `cover`: unique per post, 1200×630 preferred, stored in `/public/blog/<slug>/` with a descriptive filename.
- `video`: set it when the post embeds our own YouTube video. It becomes `VideoObject` schema.

## 3. Structure

- **First 40–60 words answer the query directly**, in a bold lead paragraph. Write it so an AI could quote it on its own.
- Then a TL;DR box (`<h2>` without an `id`, so it stays out of the table of contents).
- **H2s are the questions people actually search** ("How Does an AI SEO Agent Work?", not "How It Works"). Give each H2 an `id` so it appears in the table of contents. The first sentence under each H2 answers it.
- Use H3 under H2. Never skip levels. Headings inside CTA panels are `<p>`, not `<h2>`/`<h3>`.
- Numbered steps for how-tos. **HTML tables** (not images) for comparisons.
- FAQs go in the `faqs` array passed to `<BlogPostShell>`, not in the body. That renders them crawlably and emits FAQPage schema from the same data.
- At most **two CTAs**: one mid-article and one at the end. The shell adds the agent link and author box.

## 4. Evidence (E-E-A-T / GEO)

- At least **one piece of original data** per post: real numbers from our agents or clients, a screenshot of real output, a test we ran. This is what gets cited.
- Name concrete tools and entities (Claude, n8n, Google Search Console, QuickBooks…). Link to official sources for external facts and date any statistic.
- Keep the body tool-agnostic and genuinely useful. Include the DIY route, not only "book a demo". Answer engines avoid citing pure sales pages.
- Never invent statistics, customers or quotes.

## 5. Style

- **Don't use dashes as punctuation** (" — ", " – ", " - "). Use a comma, colon, semicolon, full stop or brackets instead. Heavy dash use reads as AI-written. Hyphenated words ("step-by-step") and number ranges ("20–40 minutes") are fine.
- Short sentences and plain words. Write for a busy business owner, not a developer.

## 6. Visuals

- **6–10 visuals per post** (roughly one per 300–400 words): annotated screenshots of each step, real agent output, a diagram of how it works.
- Use `<Figure>` from `components/blog/figure.tsx` with a **descriptive `alt`** and a **caption that explains why the image matters** (don't repeat the alt text).
- Draw diagrams as inline SVG with a `<title>` (see `AgentLoopDiagram` in `what-are-ai-agents`), so the labels are crawlable text.
- Follow every embedded video with a one-to-two-sentence text summary of what it shows.

## 7. Links

- Link to the cluster's **pillar post**, to 2–3 related guides, and to the matching `/agents/*` page, using descriptive anchor text, never "click here".
- Link new posts from at least one existing post in the same cluster.

## 8. Before publishing

- `pnpm build`, then `curl -s localhost:3000/blog/<slug>` and confirm: a unique `<title>`, a meta description, a canonical, JSON-LD (`BlogPosting`, `BreadcrumbList`, `FAQPage`), and the FAQ answer text in the raw HTML.
- After deploying: request indexing for the URL in Google Search Console.

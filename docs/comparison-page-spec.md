# Comparison page spec

Every `/compare/<slug>` page follows this spec, so none ends up thin. The copy lives in `lib/compare.ts` (one entry per competitor). `app/compare/[slug]/page.tsx` renders it, so the structure can't drift.

## 1. One competitor, one search

- Each page targets one search: "[competitor] alternative" or "Talk to me Data vs [competitor]".
- Pick competitors that users actually mention or switch from. Start with the big schedulers (Buffer, Later, Hootsuite), then add Sprout Social, Metricool and others.
- A page for a "best X" list or an "X vs Y" between two other tools is a different template. Don't force it into this one.

## 2. The sections, in this order

| # | Section (H2, phrased as a question) | What goes in it |
|---|---|---|
| 1 | The short answer | A 40 to 60 word verdict that says who should pick which. It has to make sense quoted on its own. |
| 2 | What is the difference between Talk to me Data and X? | One sentence on each tool, then the "at a glance" table (7 rows). |
| 3 | Which is better for creating posts? | 2 or 3 paragraphs. This is our strongest difference, so be concrete. |
| 4 | Which is better for scheduling and autopilot? | 2 paragraphs. Say what they do well first. |
| 5 | Which platforms do they post to? | Table, one row per platform. Include the platforms they support and we don't. |
| 6 | How much do they cost? | Pricing table, plus a worked example: one business posting 3 times a week to Instagram, TikTok and Facebook. |
| 7 | Should you choose Talk to me Data or X? | Two lists: "Choose Talk to me Data if" (5 items) and "Choose X if" (4 items). |
| 8 | Can you use them together? | 1 paragraph, honest. |

After the sections come 6 FAQs (they render as FAQ structured data), the sources, and a "Keep exploring" block with at least 8 internal links. There are two calls to action: one after section 4 and one at the end.

## 3. Facts

- Every claim about a competitor comes from **their own website**, linked under Sources, with the date it was checked in `factsChecked`. Third-party pricing blogs disagree with each other, so don't use them.
- Give yearly and monthly prices where they differ, and say which is which.
- Our facts come from `lib/pricing.ts` (plans and actions) and the privacy policy (which platforms we post to). Don't claim a platform we don't post to.
- Re-check every page every quarter, and change `dateModified` and `factsChecked` when you do.
- No logos or screenshots of competitor products. Using their names is fine.

## 4. Be honest

- Say where the competitor is the better pick. Google and AI answer engines distrust pages where one side always wins, and readers notice too.
- Never run a competitor down. Describe what they do, plainly.

## 5. The human part (required before publishing)

Pages start as drafts (`reviewed: false`). A draft only renders in `next dev`. It isn't in the build, the sitemap or llms.txt.

Before setting `reviewed: true`, Nas:

1. Reads the whole page and rewrites anything that doesn't sound like him.
2. Fills in at least one HUMAN slot with real experience:
   - `nasTake`: his own view, first person, 2 to 4 sentences.
   - `weTried`: what he saw when he actually used the competitor.
   - `customerQuote`: a real customer, with their permission.
3. Adds one specific detail only we would know, such as a customer's setup, a number from our own account, or a real screenshot.

Empty slots render nothing, so a page is never padded with made-up stories.

## 6. Style

- Follow `docs/blog-writing-standard.md` §5: no dashes as punctuation, short sentences, plain words.
- Brand name: "Talk to me Data".
- `seoTitle` is 60 characters or fewer; `description` is 155 characters or fewer.

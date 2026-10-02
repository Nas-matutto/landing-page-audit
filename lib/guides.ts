import type { Metadata } from "next"
import type { LucideIcon } from "lucide-react"
import { Bot, ListChecks, Wrench } from "lucide-react"
import { SITE_NAME, SITE_URL, absoluteUrl, type Faq } from "@/lib/blog"
import { OG_IMAGE } from "@/lib/og"

/**
 * Single source of truth for the free PDF guides. The /free-guides hub, each
 * guide page's metadata + JSON-LD, the sitemap and /llms.txt read from here.
 *
 * Copy must match what is actually in the PDF (public/guides/*.pdf): these
 * pages are quoted by answer engines, so never describe a section the PDF
 * doesn't have.
 */

export type Guide = {
  slug: string
  /** H1. Lead with the keyword. */
  title: string
  /** <title>, ≤ 60 characters. */
  seoTitle: string
  /** Meta description, ≤ 155 characters. */
  description: string
  /** First paragraph on the page: answers "what is this" in 40–60 words. */
  lede: string
  /** Hub card copy. */
  excerpt: string
  kind: "Checklist" | "Audit" | "Guide"
  Icon: LucideIcon
  pages: number
  stats: { value: string; label: string }[]
  /** What the PDF contains, in the order it appears. */
  inside: { title: string; description: string }[]
  /** Form → API route that emails the PDF. */
  endpoint: string
  cta: string
  keywords: string[]
  about: string[]
  datePublished: string
  dateModified: string
  /** Blog posts to recommend, by slug. */
  relatedPosts: string[]
}

export const GUIDES: Guide[] = [
  {
    slug: "business-automation-checklist",
    title: "Business Automation Checklist: 18 Tasks to Automate First",
    seoTitle: "Business Automation Checklist: 18 Tasks to Automate",
    description:
      "Free business automation checklist (PDF): 18 everyday tasks small businesses still do by hand, across sales, support, scheduling, admin and marketing.",
    lede:
      "The Business Automation Checklist is a free 6-page PDF that lists 18 everyday tasks most small businesses still do by hand, grouped into five areas: sales, support, scheduling, admin and marketing. Tick the ones your team still does manually, add up your score, and you'll know exactly what to automate first.",
    excerpt:
      "18 everyday tasks across sales, support, scheduling, admin and marketing. Tick what you still do by hand and see how much of your week is busywork.",
    kind: "Checklist",
    Icon: ListChecks,
    pages: 6,
    stats: [
      { value: "18", label: "tasks" },
      { value: "5", label: "business areas" },
      { value: "6", label: "page PDF" },
    ],
    inside: [
      {
        title: "18 tasks in five areas",
        description:
          "Sales and lead response, customer support, scheduling, admin and back office, marketing and retention. The work every small business repeats.",
      },
      {
        title: "What each task really costs",
        description:
          "Every item comes with one line on what it costs you while it stays manual, so you can spot the expensive ones fast.",
      },
      {
        title: "A score in three bands",
        description:
          "Add up your ticks. 0–5, 6–11 or 12–18 tells you how much of your team's week is going to work that doesn't need a person.",
      },
      {
        title: "What it looks like with an agent",
        description:
          "For each area, a short example of the AI agent that takes the work over: lead qualification, support, booking and admin.",
      },
    ],
    endpoint: "/api/send-guide",
    cta: "Send me the checklist",
    keywords: [
      "business automation checklist",
      "what to automate in business",
      "small business automation",
      "tasks to automate",
      "automate repetitive tasks",
      "business process automation checklist",
    ],
    about: ["Business process automation", "AI agents", "Small business operations"],
    datePublished: "2026-06-15",
    dateModified: "2026-10-02",
    relatedPosts: [
      "ai-agents-for-small-business",
      "how-to-automate-data-entry-and-reporting-with-ai-agent",
      "how-to-automate-customer-service-with-ai-agent",
    ],
  },
  {
    slug: "ai-agent-readiness-audit",
    title: "AI Agent Readiness Audit: Is Your Business Ready for AI Agents?",
    seoTitle: "AI Agent Readiness Audit: Free Scorecard (PDF)",
    description:
      "Free AI agent readiness audit (PDF): 20 questions across 5 areas of your business, scored out of 40, so you know where an AI agent would help most.",
    lede:
      "The AI Agent Readiness Audit is a free 7-page scorecard with 20 questions across five areas of your business: lead response, customer support, scheduling, admin and growth. Each area is scored out of 8, for a total out of 40. Your two lowest sections show where an AI agent would save the most time.",
    excerpt:
      "20 questions across lead response, support, scheduling, admin and growth, scored out of 40. Your lowest sections show where to start with AI agents.",
    kind: "Audit",
    Icon: Bot,
    pages: 7,
    stats: [
      { value: "20", label: "questions" },
      { value: "5", label: "areas scored" },
      { value: "40", label: "point scale" },
    ],
    inside: [
      {
        title: "20 multiple-choice questions",
        description:
          "Four questions per area, each with four plain-language answers from \"fully manual\" to \"fully automated\". Circle the one that fits.",
      },
      {
        title: "A score for each of 5 areas",
        description:
          "Lead response, customer support, scheduling, admin and operations, growth and retention. Each is scored out of 8 with a note on what it means.",
      },
      {
        title: "Your readiness band",
        description:
          "Your total out of 40 puts you in one of three bands: high opportunity, ready now or scale up, with what each means for your business.",
      },
      {
        title: "Where to start first",
        description:
          "Your two lowest sections are your highest-leverage starting points. The audit shows how to turn them into your first agent.",
      },
    ],
    endpoint: "/api/send-ai-agent-guide",
    cta: "Send me the audit",
    keywords: [
      "AI agent readiness audit",
      "AI readiness assessment",
      "is my business ready for AI",
      "AI readiness checklist",
      "AI agents for small business",
      "where to use AI agents",
    ],
    about: ["AI readiness", "AI agents", "Business process automation"],
    datePublished: "2026-06-16",
    dateModified: "2026-10-02",
    relatedPosts: ["what-are-ai-agents", "ai-agents-for-small-business", "how-to-automate-customer-service-with-ai-agent"],
  },
  {
    slug: "how-to-build-ai-agents",
    title: "How to Build AI Agents: The Free Guide for Business Owners",
    seoTitle: "How to Build AI Agents: Free PDF Guide for Business Owners",
    description:
      "Free PDF guide to building AI agents: which tasks to automate, how to build your first agent in Claude with MCP, and where the DIY route hits limits.",
    lede:
      "How to Build AI Agents is a free 7-page PDF for business owners. It shows which manual tasks are worth handing to an AI agent, how to build your first one in Claude in four steps (a Project, instructions, MCP tools and a trigger), where the DIY route hits its limits, and how the done-for-you route compares.",
    excerpt:
      "Which manual work to hand to an agent, how to build your first one in Claude in four steps, the honest limits of DIY, and the done-for-you route.",
    kind: "Guide",
    Icon: Wrench,
    pages: 7,
    stats: [
      { value: "8", label: "workflows" },
      { value: "4", label: "build steps" },
      { value: "2", label: "paths compared" },
    ],
    inside: [
      {
        title: "8 workflows worth automating",
        description:
          "From invoice processing to lead research, each with a manual versus agent breakdown so you can see the time it takes today.",
      },
      {
        title: "Your first agent in Claude",
        description:
          "Create a Project, add instructions, connect real tools with MCP and run the workflow. Includes an example instruction you can copy.",
      },
      {
        title: "The honest DIY limits",
        description:
          "Usage windows, agents stalling mid-task, API keys and hosting. Know where building it yourself breaks before you rely on it.",
      },
      {
        title: "The done-for-you route",
        description:
          "A side-by-side comparison of DIY in Claude and a hosted, managed agent, so you can pick the path that fits.",
      },
    ],
    endpoint: "/api/send-build-ai-agents-guide",
    cta: "Send me the guide",
    keywords: [
      "how to build AI agents",
      "AI agent guide PDF",
      "build an AI agent in Claude",
      "AI agents for business owners",
      "MCP model context protocol",
      "automate manual work with AI",
    ],
    about: ["AI agents", "Claude", "Model Context Protocol"],
    datePublished: "2026-07-14",
    dateModified: "2026-10-02",
    relatedPosts: ["how-to-build-an-ai-agent", "what-are-ai-agents", "how-to-build-social-media-ai-agent"],
  },
]

export const GUIDES_TITLE = "Free AI Agent & Automation Guides (PDF)"
export const GUIDES_DESCRIPTION =
  "Free PDF guides for business owners: a business automation checklist, an AI agent readiness audit and a step-by-step guide to building AI agents."

export const guidePath = (slug: string) => `/free-guides/${slug}`

export function getGuide(slug: string): Guide {
  const guide = GUIDES.find(g => g.slug === slug)
  if (!guide) throw new Error(`Unknown guide: ${slug}`)
  return guide
}

export function getOtherGuides(slug: string): Guide[] {
  return GUIDES.filter(g => g.slug !== slug)
}

/** The PDF itself, described as the page's main entity. Shared by the hub's ItemList and each guide page. */
export function guideDocumentJsonLd(guide: Guide) {
  const url = absoluteUrl(guidePath(guide.slug))
  return {
    "@type": "DigitalDocument",
    "@id": `${url}#guide`,
    name: guide.title,
    description: guide.description,
    url,
    encodingFormat: "application/pdf",
    learningResourceType: guide.kind,
    isAccessibleForFree: true,
    inLanguage: "en",
    datePublished: guide.datePublished,
    dateModified: guide.dateModified,
    keywords: guide.keywords.join(", "),
    about: guide.about.map(name => ({ "@type": "Thing", name })),
    audience: { "@type": "BusinessAudience", audienceType: "Small and medium business owners" },
    // Defined once, site-wide, in app/layout.tsx.
    author: { "@id": `${SITE_URL}/#organization` },
    publisher: { "@id": `${SITE_URL}/#organization` },
  }
}

export function buildGuideMetadata(slug: string): Metadata {
  const guide = getGuide(slug)
  const url = absoluteUrl(guidePath(slug))
  return {
    title: guide.seoTitle,
    description: guide.description,
    keywords: guide.keywords,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: guide.seoTitle,
      description: guide.description,
      siteName: SITE_NAME,
      publishedTime: guide.datePublished,
      modifiedTime: guide.dateModified,
      tags: guide.keywords,
      images: [OG_IMAGE],
    },
    twitter: { card: "summary_large_image", title: guide.seoTitle, description: guide.description, images: [OG_IMAGE] },
  }
}

export function buildGuideJsonLd(slug: string, faqs: Faq[], extra: object[] = []) {
  const guide = getGuide(slug)
  const url = absoluteUrl(guidePath(slug))
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: guide.seoTitle,
        description: guide.description,
        inLanguage: "en",
        datePublished: guide.datePublished,
        dateModified: guide.dateModified,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        breadcrumb: { "@id": `${url}#breadcrumb` },
        mainEntity: { "@id": `${url}#guide` },
        primaryImageOfPage: { "@type": "ImageObject", url: absoluteUrl(OG_IMAGE.url), width: OG_IMAGE.width, height: OG_IMAGE.height },
      },
      guideDocumentJsonLd(guide),
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Free guides", item: absoluteUrl("/free-guides") },
          { "@type": "ListItem", position: 3, name: guide.title, item: url },
        ],
      },
      ...(faqs.length > 0
        ? [
            {
              "@type": "FAQPage",
              "@id": `${url}#faq`,
              mainEntity: faqs.map(faq => ({
                "@type": "Question",
                name: faq.question,
                acceptedAnswer: { "@type": "Answer", text: faq.answer },
              })),
            },
          ]
        : []),
      ...extra,
    ],
  }
}

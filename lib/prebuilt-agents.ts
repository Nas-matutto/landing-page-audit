/**
 * The pre-built agents anyone can start on sign-up, in the order the app
 * offers them.
 *
 * ⚠️ Mirrors the app (app-TTDM: lib/ready-made.ts → READY_MADE_TYPES, and the
 * cards in components/dashboard/ready-made-agents.tsx). Every one is included
 * on every plan, Starter too. Faces are copied from app-TTDM public/faces.
 */

export type PrebuiltAgentId = "social_manager" | "seo_manager" | "website_manager" | "sdr_agent" | "social_listening"

export interface PrebuiltAgent {
  id: PrebuiltAgentId
  title: string
  /** For tight spots: tabs, the hero's rotating word. */
  short: string
  face: string
  /** Its page on this site, when it has one. */
  href?: string
  /** The outcome, in one line. */
  blurb: string
  features: string[]
}

export const PREBUILT_AGENTS: PrebuiltAgent[] = [
  {
    id: "social_manager",
    title: "Social Media Manager",
    short: "Social Media",
    face: "/faces/social.jpg",
    href: "/agents/social-media",
    blurb: "Grows your social media for you. It learns what works on your accounts, then plans, designs and posts your content.",
    features: [
      "Finds the formats and hooks that get you views",
      "Designs finished posts, ready to publish",
      "Posts to Instagram for you at your best times",
    ],
  },
  {
    id: "seo_manager",
    title: "SEO & GEO Manager",
    short: "SEO & GEO",
    face: "/faces/seo.jpg",
    href: "/agents/seo-geo",
    blurb: "Gets you found on Google and recommended by ChatGPT, Gemini and Claude.",
    features: [
      "Finds the fixes worth the most clicks",
      "Writes the fixes and new pages for you",
      "Tracks whether AI assistants recommend you",
    ],
  },
  {
    id: "website_manager",
    title: "Website Manager",
    short: "Your Website",
    face: "/faces/website.jpg",
    href: "/agents/website-manager",
    blurb: "Keeps your website up to date. Ask for any change in plain English and it's live in minutes.",
    features: [
      "Your live site, on desktop and phone",
      "Changes made in your code, through GitHub or WordPress",
      "One-click undo on every change",
    ],
  },
  {
    id: "sdr_agent",
    title: "SDR AI Agent",
    short: "Sales Outreach",
    face: "/faces/sdr.jpg",
    blurb: "Fills your pipeline. It finds your ideal customers, writes to each one and lines up every follow-up.",
    features: [
      "Finds B2B leads that match your ideal customer",
      "Writes a tailored email sequence for every lead",
      "Sends from your own mailbox on paid plans",
    ],
  },
  {
    id: "social_listening",
    title: "Social Listening",
    short: "Social Listening",
    face: "/faces/listening.jpg",
    blurb: "Turns online conversations into customers. It finds people asking for what you sell and drafts your reply.",
    features: [
      "Reads Reddit, X, Threads, YouTube, LinkedIn, Facebook and Instagram",
      "Skips the self-promotion, vendors and job posts",
      "Drafts a reply and a DM for you to send",
    ],
  },
]

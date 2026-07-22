import type { Metadata } from "next"

const URL = "https://talktomedata.com/blog/how-to-automate-customer-service-with-ai-agent"
const TITLE = "How to Automate Customer Service With an AI Agent (With the Exact Prompt)"
const DESCRIPTION =
  "Learn how to automate customer service with an AI agent that lives in your website chat bubble, answers common questions instantly, logs every request to Google Sheets, ranks them by urgency, and drafts a recommended solution for your team. Includes the exact prompt to copy."
const IMAGE = "https://talktomedata.com/Customer_support_example.png"

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "how to automate customer service with an AI agent",
    "automate customer support",
    "AI customer support agent",
    "customer service automation",
    "AI support chatbot",
    "AI helpdesk agent",
    "support ticket automation",
    "chat bubble AI agent",
    "customer support to Google Sheets",
    "AI agent for customer service",
  ],
  alternates: { canonical: URL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "article",
    url: URL,
    siteName: "Talk to Me Data",
    publishedTime: "2026-07-22",
    images: [{ url: IMAGE, width: 1200, height: 630, alt: "AI customer support agent triaging chat requests into a ranked Google Sheet queue" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description:
      "An AI agent in your chat bubble that answers FAQs, logs every request to Google Sheets, ranks them by urgency, and drafts a recommended solution. Includes the full agent prompt.",
    images: [IMAGE],
  },
}

const faqs = [
  {
    q: "Which channels can the AI customer support agent work in?",
    a: "It starts in the chat bubble on your website, where most requests come in, but the same agent works across email, WhatsApp, Instagram DMs, and helpdesk tools like Zendesk or Intercom. The logic — answer, log, rank, recommend — stays identical; only the channel it listens on changes.",
  },
  {
    q: "How does the agent decide which requests are most important?",
    a: "Every request is scored on a 1–5 priority scale using impact, sentiment, and customer value together. A frustrated paying customer who can't log in is a 5; a general product question is a 1–2. Because every ticket lands in Google Sheets with that score, your team works the queue top-down instead of first-in-first-out.",
  },
  {
    q: "Does it reply to customers automatically, or draft answers for a human?",
    a: "Both, and you choose the line. Common, low-risk questions (order status, store hours, return policy) can be answered instantly and autonomously. For anything sensitive — refunds, account changes, angry customers — the agent captures the details, drafts a recommended resolution, and hands it to a human to approve and send.",
  },
  {
    q: "What does it log to Google Sheets?",
    a: "For each request: a timestamp, the customer's email, the category, a one-line summary, the full message, the detected sentiment, a 1–5 priority score, and a drafted recommended solution. That turns a messy inbox into a clean, ranked, actionable support queue your whole team can see.",
  },
  {
    q: "Will an AI agent replace my support team?",
    a: "No — it removes the repetitive volume so your team spends time where it matters. The agent resolves the easy, repetitive tickets and prepares everything else so a human can approve a great answer in seconds. You keep the human judgment on the hard cases and lose the copy-paste busywork.",
  },
  {
    q: "Can Talk to Me Data build and host this agent for me?",
    a: "Yes. We build, connect, and host the agent on our infrastructure — the chat widget, the model, the Google Sheets (or helpdesk) integration, and the monitoring — so there's nothing to configure or maintain on your side. Book a demo and we'll get you onboarded in days.",
  },
]

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": `${URL}#article`,
      headline: TITLE,
      description: DESCRIPTION,
      image: IMAGE,
      datePublished: "2026-07-22",
      dateModified: "2026-07-22",
      author: { "@type": "Organization", name: "Talk to Me Data", url: "https://talktomedata.com" },
      publisher: {
        "@type": "Organization",
        name: "Talk to Me Data",
        url: "https://talktomedata.com",
        logo: { "@type": "ImageObject", url: "https://talktomedata.com/favicon-96x96.png" },
      },
      mainEntityOfPage: { "@type": "WebPage", "@id": URL },
    },
    {
      "@type": "FAQPage",
      "@id": `${URL}#faq`,
      mainEntity: faqs.map(faq => ({
        "@type": "Question",
        name: faq.q,
        acceptedAnswer: { "@type": "Answer", text: faq.a },
      })),
    },
  ],
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  )
}

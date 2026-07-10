import type { Metadata } from "next"

const URL = "https://talktomedata.com/blog/how-to-automate-invoices-into-accounting-software"
const TITLE = "How to Automate Invoices Into Your Accounting Software (With the Exact Prompt)"
const DESCRIPTION =
  "Learn how to automate invoice entry into QuickBooks and any other accounting software using an AI agent that scans PDF invoices, extracts the vendor, line items, and pricing, and populates them automatically. Includes the exact prompt to copy."

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "automate invoices into accounting software",
    "invoice automation",
    "AI invoice processing",
    "automate invoice data entry",
    "QuickBooks invoice automation",
    "PDF invoice extraction",
    "AI invoice agent",
    "accounts payable automation",
    "OCR invoice to QuickBooks",
    "invoice data extraction AI",
  ],
  alternates: { canonical: URL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "article",
    url: URL,
    siteName: "Talk to Me Data",
    publishedTime: "2026-07-10",
    images: [{ url: "https://talktomedata.com/Invoice_AI_Agent.png", width: 1200, height: 630, alt: "AI agent extracting invoice data into QuickBooks" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description:
      "Scan a PDF invoice, extract vendor, line items, and pricing, and auto-populate QuickBooks or any accounting software. Includes the full agent prompt.",
    images: ["https://talktomedata.com/Invoice_AI_Agent.png"],
  },
}

const faqs = [
  {
    q: "Which accounting software does the invoice agent work with?",
    a: "We use QuickBooks in this guide because it's the most popular choice among small and mid-sized businesses, but the agent is software-agnostic. The same approach works with Xero, Sage, Zoho Books, NetSuite, FreshBooks, and most other accounting or ERP systems — only the final integration step changes.",
  },
  {
    q: "What invoice formats can it read?",
    a: "PDF invoices, scanned documents, and photographs taken on a phone. The agent reads structured and unstructured layouts, so your vendors don't need to send invoices in any particular template.",
  },
  {
    q: "Does it extract line items or just the total?",
    a: "It extracts everything the invoice contains: vendor or customer name, invoice date, due date, and every individual line item with its description, quantity, and unit price — then it recalculates and verifies the total before syncing.",
  },
  {
    q: "How accurate is the data extraction?",
    a: "Modern vision-capable models read typed invoices with very high accuracy. The agent is also instructed to flag anything ambiguous and state the assumptions it made, so a human can review edge cases instead of silent errors slipping through.",
  },
  {
    q: "Can Talk to Me Data build and host this agent for me?",
    a: "Yes. We build, connect, and host the agent on our infrastructure — including the QuickBooks (or other accounting) integration, the model access, and monitoring — so there are no API keys or setup on your side. Book a demo and we'll get you onboarded.",
  },
  {
    q: "Is this different from the OCR built into my accounting tool?",
    a: "Yes. Traditional OCR reads text but doesn't understand it, so it struggles with varied layouts and rarely maps fields correctly on its own. An AI agent reads the invoice, understands which value is the quantity versus the unit price versus the total, matches the vendor, and takes the action of creating the record — end to end.",
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
      image: "https://talktomedata.com/Invoice_AI_Agent.png",
      datePublished: "2026-07-10",
      dateModified: "2026-07-10",
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

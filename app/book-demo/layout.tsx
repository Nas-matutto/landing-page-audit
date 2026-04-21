import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Book a Demo — Talk to me Data",
  description:
    "See TTMD in action. Book a 20-minute demo and we'll show you exactly which companies are using your competitors' tools — and set you up if it's a fit.",
  openGraph: {
    title: "Book a Demo — Talk to me Data",
    description:
      "See signal-based prospecting in action. Book a 20-minute demo with our team.",
    type: "website",
    url: "https://talktomedata.com/book-demo",
    siteName: "Talk to me Data",
  },
  twitter: {
    card: "summary",
    title: "Book a Demo — Talk to me Data",
    description: "See which companies use your competitors' tools. Book a 20-min demo.",
  },
  alternates: {
    canonical: "https://talktomedata.com/book-demo",
  },
}

export default function BookDemoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

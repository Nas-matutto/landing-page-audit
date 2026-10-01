import { OG_IMAGE } from "@/lib/og"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Book a Demo — Talk to me Data",
  description:
    "Book a free 20-minute call with TTMD. Tell us the workflow you want to automate and we'll show you what your AI agent could do and how fast it can go live.",
  openGraph: {
    images: [OG_IMAGE],
    title: "Book a Demo — Talk to me Data",
    description:
      "Book a free 20-minute call. Tell us what you want to automate and we'll show you what your AI agent could do.",
    type: "website",
    url: "https://talktomedata.com/book-demo",
    siteName: "Talk to me Data",
  },
  twitter: {
    images: [OG_IMAGE],
    card: "summary_large_image",
    title: "Book a Demo — Talk to me Data",
    description: "Tell us what you want to automate. Book a free 20-minute call to see what your AI agent could do.",
  },
  alternates: {
    canonical: "https://talktomedata.com/book-demo",
  },
}

export default function BookDemoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

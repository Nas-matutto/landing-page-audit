import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Brand Guidelines Generator — Free Tools | Talk to me Data",
  description:
    "Create a one-page brand guidelines document to feed into your AI agent. Pick fonts, primary and secondary colors, and tone of voice, then download it as a PNG and get it emailed to you.",
  alternates: {
    canonical: "https://talktomedata.com/free-tools/brand-guidelines",
  },
}

export default function BrandGuidelinesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

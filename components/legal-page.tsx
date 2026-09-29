import type React from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

// Shared layout and building blocks for the legal pages (privacy, data deletion, terms).

export const CONTACT_EMAIL = "nas@talktomedata.com"

export const legal = {
  h2: "text-2xl font-bold mb-4",
  h3: "text-xl font-semibold mb-3 mt-6",
  p: "text-muted-foreground leading-relaxed mb-4",
  ul: "list-disc pl-6 space-y-2 text-muted-foreground mb-4",
  ol: "list-decimal pl-6 space-y-2 text-muted-foreground mb-4",
  link: "text-foreground underline underline-offset-4",
}

export function LegalPage({ title, lastUpdated, children }: { title: string; lastUpdated: string; children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-32 sm:pt-40 pb-16 sm:pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-balance mb-6">{title}</h1>
              <p className="text-lg text-muted-foreground">Last updated: {lastUpdated}</p>
            </div>
            <div className="space-y-10">{children}</div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export function Email({ subject }: { subject?: string }) {
  const href = `mailto:${CONTACT_EMAIL}${subject ? `?subject=${encodeURIComponent(subject)}` : ""}`
  return (
    <a href={href} className={legal.link}>
      {CONTACT_EMAIL}
    </a>
  )
}

export function ExternalLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={legal.link}>
      {children}
    </a>
  )
}

export function Table({ head, rows }: { head: string[]; rows: React.ReactNode[][] }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full text-sm text-left">
        <thead className="bg-muted/40">
          <tr>
            {head.map(h => (
              <th key={h} className="px-4 py-3 font-semibold text-foreground align-top">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-t border-border">
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-3 text-muted-foreground align-top leading-relaxed">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AgentDetailContent } from "@/components/sections/agent-detail-content"
import { getAgentBySlug, getBuiltAgentSlugs } from "@/lib/agents"

const BASE_URL = "https://talktomedata.com"

export function generateStaticParams() {
  return getBuiltAgentSlugs().map(slug => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const agent = getAgentBySlug(slug)
  if (!agent?.detail) return {}

  const { detail } = agent
  const url = `${BASE_URL}/agents/${agent.slug}`

  return {
    title: detail.metaTitle,
    description: detail.metaDescription,
    keywords: detail.keywords,
    alternates: { canonical: url },
    openGraph: {
      title: detail.metaTitle,
      description: detail.metaDescription,
      type: "article",
      url,
      siteName: "Talk to Me Data",
      publishedTime: detail.publishedTime,
    },
    twitter: {
      card: "summary_large_image",
      title: detail.metaTitle,
      description: detail.metaDescription,
    },
  }
}

export default async function AgentDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const agent = getAgentBySlug(slug)
  if (!agent?.detail) notFound()

  const { detail } = agent
  const url = `${BASE_URL}/agents/${agent.slug}`

  // GEO/SEO structured data: Service + FAQPage + BreadcrumbList
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: `${agent.title} AI Agent`,
        serviceType: `${agent.title} AI Agent`,
        description: detail.metaDescription,
        url,
        provider: {
          "@type": "Organization",
          name: "Talk to Me Data",
          url: BASE_URL,
        },
        areaServed: "Worldwide",
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: detail.faqs.map(faq => ({
          "@type": "Question",
          name: faq.q,
          acceptedAnswer: { "@type": "Answer", text: faq.a },
        })),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Agents", item: `${BASE_URL}/agents` },
          { "@type": "ListItem", position: 2, name: agent.title, item: url },
        ],
      },
    ],
  }

  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main>
        <AgentDetailContent agent={{ ...agent, detail }} />
      </main>
      <Footer />
    </div>
  )
}

// Only the slugs returned by generateStaticParams should exist.
export const dynamicParams = false

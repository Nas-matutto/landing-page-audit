import { AGENTS } from "@/lib/agents"
import { CATEGORIES, SITE_NAME, absoluteUrl, categoryPath, getPostsByCategory, postPath } from "@/lib/blog"

/**
 * /llms.txt (llmstxt.org): a plain-markdown map of the site for AI answer
 * engines and agents. Built from the blog registry and agent list so it never
 * drifts from what is actually published.
 */
export const dynamic = "force-static"

export function GET() {
  const guides = CATEGORIES.map(category => {
    const lines = getPostsByCategory(category.id).map(
      post => `- [${post.title}](${absoluteUrl(postPath(post.slug))}): ${post.description}`,
    )
    return `### [${category.name}](${absoluteUrl(categoryPath(category.id))})\n\n${lines.join("\n")}`
  }).join("\n\n")

  const agents = AGENTS.map(agent => `- [${/agent$/i.test(agent.title) ? agent.title : `${agent.title} agent`}](${absoluteUrl(`/agents/${agent.slug}`)}): ${agent.tagline}`).join("\n")

  const body = `# ${SITE_NAME}

> ${SITE_NAME} (TTMD) builds, hosts and manages AI agents for small and medium businesses: social media, SEO and GEO, customer support, lead finding, data entry and reporting, and invoice processing. Clients describe the work in plain language; TTMD builds the agent, connects it to their tools and runs it.

## Key pages

- [AI agents](${absoluteUrl("/agents")}): every ready-built agent
- [Pricing](${absoluteUrl("/pricing")})
- [Book a demo](${absoluteUrl("/book-demo")})
- [Blog](${absoluteUrl("/blog")}): guides to building AI agents and automating business workflows

## Agents

${agents}

## Guides

${guides}
`
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } })
}

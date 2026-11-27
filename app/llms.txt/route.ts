import { AGENTS } from "@/lib/agents"
import { CATEGORIES, SITE_NAME, absoluteUrl, categoryPath, getPostsByCategory, postPath } from "@/lib/blog"
import { GUIDES, guidePath } from "@/lib/guides"

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

  const freeGuides = GUIDES.map(guide => `- [${guide.title}](${absoluteUrl(guidePath(guide.slug))}): ${guide.description}`).join("\n")

  const agents = AGENTS.map(agent => `- [${/agent$/i.test(agent.title) ? agent.title : `${agent.title} agent`}](${absoluteUrl(`/agents/${agent.slug}`)}): ${agent.tagline}`).join("\n")

  const body = `# ${SITE_NAME}

> ${SITE_NAME} (TTMD) makes AI agents for small and medium businesses. Its main product is an AI social media agent that creates posts in your brand, schedules them and posts them to Instagram, TikTok and Facebook on autopilot. TTMD also offers SEO and GEO, website, sales and social listening agents, and builds custom agents around any workflow.

## Key pages

- [AI social media agent](${absoluteUrl("/agents/social-media")}): creates, schedules and posts content on autopilot
- [AI agents](${absoluteUrl("/agents")}): every ready-built agent
- [Pricing](${absoluteUrl("/pricing")})
- [Book a demo](${absoluteUrl("/book-demo")})
- [Blog](${absoluteUrl("/blog")}): guides to building AI agents and automating business workflows

## Agents

${agents}

## Guides

${guides}

## [Free guides (PDF)](${absoluteUrl("/free-guides")})

${freeGuides}
`
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } })
}

import { getAuthor } from "@/lib/authors"
import { SITE_NAME, absoluteUrl, getAllPostsSorted, getCategory, postPath } from "@/lib/blog"

export const dynamic = "force-static"

const escape = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")

export function GET() {
  const posts = getAllPostsSorted()
  const lastModified = posts.map(p => p.dateModified).sort().at(-1)!
  const items = posts
    .map(post => {
      const url = absoluteUrl(postPath(post.slug))
      return `    <item>
      <title>${escape(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escape(post.description)}</description>
      <category>${escape(getCategory(post.category).name)}</category>
      <dc:creator>${escape(getAuthor(post.author).name)}</dc:creator>
      <pubDate>${new Date(post.datePublished).toUTCString()}</pubDate>
    </item>`
    })
    .join("\n")

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${escape(SITE_NAME)} Blog</title>
    <link>${absoluteUrl("/blog")}</link>
    <description>Practical guides to building AI agents and automating business workflows.</description>
    <language>en</language>
    <lastBuildDate>${new Date(lastModified).toUTCString()}</lastBuildDate>
    <atom:link href="${absoluteUrl("/blog/rss.xml")}" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } })
}

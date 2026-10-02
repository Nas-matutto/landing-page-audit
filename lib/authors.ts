/**
 * Blog authors. Rendered in post bylines, the author box and author pages, and
 * emitted as schema.org `Person` so search and answer engines can attribute
 * posts to a real person (an E-E-A-T signal).
 */
export type Author = {
  id: string
  name: string
  jobTitle?: string
  bio: string
  /** Square headshot under /public. Falls back to an initial avatar when unset. */
  image?: string
  /** Profile URLs (LinkedIn, X, YouTube…) — become `sameAs` in the Person schema. */
  sameAs: string[]
}

export const AUTHORS: Record<string, Author> = {
  nas: {
    id: "nas",
    name: "Nas",
    bio: "Nas writes Talk to Me Data's guides on building AI agents and automating business workflows, drawing on the agents the team designs, builds and runs for clients every day.",
    image: "/authors/nas.jpg",
    sameAs: ["https://www.linkedin.com/in/nasser-mansurali-659145102/"],
  },
}

export function getAuthor(id: string): Author {
  const author = AUTHORS[id]
  if (!author) throw new Error(`Unknown blog author: ${id}`)
  return author
}

export function authorUrl(id: string) {
  return `/blog/author/${id}`
}

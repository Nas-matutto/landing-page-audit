import { Children, isValidElement, type ReactNode } from "react"

export type TocEntry = { id: string; text: string }

function textOf(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node)
  if (Array.isArray(node)) return node.map(textOf).join("")
  if (isValidElement(node)) return textOf((node.props as { children?: ReactNode }).children)
  return ""
}

/**
 * Collects every <h2 id="…"> in a post body, in document order. Headings
 * without an id (TL;DR boxes, CTA panels) are deliberately left out.
 */
export function collectHeadings(node: ReactNode, out: TocEntry[] = []): TocEntry[] {
  Children.forEach(node, child => {
    if (!isValidElement(child)) return
    const props = child.props as { id?: string; children?: ReactNode }
    if (child.type === "h2" && props.id) {
      out.push({ id: props.id, text: textOf(props.children).trim() })
    } else {
      collectHeadings(props.children, out)
    }
  })
  return out
}

function TocLinks({ entries }: { entries: TocEntry[] }) {
  return (
    <ol className="space-y-2.5 text-sm">
      {entries.map(entry => (
        <li key={entry.id}>
          <a href={`#${entry.id}`} className="block leading-snug text-slate-500 transition-colors hover:text-primary">
            {entry.text}
          </a>
        </li>
      ))}
    </ol>
  )
}

/** Sticky sidebar on desktop. */
export function TableOfContents({ entries }: { entries: TocEntry[] }) {
  if (entries.length < 3) return null
  return (
    <nav aria-label="Table of contents" className="sticky top-32">
      <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-400">On this page</p>
      <TocLinks entries={entries} />
    </nav>
  )
}

/** Collapsible block above the body on mobile and tablet. */
export function MobileTableOfContents({ entries }: { entries: TocEntry[] }) {
  if (entries.length < 3) return null
  return (
    <details className="mb-10 rounded-xl border border-slate-200 bg-slate-50 px-5 py-4 lg:hidden">
      <summary className="cursor-pointer text-sm font-semibold text-slate-700">On this page</summary>
      <nav aria-label="Table of contents" className="mt-4">
        <TocLinks entries={entries} />
      </nav>
    </details>
  )
}

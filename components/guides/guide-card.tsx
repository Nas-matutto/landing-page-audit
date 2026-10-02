import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { guidePath, type Guide } from "@/lib/guides"

/** A free guide on the hub and in "more free guides" lists. */
export function GuideCard({ guide, number, headingLevel = "h3" }: { guide: Guide; number: number; headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel
  return (
    <Link
      href={guidePath(guide.slug)}
      className="group flex h-full flex-col rounded-3xl border border-hairline bg-white p-7 transition-colors hover:border-ink sm:p-8"
    >
      <div className="mb-8 flex items-start justify-between">
        <span className="flex h-11 w-11 items-center justify-center rounded-full border border-hairline text-ink transition-colors group-hover:border-ink group-hover:bg-ink group-hover:text-white">
          <guide.Icon className="h-5 w-5" />
        </span>
        <span className="font-mono text-sm font-medium text-faint">{String(number).padStart(2, "0")}</span>
      </div>
      <p className="eyebrow mb-3">Free {guide.kind.toLowerCase()} · PDF</p>
      <Heading className="mb-2 text-xl font-semibold leading-snug tracking-[-0.01em] text-balance text-ink">{guide.title}</Heading>
      <p className="text-sm leading-relaxed text-quiet">{guide.excerpt}</p>
      <ul className="mt-6 grid grid-cols-3 divide-x divide-hairline rounded-2xl border border-hairline bg-mist py-3">
        {guide.stats.map(stat => (
          <li key={stat.label} className="px-2 text-center">
            <span className="block text-base font-semibold text-ink">{stat.value}</span>
            <span className="mt-0.5 block text-[11px] leading-tight text-quiet">{stat.label}</span>
          </li>
        ))}
      </ul>
      <span className="mt-auto inline-flex items-center gap-1.5 pt-7 text-sm font-semibold text-ink">
        Get the free {guide.kind.toLowerCase()}
        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </span>
    </Link>
  )
}

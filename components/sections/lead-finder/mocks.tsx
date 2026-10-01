import { Check, Copy, Plus, Send } from "lucide-react"
import { SiHubspot } from "react-icons/si"
import { Frame } from "@/components/sections/seo-agent/mocks"
import { cn } from "@/lib/utils"

// Panels in the style of the agent's workspace, filled with sample leads for a
// sample B2B SaaS. Same frame as the SEO and social agent pages.

function Initials({ name, dark }: { name: string; dark?: boolean }) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
  return (
    <span
      className={cn(
        "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold",
        dark ? "bg-ink text-white" : "border border-hairline bg-mist text-ink",
      )}
    >
      {initials}
    </span>
  )
}

const LEADS = [
  { name: "Ava Thompson", role: "VP Sales", company: "Northwind", fit: 94, signal: "Hiring 3 SDRs" },
  { name: "Marcus Lee", role: "Head of RevOps", company: "Brightloop", fit: 91, signal: "Raised Series A" },
  { name: "Priya Nair", role: "Director of Growth", company: "Cloudcart", fit: 89, signal: "New in role" },
  { name: "Tom Becker", role: "Head of Sales", company: "Ledgerly", fit: 86, signal: "Switched CRM" },
]

/** Hero: today's leads, scored and ready. `stage` adds a footer for the ambassador and job chips to stand in. */
export function LeadsPanel({ rows = LEADS.length, stage = false }: { rows?: number; stage?: boolean }) {
  return (
    <Frame title="Today's leads" meta="48 new · synced to HubSpot">
      <div className="grid grid-cols-3 gap-px border-b border-hairline bg-hairline">
        {[
          { v: "48", l: "New leads" },
          { v: "112", l: "Contacts enriched" },
          { v: "6", l: "Duplicates skipped" },
        ].map((s) => (
          <div key={s.l} className="bg-white px-4 py-3">
            <p className="text-xl font-bold tracking-tight">{s.v}</p>
            <p className="text-[11px] text-quiet">{s.l}</p>
          </div>
        ))}
      </div>
      <ul className="divide-y divide-hairline">
        {LEADS.slice(0, rows).map((lead, i) => (
          <li key={lead.name} className="flex items-center gap-3 px-4 py-3 sm:px-5">
            <Initials name={lead.name} dark={i === 0} />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">{lead.name}</p>
              <p className="truncate text-[12px] text-quiet">
                {lead.role} · {lead.company}
              </p>
            </div>
            <span className="hidden shrink-0 rounded-full border border-hairline px-2.5 py-1 text-[11px] text-quiet sm:inline">{lead.signal}</span>
            <span className="shrink-0 rounded-full bg-ink px-2 py-0.5 text-[11px] font-semibold tabular-nums text-white">{lead.fit}</span>
          </li>
        ))}
      </ul>
      {stage && (
        <div className="h-44 border-t border-hairline bg-mist/60 sm:h-48">
          <p className="px-4 pt-3 text-right text-[11px] text-quiet sm:px-5">Runs again tomorrow at 8:00</p>
        </div>
      )}
    </Frame>
  )
}

/** Step 1: who you sell to. */
export function IcpPanel() {
  const rows = [
    { k: "Industry", v: ["B2B SaaS", "Fintech"] },
    { k: "Company size", v: ["50–500 people"] },
    { k: "Roles", v: ["VP Sales", "Head of RevOps"] },
    { k: "Where", v: ["US", "UK"] },
    { k: "Signals", v: ["Hiring SDRs", "Recently funded"] },
  ]
  return (
    <Frame title="Your ideal customer" meta="Edit any time">
      <dl className="space-y-3 p-4 sm:p-5">
        {rows.map((r) => (
          <div key={r.k} className="flex flex-wrap items-center gap-2">
            <dt className="w-28 shrink-0 text-[12px] text-quiet">{r.k}</dt>
            <dd className="flex flex-wrap gap-1.5">
              {r.v.map((v) => (
                <span key={v} className="rounded-full border border-hairline bg-mist px-2.5 py-1 text-[12px] font-medium">
                  {v}
                </span>
              ))}
            </dd>
          </div>
        ))}
      </dl>
    </Frame>
  )
}

/** Step 2: matches it found and enriched. */
export function MatchesPanel() {
  return (
    <Frame title="Matches found" meta="Searched this morning">
      <ul className="divide-y divide-hairline">
        {LEADS.slice(0, 3).map((lead) => (
          <li key={lead.company} className="px-4 py-3 sm:px-5">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-semibold">{lead.company}</p>
              <span className="text-[11px] font-semibold tabular-nums">{lead.fit}% fit</span>
            </div>
            <p className="mt-0.5 text-[12px] text-quiet">
              {lead.name}, {lead.role}
            </p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {["Verified email", "LinkedIn", lead.signal].map((t) => (
                <span key={t} className="inline-flex items-center gap-1 rounded-full border border-hairline px-2 py-0.5 text-[11px] text-quiet">
                  <Check className="h-3 w-3 text-ink" />
                  {t}
                </span>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </Frame>
  )
}

/** Step 3: delivered to the CRM. */
export function CrmPanel() {
  const rows = [
    { Icon: Plus, text: "Created 42 contacts", note: "with company and role" },
    { Icon: Copy, text: "Skipped 6 duplicates", note: "already in your CRM" },
    { Icon: Send, text: "Added 42 to “Q4 outbound”", note: "ready for your sequence" },
  ]
  return (
    <Frame title="Delivered to HubSpot" meta="Today, 8:02">
      <div className="flex items-center gap-2 border-b border-hairline px-4 py-3 sm:px-5">
        <SiHubspot className="h-4 w-4" aria-hidden />
        <p className="text-[13px] font-medium">Sync complete</p>
        <Check className="ml-auto h-4 w-4" />
      </div>
      <ul className="space-y-3 p-4 sm:p-5">
        {rows.map(({ Icon, text, note }) => (
          <li key={text} className="flex items-center gap-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-hairline bg-mist">
              <Icon className="h-3.5 w-3.5" />
            </span>
            <div>
              <p className="text-sm font-semibold">{text}</p>
              <p className="text-[12px] text-quiet">{note}</p>
            </div>
          </li>
        ))}
      </ul>
    </Frame>
  )
}

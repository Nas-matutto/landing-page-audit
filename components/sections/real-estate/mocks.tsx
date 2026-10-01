import { Download, MapPin } from "lucide-react"
import { Frame } from "@/components/sections/seo-agent/mocks"
import { cn } from "@/lib/utils"

// Panels in the style of the agent's workspace, filled with SAMPLE data:
// made-up addresses and initials, never real owners. The real agent reads
// Cook County Assessor and City of Chicago public records.

const SELLERS = [
  { address: "1 Sample Elm Ave", owner: "M. Alvarez", years: 31, value: "$612k", signals: ["Out-of-state owner"] },
  { address: "2 Sample Grove St", owner: "R. & L. Chen", years: 24, value: "$548k", signals: ["Assessment jump"] },
  { address: "3 Sample Maple Ct", owner: "D. Okafor", years: 19, value: "$735k", signals: ["Renovation permit"] },
  { address: "4 Sample Linden Ave", owner: "S. Novak", years: 17, value: "$489k", signals: ["Absentee owner"] },
]

/** Hero: likely sellers, strongest signals first. `stage` adds a footer for the ambassador and job chips. */
export function SellersPanel({ rows = SELLERS.length, stage = false }: { rows?: number; stage?: boolean }) {
  return (
    <Frame title="Likely sellers · Oak Park" meta="20 found · owned 15+ years">
      <div className="hidden grid-cols-[1fr_auto_auto] gap-4 border-b border-hairline px-5 py-2 text-[11px] font-medium uppercase tracking-wide text-quiet sm:grid">
        <span>Property</span>
        <span className="w-16 text-right">Owned</span>
        <span className="w-16 text-right">Est. value</span>
      </div>
      <ul className="divide-y divide-hairline">
        {SELLERS.slice(0, rows).map((s, i) => (
          <li key={s.address} className="grid grid-cols-[1fr_auto] items-center gap-4 px-4 py-3 sm:grid-cols-[1fr_auto_auto] sm:px-5">
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">{s.address}</p>
              <p className="mt-0.5 flex flex-wrap items-center gap-1.5 text-[12px] text-quiet">
                <span>{s.owner}</span>
                {s.signals.map((sig) => (
                  <span key={sig} className={cn("rounded-full px-2 py-0.5 text-[11px]", i === 0 ? "bg-ink text-white" : "border border-hairline")}>
                    {sig}
                  </span>
                ))}
              </p>
            </div>
            <span className="w-16 text-right text-sm font-semibold tabular-nums">{s.years} yrs</span>
            <span className="hidden w-16 text-right text-sm tabular-nums text-quiet sm:block">{s.value}</span>
          </li>
        ))}
      </ul>
      {stage && (
        <div className="h-44 border-t border-hairline bg-mist/60 sm:h-48">
          <p className="px-4 pt-3 text-right text-[11px] text-quiet sm:px-5">Owner names and mailing addresses included</p>
        </div>
      )}
    </Frame>
  )
}

/** Step 1: ask in plain English. */
export function AskPanel() {
  return (
    <Frame title="Your agent" meta="Chat">
      <div className="space-y-3 p-4 sm:p-5">
        <div className="ml-auto max-w-[85%] rounded-2xl rounded-br-sm bg-ink px-4 py-3 text-[13px] leading-snug text-white">
          Find me 20 houses in Oak Park owned for over 15 years, out-of-state owners first
        </div>
        <div className="max-w-[90%] rounded-2xl rounded-bl-sm border border-hairline bg-mist px-4 py-3 text-[13px] leading-snug">
          Searching Oak Park for single-family homes:
          <div className="mt-2 flex flex-wrap gap-1.5">
            {["Owned 15+ years", "House", "Out-of-state owner"].map((f) => (
              <span key={f} className="rounded-full border border-hairline bg-white px-2 py-0.5 text-[11px] font-medium">
                {f}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Frame>
  )
}

/** Step 2: comps from recorded sales. */
export function CompsPanel() {
  const comps = [
    { address: "5 Sample Elm Ave", when: "Jul", price: "$655k" },
    { address: "6 Sample Oak St", when: "Jun", price: "$598k" },
    { address: "7 Sample Euclid Ave", when: "May", price: "$702k" },
  ]
  return (
    <Frame title="Comps · 3 bed, last 6 months" meta="Recorded sales">
      <ul className="divide-y divide-hairline">
        {comps.map((c) => (
          <li key={c.address} className="flex items-center gap-3 px-4 py-3 sm:px-5">
            <MapPin className="h-4 w-4 shrink-0 text-quiet" />
            <p className="min-w-0 flex-1 truncate text-sm font-semibold">{c.address}</p>
            <span className="text-[12px] text-quiet">{c.when}</span>
            <span className="w-14 text-right text-sm font-semibold tabular-nums">{c.price}</span>
          </li>
        ))}
      </ul>
      <p className="border-t border-hairline px-4 py-2.5 text-[11px] text-quiet sm:px-5">Median $655k · from recorded deeds</p>
    </Frame>
  )
}

/** Step 3: a mailing list ready to export. */
export function MailingPanel() {
  const rows = [
    { owner: "A. Brooks", mail: "8 Sample Park Ave" },
    { owner: "T. & K. Ryan", mail: "9 Sample Park Ave" },
    { owner: "J. Ferraro", mail: "PO Box 10, Naples FL" },
  ]
  return (
    <Frame title="Just-sold postcard list" meta="50 nearest homes">
      <ul className="divide-y divide-hairline">
        {rows.map((r) => (
          <li key={r.owner} className="flex items-center justify-between gap-3 px-4 py-3 sm:px-5">
            <p className="shrink-0 text-sm font-semibold">{r.owner}</p>
            <p className="min-w-0 truncate text-[12px] text-quiet">{r.mail}</p>
          </li>
        ))}
      </ul>
      <div className="flex items-center gap-2 border-t border-hairline px-4 py-3 sm:px-5">
        <Download className="h-4 w-4" />
        <p className="text-[13px] font-medium">Download CSV for your mail house</p>
      </div>
    </Frame>
  )
}

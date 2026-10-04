import { Check, Copy, Flag, Mail, Repeat } from "lucide-react"
import { SiGoogleanalytics, SiGoogledrive, SiGooglesheets, SiHubspot, SiShopify, SiStripe } from "react-icons/si"
import { FaSlack } from "react-icons/fa"
import { Frame } from "@/components/sections/seo-agent/mocks"
import { cn } from "@/lib/utils"

// Panels in the style of the agent's workspace, filled with sample numbers for
// a sample online store. Same frame as the SEO, social and lead finder pages.

function Delta({ value, down }: { value: string; down?: boolean }) {
  return <span className={cn("text-[11px] font-semibold", down ? "text-rose-600" : "text-emerald-600")}>{value}</span>
}

const KPIS = [
  { v: "$48,230", l: "Revenue", d: "+12%" },
  { v: "312", l: "New customers", d: "+8%" },
  { v: "3.4%", l: "Conversion", d: "+0.3pt" },
]

const LINES = [
  { Icon: SiShopify, source: "Shopify", line: "1,284 orders, average $37.56", status: "Up 9%" },
  { Icon: SiHubspot, source: "HubSpot", line: "86 new deals, 21 won", status: "Up 14%" },
  { Icon: SiGoogleanalytics, source: "GA4", line: "41,920 sessions, 62% mobile", status: "Up 6%" },
  { Icon: SiStripe, source: "Stripe", line: "4 failed payments to chase", status: "Flagged", flag: true },
]

/** Hero: this week's report, compiled from every tool. `stage` adds a footer for the ambassador and job chips to stand in. */
export function ReportPanel({ rows = LINES.length, stage = false }: { rows?: number; stage?: boolean }) {
  return (
    <Frame title="Weekly report" meta="Week 40 · sent to Slack">
      <div className="grid grid-cols-3 gap-px border-b border-hairline bg-hairline">
        {KPIS.map((k) => (
          <div key={k.l} className="bg-white px-4 py-3">
            <p className="text-xl font-bold tracking-tight">{k.v}</p>
            <p className="text-[11px] text-quiet">
              {k.l} <Delta value={k.d} />
            </p>
          </div>
        ))}
      </div>
      <ul className="divide-y divide-hairline">
        {LINES.slice(0, rows).map(({ Icon, source, line, status, flag }) => (
          <li key={source} className="flex items-center gap-3 px-4 py-3 sm:px-5">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-hairline bg-mist">
              <Icon className="h-3.5 w-3.5" aria-hidden />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">{source}</p>
              <p className="truncate text-[12px] text-quiet">{line}</p>
            </div>
            <span
              className={cn(
                "shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-semibold",
                flag ? "bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-200" : "bg-ink text-white",
              )}
            >
              {status}
            </span>
          </li>
        ))}
      </ul>
      {stage && (
        <div className="h-44 border-t border-hairline bg-mist/60 sm:h-48">
          <p className="px-4 pt-3 text-right text-[11px] text-quiet sm:px-5">Next report Monday at 8:00</p>
        </div>
      )}
    </Frame>
  )
}

/** Step 1: the tools it pulls from. */
export function SourcesPanel() {
  const rows = [
    { Icon: SiShopify, name: "Shopify", what: "Orders, products, refunds" },
    { Icon: SiHubspot, name: "HubSpot", what: "Deals, contacts, pipeline" },
    { Icon: SiGoogleanalytics, name: "GA4", what: "Sessions, sources, conversions" },
    { Icon: SiGooglesheets, name: "Google Sheets", what: "Targets and budgets" },
  ]
  return (
    <Frame title="Connected tools" meta="Pulls daily at 6:00">
      <ul className="divide-y divide-hairline">
        {rows.map(({ Icon, name, what }) => (
          <li key={name} className="flex items-center gap-3 px-4 py-3 sm:px-5">
            <Icon className="h-4 w-4 shrink-0" aria-hidden />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">{name}</p>
              <p className="truncate text-[12px] text-quiet">{what}</p>
            </div>
            <Check className="h-4 w-4 shrink-0" />
          </li>
        ))}
      </ul>
    </Frame>
  )
}

/** Step 2: cleaning and checking the data. */
export function CleanPanel() {
  const rows = [
    { Icon: Copy, text: "Removed 318 duplicates", note: "same order in two tools" },
    { Icon: Repeat, text: "Matched formats", note: "dates, currencies and names" },
    { Icon: Flag, text: "Flagged 41 rows", note: "missing totals, sent for review" },
  ]
  return (
    <Frame title="Cleaning" meta="12,480 rows">
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

/** Step 3: delivered where the team works. */
export function DeliverPanel() {
  const rows = [
    { Icon: FaSlack, text: "Posted to #weekly-numbers", note: "summary and charts" },
    { Icon: Mail, text: "Emailed to 4 people", note: "PDF, 6 pages" },
    { Icon: SiGoogledrive, text: "Saved to Google Drive", note: "Reports / 2026 / Week 40" },
  ]
  return (
    <Frame title="Report delivered" meta="Monday, 8:00">
      <div className="flex items-center gap-2 border-b border-hairline px-4 py-3 sm:px-5">
        <p className="text-[13px] font-medium">Week 40 report sent</p>
        <Check className="ml-auto h-4 w-4" />
      </div>
      <ul className="space-y-3 p-4 sm:p-5">
        {rows.map(({ Icon, text, note }) => (
          <li key={text} className="flex items-center gap-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-hairline bg-mist">
              <Icon className="h-3.5 w-3.5" aria-hidden />
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

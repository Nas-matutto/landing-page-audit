import { Check, Search, Sparkles, TrendingUp } from "lucide-react"
import { SiHubspot } from "react-icons/si"

// ── Pure-CSS product mockups for the Lead Finder agent page ──────────────────
// No images — these are illustrative UI panels built to look like the real
// product output. Server components (no client JS). Light theme, emerald +
// primary accents to match the lead-finder gradient.

const INITIAL_COLORS = [
  "bg-emerald-100 text-emerald-700",
  "bg-blue-100 text-blue-700",
  "bg-violet-100 text-violet-700",
  "bg-amber-100 text-amber-700",
]

function Initials({ name, i }: { name: string; i: number }) {
  const initials = name.split(" ").map(w => w[0]).slice(0, 2).join("")
  return (
    <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${INITIAL_COLORS[i % INITIAL_COLORS.length]}`}>
      {initials}
    </span>
  )
}

function PanelFrame({ children, browser = false }: { children: React.ReactNode; browser?: boolean }) {
  return (
    <div className="w-full rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-200/60 overflow-hidden">
      {browser && (
        <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50/80 px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
          <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
          <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
          <span className="ml-3 flex-1 truncate rounded-md bg-white border border-slate-200 px-3 py-1 text-[11px] text-slate-400">
            app.talktomedata.com/leads
          </span>
        </div>
      )}
      {children}
    </div>
  )
}

function StatusChip({ label, tone }: { label: string; tone: "synced" | "enriched" | "verified" }) {
  const styles = {
    synced: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
    enriched: "bg-blue-50 text-blue-700 ring-blue-600/20",
    verified: "bg-violet-50 text-violet-700 ring-violet-600/20",
  }[tone]
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold ring-1 ring-inset ${styles}`}>
      <Check className="h-2.5 w-2.5" />
      {label}
    </span>
  )
}

const LEADS = [
  { name: "Ava Thompson", role: "VP Sales", company: "Northwind SaaS", score: 94, status: "Synced", tone: "synced" as const },
  { name: "Marcus Lee", role: "Head of RevOps", company: "Brightloop", score: 91, status: "Enriched", tone: "enriched" as const },
  { name: "Priya Nair", role: "Director of Growth", company: "Cloudcart", score: 89, status: "Verified", tone: "verified" as const },
  { name: "Tom Alvarez", role: "Sales Lead", company: "Finlark", score: 87, status: "Synced", tone: "synced" as const },
]

// ── Hero: "leads delivered today" dashboard ──────────────────────────────────
export function LeadsDashboardMock() {
  return (
    <PanelFrame browser>
      <div className="p-5 sm:p-6">
        {/* Header */}
        <div className="mb-5 flex items-center justify-between">
          <div>
            <p className="text-sm font-bold text-slate-800">New leads today</p>
            <p className="text-xs text-slate-400">Matched 128 · Enriched 128 · Synced to CRM</p>
          </div>
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-inset ring-emerald-600/20">
            <TrendingUp className="h-3.5 w-3.5" />
            +37 today
          </span>
        </div>

        {/* Column header */}
        <div className="hidden sm:grid grid-cols-[1.6fr_1fr_0.9fr_auto] gap-3 border-b border-slate-100 pb-2 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
          <span>Contact</span>
          <span>Company</span>
          <span>Match</span>
          <span className="text-right">Status</span>
        </div>

        {/* Rows */}
        <div className="divide-y divide-slate-100">
          {LEADS.map((l, i) => (
            <div key={l.name} className="grid grid-cols-[1fr_auto] sm:grid-cols-[1.6fr_1fr_0.9fr_auto] items-center gap-3 py-3">
              <div className="flex items-center gap-3 min-w-0">
                <Initials name={l.name} i={i} />
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-slate-800">{l.name}</p>
                  <p className="truncate text-xs text-slate-400">{l.role}</p>
                </div>
              </div>
              <p className="hidden sm:block truncate text-sm text-slate-600">{l.company}</p>
              <div className="hidden sm:flex items-center gap-2">
                <div className="h-1.5 w-12 overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full rounded-full bg-linear-to-r from-emerald-500 to-emerald-400" style={{ width: `${l.score}%` }} />
                </div>
                <span className="text-xs font-semibold text-slate-500">{l.score}%</span>
              </div>
              <div className="justify-self-end">
                <StatusChip label={l.status} tone={l.tone} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </PanelFrame>
  )
}

// ── Step 1: ICP configuration panel ──────────────────────────────────────────
const ICP_ROWS = [
  { label: "Industry", tags: ["B2B SaaS", "Fintech"] },
  { label: "Company size", tags: ["50–500 employees"] },
  { label: "Roles", tags: ["Head of Sales", "RevOps"] },
  { label: "Region", tags: ["US", "UK", "EU"] },
  { label: "Intent signals", tags: ["Hiring SDRs", "Uses HubSpot"] },
]

export function IcpConfigMock() {
  return (
    <PanelFrame>
      <div className="p-5 sm:p-6">
        <div className="mb-4 flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Sparkles className="h-3.5 w-3.5" />
          </span>
          <p className="text-sm font-bold text-slate-800">Ideal customer profile</p>
        </div>
        <div className="space-y-3">
          {ICP_ROWS.map(row => (
            <div key={row.label} className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:gap-3">
              <span className="w-28 shrink-0 text-xs font-medium text-slate-400">{row.label}</span>
              <div className="flex flex-wrap gap-1.5">
                {row.tags.map(tag => (
                  <span key={tag} className="rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-xs font-medium text-slate-600">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </PanelFrame>
  )
}

// ── Step 2: matches found list ───────────────────────────────────────────────
const MATCHES = [
  { company: "Northwind SaaS", industry: "B2B SaaS · 240 staff", score: 94 },
  { company: "Brightloop", industry: "Fintech · 120 staff", score: 91 },
  { company: "Cloudcart", industry: "eCommerce · 340 staff", score: 89 },
]

export function MatchesListMock() {
  return (
    <PanelFrame>
      <div className="p-5 sm:p-6">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Search className="h-3.5 w-3.5" />
            </span>
            <p className="text-sm font-bold text-slate-800">Matches found today</p>
          </div>
          <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-500">42</span>
        </div>
        <div className="space-y-2.5">
          {MATCHES.map((m, i) => (
            <div key={m.company} className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50/60 p-3">
              <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-xs font-bold ${INITIAL_COLORS[i % INITIAL_COLORS.length]}`}>
                {m.company[0]}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-slate-800">{m.company}</p>
                <p className="truncate text-xs text-slate-400">{m.industry}</p>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-bold text-emerald-700 ring-1 ring-inset ring-emerald-600/20">
                {m.score}% match
              </span>
            </div>
          ))}
        </div>
      </div>
    </PanelFrame>
  )
}

// ── Step 3: delivered to CRM ─────────────────────────────────────────────────
const SYNCED = [
  { name: "Ava Thompson", company: "Northwind SaaS" },
  { name: "Marcus Lee", company: "Brightloop" },
  { name: "Priya Nair", company: "Cloudcart" },
]

export function CrmSyncMock() {
  return (
    <PanelFrame>
      <div className="p-5 sm:p-6">
        <div className="mb-4 flex items-center gap-2">
          <SiHubspot className="h-5 w-5" style={{ color: "#FF7A59" }} />
          <p className="text-sm font-bold text-slate-800">Synced to HubSpot</p>
          <span className="ml-auto text-xs text-slate-400">3 duplicates skipped</span>
        </div>
        <div className="divide-y divide-slate-100">
          {SYNCED.map((s, i) => (
            <div key={s.name} className="flex items-center gap-3 py-2.5">
              <Initials name={s.name} i={i} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-slate-800">{s.name}</p>
                <p className="truncate text-xs text-slate-400">{s.company}</p>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 ring-1 ring-inset ring-emerald-600/20">
                <Check className="h-2.5 w-2.5" />
                Added
              </span>
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-between rounded-xl bg-emerald-50/70 px-4 py-3 ring-1 ring-inset ring-emerald-600/10">
          <span className="text-xs font-medium text-emerald-800">New contacts this week</span>
          <span className="text-lg font-bold text-emerald-700">128</span>
        </div>
      </div>
    </PanelFrame>
  )
}

import { Check } from "lucide-react"

// ── Reusable, data-driven product mockups for agent pages ────────────────────
// Pure CSS/Tailwind, server components. Feed each agent its own data. Built to
// match the lead-finder mockups' look so every agent page reads consistently.

type Tone = "green" | "blue" | "violet" | "amber" | "slate"

const TONE: Record<Tone, string> = {
  green: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  blue: "bg-blue-50 text-blue-700 ring-blue-600/20",
  violet: "bg-violet-50 text-violet-700 ring-violet-600/20",
  amber: "bg-amber-50 text-amber-700 ring-amber-600/20",
  slate: "bg-slate-100 text-slate-600 ring-slate-500/20",
}

const INITIAL_COLORS = [
  "bg-emerald-100 text-emerald-700",
  "bg-blue-100 text-blue-700",
  "bg-violet-100 text-violet-700",
  "bg-amber-100 text-amber-700",
]

function initials(name: string) {
  return name.split(" ").map(w => w[0]).slice(0, 2).join("")
}

function Badge({ label, tone = "green", check }: { label: string; tone?: Tone; check?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold ring-1 ring-inset ${TONE[tone]}`}>
      {check && <Check className="h-2.5 w-2.5" />}
      {label}
    </span>
  )
}

function PanelFrame({ children, browser }: { children: React.ReactNode; browser?: string }) {
  return (
    <div className="w-full rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-200/60 overflow-hidden">
      {browser && (
        <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50/80 px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
          <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
          <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
          <span className="ml-3 flex-1 truncate rounded-md border border-slate-200 bg-white px-3 py-1 text-[11px] text-slate-400">
            {browser}
          </span>
        </div>
      )}
      {children}
    </div>
  )
}

// ── Hero dashboard ───────────────────────────────────────────────────────────
export type DashRow = { name: string; sub?: string; meta?: string; score?: number; status?: string; tone?: Tone }

export function DashboardMock({
  browser = "app.talktomedata.com",
  title,
  subtitle,
  badge,
  rows,
}: {
  browser?: string
  title: string
  subtitle: string
  badge?: { label: string; tone?: Tone }
  rows: DashRow[]
}) {
  const showScore = rows.some(r => r.score != null)
  const showMeta = rows.some(r => r.meta)
  return (
    <PanelFrame browser={browser}>
      <div className="p-5 sm:p-6">
        <div className="mb-5 flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="text-sm font-bold text-slate-800">{title}</p>
            <p className="truncate text-xs text-slate-400">{subtitle}</p>
          </div>
          {badge && <Badge label={badge.label} tone={badge.tone ?? "green"} check />}
        </div>
        <div className="divide-y divide-slate-100">
          {rows.map((r, i) => (
            <div key={i} className="flex items-center gap-3 py-3">
              <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${INITIAL_COLORS[i % 4]}`}>
                {initials(r.name)}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-slate-800">{r.name}</p>
                {r.sub && <p className="truncate text-xs text-slate-400">{r.sub}</p>}
              </div>
              {showMeta && <p className="hidden sm:block w-28 truncate text-xs text-slate-500">{r.meta}</p>}
              {showScore && (
                <div className="hidden sm:flex items-center gap-2">
                  <div className="h-1.5 w-12 overflow-hidden rounded-full bg-slate-100">
                    <div className="h-full rounded-full bg-linear-to-r from-primary to-violet-500" style={{ width: `${r.score ?? 0}%` }} />
                  </div>
                  <span className="w-8 text-right text-xs font-semibold text-slate-500">{r.score}%</span>
                </div>
              )}
              {r.status && (
                <div className="shrink-0">
                  <Badge label={r.status} tone={r.tone ?? "green"} check />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </PanelFrame>
  )
}

// ── Config / criteria panel ──────────────────────────────────────────────────
export function ConfigMock({
  title,
  Icon,
  rows,
}: {
  title: string
  Icon: React.ComponentType<{ className?: string }>
  rows: { label: string; tags: string[] }[]
}) {
  return (
    <PanelFrame>
      <div className="p-5 sm:p-6">
        <div className="mb-4 flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Icon className="h-3.5 w-3.5" />
          </span>
          <p className="text-sm font-bold text-slate-800">{title}</p>
        </div>
        <div className="space-y-3">
          {rows.map(row => (
            <div key={row.label} className="flex flex-col gap-1.5 sm:flex-row sm:items-start sm:gap-3">
              <span className="w-28 shrink-0 pt-1 text-xs font-medium text-slate-400">{row.label}</span>
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

// ── List panel ───────────────────────────────────────────────────────────────
export function ListMock({
  title,
  Icon,
  count,
  items,
}: {
  title: string
  Icon: React.ComponentType<{ className?: string }>
  count?: string
  items: { title: string; sub?: string; badge?: string; badgeTone?: Tone }[]
}) {
  return (
    <PanelFrame>
      <div className="p-5 sm:p-6">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Icon className="h-3.5 w-3.5" />
            </span>
            <p className="text-sm font-bold text-slate-800">{title}</p>
          </div>
          {count && <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-500">{count}</span>}
        </div>
        <div className="space-y-2.5">
          {items.map((it, i) => (
            <div key={i} className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50/60 p-3">
              <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-xs font-bold ${INITIAL_COLORS[i % 4]}`}>
                {initials(it.title)}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-slate-800">{it.title}</p>
                {it.sub && <p className="truncate text-xs text-slate-400">{it.sub}</p>}
              </div>
              {it.badge && <Badge label={it.badge} tone={it.badgeTone ?? "green"} />}
            </div>
          ))}
        </div>
      </div>
    </PanelFrame>
  )
}

// ── Chat / conversation panel ────────────────────────────────────────────────
export function ChatMock({
  title,
  messages,
  footer,
}: {
  title: string
  messages: { from: "them" | "agent"; text: string }[]
  footer?: string
}) {
  return (
    <PanelFrame>
      <div className="p-5 sm:p-6">
        <p className="mb-4 text-sm font-bold text-slate-800">{title}</p>
        <div className="space-y-2.5">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.from === "agent" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[80%] rounded-2xl px-3.5 py-2 text-sm leading-snug ${
                  m.from === "agent"
                    ? "bg-linear-to-r from-primary to-violet-500 text-white rounded-br-sm"
                    : "bg-slate-100 text-slate-700 rounded-bl-sm"
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}
        </div>
        {footer && (
          <div className="mt-4 flex items-center gap-1.5 border-t border-slate-100 pt-3 text-xs font-medium text-emerald-600">
            <Check className="h-3.5 w-3.5" />
            {footer}
          </div>
        )}
      </div>
    </PanelFrame>
  )
}

// ── Sync / delivered panel ───────────────────────────────────────────────────
export function SyncMock({
  ToolIcon,
  toolColor,
  toolLabel,
  note,
  rows,
  footerLabel,
  footerValue,
}: {
  ToolIcon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>
  toolColor: string
  toolLabel: string
  note?: string
  rows: { name: string; sub?: string }[]
  footerLabel: string
  footerValue: string
}) {
  return (
    <PanelFrame>
      <div className="p-5 sm:p-6">
        <div className="mb-4 flex items-center gap-2">
          <ToolIcon className="h-5 w-5" style={{ color: toolColor }} />
          <p className="text-sm font-bold text-slate-800">{toolLabel}</p>
          {note && <span className="ml-auto text-xs text-slate-400">{note}</span>}
        </div>
        <div className="divide-y divide-slate-100">
          {rows.map((r, i) => (
            <div key={i} className="flex items-center gap-3 py-2.5">
              <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${INITIAL_COLORS[i % 4]}`}>
                {initials(r.name)}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-slate-800">{r.name}</p>
                {r.sub && <p className="truncate text-xs text-slate-400">{r.sub}</p>}
              </div>
              <Badge label="Added" tone="green" check />
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-between rounded-xl bg-emerald-50/70 px-4 py-3 ring-1 ring-inset ring-emerald-600/10">
          <span className="text-xs font-medium text-emerald-800">{footerLabel}</span>
          <span className="text-lg font-bold text-emerald-700">{footerValue}</span>
        </div>
      </div>
    </PanelFrame>
  )
}

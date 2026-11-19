"use client"

import { useId, useRef, useState } from "react"
import { ArrowRight, CheckCircle2, Plus, X } from "lucide-react"
import { APP_REDEEM_URL } from "@/lib/links"
import { APPSUMO_MAX_CODES, appsumoTier, type AppsumoTier } from "@/lib/appsumo/tiers"

const inputCls =
  "w-full min-w-0 rounded-2xl border border-hairline bg-white px-4 py-3.5 font-mono text-base uppercase tracking-[0.08em] text-ink placeholder:normal-case placeholder:tracking-normal placeholder:text-faint transition focus:border-ink focus:outline-none focus:ring-4 focus:ring-ink/5"

const btnCls =
  "inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full px-5 py-3.5 text-[15px] font-semibold tracking-[0.2px] transition-opacity hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-50"

/** Same as /api/redeem. */
const norm = (raw: string) => raw.toUpperCase().replace(/[‐-―−]/g, "-").replace(/\s+/g, "")

/**
 * AppSumo code entry. Codes stack (up to APPSUMO_MAX_CODES per account), so
 * the buyer adds them one at a time: each is checked by /api/redeem as it's
 * added (Enter adds, it never submits), and nothing happens until they click
 * Continue. Then we hand them to the app (APP_REDEEM_URL?code=A,B), which
 * claims the codes for their account and applies the deal. Whether a code is
 * already used is only known there.
 */
export function RedeemForm({ tiers }: { tiers: AppsumoTier[] }) {
  const id = useId()
  const inputRef = useRef<HTMLInputElement>(null)
  const [added, setAdded] = useState<string[]>([])
  const [draft, setDraft] = useState("")
  const [draftError, setDraftError] = useState("")
  const [status, setStatus] = useState<"idle" | "checking" | "leaving">("idle")

  const full = added.length >= APPSUMO_MAX_CODES
  const tier = appsumoTier(added.length, tiers)

  /** Checks the typed code and adds it to the list. Returns the list it made, or null if the code was refused. */
  async function addDraft(): Promise<string[] | null> {
    const code = norm(draft)
    if (!code) return added
    if (added.includes(code)) {
      setDraftError("You've already added that code.")
      return null
    }
    if (full) {
      setDraftError(`One account can stack up to ${APPSUMO_MAX_CODES} codes. Keep the rest for another account.`)
      return null
    }

    setStatus("checking")
    setDraftError("")
    try {
      const res = await fetch("/api/redeem", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ codes: [code] }),
      })
      const data = await res.json()
      if (!res.ok || !data.valid) {
        setDraftError(data.errors?.[code] ?? data.error ?? "Something went wrong. Please try again.")
        return null
      }
      const next = [...added, code]
      setAdded(next)
      setDraft("")
      return next
    } catch {
      setDraftError("Something went wrong. Please try again.")
      return null
    } finally {
      setStatus("idle")
      inputRef.current?.focus()
    }
  }

  // The form's submit (Enter, or the Add button) only ever adds a code.
  async function handleAdd(e: React.FormEvent) {
    e.preventDefault()
    await addDraft()
  }

  async function handleContinue() {
    // A code typed but not added yet comes along too, once it checks out.
    const codes = draft.trim() ? await addDraft() : added
    if (!codes?.length) return
    setStatus("leaving")
    window.location.href = `${APP_REDEEM_URL}?code=${encodeURIComponent(codes.join(","))}`
  }

  if (status === "leaving") {
    return (
      <div role="status" className="flex items-start gap-4 rounded-2xl border border-hairline bg-mist p-5">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ink text-white">
          <CheckCircle2 className="h-5 w-5" />
        </span>
        <div>
          <p className="mb-1 font-semibold text-ink">{added.length > 1 ? `${added.length} codes ready` : "Your code is ready"}</p>
          <p className="text-sm leading-relaxed text-quiet">Taking you to your account to unlock your deal…</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      {added.length > 0 && (
        <div>
          <p className="mb-2 text-sm font-medium text-ink">
            Your codes ({added.length} of {APPSUMO_MAX_CODES})
          </p>
          <ul className="flex flex-col gap-2">
            {added.map(code => (
              <li key={code} className="flex items-center gap-3 rounded-2xl border border-hairline bg-mist px-4 py-3">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-ink" />
                <span className="min-w-0 flex-1 truncate font-mono text-sm tracking-[0.08em] text-ink">{code}</span>
                <button
                  type="button"
                  onClick={() => setAdded(prev => prev.filter(c => c !== code))}
                  aria-label={`Remove ${code}`}
                  className="cursor-pointer text-faint transition hover:text-ink"
                >
                  <X className="h-4 w-4" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {!full && (
        <form onSubmit={handleAdd} className="flex flex-col gap-2">
          <label htmlFor={`${id}-code`} className="text-sm font-medium text-ink">
            {added.length ? "Add another code (optional)" : "Your AppSumo code"}
          </label>
          <div className="flex gap-2">
            <input
              ref={inputRef}
              id={`${id}-code`}
              type="text"
              autoComplete="off"
              autoCapitalize="characters"
              spellCheck={false}
              placeholder="AS-TTMD-XXXXX-XXXXX"
              value={draft}
              onChange={e => {
                setDraft(e.target.value)
                setDraftError("")
              }}
              aria-invalid={Boolean(draftError)}
              aria-describedby={draftError ? `${id}-error` : `${id}-hint`}
              className={inputCls}
            />
            <button
              type="submit"
              disabled={!draft.trim() || status === "checking"}
              className="inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-2xl border border-ink px-4 text-[15px] font-semibold text-ink transition hover:bg-mist disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Plus className="h-4 w-4" />
              {status === "checking" ? "Checking…" : "Add"}
            </button>
          </div>
          {draftError ? (
            <p id={`${id}-error`} role="alert" className="text-sm text-red-600">
              {draftError}
            </p>
          ) : (
            <p id={`${id}-hint`} className="text-xs text-quiet">
              Add your codes one at a time. You can stack up to {APPSUMO_MAX_CODES} on one account.
            </p>
          )}
        </form>
      )}

      <div className="rounded-2xl border border-hairline bg-mist p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-quiet">
          {added.length ? `With ${tier.codes} ${tier.codes === 1 ? "code" : "codes"}` : "With 1 code"}
        </p>
        <ul className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1 text-sm text-ink">
          <li>
            <strong>{tier.readyMade}</strong> pre-built agents
          </li>
          <li>
            <strong>{tier.actions.toLocaleString()}</strong> AI Agent Actions
          </li>
          <li>
            <strong>{tier.agents}</strong> custom {tier.agents === 1 ? "agent" : "agents"}
          </li>
          <li>Autopilot</li>
        </ul>
      </div>

      <button
        type="button"
        onClick={handleContinue}
        disabled={(!added.length && !draft.trim()) || status === "checking"}
        className={`${btnCls} group bg-ink text-white`}
      >
        {added.length > 1 ? `Continue with ${added.length} codes` : "Continue"}
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </button>
    </div>
  )
}

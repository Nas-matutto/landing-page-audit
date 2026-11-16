"use client"

import { useId, useState } from "react"
import { ArrowRight, CheckCircle2, Plus, X } from "lucide-react"
import { APP_REDEEM_URL } from "@/lib/links"
import { APPSUMO_MAX_CODES, appsumoTier } from "@/lib/appsumo/tiers"

const inputCls =
  "w-full rounded-2xl border border-hairline bg-white px-4 py-3.5 font-mono text-base uppercase tracking-[0.08em] text-ink placeholder:normal-case placeholder:tracking-normal placeholder:text-faint transition focus:border-ink focus:outline-none focus:ring-4 focus:ring-ink/5"

const btnCls =
  "inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full px-5 py-3.5 text-[15px] font-semibold tracking-[0.2px] transition-opacity hover:opacity-85 disabled:opacity-60"

/** Same as /api/redeem. */
const norm = (raw: string) => raw.toUpperCase().replace(/[‐-―−]/g, "-").replace(/\s+/g, "")

/**
 * AppSumo code entry, for one code or several (they stack, up to
 * APPSUMO_MAX_CODES per account). /api/redeem checks the codes are ours, then we
 * hand the buyer to the app (APP_REDEEM_URL?code=A,B), which claims them for
 * their account and applies the deal. Whether a code is already used is only
 * known there.
 */
export function RedeemForm() {
  const id = useId()
  const [codes, setCodes] = useState<string[]>([""])
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [errorMsg, setErrorMsg] = useState("")
  const [errors, setErrors] = useState<Record<string, string>>({})

  const filled = Array.from(new Set(codes.map(norm).filter(Boolean)))
  const tier = appsumoTier(filled.length)

  function setCodeAt(i: number, value: string) {
    setCodes(prev => prev.map((c, j) => (j === i ? value : c)))
    if (status === "error") setStatus("idle")
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!filled.length) return

    setStatus("loading")
    setErrorMsg("")
    setErrors({})

    try {
      const res = await fetch("/api/redeem", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ codes: filled }),
      })
      const data = await res.json()
      if (!res.ok || !data.valid) {
        setStatus("error")
        setErrors(data.errors ?? {})
        // Shown under the button only when no single field carries it.
        setErrorMsg(data.errors ? "" : (data.error ?? "Something went wrong. Please try again."))
        return
      }
      setStatus("success")
      window.location.href = `${APP_REDEEM_URL}?code=${encodeURIComponent((data.codes as string[]).join(","))}`
    } catch {
      setStatus("error")
      setErrorMsg("Something went wrong. Please try again.")
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="flex items-start gap-4 rounded-2xl border border-hairline bg-mist p-5">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ink text-white">
          <CheckCircle2 className="h-5 w-5" />
        </span>
        <div>
          <p className="mb-1 font-semibold text-ink">{filled.length > 1 ? "Your codes are valid" : "Your code is valid"}</p>
          <p className="text-sm leading-relaxed text-quiet">Taking you to your account to unlock your deal…</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        {codes.map((code, i) => {
          const fieldId = `${id}-code-${i}`
          const fieldError = status === "error" ? errors[norm(code)] : undefined
          return (
            <div key={i} className="flex flex-col gap-2">
              <label htmlFor={fieldId} className="text-sm font-medium text-ink">
                {codes.length > 1 ? `AppSumo code ${i + 1}` : "Your AppSumo code"}
              </label>
              <div className="flex gap-2">
                <input
                  id={fieldId}
                  type="text"
                  required={i === 0}
                  autoComplete="off"
                  autoCapitalize="characters"
                  spellCheck={false}
                  placeholder="AS-TTMD-XXXXX-XXXXX"
                  value={code}
                  onChange={e => setCodeAt(i, e.target.value)}
                  aria-invalid={Boolean(fieldError)}
                  aria-describedby={fieldError ? `${fieldId}-error` : undefined}
                  className={inputCls}
                />
                {codes.length > 1 && (
                  <button
                    type="button"
                    onClick={() => setCodes(prev => prev.filter((_, j) => j !== i))}
                    aria-label={`Remove code ${i + 1}`}
                    className="flex w-12 shrink-0 cursor-pointer items-center justify-center rounded-2xl border border-hairline text-faint transition hover:text-ink"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
              {fieldError && (
                <p id={`${fieldId}-error`} role="alert" className="text-sm text-red-600">
                  {fieldError}
                </p>
              )}
            </div>
          )
        })}

        {codes.length < APPSUMO_MAX_CODES && (
          <button
            type="button"
            onClick={() => setCodes(prev => [...prev, ""])}
            className="inline-flex cursor-pointer items-center gap-1.5 self-start text-sm font-medium text-ink underline decoration-ink/25 underline-offset-4 hover:decoration-ink"
          >
            <Plus className="h-4 w-4" />
            Add another code
          </button>
        )}

        <div className="mt-1 rounded-2xl border border-hairline bg-mist p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-quiet">
            With {tier.codes} {tier.codes === 1 ? "code" : "codes"}
          </p>
          <ul className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1 text-sm text-ink">
            <li>
              <strong>{tier.readyMade}</strong> pre-built agents
            </li>
            <li>
              <strong>{tier.actions.toLocaleString()}</strong> actions a month
            </li>
            <li>
              <strong>{tier.agents}</strong> custom {tier.agents === 1 ? "agent" : "agents"}
            </li>
            <li>Autopilot</li>
          </ul>
        </div>

        <button type="submit" disabled={status === "loading"} className={`${btnCls} group mt-1 bg-ink text-white`}>
          {status === "loading" ? "Checking…" : filled.length > 1 ? `Redeem ${filled.length} codes` : "Redeem code"}
          {status !== "loading" && <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />}
        </button>
      </form>
      {status === "error" && errorMsg && (
        <p role="alert" className="mt-3 text-sm text-red-600">
          {errorMsg}
        </p>
      )}
    </>
  )
}

"use client"

import { useId, useState } from "react"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import { APP_REDEEM_URL } from "@/lib/links"

const inputCls =
  "w-full rounded-2xl border border-hairline bg-white px-4 py-3.5 font-mono text-base uppercase tracking-[0.08em] text-ink placeholder:normal-case placeholder:tracking-normal placeholder:text-faint transition focus:border-ink focus:outline-none focus:ring-4 focus:ring-ink/5"

const btnCls =
  "inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full px-5 py-3.5 text-[15px] font-semibold tracking-[0.2px] transition-opacity hover:opacity-85 disabled:opacity-60"

/**
 * AppSumo code entry. /api/redeem checks the code is one of ours, then we hand
 * the buyer to the app (APP_REDEEM_URL), which claims it for their account and
 * applies Solo. Whether a code is already used is only known there.
 */
export function RedeemForm() {
  const id = useId()
  const [code, setCode] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [errorMsg, setErrorMsg] = useState("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!code.trim()) return

    setStatus("loading")
    setErrorMsg("")

    try {
      const res = await fetch("/api/redeem", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      })
      const data = await res.json()
      if (!res.ok || !data.valid) {
        setStatus("error")
        setErrorMsg(data.error ?? "Something went wrong. Please try again.")
        return
      }
      setStatus("success")
      window.location.href = `${APP_REDEEM_URL}?code=${encodeURIComponent(data.code)}`
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
          <p className="mb-1 font-semibold text-ink">Your code is valid</p>
          <p className="text-sm leading-relaxed text-quiet">Taking you to your account to unlock Solo…</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <label htmlFor={`${id}-code`} className="text-sm font-medium text-ink">
          Your AppSumo code
        </label>
        <input
          id={`${id}-code`}
          type="text"
          required
          autoComplete="off"
          autoCapitalize="characters"
          spellCheck={false}
          placeholder="AS-TTMD-XXXXX-XXXXX"
          value={code}
          onChange={e => {
            setCode(e.target.value)
            if (status === "error") setStatus("idle")
          }}
          aria-invalid={status === "error"}
          aria-describedby={status === "error" ? `${id}-error` : undefined}
          className={inputCls}
        />
        <button type="submit" disabled={status === "loading"} className={`${btnCls} group bg-ink text-white`}>
          {status === "loading" ? "Checking…" : "Redeem code"}
          {status !== "loading" && <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />}
        </button>
      </form>
      {status === "error" && (
        <p id={`${id}-error`} role="alert" className="mt-3 text-sm text-red-600">
          {errorMsg}
        </p>
      )}
    </>
  )
}

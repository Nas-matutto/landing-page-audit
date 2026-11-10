"use client"

import { useId, useState } from "react"
import { ArrowRight, ArrowUpRight, CheckCircle2, Mail } from "lucide-react"
import { CONTACT_EMAIL } from "@/components/legal-page"
import { SIGNUP_URL } from "@/lib/links"

const inputCls =
  "w-full rounded-2xl border border-hairline bg-white px-4 py-3.5 font-mono text-base uppercase tracking-[0.08em] text-ink placeholder:normal-case placeholder:tracking-normal placeholder:text-faint transition focus:border-ink focus:outline-none focus:ring-4 focus:ring-ink/5"

const btnCls =
  "inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full px-5 py-3.5 text-[15px] font-semibold tracking-[0.2px] transition-opacity hover:opacity-85 disabled:opacity-60"

/** AppSumo code entry. Shows the next steps only once /api/redeem confirms the code. */
export function RedeemForm() {
  const id = useId()
  const [code, setCode] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [errorMsg, setErrorMsg] = useState("")
  const [redeemed, setRedeemed] = useState("")

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
      setRedeemed(data.code)
      setStatus("success")
    } catch {
      setStatus("error")
      setErrorMsg("Something went wrong. Please try again.")
    }
  }

  if (status === "success") {
    const mailto =
      `mailto:${CONTACT_EMAIL}` +
      `?subject=${encodeURIComponent(`AppSumo code ${redeemed}`)}` +
      `&body=${encodeURIComponent(`Hi Nas,\n\nI've redeemed my AppSumo code: ${redeemed}\n\nPlease upgrade this email address to the Solo plan.\n\nThanks!`)}`

    return (
      <div role="status">
        <div className="flex items-start gap-4 rounded-2xl border border-hairline bg-mist p-5">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ink text-white">
            <CheckCircle2 className="h-5 w-5" />
          </span>
          <div>
            <p className="mb-1 font-semibold text-ink">Your code is valid</p>
            <p className="text-sm leading-relaxed text-quiet">
              <span className="font-mono font-medium text-ink">{redeemed}</span> unlocks the Solo plan. Two quick steps to finish.
            </p>
          </div>
        </div>

        <ol className="mt-6 space-y-5">
          <li className="flex gap-4">
            <span className="font-mono text-sm font-medium text-faint">01</span>
            <div className="flex-1">
              <p className="font-semibold text-ink">Email us your code</p>
              <p className="mt-1 text-sm leading-relaxed text-quiet">
                Send your code to <a href={mailto} className="font-medium text-ink underline decoration-ink/25 underline-offset-4 hover:decoration-ink">{CONTACT_EMAIL}</a> from the email address you&apos;ll use for your account.
              </p>
              <a href={mailto} className={`${btnCls} mt-3 bg-ink text-white sm:w-auto`}>
                <Mail className="h-4 w-4" /> Email my code
              </a>
            </div>
          </li>
          <li className="flex gap-4">
            <span className="font-mono text-sm font-medium text-faint">02</span>
            <div className="flex-1">
              <p className="font-semibold text-ink">Sign up with the same email</p>
              <p className="mt-1 text-sm leading-relaxed text-quiet">
                Create your account using the email address you sent your code from. We&apos;ll match the two and upgrade you to Solo.
              </p>
              <a href={SIGNUP_URL} className={`${btnCls} mt-3 border border-hairline bg-white text-ink sm:w-auto`}>
                Create my account <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </li>
        </ol>
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

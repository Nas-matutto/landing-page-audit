"use client"

import { useId, useState } from "react"
import { ArrowRight, CheckCircle2 } from "lucide-react"

const inputCls =
  "w-full rounded-2xl border border-hairline bg-white px-4 py-3 text-sm text-ink placeholder:text-faint transition focus:border-ink focus:outline-none focus:ring-4 focus:ring-ink/5"

/** Email capture for a free guide. The API route emails the PDF as an attachment. */
export function GuideForm({ endpoint, cta }: { endpoint: string; cta: string }) {
  const id = useId()
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [botField, setBotField] = useState("") // honeypot
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [errorMsg, setErrorMsg] = useState("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.includes("@")) return

    setStatus("loading")
    setErrorMsg("")

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, firstName: firstName.trim(), lastName: lastName.trim(), hp: botField }),
      })

      const data = await res.json()
      if (!res.ok) {
        setStatus("error")
        setErrorMsg(data.error ?? "Something went wrong. Please try again.")
        return
      }
      setStatus("success")
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
          <p className="mb-1 font-semibold text-ink">Check your inbox</p>
          <p className="text-sm leading-relaxed text-quiet">
            The PDF is on its way to <span className="font-medium text-ink">{email}</span>. If you don&apos;t see it in a
            couple of minutes, check your spam folder.
          </p>
        </div>
      </div>
    )
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        {/* Honeypot: hidden from humans; bots that fill every field give themselves away. */}
        <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: 1, height: 1, overflow: "hidden" }}>
          <input
            type="text"
            name="company_website"
            tabIndex={-1}
            autoComplete="off"
            value={botField}
            onChange={e => setBotField(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <label htmlFor={`${id}-first`} className="sr-only">First name</label>
          <input
            id={`${id}-first`}
            type="text"
            required
            autoComplete="given-name"
            placeholder="First name"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
            className={inputCls}
          />
          <label htmlFor={`${id}-last`} className="sr-only">Surname</label>
          <input
            id={`${id}-last`}
            type="text"
            required
            autoComplete="family-name"
            placeholder="Surname"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
            className={inputCls}
          />
        </div>
        <label htmlFor={`${id}-email`} className="sr-only">Work email</label>
        <input
          id={`${id}-email`}
          type="email"
          required
          autoComplete="email"
          placeholder="you@company.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className={inputCls}
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="group relative inline-flex w-full cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-full bg-ink px-5 py-3.5 text-[15px] font-semibold tracking-[0.2px] text-white transition-opacity hover:opacity-85 disabled:opacity-60"
        >
          <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-in-out group-hover:translate-x-full" />
          <span className="relative flex items-center gap-2">
            {status === "loading" ? "Sending…" : cta}
            {status !== "loading" && <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />}
          </span>
        </button>
      </form>
      {status === "error" && (
        <p role="alert" className="mt-3 text-sm text-red-600">
          {errorMsg}
        </p>
      )}
      <p className="mt-3 text-xs text-faint">Free PDF by email. No spam, unsubscribe any time.</p>
    </>
  )
}

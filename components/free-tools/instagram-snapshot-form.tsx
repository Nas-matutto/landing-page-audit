"use client"

import { useId, useState } from "react"
import { ArrowRight, CheckCircle2 } from "lucide-react"

const inputCls =
  "w-full rounded-2xl border border-hairline bg-white px-4 py-3 text-sm text-ink placeholder:text-faint transition focus:border-ink focus:outline-none focus:ring-4 focus:ring-ink/5"

/** Handle, name, email and the professional-account check. The API looks the account up, then emails the PDF. */
export function InstagramSnapshotForm() {
  const id = useId()
  const [handle, setHandle] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [professional, setProfessional] = useState(false)
  const [botField, setBotField] = useState("") // honeypot
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [errorMsg, setErrorMsg] = useState("")
  const [sentHandle, setSentHandle] = useState("")

  const shownHandle = handle.trim().replace(/^@/, "")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.includes("@") || !professional) return

    setStatus("loading")
    setErrorMsg("")
    try {
      const res = await fetch("/api/instagram-snapshot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          handle,
          email,
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          professionalAccount: professional,
          hp: botField,
        }),
      })
      const data = await res.json()
      if (!res.ok) {
        setStatus("error")
        setErrorMsg(data.error ?? "Something went wrong. Please try again.")
        return
      }
      setSentHandle(data.handle ?? shownHandle)
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
          <p className="mb-1 font-semibold text-ink">Your snapshot is on its way</p>
          <p className="text-sm leading-relaxed text-quiet">
            We&apos;re analysing <span className="font-medium text-ink">@{sentHandle}</span> now. The PDF lands in{" "}
            <span className="font-medium text-ink">{email}</span> in about a minute. If it isn&apos;t there in five, check
            your spam folder.
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
          <input type="text" name="company_website" tabIndex={-1} autoComplete="off" value={botField} onChange={e => setBotField(e.target.value)} />
        </div>

        <label htmlFor={`${id}-handle`} className="sr-only">Instagram handle</label>
        <div className="relative">
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-faint">@</span>
          <input
            id={`${id}-handle`}
            type="text"
            required
            autoComplete="off"
            autoCapitalize="none"
            spellCheck={false}
            placeholder="yourbrand"
            value={handle}
            onChange={e => setHandle(e.target.value)}
            className={`${inputCls} pl-8`}
          />
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <label htmlFor={`${id}-first`} className="sr-only">First name</label>
          <input id={`${id}-first`} type="text" required autoComplete="given-name" placeholder="First name" value={firstName} onChange={e => setFirstName(e.target.value)} className={inputCls} />
          <label htmlFor={`${id}-last`} className="sr-only">Surname</label>
          <input id={`${id}-last`} type="text" required autoComplete="family-name" placeholder="Surname" value={lastName} onChange={e => setLastName(e.target.value)} className={inputCls} />
        </div>
        <label htmlFor={`${id}-email`} className="sr-only">Email</label>
        <input id={`${id}-email`} type="email" required autoComplete="email" placeholder="you@company.com" value={email} onChange={e => setEmail(e.target.value)} className={inputCls} />

        <label htmlFor={`${id}-pro`} className="flex cursor-pointer items-start gap-3 rounded-2xl border border-hairline p-4 transition-colors has-[:checked]:border-ink">
          <input
            id={`${id}-pro`}
            type="checkbox"
            required
            checked={professional}
            onChange={e => setProfessional(e.target.checked)}
            className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-ink"
          />
          <span className="text-sm leading-snug">
            <span className="font-medium text-ink">
              {shownHandle ? `@${shownHandle}` : "My account"} is an Instagram Creator or Business account
            </span>
            <span className="mt-1 block text-xs leading-relaxed text-quiet">
              The snapshot only works for professional accounts. Switching a personal account is free: Settings and activity,
              then Account type and tools.
            </span>
          </span>
        </label>

        <button
          type="submit"
          disabled={status === "loading"}
          className="group relative inline-flex w-full cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-full bg-ink px-5 py-3.5 text-[15px] font-semibold tracking-[0.2px] text-white transition-opacity hover:opacity-85 disabled:opacity-60"
        >
          <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-in-out group-hover:translate-x-full" />
          <span className="relative flex items-center gap-2">
            {status === "loading" ? "Finding your account…" : "Email me my snapshot"}
            {status !== "loading" && <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />}
          </span>
        </button>
      </form>
      {status === "error" && (
        <p role="alert" className="mt-3 text-sm text-red-600">
          {errorMsg}
        </p>
      )}
      <p className="mt-3 text-xs text-faint">One free snapshot per email. Public data only, no Instagram login. No spam.</p>
    </>
  )
}

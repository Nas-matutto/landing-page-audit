"use client"

import { useState } from "react"
import { Check, CheckCircle2, Copy } from "lucide-react"

/**
 * A copyable agent prompt. The prompt text is server-rendered inside <pre>, so
 * it stays crawlable. With `leadSource`, copying reveals an email capture that
 * posts to /api/capture-lead tagged with that source.
 */
export function PromptBlock({
  prompt,
  label = "Agent Prompt",
  leadSource,
}: {
  prompt: string
  label?: string
  leadSource?: string
}) {
  const [copied, setCopied] = useState(false)
  const [showCapture, setShowCapture] = useState(false)
  const [email, setEmail] = useState("")
  const [emailStatus, setEmailStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  function handleCopy() {
    navigator.clipboard.writeText(prompt)
    setCopied(true)
    if (leadSource) setShowCapture(true)
    setTimeout(() => setCopied(false), 2000)
  }

  async function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.includes("@")) return
    setEmailStatus("loading")
    try {
      const res = await fetch("/api/capture-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: leadSource }),
      })
      if (!res.ok) throw new Error()
      setEmailStatus("success")
    } catch {
      setEmailStatus("error")
    }
  }

  return (
    <div className="my-8">
      <div className="overflow-hidden rounded-3xl border border-hairline">
        <div className="flex items-center justify-between bg-ink px-5 py-3">
          <span className="eyebrow text-white/55!">{label}</span>
          <button
            onClick={handleCopy}
            className="inline-flex cursor-pointer items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all"
            style={copied
              ? { background: "#ffffff", color: "#141414" }
              : { background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.8)" }}
          >
            {copied ? <><Check className="w-3.5 h-3.5" />Copied!</> : <><Copy className="w-3.5 h-3.5" />Copy prompt</>}
          </button>
        </div>
        <pre
          className="overflow-x-auto whitespace-pre-wrap bg-mist p-6 font-mono text-sm leading-relaxed text-neutral-700"
          style={{ fontFamily: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace" }}
        >
          {prompt}
        </pre>
      </div>

      {showCapture && (
        <div className="mt-4 rounded-3xl border border-hairline bg-white p-6">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ink">
              <Check className="h-4 w-4 text-white" />
            </div>
            <div className="flex-1">
              <p className="mb-0.5 text-sm font-semibold text-ink">Prompt copied!</p>
              {emailStatus === "success" ? (
                <div className="flex items-center gap-2 mt-2">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-ink" />
                  <p className="text-sm text-quiet">You're in. We'll send new prompts as we build them.</p>
                </div>
              ) : (
                <>
                  <p className="mb-4 text-sm text-quiet">Interested in building AI agents? Get new prompts as we write them.</p>
                  <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-2.5">
                    <input
                      type="email"
                      required
                      placeholder="you@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex-1 rounded-full border border-hairline bg-white px-4 py-2.5 text-sm text-ink transition placeholder:text-faint focus:border-ink focus:outline-none"
                    />
                    <button
                      type="submit"
                      disabled={emailStatus === "loading"}
                      className="inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-85 disabled:opacity-60"
                    >
                      {emailStatus === "loading" ? "Sending…" : "Yes, send me more →"}
                    </button>
                  </form>
                  {emailStatus === "error" && (
                    <p className="text-red-500 text-xs mt-2">Something went wrong. Please try again.</p>
                  )}
                  <p className="mt-2 text-xs text-faint">No spam. Unsubscribe any time.</p>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

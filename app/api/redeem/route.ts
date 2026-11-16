import { createHash } from "node:crypto"
import { NextRequest, NextResponse } from "next/server"
import hashes from "@/lib/appsumo/code-hashes.json"
import { APPSUMO_MAX_CODES } from "@/lib/appsumo/tiers"

/**
 * Checks one or more AppSumo codes (they stack, up to APPSUMO_MAX_CODES per
 * account). Only SHA-256 hashes of the codes live in the repo (see
 * scripts/generate-appsumo-codes.mjs), so the list can't be read from the site.
 * This is only a first check so a typo gets caught here. The form then sends the
 * buyer to app.talktomedata.com/redeem?code=A,B, which claims the codes for their
 * account and applies the deal. "Already used" is only known there.
 *
 * Body: { codes: string[] } (or the older { code: string }).
 * Reply: { valid: true, codes } or { valid: false, error, errors: { [code]: message } }.
 */
const VALID = new Set<string>(hashes as string[])

/** Uppercase, drop spaces, and treat any dash-like character as a hyphen. */
function normalizeCode(raw: string) {
  return raw.toUpperCase().replace(/[‐-―−]/g, "-").replace(/\s+/g, "")
}

function checkCode(code: string): string | null {
  if (!/^AS-TTMD-[A-Z0-9]{5}-[A-Z0-9]{5}$/.test(code)) {
    return "That doesn't look like an AppSumo code. It should look like AS-TTMD-XXXXX-XXXXX."
  }
  if (!VALID.has(createHash("sha256").update(code).digest("hex"))) {
    return "We couldn't find that code. Check it matches the one on your AppSumo account and try again."
  }
  return null
}

export async function POST(request: NextRequest) {
  let raw: unknown[] = []
  try {
    const body = await request.json()
    raw = Array.isArray(body?.codes) ? body.codes : [body?.code]
  } catch {
    return NextResponse.json({ valid: false, error: "Something went wrong. Please try again." }, { status: 400 })
  }

  const codes = Array.from(new Set(raw.filter((c): c is string => typeof c === "string").map(normalizeCode).filter(Boolean)))
  if (!codes.length) {
    return NextResponse.json({ valid: false, error: "Enter your AppSumo code." }, { status: 400 })
  }
  if (codes.length > APPSUMO_MAX_CODES) {
    return NextResponse.json(
      { valid: false, error: `One account can stack up to ${APPSUMO_MAX_CODES} codes. Keep the rest for another account.` },
      { status: 400 },
    )
  }

  const errors: Record<string, string> = {}
  for (const code of codes) {
    const error = checkCode(code)
    if (error) errors[code] = error
  }
  if (Object.keys(errors).length) {
    const first = Object.values(errors)[0]
    return NextResponse.json({ valid: false, error: first, errors }, { status: 400 })
  }

  return NextResponse.json({ valid: true, codes })
}

import { createHash } from "node:crypto"
import { NextRequest, NextResponse } from "next/server"
import hashes from "@/lib/appsumo/code-hashes.json"

/**
 * Checks an AppSumo code. Only SHA-256 hashes of the codes live in the repo
 * (see scripts/generate-appsumo-codes.mjs), so the list can't be read from the site.
 * This only validates; the Solo upgrade itself is done by hand after the buyer emails us.
 */
const VALID = new Set<string>(hashes as string[])

/** Uppercase, drop spaces, and treat any dash-like character as a hyphen. */
function normalizeCode(raw: string) {
  return raw.toUpperCase().replace(/[‐-―−]/g, "-").replace(/\s+/g, "")
}

export async function POST(request: NextRequest) {
  let code = ""
  try {
    const body = await request.json()
    code = typeof body?.code === "string" ? normalizeCode(body.code) : ""
  } catch {
    return NextResponse.json({ valid: false, error: "Something went wrong. Please try again." }, { status: 400 })
  }

  if (!/^AS-TTMD-[A-Z0-9]{5}-[A-Z0-9]{5}$/.test(code)) {
    return NextResponse.json(
      { valid: false, error: "That doesn't look like an AppSumo code. It should look like AS-TTMD-XXXXX-XXXXX." },
      { status: 400 },
    )
  }

  const valid = VALID.has(createHash("sha256").update(code).digest("hex"))
  if (!valid) {
    return NextResponse.json(
      { valid: false, error: "We couldn't find that code. Check it matches the one on your AppSumo account and try again." },
      { status: 404 },
    )
  }

  return NextResponse.json({ valid: true, code })
}

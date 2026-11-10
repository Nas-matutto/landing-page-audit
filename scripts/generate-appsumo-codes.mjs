#!/usr/bin/env node
/**
 * Generates AppSumo redemption codes like AS-TTMD-02LTJ-N6AXZ.
 *
 *   node scripts/generate-appsumo-codes.mjs [count=1000] [testCount=3]
 *
 * Writes:
 *   private/appsumo/appsumo-codes.csv   one code per line, no header (upload this to AppSumo)
 *   private/appsumo/test-codes.txt      codes for testing /redeem, NOT in the CSV
 *   lib/appsumo/code-hashes.json        SHA-256 of every code (committed; the API checks against it)
 *
 * private/ is gitignored, so plain codes never land in the repo. Running it again
 * ADDS a new batch to the hashes file, so codes already sold keep working.
 */
import { createHash, randomInt } from "node:crypto"
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..")
const OUT_DIR = join(ROOT, "private/appsumo")
const HASHES = join(ROOT, "lib/appsumo/code-hashes.json")

// No 0/O or 1/I, so a code read off a screen can't be mistyped.
const ALPHABET = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ"

const count = Number(process.argv[2] ?? 1000)
const testCount = Number(process.argv[3] ?? 3)

const block = (n = 5) => Array.from({ length: n }, () => ALPHABET[randomInt(ALPHABET.length)]).join("")
const hash = (code) => createHash("sha256").update(code).digest("hex")

const existing = existsSync(HASHES) ? JSON.parse(readFileSync(HASHES, "utf8")) : []
const seen = new Set(existing)

function unique(make) {
  for (;;) {
    const code = make()
    const h = hash(code)
    if (!seen.has(h)) {
      seen.add(h)
      return code
    }
  }
}

const codes = Array.from({ length: count }, () => unique(() => `AS-TTMD-${block()}-${block()}`))
const tests = Array.from({ length: testCount }, () => unique(() => `AS-TTMD-TEST${block(1)}-${block()}`))

mkdirSync(OUT_DIR, { recursive: true })
mkdirSync(dirname(HASHES), { recursive: true })

const stamp = new Date().toISOString().slice(0, 10)
const csvPath = join(OUT_DIR, existsSync(join(OUT_DIR, "appsumo-codes.csv")) ? `appsumo-codes-${stamp}.csv` : "appsumo-codes.csv")
writeFileSync(csvPath, codes.join("\n") + "\n")
writeFileSync(join(OUT_DIR, "test-codes.txt"), tests.join("\n") + "\n", { flag: "a" })
writeFileSync(HASHES, JSON.stringify([...seen], null, 0) + "\n")

console.log(`Wrote ${codes.length} codes to ${csvPath}`)
console.log(`Test codes (not in the CSV):\n  ${tests.join("\n  ")}`)
console.log(`${seen.size} valid codes in total in lib/appsumo/code-hashes.json`)

// Shared bot filtering for lead-capture endpoints.
//
// Automated crawlers (email link scanners, form-spam bots) render a page, fill
// every field with random strings, and submit — polluting the leads sheet and
// Brevo with rows like "XWZUMpVddXigHXzpI". Two cheap signals catch most of them:
//   1. a hidden honeypot field (`hp`) a human never sees but a fill-everything bot does; and
//   2. names that read as machine-random.
// Endpoints should treat a positive result as "silently accept (200) and write nothing"
// so the bot doesn't retry.

// A single field reads as machine-random if it's long, unbroken (no space),
// vowel-starved, and sprinkled with internal capitals — e.g. "XWZUMpVddXigHXzpI".
// Thresholds are deliberately conservative so real names (even long or unusual
// ones like "Konstantinos" or "McDonald") pass through.
export function looksRandom(s?: string): boolean {
  if (!s) return false
  const v = s.trim()
  if (v.length < 12 || v.includes(' ')) return false
  const letters = v.replace(/[^a-zA-Z]/g, '')
  if (letters.length < 12) return false
  const vowels = (v.match(/[aeiouAEIOU]/g) || []).length
  const vowelRatio = vowels / letters.length
  const internalCaps = (v.slice(1).match(/[A-Z]/g) || []).length
  return vowelRatio < 0.25 && internalCaps >= 2
}

// hp = honeypot: a hidden form field. A human leaves it empty; bots that fill
// every input give themselves away.
export function isLikelyBot(hp?: string, firstName?: string, lastName?: string): boolean {
  if (typeof hp === 'string' && hp.trim() !== '') return true
  return looksRandom(firstName) || looksRandom(lastName)
}

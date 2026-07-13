import { google, sheets_v4 } from 'googleapis'

// Leads live in Sheet1, columns A–J:
// A timestamp · B email · C role · D teamSize · E challenge · F timeline
// G budget · H score (1–10) · I page/source · J tools
export const LEADS_RANGE = 'Sheet1!A:J'

export type LeadFields = {
  email: string
  role?: string
  teamSize?: string
  challenge?: string
  timeline?: string
  budget?: string
  score?: number | string
  page: string
  tools?: string
}

// Builds a full A–J row (with an ISO timestamp) from named fields, leaving any
// omitted column blank. Keeps the column order in one place for every caller.
export function buildLeadRow(f: LeadFields): string[] {
  const score = f.score === undefined || f.score === '' ? '' : String(f.score)
  return [
    new Date().toISOString(),
    f.email,
    f.role ?? '',
    f.teamSize ?? '',
    f.challenge ?? '',
    f.timeline ?? '',
    f.budget ?? '',
    score,
    f.page,
    f.tools ?? '',
  ]
}

function getSheets(): { sheets: sheets_v4.Sheets; sheetId: string } | null {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL
  const privateKey = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY
    ?.replace(/\\n/g, '\n')
    ?.replace(/^["']|["']$/g, '')
  const sheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID

  if (!email || !privateKey || !sheetId) {
    console.warn('Google Sheets env vars not set — skipping sheet write')
    return null
  }

  const auth = new google.auth.GoogleAuth({
    credentials: { client_email: email, private_key: privateKey },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  })

  return { sheets: google.sheets({ version: 'v4', auth }), sheetId }
}

// Appends a row and returns the A1 range it landed in (e.g. "Sheet1!A7:J7"),
// so a later submission can update that same row in place.
export async function appendLeadRow(row: string[]): Promise<string | undefined> {
  const client = getSheets()
  if (!client) return undefined

  const res = await client.sheets.spreadsheets.values.append({
    spreadsheetId: client.sheetId,
    range: LEADS_RANGE,
    valueInputOption: 'USER_ENTERED',
    requestBody: { values: [row] },
  })
  return res.data.updates?.updatedRange ?? undefined
}

export async function updateLeadRow(range: string, row: string[]) {
  const client = getSheets()
  if (!client) return

  await client.sheets.spreadsheets.values.update({
    spreadsheetId: client.sheetId,
    range,
    valueInputOption: 'USER_ENTERED',
    requestBody: { values: [row] },
  })
}

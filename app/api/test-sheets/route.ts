import { NextResponse } from 'next/server'
import { google } from 'googleapis'

// DELETE THIS FILE once Google Sheets is confirmed working.
export async function GET() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL
  const privateKeyRaw = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY
  const sheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID

  const result: Record<string, unknown> = {
    env: {
      GOOGLE_SERVICE_ACCOUNT_EMAIL: email
        ? `set (${email})`
        : 'NOT SET',
      GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY: privateKeyRaw
        ? `set (length ${privateKeyRaw.length}, starts with "${privateKeyRaw.slice(0, 30)}…")`
        : 'NOT SET',
      GOOGLE_SHEETS_SPREADSHEET_ID: sheetId
        ? `set (${sheetId})`
        : 'NOT SET',
    },
  }

  if (!email || !privateKeyRaw || !sheetId) {
    return NextResponse.json({ ...result, error: 'Missing env vars' }, { status: 500 })
  }

  const privateKey = privateKeyRaw.replace(/\\n/g, '\n').replace(/^["']|["']$/g, '')
  result.privateKeyAfterReplace = `starts with "${privateKey.slice(0, 40)}…", ends with "…${privateKey.slice(-30)}"`

  // Step 1: Try to authenticate
  let auth: ReturnType<typeof google.auth.GoogleAuth.prototype.getClient> | null = null
  try {
    const googleAuth = new google.auth.GoogleAuth({
      credentials: { client_email: email, private_key: privateKey },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    })
    auth = googleAuth.getClient()
    result.auth = 'GoogleAuth instance created OK'
  } catch (e) {
    result.auth = { error: String(e) }
    return NextResponse.json(result, { status: 500 })
  }

  // Step 2: Try to append a test row
  try {
    const sheets = google.sheets({ version: 'v4', auth: await auth })
    const appendRes = await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range: 'Sheet1!A:G',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [['TEST', 'diagnostic@test.com', 'test-intent', 'test-team', 'test-timeline', '0', '/api/test-sheets']],
      },
    })
    result.append = {
      success: true,
      updatedRange: appendRes.data.updates?.updatedRange,
      updatedRows: appendRes.data.updates?.updatedRows,
    }
  } catch (e: unknown) {
    const err = e as { message?: string; code?: number; errors?: unknown }
    result.append = {
      error: err?.message ?? String(e),
      code: err?.code,
      details: err?.errors,
    }
  }

  return NextResponse.json(result, { status: 200 })
}

import { NextResponse } from 'next/server'

// Diagnostic endpoint — visit /api/test-brevo in your browser to see what's happening.
// DELETE THIS FILE once Brevo is confirmed working.
export async function GET() {
  const brevoKey = process.env.BREVO_API_KEY?.trim()
  const brevoListIdRaw = process.env.BREVO_LIST_ID?.trim()
  const brevoListId = brevoListIdRaw ? parseInt(brevoListIdRaw, 10) : null

  const result: Record<string, unknown> = {
    env: {
      BREVO_API_KEY: brevoKey
        ? `set (starts with "${brevoKey.slice(0, 10)}…", length ${brevoKey.length})`
        : 'NOT SET',
      BREVO_LIST_ID: brevoListIdRaw
        ? `"${brevoListIdRaw}" → parsed as ${brevoListId}`
        : 'NOT SET',
    },
  }

  if (!brevoKey) {
    return NextResponse.json({ ...result, error: 'BREVO_API_KEY is missing' }, { status: 500 })
  }

  // Step 1: check the API key works at all
  try {
    const accountRes = await fetch('https://api.brevo.com/v3/account', {
      headers: { 'api-key': brevoKey },
    })
    const accountBody = await accountRes.json()
    result.account = {
      status: accountRes.status,
      email: accountBody.email ?? null,
      error: accountRes.ok ? null : accountBody,
    }
  } catch (e) {
    result.account = { fetchError: String(e) }
  }

  // Step 2: try creating a contact with minimal payload (no attributes)
  try {
    const contactBody: Record<string, unknown> = {
      email: 'brevo-test-diagnostic@example.com',
      updateEnabled: true,
    }
    if (brevoListId && !isNaN(brevoListId)) {
      contactBody.listIds = [brevoListId]
    }

    const contactRes = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'api-key': brevoKey },
      body: JSON.stringify(contactBody),
    })
    const contactRaw = await contactRes.text()

    result.contact_test = {
      status: contactRes.status,
      // 201 = created, 204 = already existed and was updated — both mean success
      success: contactRes.status === 201 || contactRes.status === 204,
      response: contactRaw || '(empty body — this is normal for 204)',
    }
  } catch (e) {
    result.contact_test = { fetchError: String(e) }
  }

  // Step 3: check if the list ID exists
  if (brevoListId && !isNaN(brevoListId)) {
    try {
      const listRes = await fetch(`https://api.brevo.com/v3/contacts/lists/${brevoListId}`, {
        headers: { 'api-key': brevoKey },
      })
      const listBody = await listRes.json()
      result.list = {
        status: listRes.status,
        name: listBody.name ?? null,
        error: listRes.ok ? null : listBody,
      }
    } catch (e) {
      result.list = { fetchError: String(e) }
    }
  } else {
    result.list = 'BREVO_LIST_ID not set or invalid — contact will be added without a list'
  }

  return NextResponse.json(result, { status: 200 })
}

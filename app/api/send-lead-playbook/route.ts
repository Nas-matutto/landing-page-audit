import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import fs from 'fs'
import path from 'path'
import { appendLeadRow, buildLeadRow } from '@/lib/leads-sheet'
import { isLikelyBot } from '@/lib/bot-filter'
import { EMAIL_FROM, REPLY_TO } from '@/lib/email-from'
import { guideEmail } from '@/lib/email-layout'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, firstName, lastName, hp } = body

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email is required' }, { status: 400 })
    }

    // Bot filter: a filled honeypot or machine-random name means a crawler.
    // Accept (200) so it doesn't retry, but send no email and write nothing.
    if (isLikelyBot(hp, firstName, lastName)) {
      return NextResponse.json({ success: true })
    }

    // Brevo: add contact to list 5 (TTMD Leads), like every other guide
    const brevoKey = process.env.BREVO_API_KEY?.trim()
    if (!brevoKey) {
      console.warn('BREVO_API_KEY is not set')
    } else {
      const brevoRes = await fetch('https://api.brevo.com/v3/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key': brevoKey,
        },
        body: JSON.stringify({
          email,
          updateEnabled: true,
          listIds: [5],
          attributes: {
            SOURCE: 'guide_lead_playbook',
            ...(firstName ? { FIRSTNAME: firstName } : {}),
            ...(lastName ? { LASTNAME: lastName } : {}),
          },
        }),
      })

      if (!brevoRes.ok) {
        const errText = await brevoRes.text()
        console.error(`Brevo error ${brevoRes.status}:`, errText)
      }
    }

    // Google Sheets: add to the Leads sheet, noting which guide they downloaded
    await appendLeadRow(
      buildLeadRow({ email, firstName, lastName, page: 'guide - Multi-Channel Lead Generation Playbook' })
    ).catch(err => console.error('Sheets error (guide):', err))

    // Resend: send email with PDF attached
    const resendKey = process.env.RESEND_API_KEY?.trim()
    if (!resendKey) {
      console.warn('RESEND_API_KEY is not set, skipping email send')
    } else {
      const resend = new Resend(resendKey)

      const pdfPath = path.join(process.cwd(), 'public', 'guides', 'multi-channel-lead-generation-playbook.pdf')
      const pdfBuffer = fs.readFileSync(pdfPath)

      const { error } = await resend.emails.send({
        from: EMAIL_FROM,
        replyTo: REPLY_TO,
        to: [email],
        subject: 'Your playbook: Multi-Channel Lead Generation',
        html: guideEmail({
          firstName,
          title: "Multi-Channel Lead Generation Playbook",
          what: "it's attached as a PDF: where buyers ask for help on seven platforms, the signals that say now is the time, and two multi-channel cadences with templates you can copy.",
          steps: [
            "Try the phrase bank on page 4 today. Count the real buyers you find from the last 7 days.",
            "Write your ideal customer in two sentences (page 5). Everything else gets easier after that.",
            "Pick one of the two cadences on page 8 and run it on your next five leads.",
          ],
          reply: "Tell us who you sell to by replying to this email, and we'll show you what our agents would find for you.",
          source: "guide_lead_playbook",
        }),
        attachments: [
          {
            filename: 'multi-channel-lead-generation-playbook.pdf',
            content: pdfBuffer,
          },
        ],
      })

      if (error) {
        console.error('Resend error:', error)
        return NextResponse.json({ error: `Email failed to send: ${error.message}` }, { status: 500 })
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Send lead playbook error:', error)
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 })
  }
}

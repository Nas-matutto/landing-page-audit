export async function POST(req: Request) {
  try {
    const { name, email, url } = await req.json()

    const webhook = process.env.SHEET_WEBHOOK_URL
    const token = process.env.SHEET_SECRET_TOKEN

    if (!webhook || !token) {
      return new Response(
        JSON.stringify({ status: "error", message: "Missing env vars" }),
        { status: 500 }
      )
    }

    const data = new URLSearchParams()
    data.append("name", name)
    data.append("email", email)
    data.append("url", url)
    data.append("token", token)

    const response = await fetch(webhook, {
      method: "POST",
      body: data,
    })

    const text = await response.text() // <-- safer than json()

    let result
    try {
      result = JSON.parse(text) // attempt JSON
    } catch {
      return new Response(
        JSON.stringify({
          status: "error",
          message: "Webhook did not return valid JSON",
          raw: text,
        }),
        { status: 500 }
      )
    }

    return new Response(JSON.stringify(result), { status: response.status })

  } catch (err) {
    console.error("API Route Error:", err)
    return new Response(
      JSON.stringify({ status: "error", message: "Server failure" }),
      { status: 500 }
    )
  }
}

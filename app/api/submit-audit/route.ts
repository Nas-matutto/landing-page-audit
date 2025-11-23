export async function POST(req: Request) {
  const { name, email, url } = await req.json()

  const webhook = process.env.NEXT_PUBLIC_SHEET_WEBHOOK_URL
  const token = process.env.SHEET_SECRET_TOKEN

  if (!webhook || !token) {
    return new Response(
      JSON.stringify({ status: "error", message: "Missing server config" }),
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

  const result = await response.json()
  return new Response(JSON.stringify(result), { status: response.status })
}

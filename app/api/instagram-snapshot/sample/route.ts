import { NextRequest, NextResponse } from "next/server"
import { SAMPLE_POSTS, SAMPLE_PROFILE } from "@/lib/instagram-snapshot/sample"
import { buildSnapshot, renderSamplePdf } from "@/lib/instagram-snapshot/snapshot"

/**
 * Development only: the sample report (demo account) as a PDF, for working on
 * the template. `?full=1` runs the demo account through the real pipeline
 * instead, including the Sonnet call (or its rule-based fallback).
 *
 * To refresh the landing page preview after a template change, with `pnpm dev` running:
 *
 *   curl -s localhost:3000/api/instagram-snapshot/sample -o public/free-tools/instagram-snapshot-sample.pdf
 *   pdftoppm -png -r 150 -singlefile public/free-tools/instagram-snapshot-sample.pdf public/free-tools/instagram-snapshot-sample
 */
export async function GET(request: NextRequest) {
  if (process.env.NODE_ENV === "production") return new NextResponse(null, { status: 404 })
  const pdf = request.nextUrl.searchParams.has("full")
    ? (await buildSnapshot(SAMPLE_PROFILE, SAMPLE_POSTS)).pdf
    : await renderSamplePdf()
  return new NextResponse(new Uint8Array(pdf), { headers: { "Content-Type": "application/pdf" } })
}

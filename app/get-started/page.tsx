"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { GetStartedFlow } from "@/components/get-started-flow"

export default function GetStartedPage() {
  // True while the visitor is actively answering questions. We strip the header
  // nav and hide the footer during this window so an accidental tap (or an
  // errant back-swipe onto a nav link) can't bounce them out of the funnel.
  const [inFlow, setInFlow] = useState(false)

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header minimal={inFlow} />
      <main className="flex-1">
        <GetStartedFlow onInFlowChange={setInFlow} />
      </main>
      {!inFlow && <Footer />}
    </div>
  )
}

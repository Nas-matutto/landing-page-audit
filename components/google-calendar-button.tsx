"use client"

import { useEffect, useRef } from "react"

declare global {
  interface Window {
    calendar?: {
      schedulingButton: {
        load: (opts: { url: string; color: string; label: string; target: HTMLElement }) => void
      }
    }
  }
}

export function GoogleCalendarButton() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const link = document.createElement("link")
    link.rel = "stylesheet"
    link.href = "https://calendar.google.com/calendar/scheduling-button-script.css"
    document.head.appendChild(link)

    const script = document.createElement("script")
    script.src = "https://calendar.google.com/calendar/scheduling-button-script.js"
    script.async = true
    script.onload = () => {
      if (!containerRef.current || !window.calendar) return

      window.calendar.schedulingButton.load({
        url: "https://calendar.google.com/calendar/appointments/schedules/AcZssZ2GEdSIRiXNGs2UjuxM8qmbJ4KKwq0PU1-veJzukFJumxcOjPgTr-_HHhIt1C9SMqhzZPqllK5k?gv=true",
        color: "#4361ee",
        label: "Book Demo",
        target: containerRef.current,
      })

      // Override button styles to match site theme (gradient + full-width on mobile)
      setTimeout(() => {
        if (!containerRef.current) return
        const btn = containerRef.current.querySelector<HTMLElement>("a, button")
        if (!btn) return
        btn.style.background = "linear-gradient(to right, #4361ee, #8b5cf6)"
        btn.style.width = "100%"
        btn.style.maxWidth = "100%"
        btn.style.display = "flex"
        btn.style.justifyContent = "center"
        btn.style.alignItems = "center"
        btn.style.borderRadius = "12px"
        btn.style.padding = "14px 24px"
        btn.style.fontSize = "15px"
        btn.style.fontWeight = "700"
        btn.style.boxSizing = "border-box"
        btn.style.boxShadow = "0 4px 14px rgba(67, 97, 238, 0.35)"
        btn.style.transition = "box-shadow 0.2s ease, opacity 0.2s ease"
        btn.onmouseover = () => { btn.style.boxShadow = "0 6px 20px rgba(67, 97, 238, 0.5)" }
        btn.onmouseout = () => { btn.style.boxShadow = "0 4px 14px rgba(67, 97, 238, 0.35)" }
      }, 200)
    }
    document.body.appendChild(script)

    return () => {
      if (document.head.contains(link)) document.head.removeChild(link)
      if (document.body.contains(script)) document.body.removeChild(script)
    }
  }, [])

  return <div ref={containerRef} className="w-full" />
}

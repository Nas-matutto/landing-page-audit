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
      if (containerRef.current && window.calendar) {
        window.calendar.schedulingButton.load({
          url: "https://calendar.google.com/calendar/appointments/schedules/AcZssZ2GEdSIRiXNGs2UjuxM8qmbJ4KKwq0PU1-veJzukFJumxcOjPgTr-_HHhIt1C9SMqhzZPqllK5k?gv=true",
          color: "#039BE5",
          label: "Book an appointment",
          target: containerRef.current,
        })
      }
    }
    document.body.appendChild(script)

    return () => {
      if (document.head.contains(link)) document.head.removeChild(link)
      if (document.body.contains(script)) document.body.removeChild(script)
    }
  }, [])

  return <div ref={containerRef} className="flex justify-center" />
}

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

export function AuditForm() {
  const [formData, setFormData] = useState({
    url: "",
    name: "",
    email: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const res = await fetch("/api/submit-audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const result = await res.json()

      if (res.ok && result.status === "success") {
        alert("Thank you! We'll send your audit report shortly.")
        setFormData({ url: "", name: "", email: "" })
      } else {
        console.error(result)
        alert("Something went wrong — please try again.")
      }
    } catch (error) {
      console.error("Submission error:", error)
      alert("Network error — please try again!")
    }

    setIsSubmitting(false)
  }

  return (
    <Card className="mx-auto max-w-2xl border-blue-200 shadow-xl dark:border-blue-900">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold text-gray-900 dark:text-white">Get Your Free Audit</CardTitle>
        <CardDescription className="text-base text-gray-600 dark:text-gray-300">
          Enter your details below and we'll send you a comprehensive landing page audit within 24 hours
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="url" className="text-base font-medium text-gray-700 dark:text-gray-200">
              Landing Page URL *
            </Label>
            <Input
              id="url"
              type="url"
              placeholder="https://yourlandingpage.com"
              required
              value={formData.url}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              className="h-12 border-gray-300 text-base dark:border-gray-600"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="name" className="text-base font-medium text-gray-700 dark:text-gray-200">
              Name *
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="Your name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="h-12 border-gray-300 text-base dark:border-gray-600"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-base font-medium text-gray-700 dark:text-gray-200">
              Email *
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="you@company.com"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="h-12 border-gray-300 text-base dark:border-gray-600"
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="h-12 w-full bg-blue-600 text-base font-semibold hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            {isSubmitting ? "Submitting..." : "Get My Free Audit"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

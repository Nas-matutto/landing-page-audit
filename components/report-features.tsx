import { CheckCircle2 } from "lucide-react"

export function ReportFeatures() {
  const features = [
    "Conversion optimization opportunities ranked by impact",
    "Specific copy and design improvements with examples",
    "User experience issues that cause visitor drop-off",
    "Mobile responsiveness and performance recommendations",
  ]

  return (
    <div className="mx-auto max-w-4xl">
      <h2 className="text-center text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
        What Your Report Includes
      </h2>

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex items-start gap-4 rounded-lg border border-blue-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-blue-900 dark:bg-gray-800"
          >
            <CheckCircle2 className="h-6 w-6 flex-shrink-0 text-blue-600 dark:text-blue-400" />
            <p className="text-base leading-relaxed text-gray-700 dark:text-gray-200">{feature}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

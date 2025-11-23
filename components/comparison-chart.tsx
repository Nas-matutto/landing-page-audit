"use client"

import { Card } from "@/components/ui/card"

const metrics = [
  { name: "Clarity", icon: "💬", yourScore: 42, competitorScore: 89, gap: 47 },
  { name: "Speed", icon: "⚡", yourScore: 55, competitorScore: 92, gap: 37 },
  { name: "UX Design", icon: "✨", yourScore: 38, competitorScore: 87, gap: 49 },
  { name: "Page Layout", icon: "📐", yourScore: 48, competitorScore: 90, gap: 42 },
  { name: "CTA Strength", icon: "🎯", yourScore: 35, competitorScore: 85, gap: 50 },
  { name: "Credibility", icon: "🏆", yourScore: 51, competitorScore: 88, gap: 37 },
]

export function ComparisonChart() {
  return (
    <div className="mx-auto max-w-5xl">
      <div className="text-center mb-8 md:mb-12">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl md:text-4xl text-balance px-4">
          Benchmarked Against the Best with AI -{" "}
          <span className="text-blue-600 dark:text-blue-400">Not Pulled From Thin Air</span>
        </h2>
        <p className="mt-3 md:mt-4 text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto text-pretty px-4">
          We compare your messaging, UX, structure, speed, and conversion playbook against proven high-performing SaaS
          landing pages - so every recommendation is grounded in what's already working in the market
        </p>
      </div>

      <Card className="p-4 md:p-8 bg-white dark:bg-gray-800 shadow-xl border-blue-100 dark:border-blue-900">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-8 mb-6 md:mb-8 pb-4 md:pb-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <div className="h-3 w-8 rounded bg-blue-300"></div>
            <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">Your Landing Page</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-8 rounded bg-blue-600"></div>
            <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">Top Competitors</span>
          </div>
        </div>

        <div className="space-y-5 md:space-y-6">
          {metrics.map((metric, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-base md:text-lg">{metric.icon}</span>
                  <span className="font-semibold text-gray-900 dark:text-white text-xs sm:text-sm">{metric.name}</span>
                </div>
                <span className="text-[10px] sm:text-xs font-medium text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950 px-2 py-1 rounded whitespace-nowrap">
                  -{metric.gap} pts
                </span>
              </div>

              {/* Your Score Bar */}
              <div className="flex items-center gap-2 sm:gap-3">
                <span className="text-[10px] sm:text-xs font-medium text-gray-500 dark:text-gray-400 w-8 sm:w-12">
                  You
                </span>
                <div className="flex-1 bg-gray-100 dark:bg-gray-700 rounded-full h-7 md:h-8 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-blue-200 to-blue-300 h-full flex items-center justify-end pr-2 md:pr-3 transition-all duration-500 ease-out"
                    style={{ width: `${metric.yourScore}%` }}
                  >
                    <span className="text-[10px] sm:text-xs font-bold text-blue-900">{metric.yourScore}</span>
                  </div>
                </div>
              </div>

              {/* Competitor Score Bar */}
              <div className="flex items-center gap-2 sm:gap-3">
                <span className="text-[10px] sm:text-xs font-medium text-gray-500 dark:text-gray-400 w-8 sm:w-12">
                  Them
                </span>
                <div className="flex-1 bg-gray-100 dark:bg-gray-700 rounded-full h-7 md:h-8 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-blue-600 h-full flex items-center justify-end pr-2 md:pr-3 transition-all duration-500 ease-out"
                    style={{ width: `${metric.competitorScore}%` }}
                  >
                    <span className="text-[10px] sm:text-xs font-bold text-white">{metric.competitorScore}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}

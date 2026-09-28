import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "AI Learning Game — Free Tools | Talk to me Data",
  description:
    "AI Quest: a free pixel RPG where every battle is an AI trivia duel. Explore a pixel world and learn real AI concepts in your browser — no signup required.",
  alternates: {
    canonical: "https://talktomedata.com/free-tools/ai-learning-game",
  },
}

export default function AiLearningGameLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

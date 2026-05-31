import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Agent Workflow Mapper — Free Tools | Talk to me Data",
  description:
    "Describe your trigger, steps, and output. The mapper renders a diagram showing which steps an AI agent can automate — downloadable as PNG.",
  alternates: {
    canonical: "https://talktomedata.com/free-tools/workflow-mapper",
  },
}

export default function WorkflowMapperLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

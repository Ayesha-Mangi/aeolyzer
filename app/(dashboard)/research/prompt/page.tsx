"use client"

import { PlaceholderView } from "@/components/placeholder-view"
import { Terminal } from "lucide-react"

export default function PromptResearchPage() {
  return (
    <PlaceholderView
      title="Prompt Research"
      subtitle="Refine and evaluate system instructions, agents heuristics, and context profiles templates."
      category="Research"
      icon={Terminal}
      type="form"
    />
  )
}

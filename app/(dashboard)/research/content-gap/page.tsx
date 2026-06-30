"use client"

import { PlaceholderView } from "@/components/placeholder-view"
import { FileQuestion } from "lucide-react"

export default function ContentGapAnalysisPage() {
  return (
    <PlaceholderView
      title="Content Gap Analysis"
      subtitle="Analyze competitor site index keywords to identify topical authority content gaps."
      category="Research"
      icon={FileQuestion}
      type="list"
    />
  )
}

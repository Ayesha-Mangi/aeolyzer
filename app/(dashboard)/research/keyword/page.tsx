"use client"

import { PlaceholderView } from "@/components/placeholder-view"
import { Key } from "lucide-react"

export default function KeywordResearchPage() {
  return (
    <PlaceholderView
      title="Keyword Research"
      subtitle="Discover high-intent keyword opportunities, volume metrics, and competition metrics."
      category="Research"
      icon={Key}
      type="list"
    />
  )
}

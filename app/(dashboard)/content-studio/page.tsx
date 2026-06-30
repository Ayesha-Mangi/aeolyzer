"use client"

import { PlaceholderView } from "@/components/placeholder-view"
import { PenTool } from "lucide-react"

export default function ContentStudioPage() {
  return (
    <PlaceholderView
      title="Content Studio"
      subtitle="Craft, rewrite, and verify marketing copy and articles with context-informed AI writing assistants."
      category="Content"
      icon={PenTool}
      type="dashboard"
    />
  )
}

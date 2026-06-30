"use client"

import { PlaceholderView } from "@/components/placeholder-view"
import { Search } from "lucide-react"

export default function AeoInsightsPage() {
  return (
    <PlaceholderView
      title="AEO Insights"
      subtitle="Analyze AI Answer Engine Optimization (ChatGPT, Claude, Perplexity) mentions and citations visibility."
      category="Analytics"
      icon={Search}
      type="dashboard"
    />
  )
}

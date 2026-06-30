"use client"

import { PlaceholderView } from "@/components/placeholder-view"
import { Globe } from "lucide-react"

export default function SeoInsightsPage() {
  return (
    <PlaceholderView
      title="SEO Insights"
      subtitle="Analyze indexability, keyword performance, backlinks profile, and crawl warnings."
      category="Analytics"
      icon={Globe}
      type="dashboard"
    />
  )
}

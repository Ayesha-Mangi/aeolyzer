"use client"

import { PlaceholderView } from "@/components/placeholder-view"
import { ClipboardList } from "lucide-react"

export default function ReportsPage() {
  return (
    <PlaceholderView
      title="Compliance Reports"
      subtitle="Export PDF/CSV reports, inspect historic scores, and monitor compliance trends over time."
      category="Auditing"
      icon={ClipboardList}
      type="list"
    />
  )
}

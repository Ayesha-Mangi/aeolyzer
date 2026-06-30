"use client"

import { PlaceholderView } from "@/components/placeholder-view"
import { Bot } from "lucide-react"

export default function AgentsPage() {
  return (
    <PlaceholderView
      title="Agents Management"
      subtitle="Inspect and configure specialized AI agents (SEO, Performance, Security, Copywriter)."
      category="Automation"
      icon={Bot}
      type="list"
    />
  )
}

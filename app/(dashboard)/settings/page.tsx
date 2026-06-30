"use client"

import { PlaceholderView } from "@/components/placeholder-view"
import { Settings } from "lucide-react"

export default function SettingsPage() {
  return (
    <PlaceholderView
      title="Global Settings"
      subtitle="Manage scanning frequencies, configure crawlers rules, update LLM API keys, and update team members."
      category="Configuration"
      icon={Settings}
      type="form"
    />
  )
}

"use client"

import { PlaceholderView } from "@/components/placeholder-view"
import { GitBranch } from "lucide-react"

export default function WorkflowsPage() {
  return (
    <PlaceholderView
      title="Audit Workflows"
      subtitle="Chain agent execution blocks together to automate scheduled compliance and performance monitoring."
      category="Automation"
      icon={GitBranch}
      type="list"
    />
  )
}

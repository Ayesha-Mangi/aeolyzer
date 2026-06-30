"use client"

import { PlaceholderView } from "@/components/placeholder-view"
import { FileCheck } from "lucide-react"

export default function WebsiteAuditPage() {
  return (
    <PlaceholderView
      title="Website Audit"
      subtitle="Inspect specific domains, list crawled URLs, and discover critical SEO and accessibility issues."
      category="Auditing"
      icon={FileCheck}
      type="list"
    />
  )
}

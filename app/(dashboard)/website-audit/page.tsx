"use client"

import * as React from "react"
import {
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  Download,
  FileText,
  RefreshCw,
  Share2,
  ShieldCheck,
  Zap,
  Globe,
  CheckSquare
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Cell
} from "recharts"

// --- MOCK DATA ---
const auditData = {
  url: "https://example-saas.com",
  date: "Oct 24, 2026",
  duration: "4m 12s",
  pagesCrawled: 124,
  issuesFound: 42,
  status: "Completed",
}

const overviewScores = [
  { name: "Overall Score", value: 88, icon: Activity, color: "text-blue-500" },
  { name: "SEO Score", value: 92, icon: Globe, color: "text-green-500" },
  { name: "Performance", value: 76, icon: Zap, color: "text-yellow-500" },
  { name: "Accessibility", value: 95, icon: CheckSquare, color: "text-purple-500" },
  { name: "Security", value: 89, icon: ShieldCheck, color: "text-emerald-500" },
]

const issueDistribution = [
  { name: "SEO", count: 12, fill: "var(--color-1, #3b82f6)" },
  { name: "Performance", count: 18, fill: "var(--color-2, #10b981)" },
  { name: "Accessibility", count: 4, fill: "var(--color-3, #f59e0b)" },
  { name: "Security", count: 8, fill: "var(--color-4, #8b5cf6)" },
]

const technicalIssues = [
  { name: "Missing H1 Tag", severity: "High", description: "The homepage is missing an H1 tag.", status: "Unresolved", fix: "Add an H1 tag containing primary keywords." },
  { name: "Large Images", severity: "Medium", description: "Several images exceed 500KB.", status: "Unresolved", fix: "Compress images using WebP format." },
  { name: "Render-Blocking JS", severity: "High", description: "JavaScript blocks first paint.", status: "Unresolved", fix: "Defer or async script loading." },
  { name: "Low Contrast Text", severity: "Low", description: "Text contrast ratio is below 4.5:1.", status: "Resolved", fix: "Increase text color darkness." },
]

const recommendations = [
  { title: "Optimize Largest Contentful Paint (LCP)", description: "Your LCP is currently at 3.2s. Preload the hero image and defer non-critical CSS to bring it under 2.5s.", impact: "High", priority: "Critical" },
  { title: "Implement Structured Data", description: "Adding Organization and Product schema markup can improve rich snippet visibility in search results.", impact: "Medium", priority: "High" },
  { title: "Minify CSS & JS Files", description: "Remove unnecessary whitespace and comments from your static assets to reduce payload size.", impact: "Low", priority: "Medium" },
]

const performanceMetrics = [
  { name: "Core Web Vitals", value: 72 },
  { name: "Page Speed", value: 85 },
  { name: "Mobile Friendliness", value: 98 },
  { name: "Best Practices", value: 90 },
]

const timelineStages = [
  { stage: "Crawl Started", status: "completed" },
  { stage: "Pages Indexed", status: "completed" },
  { stage: "SEO Analysis", status: "completed" },
  { stage: "Content Analysis", status: "completed" },
  { stage: "Report Generated", status: "current" },
]
// -----------------

export default function WebsiteAuditPage() {
  return (
    <div className="flex flex-col gap-8 p-4 md:p-8 max-w-7xl mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header & Quick Actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Website Audit Report</h1>
          <p className="text-muted-foreground mt-1">Comprehensive analysis for {auditData.url}</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="outline" size="sm" className="hidden sm:flex"><RefreshCw className="mr-2" /> Re-run</Button>
          <Button variant="outline" size="sm" className="hidden sm:flex"><Share2 className="mr-2" /> Share</Button>
          <Button variant="outline" size="sm"><FileText className="mr-2" /> Export PDF</Button>
          <Button size="sm"><Download className="mr-2" /> Download Report</Button>
        </div>
      </div>

      {/* Website Information & Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 shadow-xs hover:shadow-sm transition-shadow">
          <CardHeader className="pb-4">
            <CardTitle>Audit Information</CardTitle>
            <CardDescription>Overview of the current audit session.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="space-y-1">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Target URL</p>
                <p className="text-sm font-medium truncate" title={auditData.url}>{auditData.url}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Date</p>
                <p className="text-sm font-medium">{auditData.date}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Crawled</p>
                <p className="text-sm font-medium">{auditData.pagesCrawled} pages</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Duration</p>
                <p className="text-sm font-medium">{auditData.duration}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-xs hover:shadow-sm transition-shadow">
          <CardHeader className="pb-4">
            <CardTitle>Audit Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {timelineStages.map((stage, i) => (
                <div key={i} className="flex items-center gap-3">
                  {stage.status === "completed" ? (
                    <CheckCircle className="size-4 text-primary" />
                  ) : (
                    <Clock className="size-4 text-muted-foreground animate-pulse" />
                  )}
                  <span className={`text-sm ${stage.status === "completed" ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                    {stage.stage}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Audit Overview */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
        {overviewScores.map((score, i) => {
          const Icon = score.icon
          return (
            <Card key={i} className="hover:scale-[1.02] transition-transform duration-200 shadow-xs border-muted/50">
              <CardContent className="p-5">
                <div className="flex items-center justify-between space-y-0 pb-2">
                  <p className="tracking-tight text-sm font-medium text-muted-foreground">
                    {score.name}
                  </p>
                  <Icon className={`size-4 ${score.color}`} />
                </div>
                <div className="flex flex-col gap-3 mt-2">
                  <div className="text-3xl font-bold">{score.value}</div>
                  <Progress value={score.value} className="h-1.5" />
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Issue Distribution Chart */}
        <Card className="shadow-xs hover:shadow-sm transition-shadow flex flex-col">
          <CardHeader>
            <CardTitle>Issue Distribution</CardTitle>
            <CardDescription>Breakdown of issues found by category.</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col">
            <div className="h-[250px] w-full mt-4 flex-1">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={issueDistribution} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                  <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                  <YAxis fontSize={12} tickLine={false} axisLine={false} tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                  <Tooltip
                    cursor={{ fill: 'hsl(var(--muted)/0.5)' }}
                    contentStyle={{ borderRadius: '8px', border: '1px solid hsl(var(--border))', background: 'hsl(var(--background))', color: 'hsl(var(--foreground))' }}
                  />
                  <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                    {issueDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Performance Summary */}
        <Card className="shadow-xs hover:shadow-sm transition-shadow">
          <CardHeader>
            <CardTitle>Performance Summary</CardTitle>
            <CardDescription>Key performance indicators and metrics.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 mt-4">
            {performanceMetrics.map((metric, i) => (
              <div key={i} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{metric.name}</span>
                  <span className="text-muted-foreground">{metric.value}%</span>
                </div>
                <Progress value={metric.value} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Technical SEO Issues */}
      <Card className="overflow-hidden shadow-xs hover:shadow-sm transition-shadow">
        <CardHeader>
          <CardTitle>Technical SEO Issues</CardTitle>
          <CardDescription>Detailed list of technical issues found during the crawl.</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-muted/30">
              <TableRow>
                <TableHead className="w-[200px] pl-6 h-12">Issue Name</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead className="hidden md:table-cell">Description</TableHead>
                <TableHead className="hidden lg:table-cell">Suggested Fix</TableHead>
                <TableHead className="pr-6">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {technicalIssues.map((issue, i) => (
                <TableRow key={i} className="hover:bg-muted/20">
                  <TableCell className="font-medium pl-6 py-4">{issue.name}</TableCell>
                  <TableCell>
                    <Badge variant={issue.severity === "High" ? "destructive" : issue.severity === "Medium" ? "secondary" : "outline"} className="shadow-none">
                      {issue.severity}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-muted-foreground py-4 max-w-[200px] truncate" title={issue.description}>
                    {issue.description}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell text-muted-foreground py-4 max-w-[200px] truncate" title={issue.fix}>
                    {issue.fix}
                  </TableCell>
                  <TableCell className="pr-6 py-4">
                    {issue.status === "Resolved" ? (
                      <span className="flex items-center text-emerald-600 dark:text-emerald-500 text-sm font-medium"><CheckCircle className="mr-1.5 size-4" /> Resolved</span>
                    ) : (
                      <span className="flex items-center text-amber-600 dark:text-amber-500 text-sm font-medium"><AlertTriangle className="mr-1.5 size-4" /> Unresolved</span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card className="shadow-xs hover:shadow-sm transition-shadow mb-8">
        <CardHeader>
          <CardTitle>Recommendations</CardTitle>
          <CardDescription>Actionable steps to improve your website's overall score.</CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {recommendations.map((rec, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-b-muted">
                <AccordionTrigger className="hover:no-underline hover:bg-muted/30 px-4 rounded-lg transition-colors py-4 my-1">
                  <div className="flex items-center gap-4 text-left">
                    <div className="p-2 bg-primary/10 rounded-full shrink-0">
                      <Zap className="size-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm">{rec.title}</h4>
                      <p className="text-xs text-muted-foreground font-normal mt-1">
                        Priority: <span className="font-medium text-foreground">{rec.priority}</span>
                      </p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pt-2 pb-6 text-muted-foreground leading-relaxed">
                  <p className="ml-[3.25rem]">{rec.description}</p>
                  <div className="ml-[3.25rem] mt-4 inline-flex items-center text-xs font-medium bg-muted px-2.5 py-1 rounded-md text-foreground border border-border">
                    Expected Impact: {rec.impact}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

    </div>
  )
}

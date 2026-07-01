"use client"

import * as React from "react"
import {
  ClipboardList,
  Search,
  Filter,
  Download,
  Printer,
  Share2,
  Copy,
  TrendingUp,
  FileCheck,
  FileText,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Plus
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from "recharts"

// --- MOCK DATA ---
const overviewMetrics = [
  { name: "Total Reports", value: "128", change: "+12 this month", icon: ClipboardList, color: "text-blue-500", bgIcon: "text-blue-500/5" },
  { name: "Recent Audits", value: "34", change: "+5 this week", icon: FileCheck, color: "text-emerald-500", bgIcon: "text-emerald-500/5" },
  { name: "Generated PDFs", value: "86", change: "+20 this month", icon: FileText, color: "text-purple-500", bgIcon: "text-purple-500/5" },
  { name: "Success Rate", value: "98.5%", change: "Target met", icon: CheckCircle2, color: "text-amber-500", bgIcon: "text-amber-500/5" },
]

const reportsData = [
  { name: "Q3 Full Site Audit", website: "example-saas.com", date: "Oct 24, 2026", type: "Technical SEO", status: "Ready", score: 92 },
  { name: "Competitor Analysis", website: "competitor.io", date: "Oct 22, 2026", type: "Content Gap", status: "Ready", score: 85 },
  { name: "Weekly Performance", website: "example-saas.com", date: "Oct 18, 2026", type: "Performance", status: "Ready", score: 78 },
  { name: "Backlink Profile", website: "example-saas.com", date: "Oct 15, 2026", type: "Off-Page", status: "Generating", score: 0 },
  { name: "Content Audit 2026", website: "blog.example.com", date: "Oct 10, 2026", type: "Content", status: "Ready", score: 65 },
]

const chartData = [
  { month: "May", generated: 12 },
  { month: "Jun", generated: 18 },
  { month: "Jul", generated: 25 },
  { month: "Aug", generated: 22 },
  { month: "Sep", generated: 35 },
  { month: "Oct", generated: 42 },
]

const aiInsights = [
  { insight: "Consolidate Technical Reports", description: "You are generating multiple technical SEO reports weekly. Consider combining them into a single comprehensive bi-weekly executive summary.", impact: "Time-saving", priority: "Medium" },
  { insight: "Improve Overall Score Trend", description: "Your average audit score has dropped from 88 to 78 in the last month due to Core Web Vitals changes. Prioritize performance audits.", impact: "High", priority: "High" },
]

const timelineStages = [
  { stage: "Audit Completed", time: "Oct 24, 10:30 AM", status: "completed" },
  { stage: "Report Generated", time: "Oct 24, 10:32 AM", status: "completed" },
  { stage: "PDF Exported", time: "Oct 24, 10:35 AM", status: "completed" },
  { stage: "Report Shared via Email", time: "Pending", status: "current" },
]
// -----------------

export default function ReportsPage() {
  const [isLoading, setIsLoading] = React.useState(true)
  const [searchQuery, setSearchQuery] = React.useState("")

  React.useEffect(() => {
    // Simulate loading state
    const timer = setTimeout(() => setIsLoading(false), 900)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="flex flex-col gap-8 p-6 md:p-10 max-w-[1600px] mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
      
      {/* Workspace Header */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground flex items-center gap-3">
            <div className="p-2.5 bg-primary/10 rounded-xl">
              <ClipboardList className="size-7 text-primary" />
            </div>
            Reports Center
          </h1>
          <p className="text-muted-foreground mt-2 text-base">Generate, view, and share comprehensive AI-driven SEO reports.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="outline" size="sm" className="rounded-xl h-10 px-4 hover:bg-muted/50 transition-all"><Printer className="mr-2 size-4" /> Print</Button>
          <Button variant="outline" size="sm" className="rounded-xl h-10 px-4 hover:bg-muted/50 transition-all"><Download className="mr-2 size-4" /> Export All</Button>
          <Button size="sm" className="rounded-xl h-10 px-5 shadow-sm hover:shadow transition-all"><Plus className="mr-2 size-4" /> New Report</Button>
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="animate-pulse bg-muted/30 border border-border/40 rounded-2xl h-[130px]" />
            ))}
          </div>
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2 animate-pulse bg-muted/30 border border-border/40 rounded-2xl h-[500px]" />
            <div className="xl:col-span-1 animate-pulse bg-muted/30 border border-border/40 rounded-2xl h-[500px]" />
          </div>
        </div>
      ) : (
        <div className="space-y-8 animate-in fade-in duration-700 delay-150 fill-mode-both">
          
          {/* Overview Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {overviewMetrics.map((metric, i) => {
              const Icon = metric.icon
              return (
                <Card key={i} className="shadow-sm border-border/40 hover:border-border/80 hover:shadow-md transition-all duration-300 rounded-2xl overflow-hidden relative bg-card/50 backdrop-blur-xl">
                  <Icon className={`absolute -bottom-4 -right-4 size-28 ${metric.bgIcon} -rotate-12 pointer-events-none`} strokeWidth={1} />
                  <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0 relative z-10">
                    <CardTitle className="text-sm font-semibold text-muted-foreground tracking-tight">{metric.name}</CardTitle>
                    <div className="p-2 bg-muted/40 rounded-lg">
                      <Icon className={`size-4 ${metric.color}`} />
                    </div>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <div className="text-3xl font-bold tracking-tight text-foreground">{metric.value}</div>
                    <p className="text-xs text-muted-foreground font-medium mt-1">{metric.change}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            
            {/* Reports Library Table */}
            <Card className="xl:col-span-2 shadow-sm border-border/40 hover:shadow-md transition-all duration-300 rounded-2xl flex flex-col overflow-hidden bg-card/50 backdrop-blur-xl">
              <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-border/20">
                <div>
                  <CardTitle className="text-lg font-semibold tracking-tight">Reports Library</CardTitle>
                  <CardDescription>All generated reports and their statuses.</CardDescription>
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <div className="relative w-full sm:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      type="search" 
                      placeholder="Search reports..." 
                      className="pl-9 h-9 bg-muted/20 border-border/40 rounded-lg focus-visible:bg-background" 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Button variant="outline" size="icon" className="shrink-0 h-9 w-9 rounded-lg border-border/40"><Filter className="size-4" /></Button>
                </div>
              </CardHeader>
              <CardContent className="p-0 flex-1 overflow-x-auto">
                <Table>
                  <TableHeader className="bg-muted/10">
                    <TableRow className="hover:bg-transparent border-border/20">
                      <TableHead className="pl-6 h-11 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Report Name</TableHead>
                      <TableHead className="h-11 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Type</TableHead>
                      <TableHead className="h-11 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Date</TableHead>
                      <TableHead className="h-11 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Score</TableHead>
                      <TableHead className="h-11 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Status</TableHead>
                      <TableHead className="pr-6 h-11 text-xs font-semibold uppercase tracking-wider text-muted-foreground"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {reportsData.filter(r => r.name.toLowerCase().includes(searchQuery.toLowerCase())).length === 0 ? (
                      <TableRow className="hover:bg-transparent">
                        <TableCell colSpan={6} className="h-48 text-center">
                          <div className="flex flex-col items-center justify-center text-muted-foreground">
                            <ClipboardList className="size-8 mb-3 opacity-20" />
                            <p>No reports found matching "{searchQuery}".</p>
                          </div>
                        </TableCell>
                      </TableRow>
                    ) : (
                      reportsData.filter(r => r.name.toLowerCase().includes(searchQuery.toLowerCase())).map((row, i) => (
                        <TableRow key={i} className="hover:bg-muted/20 transition-colors border-border/20 group cursor-pointer">
                          <TableCell className="pl-6 py-4">
                            <p className="font-semibold text-foreground tracking-tight">{row.name}</p>
                            <p className="text-xs text-muted-foreground mt-0.5">{row.website}</p>
                          </TableCell>
                          <TableCell className="py-4">
                            <Badge variant="outline" className="font-medium text-[11px] rounded-md px-2 py-0.5 bg-muted/50 border-border/60">
                              {row.type}
                            </Badge>
                          </TableCell>
                          <TableCell className="py-4 text-muted-foreground font-medium text-sm">{row.date}</TableCell>
                          <TableCell className="py-4">
                            {row.score > 0 ? (
                              <div className="flex items-center gap-2">
                                <span className={`text-sm font-bold ${row.score >= 90 ? 'text-emerald-500' : row.score >= 70 ? 'text-amber-500' : 'text-rose-500'}`}>{row.score}</span>
                                <Progress value={row.score} className={`w-12 h-1.5 bg-muted [&>div]:${row.score >= 90 ? 'bg-emerald-500' : row.score >= 70 ? 'bg-amber-500' : 'bg-rose-500'}`} />
                              </div>
                            ) : (
                              <span className="text-sm text-muted-foreground">-</span>
                            )}
                          </TableCell>
                          <TableCell className="py-4">
                            <Badge variant="secondary" className={`font-medium text-xs shadow-none rounded-md px-2 py-0.5 border ${row.status === 'Ready' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20' : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20'}`}>
                              {row.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="pr-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-all">
                              <Button variant="ghost" size="icon" className="size-8 rounded-md hover:bg-muted"><Download className="size-4 text-muted-foreground" /></Button>
                              <Button variant="ghost" size="icon" className="size-8 rounded-md hover:bg-muted"><Share2 className="size-4 text-muted-foreground" /></Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Side Panel */}
            <div className="xl:col-span-1 space-y-8">
              
              {/* Report Analytics */}
              <Card className="shadow-sm border-border/40 hover:shadow-md transition-all duration-300 rounded-2xl overflow-hidden bg-card/50 backdrop-blur-xl flex flex-col">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-semibold tracking-tight">Reports Generated</CardTitle>
                  <CardDescription>Volume of reports generated over time.</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 px-4 pb-6">
                  <div className="h-[220px] w-full mt-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={chartData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" strokeOpacity={0.4} vertical={false} />
                        <XAxis dataKey="month" fontSize={12} tickLine={false} axisLine={false} tick={{ fill: 'hsl(var(--muted-foreground))' }} dy={10} />
                        <YAxis fontSize={12} tickLine={false} axisLine={false} tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                        <Tooltip 
                          cursor={{ fill: 'hsl(var(--muted)/0.5)' }}
                          contentStyle={{ borderRadius: '12px', border: '1px solid hsl(var(--border))', background: 'hsl(var(--background)/0.95)', backdropFilter: 'blur(8px)', color: 'hsl(var(--foreground))', boxShadow: '0 4px 20px -2px rgba(0,0,0,0.1)' }}
                          itemStyle={{ color: 'hsl(var(--foreground))', fontWeight: 500 }}
                        />
                        <Bar dataKey="generated" radius={[6, 6, 0, 0]} maxBarSize={40}>
                          {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill="hsl(var(--primary))" fillOpacity={0.8 + (index * 0.04)} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Activity Timeline */}
              <Card className="shadow-sm border-border/40 hover:shadow-md transition-all duration-300 rounded-2xl overflow-hidden bg-card/50 backdrop-blur-xl">
                <CardHeader className="pb-4 border-b border-border/10 bg-muted/5">
                  <CardTitle className="text-lg font-semibold tracking-tight">Recent Activity</CardTitle>
                </CardHeader>
                <CardContent className="pt-6 pb-6">
                  <div className="space-y-5 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border/60 before:to-transparent">
                    {timelineStages.map((stage, i) => (
                      <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-background bg-muted text-muted-foreground shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 transition-colors">
                          {stage.status === "completed" ? (
                            <CheckCircle2 className="size-5 text-emerald-500" />
                          ) : (
                            <div className="size-2.5 rounded-full bg-primary animate-pulse" />
                          )}
                        </div>
                        <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-muted/30 p-3 rounded-xl border border-border/40 shadow-sm">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className={`font-semibold text-sm ${stage.status === 'completed' ? 'text-foreground' : 'text-primary'}`}>{stage.stage}</h4>
                          </div>
                          <div className="text-xs font-medium text-muted-foreground">{stage.time}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* AI Report Insights */}
              <Card className="shadow-sm border-border/40 hover:shadow-md transition-all duration-300 rounded-2xl overflow-hidden bg-card/50 backdrop-blur-xl">
                <CardHeader className="pb-3 border-b border-border/10 bg-muted/5">
                  <CardTitle className="text-lg font-semibold tracking-tight flex items-center gap-2">
                    <Lightbulb className="size-4.5 text-amber-500" /> Reporting Insights
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <Accordion type="single" collapsible className="w-full">
                    {aiInsights.map((insight, i) => (
                      <AccordionItem key={i} value={`insight-${i}`} className="border-b-border/30 last:border-0">
                        <AccordionTrigger className="hover:no-underline hover:bg-muted/20 px-5 rounded-xl transition-colors py-4 my-0.5 group">
                          <div className="flex items-center gap-3 text-left">
                            <div>
                              <h4 className="font-semibold text-sm tracking-tight text-foreground group-hover:text-primary transition-colors">{insight.insight}</h4>
                              <Badge variant="outline" className={`mt-1.5 text-[10px] uppercase tracking-wider py-0 px-1.5 h-4 rounded-sm ${insight.priority === 'High' ? 'border-amber-500/30 text-amber-600 dark:text-amber-400 bg-amber-500/5' : 'border-blue-500/30 text-blue-600 dark:text-blue-400 bg-blue-500/5'}`}>
                                {insight.impact}
                              </Badge>
                            </div>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-5 pt-0 pb-5 text-muted-foreground leading-relaxed text-sm">
                          <p>{insight.description}</p>
                          <Button size="sm" variant="outline" className="mt-4 h-8 text-xs rounded-lg w-full">Apply Recommendation</Button>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>

            </div>
          </div>
        </div>
      )}
    </div>
  )
}

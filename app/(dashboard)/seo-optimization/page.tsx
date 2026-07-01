"use client"

import React, { useState, useEffect } from "react"
import { 
  Sparkles, ShieldAlert, CheckCircle, AlertTriangle, Play, RefreshCw, Download, 
  ChevronDown, ChevronRight, BarChart2, Calendar, FileText, ArrowUpRight, Search, 
  HelpCircle, CheckCircle2, Flame, Heart, AlertCircle, Compass, HelpCircle as InfoIcon
} from "lucide-react"

// UI Imports
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart"
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts"

// Mock SEO score summary
const MOCK_SEO_SCORES = {
  overall: 82,
  technical: 78,
  onPage: 88,
  content: 85,
  performance: 72,
}

// Mock Checklist Items
const MOCK_CHECKLIST = [
  { name: "Meta Titles", status: "completed", message: "All page title tags optimized and within limit (50-60 chars)" },
  { name: "Meta Descriptions", status: "warning", message: "4 pages contain meta descriptions exceeding recommended length" },
  { name: "Heading Structure", status: "completed", message: "Strict single H1 hierarchy enforced across primary modules" },
  { name: "Image Alt Text", status: "pending", message: "12 images on documentation routes are missing alt elements" },
  { name: "Internal Links", status: "completed", message: "Clean entity graph and link relationships detected" },
  { name: "External Links", status: "completed", message: "All outbound link profiles contain secure targets" },
  { name: "Broken Links", status: "warning", message: "2 legacy paths redirecting to invalid /blog/archives subroutes" },
  { name: "Canonical URLs", status: "completed", message: "Self-referencing canonical attributes mapped correctly" },
  { name: "Robots.txt", status: "completed", message: "Directives for user-agents and sitemap indexing verified" },
  { name: "XML Sitemap", status: "completed", message: "Automatic dynamic sitemap registration confirmed with Googlebot" },
]

// Mock Keyword Optimization
const MOCK_KEYWORDS_OP = [
  { query: "answer engine optimization platform", volume: 2400, difficulty: "Medium", position: 2, opportunity: 94, status: "Optimized" },
  { query: "best aeo tools for developers", volume: 1800, difficulty: "Easy", position: 1, opportunity: 91, status: "Optimized" },
  { query: "ai search optimization nextjs", volume: 3200, difficulty: "Hard", position: 4, opportunity: 88, status: "In Progress" },
  { query: "perplexity citations tracker", volume: 900, difficulty: "Medium", position: 3, opportunity: 85, status: "In Progress" },
  { query: "structured schema dynamic builder", volume: 1400, difficulty: "Hard", position: 12, opportunity: 72, status: "Needs Action" },
]

// Technical Metrics
const MOCK_TECHNICAL = [
  { name: "Core Web Vitals", value: 92, status: "Optimal" },
  { name: "Mobile Friendliness", value: 98, status: "Optimal" },
  { name: "Page Speed", value: 74, status: "Needs Improvement" },
  { name: "HTTPS Security", value: 100, status: "Optimal" },
  { name: "Structured Data", value: 85, status: "Optimal" },
  { name: "Schema Markup", value: 90, status: "Optimal" },
  { name: "Crawlability Index", value: 80, status: "Optimal" },
]

// AI SEO Recommendations
const MOCK_AI_RECOMMENDATIONS = [
  {
    id: "rec-1",
    recommendation: "Inject Entity Schema Markup",
    description: "Provide explicit JSON-LD mappings linking your brand entity with standard AEO target schemas on the homepage.",
    priority: "High",
    impact: "High Impact",
    difficulty: "Low",
  },
  {
    id: "rec-2",
    recommendation: "Improve Page Speed (LCP)",
    description: "Compress dynamic banner images in Content Studio, and defer unused CSS loading blockages to speed up mobile paint times.",
    priority: "High",
    impact: "High Impact",
    difficulty: "Medium",
  },
  {
    id: "rec-3",
    recommendation: "Audit documentation internal links",
    description: "Connect isolated documentation assets (orphan pages) back to corresponding landing guides.",
    priority: "Medium",
    impact: "Medium Impact",
    difficulty: "Low",
  },
  {
    id: "rec-4",
    recommendation: "Optimize missing Alt tag descriptors",
    description: "Scan images across legacy articles and write descriptive target keyword details into the alt attribute.",
    priority: "Low",
    impact: "Low Impact",
    difficulty: "Low",
  }
]

// Summary Trend (Lightweight Chart)
const MOCK_TREND = [
  { week: "Wk 1", score: 76 },
  { week: "Wk 2", score: 77 },
  { week: "Wk 3", score: 79 },
  { week: "Wk 4", score: 81 },
  { week: "Wk 5", score: 82 },
]

export default function SeoOptimizationPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<"all" | "completed" | "issues">("all")
  const [keywordSearch, setKeywordSearch] = useState("")
  const [expandedRec, setExpandedRec] = useState<string | null>("rec-1")

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 800)
    return () => clearTimeout(timer)
  }, [])

  const handleRunScan = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 800)
  }

  // Filter Checklist Items
  const filteredChecklist = MOCK_CHECKLIST.filter(item => {
    if (activeTab === "completed") return item.status === "completed"
    if (activeTab === "issues") return item.status === "warning" || item.status === "pending"
    return true
  })

  // Filter Keywords
  const filteredKeywords = MOCK_KEYWORDS_OP.filter(kw => {
    return kw.query.toLowerCase().includes(keywordSearch.toLowerCase())
  })

  const trendChartConfig = {
    score: { label: "SEO Health Score", color: "var(--chart-1)" }
  }

  return (
    <div className="flex-1 space-y-6 p-6 md:p-8">
      {/* Header Section */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-foreground via-foreground/90 to-muted-foreground bg-clip-text">
            SEO Optimization Center
          </h1>
          <p className="text-muted-foreground">
            Analyze metadata structures, inspect crawls indices, dynamic headings schema, and key SEO opportunities.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" size="icon" onClick={handleRunScan} title="Refresh Analysis">
            <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
          </Button>

          <Button variant="outline" className="gap-2" onClick={handleRunScan}>
            <Play className="h-4 w-4 text-emerald-500 fill-emerald-500" />
            <span>Run Scan</span>
          </Button>

          <Button className="gap-2 bg-primary hover:bg-primary/95 text-primary-foreground font-medium shadow-md transition-all">
            <Sparkles className="h-4 w-4" />
            Generate Recommendations
          </Button>
        </div>
      </div>

      {isLoading ? (
        // Loading State / Skeletons
        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {[1, 2, 3, 4, 5].map(i => (
              <Card key={i}>
                <CardContent className="pt-6 space-y-3">
                  <Skeleton className="h-4 w-[80px]" />
                  <Skeleton className="h-8 w-[60px]" />
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <Card className="md:col-span-2">
              <CardHeader>
                <Skeleton className="h-6 w-[200px]" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-[250px] w-full" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-[150px]" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-[250px] w-full" />
              </CardContent>
            </Card>
          </div>
        </div>
      ) : (
        // Main Dashboard View
        <div className="space-y-6">

          {/* Section 1: SEO Health Overview */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {/* Overall SEO Score */}
            <Card className="relative overflow-hidden transition-all hover:shadow-md hover:border-primary/20">
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-indigo-500 via-purple-500 to-transparent" />
              <CardHeader className="pb-2 space-y-0.5">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Overall Score</span>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-baseline justify-between">
                  <span className="text-3xl font-bold">{MOCK_SEO_SCORES.overall}%</span>
                  <Badge variant="outline" className="border-emerald-500/30 text-emerald-600 dark:text-emerald-400 bg-emerald-500/5">Optimal</Badge>
                </div>
                <Progress value={MOCK_SEO_SCORES.overall} className="h-1.5" />
              </CardContent>
            </Card>

            {/* Technical SEO Score */}
            <Card className="relative overflow-hidden transition-all hover:shadow-md hover:border-primary/20">
              <CardHeader className="pb-2 space-y-0.5">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Technical</span>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-baseline justify-between">
                  <span className="text-3xl font-bold">{MOCK_SEO_SCORES.technical}%</span>
                  <Badge variant="outline" className="border-amber-500/30 text-amber-600 dark:text-amber-400 bg-amber-500/5">Warning</Badge>
                </div>
                <Progress value={MOCK_SEO_SCORES.technical} className="h-1.5" />
              </CardContent>
            </Card>

            {/* On-Page SEO Score */}
            <Card className="relative overflow-hidden transition-all hover:shadow-md hover:border-primary/20">
              <CardHeader className="pb-2 space-y-0.5">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">On-Page</span>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-baseline justify-between">
                  <span className="text-3xl font-bold">{MOCK_SEO_SCORES.onPage}%</span>
                  <Badge variant="outline" className="border-emerald-500/30 text-emerald-600 dark:text-emerald-400 bg-emerald-500/5">Optimal</Badge>
                </div>
                <Progress value={MOCK_SEO_SCORES.onPage} className="h-1.5" />
              </CardContent>
            </Card>

            {/* Content Score */}
            <Card className="relative overflow-hidden transition-all hover:shadow-md hover:border-primary/20">
              <CardHeader className="pb-2 space-y-0.5">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Content Quality</span>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-baseline justify-between">
                  <span className="text-3xl font-bold">{MOCK_SEO_SCORES.content}%</span>
                  <Badge variant="outline" className="border-emerald-500/30 text-emerald-600 dark:text-emerald-400 bg-emerald-500/5">Optimal</Badge>
                </div>
                <Progress value={MOCK_SEO_SCORES.content} className="h-1.5" />
              </CardContent>
            </Card>

            {/* Performance Score */}
            <Card className="relative overflow-hidden transition-all hover:shadow-md hover:border-primary/20">
              <CardHeader className="pb-2 space-y-0.5">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Performance</span>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-baseline justify-between">
                  <span className="text-3xl font-bold">{MOCK_SEO_SCORES.performance}%</span>
                  <Badge variant="outline" className="border-amber-500/30 text-amber-600 dark:text-amber-400 bg-amber-500/5">Warning</Badge>
                </div>
                <Progress value={MOCK_SEO_SCORES.performance} className="h-1.5" />
              </CardContent>
            </Card>
          </div>

          {/* Section 7 & 4: Overview Chart and Technical Details */}
          <div className="grid gap-6 md:grid-cols-3">
            {/* Overview Trend Line Chart */}
            <Card className="md:col-span-2">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>SEO Progress Summary</CardTitle>
                  <CardDescription>Overall optimization crawl index and health trend (Weekly)</CardDescription>
                </div>
                <Badge variant="secondary" className="font-mono bg-emerald-500/10 text-emerald-700 dark:text-emerald-400">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  +6% overall gain
                </Badge>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="h-[200px] w-full">
                  <ChartContainer config={trendChartConfig}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={MOCK_TREND} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-border/50" />
                        <XAxis dataKey="week" className="text-muted-foreground" />
                        <YAxis domain={[50, 100]} className="text-muted-foreground" />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar 
                          dataKey="score" 
                          fill="var(--color-score)" 
                          radius={[4, 4, 0, 0]}
                          maxBarSize={30}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>

            {/* Technical SEO Detail List */}
            <Card>
              <CardHeader>
                <CardTitle>Technical Performance</CardTitle>
                <CardDescription>Crawl compliance & core web vital metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {MOCK_TECHNICAL.map((metric, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground font-medium">{metric.name}</span>
                      <span className="font-mono font-semibold">{metric.value}%</span>
                    </div>
                    <Progress value={metric.value} className="h-1.5" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Checklist & Keywords */}
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Optimization Checklist */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <CardTitle>Optimization Checklist</CardTitle>
                    <CardDescription>Check off essential layout meta items and document constraints</CardDescription>
                  </div>
                  <div className="flex bg-muted p-0.5 rounded-lg text-xs">
                    <button 
                      onClick={() => setActiveTab("all")} 
                      className={`px-3 py-1.5 rounded-md font-semibold transition-all ${activeTab === "all" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"}`}
                    >
                      All
                    </button>
                    <button 
                      onClick={() => setActiveTab("completed")} 
                      className={`px-3 py-1.5 rounded-md font-semibold transition-all ${activeTab === "completed" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"}`}
                    >
                      Completed
                    </button>
                    <button 
                      onClick={() => setActiveTab("issues")} 
                      className={`px-3 py-1.5 rounded-md font-semibold transition-all ${activeTab === "issues" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"}`}
                    >
                      Issues
                    </button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 max-h-[350px] overflow-y-auto pr-1">
                {filteredChecklist.map((item, idx) => (
                  <div 
                    key={idx} 
                    className="flex items-start justify-between p-3 rounded-lg border border-border/50 bg-background/50 hover:bg-background/80 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5">
                        {item.status === "completed" && <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0" />}
                        {item.status === "warning" && <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0" />}
                        {item.status === "pending" && <AlertCircle className="h-4 w-4 text-rose-500 shrink-0" />}
                      </div>
                      <div>
                        <p className="font-medium text-sm">{item.name}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{item.message}</p>
                      </div>
                    </div>
                    <Badge 
                      variant="outline" 
                      className={`capitalize ${
                        item.status === "completed" 
                          ? "border-emerald-500/20 text-emerald-600 bg-emerald-500/5" 
                          : item.status === "warning"
                          ? "border-amber-500/20 text-amber-600 bg-amber-500/5"
                          : "border-rose-500/20 text-rose-600 bg-rose-500/5"
                      }`}
                    >
                      {item.status}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* AI SEO Recommendations */}
            <Card className="flex flex-col">
              <CardHeader>
                <div className="flex items-center gap-2 text-primary">
                  <Sparkles className="h-4.5 w-4.5" />
                  <span className="text-xs font-bold uppercase tracking-wider">AI SEO Auditor</span>
                </div>
                <CardTitle className="text-lg mt-1">SEO Recommendations</CardTitle>
                <CardDescription>Top tasks prioritized to optimize crawl presence</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 flex-1 overflow-y-auto max-h-[350px]">
                {MOCK_AI_RECOMMENDATIONS.map((rec) => {
                  const isExpanded = expandedRec === rec.id
                  return (
                    <div 
                      key={rec.id}
                      className="border border-border/50 rounded-lg overflow-hidden transition-all"
                    >
                      <button
                        onClick={() => setExpandedRec(isExpanded ? null : rec.id)}
                        className="w-full flex items-center justify-between p-3 bg-muted/40 hover:bg-muted/70 text-left text-xs font-semibold"
                      >
                        <span>{rec.recommendation}</span>
                        <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                      </button>
                      {isExpanded && (
                        <div className="p-3 text-xs space-y-2 border-t border-border/50 bg-background/50">
                          <p className="text-muted-foreground">{rec.description}</p>
                          <div className="flex items-center justify-between pt-1 text-[10px]">
                            <Badge variant="secondary" className="bg-primary/10 text-primary">{rec.priority} Priority</Badge>
                            <span className="text-emerald-500 font-medium">{rec.impact}</span>
                            <span className="text-muted-foreground">Difficulty: {rec.difficulty}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </CardContent>
            </Card>
          </div>

          {/* Section 3: Keyword Optimization Table */}
          <Card>
            <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardTitle>Keyword Optimization</CardTitle>
                <CardDescription>Indexed opportunity scores compared against search volumes and target positions</CardDescription>
              </div>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
                <Input
                  placeholder="Search target query..."
                  value={keywordSearch}
                  onChange={(e) => setKeywordSearch(e.target.value)}
                  className="pl-8 h-8 w-[200px]"
                />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {filteredKeywords.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-8 text-center text-muted-foreground">
                  <p className="font-semibold text-sm">No keyword matches</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Target Keyword</TableHead>
                        <TableHead className="w-[120px] text-right">Search Volume</TableHead>
                        <TableHead className="w-[100px]">Difficulty</TableHead>
                        <TableHead className="w-[100px] text-right">Position</TableHead>
                        <TableHead className="w-[120px] text-right">Opportunity Score</TableHead>
                        <TableHead className="w-[120px]">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredKeywords.map((kw, idx) => (
                        <TableRow key={idx} className="group">
                          <TableCell className="font-medium group-hover:text-primary transition-colors">{kw.query}</TableCell>
                          <TableCell className="text-right font-mono text-sm">{kw.volume.toLocaleString()}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="capitalize">{kw.difficulty}</Badge>
                          </TableCell>
                          <TableCell className="text-right font-mono text-indigo-500">#{kw.position}</TableCell>
                          <TableCell className="text-right font-mono font-semibold text-emerald-500">{kw.opportunity}/100</TableCell>
                          <TableCell>
                            <Badge 
                              variant="secondary" 
                              className={
                                kw.status === "Optimized" 
                                  ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
                                  : kw.status === "In Progress"
                                  ? "bg-amber-500/10 text-amber-700 dark:text-amber-400"
                                  : "bg-muted text-muted-foreground"
                              }
                            >
                              {kw.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>

        </div>
      )}
    </div>
  )
}

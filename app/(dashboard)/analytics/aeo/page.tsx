"use client"

import React, { useState, useEffect } from "react"
import { 
  Search, Brain, Calendar, ArrowUpRight, ArrowDownRight, Globe, CheckCircle, 
  ExternalLink, Sparkles, Filter, RefreshCw, Download, FileText, ChevronRight,
  TrendingUp, Award, Network, MessageSquare, HelpCircle
} from "lucide-react"

// UI Imports
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardAction } from "@/components/ui/card"
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
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent
} from "@/components/ui/chart"
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, PieChart, Pie, Cell, LineChart, Line } from "recharts"

// Mock Data
const MOCK_AEO_STATS = {
  visibilityScore: 78.4,
  visibilityChange: 5.2,
  citationScore: 82.1,
  citationChange: 8.4,
  aiMentions: 1420,
  aiMentionsChange: 12.3,
  answerCoverage: 64.5,
  answerCoverageChange: 3.1,
  knowledgeGraphPresence: 88,
}

const MOCK_SOURCE_DISTRIBUTION = [
  { name: "ChatGPT (Search)", value: 450, color: "#10B981" },
  { name: "Claude (Artifacts)", value: 380, color: "#3B82F6" },
  { name: "Perplexity", value: 320, color: "#8B5CF6" },
  { name: "Gemini", value: 210, color: "#F59E0B" },
  { name: "SearchGPT & others", value: 60, color: "#EF4444" },
]

const MOCK_TIMELINE_DATA = [
  { date: "Jun 24", visibility: 72, mentions: 180, citations: 75 },
  { date: "Jun 25", visibility: 73, mentions: 195, citations: 77 },
  { date: "Jun 26", visibility: 75, mentions: 210, citations: 79 },
  { date: "Jun 27", visibility: 74, mentions: 200, citations: 78 },
  { date: "Jun 28", visibility: 76, mentions: 220, citations: 80 },
  { date: "Jun 29", visibility: 78, mentions: 235, citations: 82 },
  { date: "Jun 30", visibility: 78.4, mentions: 242, citations: 82.1 },
]

const MOCK_RECENT_MENTIONS = [
  {
    id: "m-1",
    engine: "Perplexity",
    query: "best API rate limiting solutions for nextjs in 2026",
    citationText: "...Aeolyzer provides advanced token bucket middleware which is highly scalable for production Next.js apps...",
    sentiment: "positive",
    date: "10 mins ago",
    link: "https://perplexity.ai"
  },
  {
    id: "m-2",
    engine: "ChatGPT",
    query: "how to analyze answer engine optimization visibility",
    citationText: "...using platforms like Aeolyzer, which tracks AI Visibility Scores, answer coverage, and knowledge graph citations...",
    sentiment: "positive",
    date: "2 hours ago",
    link: "https://chatgpt.com"
  },
  {
    id: "m-3",
    engine: "Claude",
    query: "scalable state management libraries in React 19",
    citationText: "...while Zustand remains popular, Aeolyzer's built-in state selectors offer a more declarative lightweight paradigm for dashboards...",
    sentiment: "neutral",
    date: "5 hours ago",
    link: "https://claude.ai"
  },
  {
    id: "m-4",
    engine: "Gemini",
    query: "top devtools for monitoring AI agentic workflows",
    citationText: "...Aeolyzer is currently the leading solution offering detailed auditing of LLM outputs, SEO optimization, and agent reliability...",
    sentiment: "positive",
    date: "1 day ago",
    link: "https://gemini.google.com"
  }
]

export default function AeoInsightsPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [dateRange, setDateRange] = useState("7d")
  const [searchQuery, setSearchQuery] = useState("")
  const [filterEngine, setFilterEngine] = useState("all")

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 800)
    return () => clearTimeout(timer)
  }, [])

  const handleRefresh = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 600)
  }

  // Filter mentions
  const filteredMentions = MOCK_RECENT_MENTIONS.filter(mention => {
    const matchesSearch = mention.query.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          mention.citationText.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesEngine = filterEngine === "all" || mention.engine.toLowerCase() === filterEngine.toLowerCase()
    return matchesSearch && matchesEngine
  })

  // Chart config definitions for Recharts wrappers
  const timelineChartConfig = {
    visibility: { label: "Visibility Score (%)", color: "var(--chart-1)" },
    citations: { label: "Citation Score (%)", color: "var(--chart-2)" },
    mentions: { label: "AI Mentions (Count)", color: "var(--chart-3)" },
  }

  const sourceChartConfig = MOCK_SOURCE_DISTRIBUTION.reduce((acc, item, index) => {
    acc[item.name.replace(/[^a-zA-Z0-9]/g, "")] = {
      label: item.name,
      color: item.color
    }
    return acc;
  }, {} as any)

  return (
    <div className="flex-1 space-y-6 p-6 md:p-8">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-foreground via-foreground/90 to-muted-foreground bg-clip-text">
            AEO Analytics
          </h1>
          <p className="text-muted-foreground">
            Analyze answer engine optimization visibility, knowledge presence, and citations across LLMs.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-[150px] bg-background">
              <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
              <SelectValue placeholder="Select range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Last 24 Hours</SelectItem>
              <SelectItem value="7d">Last 7 Days</SelectItem>
              <SelectItem value="30d">Last 30 Days</SelectItem>
              <SelectItem value="90d">Last 90 Days</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" size="icon" onClick={handleRefresh} title="Refresh Data">
            <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
          </Button>

          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Export</span>
          </Button>

          <Button className="gap-2 bg-primary hover:bg-primary/95 text-primary-foreground font-medium shadow-md transition-all">
            <Sparkles className="h-4 w-4" />
            Optimize Mentions
          </Button>
        </div>
      </div>

      {isLoading ? (
        // Loading State / Skeletons
        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map(i => (
              <Card key={i} className="overflow-hidden">
                <CardHeader className="space-y-0 pb-2">
                  <Skeleton className="h-4 w-[120px]" />
                </CardHeader>
                <CardContent className="space-y-3">
                  <Skeleton className="h-8 w-[80px]" />
                  <Skeleton className="h-4 w-[160px]" />
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <Card className="md:col-span-2">
              <CardHeader>
                <Skeleton className="h-6 w-[200px]" />
                <Skeleton className="h-4 w-[350px]" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-[300px] w-full" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-[150px]" />
                <Skeleton className="h-4 w-[200px]" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-[300px] w-full" />
              </CardContent>
            </Card>
          </div>
        </div>
      ) : (
        // Main Dashboard View
        <div className="space-y-6">
          
          {/* AEO Insights Panel / Overview */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            
            {/* AI Visibility Card */}
            <Card className="relative overflow-hidden transition-all duration-300 hover:shadow-md hover:border-primary/20 group">
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-emerald-500 via-teal-500 to-transparent" />
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium text-muted-foreground">AI Visibility Score</CardTitle>
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform">
                  <Brain className="h-4 w-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline space-x-2">
                  <span className="text-3xl font-bold tracking-tight">{MOCK_AEO_STATS.visibilityScore}%</span>
                  <span className="flex items-center text-xs font-semibold text-emerald-500">
                    <ArrowUpRight className="h-3 w-3 mr-0.5" />
                    +{MOCK_AEO_STATS.visibilityChange}%
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-2">Visibility index in top LLM answer models</p>
                <div className="mt-3">
                  <Progress value={MOCK_AEO_STATS.visibilityScore} className="h-1.5" />
                </div>
              </CardContent>
            </Card>

            {/* Citation Score Card */}
            <Card className="relative overflow-hidden transition-all duration-300 hover:shadow-md hover:border-primary/20 group">
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-blue-500 via-sky-500 to-transparent" />
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium text-muted-foreground">Citation Score</CardTitle>
                <div className="p-2 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                  <Award className="h-4 w-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline space-x-2">
                  <span className="text-3xl font-bold tracking-tight">{MOCK_AEO_STATS.citationScore}%</span>
                  <span className="flex items-center text-xs font-semibold text-blue-500">
                    <ArrowUpRight className="h-3 w-3 mr-0.5" />
                    +{MOCK_AEO_STATS.citationChange}%
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-2">Accuracy & frequency of source citations</p>
                <div className="mt-3">
                  <Progress value={MOCK_AEO_STATS.citationScore} className="h-1.5 bg-muted" />
                </div>
              </CardContent>
            </Card>

            {/* AI Mentions Card */}
            <Card className="relative overflow-hidden transition-all duration-300 hover:shadow-md hover:border-primary/20 group">
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-purple-500 via-violet-500 to-transparent" />
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium text-muted-foreground">AI Mentions</CardTitle>
                <div className="p-2 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform">
                  <MessageSquare className="h-4 w-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline space-x-2">
                  <span className="text-3xl font-bold tracking-tight">{MOCK_AEO_STATS.aiMentions.toLocaleString()}</span>
                  <span className="flex items-center text-xs font-semibold text-emerald-500">
                    <ArrowUpRight className="h-3 w-3 mr-0.5" />
                    +{MOCK_AEO_STATS.aiMentionsChange}%
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-2">Mentions detected in user query solutions</p>
                <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                  <span>Coverage Rate: {MOCK_AEO_STATS.answerCoverage}%</span>
                  <span className="text-emerald-500 flex items-center"><ArrowUpRight className="h-3 w-3 mr-0.5"/>+3.1%</span>
                </div>
              </CardContent>
            </Card>

            {/* Knowledge Graph Presence Card */}
            <Card className="relative overflow-hidden transition-all duration-300 hover:shadow-md hover:border-primary/20 group">
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-amber-500 via-orange-500 to-transparent" />
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium text-muted-foreground">Knowledge Graph</CardTitle>
                <div className="p-2 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 group-hover:scale-110 transition-transform">
                  <Network className="h-4 w-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline space-x-2">
                  <span className="text-3xl font-bold tracking-tight">{MOCK_AEO_STATS.knowledgeGraphPresence}%</span>
                  <span className="text-xs font-medium text-muted-foreground">Entity match</span>
                </div>
                <p className="text-xs text-muted-foreground mt-2">Integration in semantic index networks</p>
                <div className="mt-3">
                  <Progress value={MOCK_AEO_STATS.knowledgeGraphPresence} className="h-1.5" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts Layout */}
          <div className="grid gap-6 md:grid-cols-3">
            {/* Citation & Visibility Timeline Chart */}
            <Card className="md:col-span-2">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>AI Visibility & Citations Trend</CardTitle>
                  <CardDescription>Track answer engine presence and source attribution score over time</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <span className="h-2.5 w-2.5 rounded-full bg-primary" />
                    Visibility
                  </span>
                  <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <span className="h-2.5 w-2.5 rounded-full bg-blue-500" />
                    Citations
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full">
                  <ChartContainer config={timelineChartConfig}>
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={MOCK_TIMELINE_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                          <linearGradient id="colorVisibility" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="var(--color-visibility)" stopOpacity={0.2}/>
                            <stop offset="95%" stopColor="var(--color-visibility)" stopOpacity={0}/>
                          </linearGradient>
                          <linearGradient id="colorCitations" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="var(--color-citations)" stopOpacity={0.2}/>
                            <stop offset="95%" stopColor="var(--color-citations)" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-border/50" />
                        <XAxis dataKey="date" className="text-muted-foreground" />
                        <YAxis className="text-muted-foreground" domain={[60, 90]} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Area 
                          type="monotone" 
                          dataKey="visibility" 
                          name="visibility"
                          stroke="var(--color-visibility)" 
                          strokeWidth={2}
                          fillOpacity={1} 
                          fill="url(#colorVisibility)" 
                        />
                        <Area 
                          type="monotone" 
                          dataKey="citations" 
                          name="citations"
                          stroke="var(--color-citations)" 
                          strokeWidth={2}
                          fillOpacity={1} 
                          fill="url(#colorCitations)" 
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>

            {/* Answer Engine Share Pie Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Source Distribution</CardTitle>
                <CardDescription>Mentions breakdown across different LLMs</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col justify-between h-[300px]">
                <div className="h-[180px] w-full relative flex items-center justify-center">
                  <ChartContainer config={sourceChartConfig} className="aspect-square max-h-[160px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                        <Pie
                          data={MOCK_SOURCE_DISTRIBUTION}
                          dataKey="value"
                          nameKey="name"
                          innerRadius={50}
                          outerRadius={75}
                          paddingAngle={3}
                        >
                          {MOCK_SOURCE_DISTRIBUTION.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                  <div className="absolute flex flex-col items-center justify-center text-center pointer-events-none">
                    <span className="text-2xl font-bold tracking-tight">1.4K</span>
                    <span className="text-[10px] text-muted-foreground uppercase font-medium">Total Mentions</span>
                  </div>
                </div>
                
                {/* Custom Legend */}
                <div className="grid grid-cols-2 gap-2 text-xs pt-4 border-t">
                  {MOCK_SOURCE_DISTRIBUTION.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-muted-foreground truncate">{item.name}</span>
                      <span className="ml-auto font-mono font-medium">{Math.round((item.value / 1420) * 100)}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Mentions Table & Quick Insights */}
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Recent AI Mentions Table */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <CardTitle>Recent AI Mentions</CardTitle>
                    <CardDescription>Verify user search prompts, citing contexts, and real-time sentiments</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
                      <Input
                        placeholder="Search queries..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-8 h-8 w-[150px] sm:w-[200px]"
                      />
                    </div>
                    <Select value={filterEngine} onValueChange={setFilterEngine}>
                      <SelectTrigger className="h-8 w-[100px]">
                        <SelectValue placeholder="Engine" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Engines</SelectItem>
                        <SelectItem value="chatgpt">ChatGPT</SelectItem>
                        <SelectItem value="claude">Claude</SelectItem>
                        <SelectItem value="perplexity">Perplexity</SelectItem>
                        <SelectItem value="gemini">Gemini</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                {filteredMentions.length === 0 ? (
                  <div className="flex flex-col items-center justify-center p-8 text-center text-muted-foreground space-y-3">
                    <div className="p-3 bg-muted rounded-full">
                      <Search className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="font-semibold">No mentions found</p>
                      <p className="text-xs">Try adjusting your search keywords or engine filters.</p>
                    </div>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[100px]">Engine</TableHead>
                          <TableHead>User Intent & Context</TableHead>
                          <TableHead className="w-[80px]">Sentiment</TableHead>
                          <TableHead className="w-[90px] text-right">Detected</TableHead>
                          <TableHead className="w-[40px]"></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredMentions.map((mention) => (
                          <TableRow key={mention.id} className="group">
                            <TableCell className="font-medium">
                              <Badge variant="outline" className="capitalize">
                                {mention.engine}
                              </Badge>
                            </TableCell>
                            <TableCell className="max-w-[320px] sm:max-w-none">
                              <p className="font-medium text-sm line-clamp-1 group-hover:text-primary transition-colors">
                                "{mention.query}"
                              </p>
                              <p className="text-xs text-muted-foreground line-clamp-2 mt-1 bg-muted/40 p-1.5 rounded border border-border/30">
                                {mention.citationText}
                              </p>
                            </TableCell>
                            <TableCell>
                              <Badge 
                                variant="secondary" 
                                className={
                                  mention.sentiment === "positive" 
                                    ? "bg-emerald-500/10 text-emerald-700 hover:bg-emerald-500/15 dark:text-emerald-400" 
                                    : "bg-muted text-muted-foreground"
                                }
                              >
                                {mention.sentiment}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right text-xs text-muted-foreground whitespace-nowrap">
                              {mention.date}
                            </TableCell>
                            <TableCell>
                              <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity" asChild>
                                <a href={mention.link} target="_blank" rel="noopener noreferrer">
                                  <ExternalLink className="h-3.5 w-3.5" />
                                </a>
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Action & Actionable Insights */}
            <div className="flex flex-col gap-6">
              {/* Insight Card */}
              <Card className="relative overflow-hidden border bg-gradient-to-br from-primary/5 via-transparent to-transparent">
                <CardHeader>
                  <div className="flex items-center gap-2 text-primary">
                    <Sparkles className="h-4 w-4" />
                    <span className="text-xs font-bold uppercase tracking-wider">AEO AI Insights</span>
                  </div>
                  <CardTitle className="text-lg mt-2">Optimize Answer Presence</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3 text-sm">
                    <div className="h-5 w-5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle className="h-3 w-3" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Next.js API References</p>
                      <p className="text-xs text-muted-foreground mt-0.5">ChatGPT citation rates increased by 14% after publishing semantic schema definitions.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 text-sm">
                    <div className="h-5 w-5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                      <HelpCircle className="h-3 w-3" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Missing Knowledge Entity</p>
                      <p className="text-xs text-muted-foreground mt-0.5">Perplexity is querying about 'Aeolyzer security framework' but returning Wikipedia fallback. Add structured trust docs.</p>
                    </div>
                  </div>

                  <Button className="w-full mt-2" variant="outline">
                    View Optimization Tasks
                    <ChevronRight className="h-4 w-4 ml-1.5" />
                  </Button>
                </CardContent>
              </Card>

              {/* Quick Actions List */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">AEO Configuration Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 p-3">
                  <Button variant="ghost" className="w-full justify-start text-xs font-normal gap-2.5 h-10">
                    <Network className="h-4 w-4 text-muted-foreground" />
                    Generate JSON-LD Schema
                  </Button>
                  <Button variant="ghost" className="w-full justify-start text-xs font-normal gap-2.5 h-10">
                    <Brain className="h-4 w-4 text-muted-foreground" />
                    Inspect LLM Knowledge Graph Match
                  </Button>
                  <Button variant="ghost" className="w-full justify-start text-xs font-normal gap-2.5 h-10">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    Export LLM Context Profiles
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

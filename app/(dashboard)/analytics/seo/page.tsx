"use client"

import React, { useState, useEffect } from "react"
import { 
  Globe, Calendar, ArrowUpRight, ArrowDownRight, Search, FileText, CheckCircle,
  ExternalLink, Sparkles, Filter, RefreshCw, Download, AlertTriangle, ChevronRight,
  TrendingUp, Award, Network, MessageSquare, HelpCircle, Link as LinkIcon
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
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, BarChart, Bar } from "recharts"

// Mock Data
const MOCK_SEO_STATS = {
  organicTraffic: 48250,
  trafficChange: 14.8,
  keywordRankings: 3240,
  keywordsChange: 8.2,
  indexedPages: 1120,
  indexedChange: 1.5,
  backlinks: 8430,
  backlinksChange: 11.2,
  domainAuthority: 58,
  technicalScore: 92,
}

const MOCK_KEYWORDS_DATA = [
  { id: "kw-1", query: "answer engine optimization platform", volume: 2400, position: 2, difficulty: "Medium", traffic: "1.4K/mo" },
  { id: "kw-2", query: "best aeo tools for developers", volume: 1800, position: 1, difficulty: "Easy", traffic: "950/mo" },
  { id: "kw-3", query: "ai search optimization nextjs", volume: 3200, position: 4, difficulty: "Hard", traffic: "840/mo" },
  { id: "kw-4", query: "perplexity citations tracker", volume: 900, position: 3, difficulty: "Medium", traffic: "620/mo" },
  { id: "kw-5", query: "how engine visibility score is computed", volume: 1200, position: 6, difficulty: "Hard", traffic: "310/mo" },
]

const MOCK_PERFORMANCE_HISTORY = [
  { date: "Jun 24", impressions: 145000, clicks: 12100 },
  { date: "Jun 25", impressions: 148000, clicks: 12300 },
  { date: "Jun 26", impressions: 151000, clicks: 12800 },
  { date: "Jun 27", impressions: 149000, clicks: 12600 },
  { date: "Jun 28", impressions: 154000, clicks: 13100 },
  { date: "Jun 29", impressions: 158000, clicks: 13400 },
  { date: "Jun 30", impressions: 162000, clicks: 14200 },
]

export default function SeoInsightsPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [dateRange, setDateRange] = useState("7d")
  const [searchQuery, setSearchQuery] = useState("")
  const [filterDifficulty, setFilterDifficulty] = useState("all")

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

  // Filter Keywords
  const filteredKeywords = MOCK_KEYWORDS_DATA.filter(kw => {
    const matchesSearch = kw.query.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesDifficulty = filterDifficulty === "all" || kw.difficulty.toLowerCase() === filterDifficulty.toLowerCase()
    return matchesSearch && matchesDifficulty
  })

  // Chart configs
  const performanceChartConfig = {
    impressions: { label: "Impressions", color: "var(--chart-2)" },
    clicks: { label: "Clicks", color: "var(--chart-1)" },
  }

  return (
    <div className="flex-1 space-y-6 p-6 md:p-8">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-foreground via-foreground/90 to-muted-foreground bg-clip-text">
            SEO Analytics
          </h1>
          <p className="text-muted-foreground">
            Monitor search console performance, keyword rankings, indexing health, and authority scores.
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
            <span className="hidden sm:inline">Export Report</span>
          </Button>

          <Button className="gap-2 bg-primary hover:bg-primary/95 text-primary-foreground font-medium shadow-md transition-all">
            <Globe className="h-4 w-4" />
            Request Crawl
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
        // Main SEO Dashboard
        <div className="space-y-6">
          
          {/* SEO Performance Metrics Grid */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            
            {/* Organic Traffic */}
            <Card className="relative overflow-hidden transition-all duration-300 hover:shadow-md hover:border-primary/20 group">
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-blue-500 via-indigo-500 to-transparent" />
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium text-muted-foreground">Organic Traffic</CardTitle>
                <div className="p-2 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                  <Globe className="h-4 w-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline space-x-2">
                  <span className="text-3xl font-bold tracking-tight">{MOCK_SEO_STATS.organicTraffic.toLocaleString()}</span>
                  <span className="flex items-center text-xs font-semibold text-emerald-500">
                    <ArrowUpRight className="h-3 w-3 mr-0.5" />
                    +{MOCK_SEO_STATS.trafficChange}%
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-2">Visits originating from organic search clicks</p>
                <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                  <span>Domain Authority:</span>
                  <span className="font-semibold text-foreground">{MOCK_SEO_STATS.domainAuthority}/100</span>
                </div>
              </CardContent>
            </Card>

            {/* Keyword Rankings */}
            <Card className="relative overflow-hidden transition-all duration-300 hover:shadow-md hover:border-primary/20 group">
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-emerald-500 via-teal-500 to-transparent" />
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium text-muted-foreground">Keyword Rankings</CardTitle>
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform">
                  <Search className="h-4 w-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline space-x-2">
                  <span className="text-3xl font-bold tracking-tight">{MOCK_SEO_STATS.keywordRankings.toLocaleString()}</span>
                  <span className="flex items-center text-xs font-semibold text-emerald-500">
                    <ArrowUpRight className="h-3 w-3 mr-0.5" />
                    +{MOCK_SEO_STATS.keywordsChange}%
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-2">Total keywords indexing in Search results</p>
                <div className="mt-3">
                  <Progress value={78} className="h-1.5" />
                </div>
              </CardContent>
            </Card>

            {/* Backlinks */}
            <Card className="relative overflow-hidden transition-all duration-300 hover:shadow-md hover:border-primary/20 group">
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-purple-500 via-violet-500 to-transparent" />
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium text-muted-foreground">Referencing Backlinks</CardTitle>
                <div className="p-2 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform">
                  <LinkIcon className="h-4 w-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline space-x-2">
                  <span className="text-3xl font-bold tracking-tight">{MOCK_SEO_STATS.backlinks.toLocaleString()}</span>
                  <span className="flex items-center text-xs font-semibold text-emerald-500">
                    <ArrowUpRight className="h-3 w-3 mr-0.5" />
                    +{MOCK_SEO_STATS.backlinksChange}%
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-2">High-authority referring domain networks</p>
                <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                  <span>Indexed: {MOCK_SEO_STATS.indexedPages} pages</span>
                  <span className="text-emerald-500">+{MOCK_SEO_STATS.indexedChange}%</span>
                </div>
              </CardContent>
            </Card>

            {/* Technical SEO Score */}
            <Card className="relative overflow-hidden transition-all duration-300 hover:shadow-md hover:border-primary/20 group">
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-amber-500 via-orange-500 to-transparent" />
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium text-muted-foreground">Technical SEO Score</CardTitle>
                <div className="p-2 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 group-hover:scale-110 transition-transform">
                  <Award className="h-4 w-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline space-x-2">
                  <span className="text-3xl font-bold tracking-tight">{MOCK_SEO_STATS.technicalScore}%</span>
                  <span className="text-xs font-semibold text-emerald-500 flex items-center">
                    <ArrowUpRight className="h-3 w-3 mr-0.5"/> Optimal
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-2">Crawlability, core web vitals, index structure</p>
                <div className="mt-3">
                  <Progress value={MOCK_SEO_STATS.technicalScore} className="h-1.5" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Search Performance Charts */}
          <div className="grid gap-6 md:grid-cols-3">
            {/* SEO Trends */}
            <Card className="md:col-span-2">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Search Console Trend</CardTitle>
                  <CardDescription>Track impressions vs active organic click conversions</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                    Clicks
                  </span>
                  <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <span className="h-2.5 w-2.5 rounded-full bg-indigo-500" />
                    Impressions
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full">
                  <ChartContainer config={performanceChartConfig}>
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={MOCK_PERFORMANCE_HISTORY} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                        <defs>
                          <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="var(--color-clicks)" stopOpacity={0.2}/>
                            <stop offset="95%" stopColor="var(--color-clicks)" stopOpacity={0}/>
                          </linearGradient>
                          <linearGradient id="colorImpressions" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="var(--color-impressions)" stopOpacity={0.2}/>
                            <stop offset="95%" stopColor="var(--color-impressions)" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-border/50" />
                        <XAxis dataKey="date" className="text-muted-foreground" />
                        <YAxis className="text-muted-foreground" />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Area 
                          type="monotone" 
                          dataKey="clicks" 
                          name="clicks"
                          stroke="var(--color-clicks)" 
                          strokeWidth={2}
                          fillOpacity={1} 
                          fill="url(#colorClicks)" 
                        />
                        <Area 
                          type="monotone" 
                          dataKey="impressions" 
                          name="impressions"
                          stroke="var(--color-impressions)" 
                          strokeWidth={2}
                          fillOpacity={1} 
                          fill="url(#colorImpressions)" 
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>

            {/* Quick SEO Health Insight */}
            <Card className="flex flex-col justify-between">
              <CardHeader>
                <CardTitle>Technical Audit Insights</CardTitle>
                <CardDescription>Crawl diagnostic alerts & actionable recommendations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                
                <div className="flex items-start gap-3 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-900 dark:text-amber-300 text-xs">
                  <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">Missing Canonical Tags (14 pages)</p>
                    <p className="text-muted-foreground mt-0.5">Duplicates detected across dynamic filter parameters. Add canonical tags to resolve duplication.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-900 dark:text-emerald-300 text-xs">
                  <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">Sitemap fully parsed</p>
                    <p className="text-muted-foreground mt-0.5">Googlebot successfully crawled your primary endpoints on Jun 29. 0 network/DNS errors.</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-medium">
                    <span>Mobile Optimization</span>
                    <span>100%</span>
                  </div>
                  <Progress value={100} className="h-1" />
                  
                  <div className="flex justify-between text-xs font-medium pt-1">
                    <span>Core Web Vitals LCP</span>
                    <span>94%</span>
                  </div>
                  <Progress value={94} className="h-1" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Keywords Table & Optimization */}
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Top Keywords Table */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <CardTitle>Indexed Keywords</CardTitle>
                    <CardDescription>Analyze keyword search volume, average positions, and monthly traffic share</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
                      <Input
                        placeholder="Search query..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-8 h-8 w-[150px] sm:w-[200px]"
                      />
                    </div>
                    <Select value={filterDifficulty} onValueChange={setFilterDifficulty}>
                      <SelectTrigger className="h-8 w-[120px]">
                        <SelectValue placeholder="Difficulty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Difficulties</SelectItem>
                        <SelectItem value="easy">Easy</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="hard">Hard</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                {filteredKeywords.length === 0 ? (
                  <div className="flex flex-col items-center justify-center p-8 text-center text-muted-foreground space-y-3">
                    <div className="p-3 bg-muted rounded-full">
                      <Search className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="font-semibold">No keywords found</p>
                      <p className="text-xs">Try selecting a different search query or difficulty modifier.</p>
                    </div>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Target Keyword</TableHead>
                          <TableHead className="w-[100px] text-right">Search Volume</TableHead>
                          <TableHead className="w-[100px] text-right">Position</TableHead>
                          <TableHead className="w-[110px]">Difficulty</TableHead>
                          <TableHead className="w-[100px] text-right">Est. Traffic</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredKeywords.map((kw) => (
                          <TableRow key={kw.id} className="group">
                            <TableCell className="font-medium group-hover:text-primary transition-colors">
                              {kw.query}
                            </TableCell>
                            <TableCell className="text-right font-mono text-sm">{kw.volume.toLocaleString()}</TableCell>
                            <TableCell className="text-right">
                              <Badge variant="secondary" className="font-mono bg-indigo-500/5 text-indigo-700 dark:text-indigo-400">
                                #{kw.position}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge 
                                variant="outline" 
                                className={
                                  kw.difficulty === "Easy" 
                                    ? "border-emerald-500/30 text-emerald-600 dark:text-emerald-400 bg-emerald-500/5" 
                                    : kw.difficulty === "Medium"
                                    ? "border-amber-500/30 text-amber-600 dark:text-amber-400 bg-amber-500/5"
                                    : "border-red-500/30 text-red-600 dark:text-red-400 bg-red-500/5"
                                }
                              >
                                {kw.difficulty}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right text-sm text-muted-foreground">{kw.traffic}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Actions Panel */}
            <div className="flex flex-col gap-6">
              <Card className="border bg-gradient-to-br from-primary/5 via-transparent to-transparent">
                <CardHeader>
                  <div className="flex items-center gap-2 text-primary">
                    <Sparkles className="h-4 w-4" />
                    <span className="text-xs font-bold uppercase tracking-wider">SEO Recommendations</span>
                  </div>
                  <CardTitle className="text-lg mt-2">Organic Keyword Booster</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-xs text-muted-foreground">
                    Our AI has audited queries targeting position #4-10. Complete the following to lift impressions:
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-start gap-2 text-xs">
                      <div className="h-4 w-4 rounded-full bg-indigo-500/10 text-indigo-600 flex items-center justify-center shrink-0 mt-0.5">1</div>
                      <p className="text-foreground">Enhance keyword density for <span className="font-semibold text-primary">"ai search optimization nextjs"</span> in /docs/aeo.</p>
                    </div>
                    <div className="flex items-start gap-2 text-xs">
                      <div className="h-4 w-4 rounded-full bg-indigo-500/10 text-indigo-600 flex items-center justify-center shrink-0 mt-0.5">2</div>
                      <p className="text-foreground">Secure two internal links targeting <span className="font-semibold text-primary">"perplexity citations tracker"</span>.</p>
                    </div>
                  </div>

                  <Button className="w-full mt-2" variant="outline">
                    Run Content Audit
                    <ChevronRight className="h-4 w-4 ml-1.5" />
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Search Integrations</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 p-3">
                  <Button variant="ghost" className="w-full justify-start text-xs font-normal gap-2.5 h-10">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    Google Search Console Status
                  </Button>
                  <Button variant="ghost" className="w-full justify-start text-xs font-normal gap-2.5 h-10">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    Inspect Robot.txt Crawler Access
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

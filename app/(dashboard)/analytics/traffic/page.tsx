"use client"

import React, { useState, useEffect } from "react"
import { 
  LineChart as LineIcon, Calendar, ArrowUpRight, ArrowDownRight, RefreshCw, Download, 
  Users, Eye, Clock, Percent, Compass, Smartphone, Monitor, Globe, ChevronRight,
  TrendingUp, Search
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
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, BarChart, Bar, Cell, PieChart, Pie } from "recharts"

// Mock Data
const MOCK_TRAFFIC_STATS = {
  totalVisitors: 84320,
  visitorsChange: 18.2,
  sessions: 110450,
  sessionsChange: 12.4,
  uniqueUsers: 64200,
  usersChange: 15.6,
  bounceRate: 42.8,
  bounceChange: -2.4,
  avgSessionDuration: "3m 42s",
  durationChange: 4.8,
}

const MOCK_TRAFFIC_TREND = [
  { date: "Jun 24", visitors: 9800, pageviews: 12400 },
  { date: "Jun 25", visitors: 10200, pageviews: 13100 },
  { date: "Jun 26", visitors: 11500, pageviews: 14500 },
  { date: "Jun 27", visitors: 11000, pageviews: 13800 },
  { date: "Jun 28", visitors: 12300, pageviews: 15900 },
  { date: "Jun 29", visitors: 13400, pageviews: 17200 },
  { date: "Jun 30", visitors: 14120, pageviews: 18150 },
]

const MOCK_DEVICES = [
  { name: "Desktop", value: 65, color: "#3B82F6" },
  { name: "Mobile", value: 30, color: "#10B981" },
  { name: "Tablet", value: 5, color: "#F59E0B" },
]

const MOCK_GEOGRAPHIC_DISTRIBUTION = [
  { country: "United States", code: "US", visitors: 34200, percentage: 41 },
  { country: "United Kingdom", code: "UK", visitors: 12400, percentage: 15 },
  { country: "Germany", code: "DE", visitors: 9800, percentage: 12 },
  { country: "Canada", code: "CA", visitors: 8200, percentage: 10 },
  { country: "India", code: "IN", visitors: 7400, percentage: 9 },
]

const MOCK_REFERRALS = [
  { source: "Google", type: "Search", sessions: 48250, bounceRate: "39.4%", change: "+12%" },
  { source: "Direct", type: "Direct", sessions: 28400, bounceRate: "46.2%", change: "+8%" },
  { source: "github.com", type: "Referral", sessions: 14200, bounceRate: "31.8%", change: "+24%" },
  { source: "Twitter / X", type: "Social", sessions: 11200, bounceRate: "52.4%", change: "+18%" },
  { source: "newsletter", type: "Email", sessions: 8400, bounceRate: "28.5%", change: "+5%" },
]

export default function TrafficAnalyticsPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [dateRange, setDateRange] = useState("7d")
  const [searchQuery, setSearchQuery] = useState("")

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

  // Filter Referrals
  const filteredReferrals = MOCK_REFERRALS.filter(ref => {
    return ref.source.toLowerCase().includes(searchQuery.toLowerCase()) || 
           ref.type.toLowerCase().includes(searchQuery.toLowerCase())
  })

  // Chart Configs
  const trendChartConfig = {
    visitors: { label: "Total Visitors", color: "var(--chart-1)" },
    pageviews: { label: "Page Views", color: "var(--chart-2)" },
  }

  const deviceChartConfig = MOCK_DEVICES.reduce((acc, item) => {
    acc[item.name] = {
      label: item.name,
      color: item.color
    }
    return acc
  }, {} as any)

  return (
    <div className="flex-1 space-y-6 p-6 md:p-8">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-foreground via-foreground/90 to-muted-foreground bg-clip-text">
            Traffic Analytics
          </h1>
          <p className="text-muted-foreground">
            Examine click ratios, active session durations, geographic distribution, and user referrals.
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
            <span className="hidden sm:inline">Export CSV</span>
          </Button>

          <Button className="gap-2 bg-primary hover:bg-primary/95 text-primary-foreground font-medium shadow-md transition-all">
            <LineIcon className="h-4 w-4" />
            Live Monitor
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
        // Main Traffic Dashboard
        <div className="space-y-6">
          
          {/* Dashboard Stats */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            
            {/* Total Visitors */}
            <Card className="relative overflow-hidden transition-all duration-300 hover:shadow-md hover:border-primary/20 group">
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-blue-500 via-indigo-500 to-transparent" />
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Visitors</CardTitle>
                <div className="p-2 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                  <Users className="h-4 w-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline space-x-2">
                  <span className="text-3xl font-bold tracking-tight">{MOCK_TRAFFIC_STATS.totalVisitors.toLocaleString()}</span>
                  <span className="flex items-center text-xs font-semibold text-emerald-500">
                    <ArrowUpRight className="h-3 w-3 mr-0.5" />
                    +{MOCK_TRAFFIC_STATS.visitorsChange}%
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-2">Sessions initiated across target domains</p>
                <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                  <span>Unique: {MOCK_TRAFFIC_STATS.uniqueUsers.toLocaleString()}</span>
                  <span className="text-emerald-500">+{MOCK_TRAFFIC_STATS.usersChange}%</span>
                </div>
              </CardContent>
            </Card>

            {/* Total Sessions */}
            <Card className="relative overflow-hidden transition-all duration-300 hover:shadow-md hover:border-primary/20 group">
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-emerald-500 via-teal-500 to-transparent" />
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Sessions</CardTitle>
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform">
                  <Eye className="h-4 w-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline space-x-2">
                  <span className="text-3xl font-bold tracking-tight">{MOCK_TRAFFIC_STATS.sessions.toLocaleString()}</span>
                  <span className="flex items-center text-xs font-semibold text-emerald-500">
                    <ArrowUpRight className="h-3 w-3 mr-0.5" />
                    +{MOCK_TRAFFIC_STATS.sessionsChange}%
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-2">Total hits (page views) recorded</p>
                <div className="mt-3">
                  <Progress value={85} className="h-1.5" />
                </div>
              </CardContent>
            </Card>

            {/* Bounce Rate */}
            <Card className="relative overflow-hidden transition-all duration-300 hover:shadow-md hover:border-primary/20 group">
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-red-500 via-rose-500 to-transparent" />
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium text-muted-foreground">Bounce Rate</CardTitle>
                <div className="p-2 rounded-lg bg-red-500/10 text-red-600 dark:text-red-400 group-hover:scale-110 transition-transform">
                  <Percent className="h-4 w-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline space-x-2">
                  <span className="text-3xl font-bold tracking-tight">{MOCK_TRAFFIC_STATS.bounceRate}%</span>
                  <span className="flex items-center text-xs font-semibold text-emerald-500">
                    <ArrowDownRight className="h-3 w-3 mr-0.5" />
                    {MOCK_TRAFFIC_STATS.bounceChange}%
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-2">Percentage of single page bounce actions</p>
                <div className="mt-3">
                  <Progress value={MOCK_TRAFFIC_STATS.bounceRate} className="h-1.5 bg-muted" />
                </div>
              </CardContent>
            </Card>

            {/* Session Duration */}
            <Card className="relative overflow-hidden transition-all duration-300 hover:shadow-md hover:border-primary/20 group">
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-amber-500 via-orange-500 to-transparent" />
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium text-muted-foreground">Avg. Session Duration</CardTitle>
                <div className="p-2 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 group-hover:scale-110 transition-transform">
                  <Clock className="h-4 w-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline space-x-2">
                  <span className="text-3xl font-bold tracking-tight">{MOCK_TRAFFIC_STATS.avgSessionDuration}</span>
                  <span className="flex items-center text-xs font-semibold text-emerald-500">
                    <ArrowUpRight className="h-3 w-3 mr-0.5" />
                    +{MOCK_TRAFFIC_STATS.durationChange}%
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-2">Average engagement duration per session</p>
                <div className="mt-3">
                  <Progress value={62} className="h-1.5" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts Row */}
          <div className="grid gap-6 md:grid-cols-3">
            {/* Visitor Trend */}
            <Card className="md:col-span-2">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Visitor & Engagement Trends</CardTitle>
                  <CardDescription>Track daily active visitors against absolute pageviews</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <span className="h-2.5 w-2.5 rounded-full bg-blue-500" />
                    Visitors
                  </span>
                  <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                    Pageviews
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full">
                  <ChartContainer config={trendChartConfig}>
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={MOCK_TRAFFIC_TREND} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-border/50" />
                        <XAxis dataKey="date" className="text-muted-foreground" />
                        <YAxis className="text-muted-foreground" />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line 
                          type="monotone" 
                          dataKey="visitors" 
                          name="visitors"
                          stroke="var(--color-visitors)" 
                          strokeWidth={2.5} 
                          dot={false}
                          activeDot={{ r: 6 }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="pageviews" 
                          name="pageviews"
                          stroke="var(--color-pageviews)" 
                          strokeWidth={2.5} 
                          dot={false}
                          activeDot={{ r: 6 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>

            {/* Device breakdown Pie Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Devices Breakdown</CardTitle>
                <CardDescription>Traffic segmented by user device category</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col justify-between h-[300px]">
                <div className="h-[180px] w-full relative flex items-center justify-center">
                  <ChartContainer config={deviceChartConfig} className="aspect-square max-h-[160px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                        <Pie
                          data={MOCK_DEVICES}
                          dataKey="value"
                          nameKey="name"
                          innerRadius={50}
                          outerRadius={75}
                          paddingAngle={3}
                        >
                          {MOCK_DEVICES.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                  <div className="absolute flex flex-col items-center justify-center text-center pointer-events-none">
                    <span className="text-2xl font-bold tracking-tight">65%</span>
                    <span className="text-[10px] text-muted-foreground uppercase font-medium">Desktop</span>
                  </div>
                </div>

                <div className="space-y-2 pt-4 border-t">
                  {MOCK_DEVICES.map((device, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full" style={{ backgroundColor: device.color }} />
                        <span className="text-muted-foreground">{device.name}</span>
                      </div>
                      <span className="font-mono font-medium">{device.value}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Referrals & Geographic breakdown */}
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Referral Channels Table */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <CardTitle>Traffic Referrals & Sources</CardTitle>
                    <CardDescription>Verify user acquisition metrics, referral domains, and bounce rates</CardDescription>
                  </div>
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
                    <Input
                      placeholder="Search channels..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-8 h-8 w-[150px] sm:w-[200px]"
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                {filteredReferrals.length === 0 ? (
                  <div className="flex flex-col items-center justify-center p-8 text-center text-muted-foreground space-y-3">
                    <div className="p-3 bg-muted rounded-full">
                      <Search className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="font-semibold">No referrals found</p>
                      <p className="text-xs">Try adapting your search parameters.</p>
                    </div>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Acquisition Source</TableHead>
                          <TableHead>Channel Type</TableHead>
                          <TableHead className="text-right">Sessions</TableHead>
                          <TableHead className="text-right">Bounce Rate</TableHead>
                          <TableHead className="text-right">Growth</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredReferrals.map((ref, index) => (
                          <TableRow key={index} className="group">
                            <TableCell className="font-medium group-hover:text-primary transition-colors">
                              {ref.source}
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline" className="capitalize">
                                {ref.type}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right font-mono text-sm">{ref.sessions.toLocaleString()}</TableCell>
                            <TableCell className="text-right text-muted-foreground">{ref.bounceRate}</TableCell>
                            <TableCell className="text-right text-emerald-500 font-semibold">{ref.change}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Geographic Distribution Card */}
            <Card>
              <CardHeader>
                <CardTitle>Geographic Distribution</CardTitle>
                <CardDescription>Top user traffic locations based on geo IP addresses</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {MOCK_GEOGRAPHIC_DISTRIBUTION.map((geo, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{geo.code}</span>
                        <span className="text-muted-foreground">{geo.country}</span>
                      </div>
                      <span className="font-mono">{geo.percentage}% ({geo.visitors.toLocaleString()})</span>
                    </div>
                    <Progress value={geo.percentage} className="h-1.5" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

        </div>
      )}
    </div>
  )
}

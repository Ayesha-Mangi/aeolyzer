"use client"

import * as React from "react"
import {
  Key,
  Search,
  Filter,
  Download,
  Plus,
  TrendingUp,
  TrendingDown,
  BarChart2,
  DollarSign,
  Target,
  RefreshCw,
  MoreHorizontal
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid
} from "recharts"

// --- MOCK DATA ---
const overviewMetrics = [
  { name: "Total Keywords", value: "24.5K", change: "+12%", trend: "up", icon: Key },
  { name: "Avg. Volume", value: "8.2K", change: "+5%", trend: "up", icon: BarChart2 },
  { name: "Avg. Difficulty", value: "45/100", change: "-2%", trend: "down", icon: Target },
  { name: "Avg. CPC", value: "$2.40", change: "+8%", trend: "up", icon: DollarSign },
]

const trendData = [
  { month: "Jan", volume: 4000 },
  { month: "Feb", volume: 3000 },
  { month: "Mar", volume: 5000 },
  { month: "Apr", volume: 4500 },
  { month: "May", volume: 6000 },
  { month: "Jun", volume: 5500 },
]

const keywordData = [
  { keyword: "ai website builder", volume: "18,000", difficulty: 85, cpc: "$4.50", intent: "Transactional", opportunity: 42, trend: "up" },
  { keyword: "how to create a website with ai", volume: "12,500", difficulty: 60, cpc: "$2.10", intent: "Informational", opportunity: 78, trend: "up" },
  { keyword: "best ai tools for seo", volume: "8,400", difficulty: 45, cpc: "$3.20", intent: "Commercial", opportunity: 85, trend: "up" },
  { keyword: "free website generator", volume: "22,000", difficulty: 92, cpc: "$1.80", intent: "Navigational", opportunity: 20, trend: "down" },
  { keyword: "ai landing page creator", volume: "5,200", difficulty: 35, cpc: "$5.60", intent: "Transactional", opportunity: 92, trend: "up" },
]
// -----------------

export default function KeywordResearchPage() {
  const [isLoading, setIsLoading] = React.useState(true)
  const [searchQuery, setSearchQuery] = React.useState("")

  React.useEffect(() => {
    // Simulate loading state
    const timer = setTimeout(() => setIsLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="flex flex-col gap-8 p-6 md:p-10 max-w-[1600px] mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground flex items-center gap-3">
            <div className="p-2.5 bg-primary/10 rounded-xl">
              <Key className="size-7 text-primary" />
            </div>
            Keyword Research
          </h1>
          <p className="text-muted-foreground mt-2 text-base">Discover high-intent keyword opportunities and analyze search trends.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="outline" size="sm" className="rounded-lg h-9 hover:bg-muted/50 transition-all"><RefreshCw className="mr-2 size-4" /> Refresh</Button>
          <Button variant="outline" size="sm" className="rounded-lg h-9 hover:bg-muted/50 transition-all"><Download className="mr-2 size-4" /> Export CSV</Button>
          <Button size="sm" className="rounded-lg h-9 shadow-sm hover:shadow transition-all"><Plus className="mr-2 size-4" /> Track Keywords</Button>
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="animate-pulse bg-muted/30 border border-border/40 rounded-2xl h-[120px]" />
            ))}
          </div>
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-1 animate-pulse bg-muted/30 border border-border/40 rounded-2xl h-[380px]" />
            <div className="xl:col-span-2 animate-pulse bg-muted/30 border border-border/40 rounded-2xl h-[380px]" />
          </div>
        </div>
      ) : (
        <div className="space-y-8 animate-in fade-in duration-700 delay-150 fill-mode-both">
          {/* Overview Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {overviewMetrics.map((metric, i) => {
              const Icon = metric.icon
              return (
                <Card key={i} className="shadow-sm border-border/40 hover:border-border/80 hover:shadow-md transition-all duration-300 rounded-2xl bg-card/50 backdrop-blur-xl">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between pb-4">
                      <p className="tracking-tight text-sm font-medium text-muted-foreground">{metric.name}</p>
                      <div className="p-2 bg-muted/40 rounded-lg">
                        <Icon className="size-4 text-muted-foreground" />
                      </div>
                    </div>
                    <div className="flex items-end gap-3 mt-1">
                      <div className="text-3xl font-bold text-foreground tracking-tight">{metric.value}</div>
                      <Badge 
                        variant="secondary" 
                        className={`mb-1 font-medium bg-transparent px-0 hover:bg-transparent ${metric.trend === 'up' ? 'text-emerald-500' : 'text-rose-500'}`}
                      >
                        {metric.trend === 'up' ? <TrendingUp className="mr-1 size-3.5" /> : <TrendingDown className="mr-1 size-3.5" />}
                        {metric.change}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Chart */}
            <Card className="xl:col-span-1 shadow-sm border-border/40 hover:shadow-md transition-all duration-300 rounded-2xl flex flex-col overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold tracking-tight">Search Volume Trend</CardTitle>
                <CardDescription>Global search volume over the last 6 months</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 px-2 pb-6">
                <div className="h-[260px] w-full mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={trendData} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" strokeOpacity={0.4} vertical={false} />
                      <XAxis dataKey="month" fontSize={12} tickLine={false} axisLine={false} tick={{ fill: 'hsl(var(--muted-foreground))' }} dy={10} />
                      <YAxis fontSize={12} tickLine={false} axisLine={false} tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                      <Tooltip 
                        contentStyle={{ borderRadius: '12px', border: '1px solid hsl(var(--border))', background: 'hsl(var(--background)/0.95)', backdropFilter: 'blur(8px)', color: 'hsl(var(--foreground))', boxShadow: '0 4px 20px -2px rgba(0,0,0,0.1)' }}
                        itemStyle={{ color: 'hsl(var(--foreground))', fontWeight: 500 }}
                        cursor={{ stroke: 'hsl(var(--muted))', strokeWidth: 1, strokeDasharray: '4 4' }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="volume" 
                        stroke="hsl(var(--primary))" 
                        strokeWidth={3} 
                        dot={{ r: 4, fill: 'hsl(var(--background))', stroke: 'hsl(var(--primary))', strokeWidth: 2 }} 
                        activeDot={{ r: 6, fill: 'hsl(var(--primary))', stroke: 'hsl(var(--background))', strokeWidth: 2 }} 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Keyword Table */}
            <Card className="xl:col-span-2 shadow-sm border-border/40 hover:shadow-md transition-all duration-300 rounded-2xl flex flex-col overflow-hidden">
              <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-border/20">
                <div>
                  <CardTitle className="text-lg font-semibold tracking-tight">Keyword Opportunities</CardTitle>
                  <CardDescription>Detailed metrics tailored for your niche.</CardDescription>
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <div className="relative w-full sm:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      type="search" 
                      placeholder="Filter keywords..." 
                      className="pl-9 h-9 bg-muted/20 border-border/40 rounded-lg transition-colors focus-visible:bg-background focus-visible:ring-1" 
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
                      <TableHead className="pl-6 h-11 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Keyword</TableHead>
                      <TableHead className="h-11 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Volume</TableHead>
                      <TableHead className="h-11 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Difficulty</TableHead>
                      <TableHead className="h-11 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Intent</TableHead>
                      <TableHead className="h-11 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Opp. Score</TableHead>
                      <TableHead className="pr-6 h-11 text-xs font-semibold uppercase tracking-wider text-muted-foreground"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {keywordData.filter(k => k.keyword.toLowerCase().includes(searchQuery.toLowerCase())).length === 0 ? (
                      <TableRow className="hover:bg-transparent">
                        <TableCell colSpan={6} className="h-48 text-center">
                          <div className="flex flex-col items-center justify-center text-muted-foreground">
                            <Search className="size-8 mb-3 opacity-20" />
                            <p>No keywords found matching "{searchQuery}".</p>
                          </div>
                        </TableCell>
                      </TableRow>
                    ) : (
                      keywordData.filter(k => k.keyword.toLowerCase().includes(searchQuery.toLowerCase())).map((row, i) => (
                        <TableRow key={i} className="hover:bg-muted/20 transition-colors border-border/20 group cursor-pointer">
                          <TableCell className="pl-6 py-4 font-medium text-foreground">
                            <div className="flex items-center gap-2.5">
                              {row.keyword}
                              {row.trend === 'up' ? <TrendingUp className="size-3.5 text-emerald-500 opacity-70 group-hover:opacity-100 transition-opacity" /> : <TrendingDown className="size-3.5 text-rose-500 opacity-70 group-hover:opacity-100 transition-opacity" />}
                            </div>
                          </TableCell>
                          <TableCell className="py-4 text-muted-foreground font-medium">{row.volume}</TableCell>
                          <TableCell className="py-4">
                            <div className="flex items-center gap-3">
                              <span className="w-6 text-xs font-medium text-muted-foreground">{row.difficulty}</span>
                              <Progress value={row.difficulty} className="w-16 h-1.5 [&>div]:bg-amber-500 bg-muted" />
                            </div>
                          </TableCell>
                          <TableCell className="py-4">
                            <Badge variant="secondary" className="font-medium text-xs bg-primary/10 text-primary hover:bg-primary/20 shadow-none rounded-md px-2 py-0.5 border border-primary/10">
                              {row.intent}
                            </Badge>
                          </TableCell>
                          <TableCell className="py-4">
                            <Badge variant="outline" className={`font-medium rounded-md px-2 py-0.5 ${row.opportunity > 80 ? 'border-emerald-500/20 text-emerald-600 dark:text-emerald-400 bg-emerald-500/5' : 'border-amber-500/20 text-amber-600 dark:text-amber-400 bg-amber-500/5'}`}>
                              {row.opportunity}
                            </Badge>
                          </TableCell>
                          <TableCell className="pr-6 py-4 text-right">
                            <Button variant="ghost" size="icon" className="size-8 rounded-md opacity-0 group-hover:opacity-100 transition-all hover:bg-muted"><MoreHorizontal className="size-4 text-muted-foreground" /></Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}

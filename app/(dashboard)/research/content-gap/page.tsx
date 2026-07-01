"use client"

import * as React from "react"
import {
  FileQuestion,
  Target,
  AlertCircle,
  TrendingUp,
  Download,
  Plus,
  RefreshCw,
  Zap,
  ArrowRight,
  Sparkles
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
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend
} from "recharts"

// --- MOCK DATA ---
const opportunityOverview = [
  { name: "Missing Keywords", value: "342", description: "Keywords competitors rank for, but you don't.", icon: Target, color: "text-blue-500", bgIcon: "text-blue-500/5" },
  { name: "Weak Content", value: "84", description: "Pages ranking lower than primary competitors.", icon: AlertCircle, color: "text-amber-500", bgIcon: "text-amber-500/5" },
  { name: "Traffic Potential", value: "12.4K", description: "Estimated monthly organic traffic to capture.", icon: TrendingUp, color: "text-emerald-500", bgIcon: "text-emerald-500/5" },
]

const pieData = [
  { name: "Your Domain", value: 35, color: "hsl(var(--primary))" },
  { name: "Competitor A", value: 45, color: "hsl(var(--muted-foreground))" },
  { name: "Competitor B", value: 20, color: "hsl(var(--border))" },
]

const contentOpportunities = [
  { keyword: "how to use ai for marketing", traffic: "4,500/mo", difficulty: 45, competition: "Medium", action: "Create new pillar page", priority: "High" },
  { keyword: "best marketing automation tools", traffic: "12,000/mo", difficulty: 82, competition: "High", action: "Update existing listicle", priority: "Medium" },
  { keyword: "free email marketing templates", traffic: "8,200/mo", difficulty: 30, competition: "Low", action: "Create downloadable asset", priority: "Critical" },
  { keyword: "b2b marketing strategies 2026", traffic: "2,100/mo", difficulty: 55, competition: "Medium", action: "Publish comprehensive guide", priority: "High" },
]

const recommendations = [
  { title: "Target 'AI Marketing' cluster", description: "Your competitors are dominating the 'AI marketing' topic cluster. Creating 5-7 supporting articles around this head term could capture an estimated 8,000 monthly visits.", impact: "High", timeframe: "3-4 weeks" },
  { title: "Update stale content in 'Automation'", description: "3 of your top pages in the automation category have lost 25% of their traffic to Competitor A due to outdated information. Refreshing these pages with 2026 statistics can regain top positions.", impact: "Medium", timeframe: "1 week" },
]
// -----------------

export default function ContentGapPage() {
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    // Simulate loading state
    const timer = setTimeout(() => setIsLoading(false), 900)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="flex flex-col gap-8 p-6 md:p-10 max-w-[1600px] mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground flex items-center gap-3">
            <div className="p-2.5 bg-primary/10 rounded-xl">
              <FileQuestion className="size-7 text-primary" />
            </div>
            Content Gap Analysis
          </h1>
          <p className="text-muted-foreground mt-2 text-base">Identify topics your competitors rank for that you are currently missing.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="outline" size="sm" className="rounded-lg h-9 hover:bg-muted/50 transition-all"><RefreshCw className="mr-2 size-4" /> Rescan</Button>
          <Button variant="outline" size="sm" className="rounded-lg h-9 hover:bg-muted/50 transition-all"><Download className="mr-2 size-4" /> Export Report</Button>
          <Button size="sm" className="rounded-lg h-9 shadow-sm hover:shadow transition-all"><Plus className="mr-2 size-4" /> Add Competitors</Button>
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse bg-muted/30 border border-border/40 rounded-2xl h-[140px]" />
            ))}
          </div>
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-1 animate-pulse bg-muted/30 border border-border/40 rounded-2xl h-[400px]" />
            <div className="xl:col-span-2 animate-pulse bg-muted/30 border border-border/40 rounded-2xl h-[400px]" />
          </div>
        </div>
      ) : (
        <div className="space-y-8 animate-in fade-in duration-700 delay-150 fill-mode-both">
          {/* Opportunity Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {opportunityOverview.map((item, i) => {
              const Icon = item.icon
              return (
                <Card key={i} className="shadow-sm border-border/40 hover:border-border/80 hover:shadow-md transition-all duration-300 rounded-2xl overflow-hidden relative bg-card/50 backdrop-blur-xl">
                  {/* Subtle decorative background icon */}
                  <Icon className={`absolute -bottom-4 -right-4 size-32 ${item.bgIcon} -rotate-12 pointer-events-none`} strokeWidth={1} />
                  
                  <CardHeader className="pb-3 flex flex-row items-center justify-between space-y-0 relative z-10">
                    <CardTitle className="text-sm font-semibold text-muted-foreground tracking-tight">{item.name}</CardTitle>
                    <div className="p-2 bg-muted/40 rounded-lg">
                      <Icon className={`size-4 ${item.color}`} />
                    </div>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <div className="text-3xl font-bold tracking-tight text-foreground">{item.value}</div>
                    <p className="text-xs text-muted-foreground mt-2 max-w-[85%] leading-relaxed">{item.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            
            {/* Competitor Coverage Chart */}
            <Card className="xl:col-span-1 shadow-sm border-border/40 hover:shadow-md transition-all duration-300 rounded-2xl flex flex-col overflow-hidden">
              <CardHeader className="pb-0">
                <CardTitle className="text-lg font-semibold tracking-tight">Topic Coverage</CardTitle>
                <CardDescription>Share of voice across target keyword sets.</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center flex-1 pb-8">
                <div className="h-[240px] w-full relative">
                  {/* Center glowing effect behind chart */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-primary/20 rounded-full blur-2xl pointer-events-none" />
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={65}
                        outerRadius={85}
                        paddingAngle={6}
                        dataKey="value"
                        stroke="none"
                        cornerRadius={4}
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ borderRadius: '12px', border: '1px solid hsl(var(--border))', background: 'hsl(var(--background)/0.95)', backdropFilter: 'blur(8px)', color: 'hsl(var(--foreground))', boxShadow: '0 4px 20px -2px rgba(0,0,0,0.1)' }}
                        itemStyle={{ color: 'hsl(var(--foreground))', fontWeight: 500 }}
                      />
                      <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Opportunities Cards */}
            <Card className="xl:col-span-2 shadow-sm border-border/40 hover:shadow-md transition-all duration-300 rounded-2xl flex flex-col overflow-hidden">
              <CardHeader className="pb-4 border-b border-border/20">
                <CardTitle className="text-lg font-semibold tracking-tight">Top Content Opportunities</CardTitle>
                <CardDescription>High-priority gaps identified in your strategy.</CardDescription>
              </CardHeader>
              <CardContent className="p-0 flex-1 overflow-y-auto max-h-[340px] scrollbar-thin">
                <div className="divide-y divide-border/30">
                  {contentOpportunities.map((opp, i) => (
                    <div key={i} className="p-5 hover:bg-muted/30 transition-colors flex flex-col sm:flex-row gap-5 justify-between sm:items-center group">
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <h4 className="font-semibold text-foreground text-sm tracking-tight">{opp.keyword}</h4>
                          <Badge variant="outline" className={`text-[10px] uppercase tracking-wider py-0.5 px-2 h-5 rounded-md ${opp.priority === 'Critical' ? 'border-rose-500/30 text-rose-600 dark:text-rose-400 bg-rose-500/5' : opp.priority === 'High' ? 'border-amber-500/30 text-amber-600 dark:text-amber-400 bg-amber-500/5' : 'border-blue-500/30 text-blue-600 dark:text-blue-400 bg-blue-500/5'}`}>
                            {opp.priority}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-5 text-xs text-muted-foreground font-medium">
                          <span className="flex items-center gap-1.5"><TrendingUp className="size-3.5 text-emerald-500" /> {opp.traffic}</span>
                          <span className="flex items-center gap-1.5"><Target className="size-3.5 text-amber-500" /> Diff: {opp.difficulty}</span>
                        </div>
                      </div>
                      <div className="flex flex-col sm:items-end gap-3">
                        <span className="text-[11px] font-medium text-muted-foreground bg-muted px-2.5 py-1 rounded-md border border-border/40">
                          {opp.action}
                        </span>
                        <Button variant="ghost" size="sm" className="h-8 text-primary hover:text-primary hover:bg-primary/10 self-start sm:self-auto px-2 rounded-lg transition-all opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0">
                          Draft Content <ArrowRight className="ml-1.5 size-3.5" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Expandable Recommendations */}
          <Card className="shadow-sm border-border/40 hover:shadow-md transition-all duration-300 rounded-2xl overflow-hidden">
            <CardHeader className="bg-muted/10 border-b border-border/20 pb-4">
              <CardTitle className="text-lg font-semibold tracking-tight flex items-center gap-2">
                <Sparkles className="size-5 text-amber-500" />
                AI Strategic Recommendations
              </CardTitle>
              <CardDescription>Synthesized actionable insights from competitor analysis.</CardDescription>
            </CardHeader>
            <CardContent className="pt-2 pb-2">
              <Accordion type="single" collapsible className="w-full">
                {recommendations.map((rec, i) => (
                  <AccordionItem key={i} value={`item-${i}`} className="border-b-border/30 last:border-0">
                    <AccordionTrigger className="hover:no-underline hover:bg-muted/20 px-4 rounded-xl transition-colors py-5 my-1 group">
                      <div className="flex items-center gap-4 text-left">
                        <div className="p-2.5 bg-primary/10 rounded-xl shrink-0 group-hover:scale-110 group-hover:bg-primary/15 transition-all">
                          <Zap className="size-4.5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm tracking-tight text-foreground group-hover:text-primary transition-colors">{rec.title}</h4>
                          <p className="text-xs text-muted-foreground font-medium mt-1">Est. Timeframe: <span className="text-foreground/80">{rec.timeframe}</span></p>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pt-2 pb-6 text-muted-foreground leading-relaxed">
                      <p className="ml-[4.25rem] text-sm">{rec.description}</p>
                      <div className="ml-[4.25rem] mt-5 flex items-center gap-3">
                        <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20 shadow-none border border-primary/10 rounded-md font-medium px-2.5">
                          Impact: {rec.impact}
                        </Badge>
                        <Button size="sm" variant="outline" className="h-7 text-xs rounded-lg hover:bg-muted/50 border-border/60">Execute Plan</Button>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

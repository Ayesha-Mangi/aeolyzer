"use client"

import * as React from "react"
import {
  PenTool,
  Save,
  Share2,
  Download,
  FileText,
  Search,
  Wand2,
  CheckCircle2,
  AlertCircle,
  BarChart,
  List,
  History,
  Languages,
  Copy,
  LayoutTemplate
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
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart as RechartsBarChart,
  Bar,
  Cell
} from "recharts"

// --- MOCK DATA ---
const overviewMetrics = [
  { name: "Articles Created", value: "14", change: "+3 this week", icon: FileText, color: "text-blue-500", bgIcon: "text-blue-500/5" },
  { name: "SEO Score", value: "88/100", change: "Excellent", icon: BarChart, color: "text-emerald-500", bgIcon: "text-emerald-500/5" },
  { name: "Readability", value: "Grade 8", change: "Target met", icon: CheckCircle2, color: "text-purple-500", bgIcon: "text-purple-500/5" },
  { name: "AI Suggestions", value: "5", change: "Pending review", icon: Wand2, color: "text-amber-500", bgIcon: "text-amber-500/5" },
]

const seoChecklist = [
  { task: "Primary keyword in H1", status: "passed" },
  { task: "Meta description length", status: "passed" },
  { task: "Keyword density (2.4%)", status: "passed" },
  { task: "Internal linking", status: "warning", message: "Add 2 more internal links" },
  { task: "Image alt text", status: "failed", message: "3 images missing alt text" },
]

const aiSuggestions = [
  { suggestion: "Expand Introduction", description: "Your introduction is slightly brief. Adding a hook about recent industry trends could improve engagement metrics by ~15%.", impact: "High", priority: "Critical" },
  { suggestion: "Add FAQ Section", description: "Search intent analysis shows users frequently ask 'What is the cost of AI tools?'. Add an FAQ schema at the bottom.", impact: "Medium", priority: "High" },
  { suggestion: "Simplify Sentences", description: "Paragraph 4 contains sentences exceeding 25 words. Break them down to improve readability to Grade 7.", impact: "Low", priority: "Medium" },
]

const versionHistory = [
  { version: "v1.4", date: "Today, 10:42 AM", status: "Current" },
  { version: "v1.3", date: "Yesterday, 4:15 PM", status: "Autosaved" },
  { version: "v1.2", date: "Oct 24, 2:30 PM", status: "Published" },
  { version: "v1.1", date: "Oct 23, 11:00 AM", status: "Draft" },
]

const seoTrendData = [
  { time: "Draft 1", score: 45, readability: 60 },
  { time: "Draft 2", score: 62, readability: 75 },
  { time: "Draft 3", score: 78, readability: 82 },
  { time: "Current", score: 88, readability: 85 },
]

const keywordUsage = [
  { word: "AI Content", count: 12, fill: "hsl(var(--primary))" },
  { word: "SEO Strategy", count: 8, fill: "hsl(var(--muted-foreground))" },
  { word: "Marketing", count: 6, fill: "hsl(var(--border))" },
]
// -----------------

export default function ContentStudioPage() {
  const [isLoading, setIsLoading] = React.useState(true)
  const [searchQuery, setSearchQuery] = React.useState("")

  React.useEffect(() => {
    // Simulate loading state
    const timer = setTimeout(() => setIsLoading(false), 800)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="flex flex-col gap-8 p-6 md:p-10 max-w-[1600px] mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
      
      {/* Workspace Header */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6 bg-card/40 backdrop-blur-md p-6 rounded-3xl border border-border/40 shadow-sm">
        <div>
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-primary/10 rounded-xl">
              <PenTool className="size-6 text-primary" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">Content Studio</h1>
          </div>
          <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground font-medium">
            <span className="flex items-center gap-1.5"><LayoutTemplate className="size-4" /> Project: SEO Optimization Guide</span>
            <span className="w-1.5 h-1.5 rounded-full bg-border" />
            <span>Last saved: 2 mins ago</span>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full xl:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              type="search" 
              placeholder="Search documents..." 
              className="pl-9 h-10 bg-background/50 border-border/40 rounded-xl focus-visible:bg-background" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
            <Button variant="outline" size="sm" className="rounded-xl h-10 px-4"><Save className="mr-2 size-4" /> Save Draft</Button>
            <Button variant="outline" size="sm" className="rounded-xl h-10 px-4"><Share2 className="mr-2 size-4" /> Share</Button>
            <Button size="sm" className="rounded-xl h-10 px-5 shadow-md hover:shadow-lg transition-all"><PenTool className="mr-2 size-4" /> New Content</Button>
          </div>
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
            <div className="xl:col-span-2 animate-pulse bg-muted/30 border border-border/40 rounded-2xl h-[600px]" />
            <div className="xl:col-span-1 animate-pulse bg-muted/30 border border-border/40 rounded-2xl h-[600px]" />
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
            
            {/* AI Content Editor (Mock) */}
            <Card className="xl:col-span-2 shadow-sm border-border/40 hover:shadow-md transition-all duration-300 rounded-2xl flex flex-col bg-card/50 backdrop-blur-xl overflow-hidden">
              <div className="border-b border-border/20 bg-muted/10 p-4 flex flex-wrap gap-2 items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Button variant="ghost" size="sm" className="h-8 rounded-lg text-muted-foreground hover:text-foreground"><List className="mr-1.5 size-4" /> Outline</Button>
                  <Button variant="ghost" size="sm" className="h-8 rounded-lg text-muted-foreground hover:text-foreground"><FileText className="mr-1.5 size-4" /> Notes</Button>
                </div>
                <div className="flex items-center gap-1.5">
                  <Button variant="outline" size="sm" className="h-8 rounded-lg text-xs font-semibold text-primary border-primary/20 bg-primary/5 hover:bg-primary/10"><Wand2 className="mr-1.5 size-3.5" /> Improve SEO</Button>
                  <Button variant="outline" size="sm" className="h-8 rounded-lg text-xs font-semibold border-border/40"><Languages className="mr-1.5 size-3.5" /> Translate</Button>
                  <Button variant="outline" size="icon" className="h-8 w-8 rounded-lg border-border/40"><Copy className="size-3.5" /></Button>
                </div>
              </div>
              <CardContent className="p-8 flex-1 flex flex-col">
                <Input 
                  className="text-3xl font-bold border-none shadow-none px-0 focus-visible:ring-0 h-auto placeholder:text-muted-foreground/40 bg-transparent mb-6" 
                  defaultValue="10 Advanced SEO Strategies for 2026"
                />
                <div className="flex-1 w-full bg-muted/5 rounded-xl border border-border/30 p-6 min-h-[400px]">
                  <p className="text-muted-foreground leading-relaxed">
                    Search engine optimization is continually evolving. In this guide, we will explore the most impactful strategies that are shaping the future of organic search...
                  </p>
                  <div className="mt-8 p-4 bg-primary/5 border border-primary/10 rounded-xl animate-pulse">
                    <p className="text-sm text-primary/80 flex items-center"><Wand2 className="size-4 mr-2" /> AI is generating the next paragraph...</p>
                  </div>
                </div>
                <div className="mt-6 flex items-center justify-between text-xs text-muted-foreground font-medium px-2">
                  <span>Words: 1,240 / 2,000</span>
                  <span>Characters: 6,832</span>
                </div>
              </CardContent>
            </Card>

            {/* Sidebar Tools */}
            <div className="xl:col-span-1 space-y-8">
              
              {/* SEO Optimization */}
              <Card className="shadow-sm border-border/40 hover:shadow-md transition-all duration-300 rounded-2xl overflow-hidden bg-card/50 backdrop-blur-xl">
                <CardHeader className="pb-4 border-b border-border/10 bg-muted/5">
                  <CardTitle className="text-lg font-semibold tracking-tight">SEO Optimization</CardTitle>
                  <CardDescription>Real-time technical on-page analysis.</CardDescription>
                </CardHeader>
                <CardContent className="pt-5 pb-6">
                  <div className="space-y-5">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium text-foreground">Overall SEO Score</span>
                        <span className="font-bold text-emerald-500">88/100</span>
                      </div>
                      <Progress value={88} className="h-2 [&>div]:bg-emerald-500" />
                    </div>
                    
                    <div className="pt-2">
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Checklist</h4>
                      <div className="space-y-3">
                        {seoChecklist.map((item, i) => (
                          <div key={i} className="flex items-start gap-3">
                            {item.status === 'passed' ? (
                              <CheckCircle2 className="size-4 text-emerald-500 shrink-0 mt-0.5" />
                            ) : item.status === 'warning' ? (
                              <AlertCircle className="size-4 text-amber-500 shrink-0 mt-0.5" />
                            ) : (
                              <AlertCircle className="size-4 text-rose-500 shrink-0 mt-0.5" />
                            )}
                            <div className="space-y-0.5">
                              <p className={`text-sm font-medium ${item.status === 'passed' ? 'text-foreground' : 'text-foreground'}`}>{item.task}</p>
                              {item.message && <p className="text-xs text-muted-foreground">{item.message}</p>}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* AI Suggestions */}
              <Card className="shadow-sm border-border/40 hover:shadow-md transition-all duration-300 rounded-2xl overflow-hidden bg-card/50 backdrop-blur-xl">
                <CardHeader className="pb-3 border-b border-border/10 bg-muted/5">
                  <CardTitle className="text-lg font-semibold tracking-tight flex items-center gap-2">
                    <Wand2 className="size-4.5 text-amber-500" /> AI Suggestions
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <Accordion type="single" collapsible className="w-full">
                    {aiSuggestions.map((sug, i) => (
                      <AccordionItem key={i} value={`sug-${i}`} className="border-b-border/30 last:border-0">
                        <AccordionTrigger className="hover:no-underline hover:bg-muted/20 px-5 rounded-xl transition-colors py-4 my-0.5 group">
                          <div className="flex items-center gap-3 text-left">
                            <div>
                              <h4 className="font-semibold text-sm tracking-tight text-foreground group-hover:text-primary transition-colors">{sug.suggestion}</h4>
                              <Badge variant="outline" className={`mt-1.5 text-[10px] uppercase tracking-wider py-0 px-1.5 h-4 rounded-sm ${sug.priority === 'Critical' ? 'border-rose-500/30 text-rose-600 dark:text-rose-400 bg-rose-500/5' : 'border-amber-500/30 text-amber-600 dark:text-amber-400 bg-amber-500/5'}`}>
                                {sug.priority}
                              </Badge>
                            </div>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-5 pt-0 pb-5 text-muted-foreground leading-relaxed text-sm">
                          <p>{sug.description}</p>
                          <Button size="sm" variant="secondary" className="mt-4 h-8 text-xs rounded-lg w-full bg-primary/10 hover:bg-primary/20 text-primary border border-primary/10">Apply Suggestion</Button>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>

            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {/* Content Analytics Chart */}
            <Card className="shadow-sm border-border/40 hover:shadow-md transition-all duration-300 rounded-2xl overflow-hidden bg-card/50 backdrop-blur-xl flex flex-col">
              <CardHeader>
                <CardTitle className="text-lg font-semibold tracking-tight">Content Score Progression</CardTitle>
                <CardDescription>SEO and Readability improvements across drafts.</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 px-2 pb-6">
                <div className="h-[250px] w-full mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={seoTrendData} margin={{ top: 10, right: 30, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorRead" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--chart-2, 160 60% 45%))" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="hsl(var(--chart-2, 160 60% 45%))" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" strokeOpacity={0.4} vertical={false} />
                      <XAxis dataKey="time" fontSize={12} tickLine={false} axisLine={false} tick={{ fill: 'hsl(var(--muted-foreground))' }} dy={10} />
                      <YAxis fontSize={12} tickLine={false} axisLine={false} tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                      <Tooltip 
                        contentStyle={{ borderRadius: '12px', border: '1px solid hsl(var(--border))', background: 'hsl(var(--background)/0.95)', backdropFilter: 'blur(8px)', color: 'hsl(var(--foreground))', boxShadow: '0 4px 20px -2px rgba(0,0,0,0.1)' }}
                        itemStyle={{ fontWeight: 500 }}
                      />
                      <Area type="monotone" dataKey="score" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorScore)" strokeWidth={2} name="SEO Score" />
                      <Area type="monotone" dataKey="readability" stroke="hsl(var(--chart-2, 160 60% 45%))" fillOpacity={1} fill="url(#colorRead)" strokeWidth={2} name="Readability" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Version History Table */}
            <Card className="shadow-sm border-border/40 hover:shadow-md transition-all duration-300 rounded-2xl overflow-hidden bg-card/50 backdrop-blur-xl flex flex-col">
              <CardHeader className="flex flex-row justify-between items-center pb-4 border-b border-border/20">
                <div>
                  <CardTitle className="text-lg font-semibold tracking-tight flex items-center gap-2"><History className="size-5" /> Version History</CardTitle>
                  <CardDescription className="mt-1">Restore previous edits and snapshots.</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="p-0 flex-1 overflow-x-auto">
                <Table>
                  <TableHeader className="bg-muted/10">
                    <TableRow className="hover:bg-transparent border-border/20">
                      <TableHead className="pl-6 h-11 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Version</TableHead>
                      <TableHead className="h-11 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Date</TableHead>
                      <TableHead className="h-11 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Status</TableHead>
                      <TableHead className="pr-6 h-11 text-xs font-semibold uppercase tracking-wider text-muted-foreground text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {versionHistory.map((row, i) => (
                      <TableRow key={i} className="hover:bg-muted/20 transition-colors border-border/20 group">
                        <TableCell className="pl-6 py-4 font-semibold text-foreground">{row.version}</TableCell>
                        <TableCell className="py-4 text-muted-foreground font-medium text-sm">{row.date}</TableCell>
                        <TableCell className="py-4">
                          <Badge variant="secondary" className={`font-medium text-xs shadow-none rounded-md px-2 py-0.5 border ${row.status === 'Current' ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' : row.status === 'Published' ? 'bg-blue-500/10 text-blue-600 border-blue-500/20' : 'bg-muted text-muted-foreground border-border/40'}`}>
                            {row.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="pr-6 py-4 text-right">
                          <Button variant="outline" size="sm" className="h-8 rounded-lg text-xs hover:bg-muted/50 disabled:opacity-50" disabled={row.status === 'Current'}>
                            Restore
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
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

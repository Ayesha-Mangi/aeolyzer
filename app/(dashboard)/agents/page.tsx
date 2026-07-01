"use client"

import * as React from "react"
import {
  Bot,
  Globe,
  FileText,
  Zap,
  TrendingUp,
  Activity,
  ChevronRight,
  Play,
  Pause,
  RotateCcw,
  BookOpen,
  Search,
  Sparkles,
  Target,
  BrainCircuit,
  Link2,
  PenTool,
  Timer,
  RefreshCw,
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
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

// ─── MOCK DATA ──────────────────────────────────────────────────────────────

const agentOverview = [
  { label: "Total Agents", value: "2", icon: Bot, color: "#e07b53", badge: "Configured" },
  { label: "Active Agents", value: "2", icon: Activity, color: "#10b981", badge: "Online" },
  { label: "Running Tasks", value: "5", icon: Zap, color: "#f59e0b", badge: "Live" },
  { label: "Avg Confidence", value: "94.5%", icon: Target, color: "#8b5cf6", badge: "High" },
  { label: "Success Rate", value: "97.8%", icon: TrendingUp, color: "#6366f1", badge: "30 Days" },
]

const auditorTimeline = [
  { event: "Initiated full crawl on example-saas.com", time: "2 mins ago", icon: Globe, color: "#e07b53" },
  { event: "Detected 12 broken internal links", time: "4 mins ago", icon: Link2, color: "#ef4444" },
  { event: "Core Web Vitals analysis complete", time: "9 mins ago", icon: Zap, color: "#f59e0b" },
  { event: "Generated audit report — 42 issues", time: "14 mins ago", icon: FileText, color: "#10b981" },
  { event: "Crawl started for techstore.io", time: "1h ago", icon: Globe, color: "#e07b53" },
]

const seoTimeline = [
  { event: "Generated 3 long-form blog outlines", time: "5 mins ago", icon: PenTool, color: "#6366f1" },
  { event: "Keyword cluster analysis complete", time: "18 mins ago", icon: Search, color: "#8b5cf6" },
  { event: "SEO meta descriptions written (12 pages)", time: "32 mins ago", icon: FileText, color: "#10b981" },
  { event: "Content gap opportunities identified (8)", time: "1h ago", icon: Target, color: "#f59e0b" },
  { event: "Semantic intent mapping for 47 keywords", time: "2h ago", icon: BrainCircuit, color: "#e07b53" },
]

const auditorPerformance = [
  { metric: "Crawl Speed", value: 92 },
  { metric: "Issue Detection", value: 97 },
  { metric: "Link Accuracy", value: 89 },
  { metric: "Report Quality", value: 95 },
  { metric: "Uptime", value: 99 },
]

const seoPerformance = [
  { metric: "Content Quality", value: 94 },
  { metric: "Keyword Accuracy", value: 91 },
  { metric: "SEO Score Boost", value: 88 },
  { metric: "Readability", value: 96 },
  { metric: "Originality", value: 93 },
]

const recentSeoOutputs = [
  { title: "Blog outline: \"Top 10 SEO Mistakes in 2026\"", type: "Blog Outline", score: 96, words: 850 },
  { title: "Meta description for /pricing page", type: "Meta Copy", score: 92, words: 155 },
  { title: "FAQ schema markup for /features", type: "Schema", score: 98, words: 320 },
  { title: "Internal linking strategy — 24 suggestions", type: "Strategy", score: 90, words: 1200 },
]

const seoSuggestions = [
  { label: "Add structured data to 8 pages", priority: "High" },
  { label: "Fix 12 broken internal links", priority: "Critical" },
  { label: "Improve LCP on /landing — currently 3.2s", priority: "High" },
  { label: "Generate alt text for 47 images", priority: "Medium" },
  { label: "Create topic cluster for \"AI SEO\"", priority: "Medium" },
]

const activityFeed = [
  { event: "Website analyzed", detail: "example-saas.com — Score: 88/100", time: "2 mins ago", icon: Globe, color: "#e07b53" },
  { event: "Keywords researched", detail: "Cluster of 47 high-intent keywords mapped", time: "18 mins ago", icon: Search, color: "#6366f1" },
  { event: "SEO recommendations generated", detail: "24 actionable suggestions created", time: "32 mins ago", icon: Sparkles, color: "#8b5cf6" },
  { event: "Content outline created", detail: "3 pillar articles + 9 supporting pages", time: "1h ago", icon: PenTool, color: "#10b981" },
  { event: "Report completed", detail: "Weekly Performance Report delivered", time: "3h ago", icon: FileText, color: "#f59e0b" },
]

const utilizationData = [
  { hour: "00h", auditor: 10, seo: 5 },
  { hour: "04h", auditor: 15, seo: 8 },
  { hour: "08h", auditor: 72, seo: 65 },
  { hour: "12h", auditor: 90, seo: 88 },
  { hour: "16h", auditor: 85, seo: 78 },
  { hour: "20h", auditor: 40, seo: 50 },
]

const taskDistData = [
  { name: "Web Audit", value: 38, color: "#e07b53" },
  { name: "Content Gen", value: 32, color: "#6366f1" },
  { name: "Research", value: 18, color: "#10b981" },
  { name: "Reporting", value: 12, color: "#f59e0b" },
]

const successTrendData = [
  { day: "Mon", auditor: 95, seo: 98 },
  { day: "Tue", auditor: 97, seo: 96 },
  { day: "Wed", auditor: 94, seo: 99 },
  { day: "Thu", auditor: 98, seo: 97 },
  { day: "Fri", auditor: 96, seo: 98 },
  { day: "Sat", auditor: 99, seo: 94 },
  { day: "Sun", auditor: 97, seo: 96 },
]

const processingTimeData = [
  { task: "Crawl", time: 4.2 },
  { task: "SEO", time: 2.1 },
  { task: "Content", time: 6.8 },
  { task: "Report", time: 1.4 },
  { task: "Research", time: 3.5 },
]

// ─── HELPERS ────────────────────────────────────────────────────────────────

const tooltipStyle = {
  borderRadius: "8px",
  border: "1px solid #3a3936",
  background: "#1e1d1a",
  color: "#ececec",
  fontSize: "12px",
}

function ConfidenceBar({ value, color = "#e07b53" }: { value: number; color?: string }) {
  return (
    <div className="h-2 rounded-full bg-[#2b2a27] overflow-hidden">
      <div
        className="h-full rounded-full transition-all duration-700"
        style={{ width: `${value}%`, background: `linear-gradient(90deg, ${color}, ${color}cc)` }}
      />
    </div>
  )
}

function PriorityBadge({ priority }: { priority: string }) {
  const styles: Record<string, string> = {
    Critical: "bg-red-500/10 text-red-400",
    High: "bg-amber-500/10 text-amber-400",
    Medium: "bg-blue-500/10 text-blue-400",
    Low: "bg-[#6b6b66]/10 text-[#a3a29e]",
  }
  return (
    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${styles[priority] ?? styles.Low}`}>
      {priority}
    </span>
  )
}

// ─── PAGE ───────────────────────────────────────────────────────────────────

export default function AgentsPage() {
  const [activeTab, setActiveTab] = React.useState<"auditor" | "seo">("auditor")

  const handleAction = (action: string) => {
    // Simulated action — no backend
    console.log("Agent action:", action)
  }

  return (
    <div
      className="flex flex-col gap-6 p-4 md:p-8 max-w-7xl mx-auto w-full animate-fade-in-up"
      role="main"
      aria-label="AI Agent Management Dashboard"
    >
      {/* ── Page Header ── */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#6b6b66] tracking-wider uppercase mb-1">
            <span>Website Auditor AI</span>
            <ChevronRight size={12} />
            <span>Automation</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-[#ececec] flex items-center gap-2">
            <Bot size={22} className="text-[#e07b53]" strokeWidth={2} />
            AI Agent Management
          </h1>
          <p className="text-sm text-[#a3a29e] mt-0.5">
            Monitor, control and analyze your specialized AI agents
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleAction("refresh")}
            className="border-[#3a3936] text-[#a3a29e] hover:bg-[#393836] hover:text-[#ececec] gap-1.5"
            aria-label="Refresh agents"
          >
            <RefreshCw size={14} />
            Refresh
          </Button>
          <Button
            size="sm"
            onClick={() => handleAction("run")}
            className="bg-[#e07b53] hover:bg-[#d06a42] text-[#2b2a27] font-semibold gap-1.5"
            aria-label="Run all agents"
          >
            <Play size={14} />
            Run Agents
          </Button>
        </div>
      </div>

      {/* ── Agent Overview Metrics ── */}
      <section aria-label="Agent Overview">
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
          {agentOverview.map((m) => {
            const Icon = m.icon
            return (
              <Card
                key={m.label}
                className="bg-[#393836]/60 border-[#3a3936] hover:border-[#4a4945] hover:bg-[#393836] transition-all duration-200 hover:scale-[1.02] cursor-default"
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="p-2 rounded-lg" style={{ background: `${m.color}15` }}>
                      <Icon size={16} style={{ color: m.color }} />
                    </div>
                    <span
                      className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                      style={{ background: `${m.color}15`, color: m.color }}
                    >
                      {m.badge}
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-[#ececec] tracking-tight">{m.value}</div>
                  <div className="text-xs text-[#a3a29e] mt-0.5">{m.label}</div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </section>

      {/* ── Tab Selector ── */}
      <div className="flex items-center gap-1 p-1 rounded-xl bg-[#393836]/40 border border-[#3a3936] w-fit" role="tablist" aria-label="Agent selector">
        <button
          role="tab"
          aria-selected={activeTab === "auditor"}
          onClick={() => setActiveTab("auditor")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
            activeTab === "auditor"
              ? "bg-[#e07b53] text-[#2b2a27] shadow-sm"
              : "text-[#a3a29e] hover:text-[#ececec] hover:bg-[#393836]"
          }`}
        >
          <Globe size={14} />
          Website Auditor
        </button>
        <button
          role="tab"
          aria-selected={activeTab === "seo"}
          onClick={() => setActiveTab("seo")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
            activeTab === "seo"
              ? "bg-[#e07b53] text-[#2b2a27] shadow-sm"
              : "text-[#a3a29e] hover:text-[#ececec] hover:bg-[#393836]"
          }`}
        >
          <PenTool size={14} />
          SEO Content Agent
        </button>
      </div>

      {/* ── Agent 1: Website Auditor ── */}
      {activeTab === "auditor" && (
        <div className="flex flex-col gap-6 animate-fade-in-up">
          {/* Agent Card */}
          <Card className="bg-[#393836]/40 border-[#3a3936]">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Identity */}
                <div className="flex items-start gap-4 md:w-64 flex-shrink-0">
                  <div className="relative flex-shrink-0">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#e07b53] to-[#d06a42] flex items-center justify-center shadow-lg">
                      <Globe size={26} className="text-white" />
                    </div>
                    <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-400 border-2 border-[#393836]" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-[#ececec]">Website Auditor</h2>
                    <p className="text-xs text-[#6b6b66] mt-0.5">AI-Powered Web Crawler</p>
                    <div className="flex items-center gap-1.5 mt-2">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        Active
                      </span>
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="hidden md:block w-px bg-[#3a3936]" />

                {/* Stats Grid */}
                <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  <div>
                    <p className="text-[10px] font-semibold text-[#6b6b66] uppercase tracking-wider">Health Score</p>
                    <p className="text-xl font-bold text-[#ececec] mt-1">98<span className="text-xs text-[#6b6b66]">/100</span></p>
                    <ConfidenceBar value={98} color="#10b981" />
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold text-[#6b6b66] uppercase tracking-wider">Confidence</p>
                    <p className="text-xl font-bold text-[#ececec] mt-1">96<span className="text-xs text-[#6b6b66]">%</span></p>
                    <ConfidenceBar value={96} color="#e07b53" />
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold text-[#6b6b66] uppercase tracking-wider">Processing</p>
                    <p className="text-xl font-bold text-[#ececec] mt-1">4.2<span className="text-xs text-[#6b6b66]">min</span></p>
                    <ConfidenceBar value={72} color="#6366f1" />
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold text-[#6b6b66] uppercase tracking-wider">Last Active</p>
                    <p className="text-sm font-semibold text-[#ececec] mt-1">2 mins ago</p>
                    <p className="text-[10px] text-[#6b6b66]">09:14 AM today</p>
                  </div>
                  <div className="col-span-2 sm:col-span-3 lg:col-span-4">
                    <p className="text-[10px] font-semibold text-[#6b6b66] uppercase tracking-wider mb-1">Current Task</p>
                    <div className="flex items-center gap-2 p-2 rounded-lg bg-[#2b2a27] border border-[#3a3936]">
                      <div className="w-2 h-2 rounded-full bg-[#e07b53] animate-pulse flex-shrink-0" />
                      <p className="text-xs text-[#ececec] font-medium">Crawling example-saas.com — 87 / 124 pages complete</p>
                      <Progress value={70} className="h-1.5 flex-1 min-w-0 ml-auto max-w-[100px]" />
                    </div>
                  </div>
                  <div className="col-span-2 sm:col-span-3 lg:col-span-4">
                    <p className="text-[10px] font-semibold text-[#6b6b66] uppercase tracking-wider mb-2">Assigned Websites</p>
                    <div className="flex flex-wrap gap-2">
                      {["example-saas.com", "techstore.io", "startup.dev", "marketpro.co"].map((site) => (
                        <span key={site} className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#2b2a27] border border-[#3a3936] text-xs text-[#a3a29e] hover:border-[#e07b53]/30 hover:text-[#ececec] transition-colors">
                          <Globe size={10} className="text-[#e07b53]" /> {site}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Activity Timeline + Performance */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {/* Activity Timeline */}
            <Card className="bg-[#393836]/40 border-[#3a3936]">
              <CardHeader className="pb-3">
                <CardTitle className="text-[#ececec] text-base font-semibold">Activity Timeline</CardTitle>
                <CardDescription className="text-xs text-[#6b6b66]">Recent agent actions</CardDescription>
              </CardHeader>
              <CardContent className="px-4 pb-4 space-y-1">
                {auditorTimeline.map((item, i) => {
                  const Icon = item.icon
                  return (
                    <div key={i} className="flex gap-3 py-2.5 border-b border-[#3a3936]/60 last:border-0 hover:bg-[#393836]/30 px-2 -mx-2 rounded-lg transition-colors">
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${item.color}15` }}>
                        <Icon size={13} style={{ color: item.color }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-[#ececec]">{item.event}</p>
                      </div>
                      <span className="text-[10px] text-[#6b6b66] flex-shrink-0">{item.time}</span>
                    </div>
                  )
                })}
              </CardContent>
            </Card>

            {/* Performance Metrics */}
            <Card className="bg-[#393836]/40 border-[#3a3936]">
              <CardHeader className="pb-3">
                <CardTitle className="text-[#ececec] text-base font-semibold">Performance Metrics</CardTitle>
                <CardDescription className="text-xs text-[#6b6b66]">Quality indicators by capability</CardDescription>
              </CardHeader>
              <CardContent className="px-4 pb-4 space-y-4 mt-2">
                {auditorPerformance.map((p) => (
                  <div key={p.metric} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium text-[#a3a29e]">{p.metric}</span>
                      <span className="font-semibold text-[#ececec]">{p.value}%</span>
                    </div>
                    <ConfidenceBar value={p.value} color="#e07b53" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* ── Agent 2: SEO Content Agent ── */}
      {activeTab === "seo" && (
        <div className="flex flex-col gap-6 animate-fade-in-up">
          {/* Agent Card */}
          <Card className="bg-[#393836]/40 border-[#3a3936]">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Identity */}
                <div className="flex items-start gap-4 md:w-64 flex-shrink-0">
                  <div className="relative flex-shrink-0">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] flex items-center justify-center shadow-lg">
                      <PenTool size={26} className="text-white" />
                    </div>
                    <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-400 border-2 border-[#393836]" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-[#ececec]">SEO Content Agent</h2>
                    <p className="text-xs text-[#6b6b66] mt-0.5">AI Content & Keyword Engine</p>
                    <div className="flex items-center gap-1.5 mt-2">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        Active
                      </span>
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="hidden md:block w-px bg-[#3a3936]" />

                {/* Stats Grid */}
                <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  <div>
                    <p className="text-[10px] font-semibold text-[#6b6b66] uppercase tracking-wider">Generated</p>
                    <p className="text-xl font-bold text-[#ececec] mt-1">284<span className="text-xs text-[#6b6b66]"> pieces</span></p>
                    <ConfidenceBar value={88} color="#6366f1" />
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold text-[#6b6b66] uppercase tracking-wider">Confidence</p>
                    <p className="text-xl font-bold text-[#ececec] mt-1">93<span className="text-xs text-[#6b6b66]">%</span></p>
                    <ConfidenceBar value={93} color="#8b5cf6" />
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold text-[#6b6b66] uppercase tracking-wider">Active Tasks</p>
                    <p className="text-xl font-bold text-[#ececec] mt-1">3<span className="text-xs text-[#6b6b66]"> running</span></p>
                    <ConfidenceBar value={60} color="#f59e0b" />
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold text-[#6b6b66] uppercase tracking-wider">Last Active</p>
                    <p className="text-sm font-semibold text-[#ececec] mt-1">5 mins ago</p>
                    <p className="text-[10px] text-[#6b6b66]">09:11 AM today</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Outputs + SEO Suggestions */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {/* Recent Outputs */}
            <Card className="bg-[#393836]/40 border-[#3a3936]">
              <CardHeader className="pb-3">
                <CardTitle className="text-[#ececec] text-base font-semibold">Recent Outputs</CardTitle>
                <CardDescription className="text-xs text-[#6b6b66]">Latest AI-generated content</CardDescription>
              </CardHeader>
              <CardContent className="px-4 pb-4 space-y-2">
                {recentSeoOutputs.map((output, i) => (
                  <div key={i} className="p-3 rounded-xl border border-[#3a3936] bg-[#2b2a27]/60 hover:border-[#4a4945] hover:bg-[#393836]/40 transition-colors">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-semibold text-[#ececec] leading-tight">{output.title}</p>
                        <p className="text-[10px] text-[#6b6b66] mt-1">{output.words} words · {output.type}</p>
                      </div>
                      <div className="flex items-center gap-1.5 flex-shrink-0">
                        <span className="text-xs font-bold text-emerald-400">{output.score}</span>
                        <span className="text-[10px] text-[#6b6b66]">score</span>
                      </div>
                    </div>
                    <div className="mt-2">
                      <ConfidenceBar value={output.score} color="#6366f1" />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* SEO Suggestions + Activity Timeline */}
            <div className="flex flex-col gap-6">
              <Card className="bg-[#393836]/40 border-[#3a3936]">
                <CardHeader className="pb-3">
                  <CardTitle className="text-[#ececec] text-base font-semibold">SEO Suggestions</CardTitle>
                  <CardDescription className="text-xs text-[#6b6b66]">AI-generated recommendations</CardDescription>
                </CardHeader>
                <CardContent className="px-4 pb-4 space-y-2">
                  {seoSuggestions.map((s, i) => (
                    <div key={i} className="flex items-center justify-between gap-3 p-2.5 rounded-lg border border-[#3a3936] bg-[#2b2a27]/40 hover:bg-[#393836]/30 transition-colors">
                      <div className="flex items-center gap-2 min-w-0">
                        <Sparkles size={12} className="text-[#8b5cf6] flex-shrink-0" />
                        <span className="text-xs text-[#a3a29e] truncate">{s.label}</span>
                      </div>
                      <PriorityBadge priority={s.priority} />
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Activity Timeline */}
              <Card className="bg-[#393836]/40 border-[#3a3936]">
                <CardHeader className="pb-3">
                  <CardTitle className="text-[#ececec] text-base font-semibold">Activity Timeline</CardTitle>
                </CardHeader>
                <CardContent className="px-4 pb-4 space-y-1">
                  {seoTimeline.slice(0, 4).map((item, i) => {
                    const Icon = item.icon
                    return (
                      <div key={i} className="flex gap-3 py-2 border-b border-[#3a3936]/60 last:border-0">
                        <div className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${item.color}15` }}>
                          <Icon size={11} style={{ color: item.color }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-[#ececec] leading-tight">{item.event}</p>
                        </div>
                        <span className="text-[10px] text-[#6b6b66] flex-shrink-0">{item.time}</span>
                      </div>
                    )
                  })}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* SEO Agent Performance */}
          <Card className="bg-[#393836]/40 border-[#3a3936]">
            <CardHeader className="pb-3">
              <CardTitle className="text-[#ececec] text-base font-semibold">Performance Metrics</CardTitle>
              <CardDescription className="text-xs text-[#6b6b66]">Quality indicators by capability</CardDescription>
            </CardHeader>
            <CardContent className="px-4 pb-4 space-y-4 mt-2">
              {seoPerformance.map((p) => (
                <div key={p.metric} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-[#a3a29e]">{p.metric}</span>
                    <span className="font-semibold text-[#ececec]">{p.value}%</span>
                  </div>
                  <ConfidenceBar value={p.value} color="#6366f1" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      )}

      {/* ── Agent Activity Feed ── */}
      <section aria-label="Agent Activity Feed">
        <Card className="bg-[#393836]/40 border-[#3a3936]">
          <CardHeader className="pb-3">
            <CardTitle className="text-[#ececec] text-base font-semibold">Agent Activity Feed</CardTitle>
            <CardDescription className="text-xs text-[#6b6b66]">Combined real-time AI actions across all agents</CardDescription>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1">
              {activityFeed.map((item, i) => {
                const Icon = item.icon
                return (
                  <div key={i} className="flex gap-3 py-2.5 border-b border-[#3a3936]/60 last:border-0 hover:bg-[#393836]/30 px-2 -mx-2 rounded-lg transition-colors">
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: `${item.color}15` }}>
                      <Icon size={13} style={{ color: item.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-[#ececec]">{item.event}</p>
                      <p className="text-[10px] text-[#6b6b66] mt-0.5 leading-relaxed">{item.detail}</p>
                    </div>
                    <span className="text-[10px] text-[#6b6b66] flex-shrink-0 mt-0.5">{item.time}</span>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* ── Quick Actions ── */}
      <section aria-label="Quick Actions">
        <Card className="bg-[#393836]/40 border-[#3a3936]">
          <CardHeader className="pb-3">
            <CardTitle className="text-[#ececec] text-base font-semibold">Quick Actions</CardTitle>
            <CardDescription className="text-xs text-[#6b6b66]">Control and manage your AI agents</CardDescription>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <div className="flex flex-wrap gap-3">
              <Button
                size="sm"
                onClick={() => handleAction("run")}
                className="bg-[#e07b53] hover:bg-[#d06a42] text-[#2b2a27] font-semibold gap-1.5"
                aria-label="Run agent"
              >
                <Play size={14} /> Run Agent
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleAction("pause")}
                className="border-amber-500/30 text-amber-400 hover:bg-amber-500/10 gap-1.5"
                aria-label="Pause agent"
              >
                <Pause size={14} /> Pause Agent
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleAction("restart")}
                className="border-[#6366f1]/30 text-[#818cf8] hover:bg-[#6366f1]/10 gap-1.5"
                aria-label="Restart agent"
              >
                <RotateCcw size={14} /> Restart Agent
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleAction("logs")}
                className="border-[#3a3936] text-[#a3a29e] hover:bg-[#393836] hover:text-[#ececec] gap-1.5"
                aria-label="View agent logs"
              >
                <BookOpen size={14} /> View Logs
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleAction("assign")}
                className="border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 gap-1.5"
                aria-label="Assign task to agent"
              >
                <Target size={14} /> Assign Task
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* ── AI Performance Analytics ── */}
      <section aria-label="AI Performance Analytics">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {/* Agent Utilization */}
          <Card className="bg-[#393836]/40 border-[#3a3936] md:col-span-2">
            <CardHeader className="pb-2">
              <CardTitle className="text-[#ececec] text-sm font-semibold">Agent Utilization</CardTitle>
              <CardDescription className="text-xs text-[#6b6b66]">Activity by hour of day (%)</CardDescription>
            </CardHeader>
            <CardContent className="h-[190px] px-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={utilizationData} margin={{ top: 8, right: 8, left: -28, bottom: 0 }}>
                  <defs>
                    <linearGradient id="auditorGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#e07b53" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#e07b53" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="seoGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="hour" tick={{ fill: "#6b6b66", fontSize: 10 }} tickLine={false} axisLine={false} />
                  <YAxis tick={{ fill: "#6b6b66", fontSize: 10 }} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={tooltipStyle} cursor={{ stroke: "#3a3936" }} />
                  <Area type="monotone" dataKey="auditor" name="Web Auditor" stroke="#e07b53" strokeWidth={2} fill="url(#auditorGrad)" />
                  <Area type="monotone" dataKey="seo" name="SEO Content" stroke="#6366f1" strokeWidth={2} fill="url(#seoGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Task Distribution */}
          <Card className="bg-[#393836]/40 border-[#3a3936]">
            <CardHeader className="pb-2">
              <CardTitle className="text-[#ececec] text-sm font-semibold">Task Distribution</CardTitle>
              <CardDescription className="text-xs text-[#6b6b66]">By category</CardDescription>
            </CardHeader>
            <CardContent className="h-[190px] flex items-center justify-center px-2">
              <div className="flex items-center gap-3 w-full">
                <div className="w-[100px] h-[100px] flex-shrink-0">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={taskDistData} cx="50%" cy="50%" innerRadius={28} outerRadius={46} paddingAngle={3} dataKey="value">
                        {taskDistData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={tooltipStyle} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-1.5 flex-1 min-w-0">
                  {taskDistData.map((d) => (
                    <div key={d.name} className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: d.color }} />
                      <span className="text-[10px] text-[#a3a29e] truncate">{d.name}</span>
                      <span className="text-[10px] font-semibold text-[#ececec] ml-auto">{d.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Success Rate */}
          <Card className="bg-[#393836]/40 border-[#3a3936]">
            <CardHeader className="pb-2">
              <CardTitle className="text-[#ececec] text-sm font-semibold">Success Rate</CardTitle>
              <CardDescription className="text-xs text-[#6b6b66]">7-day per agent (%)</CardDescription>
            </CardHeader>
            <CardContent className="h-[190px] px-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={successTrendData} margin={{ top: 8, right: 4, left: -28, bottom: 0 }}>
                  <XAxis dataKey="day" tick={{ fill: "#6b6b66", fontSize: 10 }} tickLine={false} axisLine={false} />
                  <YAxis domain={[88, 100]} tick={{ fill: "#6b6b66", fontSize: 10 }} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "#3a3936" }} />
                  <Bar dataKey="auditor" name="Web Auditor" radius={[2, 2, 0, 0]} fill="#e07b53" />
                  <Bar dataKey="seo" name="SEO Content" radius={[2, 2, 0, 0]} fill="#6366f1" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Avg Processing Time */}
          <Card className="bg-[#393836]/40 border-[#3a3936] md:col-span-2 xl:col-span-4">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-[#ececec] text-sm font-semibold">Average Processing Time</CardTitle>
                  <CardDescription className="text-xs text-[#6b6b66]">Execution time by task type (minutes)</CardDescription>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-medium text-[#a3a29e] bg-[#2b2a27] px-2.5 py-1 rounded-lg border border-[#3a3936]">
                  <Timer size={12} />
                  Avg: 3m 36s
                </div>
              </div>
            </CardHeader>
            <CardContent className="h-[170px] px-2 pb-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={processingTimeData} margin={{ top: 8, right: 8, left: -28, bottom: 0 }} layout="vertical">
                  <XAxis type="number" tick={{ fill: "#6b6b66", fontSize: 10 }} tickLine={false} axisLine={false} />
                  <YAxis dataKey="task" type="category" tick={{ fill: "#a3a29e", fontSize: 11 }} tickLine={false} axisLine={false} width={55} />
                  <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "#3a3936" }} />
                  <Bar dataKey="time" name="Minutes" radius={[0, 4, 4, 0]}>
                    {processingTimeData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={["#e07b53", "#6366f1", "#8b5cf6", "#10b981", "#f59e0b"][index % 5]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}

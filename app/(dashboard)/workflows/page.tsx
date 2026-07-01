"use client"

import * as React from "react"
import {
  GitBranch,
  Play,
  Pause,
  RotateCcw,
  Copy,
  Trash2,
  Plus,
  CheckCircle2,
  Clock,
  TrendingUp,
  TrendingDown,
  Zap,
  Activity,
  Timer,
  ChevronRight,
  Bot,
  Globe,
  FileText,
  Bell,
  RefreshCw,
  Layers,
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
  LineChart,
  Line,
} from "recharts"

// ─── MOCK DATA ──────────────────────────────────────────────────────────────

const overviewMetrics = [
  {
    label: "Total Workflows",
    value: "24",
    trend: "+3",
    trendUp: true,
    icon: GitBranch,
    color: "#6366f1",
    badge: "All Time",
  },
  {
    label: "Active Workflows",
    value: "7",
    trend: "+1",
    trendUp: true,
    icon: Activity,
    color: "#10b981",
    badge: "Running",
  },
  {
    label: "Completed Tasks",
    value: "1,284",
    trend: "+142",
    trendUp: true,
    icon: CheckCircle2,
    color: "#e07b53",
    badge: "This Month",
  },
  {
    label: "Running Jobs",
    value: "3",
    trend: "-1",
    trendUp: false,
    icon: Zap,
    color: "#f59e0b",
    badge: "Live",
  },
  {
    label: "Success Rate",
    value: "97.4%",
    trend: "+0.8%",
    trendUp: true,
    icon: TrendingUp,
    color: "#8b5cf6",
    badge: "30 Days",
  },
]

const activeWorkflows = [
  {
    id: "wf-001",
    name: "Full SEO Audit Pipeline",
    status: "running",
    progress: 68,
    lastRun: "2 mins ago",
    nextRun: "In 6h",
    execTime: "4m 12s",
    agent: "Website Auditor",
  },
  {
    id: "wf-002",
    name: "Content Generation Batch",
    status: "running",
    progress: 45,
    lastRun: "18 mins ago",
    nextRun: "In 12h",
    execTime: "8m 30s",
    agent: "SEO Content Agent",
  },
  {
    id: "wf-003",
    name: "Keyword Research Automation",
    status: "paused",
    progress: 100,
    lastRun: "1h ago",
    nextRun: "Tomorrow 9 AM",
    execTime: "2m 05s",
    agent: "SEO Content Agent",
  },
  {
    id: "wf-004",
    name: "Competitor Analysis Sweep",
    status: "scheduled",
    progress: 0,
    lastRun: "Yesterday",
    nextRun: "In 2h",
    execTime: "—",
    agent: "Website Auditor",
  },
  {
    id: "wf-005",
    name: "Weekly Performance Report",
    status: "completed",
    progress: 100,
    lastRun: "3h ago",
    nextRun: "In 7 days",
    execTime: "1m 48s",
    agent: "Website Auditor",
  },
]

const timelineStages = [
  { label: "Audit Started", status: "completed", time: "09:02 AM" },
  { label: "Crawl Completed", status: "completed", time: "09:06 AM" },
  { label: "SEO Analysis", status: "completed", time: "09:09 AM" },
  { label: "AI Processing", status: "active", time: "09:12 AM" },
  { label: "Report Generation", status: "pending", time: "—" },
  { label: "Workflow Completed", status: "pending", time: "—" },
]

const automationQueue = [
  { task: "Crawl example-saas.com", eta: "~2 min", agent: "Website Auditor", status: "running" },
  { task: "Generate meta descriptions", eta: "~5 min", agent: "SEO Content Agent", status: "running" },
  { task: "Analyze backlink profile", eta: "~8 min", agent: "Website Auditor", status: "waiting" },
  { task: "Write 3 blog outlines", eta: "~12 min", agent: "SEO Content Agent", status: "waiting" },
  { task: "Compress image assets", eta: "~1 min", agent: "Website Auditor", status: "completed" },
  { task: "Schema markup validation", eta: "—", agent: "Website Auditor", status: "failed" },
]

const activityFeed = [
  { event: "Workflow Started", detail: "Full SEO Audit Pipeline triggered by schedule", time: "2 mins ago", icon: Play, color: "#10b981" },
  { event: "Audit Completed", detail: "example-saas.com crawled — 124 pages indexed", time: "6 mins ago", icon: CheckCircle2, color: "#e07b53" },
  { event: "AI Analysis Finished", detail: "SEO recommendations generated (confidence 96%)", time: "14 mins ago", icon: Bot, color: "#6366f1" },
  { event: "Report Generated", detail: "Weekly Performance Report exported as PDF", time: "3h ago", icon: FileText, color: "#8b5cf6" },
  { event: "Notification Sent", detail: "Audit summary emailed to muhammed.beig@gmail.com", time: "3h ago", icon: Bell, color: "#f59e0b" },
]

const successRateData = [
  { day: "Mon", rate: 94 },
  { day: "Tue", rate: 97 },
  { day: "Wed", rate: 96 },
  { day: "Thu", rate: 98 },
  { day: "Fri", rate: 95 },
  { day: "Sat", rate: 99 },
  { day: "Sun", rate: 97 },
]

const dailyExecutionsData = [
  { day: "Mon", count: 12 },
  { day: "Tue", count: 18 },
  { day: "Wed", count: 14 },
  { day: "Thu", count: 22 },
  { day: "Fri", count: 19 },
  { day: "Sat", count: 8 },
  { day: "Sun", count: 11 },
]

const runtimeData = [
  { hour: "00h", avg: 2.1 },
  { hour: "04h", avg: 1.8 },
  { hour: "08h", avg: 3.4 },
  { hour: "12h", avg: 4.2 },
  { hour: "16h", avg: 3.8 },
  { hour: "20h", avg: 2.6 },
]

const taskDistribution = [
  { name: "SEO Audit", value: 42, color: "#e07b53" },
  { name: "Content Gen", value: 28, color: "#6366f1" },
  { name: "Reporting", value: 18, color: "#10b981" },
  { name: "Research", value: 12, color: "#f59e0b" },
]

// ─── HELPERS ────────────────────────────────────────────────────────────────

const STATUS_STYLES: Record<string, { bg: string; text: string; dot: string; label: string }> = {
  running: { bg: "bg-emerald-500/10", text: "text-emerald-400", dot: "bg-emerald-400", label: "Running" },
  paused: { bg: "bg-amber-500/10", text: "text-amber-400", dot: "bg-amber-400", label: "Paused" },
  scheduled: { bg: "bg-blue-500/10", text: "text-blue-400", dot: "bg-blue-400", label: "Scheduled" },
  completed: { bg: "bg-[#e07b53]/10", text: "text-[#e07b53]", dot: "bg-[#e07b53]", label: "Completed" },
  waiting: { bg: "bg-[#6b6b66]/10", text: "text-[#a3a29e]", dot: "bg-[#6b6b66]", label: "Waiting" },
  failed: { bg: "bg-red-500/10", text: "text-red-400", dot: "bg-red-400", label: "Failed" },
}

function StatusBadge({ status }: { status: string }) {
  const s = STATUS_STYLES[status] ?? STATUS_STYLES.waiting
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${s.bg} ${s.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${s.dot} ${status === "running" ? "animate-pulse" : ""}`} />
      {s.label}
    </span>
  )
}

const tooltipStyle = {
  borderRadius: "8px",
  border: "1px solid #3a3936",
  background: "#1e1d1a",
  color: "#ececec",
  fontSize: "12px",
}

// ─── PAGE ───────────────────────────────────────────────────────────────────

export default function WorkflowsPage() {
  const [selectedWorkflow, setSelectedWorkflow] = React.useState<string | null>(null)

  const handleAction = (action: string) => {
    // Simulated action — no backend
    console.log("Action:", action)
  }

  return (
    <div
      className="flex flex-col gap-6 p-4 md:p-8 max-w-7xl mx-auto w-full animate-fade-in-up"
      role="main"
      aria-label="Workflow Automation Center"
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
            <GitBranch size={22} className="text-[#e07b53]" strokeWidth={2} />
            AI Automation Center
          </h1>
          <p className="text-sm text-[#a3a29e] mt-0.5">
            Orchestrate, monitor, and manage your AI workflow pipelines
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleAction("refresh")}
            className="border-[#3a3936] text-[#a3a29e] hover:bg-[#393836] hover:text-[#ececec] gap-1.5"
            aria-label="Refresh workflows"
          >
            <RefreshCw size={14} />
            Refresh
          </Button>
          <Button
            size="sm"
            onClick={() => handleAction("create")}
            className="bg-[#e07b53] hover:bg-[#d06a42] text-[#2b2a27] font-semibold gap-1.5"
            aria-label="Create new workflow"
          >
            <Plus size={14} />
            Create Workflow
          </Button>
        </div>
      </div>

      {/* ── Section 1: Overview Metrics ── */}
      <section aria-label="Workflow Overview Metrics">
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
          {overviewMetrics.map((m) => {
            const Icon = m.icon
            return (
              <Card
                key={m.label}
                className="bg-[#393836]/60 border-[#3a3936] hover:border-[#4a4945] hover:bg-[#393836] transition-all duration-200 hover:scale-[1.02] cursor-default"
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div
                      className="p-2 rounded-lg"
                      style={{ background: `${m.color}15` }}
                    >
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
                  <div className="flex items-center gap-1 mt-2">
                    {m.trendUp ? (
                      <TrendingUp size={11} className="text-emerald-400" />
                    ) : (
                      <TrendingDown size={11} className="text-red-400" />
                    )}
                    <span
                      className={`text-xs font-medium ${m.trendUp ? "text-emerald-400" : "text-red-400"}`}
                    >
                      {m.trend}
                    </span>
                    <span className="text-[10px] text-[#6b6b66]">vs last week</span>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </section>

      {/* ── Section 2: Active Workflows + Timeline ── */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Active Workflows */}
        <section className="xl:col-span-2" aria-label="Active Workflows">
          <Card className="bg-[#393836]/40 border-[#3a3936] h-full">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-[#ececec] text-base font-semibold">Active Workflows</CardTitle>
                  <CardDescription className="text-[#6b6b66] text-xs mt-0.5">
                    Real-time execution status across all pipelines
                  </CardDescription>
                </div>
                <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  {activeWorkflows.filter((w) => w.status === "running").length} Live
                </span>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 px-4 pb-4">
              {activeWorkflows.map((wf) => (
                <div
                  key={wf.id}
                  className={`p-3 rounded-xl border transition-all duration-200 cursor-pointer ${
                    selectedWorkflow === wf.id
                      ? "border-[#e07b53]/40 bg-[#e07b53]/5"
                      : "border-[#3a3936] bg-[#2b2a27]/60 hover:border-[#4a4945] hover:bg-[#393836]/60"
                  }`}
                  onClick={() => setSelectedWorkflow(wf.id === selectedWorkflow ? null : wf.id)}
                  role="button"
                  tabIndex={0}
                  aria-pressed={selectedWorkflow === wf.id}
                  aria-label={`Workflow: ${wf.name}`}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault()
                      setSelectedWorkflow(wf.id === selectedWorkflow ? null : wf.id)
                    }
                  }}
                >
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="p-1.5 rounded-lg bg-[#4a4945]/40 flex-shrink-0">
                        <GitBranch size={13} className="text-[#a3a29e]" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-[#ececec] truncate">{wf.name}</p>
                        <p className="text-[10px] text-[#6b6b66]">{wf.id} · {wf.agent}</p>
                      </div>
                    </div>
                    <StatusBadge status={wf.status} />
                  </div>
                  {wf.status !== "scheduled" && (
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-[10px] text-[#6b6b66]">
                        <span>Progress</span>
                        <span>{wf.progress}%</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-[#2b2a27] overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-700"
                          style={{
                            width: `${wf.progress}%`,
                            background:
                              wf.status === "running"
                                ? "linear-gradient(90deg, #e07b53, #f59e0b)"
                                : wf.status === "completed"
                                ? "#10b981"
                                : "#4a4945",
                          }}
                        />
                      </div>
                    </div>
                  )}
                  <div className="flex items-center justify-between mt-2 text-[10px] text-[#6b6b66]">
                    <span>Last: {wf.lastRun}</span>
                    <span>Next: {wf.nextRun}</span>
                    <span>Exec: {wf.execTime}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>

        {/* Workflow Timeline */}
        <section aria-label="Workflow Timeline">
          <Card className="bg-[#393836]/40 border-[#3a3936] h-full">
            <CardHeader className="pb-3">
              <CardTitle className="text-[#ececec] text-base font-semibold">Workflow Timeline</CardTitle>
              <CardDescription className="text-[#6b6b66] text-xs mt-0.5">
                Current pipeline execution stages
              </CardDescription>
            </CardHeader>
            <CardContent className="px-4 pb-4">
              <div className="space-y-1">
                {timelineStages.map((stage, i) => (
                  <div key={i} className="flex gap-3 group">
                    {/* Connector */}
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                          stage.status === "completed"
                            ? "bg-emerald-500/20 border border-emerald-500/40"
                            : stage.status === "active"
                            ? "bg-[#e07b53]/20 border border-[#e07b53]/60 shadow-[0_0_8px_rgba(224,123,83,0.3)]"
                            : "bg-[#2b2a27] border border-[#3a3936]"
                        }`}
                      >
                        {stage.status === "completed" ? (
                          <CheckCircle2 size={14} className="text-emerald-400" />
                        ) : stage.status === "active" ? (
                          <Clock size={14} className="text-[#e07b53] animate-pulse" />
                        ) : (
                          <div className="w-2 h-2 rounded-full bg-[#4a4945]" />
                        )}
                      </div>
                      {i < timelineStages.length - 1 && (
                        <div
                          className={`w-px flex-1 min-h-[20px] my-1 ${
                            stage.status === "completed" ? "bg-emerald-500/30" : "bg-[#3a3936]"
                          }`}
                        />
                      )}
                    </div>

                    <div className="pb-3 flex-1 min-w-0">
                      <p
                        className={`text-sm font-medium leading-tight ${
                          stage.status === "completed"
                            ? "text-[#ececec]"
                            : stage.status === "active"
                            ? "text-[#e07b53]"
                            : "text-[#6b6b66]"
                        }`}
                      >
                        {stage.label}
                      </p>
                      <p className="text-[10px] text-[#6b6b66] mt-0.5">{stage.time}</p>
                      {stage.status === "active" && (
                        <div className="mt-1.5 h-1 rounded-full bg-[#2b2a27] overflow-hidden w-2/3">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-[#e07b53] to-[#f59e0b]"
                            style={{ width: "55%", transition: "width 1s ease" }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>
      </div>

      {/* ── Section 3: Automation Queue + Activity Feed ── */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Automation Queue */}
        <section aria-label="Automation Queue">
          <Card className="bg-[#393836]/40 border-[#3a3936] h-full">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-[#ececec] text-base font-semibold">Automation Queue</CardTitle>
                  <CardDescription className="text-[#6b6b66] text-xs mt-0.5">
                    Task execution pipeline
                  </CardDescription>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-[#6b6b66]">
                  <Layers size={13} />
                  <span>{automationQueue.length} tasks</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="px-4 pb-4">
              <div className="space-y-2" role="list" aria-label="Queue tasks">
                {automationQueue.map((item, i) => (
                  <div
                    key={i}
                    role="listitem"
                    className="flex items-center justify-between p-3 rounded-xl border border-[#3a3936] bg-[#2b2a27]/60 hover:bg-[#393836]/40 transition-colors gap-3"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-6 h-6 rounded-lg bg-[#4a4945]/40 flex items-center justify-center flex-shrink-0 text-[10px] font-bold text-[#6b6b66]">
                        {i + 1}
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-[#ececec] truncate">{item.task}</p>
                        <p className="text-[10px] text-[#6b6b66]">
                          <Bot size={9} className="inline mr-1" />
                          {item.agent} · ETA: {item.eta}
                        </p>
                      </div>
                    </div>
                    <StatusBadge status={item.status} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Recent Activity Feed */}
        <section aria-label="Recent Workflow Activity">
          <Card className="bg-[#393836]/40 border-[#3a3936] h-full">
            <CardHeader className="pb-3">
              <CardTitle className="text-[#ececec] text-base font-semibold">Recent Activity</CardTitle>
              <CardDescription className="text-[#6b6b66] text-xs mt-0.5">
                Latest workflow events and system actions
              </CardDescription>
            </CardHeader>
            <CardContent className="px-4 pb-4 space-y-1">
              {activityFeed.map((item, i) => {
                const Icon = item.icon
                return (
                  <div
                    key={i}
                    className="flex gap-3 py-2.5 border-b border-[#3a3936]/60 last:border-0 hover:bg-[#393836]/30 rounded-lg px-2 -mx-2 transition-colors"
                  >
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: `${item.color}15` }}
                    >
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
            </CardContent>
          </Card>
        </section>
      </div>

      {/* ── Section 4: Quick Actions ── */}
      <section aria-label="Quick Actions">
        <Card className="bg-[#393836]/40 border-[#3a3936]">
          <CardHeader className="pb-3">
            <CardTitle className="text-[#ececec] text-base font-semibold">Quick Actions</CardTitle>
            <CardDescription className="text-[#6b6b66] text-xs mt-0.5">
              Manage and control your automation workflows
            </CardDescription>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <div className="flex flex-wrap gap-3">
              <Button
                size="sm"
                onClick={() => handleAction("create")}
                className="bg-[#e07b53] hover:bg-[#d06a42] text-[#2b2a27] font-semibold gap-1.5 transition-all"
                aria-label="Create workflow"
              >
                <Plus size={14} /> Create Workflow
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleAction("run")}
                className="border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 gap-1.5"
                aria-label="Run selected workflow"
              >
                <Play size={14} /> Run Workflow
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleAction("pause")}
                className="border-amber-500/30 text-amber-400 hover:bg-amber-500/10 gap-1.5"
                aria-label="Pause active workflow"
              >
                <Pause size={14} /> Pause
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleAction("resume")}
                className="border-[#6366f1]/30 text-[#818cf8] hover:bg-[#6366f1]/10 gap-1.5"
                aria-label="Resume paused workflow"
              >
                <RotateCcw size={14} /> Resume
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleAction("duplicate")}
                className="border-[#3a3936] text-[#a3a29e] hover:bg-[#393836] hover:text-[#ececec] gap-1.5"
                aria-label="Duplicate workflow"
              >
                <Copy size={14} /> Duplicate
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleAction("delete")}
                className="border-red-500/30 text-red-400 hover:bg-red-500/10 gap-1.5"
                aria-label="Delete workflow"
              >
                <Trash2 size={14} /> Delete
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* ── Section 5: Workflow Analytics ── */}
      <section aria-label="Workflow Analytics">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {/* Success Rate Chart */}
          <Card className="bg-[#393836]/40 border-[#3a3936] md:col-span-2">
            <CardHeader className="pb-2">
              <CardTitle className="text-[#ececec] text-sm font-semibold">Workflow Success Rate</CardTitle>
              <CardDescription className="text-[#6b6b66] text-xs">7-day trend (%)</CardDescription>
            </CardHeader>
            <CardContent className="h-[180px] px-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={successRateData} margin={{ top: 8, right: 8, left: -28, bottom: 0 }}>
                  <defs>
                    <linearGradient id="successGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#e07b53" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#e07b53" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="day" tick={{ fill: "#6b6b66", fontSize: 10 }} tickLine={false} axisLine={false} />
                  <YAxis domain={[90, 100]} tick={{ fill: "#6b6b66", fontSize: 10 }} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={tooltipStyle} cursor={{ stroke: "#3a3936" }} />
                  <Area type="monotone" dataKey="rate" stroke="#e07b53" strokeWidth={2} fill="url(#successGrad)" dot={{ fill: "#e07b53", r: 3 }} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Daily Executions */}
          <Card className="bg-[#393836]/40 border-[#3a3936]">
            <CardHeader className="pb-2">
              <CardTitle className="text-[#ececec] text-sm font-semibold">Daily Executions</CardTitle>
              <CardDescription className="text-[#6b6b66] text-xs">Runs per day</CardDescription>
            </CardHeader>
            <CardContent className="h-[180px] px-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dailyExecutionsData} margin={{ top: 8, right: 4, left: -28, bottom: 0 }}>
                  <XAxis dataKey="day" tick={{ fill: "#6b6b66", fontSize: 10 }} tickLine={false} axisLine={false} />
                  <YAxis tick={{ fill: "#6b6b66", fontSize: 10 }} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "#3a3936" }} />
                  <Bar dataKey="count" radius={[3, 3, 0, 0]} fill="#6366f1" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Task Distribution Pie */}
          <Card className="bg-[#393836]/40 border-[#3a3936]">
            <CardHeader className="pb-2">
              <CardTitle className="text-[#ececec] text-sm font-semibold">Task Distribution</CardTitle>
              <CardDescription className="text-[#6b6b66] text-xs">By workflow type</CardDescription>
            </CardHeader>
            <CardContent className="h-[180px] flex items-center justify-center px-2">
              <div className="flex items-center gap-3 w-full">
                <div className="w-[100px] h-[100px] flex-shrink-0">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={taskDistribution}
                        cx="50%"
                        cy="50%"
                        innerRadius={28}
                        outerRadius={46}
                        paddingAngle={3}
                        dataKey="value"
                      >
                        {taskDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={tooltipStyle} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-1.5 flex-1 min-w-0">
                  {taskDistribution.map((d) => (
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
        </div>
      </section>

      {/* Avg Runtime Chart (full width) */}
      <Card className="bg-[#393836]/40 border-[#3a3936]">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-[#ececec] text-sm font-semibold">Average Runtime</CardTitle>
              <CardDescription className="text-[#6b6b66] text-xs">Execution time by hour of day (minutes)</CardDescription>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-medium text-[#a3a29e] bg-[#2b2a27] px-2.5 py-1 rounded-lg border border-[#3a3936]">
              <Timer size={12} />
              Avg: 2m 58s
            </div>
          </div>
        </CardHeader>
        <CardContent className="h-[180px] px-2 pb-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={runtimeData} margin={{ top: 8, right: 8, left: -28, bottom: 0 }}>
              <defs>
                <linearGradient id="runtimeGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#6366f1" />
                </linearGradient>
              </defs>
              <XAxis dataKey="hour" tick={{ fill: "#6b6b66", fontSize: 10 }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fill: "#6b6b66", fontSize: 10 }} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={tooltipStyle} cursor={{ stroke: "#3a3936" }} />
              <Line type="monotone" dataKey="avg" stroke="url(#runtimeGrad)" strokeWidth={2} dot={{ fill: "#8b5cf6", r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}

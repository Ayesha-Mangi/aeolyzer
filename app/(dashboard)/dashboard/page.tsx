"use client"

import React, { useState, useEffect } from "react"
import { 
  Check, 
  ChevronDown, 
  ChevronUp, 
  ListTodo, 
  Globe, 
  Search, 
  Cpu, 
  FileCheck, 
  Sparkles, 
  Download, 
  Circle,
  CheckCircle2,
  ChevronRight,
  ArrowRight,
  ArrowLeft,
  Briefcase,
  Building,
  Plus,
  Trash2,
  ToggleLeft,
  ToggleRight,
  Play,
  Activity,
  Users,
  BarChart3,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Settings
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useDashboard } from "@/lib/context/dashboard-context"
import { AeolyzerLogo, AeolyzerLogoAnimated } from "@/components/aeolyzer-logo"
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, BarChart, Bar } from "recharts"

// Reuse the checklist items configuration from Phase 2.5
interface ChecklistItem {
  id: number
  title: string
  description: string
  actionLabel: string
  icon: any
}

// ----------------------------------------------------
// SUBCOMPONENT: GETTING STARTED DASHBOARD
// ----------------------------------------------------
function GettingStartedDashboard() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const chartData = [
    { name: 'Mon', score: 65, audits: 12 },
    { name: 'Tue', score: 68, audits: 18 },
    { name: 'Wed', score: 75, audits: 25 },
    { name: 'Thu', score: 72, audits: 20 },
    { name: 'Fri', score: 85, audits: 35 },
    { name: 'Sat', score: 82, audits: 30 },
    { name: 'Sun', score: 90, audits: 45 },
  ];

  if (loading) {
    return (
      <div className="min-h-full w-full bg-[#2b2a27] text-[#ececec] p-6 md:p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="h-8 w-48 bg-[#393836]/40 rounded-lg animate-pulse" />
            <div className="h-4 w-64 bg-[#393836]/20 rounded-lg animate-pulse" />
          </div>
          <div className="flex gap-2">
            <div className="h-9 w-28 bg-[#393836]/40 rounded-lg animate-pulse" />
            <div className="h-9 w-28 bg-[#e07b53]/40 rounded-lg animate-pulse" />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-28 bg-[#393836]/20 border border-[#3a3936] rounded-2xl animate-pulse" />
          ))}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 h-80 bg-[#393836]/20 border border-[#3a3936] rounded-2xl animate-pulse" />
          <div className="h-80 bg-[#393836]/20 border border-[#3a3936] rounded-2xl animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full w-full bg-[#2b2a27] text-[#ececec] p-6 md:p-8 space-y-6 animate-fade-in-up">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-[#b8977e]" style={{ fontFamily: "var(--font-display), 'Rokkitt', Georgia, serif" }}>
            Dashboard Overview
          </h1>
          <p className="text-sm text-[#a3a29e] font-light mt-1">Welcome back. Here is what's happening with your workspace today.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-[#393836]/40 border border-[#4a4945] hover:border-[#e07b53] rounded-lg text-xs font-semibold transition-colors">
            <Download size={14} />
            Export Report
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#e07b53] hover:bg-[#c45e2e] text-[#2b2a27] rounded-lg text-xs font-bold shadow-md transition-colors">
            <Plus size={14} />
            New Audit
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl border border-[#3a3936] bg-[#393836]/20 space-y-3 hover:border-[#4a4945] transition-colors cursor-default">
          <div className="flex items-center justify-between text-[#a3a29e]">
            <h3 className="text-xs font-semibold tracking-wide uppercase">Avg Audit Score</h3>
            <Activity size={16} className="text-[#e07b53]" />
          </div>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-bold text-[#ececec]">92</span>
            <span className="text-xs text-emerald-400 font-medium flex items-center mb-1 bg-emerald-400/10 px-1.5 py-0.5 rounded"><ArrowUpRight size={12} className="mr-0.5"/> 4%</span>
          </div>
        </div>
        
        <div className="p-5 rounded-2xl border border-[#3a3936] bg-[#393836]/20 space-y-3 hover:border-[#4a4945] transition-colors cursor-default">
          <div className="flex items-center justify-between text-[#a3a29e]">
            <h3 className="text-xs font-semibold tracking-wide uppercase">Total Audits</h3>
            <FileCheck size={16} className="text-[#e07b53]" />
          </div>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-bold text-[#ececec]">1,284</span>
            <span className="text-xs text-emerald-400 font-medium flex items-center mb-1 bg-emerald-400/10 px-1.5 py-0.5 rounded"><ArrowUpRight size={12} className="mr-0.5"/> 12%</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl border border-[#3a3936] bg-[#393836]/20 space-y-3 hover:border-[#4a4945] transition-colors cursor-default">
          <div className="flex items-center justify-between text-[#a3a29e]">
            <h3 className="text-xs font-semibold tracking-wide uppercase">Active Agents</h3>
            <Cpu size={16} className="text-[#e07b53]" />
          </div>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-bold text-[#ececec]">8</span>
            <span className="text-xs text-[#a3a29e] font-medium mb-1">/ 10 running</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl border border-[#3a3936] bg-[#393836]/20 space-y-3 hover:border-[#4a4945] transition-colors cursor-default">
          <div className="flex items-center justify-between text-[#a3a29e]">
            <h3 className="text-xs font-semibold tracking-wide uppercase">Workflow Status</h3>
            <CheckCircle2 size={16} className="text-emerald-400" />
          </div>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-bold text-[#ececec]">Healthy</span>
            <span className="text-xs text-emerald-400 font-medium mb-1 bg-emerald-400/10 px-1.5 py-0.5 rounded">All systems operational</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <div className="lg:col-span-2 p-5 md:p-6 rounded-2xl border border-[#3a3936] bg-[#393836]/20 space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-semibold text-[#ececec]">Audit Score Trends</h3>
            <select className="bg-[#2b2a27] border border-[#4a4945] rounded-lg text-xs px-3 py-1.5 text-[#a3a29e] outline-none hover:border-[#e07b53] transition-colors cursor-pointer">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>This Year</option>
            </select>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#e07b53" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#e07b53" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#3a3936" vertical={false} />
                <XAxis dataKey="name" stroke="#6b6b66" fontSize={11} tickLine={false} axisLine={false} dy={10} />
                <YAxis stroke="#6b6b66" fontSize={11} tickLine={false} axisLine={false} dx={-10} />
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: '#2b2a27', borderColor: '#4a4945', color: '#ececec', borderRadius: '8px', fontSize: '12px' }}
                  itemStyle={{ color: '#e07b53', fontWeight: 600 }}
                  cursor={{ stroke: '#4a4945', strokeWidth: 1, strokeDasharray: '4 4' }}
                />
                <Area type="monotone" dataKey="score" stroke="#e07b53" strokeWidth={2} fillOpacity={1} fill="url(#colorScore)" activeDot={{ r: 6, fill: "#e07b53", stroke: "#2b2a27", strokeWidth: 2 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity & Quick Actions */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="p-5 rounded-2xl border border-[#3a3936] bg-[#393836]/20 space-y-4">
            <h3 className="text-sm font-semibold text-[#ececec]">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-3">
              <button className="flex flex-col items-center justify-center gap-2 p-3 rounded-xl border border-[#4a4945] bg-[#393836]/40 hover:bg-[#393836] hover:border-[#e07b53] transition-all text-[#ececec] group">
                <Search size={18} className="text-[#a3a29e] group-hover:text-[#e07b53] transition-colors" />
                <span className="text-[11px] font-medium">Deep Scan</span>
              </button>
              <button className="flex flex-col items-center justify-center gap-2 p-3 rounded-xl border border-[#4a4945] bg-[#393836]/40 hover:bg-[#393836] hover:border-[#e07b53] transition-all text-[#ececec] group">
                <Users size={18} className="text-[#a3a29e] group-hover:text-[#e07b53] transition-colors" />
                <span className="text-[11px] font-medium">Competitors</span>
              </button>
              <button className="flex flex-col items-center justify-center gap-2 p-3 rounded-xl border border-[#4a4945] bg-[#393836]/40 hover:bg-[#393836] hover:border-[#e07b53] transition-all text-[#ececec] group">
                <Sparkles size={18} className="text-[#a3a29e] group-hover:text-[#e07b53] transition-colors" />
                <span className="text-[11px] font-medium">AI Writer</span>
              </button>
              <button className="flex flex-col items-center justify-center gap-2 p-3 rounded-xl border border-[#4a4945] bg-[#393836]/40 hover:bg-[#393836] hover:border-[#e07b53] transition-all text-[#ececec] group">
                <Settings size={18} className="text-[#a3a29e] group-hover:text-[#e07b53] transition-colors" />
                <span className="text-[11px] font-medium">Settings</span>
              </button>
            </div>
          </div>

          {/* Activity Log */}
          <div className="p-5 rounded-2xl border border-[#3a3936] bg-[#393836]/20 space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-[#ececec]">Recent Activity</h3>
              <button className="text-[11px] text-[#e07b53] hover:text-[#ff9a6f] font-medium transition-colors">View All</button>
            </div>
            <div className="space-y-4">
              {[
                { title: "SEO Audit Completed", desc: "example.com scored 92", time: "10m ago", icon: FileCheck, color: "text-emerald-400", bg: "bg-emerald-400/10" },
                { title: "Competitor Analysis", desc: "Found 3 new keyword gaps", time: "2h ago", icon: Search, color: "text-[#e07b53]", bg: "bg-[#e07b53]/10" },
                { title: "Content Generated", desc: "Blog post: '10 SEO Tips'", time: "5h ago", icon: Sparkles, color: "text-blue-400", bg: "bg-blue-400/10" },
                { title: "Weekly Report", desc: "Sent to admin@acme.com", time: "1d ago", icon: Clock, color: "text-purple-400", bg: "bg-purple-400/10" }
              ].map((activity, i) => (
                <div key={i} className="flex gap-3 items-start relative before:absolute before:left-[15px] before:top-[32px] before:bottom-[-16px] before:w-[2px] before:bg-[#3a3936] last:before:hidden">
                  <div className={`p-2 rounded-full ${activity.bg} ${activity.color} shrink-0 z-10 ring-4 ring-[#2b2a27]`}>
                    <activity.icon size={14} />
                  </div>
                  <div className="pt-0.5">
                    <p className="text-xs font-semibold text-[#ececec]">{activity.title}</p>
                    <p className="text-[11px] text-[#a3a29e] mt-0.5">{activity.desc}</p>
                    <p className="text-[10px] text-[#6b6b66] mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


// ----------------------------------------------------
// MAIN ROUTE EXPORT: WITH ONBOARDING ROUTER
// ----------------------------------------------------
export default function DashboardOrOnboardingRouter() {
  const { onboarded, setOnboarded } = useDashboard()
  const [step, setStep] = useState(1)

  // Step 2 Form States
  const [workspaceType, setWorkspaceType] = useState<"Individual" | "Business" | "Agency" | "Enterprise">("Business")
  const [workspaceName, setWorkspaceName] = useState("")
  const [brandName, setBrandName] = useState("")

  // Step 3 Form States
  const [websiteUrl, setWebsiteUrl] = useState("")
  const [industry, setIndustry] = useState("Technology")
  const [country, setCountry] = useState("United States")
  const [language, setLanguage] = useState("English")
  const [urlError, setUrlError] = useState("")

  // Step 4 Competitor States
  const [competitors, setCompetitors] = useState<{ url: string; name: string }[]>([
    { url: "", name: "" }
  ])

  // Step 5 Target Audience States
  const [audienceType, setAudienceType] = useState<string>("B2B")
  const [primaryMarket, setPrimaryMarket] = useState("North America")
  const [customerDescription, setCustomerDescription] = useState("")

  // Step 6 Audit Goals States (Multiple selections)
  const [selectedGoals, setSelectedGoals] = useState<string[]>(["Improve SEO", "AI Search Visibility"])

  // Step 7 Configuration States
  const [auditDepth, setAuditDepth] = useState<"Quick" | "Standard" | "Comprehensive">("Standard")
  const [toggles, setToggles] = useState({
    seo: true,
    performance: true,
    accessibility: true,
    structuredData: true,
    content: true,
    competitor: true,
    ai: true
  })

  // Step 8 Running Report Log Animation
  const [currentTaskIdx, setCurrentTaskIdx] = useState(0)
  const runTasks = [
    "Crawling website nodes...",
    "Collecting DOM metadata details...",
    "Checking performance viewport sizes...",
    "Running structural SEO analysis checks...",
    "Comparing competitor index footprints...",
    "Preparing agent recommendation logs..."
  ]

  useEffect(() => {
    if (step === 8) {
      const interval = setInterval(() => {
        setCurrentTaskIdx(prev => {
          if (prev < runTasks.length - 1) {
            return prev + 1
          } else {
            clearInterval(interval)
            // Complete onboarding
            setTimeout(() => {
              setOnboarded(true)
            }, 800)
            return prev
          }
        })
      }, 1400)
      return () => clearInterval(interval)
    }
  }, [step])

  // URL Validation Utility
  const validateUrl = (url: string) => {
    if (!url.trim()) return "Website URL is required."
    const regex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/
    if (!regex.test(url)) return "Please enter a valid website URL (e.g., https://example.com)."
    return ""
  }

  // Navigation handlers
  const handleNext = () => {
    if (step === 3) {
      const err = validateUrl(websiteUrl)
      if (err) {
        setUrlError(err)
        return
      }
      setUrlError("")
    }
    setStep(prev => prev + 1)
  }

  const handleBack = () => {
    setStep(prev => Math.max(1, prev - 1))
  }

  const addCompetitor = () => {
    if (competitors.length < 5) {
      setCompetitors([...competitors, { url: "", name: "" }])
    }
  }

  const updateCompetitor = (index: number, field: "url" | "name", value: string) => {
    const updated = [...competitors]
    updated[index][field] = value
    setCompetitors(updated)
  }

  const removeCompetitor = (index: number) => {
    if (competitors.length > 1) {
      setCompetitors(competitors.filter((_, i) => i !== index))
    }
  }

  const toggleGoal = (goal: string) => {
    setSelectedGoals(prev => 
      prev.includes(goal) ? prev.filter(g => g !== goal) : [...prev, goal]
    )
  }

  const toggleConf = (key: keyof typeof toggles) => {
    setToggles(prev => ({ ...prev, [key]: !prev[key] }))
  }

  // Sidebar navigation mapping list helper
  const stepsList = [
    { id: 1, label: "Welcome" },
    { id: 2, label: "Brand / Agency" },
    { id: 3, label: "Website Info" },
    { id: 4, label: "Competitors" },
    { id: 5, label: "Target Audience" },
    { id: 6, label: "Audit Goals" },
    { id: 7, label: "Configuration" },
    { id: 8, label: "Running Report" }
  ]

  // Render the GettingStartedDashboard directly if already onboarded
  if (onboarded) {
    return <GettingStartedDashboard />
  }

  return (
    <div className="min-h-screen w-full bg-[#2b2a27] text-[#ececec] flex items-center justify-center p-6 md:p-12 select-none overflow-y-auto">
      
      {/* Onboarding Wizard shell wrapper */}
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-12 gap-8 items-start my-auto">
        
        {/* Left Side: Step Stepper Navigation (Stripe/Linear style) */}
        {step < 8 && (
          <div className="col-span-12 md:col-span-4 space-y-6 md:pr-4">
            <div className="flex items-center gap-2 mb-2">
              <AeolyzerLogo size={22} />
              <span className="text-xs font-bold uppercase tracking-wider text-[#e07b53]">Auditor Setup</span>
            </div>
            
            <nav className="flex flex-row md:flex-col justify-between md:justify-start gap-3 md:gap-5 overflow-x-auto md:overflow-visible pb-2 md:pb-0">
              {stepsList.slice(0, 8).map((s) => {
                const isActive = step === s.id
                const isCompleted = step > s.id
                return (
                  <div key={s.id} className="flex items-center gap-3 flex-shrink-0">
                    {/* Circle Indicator */}
                    <div className={cn(
                      "w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold border transition-all duration-300",
                      isCompleted ? "bg-[#e07b53] border-[#e07b53] text-[#2b2a27]" :
                      isActive ? "border-[#e07b53] text-[#e07b53] ring-2 ring-[#e07b53]/15" :
                      "border-[#4a4945] text-[#6b6b66]"
                    )}>
                      {isCompleted ? <Check size={10} strokeWidth={3} /> : s.id}
                    </div>
                    {/* Label (hidden on small viewports helper) */}
                    <span className={cn(
                      "text-xs hidden md:inline font-medium transition-colors duration-200",
                      isActive ? "text-[#ececec] font-bold" :
                      isCompleted ? "text-[#a3a29e]" : "text-[#6b6b66]"
                    )}>
                      {s.label}
                    </span>
                  </div>
                )
              })}
            </nav>
          </div>
        )}

        {/* Right Side: Step Layout Views */}
        <div className={cn(
          "col-span-12",
          step < 8 ? "md:col-span-8" : "max-w-md mx-auto"
        )}>
          <div className="p-6 rounded-2xl border border-[#3a3936] bg-[#393836]/25 space-y-6 shadow-2xl relative">
            
            {/* ------------------------------------------------ */}
            {/* STEP 1: WELCOME SCREEN */}
            {/* ------------------------------------------------ */}
            {step === 1 && (
              <div className="space-y-6 py-6 text-center md:text-left">
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold tracking-tight text-[#b8977e]" style={{ fontFamily: "var(--font-display), 'Rokkitt', Georgia, serif" }}>
                    Welcome to Website Auditor AI
                  </h2>
                  <p className="text-sm text-[#a3a29e] font-light">
                    Let&apos;s set up your workspace in just a few steps.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-[#2b2a27]/30 border border-[#3a3936]/60 text-xs text-[#a3a29e] leading-relaxed font-light space-y-2">
                  <p className="font-semibold text-[#ececec]">What we setup during onboarding:</p>
                  <ul className="list-disc pl-4 space-y-1">
                    <li>Company profiles and company branding settings.</li>
                    <li>Website crawls targets & primary language settings.</li>
                    <li>Competitive intelligence tracking targets.</li>
                    <li>Execution strategies for LLM Crawler Agents.</li>
                  </ul>
                </div>
                <div className="pt-2">
                  <button 
                    onClick={handleNext}
                    className="w-full md:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold bg-[#e07b53] hover:bg-[#c45e2e] text-[#2b2a27] transition-all shadow-md group cursor-pointer"
                  >
                    <span>Get Started</span>
                    <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            )}

            {/* ------------------------------------------------ */}
            {/* STEP 2: BRAND / AGENCY SELECTION */}
            {/* ------------------------------------------------ */}
            {step === 2 && (
              <div className="space-y-6">
                <div className="space-y-1">
                  <h2 className="text-base font-semibold text-[#ececec]">Workspace & Profile Setup</h2>
                  <p className="text-xs text-[#a3a29e] font-light">Choose how you plan to use Website Auditor AI.</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {([
                    { key: "Individual", label: "Individual", desc: "For single sites / portfolios" },
                    { key: "Business", label: "Business", desc: "For companies and brands" },
                    { key: "Agency", label: "Agency", desc: "Managing multiple clients" },
                    { key: "Enterprise", label: "Enterprise", desc: "For large scale automation" }
                  ] as const).map((type) => (
                    <button
                      key={type.key}
                      onClick={() => setWorkspaceType(type.key)}
                      className={cn(
                        "p-3.5 rounded-xl border text-left transition-all",
                        workspaceType === type.key 
                          ? "border-[#e07b53] bg-[#e07b53]/5" 
                          : "border-[#4a4945]/40 bg-[#393836]/10 hover:border-[#4a4945]"
                      )}
                    >
                      <p className="text-xs font-semibold text-[#ececec]">{type.label}</p>
                      <p className="text-[10px] text-[#a3a29e] mt-1 font-light leading-snug">{type.desc}</p>
                    </button>
                  ))}
                </div>

                <div className="space-y-4 pt-2 border-t border-[#3a3936]/40">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#a3a29e]">Workspace Name</label>
                    <input
                      type="text"
                      placeholder="e.g. My Agency Workspace"
                      value={workspaceName}
                      onChange={(e) => setWorkspaceName(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg text-xs outline-none bg-[#393836]/60 border border-[#4a4945] text-[#ececec] placeholder-[#6b6b66] focus:border-[#e07b53]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#a3a29e]">Brand Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Acme Corp"
                      value={brandName}
                      onChange={(e) => setBrandName(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg text-xs outline-none bg-[#393836]/60 border border-[#4a4945] text-[#ececec] placeholder-[#6b6b66] focus:border-[#e07b53]"
                    />
                  </div>
                </div>

                {/* Nav buttons */}
                <div className="flex justify-between items-center pt-4 border-t border-[#3a3936]/40">
                  <button 
                    onClick={handleBack}
                    className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#a3a29e] hover:text-[#ececec] transition-colors"
                  >
                    <ArrowLeft size={14} />
                    <span>Back</span>
                  </button>
                  <button 
                    onClick={handleNext}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-[#e07b53] hover:bg-[#c45e2e] text-[#2b2a27] transition-all cursor-pointer"
                  >
                    <span>Save & Continue</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            )}

            {/* ------------------------------------------------ */}
            {/* STEP 3: WEBSITE INFORMATION */}
            {/* ------------------------------------------------ */}
            {step === 3 && (
              <div className="space-y-6">
                <div className="space-y-1">
                  <h2 className="text-base font-semibold text-[#ececec]">Primary Audit Site</h2>
                  <p className="text-xs text-[#a3a29e] font-light">Input the primary URL you want Website Auditor AI to analyze.</p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#a3a29e]">Website URL</label>
                    <input
                      type="text"
                      placeholder="https://example.com"
                      value={websiteUrl}
                      onChange={(e) => {
                        setWebsiteUrl(e.target.value)
                        if (urlError) setUrlError("")
                      }}
                      className={cn(
                        "w-full px-3 py-2 rounded-lg text-xs outline-none bg-[#393836]/60 border text-[#ececec] placeholder-[#6b6b66]",
                        urlError ? "border-rose-500 focus:border-rose-500" : "border-[#4a4945] focus:border-[#e07b53]"
                      )}
                    />
                    {urlError && <p className="text-[10px] text-rose-400 font-medium">{urlError}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-[#a3a29e]">Industry</label>
                      <select 
                        value={industry}
                        onChange={(e) => setIndustry(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg text-xs outline-none bg-[#393836] border border-[#4a4945] text-[#ececec] focus:border-[#e07b53]"
                      >
                        <option>Technology</option>
                        <option>E-commerce</option>
                        <option>Healthcare</option>
                        <option>SaaS / Software</option>
                        <option>Finance</option>
                        <option>Education</option>
                        <option>Local Business</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-[#a3a29e]">Target Country</label>
                      <input
                        type="text"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg text-xs outline-none bg-[#393836]/60 border border-[#4a4945] text-[#ececec] focus:border-[#e07b53]"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#a3a29e]">Primary Language</label>
                    <select
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg text-xs outline-none bg-[#393836] border border-[#4a4945] text-[#ececec] focus:border-[#e07b53]"
                    >
                      <option>English</option>
                      <option>Spanish</option>
                      <option>French</option>
                      <option>German</option>
                      <option>Japanese</option>
                    </select>
                  </div>
                </div>

                {/* Nav buttons */}
                <div className="flex justify-between items-center pt-4 border-t border-[#3a3936]/40">
                  <button 
                    onClick={handleBack}
                    className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#a3a29e] hover:text-[#ececec] transition-colors"
                  >
                    <ArrowLeft size={14} />
                    <span>Back</span>
                  </button>
                  <button 
                    onClick={handleNext}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-[#e07b53] hover:bg-[#c45e2e] text-[#2b2a27] transition-all cursor-pointer"
                  >
                    <span>Save & Continue</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            )}

            {/* ------------------------------------------------ */}
            {/* STEP 4: COMPETITOR INFORMATION */}
            {/* ------------------------------------------------ */}
            {step === 4 && (
              <div className="space-y-6">
                <div className="space-y-1">
                  <h2 className="text-base font-semibold text-[#ececec]">Competitors Intelligence</h2>
                  <p className="text-xs text-[#a3a29e] font-light">Add up to 5 competitors to compare crawls metrics.</p>
                </div>

                <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                  {competitors.map((comp, idx) => (
                    <div key={idx} className="flex gap-2 items-center p-3.5 rounded-xl border border-[#3a3936]/60 bg-[#2b2a27]/25 relative group">
                      <div className="grid grid-cols-2 gap-3 flex-1">
                        <div className="space-y-1">
                          <label className="text-[10px] font-semibold text-[#a3a29e]">Website URL</label>
                          <input
                            type="text"
                            placeholder="competitor.com"
                            value={comp.url}
                            onChange={(e) => updateCompetitor(idx, "url", e.target.value)}
                            className="w-full px-2.5 py-1.5 rounded-md text-[11px] outline-none bg-[#393836]/60 border border-[#4a4945] text-[#ececec] focus:border-[#e07b53]"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-semibold text-[#a3a29e]">Company Name</label>
                          <input
                            type="text"
                            placeholder="Competitor Brand"
                            value={comp.name}
                            onChange={(e) => updateCompetitor(idx, "name", e.target.value)}
                            className="w-full px-2.5 py-1.5 rounded-md text-[11px] outline-none bg-[#393836]/60 border border-[#4a4945] text-[#ececec] focus:border-[#e07b53]"
                          />
                        </div>
                      </div>

                      {competitors.length > 1 && (
                        <button
                          onClick={() => removeCompetitor(idx)}
                          className="p-1 rounded text-[#6b6b66] hover:text-rose-400 transition-colors mt-4"
                          title="Remove competitor"
                        >
                          <Trash2 size={14} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                {competitors.length < 5 && (
                  <button
                    onClick={addCompetitor}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-[#e07b53] hover:text-[#ff9a6f] bg-[#e07b53]/5 border border-[#e07b53]/15 transition-all w-fit cursor-pointer"
                  >
                    <Plus size={14} />
                    <span>Add Another Competitor</span>
                  </button>
                )}

                {/* Nav buttons */}
                <div className="flex justify-between items-center pt-4 border-t border-[#3a3936]/40">
                  <button 
                    onClick={handleBack}
                    className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#a3a29e] hover:text-[#ececec] transition-colors"
                  >
                    <ArrowLeft size={14} />
                    <span>Back</span>
                  </button>
                  <button 
                    onClick={handleNext}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-[#e07b53] hover:bg-[#c45e2e] text-[#2b2a27] transition-all cursor-pointer"
                  >
                    <span>Save & Continue</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            )}

            {/* ------------------------------------------------ */}
            {/* STEP 5: TARGET AUDIENCE */}
            {/* ------------------------------------------------ */}
            {step === 5 && (
              <div className="space-y-6">
                <div className="space-y-1">
                  <h2 className="text-base font-semibold text-[#ececec]">Target Audience & Market</h2>
                  <p className="text-xs text-[#a3a29e] font-light">Detail who you want to optimize your text and products for.</p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-[#a3a29e]">Customer Type</label>
                    <div className="flex flex-wrap gap-2">
                      {["B2B", "B2C", "Local Business", "E-commerce", "SaaS", "Healthcare", "Education"].map((type) => (
                        <button
                          key={type}
                          onClick={() => setAudienceType(type)}
                          className={cn(
                            "px-3 py-1.5 rounded-lg text-xs border transition-all font-medium",
                            audienceType === type 
                              ? "border-[#e07b53] bg-[#e07b53]/5 text-[#e07b53]" 
                              : "border-[#4a4945]/40 bg-[#393836]/10 text-[#a3a29e] hover:border-[#4a4945]"
                          )}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#a3a29e]">Primary Market Geography</label>
                    <input
                      type="text"
                      placeholder="e.g. North America, Global, Local (State/City)"
                      value={primaryMarket}
                      onChange={(e) => setPrimaryMarket(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg text-xs outline-none bg-[#393836]/60 border border-[#4a4945] text-[#ececec] focus:border-[#e07b53]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#a3a29e]">Audience Description (Optional)</label>
                    <textarea
                      placeholder="Describe your ideal visitor profile (e.g. Enterprise SEO Directors seeking analytics)..."
                      value={customerDescription}
                      onChange={(e) => setCustomerDescription(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg text-xs outline-none resize-none h-20 bg-[#393836]/60 border border-[#4a4945] text-[#ececec] focus:border-[#e07b53]"
                    />
                  </div>
                </div>

                {/* Nav buttons */}
                <div className="flex justify-between items-center pt-4 border-t border-[#3a3936]/40">
                  <button 
                    onClick={handleBack}
                    className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#a3a29e] hover:text-[#ececec] transition-colors"
                  >
                    <ArrowLeft size={14} />
                    <span>Back</span>
                  </button>
                  <button 
                    onClick={handleNext}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-[#e07b53] hover:bg-[#c45e2e] text-[#2b2a27] transition-all cursor-pointer"
                  >
                    <span>Save & Continue</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            )}

            {/* ------------------------------------------------ */}
            {/* STEP 6: AUDIT GOALS */}
            {/* ------------------------------------------------ */}
            {step === 6 && (
              <div className="space-y-6">
                <div className="space-y-1">
                  <h2 className="text-base font-semibold text-[#ececec]">Audit Objectives</h2>
                  <p className="text-xs text-[#a3a29e] font-light">Select all key achievements you seek (Multiple choices allowed).</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-60 overflow-y-auto pr-1">
                  {[
                    "Improve SEO",
                    "Improve AEO",
                    "Technical SEO Audit",
                    "Performance Optimization",
                    "Content Optimization",
                    "Increase Organic Traffic",
                    "AI Search Visibility",
                    "Competitor Analysis"
                  ].map((goal) => {
                    const isSelected = selectedGoals.includes(goal)
                    return (
                      <button
                        key={goal}
                        onClick={() => toggleGoal(goal)}
                        className={cn(
                          "p-3 rounded-lg border text-left flex items-center justify-between transition-all",
                          isSelected 
                            ? "border-[#e07b53] bg-[#e07b53]/5" 
                            : "border-[#4a4945]/40 bg-[#393836]/10 hover:border-[#4a4945]"
                        )}
                      >
                        <span className="text-xs font-medium text-[#ececec]">{goal}</span>
                        {isSelected ? (
                          <div className="w-4 h-4 rounded-full bg-[#e07b53] flex items-center justify-center text-[#2b2a27]">
                            <Check size={10} strokeWidth={3} />
                          </div>
                        ) : (
                          <div className="w-4 h-4 rounded-full border border-[#4a4945]" />
                        )}
                      </button>
                    )
                  })}
                </div>

                {/* Nav buttons */}
                <div className="flex justify-between items-center pt-4 border-t border-[#3a3936]/40">
                  <button 
                    onClick={handleBack}
                    className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#a3a29e] hover:text-[#ececec] transition-colors"
                  >
                    <ArrowLeft size={14} />
                    <span>Back</span>
                  </button>
                  <button 
                    onClick={handleNext}
                    className={cn(
                      "flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-[#e07b53] hover:bg-[#c45e2e] text-[#2b2a27] transition-all cursor-pointer",
                      selectedGoals.length === 0 ? "opacity-50 pointer-events-none" : ""
                    )}
                  >
                    <span>Save & Continue</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            )}

            {/* ------------------------------------------------ */}
            {/* STEP 7: AUDIT CONFIGURATION */}
            {/* ------------------------------------------------ */}
            {step === 7 && (
              <div className="space-y-6">
                <div className="space-y-1">
                  <h2 className="text-base font-semibold text-[#ececec]">Crawl Configuration</h2>
                  <p className="text-xs text-[#a3a29e] font-light">Fine tune depth limits and toggling active auditor modules.</p>
                </div>

                {/* Audit Depth selectors */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-[#a3a29e]">Audit Depth</label>
                  <div className="grid grid-cols-3 gap-2">
                    {(["Quick", "Standard", "Comprehensive"] as const).map((depth) => (
                      <button
                        key={depth}
                        onClick={() => setAuditDepth(depth)}
                        className={cn(
                          "py-2 rounded-lg text-xs font-medium border transition-all text-center",
                          auditDepth === depth 
                            ? "border-[#e07b53] bg-[#e07b53]/5 text-[#ececec]" 
                            : "border-[#4a4945]/40 bg-[#393836]/10 text-[#a3a29e] hover:border-[#4a4945]"
                        )}
                      >
                        {depth}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Module Toggles list */}
                <div className="space-y-2 pt-2 border-t border-[#3a3936]/40">
                  <label className="text-xs font-semibold text-[#a3a29e] block mb-2">Active Auditor Engines</label>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-40 overflow-y-auto pr-1">
                    {([
                      { key: "seo", label: "Technical SEO module" },
                      { key: "performance", label: "Core Performance diagnostics" },
                      { key: "accessibility", label: "Accessibility compliance check" },
                      { key: "structuredData", label: "Structured Schema audit" },
                      { key: "content", label: "AI Content copywriter evaluation" },
                      { key: "competitor", label: "Competitor positioning compare" },
                      { key: "ai", label: "AEO Answer Engines visibility scan" }
                    ] as const).map((toggle) => {
                      const isActive = toggles[toggle.key]
                      return (
                        <div 
                          key={toggle.key}
                          onClick={() => toggleConf(toggle.key)}
                          className="flex items-center justify-between p-2.5 rounded-lg border border-[#3a3936]/60 bg-[#2b2a27]/10 hover:border-[#4a4945] cursor-pointer"
                        >
                          <span className="text-[11px] text-[#ececec]">{toggle.label}</span>
                          <button className="text-[#a3a29e] hover:text-[#ececec] transition-colors focus:outline-none">
                            {isActive ? (
                              <ToggleRight size={22} className="text-[#e07b53]" />
                            ) : (
                              <ToggleLeft size={22} className="text-[#6b6b66]" />
                            )}
                          </button>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Nav buttons */}
                <div className="flex justify-between items-center pt-4 border-t border-[#3a3936]/40">
                  <button 
                    onClick={handleBack}
                    className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#a3a29e] hover:text-[#ececec] transition-colors"
                  >
                    <ArrowLeft size={14} />
                    <span>Back</span>
                  </button>
                  <button 
                    onClick={handleNext}
                    className="flex items-center gap-1.5 px-5 py-2.5 rounded-lg text-xs font-bold bg-[#e07b53] hover:bg-[#c45e2e] text-[#2b2a27] transition-all shadow-md cursor-pointer"
                  >
                    <span>Launch First Audit</span>
                    <Play size={10} className="fill-[#2b2a27] text-[#2b2a27]" />
                  </button>
                </div>
              </div>
            )}

            {/* ------------------------------------------------ */}
            {/* STEP 8: RUNNING FIRST REPORT SCREEN (LOADING) */}
            {/* ------------------------------------------------ */}
            {step === 8 && (
              <div className="py-12 flex flex-col items-center justify-center space-y-8 text-center animate-fade-in-up">
                
                {/* Visual loading icon wrapper */}
                <div className="w-16 h-16 rounded-full bg-[#393836]/30 flex items-center justify-center relative shadow-lg">
                  <AeolyzerLogoAnimated size={36} />
                </div>

                {/* Message texts */}
                <div className="space-y-2">
                  <h2 className="text-base font-semibold text-[#ececec]">Preparing your AI Website Audit...</h2>
                  <p className="text-xs text-[#a3a29e] font-light max-w-xs mx-auto">
                    Crawler bots are running audits on target pages. This takes a brief moment.
                  </p>
                </div>

                {/* Active log telemetry tasks list (no progress percent bar) */}
                <div className="w-full max-w-xs p-3 rounded-lg border border-[#3a3936] bg-[#2b2a27]/30 min-h-[64px] flex items-center justify-center">
                  <div className="flex items-center gap-2.5 text-xs text-[#e07b53] font-medium animate-pulse">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#e07b53]" />
                    <span>{runTasks[currentTaskIdx]}</span>
                  </div>
                </div>

              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  )
}

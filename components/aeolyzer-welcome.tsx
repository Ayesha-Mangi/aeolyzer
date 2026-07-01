"use client"

import { useState, useEffect } from "react"
import { AeolyzerLogo } from "./aeolyzer-logo"
import { AeolyzerChatInput } from "./aeolyzer-chat-input"
import {
  Globe,
  TrendingUp,
  PenTool,
  Search,
  Users,
  Zap,
  Star,
  Clock,
  MessageSquare,
  ChevronRight,
} from "lucide-react"

interface WelcomeProps {
  userName?: string
  onSend: (message: string) => void
  isGenerating: boolean
}

// ─── Suggested Prompts ───────────────────────────────────────────────────────

const suggestedPrompts = [
  {
    icon: Globe,
    label: "Audit my website",
    prompt: "Audit my website and provide a comprehensive SEO and performance analysis with actionable recommendations.",
    color: "#e07b53",
    bg: "#e07b5315",
  },
  {
    icon: TrendingUp,
    label: "Improve SEO",
    prompt: "Analyze my current SEO strategy and suggest specific improvements to increase organic search rankings.",
    color: "#10b981",
    bg: "#10b98115",
  },
  {
    icon: PenTool,
    label: "Generate content",
    prompt: "Generate a high-quality, SEO-optimized blog post for my target audience with keyword-rich headings.",
    color: "#6366f1",
    bg: "#6366f115",
  },
  {
    icon: Search,
    label: "Find keyword opportunities",
    prompt: "Research and identify high-value keyword opportunities in my niche with low competition and high search volume.",
    color: "#8b5cf6",
    bg: "#8b5cf615",
  },
  {
    icon: Users,
    label: "Analyze competitors",
    prompt: "Run a competitor analysis against my top 3 competitors and identify gaps in their SEO and content strategy.",
    color: "#f59e0b",
    bg: "#f59e0b15",
  },
  {
    icon: Zap,
    label: "Fix performance issues",
    prompt: "Identify and prioritize the top performance issues slowing down my website and suggest specific fixes.",
    color: "#ec4899",
    bg: "#ec489915",
  },
]

// ─── Mock Conversation History ───────────────────────────────────────────────

const conversationHistory = {
  favorites: [
    { id: "f1", title: "Full SEO audit for example-saas.com", preview: "Comprehensive analysis — 42 issues found" },
  ],
  today: [
    { id: "t1", title: "Keyword cluster for AI SEO tools", preview: "47 high-intent keywords mapped" },
    { id: "t2", title: "Blog outline: Top 10 SEO mistakes", preview: "10-section outline with keyword anchors" },
    { id: "t3", title: "Competitor gap analysis — 3 rivals", preview: "Content gaps in 8 topic clusters" },
  ],
  yesterday: [
    { id: "y1", title: "Meta descriptions for /pricing", preview: "3 variants tested for CTR optimization" },
    { id: "y2", title: "Technical SEO audit checklist", preview: "24-point checklist generated" },
    { id: "y3", title: "Schema markup for /features page", preview: "JSON-LD structure validated" },
  ],
  recent: [
    { id: "r1", title: "Content plan — 30-day calendar", preview: "30 topics with pillar/cluster structure" },
    { id: "r2", title: "AEO visibility improvement guide", preview: "ChatGPT & Perplexity citation strategy" },
  ],
}

// ─── Component ───────────────────────────────────────────────────────────────

export function AeolyzerWelcome({ userName = "Muhammad", onSend, isGenerating }: WelcomeProps) {
  const [greeting, setGreeting] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [historyTab, setHistoryTab] = useState<"recent" | "favorites" | "today" | "yesterday">("today")

  useEffect(() => {
    setMounted(true)
    const hour = new Date().getHours()
    if (hour < 12) setGreeting("Good morning")
    else if (hour < 18) setGreeting("Good afternoon")
    else setGreeting("Good evening")
  }, [])

  // Filter history items by search
  const allItems = [
    ...conversationHistory.favorites.map((i) => ({ ...i, group: "favorites" })),
    ...conversationHistory.today.map((i) => ({ ...i, group: "today" })),
    ...conversationHistory.yesterday.map((i) => ({ ...i, group: "yesterday" })),
    ...conversationHistory.recent.map((i) => ({ ...i, group: "recent" })),
  ]
  const filtered = searchQuery
    ? allItems.filter(
        (i) =>
          i.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          i.preview.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : conversationHistory[historyTab]

  const currentGroup =
    searchQuery ? filtered : conversationHistory[historyTab]

  return (
    <div
      className="flex flex-col min-h-0 flex-1 overflow-y-auto"
      style={{ backgroundColor: "#2b2a27" }}
    >
      <div className="flex flex-col lg:flex-row flex-1 min-h-0 max-w-7xl mx-auto w-full px-4 py-6 gap-6">

        {/* ── Left: Main Welcome + Input ── */}
        <div className="flex flex-col flex-1 min-w-0">
          {/* Plan badge */}
          <div className="flex items-center justify-between mb-6">
            <span
              className="text-xs px-3 py-1.5 rounded-full font-medium transition-colors cursor-pointer hover:bg-[#393836]"
              style={{ backgroundColor: "#343330", color: "#8b8b87" }}
            >
              Free plan ·{" "}
              <span style={{ color: "#e07b53" }} className="hover:underline">
                Upgrade
              </span>
            </span>
            <span className="text-[10px] text-[#6b6b66] flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Agent Online
            </span>
          </div>

          {/* Greeting */}
          <div
            className="flex items-center gap-4 mb-2"
            style={{ minHeight: "64px" }}
          >
            <AeolyzerLogo size={52} />
            {mounted && greeting && (
              <div className="animate-fade-in-up">
                <h1
                  className="font-light leading-tight"
                  style={{
                    color: "#b8977e",
                    fontFamily: "var(--font-display), 'Rokkitt', Georgia, serif",
                    fontSize: "clamp(1.8rem, 4vw, 3rem)",
                    lineHeight: "1.1",
                  }}
                >
                  {greeting}, {userName}
                </h1>
                <p className="text-sm text-[#6b6b66] mt-1">
                  Your AI-powered website auditor is ready.
                </p>
              </div>
            )}
          </div>

          {/* Separator */}
          <div className="border-t border-[#3a3936] my-6" />

          {/* Chat Input */}
          <div className="w-full max-w-3xl">
            <AeolyzerChatInput
              onSend={onSend}
              isGenerating={isGenerating}
              placeholder="Ask anything — audit a site, generate content, find keywords..."
              showQuickActions={false}
            />
          </div>

          {/* Suggested Prompts */}
          <div className="mt-6">
            <p className="text-[10px] font-semibold text-[#6b6b66] uppercase tracking-wider mb-3">
              Suggested prompts
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 max-w-3xl">
              {suggestedPrompts.map((p, i) => {
                const Icon = p.icon
                return (
                  <button
                    key={i}
                    onClick={() => onSend(p.prompt)}
                    disabled={isGenerating}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-left text-sm transition-all duration-200 border border-[#3a3936] hover:border-[#4a4945] hover:scale-[1.02] group disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ backgroundColor: "#343330" }}
                    aria-label={`Suggested prompt: ${p.label}`}
                  >
                    <div
                      className="p-1.5 rounded-lg flex-shrink-0 transition-transform group-hover:scale-110"
                      style={{ background: p.bg }}
                    >
                      <Icon size={14} style={{ color: p.color }} />
                    </div>
                    <span className="text-[#a3a29e] group-hover:text-[#ececec] transition-colors text-xs font-medium leading-tight truncate">
                      {p.label}
                    </span>
                    <ChevronRight
                      size={12}
                      className="ml-auto text-[#4a4945] group-hover:text-[#6b6b66] flex-shrink-0 transition-colors"
                    />
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* ── Right: Conversation History Panel ── */}
        <div
          className="lg:w-72 flex-shrink-0 rounded-2xl border border-[#3a3936] overflow-hidden flex flex-col"
          style={{ backgroundColor: "#343330" }}
        >
          {/* Panel Header */}
          <div className="px-4 py-3 border-b border-[#3a3936] flex-shrink-0">
            <div className="flex items-center gap-2 mb-3">
              <MessageSquare size={14} className="text-[#e07b53]" />
              <span className="text-xs font-semibold text-[#ececec]">
                Conversation History
              </span>
            </div>
            {/* Search */}
            <div className="relative">
              <Search
                size={12}
                className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#6b6b66]"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search conversations..."
                className="w-full pl-8 pr-3 py-1.5 rounded-lg text-xs outline-none border border-[#3a3936] text-[#a3a29e] placeholder-[#4a4945] focus:border-[#e07b53]/40 focus:ring-1 focus:ring-[#e07b53]/20 transition-all"
                style={{ backgroundColor: "#2b2a27" }}
                aria-label="Search conversation history"
              />
            </div>
          </div>

          {/* Tab Bar */}
          {!searchQuery && (
            <div className="flex items-center gap-0.5 px-2 py-2 border-b border-[#3a3936] flex-shrink-0 overflow-x-auto">
              {(["today", "yesterday", "recent", "favorites"] as const).map(
                (tab) => (
                  <button
                    key={tab}
                    onClick={() => setHistoryTab(tab)}
                    className={`flex-shrink-0 flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-semibold capitalize transition-all ${
                      historyTab === tab
                        ? "bg-[#e07b53] text-[#2b2a27]"
                        : "text-[#6b6b66] hover:text-[#a3a29e] hover:bg-[#393836]"
                    }`}
                    aria-pressed={historyTab === tab}
                  >
                    {tab === "favorites" && (
                      <Star size={9} className="flex-shrink-0" />
                    )}
                    {tab === "recent" && (
                      <Clock size={9} className="flex-shrink-0" />
                    )}
                    {tab}
                  </button>
                )
              )}
            </div>
          )}

          {/* History Items */}
          <div
            className="flex-1 overflow-y-auto py-2 px-2 space-y-0.5"
            style={{ scrollbarWidth: "thin", scrollbarColor: "#4a4945 transparent" }}
          >
            {searchQuery && (
              <p className="text-[10px] text-[#6b6b66] px-2 py-1">
                {filtered.length} result{filtered.length !== 1 ? "s" : ""} for &ldquo;{searchQuery}&rdquo;
              </p>
            )}

            {currentGroup.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <MessageSquare size={20} className="text-[#4a4945] mb-2" />
                <p className="text-xs text-[#6b6b66]">No conversations found</p>
              </div>
            ) : (
              currentGroup.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onSend(`Continue this conversation: ${item.title}`)}
                  className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-[#393836] transition-colors group"
                  aria-label={`Open conversation: ${item.title}`}
                >
                  <div className="flex items-start gap-2">
                    {"group" in item && item.group === "favorites" ? (
                      <Star size={11} className="text-[#f59e0b] mt-0.5 flex-shrink-0" />
                    ) : (
                      <MessageSquare size={11} className="text-[#4a4945] mt-0.5 flex-shrink-0 group-hover:text-[#6b6b66]" />
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium text-[#a3a29e] group-hover:text-[#ececec] transition-colors truncate leading-tight">
                        {item.title}
                      </p>
                      <p className="text-[10px] text-[#4a4945] group-hover:text-[#6b6b66] mt-0.5 truncate transition-colors">
                        {item.preview}
                      </p>
                    </div>
                  </div>
                </button>
              ))
            )}
          </div>

          {/* Panel Footer */}
          <div className="px-4 py-3 border-t border-[#3a3936] flex-shrink-0">
            <button
              className="text-[10px] text-[#6b6b66] hover:text-[#a3a29e] transition-colors w-full text-center"
              aria-label="View all conversations"
            >
              View all conversations →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

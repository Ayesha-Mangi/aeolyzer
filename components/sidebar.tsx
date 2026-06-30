"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  LayoutDashboard,
  MessageSquare,
  BarChart3,
  Globe,
  Search,
  LineChart,
  FileCheck,
  BookOpen,
  Key,
  Terminal,
  FileQuestion,
  PenTool,
  Sparkles,
  Bot,
  GitBranch,
  ClipboardList,
  Settings,
  ChevronDown,
  ChevronRight,
  Download,
  ChevronLeft,
  Settings2,
  HelpCircle,
  Globe2,
  LogOut,
  Gift
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useDashboard } from "@/lib/context/dashboard-context"
import { AeolyzerLogo } from "./aeolyzer-logo"

// Sidebar toggle custom icon
function SidebarToggleIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <svg 
      width="18" 
      height="18" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      {isOpen ? (
        <>
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <line x1="9" y1="3" x2="9" y2="21" />
        </>
      ) : (
        <>
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <line x1="15" y1="3" x2="15" y2="21" />
        </>
      )}
    </svg>
  )
}

export function Sidebar() {
  const pathname = usePathname()
  const { 
    sidebarOpen, 
    setSidebarOpen, 
    setSettingsOpen, 
    handleNewChat 
  } = useDashboard()

  const [analyticsExpanded, setAnalyticsExpanded] = useState(true)
  const [researchExpanded, setResearchExpanded] = useState(true)
  const [showUserMenu, setShowUserMenu] = useState(false)

  const sidebarTextColor = "#a3a29e"
  const sidebarTextColorHover = "#d4d4d4"

  const isActive = (href: string) => pathname === href

  // Helper component to render individual links
  const SidebarLink = ({ 
    href, 
    label, 
    icon: Icon,
    className
  }: { 
    href: string; 
    label: string; 
    icon: any;
    className?: string
  }) => {
    const active = isActive(href)
    return (
      <Link
        href={href}
        className={cn(
          "flex items-center w-full rounded-lg transition-all duration-150 ease-in-out font-medium",
          sidebarOpen ? "gap-3 px-3 py-2" : "justify-center p-2",
          active 
            ? "bg-[#393836] text-[#ececec] border-l-2 border-[#e07b53] rounded-l-none pl-2.5" 
            : "text-[#a3a29e] hover:bg-[#252422] hover:text-[#d4d4d4]",
          className
        )}
      >
        <Icon size={18} strokeWidth={1.75} className={cn(active ? "text-[#e07b53]" : "")} />
        {sidebarOpen && <span className="text-sm truncate">{label}</span>}
      </Link>
    )
  }

  return (
    <aside
      className={cn(
        "flex flex-col h-full transition-all duration-300 ease-in-out relative border-r border-[#3a3936] flex-shrink-0 z-20 select-none",
        sidebarOpen ? "w-[260px]" : "w-[60px]"
      )}
      style={{ backgroundColor: "#2b2a27" }}
    >
      {/* Top Header Section */}
      <div className="flex items-center justify-between p-4 flex-shrink-0 border-b border-[#3a3936] h-14">
        {sidebarOpen ? (
          <>
            <Link href="/dashboard" className="flex items-center gap-2">
              <AeolyzerLogo size={22} />
              <span className="text-sm font-semibold tracking-wide text-[#ececec] truncate">
                Website Auditor AI
              </span>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-1 rounded-md transition-colors text-[#6b6b66] hover:bg-[#252422] hover:text-[#a3a29e]"
            >
              <SidebarToggleIcon isOpen={true} />
            </button>
          </>
        ) : (
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-1 rounded-md transition-colors text-[#6b6b66] mx-auto hover:bg-[#252422] hover:text-[#a3a29e]"
          >
            <SidebarToggleIcon isOpen={false} />
          </button>
        )}
      </div>

      {/* Main Nav Scroll Section */}
      <div 
        className="flex-1 overflow-y-auto px-2 py-3 space-y-1.5 scrollbar-thin"
        style={{ scrollbarWidth: "thin", scrollbarColor: "#4a4945 transparent" }}
      >
        {/* Core Routes */}
        <SidebarLink href="/dashboard" label="Dashboard" icon={LayoutDashboard} />
        
        {/* Chat / Agent Route - acts as New Chat launcher or active session view */}
        <div className="relative group">
          <SidebarLink href="/agent" label="Agent Chat" icon={MessageSquare} />
        </div>

        {/* Separator */}
        <div className="my-2 border-t border-[#3a3936] mx-1" />

        {/* Collapsible Group: Analytics */}
        <div>
          {sidebarOpen ? (
            <button
              onClick={() => setAnalyticsExpanded(!analyticsExpanded)}
              className="flex items-center justify-between w-full px-3 py-1.5 text-xs font-semibold text-[#6b6b66] hover:text-[#a3a29e] transition-colors"
            >
              <span>ANALYTICS</span>
              {analyticsExpanded ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
            </button>
          ) : (
            <div className="my-2 border-t border-[#3a3936] opacity-0" />
          )}

          {(!sidebarOpen || analyticsExpanded) && (
            <div className={cn("space-y-1 mt-0.5", sidebarOpen ? "pl-2" : "pl-0")}>
              <SidebarLink href="/analytics/seo" label="SEO Insights" icon={Globe} />
              <SidebarLink href="/analytics/aeo" label="AEO Insights" icon={Search} />
              <SidebarLink href="/analytics/traffic" label="Traffic Analytics" icon={LineChart} />
            </div>
          )}
        </div>

        <SidebarLink href="/website-audit" label="Website Audit" icon={FileCheck} />

        {/* Collapsible Group: Research */}
        <div>
          {sidebarOpen ? (
            <button
              onClick={() => setResearchExpanded(!researchExpanded)}
              className="flex items-center justify-between w-full px-3 py-1.5 text-xs font-semibold text-[#6b6b66] hover:text-[#a3a29e] transition-colors"
            >
              <span>RESEARCH</span>
              {researchExpanded ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
            </button>
          ) : (
            <div className="my-2 border-t border-[#3a3936] opacity-0" />
          )}

          {(!sidebarOpen || researchExpanded) && (
            <div className={cn("space-y-1 mt-0.5", sidebarOpen ? "pl-2" : "pl-0")}>
              <SidebarLink href="/research/keyword" label="Keyword Research" icon={Key} />
              <SidebarLink href="/research/prompt" label="Prompt Research" icon={Terminal} />
              <SidebarLink href="/research/content-gap" label="Content Gap Analysis" icon={FileQuestion} />
            </div>
          )}
        </div>

        {/* Rest of the Core Routes */}
        <SidebarLink href="/content-studio" label="Content Studio" icon={PenTool} />
        <SidebarLink href="/seo-optimization" label="SEO Optimization" icon={Sparkles} />
        <SidebarLink href="/agents" label="Agents" icon={Bot} />
        <SidebarLink href="/workflows" label="Workflows" icon={GitBranch} />
        <SidebarLink href="/reports" label="Reports" icon={ClipboardList} />

        {/* Separator */}
        <div className="my-2 border-t border-[#3a3936] mx-1" />

        <SidebarLink href="/settings" label="Settings" icon={Settings} />
      </div>

      {/* User Section at Footer */}
      <div className="flex-shrink-0 p-2 border-t border-[#3a3936] relative">
        <button
          onClick={() => setShowUserMenu(!showUserMenu)}
          className={cn(
            "flex items-center w-full rounded-lg transition-colors p-2 text-left",
            sidebarOpen ? "gap-3" : "justify-center"
          )}
          style={{ color: sidebarTextColor }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#252422"
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent"
          }}
        >
          <div 
            className="w-7 h-7 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0"
            style={{ backgroundColor: "#4a4945", color: "#ececec" }}
          >
            M
          </div>
          {sidebarOpen && (
            <>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate text-[#ececec]">Muhammad</p>
                <p className="text-xs text-[#6b6b66]">Enterprise Auditor</p>
              </div>
              <ChevronDown size={14} className="text-[#6b6b66]" />
            </>
          )}
        </button>

        {/* Dropdown Menu (Matches original look & feel) */}
        {showUserMenu && sidebarOpen && (
          <div 
            className="absolute bottom-full left-2 right-2 mb-2 rounded-xl shadow-xl overflow-hidden z-50 animate-fade-in-up"
            style={{ backgroundColor: "#2b2a27", border: "1px solid #3a3936" }}
          >
            <div className="px-4 py-3 border-b" style={{ borderColor: "#3a3936" }}>
              <p className="text-xs text-[#6b6b66]">muhammed.beig@gmail.com</p>
            </div>
            
            <div className="py-1">
              <button
                onClick={() => {
                  setShowUserMenu(false)
                  setSettingsOpen(true)
                }}
                className="flex items-center gap-3 w-full px-4 py-2 text-sm transition-colors text-[#a3a29e] hover:bg-[#252422] hover:text-[#d4d4d4]"
              >
                <Settings size={16} strokeWidth={1.5} />
                <span>System Preferences</span>
              </button>
              
              <button
                className="flex items-center gap-3 w-full px-4 py-2 text-sm transition-colors text-[#a3a29e] hover:bg-[#252422] hover:text-[#d4d4d4]"
              >
                <Globe2 size={16} strokeWidth={1.5} />
                <span>Language & Locale</span>
              </button>
              
              <button
                className="flex items-center gap-3 w-full px-4 py-2 text-sm transition-colors text-[#a3a29e] hover:bg-[#252422] hover:text-[#d4d4d4]"
              >
                <HelpCircle size={16} strokeWidth={1.5} />
                <span>Get Help & Docs</span>
              </button>
            </div>

            <div className="py-1 border-t border-[#3a3936]">
              <button
                className="flex items-center gap-3 w-full px-4 py-2 text-sm transition-colors text-[#a3a29e] hover:bg-[#252422] hover:text-[#d4d4d4]"
              >
                <Sparkles size={16} strokeWidth={1.5} />
                <span>Upgrade Plan</span>
              </button>
              <button
                className="flex items-center gap-3 w-full px-4 py-2 text-sm transition-colors text-[#a3a29e] hover:bg-[#252422] hover:text-[#d4d4d4]"
              >
                <LogOut size={16} strokeWidth={1.5} />
                <span>Log out</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </aside>
  )
}

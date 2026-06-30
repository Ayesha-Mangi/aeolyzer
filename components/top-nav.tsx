"use client"

import React, { useState } from "react"
import { Bell, Search, Settings, HelpCircle, ChevronDown, Check, User, Shield, CreditCard, Sparkles } from "lucide-react"
import { useDashboard } from "@/lib/context/dashboard-context"
import { cn } from "@/lib/utils"

export function TopNav() {
  const { setSettingsOpen } = useDashboard()
  const [showWorkspaceMenu, setShowWorkspaceMenu] = useState(false)
  const [activeWorkspace, setActiveWorkspace] = useState("Enterprise Audit Workspace")
  const [showNotifications, setShowNotifications] = useState(false)

  const workspaces = [
    "Enterprise Audit Workspace",
    "Staging Scans Team",
    "Personal Sandbox",
  ]

  const mockNotifications = [
    { id: 1, text: "SEO audit for footy.com completed successfully.", time: "5m ago", read: false },
    { id: 2, text: "Security agent flagged 2 vulnerability risks.", time: "1h ago", read: false },
    { id: 3, text: "Weekly site compliance report generated.", time: "1d ago", read: true },
  ]

  return (
    <header 
      className="flex items-center justify-between px-6 py-3 border-b border-[#3a3936] h-14 flex-shrink-0 relative z-10 select-none"
      style={{ backgroundColor: "#2b2a27" }}
    >
      {/* Left: Workspace dropdown switcher */}
      <div className="flex items-center gap-2">
        <div className="relative">
          <button
            onClick={() => setShowWorkspaceMenu(!showWorkspaceMenu)}
            className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-semibold hover:bg-[#252422] transition-colors border border-[#4a4945] text-[#ececec]"
          >
            <div className="w-2.5 h-2.5 rounded-full bg-[#e07b53] animate-pulse" />
            <span className="max-w-[150px] truncate">{activeWorkspace}</span>
            <ChevronDown size={12} className="text-[#a3a29e]" />
          </button>

          {showWorkspaceMenu && (
            <div 
              className="absolute left-0 mt-1.5 w-60 rounded-xl shadow-xl border border-[#3a3936] p-1.5 z-50 animate-fade-in-up"
              style={{ backgroundColor: "#2b2a27" }}
            >
              <p className="text-[10px] font-semibold text-[#6b6b66] px-3 py-1.5 tracking-wider uppercase">
                Workspaces
              </p>
              {workspaces.map((ws) => (
                <button
                  key={ws}
                  onClick={() => {
                    setActiveWorkspace(ws)
                    setShowWorkspaceMenu(false)
                  }}
                  className={cn(
                    "flex items-center justify-between w-full px-3 py-2 text-xs rounded-lg transition-colors text-left",
                    activeWorkspace === ws 
                      ? "bg-[#393836] text-[#ececec] font-medium" 
                      : "text-[#a3a29e] hover:bg-[#252422] hover:text-[#ececec]"
                  )}
                >
                  <span>{ws}</span>
                  {activeWorkspace === ws && <Check size={12} className="text-[#e07b53]" />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Center: Global Search Bar */}
      <div className="flex-1 max-w-md mx-6">
        <div className="relative flex items-center">
          <Search size={16} className="absolute left-3 text-[#6b6b66] pointer-events-none" />
          <input
            type="text"
            placeholder="Search scans, keyword, agents (Press ⌘K)..."
            className="w-full pl-9 pr-4 py-1.5 rounded-lg text-xs outline-none border border-[#4a4945] text-[#ececec] transition-all focus:ring-1 focus:ring-[#e07b53] focus:border-[#e07b53] placeholder-[#6b6b66]"
            style={{ backgroundColor: "#393836" }}
          />
          <div 
            className="absolute right-3 px-1.5 py-0.5 rounded text-[10px] font-medium text-[#6b6b66] border border-[#4a4945]"
            style={{ backgroundColor: "#2b2a27" }}
          >
            ⌘K
          </div>
        </div>
      </div>

      {/* Right: Notifications, User, Settings */}
      <div className="flex items-center gap-2">
        {/* Help Center */}
        <button 
          title="Docs & Tutorials"
          className="p-1.5 rounded-lg transition-colors text-[#a3a29e] hover:bg-[#252422] hover:text-[#ececec]"
        >
          <HelpCircle size={18} strokeWidth={1.75} />
        </button>

        {/* System Settings Shortcut */}
        <button 
          onClick={() => setSettingsOpen(true)}
          title="System Preferences"
          className="p-1.5 rounded-lg transition-colors text-[#a3a29e] hover:bg-[#252422] hover:text-[#ececec]"
        >
          <Settings size={18} strokeWidth={1.75} />
        </button>

        {/* Notifications Bell */}
        <div className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            title="Notifications"
            className={cn(
              "p-1.5 rounded-lg transition-colors relative",
              showNotifications ? "bg-[#393836] text-[#ececec]" : "text-[#a3a29e] hover:bg-[#252422] hover:text-[#ececec]"
            )}
          >
            <Bell size={18} strokeWidth={1.75} />
            <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-[#e07b53]" />
          </button>

          {showNotifications && (
            <div 
              className="absolute right-0 mt-1.5 w-80 rounded-xl shadow-xl border border-[#3a3936] p-1 z-50 animate-fade-in-up"
              style={{ backgroundColor: "#2b2a27" }}
            >
              <div className="flex items-center justify-between px-3 py-2 border-b border-[#3a3936]">
                <span className="text-xs font-semibold text-[#ececec]">Notifications</span>
                <button className="text-[10px] text-[#e07b53] hover:underline">Mark all read</button>
              </div>
              <div className="py-1 max-h-60 overflow-y-auto">
                {mockNotifications.map((notif) => (
                  <div 
                    key={notif.id}
                    className="px-3 py-2 text-xs hover:bg-[#252422] transition-colors border-b border-[#3a3936]/30 last:border-0"
                  >
                    <p className={cn("text-[#ececec]", notif.read ? "opacity-60" : "font-medium")}>
                      {notif.text}
                    </p>
                    <span className="text-[10px] text-[#6b6b66] mt-1 block">{notif.time}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

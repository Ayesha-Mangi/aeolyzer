"use client"

import React from "react"
import { usePathname } from "next/navigation"
import { DashboardProvider, useDashboard } from "@/lib/context/dashboard-context"
import { Sidebar } from "@/components/sidebar"
import { AeolyzerSidebar } from "@/components/aeolyzer-sidebar"
import { TopNav } from "@/components/top-nav"
import { AeolyzerSettings } from "@/components/aeolyzer-settings"

function DashboardLayoutContent({ children }: { children: React.ReactNode }) {
  const { 
    settingsOpen, 
    setSettingsOpen, 
    theme, 
    setTheme, 
    onboarded,
    sidebarOpen,
    setSidebarOpen,
    chatTitle,
    handleNewChat
  } = useDashboard()

  const pathname = usePathname()
  const isAgentWorkspace = pathname === "/agent" || (pathname.startsWith("/agent/") && !pathname.startsWith("/agents"))

  if (!onboarded) {
    return (
      <div className="flex h-screen w-screen overflow-hidden bg-[#2b2a27]">
        <main className="flex-1 overflow-y-auto min-h-0 min-w-0">
          {children}
        </main>
      </div>
    )
  }

  if (isAgentWorkspace) {
    return (
      <div className="flex h-screen w-screen overflow-hidden">
        {/* Agent Sidebar */}
        <AeolyzerSidebar 
          isOpen={sidebarOpen}
          onToggle={() => setSidebarOpen(!sidebarOpen)}
          onNewChat={handleNewChat}
          currentChatTitle={chatTitle}
          onOpenSettings={() => setSettingsOpen(true)}
        />

        {/* Agent Workspace Content Area */}
        <div className="flex-1 flex flex-col min-w-0 min-h-0 bg-[#2b2a27]">
          <main className="flex-1 overflow-y-auto min-h-0 min-w-0">
            {children}
          </main>
        </div>

        {/* Global settings panel */}
        <AeolyzerSettings 
          isOpen={settingsOpen}
          onClose={() => setSettingsOpen(false)}
          theme={theme}
          onThemeChange={setTheme}
        />
      </div>
    )
  }

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Panel Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-0 bg-[#2b2a27]">
        {/* Top Navbar */}
        <TopNav />

        {/* Dynamic Route Children Viewport */}
        <main className="flex-1 overflow-y-auto min-h-0 min-w-0">
          {children}
        </main>
      </div>

      {/* Global settings panel */}
      <AeolyzerSettings 
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        theme={theme}
        onThemeChange={setTheme}
      />
    </div>
  )
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardProvider>
      <DashboardLayoutContent>{children}</DashboardLayoutContent>
    </DashboardProvider>
  )
}

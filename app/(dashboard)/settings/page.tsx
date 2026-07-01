"use client"

import React, { useState, useEffect } from "react"
import { useDashboard } from "@/lib/context/dashboard-context"
import { 
  Settings, User, Moon, Sun, Monitor, Laptop, Globe, Bell, Sparkles, 
  LayoutDashboard, Shield, Link2, Key, Database, RefreshCw, HelpCircle, 
  Check, Copy, Eye, EyeOff, AlertTriangle, LogOut, ChevronRight, Download
} from "lucide-react"

// UI Imports
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { toast } from "sonner"

export default function SettingsPage() {
  const { theme, setTheme, setOnboarded } = useDashboard()
  const [isLoading, setIsLoading] = useState(true)
  const [activeSection, setActiveSection] = useState("profile")

  // Mock forms states
  const [profileName, setProfileName] = useState("Alex Harrison")
  const [profileEmail, setProfileEmail] = useState("alex@aeolyzer.io")
  const [profileRole, setProfileRole] = useState("Admin Owner")
  const [workspaceName, setWorkspaceName] = useState("Production Site Audit")
  const [orgName, setOrgName] = useState("Aeolyzer Inc")
  
  // Notification States
  const [notifEmail, setNotifEmail] = useState(true)
  const [notifAudit, setNotifAudit] = useState(true)
  const [notifWorkflow, setNotifWorkflow] = useState(false)
  const [notifSuggestion, setNotifSuggestion] = useState(true)
  const [notifWeekly, setNotifWeekly] = useState(true)

  // AI Preferences
  const [defaultAgent, setDefaultAgent] = useState("auditor")
  const [responseStyle, setResponseStyle] = useState("detailed")
  const [creativityLevel, setCreativityLevel] = useState(60)
  const [autoSuggest, setAutoSuggest] = useState(true)

  // Dashboard Preferences
  const [defaultDashboard, setDefaultDashboard] = useState("overview")
  const [compactMode, setCompactMode] = useState(false)
  const [showCards, setShowCards] = useState(true)
  const [enableQuickActions, setEnableQuickActions] = useState(true)

  // API Key Demonstrator
  const [apiKeyVisible, setApiKeyVisible] = useState(false)
  const [copiedKey, setCopiedKey] = useState(false)
  const mockApiKey = "aeolyzer_api_key_placeholder_secret"

  // Onboarding Reset Modal
  const [resetDialogOpen, setResetDialogOpen] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 600)
    return () => clearTimeout(timer)
  }, [])

  const handleCopyKey = () => {
    setCopiedKey(true)
    toast.success("API key copied to clipboard")
    setTimeout(() => setCopiedKey(false), 2000)
  }

  const handleResetOnboarding = () => {
    setOnboarded(false)
    setResetDialogOpen(false)
    toast.success("Onboarding has been reset! Please return to the dashboard to begin.")
  }

  const handleResetPreferences = () => {
    setTheme("dark")
    setProfileName("Alex Harrison")
    setProfileEmail("alex@aeolyzer.io")
    setProfileRole("Admin Owner")
    setWorkspaceName("Production Site Audit")
    setOrgName("Aeolyzer Inc")
    setNotifEmail(true)
    setNotifAudit(true)
    setNotifWorkflow(false)
    setNotifSuggestion(true)
    setNotifWeekly(true)
    setDefaultAgent("auditor")
    setResponseStyle("detailed")
    setCreativityLevel(60)
    setAutoSuggest(true)
    setDefaultDashboard("overview")
    setCompactMode(false)
    setShowCards(true)
    setEnableQuickActions(true)
    toast.success("Preferences reset to defaults")
  }

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault()
    toast.success("Profile details updated successfully")
  }

  const handleSaveWorkspace = (e: React.FormEvent) => {
    e.preventDefault()
    toast.success("Workspace configuration updated")
  }

  const settingsMenu = [
    { id: "profile", name: "My Profile", icon: User },
    { id: "theme", name: "Appearance", icon: Sun },
    { id: "workspace", name: "Workspace Details", icon: Globe },
    { id: "notifications", name: "Notifications", icon: Bell },
    { id: "ai", name: "AI Preferences", icon: Sparkles },
    { id: "dashboard", name: "Dashboard Setup", icon: LayoutDashboard },
    { id: "security", name: "Security & Logins", icon: Shield },
    { id: "integrations", name: "Integrations", icon: Link2 },
    { id: "api", name: "API Access", icon: Key },
    { id: "data", name: "Data Management", icon: Database },
  ]

  return (
    <div className="flex-1 p-6 md:p-8 max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-foreground via-foreground/90 to-muted-foreground bg-clip-text">
          Global Settings
        </h1>
        <p className="text-muted-foreground">
          Update your profile settings, tweak AI prompts templates, customize interface styles, and manage active integrations.
        </p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="space-y-2">
            {[1, 2, 3, 4, 5].map(i => (
              <Skeleton key={i} className="h-9 w-full" />
            ))}
          </div>
          <div className="md:col-span-3 space-y-6">
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-[150px]" />
              </CardHeader>
              <CardContent className="space-y-4">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </CardContent>
            </Card>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Navigation Sidebar */}
          <div className="space-y-1">
            {settingsMenu.map((item) => {
              const IconComp = item.icon
              const isActive = activeSection === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive 
                      ? "bg-primary text-primary-foreground shadow-sm font-semibold" 
                      : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                  }`}
                >
                  <IconComp className="h-4 w-4 shrink-0" />
                  <span>{item.name}</span>
                </button>
              )}
            )}
            
            <div className="pt-6 border-t border-border/50 mt-6 space-y-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full justify-start text-rose-500 border-rose-500/20 hover:bg-rose-500/5 hover:text-rose-600 gap-2 text-xs"
                onClick={() => setResetDialogOpen(true)}
              >
                Reset Onboarding Flow
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="w-full justify-start text-muted-foreground hover:text-foreground text-xs gap-2"
                onClick={handleResetPreferences}
              >
                Reset Preferences
              </Button>
            </div>
          </div>

          {/* Active Configuration Panel */}
          <div className="md:col-span-3 space-y-6">
            
            {/* 1. Profile Panel */}
            {activeSection === "profile" && (
              <Card>
                <CardHeader>
                  <CardTitle>My Profile</CardTitle>
                  <CardDescription>Configure your personal profile details and security roles</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSaveProfile} className="space-y-4">
                    <div className="flex items-center gap-4 pb-4 border-b border-border/40">
                      <div className="h-12 w-12 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-lg">
                        {profileName.split(" ").map(n => n[0]).join("")}
                      </div>
                      <div>
                        <p className="font-semibold text-sm">{profileName}</p>
                        <p className="text-xs text-muted-foreground">{profileRole}</p>
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-1.5">
                        <Label htmlFor="profName">Display Name</Label>
                        <Input 
                          id="profName" 
                          value={profileName} 
                          onChange={(e) => setProfileName(e.target.value)} 
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="profEmail">Email Address</Label>
                        <Input 
                          id="profEmail" 
                          type="email"
                          value={profileEmail} 
                          onChange={(e) => setProfileEmail(e.target.value)} 
                        />
                      </div>
                    </div>
                    <Button type="submit">Save Changes</Button>
                  </form>
                </CardContent>
              </Card>
            )}

            {/* 2. Theme Selection */}
            {activeSection === "theme" && (
              <Card>
                <CardHeader>
                  <CardTitle>Appearance & Theme</CardTitle>
                  <CardDescription>Select preferred UI themes to balance light levels</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { id: "light", name: "Light Mode", icon: Sun },
                      { id: "dark", name: "Dark Mode", icon: Moon },
                      { id: "auto", name: "System Sync", icon: Laptop }
                    ].map((t) => {
                      const IconComp = t.icon
                      const isSelected = theme === t.id
                      return (
                        <button
                          key={t.id}
                          onClick={() => setTheme(t.id as any)}
                          className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all text-xs font-semibold ${
                            isSelected 
                              ? "border-primary bg-primary/5 text-primary" 
                              : "border-border hover:bg-muted/50 text-muted-foreground"
                          }`}
                        >
                          <IconComp className="h-5 w-5" />
                          <span>{t.name}</span>
                        </button>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* 3. Workspace Settings */}
            {activeSection === "workspace" && (
              <Card>
                <CardHeader>
                  <CardTitle>Workspace Setup</CardTitle>
                  <CardDescription>Configure language regionalities and primary project domains</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSaveWorkspace} className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-1.5">
                        <Label htmlFor="wsName">Workspace Name</Label>
                        <Input 
                          id="wsName" 
                          value={workspaceName} 
                          onChange={(e) => setWorkspaceName(e.target.value)} 
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="wsOrg">Organization</Label>
                        <Input 
                          id="wsOrg" 
                          value={orgName} 
                          onChange={(e) => setOrgName(e.target.value)} 
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="wsLang">Default Language</Label>
                        <Select defaultValue="en">
                          <SelectTrigger id="wsLang">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="en">English (US)</SelectItem>
                            <SelectItem value="de">German</SelectItem>
                            <SelectItem value="fr">French</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="wsZone">Timezone</Label>
                        <Select defaultValue="utc8">
                          <SelectTrigger id="wsZone">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="utc8">GMT-8 (PST)</SelectItem>
                            <SelectItem value="utc">UTC (Coordinated)</SelectItem>
                            <SelectItem value="utc5">GMT+5:30 (IST)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <Button type="submit">Update Workspace</Button>
                  </form>
                </CardContent>
              </Card>
            )}

            {/* 4. Notifications */}
            {activeSection === "notifications" && (
              <Card>
                <CardHeader>
                  <CardTitle>Notification Settings</CardTitle>
                  <CardDescription>Control when email messages and platform popups are triggered</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-border/40">
                      <div>
                        <p className="text-sm font-semibold">Email Alerts</p>
                        <p className="text-xs text-muted-foreground">Receive weekly recap letters and alerts</p>
                      </div>
                      <Switch checked={notifEmail} onCheckedChange={setNotifEmail} />
                    </div>

                    <div className="flex items-center justify-between pb-3 border-b border-border/40">
                      <div>
                        <p className="text-sm font-semibold">Audit Completed</p>
                        <p className="text-xs text-muted-foreground">Notify when a target domain crawl terminates</p>
                      </div>
                      <Switch checked={notifAudit} onCheckedChange={setNotifAudit} />
                    </div>

                    <div className="flex items-center justify-between pb-3 border-b border-border/40">
                      <div>
                        <p className="text-sm font-semibold">Workflow Updates</p>
                        <p className="text-xs text-muted-foreground">Notify when automatic scheduled jobs complete</p>
                      </div>
                      <Switch checked={notifWorkflow} onCheckedChange={setNotifWorkflow} />
                    </div>

                    <div className="flex items-center justify-between pb-3 border-b border-border/40">
                      <div>
                        <p className="text-sm font-semibold">AI Audit Suggestions</p>
                        <p className="text-xs text-muted-foreground">Alert when high-opportunity keyword schema tasks are prepared</p>
                      </div>
                      <Switch checked={notifSuggestion} onCheckedChange={setNotifSuggestion} />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-semibold">Weekly Summary Report</p>
                        <p className="text-xs text-muted-foreground">Deliver a full SEO/AEO index progress profile email</p>
                      </div>
                      <Switch checked={notifWeekly} onCheckedChange={setNotifWeekly} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* 5. AI Preferences */}
            {activeSection === "ai" && (
              <Card>
                <CardHeader>
                  <CardTitle>AI Preferences</CardTitle>
                  <CardDescription>Tweak LLM crawl analysis constraints and default style models</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <Label htmlFor="aiAgent">Default AI Auditor</Label>
                      <Select value={defaultAgent} onValueChange={setDefaultAgent}>
                        <SelectTrigger id="aiAgent">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="auditor">Website Auditor Agent</SelectItem>
                          <SelectItem value="seo">SEO Content Agent</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="aiStyle">Auditor Explanation Style</Label>
                      <Select value={responseStyle} onValueChange={setResponseStyle}>
                        <SelectTrigger id="aiStyle">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="detailed">Actionable & Detailed</SelectItem>
                          <SelectItem value="compact">Bullet Points only</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2">
                    <div className="flex justify-between text-xs font-semibold">
                      <span>Creativity Level (Temperature)</span>
                      <span>{creativityLevel}%</span>
                    </div>
                    <Progress value={creativityLevel} className="h-1.5" />
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-border/40">
                    <div>
                      <p className="text-sm font-semibold">Auto-generate suggestions</p>
                      <p className="text-xs text-muted-foreground">Generate task schemas immediately after completing index audits</p>
                    </div>
                    <Switch checked={autoSuggest} onCheckedChange={setAutoSuggest} />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* 6. Dashboard Preferences */}
            {activeSection === "dashboard" && (
              <Card>
                <CardHeader>
                  <CardTitle>Dashboard Layout Setup</CardTitle>
                  <CardDescription>Tweak default metrics panels and sizing constraints</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-border/40">
                      <div>
                        <p className="text-sm font-semibold">Default Dashboard</p>
                        <p className="text-xs text-muted-foreground">Choose landing interface route after onboarding completes</p>
                      </div>
                      <Select value={defaultDashboard} onValueChange={setDefaultDashboard}>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="overview">Audit Overview</SelectItem>
                          <SelectItem value="aeo">AEO Analytics</SelectItem>
                          <SelectItem value="seo">SEO Insights</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center justify-between pb-3 border-b border-border/40">
                      <div>
                        <p className="text-sm font-semibold">Compact Density Mode</p>
                        <p className="text-xs text-muted-foreground">Renders lists and grids with smaller padded layout spacing</p>
                      </div>
                      <Switch checked={compactMode} onCheckedChange={setCompactMode} />
                    </div>

                    <div className="flex items-center justify-between pb-3 border-b border-border/40">
                      <div>
                        <p className="text-sm font-semibold">Display Analytics Cards</p>
                        <p className="text-xs text-muted-foreground">Render top line statistics widgets on overall index</p>
                      </div>
                      <Switch checked={showCards} onCheckedChange={setShowCards} />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-semibold">Show Quick Action Widgets</p>
                        <p className="text-xs text-muted-foreground">Render right-hand sidebar shortcuts across analysis routes</p>
                      </div>
                      <Switch checked={enableQuickActions} onCheckedChange={setEnableQuickActions} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* 7. Security Panel */}
            {activeSection === "security" && (
              <Card>
                <CardHeader>
                  <CardTitle>Security & Logins</CardTitle>
                  <CardDescription>Manage active logins, change credentials, and activate 2FA</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-border/40">
                      <div>
                        <p className="text-sm font-semibold">Change Password</p>
                        <p className="text-xs text-muted-foreground">Secure your account with a unique token phrase</p>
                      </div>
                      <Button variant="outline" size="sm">Update Password</Button>
                    </div>

                    <div className="flex items-center justify-between pb-3 border-b border-border/40">
                      <div>
                        <p className="text-sm font-semibold">Two-Factor Authentication (2FA)</p>
                        <p className="text-xs text-muted-foreground">Require confirmation code via mobile authenticator apps</p>
                      </div>
                      <Badge variant="outline" className="border-rose-500/20 text-rose-500 bg-rose-500/5">Disabled</Badge>
                    </div>

                    <div className="space-y-2">
                      <p className="text-sm font-semibold">Active Login Log (Last 24 hours)</p>
                      <div className="text-xs border rounded-lg p-3 bg-muted/30 space-y-1">
                        <div className="flex justify-between font-semibold">
                          <span>Chrome (Windows) — Portland, USA</span>
                          <span className="text-emerald-500">Current Session</span>
                        </div>
                        <p className="text-muted-foreground">IP: 192.168.1.92 — June 30, 2026 at 23:46</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* 8. Integrations */}
            {activeSection === "integrations" && (
              <Card>
                <CardHeader>
                  <CardTitle>Connected Integrations</CardTitle>
                  <CardDescription>Integrate your domains with search indexes and repositories</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    {[
                      { name: "Google Analytics", desc: "Sync custom user paths", status: "Connected", variant: "emerald" },
                      { name: "Google Search Console", desc: "Sync indexed keyword impressions", status: "Connected", variant: "emerald" },
                      { name: "GitHub Repository", desc: "Trigger audit code actions", status: "Not Connected", variant: "muted" },
                      { name: "Slack Notifications", desc: "Dispatch warning messages", status: "Not Connected", variant: "muted" },
                    ].map((integ, idx) => (
                      <div key={idx} className="border border-border/50 rounded-xl p-4 bg-background/50 flex flex-col justify-between h-32 hover:border-primary/20 transition-all">
                        <div>
                          <p className="text-sm font-semibold">{integ.name}</p>
                          <p className="text-xs text-muted-foreground mt-1">{integ.desc}</p>
                        </div>
                        <div className="flex items-center justify-between pt-2">
                          <Badge 
                            variant="secondary" 
                            className={
                              integ.status === "Connected" 
                                ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400" 
                                : "bg-muted text-muted-foreground"
                            }
                          >
                            {integ.status}
                          </Badge>
                          <Button variant="ghost" size="sm" className="h-7 text-xs font-semibold">
                            {integ.status === "Connected" ? "Disconnect" : "Connect"}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* 9. API Keys */}
            {activeSection === "api" && (
              <Card>
                <CardHeader>
                  <CardTitle>API Access Credentials</CardTitle>
                  <CardDescription>Manage credentials to interface with Aeolyzer programmatically</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="apiKey">Secret Token Key</Label>
                    <div className="flex items-center gap-2">
                      <div className="relative flex-1">
                        <Input
                          id="apiKey"
                          type={apiKeyVisible ? "text" : "password"}
                          value={mockApiKey}
                          readOnly
                          className="font-mono text-xs pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setApiKeyVisible(!apiKeyVisible)}
                          className="absolute right-3 top-2.5 text-muted-foreground hover:text-foreground"
                        >
                          {apiKeyVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                      <Button variant="outline" onClick={handleCopyKey}>
                        {copiedKey ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t border-border/40">
                    <Button variant="outline" size="sm" onClick={() => toast.success("Created new temporary API token key")}>Regenerate Secret Key</Button>
                    <Button variant="ghost" size="sm" className="text-rose-500 hover:text-rose-600 hover:bg-rose-500/5">Revoke All Access</Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* 10. Data Management */}
            {activeSection === "data" && (
              <Card>
                <CardHeader>
                  <CardTitle>Data Management</CardTitle>
                  <CardDescription>Export configuration details, backup credentials and view software metadata</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-3">
                    <Button variant="outline" className="flex flex-col h-20 items-center justify-center gap-1.5" onClick={() => toast.success("Configuration exported successfully")}>
                      <Database className="h-5 w-5 text-muted-foreground" />
                      <span className="text-xs">Export Profile Setup</span>
                    </Button>

                    <Button variant="outline" className="flex flex-col h-20 items-center justify-center gap-1.5" onClick={() => toast.success("Configuration imported")}>
                      <RefreshCw className="h-5 w-5 text-muted-foreground" />
                      <span className="text-xs">Import Backup JSON</span>
                    </Button>

                    <Button variant="outline" className="flex flex-col h-20 items-center justify-center gap-1.5" onClick={() => toast.success("CSV report prepared for download")}>
                      <Download className="h-5 w-5 text-muted-foreground" />
                      <span className="text-xs">Download CSV Recaps</span>
                    </Button>
                  </div>

                  <div className="border-t border-border/40 pt-4 space-y-2 text-xs">
                    <p className="font-semibold text-sm">About Aeolyzer</p>
                    <div className="grid grid-cols-2 gap-2 text-muted-foreground p-3 rounded-lg border bg-muted/20">
                      <div>Application version:</div>
                      <div className="font-mono text-right text-foreground">v2.12.0</div>
                      <div>Build tag:</div>
                      <div className="font-mono text-right text-foreground">build-f3a8b21</div>
                      <div>Crawl engine:</div>
                      <div className="font-mono text-right text-foreground">AEO-Schema-v2</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

          </div>
        </div>
      )}

      {/* Onboarding reset confirmation dialog */}
      <Dialog open={resetDialogOpen} onOpenChange={setResetDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reset Onboarding Progress?</DialogTitle>
            <DialogDescription>
              This action will reset your current onboard completion token, forcing you to go through the getting-started wizard setup upon landing back on the dashboard directory.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setResetDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleResetOnboarding}>Confirm & Reset</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

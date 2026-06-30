"use client"

import React from "react"
import { LucideIcon, Play, Plus, Search, RefreshCw, Layers } from "lucide-react"
import { cn } from "@/lib/utils"

interface PlaceholderViewProps {
  title: string
  subtitle?: string
  category: string
  icon: LucideIcon
  type?: "dashboard" | "list" | "form"
}

export function PlaceholderView({ 
  title, 
  subtitle = "This section is currently under development in Phase 1.", 
  category, 
  icon: Icon,
  type = "dashboard" 
}: PlaceholderViewProps) {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 select-none animate-fade-in-up text-[#ececec]">
      {/* Header section with breadcrumbs */}
      <div className="space-y-1">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-[#6b6b66] tracking-wider uppercase">
          <span>Website Auditor AI</span>
          <span>/</span>
          <span>{category}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
              <Icon size={24} className="text-[#e07b53]" strokeWidth={2} />
              <span>{title}</span>
            </h1>
            <p className="text-xs text-[#a3a29e]">{subtitle}</p>
          </div>
          
          {/* Header Action Button Placeholder */}
          <div className="flex items-center gap-2">
            <span className="text-[10px] px-2.5 py-1 rounded-full font-semibold border border-[#e07b53]/20 bg-[#e07b53]/5 text-[#e07b53] tracking-wide">
              Phase 1 Placeholder
            </span>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-[#393836] hover:bg-[#252422] transition-colors border border-[#4a4945] text-[#ececec]">
              <RefreshCw size={12} className="animate-spin-slow text-[#6b6b66]" />
              <span>Sync Status</span>
            </button>
          </div>
        </div>
      </div>

      {/* Visual Skeletons */}
      {type === "dashboard" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Stat Cards Skeletons */}
          {[1, 2, 3].map((card) => (
            <div 
              key={card}
              className="p-5 rounded-xl border border-[#3a3936] bg-[#393836]/40 flex flex-col justify-between h-32"
            >
              <div className="flex justify-between items-start">
                <div className="w-1/2 h-3.5 bg-[#4a4945] rounded animate-pulse" />
                <div className="w-5 h-5 rounded bg-[#4a4945]/40 animate-pulse" />
              </div>
              <div className="space-y-2">
                <div className="w-1/3 h-7 bg-[#4a4945] rounded animate-pulse" />
                <div className="w-3/4 h-2.5 bg-[#4a4945]/60 rounded animate-pulse" />
              </div>
            </div>
          ))}

          {/* Large Content Block Skeletons */}
          <div className="col-span-1 md:col-span-2 p-6 rounded-xl border border-[#3a3936] bg-[#393836]/30 h-80 space-y-4">
            <div className="flex items-center justify-between border-b border-[#3a3936] pb-3">
              <div className="w-1/4 h-4 bg-[#4a4945] rounded" />
              <div className="w-12 h-6 bg-[#4a4945]/50 rounded-lg" />
            </div>
            <div className="space-y-3 pt-2">
              <div className="w-full h-8 bg-[#4a4945]/30 rounded-lg animate-pulse" />
              <div className="w-full h-8 bg-[#4a4945]/30 rounded-lg animate-pulse" />
              <div className="w-full h-8 bg-[#4a4945]/30 rounded-lg animate-pulse" />
              <div className="w-full h-8 bg-[#4a4945]/30 rounded-lg animate-pulse" />
            </div>
          </div>

          <div className="p-6 rounded-xl border border-[#3a3936] bg-[#393836]/30 h-80 flex flex-col justify-between">
            <div className="border-b border-[#3a3936] pb-3">
              <div className="w-1/2 h-4 bg-[#4a4945] rounded" />
            </div>
            <div className="flex-1 flex flex-col items-center justify-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-[#4a4945]/30 flex items-center justify-center text-[#6b6b66]">
                <Layers size={24} />
              </div>
              <div className="w-2/3 h-3.5 bg-[#4a4945] rounded mx-auto" />
              <div className="w-1/2 h-2.5 bg-[#4a4945]/60 rounded mx-auto" />
            </div>
            <button className="w-full py-2 bg-[#4a4945]/40 hover:bg-[#4a4945]/60 border border-[#4a4945] rounded-lg text-xs font-semibold text-[#a3a29e] transition-colors">
              Configure Widget
            </button>
          </div>
        </div>
      )}

      {type === "list" && (
        <div className="p-6 rounded-xl border border-[#3a3936] bg-[#393836]/30 space-y-6">
          {/* Mock filters bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-[#3a3936] pb-4">
            <div className="relative flex items-center w-full sm:max-w-xs">
              <Search size={14} className="absolute left-3 text-[#6b6b66]" />
              <div className="w-full pl-8 pr-4 py-2 rounded-lg bg-[#393836]/50 border border-[#4a4945] h-8" />
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <div className="w-16 h-8 bg-[#393836]/50 border border-[#4a4945] rounded-lg" />
              <div className="w-20 h-8 bg-[#393836]/50 border border-[#4a4945] rounded-lg" />
              <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#e07b53]/10 text-[#e07b53] border border-[#e07b53]/20">
                <Plus size={14} />
                <span>Create New</span>
              </button>
            </div>
          </div>

          {/* List items skeletons */}
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((row) => (
              <div 
                key={row}
                className="flex items-center justify-between p-3 rounded-lg border border-[#3a3936]/40 hover:border-[#3a3936] bg-[#393836]/10 hover:bg-[#393836]/20 transition-all"
              >
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-8 h-8 rounded-lg bg-[#4a4945]/40 animate-pulse flex-shrink-0" />
                  <div className="space-y-2 flex-1">
                    <div className="w-1/4 h-3.5 bg-[#4a4945] rounded" />
                    <div className="w-1/2 h-2.5 bg-[#4a4945]/60 rounded" />
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="w-16 h-5 bg-[#4a4945]/30 rounded-full" />
                  <div className="w-24 h-2 bg-[#4a4945]/50 rounded" />
                  <div className="w-8 h-8 rounded bg-[#4a4945]/20" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {type === "form" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-xl border border-[#3a3936] bg-[#393836]/30 md:col-span-2 space-y-6">
            <h2 className="text-base font-semibold border-b border-[#3a3936] pb-3">Form Details</h2>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="w-1/3 h-3 bg-[#4a4945] rounded" />
                  <div className="w-full h-9 bg-[#393836]/60 border border-[#4a4945] rounded-lg" />
                </div>
                <div className="space-y-2">
                  <div className="w-1/4 h-3 bg-[#4a4945] rounded" />
                  <div className="w-full h-9 bg-[#393836]/60 border border-[#4a4945] rounded-lg" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="w-1/5 h-3 bg-[#4a4945] rounded" />
                <div className="w-full h-24 bg-[#393836]/60 border border-[#4a4945] rounded-lg" />
              </div>
              <div className="space-y-2">
                <div className="w-1/4 h-3 bg-[#4a4945] rounded" />
                <div className="w-full h-9 bg-[#393836]/60 border border-[#4a4945] rounded-lg" />
              </div>
            </div>
            
            <div className="flex justify-end gap-2 border-t border-[#3a3936] pt-4">
              <button className="px-4 py-2 rounded-lg text-xs font-semibold bg-[#393836] border border-[#4a4945]">Cancel</button>
              <button className="px-4 py-2 rounded-lg text-xs font-semibold bg-[#e07b53] text-[#2b2a27]">Save Changes</button>
            </div>
          </div>
          
          <div className="p-6 rounded-xl border border-[#3a3936] bg-[#393836]/30 h-fit space-y-4">
            <h2 className="text-base font-semibold border-b border-[#3a3936] pb-3">Instructions</h2>
            <div className="space-y-3">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#e07b53]/10 border border-[#e07b53]/20 flex items-center justify-center text-[10px] text-[#e07b53] font-bold flex-shrink-0 mt-0.5">
                    {step}
                  </div>
                  <div className="space-y-1.5 flex-1">
                    <div className="w-1/3 h-3 bg-[#4a4945] rounded" />
                    <div className="w-5/6 h-2 bg-[#4a4945]/60 rounded" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

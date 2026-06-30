"use client"

import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from "react"
import { useRouter } from "next/navigation"

export type Theme = "light" | "auto" | "dark"

export interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  isStreaming?: boolean
}

// Sample responses for demo (copied from original app/page.tsx)
const sampleResponses = [
  `Here's a honest look at where I genuinely shine:

**Writing & Communication**

I'm strong at adapting tone and style — whether that's a formal business report, a casual blog post, a persuasive essay, or creative fiction. I can help draft, edit, restructure, and polish almost any kind of text.

**Reasoning & Analysis**

Breaking down complex problems, weighing pros and cons, spotting logical gaps, and thinking through multi-step scenarios are things I do well. Give me a messy situation and I'll help you find clarity.

**Code & Technical Work**

I can write, debug, and explain code across many languages. I'm particularly helpful for understanding concepts, reviewing logic, and working through implementation challenges.

**Research & Synthesis**

I'm good at meeting people where they are — breaking down difficult concepts for beginners or going deep for experts, adjusting as needed.

**Where I'm less reliable:** Very recent news (though I can search the web), tasks requiring physical actions, and highly specialized professional advice (legal, medical, financial) where you should always consult a qualified human.

What are you working on? I can give you a better sense of how I can help with your specific situation.`,
  `That's a great question! Let me break it down for you.

**The Core Concept**

At its heart, this is about understanding the fundamental principles and applying them consistently. Once you grasp the basics, everything else builds naturally.

**Key Points to Remember**

1. Start with the foundation — don't skip steps
2. Practice regularly to build muscle memory
3. Learn from mistakes — they're your best teachers
4. Connect concepts together to see the bigger picture

**Practical Application**

The best way to truly understand something is to apply it in real-world scenarios. Theory is important, but hands-on experience is invaluable.

Would you like me to elaborate on any specific aspect?`,
  `I'd be happy to help you with that! Here's my approach:

**Understanding the Problem**

First, let's make sure we're solving the right problem. Often, the initial question is just the surface of a deeper challenge.

**Step-by-Step Solution**

I'll walk you through this methodically:

1. Identify the core requirements
2. Break down the complexity into manageable pieces
3. Address each piece systematically
4. Validate the solution against your original goals

**Important Considerations**

Keep in mind that context matters significantly here. What works in one situation may need adjustment in another.

Is there anything specific you'd like me to focus on?`
]

export const themeColors = {
  dark: {
    background: "#2b2a27",
    card: "#393836",
    border: "#4a4945",
    text: "#ececec",
    textMuted: "#a3a29e",
  },
  light: {
    background: "#ffffff",
    card: "#f7f7f7",
    border: "#e5e5e5",
    text: "#1a1a1a",
    textMuted: "#6b7280",
  },
  auto: {
    background: "#2b2a27",
    card: "#393836",
    border: "#4a4945",
    text: "#ececec",
    textMuted: "#a3a29e",
  }
}

interface DashboardContextType {
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
  settingsOpen: boolean
  setSettingsOpen: (open: boolean) => void
  theme: Theme
  setTheme: (theme: Theme) => void
  onboarded: boolean
  setOnboarded: (onboarded: boolean) => void
  messages: Message[]
  isGenerating: boolean
  chatTitle: string | undefined
  handleNewChat: () => void
  handleSendMessage: (content: string) => Promise<void>
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined)

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [theme, setTheme] = useState<Theme>("dark")
  const [messages, setMessages] = useState<Message[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [onboarded, setOnboardedState] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [chatTitle, setChatTitle] = useState<string | undefined>()

  useEffect(() => {
    const saved = localStorage.getItem("auditor_onboarded")
    if (saved === "true") {
      // TEMPORARY: Commented out to force onboarding screens to show for testing/development
      // setOnboardedState(true)
    }
    setMounted(true)
  }, [])

  const setOnboarded = (value: boolean) => {
    setOnboardedState(value)
    localStorage.setItem("auditor_onboarded", value ? "true" : "false")
  }

  const router = useRouter()
  const chatSessionRef = useRef(0)

  // Apply theme to body background
  useEffect(() => {
    const colors = themeColors[theme]
    document.body.style.backgroundColor = colors.background
  }, [theme])

  const handleNewChat = useCallback(() => {
    chatSessionRef.current += 1
    setMessages([])
    setChatTitle(undefined)
    setIsGenerating(false)
    router.push("/agent")
  }, [router])

  const handleSendMessage = useCallback(async (content: string) => {
    const currentSession = chatSessionRef.current

    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content,
    }
    
    setMessages(prev => [...prev, userMessage])
    setIsGenerating(true)

    // Set chat title from first message
    if (!chatTitle) {
      const title = content.length > 30 ? content.slice(0, 30) + "..." : content
      setChatTitle(title)
    }

    // Simulate thinking delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Abort if user started a new chat during the delay
    if (chatSessionRef.current !== currentSession) return

    // Select a random response
    const responseContent = sampleResponses[Math.floor(Math.random() * sampleResponses.length)]

    // Add assistant message with streaming
    const assistantMessage: Message = {
      id: `assistant-${Date.now()}`,
      role: "assistant",
      content: responseContent,
      isStreaming: true,
    }

    setMessages(prev => {
      if (chatSessionRef.current !== currentSession) return prev
      return [...prev, assistantMessage]
    })

    // Calculate approximate streaming time based on content length
    const streamingTime = Math.min(responseContent.length * 15, 5000)
    
    // After streaming is done, update the message to not be streaming
    setTimeout(() => {
      if (chatSessionRef.current !== currentSession) return
      setMessages(prev => 
        prev.map(msg => 
          msg.id === assistantMessage.id 
            ? { ...msg, isStreaming: false }
            : msg
        )
      )
      setIsGenerating(false)
    }, streamingTime)
  }, [chatTitle])

  return (
    <DashboardContext.Provider
      value={{
        sidebarOpen,
        setSidebarOpen,
        settingsOpen,
        setSettingsOpen,
        theme,
        setTheme,
        messages,
        isGenerating,
        chatTitle,
        handleNewChat,
        handleSendMessage,
        onboarded: mounted ? onboarded : false,
        setOnboarded
      }}
    >
      {children}
    </DashboardContext.Provider>
  )
}

export function useDashboard() {
  const context = useContext(DashboardContext)
  if (!context) {
    throw new Error("useDashboard must be used within a DashboardProvider")
  }
  return context
}

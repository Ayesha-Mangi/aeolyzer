"use client"

import { useState, useEffect, useCallback } from "react"
import {
  Copy,
  ThumbsUp,
  ThumbsDown,
  RotateCcw,
  Check,
  StopCircle,
  Volume2,
  Share2,
} from "lucide-react"
import { AeolyzerLogoAnimated } from "./aeolyzer-logo"
import { cn } from "@/lib/utils"

// ─── Types ───────────────────────────────────────────────────────────────────

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  isStreaming?: boolean
}

interface AeolyzerMessageProps {
  message: Message
  onRegenerate?: () => void
  onStop?: () => void
  isGenerating?: boolean
}

// ─── User Message ─────────────────────────────────────────────────────────────

function UserMessage({ content }: { content: string }) {
  return (
    <div className="flex justify-end mb-8 animate-fade-in-up" role="log" aria-label="Your message">
      <div className="max-w-[75%] group relative">
        <div
          className="px-5 py-3.5 rounded-2xl rounded-tr-sm shadow-sm"
          style={{ backgroundColor: "#393836" }}
        >
          <p
            className="text-[15px] leading-relaxed whitespace-pre-wrap"
            style={{ color: "#ececec" }}
          >
            {content}
          </p>
        </div>
        {/* User message actions on hover */}
        <div className="absolute -bottom-6 right-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
          <button
            className="p-1 rounded-md transition-colors hover:bg-[#252422]"
            style={{ color: "#6b6b66" }}
            title="Copy message"
            aria-label="Copy message"
            onClick={() => navigator.clipboard?.writeText(content)}
          >
            <Copy size={12} />
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── AI Message ───────────────────────────────────────────────────────────────

function AssistantMessage({
  message,
  onRegenerate,
  onStop,
  isGenerating,
}: {
  message: Message
  onRegenerate?: () => void
  onStop?: () => void
  isGenerating?: boolean
}) {
  const [displayedContent, setDisplayedContent] = useState("")
  const [isComplete, setIsComplete] = useState(false)
  const [copied, setCopied] = useState(false)
  const [feedback, setFeedback] = useState<"up" | "down" | null>(null)

  useEffect(() => {
    if (message.role === "assistant" && message.isStreaming) {
      setDisplayedContent("")
      setIsComplete(false)
      let currentIndex = 0
      const content = message.content

      const interval = setInterval(() => {
        if (currentIndex < content.length) {
          const chunkSize = Math.floor(Math.random() * 3) + 1
          const nextChunk = content.slice(currentIndex, currentIndex + chunkSize)
          setDisplayedContent((prev) => prev + nextChunk)
          currentIndex += chunkSize
        } else {
          clearInterval(interval)
          setIsComplete(true)
        }
      }, 15)

      return () => clearInterval(interval)
    } else {
      setDisplayedContent(message.content)
      setIsComplete(true)
    }
  }, [message.content, message.isStreaming, message.role])

  const handleCopy = useCallback(() => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(displayedContent)
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [displayedContent])

  const handleFeedback = (type: "up" | "down") => {
    setFeedback((prev) => (prev === type ? null : type))
  }

  return (
    <div className="mb-8 animate-fade-in-up group" role="log" aria-label="AI response">
      {/* Thinking / streaming start indicator */}
      {message.isStreaming && displayedContent.length === 0 && (
        <div className="flex items-center gap-3 mb-4">
          <AeolyzerLogoAnimated size={26} />
          <div className="flex items-center gap-2">
            <span className="text-sm" style={{ color: "#a3a29e" }}>
              Thinking
            </span>
            <span className="flex gap-1">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-[#a3a29e] animate-pulse-dot"
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              ))}
            </span>
          </div>
        </div>
      )}

      {/* Message content */}
      {displayedContent.length > 0 && (
        <div className="flex gap-3">
          {/* AI Avatar */}
          <div className="w-7 h-7 flex-shrink-0 mt-0.5">
            <AeolyzerLogoAnimated size={28} />
          </div>

          <div className="flex-1 min-w-0">
            {/* Message bubble */}
            <div className="max-w-none">
              <div className="prose prose-invert max-w-none text-[#ececec]">
                {renderFormattedContent(displayedContent)}
              </div>

              {/* Typing cursor */}
              {message.isStreaming && !isComplete && (
                <span className="inline-block w-[3px] h-[18px] ml-0.5 bg-[#e07b53] animate-pulse rounded-full" />
              )}
            </div>

            {/* Stop generation button (while streaming) */}
            {message.isStreaming && !isComplete && (
              <button
                onClick={onStop}
                className="mt-3 flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium border border-[#3a3936] text-[#a3a29e] hover:bg-[#252422] hover:text-[#ececec] hover:border-[#4a4945] transition-all"
                aria-label="Stop generation"
              >
                <StopCircle size={13} className="text-[#e07b53]" />
                Stop generating
              </button>
            )}

            {/* Action bar — shown after complete */}
            {isComplete && displayedContent.length > 0 && (
              <div className="flex items-center gap-0.5 mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                {/* Copy */}
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs transition-all hover:bg-[#252422]"
                  style={{ color: copied ? "#10b981" : "#6b6b66" }}
                  title="Copy response"
                  aria-label="Copy response"
                >
                  {copied ? <Check size={13} /> : <Copy size={13} />}
                  <span className="hidden sm:inline">{copied ? "Copied" : "Copy"}</span>
                </button>

                {/* Thumbs Up */}
                <button
                  onClick={() => handleFeedback("up")}
                  className="flex items-center gap-1 px-2 py-1.5 rounded-lg text-xs transition-all hover:bg-[#252422]"
                  style={{ color: feedback === "up" ? "#10b981" : "#6b6b66" }}
                  title="Good response"
                  aria-label="Mark as good response"
                  aria-pressed={feedback === "up"}
                >
                  <ThumbsUp size={13} />
                </button>

                {/* Thumbs Down */}
                <button
                  onClick={() => handleFeedback("down")}
                  className="flex items-center gap-1 px-2 py-1.5 rounded-lg text-xs transition-all hover:bg-[#252422]"
                  style={{ color: feedback === "down" ? "#ef4444" : "#6b6b66" }}
                  title="Bad response"
                  aria-label="Mark as bad response"
                  aria-pressed={feedback === "down"}
                >
                  <ThumbsDown size={13} />
                </button>

                {/* Regenerate */}
                <button
                  onClick={onRegenerate}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs transition-all hover:bg-[#252422]"
                  style={{ color: "#6b6b66" }}
                  title="Regenerate response"
                  aria-label="Regenerate response"
                >
                  <RotateCcw size={13} />
                  <span className="hidden sm:inline">Regenerate</span>
                </button>

                {/* Read aloud (mock) */}
                <button
                  className="flex items-center gap-1 px-2 py-1.5 rounded-lg text-xs transition-all hover:bg-[#252422]"
                  style={{ color: "#6b6b66" }}
                  title="Read aloud"
                  aria-label="Read aloud"
                >
                  <Volume2 size={13} />
                </button>

                {/* Share (mock) */}
                <button
                  className="flex items-center gap-1 px-2 py-1.5 rounded-lg text-xs transition-all hover:bg-[#252422]"
                  style={{ color: "#6b6b66" }}
                  title="Share response"
                  aria-label="Share response"
                >
                  <Share2 size={13} />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Main Export ─────────────────────────────────────────────────────────────

export function AeolyzerMessage({
  message,
  onRegenerate,
  onStop,
  isGenerating,
}: AeolyzerMessageProps) {
  if (message.role === "user") {
    return <UserMessage content={message.content} />
  }
  return (
    <AssistantMessage
      message={message}
      onRegenerate={onRegenerate}
      onStop={onStop}
      isGenerating={isGenerating}
    />
  )
}

// ─── Thinking Indicator ───────────────────────────────────────────────────────

export function AeolyzerThinkingIndicator() {
  return (
    <div className="flex items-start gap-3 mb-6 animate-fade-in-up">
      <div className="w-7 h-7 flex-shrink-0 mt-0.5">
        <AeolyzerLogoAnimated size={28} />
      </div>
      <div className="flex items-center gap-2 pt-1.5">
        <span className="text-sm" style={{ color: "#a3a29e" }}>
          Thinking
        </span>
        <span className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-[#a3a29e] animate-pulse-dot"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </span>
      </div>
    </div>
  )
}

// ─── Formatter ───────────────────────────────────────────────────────────────

function renderFormattedContent(content: string) {
  const paragraphs = content.split(/\n\n/)

  return paragraphs.map((paragraph, pIndex) => {
    // Code blocks
    if (paragraph.startsWith("```")) {
      const lines = paragraph.split("\n")
      const lang = lines[0].replace("```", "").trim()
      const code = lines.slice(1).join("\n").replace(/```$/, "").trim()
      return (
        <div
          key={pIndex}
          className="my-4 rounded-xl overflow-hidden border border-[#3a3936]"
        >
          {lang && (
            <div className="flex items-center justify-between px-4 py-2 border-b border-[#3a3936]" style={{ backgroundColor: "#252422" }}>
              <span className="text-[10px] font-mono font-semibold text-[#6b6b66] uppercase tracking-wider">{lang}</span>
            </div>
          )}
          <pre
            className="px-4 py-3 text-sm font-mono text-[#ececec] overflow-x-auto"
            style={{ backgroundColor: "#1e1d1a" }}
          >
            <code>{code}</code>
          </pre>
        </div>
      )
    }

    // Bullet lists
    if (paragraph.includes("\n-") || paragraph.startsWith("- ")) {
      const items = paragraph.split("\n").filter((l) => l.trim())
      return (
        <ul key={pIndex} className="my-3 space-y-1.5 list-none">
          {items.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-[15px] leading-relaxed" style={{ color: "#ececec" }}>
              <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#e07b53] flex-shrink-0" />
              <span>{item.replace(/^[-*]\s*/, "").split("**").map((part, j) =>
                j % 2 === 1 ? <strong key={j} className="font-semibold text-[#ececec]">{part}</strong> : part
              )}</span>
            </li>
          ))}
        </ul>
      )
    }

    // Numbered lists
    if (/^\d+\.\s/.test(paragraph)) {
      const items = paragraph.split("\n").filter((l) => l.trim())
      return (
        <ol key={pIndex} className="my-3 space-y-1.5 list-none counter-reset-list">
          {items.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-[15px] leading-relaxed" style={{ color: "#ececec" }}>
              <span
                className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold mt-0.5"
                style={{ backgroundColor: "#e07b5320", color: "#e07b53" }}
              >
                {i + 1}
              </span>
              <span>{item.replace(/^\d+\.\s*/, "").split("**").map((part, j) =>
                j % 2 === 1 ? <strong key={j} className="font-semibold">{part}</strong> : part
              )}</span>
            </li>
          ))}
        </ol>
      )
    }

    // Section headers (** wrapped)
    if (paragraph.startsWith("**") && paragraph.endsWith("**")) {
      const headerText = paragraph.slice(2, -2)
      return (
        <h3
          key={pIndex}
          className="text-base font-semibold mt-6 mb-2 first:mt-0"
          style={{ color: "#ececec" }}
        >
          {headerText}
        </h3>
      )
    }

    // Mixed bold + text
    if (paragraph.includes("**") && paragraph.includes(":")) {
      const parts = paragraph.split("**")
      return (
        <div key={pIndex} className="mt-4 first:mt-0">
          {parts.map((part, i) => {
            if (i % 2 === 1) {
              return (
                <h4
                  key={i}
                  className="text-[15px] font-semibold mb-1.5"
                  style={{ color: "#ececec" }}
                >
                  {part}
                </h4>
              )
            }
            return part ? (
              <p
                key={i}
                className="text-[15px] leading-relaxed mb-3 last:mb-0"
                style={{ color: "#d4d4d4" }}
              >
                {part}
              </p>
            ) : null
          })}
        </div>
      )
    }

    // Regular paragraph with inline bold
    const formattedParagraph = paragraph.split("**").map((part, i) => {
      if (i % 2 === 1) {
        return (
          <strong key={i} className="font-semibold" style={{ color: "#ececec" }}>
            {part}
          </strong>
        )
      }
      return part
    })

    return (
      <p
        key={pIndex}
        className="text-[15px] leading-relaxed mb-3 last:mb-0"
        style={{ color: "#d4d4d4" }}
      >
        {formattedParagraph}
      </p>
    )
  })
}

"use client"

import { AeolyzerChatArea } from "@/components/aeolyzer-chat-area"
import { AeolyzerChatInput } from "@/components/aeolyzer-chat-input"
import { useDashboard, themeColors } from "@/lib/context/dashboard-context"

export default function AgentPage() {
  const { 
    messages, 
    isGenerating, 
    chatTitle, 
    handleSendMessage, 
    theme 
  } = useDashboard()

  const colors = themeColors[theme]

  return (
    <div 
      className="flex-1 flex flex-col min-w-0 min-h-0 h-full relative"
      style={{ backgroundColor: colors.background }}
    >
      {/* Chat area or welcome screen */}
      <div className="flex-1 flex flex-col min-h-0">
        <AeolyzerChatArea 
          messages={messages} 
          isGenerating={isGenerating}
          chatTitle={chatTitle}
          onSend={handleSendMessage}
        />
      </div>

      {/* Input area - only shown when there are messages */}
      {messages.length > 0 && (
        <div 
          className="flex-shrink-0 px-6 pb-6 pt-2"
          style={{ backgroundColor: colors.background }}
        >
          <AeolyzerChatInput 
            onSend={handleSendMessage}
            isGenerating={isGenerating}
            placeholder="Reply to Website Auditor AI..."
          />
        </div>
      )}
    </div>
  )
}

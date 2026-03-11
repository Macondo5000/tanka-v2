import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { SPRING, AI_PANEL_WIDTH } from '@/lib/constants';
import { useChatStore } from '@/store/chat-store';
import { MessageBubble } from '@/components/shared/message-bubble';
import type { ChatMessage } from '@/types/chat';

const AI_RESPONSES = [
  'I can help you with that! Let me check the context and get back to you.',
  'Based on the conversation, I suggest we schedule a follow-up meeting with the team.',
  'I\'ve analyzed the data and here are my recommendations for the next steps.',
  'That\'s a great point. I\'ll draft a summary and share it with the relevant stakeholders.',
  'Let me look into that and provide you with a detailed analysis shortly.',
];

export function AiChatPanel() {
  const { aiPanelOpen, toggleAiPanel, aiMessages, addAiMessage } = useChatStore();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [inputValue, setInputValue] = useState('');
  const [inputFocused, setInputFocused] = useState(false);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [aiMessages]);

  const handleSend = () => {
    const content = inputValue.trim();
    if (!content) return;

    const userMsg: ChatMessage = {
      id: `ai-user-${Date.now()}`,
      channelId: 'ai',
      role: 'user',
      type: 'text',
      content,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    addAiMessage(userMsg);
    setInputValue('');

    // Simulate AI response
    setTimeout(() => {
      const aiMsg: ChatMessage = {
        id: `ai-resp-${Date.now()}`,
        channelId: 'ai',
        role: 'assistant',
        type: 'text',
        content: AI_RESPONSES[Math.floor(Math.random() * AI_RESPONSES.length)],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      addAiMessage(aiMsg);
    }, 800);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <AnimatePresence>
      {aiPanelOpen && (
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: AI_PANEL_WIDTH, opacity: 1 }}
          exit={{ width: 0, opacity: 0 }}
          transition={SPRING}
          className="h-full rounded-[10px] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.08)] overflow-hidden shrink-0 flex flex-col"
        >
          <div className="flex flex-col h-full" style={{ width: AI_PANEL_WIDTH }}>
            {/* Header */}
            <div className="px-4 h-[60px] flex items-center justify-between shrink-0 border-b border-gray-100">
              <div className="flex items-center gap-2.5">
                <img src="/ai-assistant.png" alt="AI" className="w-6 h-6 rounded-full object-cover" />
                <h3 className="text-[18px] font-medium tracking-tight" style={{ fontFamily: "'Roboto Serif', Georgia, serif" }}>AI Assistant</h3>
              </div>
              <button
                onClick={toggleAiPanel}
                className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <X className="w-4 h-4 text-black" />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto py-4 no-scrollbar">
              <div className="px-4 space-y-4">
                {aiMessages.map((msg) => (
                  <MessageBubble
                    key={msg.id}
                    role={msg.role === 'assistant' ? 'assistant' : 'user'}
                    content={msg.content}
                    timestamp={msg.timestamp}
                  />
                ))}
              </div>
            </div>

            {/* Input */}
            <div className="shrink-0 px-3 pb-4 pt-1">
              <div
                className={`relative rounded-2xl p-px bg-gradient-to-r from-violet-400 via-blue-400 to-emerald-400 transition-all ${
                  inputFocused ? 'ring-4 ring-violet-500/[0.06]' : ''
                }`}
              >
              <div className="relative rounded-[15px] bg-white">
                <textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onFocus={() => setInputFocused(true)}
                  onBlur={() => setInputFocused(false)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask AI..."
                  rows={1}
                  className="w-full resize-none bg-transparent px-5 pt-4 pb-14 text-[14px] text-black placeholder:text-gray-300 font-medium tracking-tight outline-none"
                  style={{ minHeight: 56, maxHeight: 160 }}
                  onInput={(e) => {
                    const t = e.currentTarget;
                    t.style.height = 'auto';
                    t.style.height = Math.min(t.scrollHeight, 160) + 'px';
                  }}
                />
                <div className="absolute bottom-0 inset-x-0 flex items-center justify-between px-4 py-3">
                  <div className="flex items-center gap-1">
                    {/* Add File */}
                    <button className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 12H19" stroke="#4B5563" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12 5V19" stroke="#4B5563" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                    {/* Deep Research */}
                    <button className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.9999 20C7.58166 20 3.99997 16.4183 3.99997 12C3.99997 7.58172 7.58166 4 11.9999 4C14.7912 4 17.2486 5.42958 18.6799 7.59652" stroke="#4B5563" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M11.9998 20C11.9998 20 8.66646 17.3333 8.66646 12C8.66646 6.66667 11.9998 4 11.9998 4C11.9998 4 14.1975 5.7193 14.7769 8.03697" stroke="#4B5563" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M4.45524 12.0005H10.8442" stroke="#4B5563" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M16.7466 18.2082C18.7699 18.2082 20.4102 16.5679 20.4102 14.5445C20.4102 12.5211 18.7699 10.8809 16.7466 10.8809C14.7232 10.8809 13.083 12.5211 13.083 14.5445C13.083 16.5679 14.7232 18.2082 16.7466 18.2082Z" stroke="#4B5563" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M19.2397 17.5977L20.9189 19.2768" stroke="#4B5563" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                  <button
                    onClick={handleSend}
                    disabled={!inputValue.trim()}
                    className={`flex items-center justify-center transition-all active:scale-95 ${
                      inputValue.trim()
                        ? 'text-[#4B5563] hover:text-[#374151]'
                        : 'text-gray-300'
                    }`}
                  >
                    <svg width="20" height="20" viewBox="0 0 19 19" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13.5825 0.396566L4.5525 3.39657C-1.5175 5.42657 -1.5175 8.73657 4.5525 10.7566L7.2325 11.6466L8.1225 14.3266C10.1425 20.3966 13.4625 20.3966 15.4825 14.3266L18.4925 5.30657C19.8325 1.25657 17.6325 -0.953434 13.5825 0.396566ZM13.9025 5.77657L10.1025 9.59657C9.9525 9.74657 9.7625 9.81657 9.5725 9.81657C9.3825 9.81657 9.1925 9.74657 9.0425 9.59657C8.90302 9.45543 8.8248 9.265 8.8248 9.06657C8.8248 8.86814 8.90302 8.6777 9.0425 8.53657L12.8425 4.71657C13.1325 4.42657 13.6125 4.42657 13.9025 4.71657C14.1925 5.00657 14.1925 5.48657 13.9025 5.77657Z" />
                    </svg>
                  </button>
                </div>
              </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

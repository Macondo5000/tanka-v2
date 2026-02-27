import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { useChatStore } from '@/store/chat-store';
import { MessageItem } from './message-item';
import { FloatingInput } from '@/components/shared/floating-input';
import { staggerDelay, EASE_SMOOTH } from '@/lib/constants';
import type { ChatMessage } from '@/types/chat';

const EMPTY_MESSAGES: ChatMessage[] = [];

interface MessageThreadProps {
  channelId: string;
}

export function MessageThread({ channelId }: MessageThreadProps) {
  const rawMessages = useChatStore((s) => s.messages[channelId]);
  const messages = rawMessages ?? EMPTY_MESSAGES;
  const confirmAction = useChatStore((s) => s.confirmAction);
  const addMessage = useChatStore((s) => s.addMessage);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = (content: string) => {
    addMessage(channelId, {
      id: `user-${Date.now()}`,
      channelId,
      role: 'user',
      type: 'text',
      content,
      sender: { id: 'me', name: 'You', avatar: 'https://i.pravatar.cc/40?u=me' },
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    });
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-white">
      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto py-6 no-scrollbar">
        <div className="max-w-[800px] mx-auto px-8 space-y-5">
          {messages.map((msg, idx) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...staggerDelay(idx), ease: EASE_SMOOTH }}
            >
              <MessageItem message={msg} onConfirmAction={confirmAction} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Input */}
      <FloatingInput onSend={handleSend} placeholder="Type a message..." />
    </div>
  );
}

import type { ChatMessage } from '@/types/chat';
import { MessageBubble } from '@/components/shared/message-bubble';
import { ActionCard } from '@/components/shared/action-card';

interface MessageItemProps {
  message: ChatMessage;
  onConfirmAction?: (channelId: string, messageId: string) => void;
}

export function MessageItem({ message, onConfirmAction }: MessageItemProps) {
  // For user messages, check if sender is "me" to determine alignment
  const isMe = message.sender?.id === 'me';
  const bubbleRole = message.role === 'assistant' ? 'assistant' : (isMe ? 'user' : 'peer');

  return (
    <div className={`w-full flex flex-col ${bubbleRole === 'user' ? 'items-end' : 'items-start'}`}>
      {/* Text content */}
      <MessageBubble
        role={bubbleRole}
        content={message.content}
        isProactive={message.isProactive}
        timestamp={message.timestamp}
        sender={message.sender}
      />

      {/* Embedded Action Card */}
      {message.type === 'action' && message.action && (
        <div className="mt-3 w-full max-w-[480px]">
          <ActionCard
            action={message.action}
            onConfirm={() => onConfirmAction?.(message.channelId, message.id)}
          />
        </div>
      )}
    </div>
  );
}

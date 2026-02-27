import type { User, ActionCardData } from './common';

export interface Channel {
  id: string;
  name: string;
  type: 'channel' | 'dm';
  description?: string;
  members: User[];
  unreadCount: number;
  lastMessage?: string;
  lastMessageTime?: string;
  sortTimestamp?: number;
  isMuted?: boolean;
  isAIChannel?: boolean;
  avatar?: string;
  icon?: string;
}

export interface ChatMessage {
  id: string;
  channelId: string;
  role: 'user' | 'assistant' | 'system';
  type: 'text' | 'action' | 'plan_summary' | 'divider';
  content: string;
  sender?: User;
  action?: ActionCardData;
  timestamp: string;
  isProactive?: boolean;
  isConfirmed?: boolean;
  replyCount?: number;
}

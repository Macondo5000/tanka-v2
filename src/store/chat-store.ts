import { create } from 'zustand';
import type { Channel, ChatMessage } from '@/types/chat';
import { CHANNELS } from '@/mock/channels';
import { CHANNEL_MESSAGES } from '@/mock/messages';

interface ChatState {
  channels: Channel[];
  activeChannelId: string | null;
  messages: Record<string, ChatMessage[]>;
  detailPanelOpen: boolean;
  aiPanelOpen: boolean;
  aiMessages: ChatMessage[];

  setActiveChannel: (id: string) => void;
  toggleDetailPanel: () => void;
  toggleAiPanel: () => void;
  confirmAction: (channelId: string, messageId: string) => void;
  addMessage: (channelId: string, message: ChatMessage) => void;
  addAiMessage: (message: ChatMessage) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  channels: CHANNELS,
  activeChannelId: null,
  messages: CHANNEL_MESSAGES,
  detailPanelOpen: false,
  aiPanelOpen: false,
  aiMessages: [
    {
      id: 'ai-welcome',
      channelId: 'ai',
      role: 'assistant',
      type: 'text',
      content: 'Hi! I\'m your AI assistant. How can I help you today?',
      timestamp: '',
    },
  ],

  setActiveChannel: (id) => set({ activeChannelId: id }),

  // Mutually exclusive panels
  toggleDetailPanel: () =>
    set((s) => ({
      detailPanelOpen: !s.detailPanelOpen,
      aiPanelOpen: !s.detailPanelOpen ? false : s.aiPanelOpen,
    })),

  toggleAiPanel: () =>
    set((s) => ({
      aiPanelOpen: !s.aiPanelOpen,
      detailPanelOpen: !s.aiPanelOpen ? false : s.detailPanelOpen,
    })),

  confirmAction: (channelId, messageId) =>
    set((state) => {
      const channelMessages = state.messages[channelId];
      if (!channelMessages) return state;

      const updated = channelMessages.map((m) =>
        m.id === messageId
          ? { ...m, isConfirmed: true, action: m.action ? { ...m.action, state: 'executed' as const } : undefined }
          : m
      );

      // Add AI follow-up
      const followUp: ChatMessage = {
        id: `follow-${Date.now()}`,
        channelId,
        role: 'assistant',
        type: 'text',
        content: '操作已完成。我会持续关注后续进展，下一步我们将进入下一阶段。',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      return {
        messages: { ...state.messages, [channelId]: [...updated, followUp] },
      };
    }),

  addMessage: (channelId, message) =>
    set((state) => ({
      messages: {
        ...state.messages,
        [channelId]: [...(state.messages[channelId] || []), message],
      },
    })),

  addAiMessage: (message) =>
    set((state) => ({
      aiMessages: [...state.aiMessages, message],
    })),
}));

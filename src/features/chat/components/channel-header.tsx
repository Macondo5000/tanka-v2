import { Sparkles, EllipsisVertical, Phone } from 'lucide-react';
import type { Channel } from '@/types/chat';
import { useChatStore } from '@/store/chat-store';
import { getAvatarColor, getAvatarLetter } from '@/lib/avatar';

interface ChannelHeaderProps {
  channel: Channel;
}

export function ChannelHeader({ channel }: ChannelHeaderProps) {
  const toggleDetailPanel = useChatStore((s) => s.toggleDetailPanel);
  const toggleAiPanel = useChatStore((s) => s.toggleAiPanel);

  // For DMs, find the other person (not "me")
  const dmPeer = channel.type === 'dm'
    ? channel.members.find((m) => m.id !== 'me')
    : null;

  return (
    <div className="h-[60px] px-5 flex items-center justify-between shrink-0 border-b border-gray-200">
      <div className="flex items-center gap-3">
        {channel.type === 'channel' ? (
          <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0">
            {channel.isAIChannel ? (
              <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-blue-500" />
              </div>
            ) : (
              <img src="/group.png" alt={channel.name} className="w-full h-full object-cover" />
            )}
          </div>
        ) : channel.avatar ? (
          <img src={channel.avatar} alt={channel.name} className="w-10 h-10 rounded-full object-cover ring-1 ring-black/5" />
        ) : (
          <div className="w-10 h-10 rounded-full flex items-center justify-center ring-1 ring-black/5" style={{ backgroundColor: getAvatarColor(channel.name) }}>
            <span className="text-[14px] font-bold text-black">
              {getAvatarLetter(channel.name)}
            </span>
          </div>
        )}
        <div className="flex items-center gap-2.5">
          <h3 className="text-[18px] font-bold tracking-tight">{channel.name}</h3>
          {channel.type === 'dm' ? (
            dmPeer?.isOnline ? (
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                <span className="text-[13px] text-emerald-600 font-medium">Online</span>
              </span>
            ) : (
              <span className="text-[13px] text-gray-400 font-medium">Offline</span>
            )
          ) : (
            <span className="text-[13px] text-gray-400 font-medium">{channel.members.length} members</span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-1">
        {/* Phone */}
        <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors text-black">
          <Phone className="w-4 h-4" />
        </button>
        {/* More (detail panel) */}
        <button
          onClick={toggleDetailPanel}
          className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors text-black"
        >
          <EllipsisVertical className="w-4 h-4" />
        </button>

        {/* AI Assistant */}
        <button
          onClick={toggleAiPanel}
          className="w-6 h-6 rounded-full overflow-hidden hover:opacity-90 transition-opacity"
        >
          <img src="/ai-assistant.png" alt="AI" className="w-full h-full object-cover" />
        </button>
      </div>
    </div>
  );
}

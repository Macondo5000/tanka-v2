import { Sparkles, EllipsisVertical, Phone } from 'lucide-react';
import type { Channel } from '@/types/chat';
import { useChatStore } from '@/store/chat-store';

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
    <div className="h-14 px-5 flex items-center justify-between shrink-0">
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
          <div className="w-10 h-10 rounded-full bg-[#e4e4e4] flex items-center justify-center ring-1 ring-black/5">
            <span className="text-[12px] font-bold text-[#888888]">
              {channel.name.split(' ').map(w => w[0]).join('').slice(0, 2)}
            </span>
          </div>
        )}
        <div>
          <h3 className="text-[18px] font-bold tracking-tight">{channel.name}</h3>
          {channel.type === 'dm' ? (
            <div className="flex items-center gap-1.5">
              {dmPeer?.isOnline ? (
                <>
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                  <span className="text-[13px] text-emerald-600 font-medium">Online</span>
                </>
              ) : (
                <span className="text-[13px] text-gray-400 font-medium">Offline</span>
              )}
            </div>
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

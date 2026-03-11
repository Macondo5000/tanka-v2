import { Plus, Sparkles, StickyNote, Users, BarChart3, Swords } from 'lucide-react';
import { useChatStore } from '@/store/chat-store';
import { useNavigate } from 'react-router';
import { SIDEBAR_WIDTH } from '@/lib/constants';
import { getAvatarColor, getAvatarLetter } from '@/lib/avatar';
import { SidebarTabs } from '@/components/shared/sidebar-tabs';

const CHAT_TOOLS = [
  { key: 'memo', label: 'Memo', icon: StickyNote },
  { key: 'members', label: 'Members', icon: Users },
  { key: 'vote', label: 'Vote', icon: BarChart3 },
  { key: 'arena', label: 'Arena', icon: Swords },
];

export function ChannelSidebar() {
  const { channels, activeChannelId } = useChatStore();
  const navigate = useNavigate();

  const sortedChannels = [...channels].sort(
    (a, b) => (b.sortTimestamp ?? 0) - (a.sortTimestamp ?? 0)
  );

  const handleSelect = (id: string) => {
    useChatStore.getState().setActiveChannel(id);
    navigate(`/chat/${id}`);
  };

  const handleToolClick = (key: string) => {
    if (key === 'members') navigate('/chat/members');
  };

  return (
      <div className="h-full bg-gradient-to-b from-[#F0F7FF] to-white flex flex-col shrink-0" style={{ width: SIDEBAR_WIDTH }}>
        {/* Module tabs */}
        <div className="px-3 pt-3 pb-1 shrink-0">
          <SidebarTabs />
        </div>

        {/* Tool entries */}
        <div className="px-2 py-2 shrink-0 space-y-0.5">
          {CHAT_TOOLS.map((tool) => {
            const Icon = tool.icon;
            return (
              <button
                key={tool.key}
                onClick={() => handleToolClick(tool.key)}
                className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-left text-gray-800 hover:bg-[#E8F0FA] transition-all"
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span className="text-[14px] font-medium">{tool.label}</span>
              </button>
            );
          })}
        </div>

        {/* Channel list — mixed sort by time */}
        <div className="flex-1 overflow-y-auto px-2 py-2 no-scrollbar">
          <div className="flex items-center justify-between px-2.5 mb-1">
            <span className="text-[11px] font-semibold uppercase tracking-widest text-gray-400">Channels</span>
            <button className="w-5 h-5 flex items-center justify-center rounded-[6px] bg-[#DDE9F6] transition-colors text-gray-500 hover:text-black hover:bg-[#CDDCEE]">
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="space-y-1.5">
            {sortedChannels.map((ch) => (
              <button
                key={ch.id}
                onClick={() => handleSelect(ch.id)}
                className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-left transition-all border ${
                  activeChannelId === ch.id ? 'bg-white border-[#D4E3F5] shadow-[0_1px_2px_rgba(0,0,0,0.04)] text-black' : 'border-transparent text-gray-800 hover:bg-[#E8F0FA]'
                }`}
              >
                {/* Icon: channel → hash, dm → avatar */}
                {ch.type === 'channel' ? (
                  <div className="w-10 h-10 rounded-xl shrink-0 overflow-hidden">
                    {ch.isAIChannel ? (
                      <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                        <Sparkles className="w-5 h-5 text-blue-500" />
                      </div>
                    ) : (
                      <img src="/group.png" alt={ch.name} className="w-full h-full object-cover" />
                    )}
                  </div>
                ) : (
                  <div className="relative shrink-0">
                    {ch.avatar ? (
                      <img src={ch.avatar} alt={ch.name} className="w-10 h-10 rounded-full object-cover ring-1 ring-black/5" />
                    ) : (
                      <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: getAvatarColor(ch.name) }}>
                        <span className="text-[14px] font-semibold text-black">
                          {getAvatarLetter(ch.name)}
                        </span>
                      </div>
                    )}
                    {ch.members.some((m) => m.isOnline && m.id !== 'me') && (
                      <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white" />
                    )}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className={`text-[14px] font-medium truncate ${activeChannelId === ch.id ? 'text-black' : ''}`}>
                      {ch.name}
                    </span>
                    {ch.lastMessageTime && (
                      <span className="text-[11px] text-gray-300 font-medium shrink-0">{ch.lastMessageTime}</span>
                    )}
                  </div>
                  <div className="flex items-center justify-between mt-0.5">
                    {ch.lastMessage ? (
                      <p className="text-[12px] text-gray-400 truncate">{ch.lastMessage}</p>
                    ) : (
                      <span />
                    )}
                    {ch.unreadCount > 0 && (
                      <span className={`w-5 h-5 text-[11px] font-semibold rounded-full flex items-center justify-center shrink-0 ml-1.5 ${
                        ch.isMuted
                          ? 'bg-gray-200 text-black'
                          : 'bg-[#dcfce7] text-black'
                      }`}>
                        {ch.unreadCount}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
  );
}

import { useEffect } from 'react';
import { useParams } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { PanelLeftOpen, MessageSquare } from 'lucide-react';
import { ChannelSidebar } from './components/channel-sidebar';
import { ChannelHeader } from './components/channel-header';
import { MessageThread } from './components/message-thread';
import { DetailPanel } from './components/detail-panel';
import { AiChatPanel } from './components/ai-chat-panel';
import { useChatStore } from '@/store/chat-store';
import { useUIStore } from '@/store/ui-store';
import { SIDEBAR_WIDTH, SPRING } from '@/lib/constants';
import { getAvatarColor, getAvatarLetter } from '@/lib/avatar';

export function ChatPage() {
  const { channelId } = useParams();
  const { channels, activeChannelId, setActiveChannel } = useChatStore();
  const { sidebarCollapsed, toggleSidebar } = useUIStore();

  useEffect(() => {
    if (channelId) {
      setActiveChannel(channelId);
    } else if (!activeChannelId && channels.length > 0) {
      setActiveChannel(channels[0].id);
    }
  }, [channelId, activeChannelId, channels, setActiveChannel]);

  const activeChannel = channels.find((c) => c.id === activeChannelId);

  return (
    <div className="h-full flex gap-2">
      <AnimatePresence initial={false}>
        {!sidebarCollapsed && (
          <motion.div
            initial={false}
            animate={{ width: SIDEBAR_WIDTH, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={SPRING}
            className="h-full shrink-0 overflow-hidden rounded-[10px] shadow-[0_1px_3px_rgba(0,0,0,0.08)]"
          >
            <ChannelSidebar />
          </motion.div>
        )}
      </AnimatePresence>

      {sidebarCollapsed && (
        <div className="h-full shrink-0 flex flex-col items-center pt-3 px-1.5 gap-2 bg-white rounded-[10px] overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
          <button onClick={toggleSidebar} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors text-black shrink-0">
            <PanelLeftOpen className="w-4 h-4" />
          </button>
          <div className="flex flex-col items-center gap-1.5 overflow-y-auto no-scrollbar py-1">
            {[...channels].sort((a, b) => (b.sortTimestamp ?? 0) - (a.sortTimestamp ?? 0)).map((ch) => (
              <button
                key={ch.id}
                onClick={() => { useChatStore.getState().setActiveChannel(ch.id); }}
                className={`w-7 h-7 rounded-full shrink-0 overflow-hidden transition-all ${
                  activeChannelId === ch.id ? 'ring-2 ring-[#615EF0] ring-offset-1' : 'hover:opacity-80'
                }`}
                title={ch.name}
              >
                {ch.type === 'channel' ? (
                  <img src="/group.png" alt={ch.name} className="w-full h-full object-cover" />
                ) : ch.avatar ? (
                  <img src={ch.avatar} alt={ch.name} className="w-full h-full object-cover ring-1 ring-black/5" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center" style={{ backgroundColor: getAvatarColor(ch.name) }}>
                    <span className="text-[11px] font-bold text-black">
                      {getAvatarLetter(ch.name)}
                    </span>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {activeChannel ? (
        <div className="flex-1 flex overflow-hidden rounded-[10px] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
          {/* Main content column */}
          <div className="flex-1 flex flex-col overflow-hidden">
            <ChannelHeader channel={activeChannel} />
            <MessageThread channelId={activeChannel.id} />
          </div>
          {/* Detail panel — inside content card */}
          <DetailPanel channel={activeChannel} />
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center rounded-[10px] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
          <div className="text-center">
            <MessageSquare className="w-12 h-12 text-gray-200 mx-auto mb-3" />
            <p className="text-[14px] text-gray-300 font-medium">Select a channel to start</p>
          </div>
        </div>
      )}

      {/* AI Assistant — independent column */}
      <AiChatPanel />
    </div>
  );
}

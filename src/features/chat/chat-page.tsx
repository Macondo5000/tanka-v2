import { useEffect } from 'react';
import { useParams } from 'react-router';
import { MessageSquare } from 'lucide-react';
import { ChannelSidebar } from './components/channel-sidebar';
import { ChannelHeader } from './components/channel-header';
import { MessageThread } from './components/message-thread';
import { DetailPanel } from './components/detail-panel';
import { AiChatPanel } from './components/ai-chat-panel';
import { useChatStore } from '@/store/chat-store';
import { SIDEBAR_WIDTH } from '@/lib/constants';

export function ChatPage() {
  const { channelId } = useParams();
  const { channels, activeChannelId, setActiveChannel } = useChatStore();

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
      <div className="h-full shrink-0 overflow-hidden rounded-[10px] shadow-[0_1px_3px_rgba(0,0,0,0.08)]" style={{ width: SIDEBAR_WIDTH }}>
        <ChannelSidebar />
      </div>

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

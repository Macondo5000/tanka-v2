import { useLocation, useNavigate } from 'react-router';
import { Workflow, MessageCircle, Link } from 'lucide-react';
import { useChatStore } from '@/store/chat-store';

const NAV_ITEMS = [
  { key: 'flow', label: 'Flow', path: '/flow', icon: Workflow },
  { key: 'chat', label: 'Chat', path: '/chat', icon: MessageCircle },
  { key: 'link', label: 'Link', path: '/link', icon: Link },
];

export function SidebarTabs() {
  const location = useLocation();
  const navigate = useNavigate();

  const activeKey = location.pathname.startsWith('/chat')
    ? 'chat'
    : location.pathname.startsWith('/link')
    ? 'link'
    : 'flow';

  const chatUnread = useChatStore((s) =>
    s.channels.reduce((sum, ch) => sum + (ch.unreadCount || 0), 0)
  );

  return (
    <div className="flex items-center bg-black/[0.04] rounded-[10px] p-[3px]">
      {NAV_ITEMS.map((item) => {
        const isActive = activeKey === item.key;
        const Icon = item.icon;
        const badge = item.key === 'chat' ? chatUnread : 0;
        return (
          <button
            key={item.key}
            onClick={() => navigate(item.path)}
            className={`relative flex-1 flex items-center justify-center gap-1.5 py-[5px] rounded-[7px] text-[14px] font-medium tracking-tight transition-all ${
              isActive
                ? 'bg-white text-black shadow-[0_1px_2px_rgba(0,0,0,0.05)]'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <Icon className="w-3.5 h-3.5" strokeWidth={2.2} />
            {item.label}
            {badge > 0 && (
              <span className="absolute -top-1.5 right-0.5 min-w-[16px] h-[16px] px-1 bg-[#dcfce7] text-black text-[10px] font-bold rounded-full flex items-center justify-center leading-none">
                {badge > 99 ? '99+' : badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

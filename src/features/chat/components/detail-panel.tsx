import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import type { Channel } from '@/types/chat';
import { SPRING, DETAIL_PANEL_WIDTH } from '@/lib/constants';
import { useChatStore } from '@/store/chat-store';

interface DetailPanelProps {
  channel: Channel;
}

export function DetailPanel({ channel }: DetailPanelProps) {
  const { detailPanelOpen, toggleDetailPanel } = useChatStore();

  return (
    <AnimatePresence>
      {detailPanelOpen && (
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: DETAIL_PANEL_WIDTH, opacity: 1 }}
          exit={{ width: 0, opacity: 0 }}
          transition={SPRING}
          className="h-full border-l border-gray-100 bg-white overflow-hidden shrink-0"
        >
          <div className="p-5" style={{ width: DETAIL_PANEL_WIDTH }}>
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-[18px] font-bold tracking-tight">Details</h3>
              <button onClick={toggleDetailPanel} className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
                <X className="w-4 h-4 text-gray-400" />
              </button>
            </div>

            {/* Channel info */}
            <div className="space-y-5">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-gray-400 block mb-2">About</span>
                <p className="text-[14px] text-gray-600 font-medium leading-relaxed">
                  {channel.description || 'No description'}
                </p>
              </div>

              <div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-gray-400 block mb-3">
                  Members · {channel.members.length}
                </span>
                <div className="space-y-2">
                  {channel.members.map((member) => (
                    <div key={member.id} className="flex items-center gap-3 py-1.5">
                      <div className="relative">
                        <img src={member.avatar} alt={member.name} className="w-9 h-9 rounded-full object-cover" />
                        {member.isOnline && (
                          <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white" />
                        )}
                      </div>
                      <div>
                        <span className="text-[14px] font-semibold text-black">{member.name}</span>
                        {member.role && (
                          <span className="text-[12px] text-gray-400 font-medium block">{member.role}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

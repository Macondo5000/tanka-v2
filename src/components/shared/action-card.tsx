import { useState } from 'react';
import { motion } from 'motion/react';
import { Zap, Check, Maximize2, Users, Mail, FileText, Database } from 'lucide-react';
import type { ActionCardData } from '@/types/common';
import { AvatarStack } from './avatar-stack';

const ACTION_ICONS = {
  create_group: Users,
  send_email: Mail,
  nudge: Zap,
  generate_doc: FileText,
  fetch_data: Database,
};

interface ActionCardProps {
  action: ActionCardData;
  onConfirm?: (id: string) => void;
  onDismiss?: (id: string) => void;
}

export function ActionCard({ action, onConfirm, onDismiss }: ActionCardProps) {
  const [confirming, setConfirming] = useState(false);
  const isExecuted = action.state === 'executed';
  const Icon = isExecuted ? Check : ACTION_ICONS[action.type] || Zap;

  const handleConfirm = () => {
    setConfirming(true);
    setTimeout(() => {
      onConfirm?.(action.id);
      setConfirming(false);
    }, 800);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`border rounded-xl p-5 w-full relative overflow-hidden transition-all shadow-lg shadow-black/[0.03] ${
        isExecuted ? 'bg-gray-50/80 border-gray-200' : 'bg-orange-50/50 border-orange-200'
      }`}
    >
      {/* Top accent bar */}
      <div className={`absolute top-0 left-0 right-0 h-1.5 ${isExecuted ? 'bg-gray-300' : 'bg-orange-400'}`} />

      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
            isExecuted ? 'bg-gray-100 border border-gray-200' : 'bg-white border border-gray-100'
          }`}>
            <Icon className={`w-5 h-5 ${isExecuted ? 'text-gray-400' : 'text-orange-500'}`} strokeWidth={isExecuted ? 2.5 : 2} />
          </div>
          <div>
            <span className={`text-[9px] font-bold uppercase tracking-[0.15em] block mb-0.5 ${
              isExecuted ? 'text-gray-400' : 'text-orange-500'
            }`}>
              {isExecuted ? 'Executed' : 'Proposed Action'}
            </span>
            <span className="text-[15px] font-bold text-black leading-none tracking-tight">
              {action.label}
            </span>
          </div>
        </div>
        <button className="p-2 text-black/20 hover:text-black transition-colors">
          <Maximize2 className="w-4 h-4" />
        </button>
      </div>

      {/* Content */}
      <div className="mb-5">
        {(action.type === 'nudge' || action.type === 'send_email') && action.recipient ? (
          <div className="space-y-3">
            <div className="flex flex-col gap-0.5">
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Recipient</span>
              <span className="text-[13px] font-medium text-black break-all">{action.recipient}</span>
            </div>
            {action.subject && (
              <div className="flex flex-col gap-0.5">
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Subject</span>
                <span className="text-[13px] font-medium text-black leading-snug">{action.subject}</span>
              </div>
            )}
            {action.body && (
              <p className="text-[13px] text-gray-600 leading-relaxed font-medium whitespace-pre-line">{action.body}</p>
            )}
          </div>
        ) : action.type === 'create_group' && action.members ? (
          <div className="space-y-3">
            {action.groupName && (
              <div className="flex flex-col gap-0.5">
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Group Name</span>
                <span className="text-[13px] font-semibold text-black">{action.groupName}</span>
              </div>
            )}
            <div className="flex flex-col gap-1.5">
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Members {action.members.length}</span>
              <div className="flex items-center gap-2.5">
                <AvatarStack users={action.members} size="md" />
                <span className="text-[12px] font-medium text-gray-500">{action.members.map((m) => m.name).join('、')}</span>
              </div>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Opening Message</span>
              <p className="text-[12px] text-gray-500 font-medium leading-relaxed">{action.description}</p>
            </div>
          </div>
        ) : (
          <p className="whitespace-pre-wrap text-[13px] text-gray-600 font-medium leading-relaxed line-clamp-4">
            {action.description}
          </p>
        )}
      </div>

      {/* Footer */}
      <div className="grid grid-cols-2 gap-2">
        {isExecuted ? (
          <div className="col-span-2 py-2.5 rounded-xl text-[13px] font-semibold flex items-center justify-center gap-1.5 bg-gray-100 text-gray-400">
            <Check className="w-3.5 h-3.5" strokeWidth={2.5} />
            Executed
          </div>
        ) : (
          <>
            <button
              onClick={handleConfirm}
              disabled={confirming}
              className="py-2.5 rounded-xl text-[13px] font-semibold transition-all active:scale-[0.97] text-white bg-orange-400 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {confirming ? (
                <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : 'Confirm'}
            </button>
            <button
              onClick={() => onDismiss?.(action.id)}
              className="py-2.5 rounded-xl text-[13px] font-semibold transition-all active:scale-[0.97] bg-gray-100 text-gray-600 hover:bg-gray-200"
            >
              Dismiss
            </button>
          </>
        )}
      </div>
    </motion.div>
  );
}

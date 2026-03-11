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
      className={`rounded-2xl p-5 w-full transition-all ${
        isExecuted
          ? 'bg-[#F8F9FA] border border-[#E8ECF0]'
          : 'bg-white border border-[#E4ECF4] shadow-[0_2px_12px_rgba(59,130,246,0.06)]'
      }`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${
            isExecuted ? 'bg-[#EDF0F3]' : 'bg-[#EBF3FF]'
          }`}>
            <Icon className={`w-4 h-4 ${isExecuted ? 'text-gray-400' : 'text-[#4B8AD0]'}`} strokeWidth={isExecuted ? 2.5 : 2} />
          </div>
          <div>
            <span className={`text-[11px] font-medium uppercase tracking-[0.12em] block mb-0.5 ${
              isExecuted ? 'text-gray-400' : 'text-[#6B9ECE]'
            }`}>
              {isExecuted ? 'Executed' : 'Proposed Action'}
            </span>
            <span className="text-[15px] font-semibold text-black leading-tight tracking-tight">
              {action.label}
            </span>
          </div>
        </div>
        <button className="p-1.5 text-gray-300 hover:text-gray-500 transition-colors rounded-md hover:bg-black/[0.03]">
          <Maximize2 className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Content */}
      <div className="mb-5">
        {(action.type === 'nudge' || action.type === 'send_email') && action.recipient ? (
          <div className="space-y-3">
            <div className="flex flex-col gap-0.5">
              <span className="text-[11px] font-medium text-gray-400 uppercase tracking-widest">Recipient</span>
              <span className="text-[14px] font-normal text-black break-all">{action.recipient}</span>
            </div>
            {action.subject && (
              <div className="flex flex-col gap-0.5">
                <span className="text-[11px] font-medium text-gray-400 uppercase tracking-widest">Subject</span>
                <span className="text-[14px] font-normal text-black leading-snug">{action.subject}</span>
              </div>
            )}
            {action.body && (
              <p className="text-[14px] text-gray-500 leading-relaxed font-normal whitespace-pre-line">{action.body}</p>
            )}
          </div>
        ) : action.type === 'create_group' && action.members ? (
          <div className="space-y-3">
            {action.groupName && (
              <div className="flex flex-col gap-0.5">
                <span className="text-[11px] font-medium text-gray-400 uppercase tracking-widest">Group Name</span>
                <span className="text-[14px] font-medium text-black">{action.groupName}</span>
              </div>
            )}
            <div className="flex flex-col gap-1.5">
              <span className="text-[11px] font-medium text-gray-400 uppercase tracking-widest">Members {action.members.length}</span>
              <div className="flex items-center gap-2.5">
                <AvatarStack users={action.members} size="md" />
                <span className="text-[13px] font-normal text-gray-500">{action.members.map((m) => m.name).join('、')}</span>
              </div>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-[11px] font-medium text-gray-400 uppercase tracking-widest">Opening Message</span>
              <p className="text-[12px] text-gray-500 font-normal leading-relaxed">{action.description}</p>
            </div>
          </div>
        ) : (
          <p className="whitespace-pre-wrap text-[14px] text-gray-500 font-normal leading-relaxed line-clamp-4">
            {action.description}
          </p>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center gap-2">
        {isExecuted ? (
          <div className="flex-1 py-2.5 rounded-xl text-[14px] font-medium flex items-center justify-center gap-1.5 bg-[#EDF0F3] text-gray-400">
            <Check className="w-3.5 h-3.5" strokeWidth={2.5} />
            Executed
          </div>
        ) : (
          <>
            <button
              onClick={handleConfirm}
              disabled={confirming}
              className="flex-1 py-2.5 rounded-xl text-[14px] font-medium transition-all active:scale-[0.97] text-white bg-[#1E293B] hover:bg-[#334155] flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {confirming ? (
                <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : 'Confirm'}
            </button>
            <button
              onClick={() => onDismiss?.(action.id)}
              className="flex-1 py-2.5 rounded-xl text-[14px] font-medium transition-all active:scale-[0.97] bg-[#F0F4F8] text-gray-500 hover:bg-[#E5EBF1] hover:text-gray-700"
            >
              Dismiss
            </button>
          </>
        )}
      </div>
    </motion.div>
  );
}

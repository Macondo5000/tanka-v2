import { motion } from 'motion/react';
import { Flag } from 'lucide-react';
import type { Flow } from '@/types/flow';
import { AvatarStack } from '@/components/shared/avatar-stack';
import { PRIORITY_CONFIG } from '@/types/common';
import { staggerDelay, EASE_SMOOTH } from '@/lib/constants';

interface FlowCardProps {
  flow: Flow;
  index: number;
  onClick: (flowId: string) => void;
}

export function FlowCard({ flow, index, onClick }: FlowCardProps) {
  const activeStep = flow.workplanSteps.find((s) => s.status === 'active');
  const completedCount = flow.workplanSteps.filter((s) => s.status === 'completed').length;
  const totalSteps = flow.workplanSteps.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...staggerDelay(index, 0.05), ease: EASE_SMOOTH }}
      onClick={() => onClick(flow.id)}
      className="p-4 rounded-2xl border border-gray-100 bg-white hover:shadow-md active:scale-[0.99] transition-all cursor-pointer"
    >
      <div className="flex items-start justify-between mb-2">
        <h4 className="text-[14px] font-semibold text-black tracking-tight leading-snug flex-1 min-w-0 pr-2">
          {flow.title}
        </h4>
        <Flag
          className={`w-3.5 h-3.5 shrink-0 ${PRIORITY_CONFIG[flow.priority].color} ${PRIORITY_CONFIG[flow.priority].fill}`}
          strokeWidth={2}
        />
      </div>

      <p className="text-[12px] text-gray-400 font-medium leading-relaxed mb-3 line-clamp-2">
        {flow.description}
      </p>

      {/* Progress */}
      {activeStep && (
        <div className="mb-3">
          <div className="flex items-center gap-2 mb-1.5">
            <div className="flex-1 h-1 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-black rounded-full transition-all"
                style={{ width: `${(completedCount / totalSteps) * 100}%` }}
              />
            </div>
            <span className="text-[10px] font-bold text-gray-400">{completedCount}/{totalSteps}</span>
          </div>
          <p className="text-[11px] text-gray-400 font-medium truncate">{activeStep.label}</p>
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between">
        {flow.collaborators && flow.collaborators.length > 0 ? (
          <AvatarStack users={flow.collaborators} max={3} size="sm" />
        ) : (
          <div />
        )}
        {flow.dueDate && (
          <span className="text-[10px] font-medium text-gray-400">Due {flow.dueDate.slice(5)}</span>
        )}
      </div>
    </motion.div>
  );
}

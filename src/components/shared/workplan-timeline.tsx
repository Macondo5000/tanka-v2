import { Check, Circle } from 'lucide-react';
import type { WorkplanStep, StepAction } from '@/types/flow';
import { ActionCardCompact } from './action-card-compact';

interface WorkplanTimelineProps {
  steps: WorkplanStep[];
  title?: string;
}

function ActionList({ actions }: { actions: StepAction[] }) {
  return (
    <div className="mt-3 space-y-0.5">
      {actions.map((action, i) => {
        const isExecuted = action.state === 'executed';
        return (
          <div
            key={i}
            className={`flex items-center gap-2.5 px-3 py-2 rounded-lg ${
              isExecuted ? '' : 'bg-orange-50/60'
            }`}
          >
            {isExecuted ? (
              <div className="w-4 h-4 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                <Check className="w-2.5 h-2.5 text-gray-400" strokeWidth={3} />
              </div>
            ) : (
              <div className="w-4 h-4 flex items-center justify-center shrink-0">
                <Circle className="w-3 h-3 text-orange-400 fill-orange-400 animate-pulse" />
              </div>
            )}
            <span className={`text-[12px] font-medium flex-1 min-w-0 truncate ${
              isExecuted ? 'text-gray-400' : 'text-gray-700'
            }`}>
              {action.label}
            </span>
            {action.time && (
              <span className="text-[10px] text-gray-300 font-medium shrink-0">
                {action.time}
              </span>
            )}
            {!isExecuted && !action.time && (
              <span className="text-[10px] text-orange-400 font-semibold shrink-0">
                In progress
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}

export function WorkplanTimeline({ steps, title }: WorkplanTimelineProps) {
  const activeIdx = steps.findIndex((s) => s.status === 'active');

  return (
    <div className="space-y-0 relative">
      {title && (
        <div className="mb-4">
          <h3 className="text-[16px] font-bold text-[#0d0d0d] leading-tight">{title}</h3>
          <div className="flex items-center gap-2 mt-1.5">
            <div className="flex items-center gap-1 px-2 py-0.5 bg-emerald-50 rounded-full">
              <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[9px] font-bold text-emerald-600 uppercase tracking-widest">In Progress</span>
            </div>
            <span className="text-[11px] text-gray-400 font-medium">
              Step {activeIdx + 1} · {steps.filter((s) => s.status === 'pending').length} remaining
            </span>
          </div>
        </div>
      )}

      <div className="absolute left-[15px] top-8 bottom-8 w-px border-l border-dashed border-gray-300" />

      {steps.map((step, idx) => (
        <div key={step.id} className="relative flex gap-4 pb-8 last:pb-0">
          <div className="relative z-10 w-8 flex flex-col items-center pt-1.5 shrink-0">
            {step.status === 'completed' ? (
              <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center border border-gray-200">
                <Check className="w-3.5 h-3.5 text-black" strokeWidth={3} />
              </div>
            ) : step.status === 'active' ? (
              <div className="w-6 h-6 rounded-full border border-dashed border-gray-300 flex items-center justify-center bg-white shadow-sm">
                <div className="w-2 h-2 rounded-full bg-black" />
              </div>
            ) : (
              <div className="w-6 h-6 rounded-full border border-dashed border-gray-200 bg-white" />
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex flex-col mb-2">
              <span className={`text-[12px] font-bold uppercase tracking-[0.2em] mb-0.5 ${
                step.status === 'active' ? 'text-black' :
                step.status === 'completed' ? 'text-gray-400' : 'text-gray-300'
              }`}>
                Step {idx + 1}
              </span>
              <h4 className={`text-[15px] font-bold tracking-tight leading-snug ${
                step.status === 'active' ? 'text-[#0d0d0d]' : 'text-black'
              }`}>
                {step.label}
              </h4>
            </div>

            <p className={`text-[13px] leading-relaxed mb-2 ${
              step.status === 'active' ? 'text-[#5d5d5d]' : 'text-gray-500'
            }`}>
              {step.description}
            </p>

            {step.meta && step.status !== 'completed' && (
              <p className="text-[11px] font-medium text-gray-400 mb-2">{step.meta}</p>
            )}

            {/* Render actions list if available, otherwise fall back to single action card */}
            {step.actions && step.actions.length > 0 ? (
              <ActionList actions={step.actions} />
            ) : step.actionLabel ? (
              <div className="mt-3">
                <ActionCardCompact
                  label={step.actionLabel}
                  state={step.status === 'completed' ? 'executed' : 'active'}
                />
              </div>
            ) : null}

            {step.time && step.status === 'completed' && !step.actionLabel && !(step.actions && step.actions.length > 0) && (
              <div className="text-[10px] font-bold text-gray-300 mt-2 uppercase tracking-widest">
                Completed at {step.time}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

import { Zap, Check } from 'lucide-react';

interface ActionCardCompactProps {
  label: string;
  state: 'active' | 'executed';
}

export function ActionCardCompact({ label, state }: ActionCardCompactProps) {
  const isExecuted = state === 'executed';

  return (
    <div className={`p-3 rounded-xl border flex items-center gap-3 transition-all ${
      isExecuted
        ? 'bg-[#F8F9FA] border-[#E8ECF0]'
        : 'bg-white border-[#E4ECF4] shadow-[0_1px_6px_rgba(59,130,246,0.05)]'
    }`}>
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
        isExecuted ? 'bg-[#EDF0F3]' : 'bg-[#EBF3FF]'
      }`}>
        {isExecuted ? (
          <Check className="w-4 h-4 text-gray-400" strokeWidth={2.5} />
        ) : (
          <Zap className="w-4 h-4 text-[#4B8AD0]" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <span className={`text-[10px] font-medium uppercase tracking-[0.12em] block leading-none mb-0.5 ${
          isExecuted ? 'text-gray-400' : 'text-[#6B9ECE]'
        }`}>
          {isExecuted ? 'Executed' : 'Proposed Action'}
        </span>
        <span className="text-[14px] font-medium text-black leading-none truncate block">{label}</span>
      </div>
    </div>
  );
}

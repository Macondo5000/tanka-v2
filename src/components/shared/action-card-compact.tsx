import { Zap, Check } from 'lucide-react';

interface ActionCardCompactProps {
  label: string;
  state: 'active' | 'executed';
}

export function ActionCardCompact({ label, state }: ActionCardCompactProps) {
  const isExecuted = state === 'executed';

  return (
    <div className={`p-3 rounded-xl border flex items-center gap-3 ${
      isExecuted
        ? 'bg-gray-50/80 border-gray-200'
        : 'bg-orange-50/50 border-orange-200'
    }`}>
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
        isExecuted
          ? 'bg-gray-100 border border-gray-200'
          : 'bg-white border border-gray-100'
      }`}>
        {isExecuted ? (
          <Check className="w-5 h-5 text-gray-400" strokeWidth={2.5} />
        ) : (
          <Zap className="w-5 h-5 text-orange-500" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <span className={`text-[9px] font-bold uppercase tracking-[0.15em] block leading-none mb-0.5 ${
          isExecuted ? 'text-gray-400' : 'text-orange-500'
        }`}>
          {isExecuted ? 'Executed' : 'AI Action'}
        </span>
        <span className="text-[13px] font-semibold text-black leading-none">{label}</span>
      </div>
    </div>
  );
}

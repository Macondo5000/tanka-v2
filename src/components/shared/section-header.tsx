import { ChevronRight } from 'lucide-react';

interface SectionHeaderProps {
  title: string;
  action?: string;
  onAction?: () => void;
}

export function SectionHeader({ title, action, onAction }: SectionHeaderProps) {
  return (
    <div className="flex items-end justify-between mb-2">
      <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-[0.2em] leading-none">{title}</h2>
      {action && (
        <button onClick={onAction} className="text-[11px] font-semibold text-black leading-none flex items-center gap-0.5 hover:text-gray-600 transition-colors">
          {action}
          <ChevronRight className="w-3 h-3" />
        </button>
      )}
    </div>
  );
}

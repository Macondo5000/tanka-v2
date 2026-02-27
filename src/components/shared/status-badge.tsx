import { STATUS_CONFIG, type Status } from '@/types/common';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: Status;
  size?: 'sm' | 'md';
  showDot?: boolean;
}

export function StatusBadge({ status, size = 'sm', showDot = false }: StatusBadgeProps) {
  const config = STATUS_CONFIG[status];
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 font-bold uppercase tracking-wider rounded-md',
        config.tagStyle,
        size === 'sm' ? 'text-[10px] px-1.5 py-0.5' : 'text-[11px] px-2 py-1'
      )}
    >
      {showDot && (
        <span className={cn('w-1.5 h-1.5 rounded-full animate-pulse', config.dotColor)} />
      )}
      {config.label}
    </span>
  );
}

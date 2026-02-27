import type { Flow } from '@/types/flow';
import type { Status } from '@/types/common';
import { STATUS_CONFIG } from '@/types/common';
import { FlowCard } from './flow-card';

interface TaskColumnProps {
  status: Status;
  flows: Flow[];
  onFlowClick: (flowId: string) => void;
}

export function TaskColumn({ status, flows, onFlowClick }: TaskColumnProps) {
  const config = STATUS_CONFIG[status];

  return (
    <div className="flex-1 min-w-[300px] flex flex-col">
      {/* Column header */}
      <div className="flex items-center gap-2 mb-4 px-1">
        <span className={`w-2 h-2 rounded-full ${config.dotColor}`} />
        <span className="text-[13px] font-bold text-black">{config.label}</span>
        <span className="text-[12px] font-medium text-gray-300 ml-1">{flows.length}</span>
      </div>

      {/* Cards */}
      <div className="flex-1 space-y-3 overflow-y-auto no-scrollbar pb-4">
        {flows.map((flow, idx) => (
          <FlowCard key={flow.id} flow={flow} index={idx} onClick={onFlowClick} />
        ))}

        {flows.length === 0 && (
          <div className="text-center py-12">
            <p className="text-[13px] text-gray-300 font-medium">No flows</p>
          </div>
        )}
      </div>
    </div>
  );
}

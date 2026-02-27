import type { Flow } from '@/types/flow';
import type { Status } from '@/types/common';
import { TaskColumn } from './task-column';

interface TaskBoardProps {
  flows: Flow[];
  onFlowClick: (flowId: string) => void;
}

const COLUMNS: Status[] = ['pending', 'awaiting', 'actioning'];

export function TaskBoard({ flows, onFlowClick }: TaskBoardProps) {
  return (
    <div className="flex-1 flex gap-6 overflow-x-auto px-6 py-4 no-scrollbar">
      {COLUMNS.map((status) => (
        <TaskColumn
          key={status}
          status={status}
          flows={flows.filter((f) => f.status === status)}
          onFlowClick={onFlowClick}
        />
      ))}
    </div>
  );
}

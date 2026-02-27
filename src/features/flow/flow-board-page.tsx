import { useNavigate } from 'react-router';
import { useFlowStore } from '@/store/flow-store';
import { TaskBoard } from './components/task-board';
import { FlowFilterBar } from './components/flow-filter-bar';

export function FlowBoardPage() {
  const navigate = useNavigate();
  const { flows, filters } = useFlowStore();

  const filtered = flows.filter((f) => {
    if (filters.status !== 'all' && f.status !== filters.status) return false;
    if (filters.priority !== 'all' && f.priority !== filters.priority) return false;
    if (filters.assignee === 'me' && f.assignee?.id !== 'me') return false;
    if (filters.assignee === 'other' && f.assignee?.id === 'me') return false;
    return true;
  });

  const handleFlowClick = (flowId: string) => {
    navigate(`/flow/${flowId}`);
  };

  return (
    <div className="h-full flex flex-col bg-white">
      <FlowFilterBar />
      <TaskBoard flows={filtered} onFlowClick={handleFlowClick} />
    </div>
  );
}

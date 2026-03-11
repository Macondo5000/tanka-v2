import { Outlet } from 'react-router';
import { FlowSidebar } from './components/flow-sidebar';
import { SIDEBAR_WIDTH } from '@/lib/constants';

export function FlowPage() {
  return (
    <div className="h-full flex gap-2">
      <div className="h-full shrink-0 overflow-hidden rounded-[10px] shadow-[0_1px_3px_rgba(0,0,0,0.08)]" style={{ width: SIDEBAR_WIDTH }}>
        <FlowSidebar />
      </div>

      <div className="flex-1 min-w-0 rounded-[10px] overflow-hidden bg-[#FBFBF9] shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
        <Outlet />
      </div>
    </div>
  );
}

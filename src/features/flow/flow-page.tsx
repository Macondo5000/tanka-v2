import { Outlet, useParams, useNavigate, useLocation } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { PanelLeftOpen, Plus, BookOpen, CalendarCheck, FolderOpen } from 'lucide-react';
import { FlowSidebar } from './components/flow-sidebar';
import { FlowHome } from './components/flow-home';
import { useUIStore } from '@/store/ui-store';
import { SIDEBAR_WIDTH, SPRING } from '@/lib/constants';

export function FlowPage() {
  const { flowId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { sidebarCollapsed, toggleSidebar } = useUIStore();
  const hasChildRoute = !!flowId || (location.pathname !== '/flow' && location.pathname !== '/');

  return (
    <div className="h-full flex gap-2">
      <AnimatePresence initial={false}>
        {!sidebarCollapsed && (
          <motion.div
            initial={false}
            animate={{ width: SIDEBAR_WIDTH, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={SPRING}
            className="h-full shrink-0 overflow-hidden rounded-[10px] shadow-[0_1px_3px_rgba(0,0,0,0.08)]"
          >
            <FlowSidebar />
          </motion.div>
        )}
      </AnimatePresence>

      {sidebarCollapsed && (
        <div className="h-full shrink-0 flex flex-col items-center pt-3 px-1.5 gap-2 bg-white rounded-[10px] overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
          <button onClick={toggleSidebar} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors text-black shrink-0">
            <PanelLeftOpen className="w-4 h-4" />
          </button>
          <div className="flex flex-col items-center gap-1.5 py-1">
            <button onClick={() => navigate('/flow/new')} title="New Flow" className="w-6 h-6 rounded-md flex items-center justify-center hover:bg-gray-100 transition-colors">
              <Plus className="w-3.5 h-3.5 text-gray-600" />
            </button>
            <button onClick={() => navigate('/flow/sop-library')} title="SOP Library" className="w-6 h-6 rounded-md flex items-center justify-center hover:bg-gray-100 transition-colors">
              <BookOpen className="w-3.5 h-3.5 text-gray-600" />
            </button>
            <button onClick={() => navigate('/flow/follow-up')} title="Follow-up" className="w-6 h-6 rounded-md flex items-center justify-center hover:bg-gray-100 transition-colors">
              <CalendarCheck className="w-3.5 h-3.5 text-gray-600" />
            </button>
            <button onClick={() => navigate('/flow/assets')} title="Assets" className="w-6 h-6 rounded-md flex items-center justify-center hover:bg-gray-100 transition-colors">
              <FolderOpen className="w-3.5 h-3.5 text-gray-600" />
            </button>
          </div>
        </div>
      )}

      <div className="flex-1 min-w-0 rounded-[10px] overflow-hidden bg-[#FBFBF9] shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
        {hasChildRoute ? <Outlet /> : <FlowHome />}
      </div>
    </div>
  );
}

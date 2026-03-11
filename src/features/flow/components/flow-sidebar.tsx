import { BookOpen, Plus, CalendarCheck, FolderOpen } from 'lucide-react';
import { useNavigate, useParams, useLocation } from 'react-router';
import { useFlowStore } from '@/store/flow-store';
import { SIDEBAR_WIDTH } from '@/lib/constants';
import { SidebarTabs } from '@/components/shared/sidebar-tabs';

export function FlowSidebar() {
  const navigate = useNavigate();
  const { flowId } = useParams();
  const location = useLocation();
  const flows = useFlowStore((s) => s.flows);
  const isSOPActive = location.pathname === '/flow/sop-library';
  const isNewFlowActive = flowId === 'new';
  const isFollowUpActive = location.pathname === '/flow/follow-up';
  const isAssetsActive = location.pathname === '/flow/assets';

  return (
    <div className="h-full bg-gradient-to-b from-[#F0F7FF] to-white flex flex-col shrink-0" style={{ width: SIDEBAR_WIDTH }}>
      {/* Module tabs */}
      <div className="px-3 pt-3 pb-1 shrink-0">
        <SidebarTabs />
      </div>

      {/* Nav + List */}
      <div className="flex-1 overflow-y-auto px-2 py-2 space-y-4 no-scrollbar">
        {/* Home & SOP Library */}
        <div className="space-y-0.5">
          <button
            onClick={() => navigate('/flow/new')}
            className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-left transition-all border ${
              isNewFlowActive ? 'bg-white border-[#D4E3F5] shadow-[0_1px_2px_rgba(0,0,0,0.04)] text-black' : 'border-transparent text-gray-800 hover:bg-[#E8F0FA]'
            }`}
          >
            <Plus className="w-4 h-4 shrink-0" />
            <span className={`text-[14px] font-medium ${isNewFlowActive ? 'text-black' : ''}`}>New Flow</span>
          </button>

          <button
            onClick={() => navigate('/flow/sop-library')}
            className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-left transition-all border ${
              isSOPActive ? 'bg-white border-[#D4E3F5] shadow-[0_1px_2px_rgba(0,0,0,0.04)] text-black' : 'border-transparent text-gray-800 hover:bg-[#E8F0FA]'
            }`}
          >
            <BookOpen className="w-4 h-4 shrink-0" />
            <span className={`text-[14px] font-medium ${isSOPActive ? 'text-black' : ''}`}>SOP Library</span>
          </button>

          <button
            onClick={() => navigate('/flow/follow-up')}
            className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-left transition-all border ${
              isFollowUpActive ? 'bg-white border-[#D4E3F5] shadow-[0_1px_2px_rgba(0,0,0,0.04)] text-black' : 'border-transparent text-gray-800 hover:bg-[#E8F0FA]'
            }`}
          >
            <CalendarCheck className="w-4 h-4 shrink-0" />
            <span className={`text-[14px] font-medium ${isFollowUpActive ? 'text-black' : ''}`}>Follow-up</span>
          </button>

          <button
            onClick={() => navigate('/flow/assets')}
            className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-left transition-all border ${
              isAssetsActive ? 'bg-white border-[#D4E3F5] shadow-[0_1px_2px_rgba(0,0,0,0.04)] text-black' : 'border-transparent text-gray-800 hover:bg-[#E8F0FA]'
            }`}
          >
            <FolderOpen className="w-4 h-4 shrink-0" />
            <span className={`text-[14px] font-medium ${isAssetsActive ? 'text-black' : ''}`}>Assets</span>
          </button>
        </div>

        {/* Recent flows */}
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-widest text-gray-400 px-2 mb-1 block">Recent</span>
          <div className="space-y-0.5">
            {flows.map((flow) => {
              const isActive = flow.id === flowId;

              return (
                <button
                  key={flow.id}
                  onClick={() => navigate(`/flow/${flow.id}`)}
                  className={`w-full px-2.5 py-1.5 rounded-lg text-left transition-all truncate border ${
                    isActive ? 'bg-white border-[#D4E3F5] shadow-[0_1px_2px_rgba(0,0,0,0.04)] text-black' : 'border-transparent text-gray-800 hover:bg-[#E8F0FA]'
                  }`}
                >
                  <span className={`text-[14px] font-normal truncate ${isActive ? 'font-medium text-black' : ''}`}>
                    {flow.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

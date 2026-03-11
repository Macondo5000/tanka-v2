import { BookOpen, Plus, Search, CalendarCheck, FolderOpen } from 'lucide-react';
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
    <div className="h-full bg-[#FBFBF9] flex flex-col shrink-0" style={{ width: SIDEBAR_WIDTH }}>
      {/* Module tabs */}
      <div className="px-3 pt-3 pb-1 shrink-0">
        <SidebarTabs />
      </div>

      {/* Search */}
      <div className="px-3 pt-1 pb-2 shrink-0">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-300" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-9 pr-3 py-1.5 bg-transparent border border-black/[0.06] rounded-lg text-[13px] font-medium placeholder:text-gray-300 outline-none focus:bg-white focus:border-transparent focus:ring-2 focus:ring-gray-200/60 transition-all"
          />
        </div>
      </div>

      {/* Nav + List */}
      <div className="flex-1 overflow-y-auto px-2 py-2 space-y-4 no-scrollbar">
        {/* Home & SOP Library */}
        <div className="space-y-0.5">
          <button
            onClick={() => navigate('/flow/new')}
            className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-left transition-all border ${
              isNewFlowActive ? 'bg-white border-[#E9EAE7] shadow-[0_1px_2px_rgba(0,0,0,0.04)] text-black' : 'border-transparent text-gray-800 hover:bg-[#f0f0f0]'
            }`}
          >
            <Plus className="w-4 h-4 text-gray-500 shrink-0" />
            <span className={`text-[13px] font-semibold ${isNewFlowActive ? 'text-black' : ''}`}>New Flow</span>
          </button>

          <button
            onClick={() => navigate('/flow/sop-library')}
            className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-left transition-all border ${
              isSOPActive ? 'bg-white border-[#E9EAE7] shadow-[0_1px_2px_rgba(0,0,0,0.04)] text-black' : 'border-transparent text-gray-800 hover:bg-[#f0f0f0]'
            }`}
          >
            <BookOpen className="w-4 h-4 text-gray-500 shrink-0" />
            <span className={`text-[13px] font-semibold ${isSOPActive ? 'text-black' : ''}`}>SOP Library</span>
          </button>

          <button
            onClick={() => navigate('/flow/follow-up')}
            className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-left transition-all border ${
              isFollowUpActive ? 'bg-white border-[#E9EAE7] shadow-[0_1px_2px_rgba(0,0,0,0.04)] text-black' : 'border-transparent text-gray-800 hover:bg-[#f0f0f0]'
            }`}
          >
            <CalendarCheck className="w-4 h-4 text-gray-500 shrink-0" />
            <span className={`text-[13px] font-semibold ${isFollowUpActive ? 'text-black' : ''}`}>Follow-up</span>
          </button>

          <button
            onClick={() => navigate('/flow/assets')}
            className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-left transition-all border ${
              isAssetsActive ? 'bg-white border-[#E9EAE7] shadow-[0_1px_2px_rgba(0,0,0,0.04)] text-black' : 'border-transparent text-gray-800 hover:bg-[#f0f0f0]'
            }`}
          >
            <FolderOpen className="w-4 h-4 text-gray-500 shrink-0" />
            <span className={`text-[13px] font-semibold ${isAssetsActive ? 'text-black' : ''}`}>Assets</span>
          </button>
        </div>

        {/* Recent flows */}
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 px-2 mb-1 block">Recent</span>
          <div className="space-y-0.5">
            {flows.map((flow) => {
              const isActive = flow.id === flowId;

              return (
                <button
                  key={flow.id}
                  onClick={() => navigate(`/flow/${flow.id}`)}
                  className={`w-full px-2.5 py-1.5 rounded-lg text-left transition-all truncate border ${
                    isActive ? 'bg-white border-[#E9EAE7] shadow-[0_1px_2px_rgba(0,0,0,0.04)] text-black' : 'border-transparent text-gray-800 hover:bg-[#f0f0f0]'
                  }`}
                >
                  <span className={`text-[13px] font-normal truncate ${isActive ? 'font-medium text-black' : ''}`}>
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

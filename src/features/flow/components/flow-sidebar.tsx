import { BookOpen, Plus, CalendarCheck, FolderOpen, StickyNote, BarChart3 } from 'lucide-react';
import { useNavigate, useParams, useLocation } from 'react-router';
import { useFlowStore } from '@/store/flow-store';
import { SIDEBAR_WIDTH } from '@/lib/constants';
import { SidebarTabs } from '@/components/shared/sidebar-tabs';
import { motion } from 'motion/react';
import type { LucideIcon } from 'lucide-react';

interface NavItemProps {
  icon: LucideIcon;
  label: string;
  active: boolean;
  onClick: () => void;
}

function NavItem({ icon: Icon, label, active, onClick }: NavItemProps) {
  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.98 }}
      className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-left transition-colors duration-150 border ${
        active
          ? 'bg-[#DDE9F6] border-transparent text-black'
          : 'border-transparent text-gray-700 hover:bg-[#E8F0FA] hover:text-gray-900'
      }`}
    >
      <Icon
        className={`w-4 h-4 shrink-0 transition-colors duration-150 ${active ? 'text-blue-600' : 'text-gray-400'}`}
      />
      <span className={`text-[13.5px] font-medium ${active ? 'text-black' : ''}`}>{label}</span>
    </motion.button>
  );
}

export function FlowSidebar() {
  const navigate = useNavigate();
  const { flowId } = useParams();
  const location = useLocation();
  const flows = useFlowStore((s) => s.flows);
  const isSOPActive = location.pathname === '/flow/sop-library';
  const isNewFlowActive = flowId === 'new';
  const isFollowUpActive = location.pathname === '/flow/follow-up';
  const isAssetsActive = location.pathname === '/flow/assets';
  const isMemoActive = location.pathname === '/flow/memo';
  const isVoteActive = location.pathname === '/flow/vote';

  return (
    <div className="h-full bg-gradient-to-b from-[#F0F7FF] to-white flex flex-col shrink-0" style={{ width: SIDEBAR_WIDTH }}>
      {/* Module tabs */}
      <div className="px-3 pt-3 pb-1 shrink-0">
        <SidebarTabs />
      </div>

      {/* Nav + List */}
      <div className="flex-1 overflow-y-auto px-2 py-2 space-y-4 no-scrollbar">
        {/* Nav items */}
        <div className="space-y-0.5">
          <NavItem icon={Plus} label="New Flow" active={isNewFlowActive} onClick={() => navigate('/flow/new')} />
          <NavItem icon={BookOpen} label="SOP Library" active={isSOPActive} onClick={() => navigate('/flow/sop-library')} />
          <NavItem icon={CalendarCheck} label="Follow-up" active={isFollowUpActive} onClick={() => navigate('/flow/follow-up')} />
          <NavItem icon={FolderOpen} label="Assets" active={isAssetsActive} onClick={() => navigate('/flow/assets')} />

          {/* Divider before Memo/Vote */}
          <div className="my-1.5 mx-2.5 h-px bg-gray-100" />

          <NavItem icon={StickyNote} label="Memo" active={isMemoActive} onClick={() => navigate('/flow/memo')} />
          <NavItem icon={BarChart3} label="Vote" active={isVoteActive} onClick={() => navigate('/flow/vote')} />
        </div>

        {/* Recent flows */}
        <div>
          <span className="text-[10.5px] font-semibold uppercase tracking-widest text-gray-400 px-2.5 mb-1.5 block">
            Recent
          </span>
          <div className="space-y-0.5">
            {flows.map((flow) => {
              const isActive = flow.id === flowId;
              return (
                <motion.button
                  key={flow.id}
                  onClick={() => navigate(`/flow/${flow.id}`)}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full px-2.5 py-1.5 rounded-lg text-left transition-colors duration-150 truncate border ${
                    isActive
                      ? 'bg-[#DDE9F6] border-transparent text-black'
                      : 'border-transparent text-gray-700 hover:bg-[#E8F0FA] hover:text-gray-900'
                  }`}
                >
                  <span className={`text-[13.5px] truncate ${isActive ? 'font-medium text-black' : 'font-normal'}`}>
                    {flow.title}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

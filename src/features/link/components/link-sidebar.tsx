import { Link2, Unlink, Search } from 'lucide-react';
import { useLinkStore } from '@/store/link-store';
import { SIDEBAR_WIDTH } from '@/lib/constants';
import { SidebarTabs } from '@/components/shared/sidebar-tabs';

export function LinkSidebar() {
  const { apps, linkFilter, setLinkFilter } = useLinkStore();

  const linkedCount = apps.filter((a) => a.isConnected).length;
  const unlinkedCount = apps.filter((a) => !a.isConnected).length;

  return (
    <div className="h-full bg-gradient-to-b from-[#F0F7FF] to-white flex flex-col shrink-0" style={{ width: SIDEBAR_WIDTH }}>
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
            className="w-full pl-9 pr-3 py-1.5 bg-transparent border border-black/[0.06] rounded-lg text-[14px] font-medium placeholder:text-gray-300 outline-none focus:bg-white focus:border-transparent focus:ring-2 focus:ring-gray-200/60 transition-all"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="px-2 py-2 space-y-0.5">
        <button
          onClick={() => setLinkFilter('linked')}
          className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-left transition-all border ${
            linkFilter === 'linked' ? 'bg-white border-[#D4E3F5] shadow-[0_1px_2px_rgba(0,0,0,0.04)] text-black' : 'border-transparent text-gray-800 hover:bg-[#E8F0FA]'
          }`}
        >
          <Link2 className="w-4 h-4 text-gray-500 shrink-0" />
          <span className={`text-[14px] font-medium flex-1 ${linkFilter === 'linked' ? 'text-black' : ''}`}>Linked</span>
          <span className="text-[12px] font-medium text-gray-400">{linkedCount}</span>
        </button>

        <button
          onClick={() => setLinkFilter('unlinked')}
          className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-left transition-all border ${
            linkFilter === 'unlinked' ? 'bg-white border-[#D4E3F5] shadow-[0_1px_2px_rgba(0,0,0,0.04)] text-black' : 'border-transparent text-gray-800 hover:bg-[#E8F0FA]'
          }`}
        >
          <Unlink className="w-4 h-4 text-gray-500 shrink-0" />
          <span className={`text-[14px] font-medium flex-1 ${linkFilter === 'unlinked' ? 'text-black' : ''}`}>Unlinked</span>
          <span className="text-[12px] font-medium text-gray-400">{unlinkedCount}</span>
        </button>
      </div>
    </div>
  );
}

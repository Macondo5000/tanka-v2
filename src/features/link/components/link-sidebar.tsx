import { Link2, Unlink, PanelLeftClose, Search } from 'lucide-react';
import { useLinkStore } from '@/store/link-store';
import { SIDEBAR_WIDTH } from '@/lib/constants';
import { useUIStore } from '@/store/ui-store';

export function LinkSidebar() {
  const { apps, linkFilter, setLinkFilter } = useLinkStore();
  const toggleSidebar = useUIStore((s) => s.toggleSidebar);

  const linkedCount = apps.filter((a) => a.isConnected).length;
  const unlinkedCount = apps.filter((a) => !a.isConnected).length;

  return (
    <div className="h-full bg-[#FBFBF9] flex flex-col shrink-0" style={{ width: SIDEBAR_WIDTH }}>
      {/* Header */}
      <div className="px-4 pt-4 pb-2 shrink-0">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-[18px] font-bold tracking-tight">Link</h2>
          <div className="flex items-center gap-0.5">
            <button onClick={toggleSidebar} className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-[#ebebeb] transition-colors text-black">
              <PanelLeftClose className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-300" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-9 pr-3 py-2 bg-white border border-gray-200 rounded-lg text-[13px] font-medium placeholder:text-gray-300 outline-none focus:border-gray-300 focus:ring-2 focus:ring-gray-200/60 transition-all"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="px-2 py-2 space-y-0.5">
        <button
          onClick={() => setLinkFilter('linked')}
          className={`w-full flex items-center gap-2.5 px-2.5 py-2.5 rounded-lg text-left transition-all ${
            linkFilter === 'linked' ? 'bg-[#ebebeb] text-black' : 'text-gray-600 hover:bg-[#f0f0f0]'
          }`}
        >
          <Link2 className="w-4 h-4 text-gray-600 shrink-0" />
          <span className={`text-[13px] font-semibold flex-1 ${linkFilter === 'linked' ? 'text-black' : ''}`}>Linked</span>
          <span className="text-[11px] font-medium text-gray-400">{linkedCount}</span>
        </button>

        <button
          onClick={() => setLinkFilter('unlinked')}
          className={`w-full flex items-center gap-2.5 px-2.5 py-2.5 rounded-lg text-left transition-all ${
            linkFilter === 'unlinked' ? 'bg-[#ebebeb] text-black' : 'text-gray-600 hover:bg-[#f0f0f0]'
          }`}
        >
          <Unlink className="w-4 h-4 text-gray-600 shrink-0" />
          <span className={`text-[13px] font-semibold flex-1 ${linkFilter === 'unlinked' ? 'text-black' : ''}`}>Unlinked</span>
          <span className="text-[11px] font-medium text-gray-400">{unlinkedCount}</span>
        </button>
      </div>
    </div>
  );
}

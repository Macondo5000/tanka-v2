import { Outlet, useLocation } from 'react-router';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TopNav } from './top-nav';
import { OrgRail } from './org-rail';
import { useAppStore } from '@/store/app-store';
import { useUIStore } from '@/store/ui-store';
import { SPRING } from '@/lib/constants';

export function AppShell() {
  const location = useLocation();
  const setActiveModule = useAppStore((s) => s.setActiveModule);
  const orgRailCollapsed = useUIStore((s) => s.orgRailCollapsed);
  const [showBanner, setShowBanner] = useState(true);

  useEffect(() => {
    if (location.pathname.startsWith('/chat')) setActiveModule('chat');
    else setActiveModule('flow');
  }, [location.pathname, setActiveModule]);

  return (
    <div className="h-screen flex flex-col bg-[#EFF0EB] overflow-hidden">
      {/* Version update banner — full width top */}
      {showBanner && (
        <div className="shrink-0 px-2 pt-2">
          <div className="flex items-center justify-between px-4 py-2 rounded-xl bg-[#D7F5FE] border border-[#7DD3FC]">
            <p className="text-[13px] text-black">
              <span className="font-semibold">Tanka v2.4 is available</span>
              <span className="font-normal ml-1.5">— Includes AI Side Whisper, Smart Vote, and performance improvements.</span>
            </p>
            <div className="flex items-center gap-2 shrink-0 ml-4">
              <button
                onClick={() => setShowBanner(false)}
                className="px-3 py-1.5 rounded-lg text-[12px] font-semibold text-gray-500 hover:text-black hover:bg-black/5 transition-colors"
              >
                Skip
              </button>
              <button
                onClick={() => setShowBanner(false)}
                className="px-4 py-1.5 rounded-lg bg-black text-white text-[12px] font-semibold hover:bg-gray-800 transition-colors"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex-1 flex min-h-0">
        {/* Left: Org Rail — collapsible */}
        <AnimatePresence initial={false}>
          {!orgRailCollapsed && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 42, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={SPRING}
              className="h-full shrink-0 overflow-hidden"
            >
              <OrgRail />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Right: TopNav + Content */}
        <div className="flex-1 flex flex-col min-w-0 py-2">
          <TopNav />
          <main className="flex-1 overflow-hidden px-3 pb-3 pt-3">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}

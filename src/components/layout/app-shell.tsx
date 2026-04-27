import { Outlet, useLocation } from 'react-router';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronsRight, X } from 'lucide-react';
import { OrgRail } from './org-rail';
import { useAppStore } from '@/store/app-store';
import { useUIStore } from '@/store/ui-store';
import { SPRING } from '@/lib/constants';

const ease = [0.22, 1, 0.36, 1] as const;

export function AppShell() {
  const location = useLocation();
  const setActiveModule = useAppStore((s) => s.setActiveModule);
  const orgRailCollapsed = useUIStore((s) => s.orgRailCollapsed);
  const toggleOrgRail = useUIStore((s) => s.toggleOrgRail);
  const [showBanner, setShowBanner] = useState(true);

  useEffect(() => {
    if (location.pathname.startsWith('/chat')) setActiveModule('chat');
    else setActiveModule('flow');
  }, [location.pathname, setActiveModule]);

  return (
    <div className="h-screen flex flex-col bg-gradient-to-b from-[#E6F2FE] via-[#EFF6FF] to-white overflow-hidden">
      {/* Version update banner — refined */}
      <AnimatePresence>
        {showBanner && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease }}
            className="shrink-0 overflow-hidden"
          >
            <div className="flex items-center justify-between px-4 py-2 bg-white/70 backdrop-blur-sm border-b border-black/[0.06]">
              <p className="text-[12.5px] text-gray-600">
                <span className="font-semibold text-gray-800">Tanka v2.4 is available</span>
                <span className="ml-1.5 text-gray-500">— AI Side Whisper, Smart Vote, and performance improvements.</span>
              </p>
              <div className="flex items-center gap-1.5 shrink-0 ml-4">
                <button
                  onClick={() => setShowBanner(false)}
                  className="px-3 py-1 rounded-md text-[12px] font-medium text-gray-500 hover:bg-gray-100 transition-colors"
                >
                  Later
                </button>
                <button
                  onClick={() => setShowBanner(false)}
                  className="px-3 py-1 rounded-md bg-gray-900 text-white text-[12px] font-medium hover:bg-black transition-colors"
                >
                  Update
                </button>
                <button
                  onClick={() => setShowBanner(false)}
                  className="ml-1 w-6 h-6 flex items-center justify-center rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex-1 flex min-h-0">
        {/* Left: Org Rail — collapsible */}
        <AnimatePresence initial={false}>
          {!orgRailCollapsed && (
            <motion.div
              initial={{ width: 0, opacity: 0, overflow: 'hidden' }}
              animate={{ width: 42, opacity: 1, overflow: 'visible' }}
              exit={{ width: 0, opacity: 0, overflow: 'hidden' }}
              transition={SPRING}
              className="h-full shrink-0"
            >
              <OrgRail />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Expand button when org rail is collapsed */}
        {orgRailCollapsed && (
          <div className="h-full shrink-0 flex items-start pt-[29px] pl-1.5">
            <button
              onClick={toggleOrgRail}
              title="Show sidebar"
              className="w-6 h-6 rounded-md flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-black/[0.06] transition-colors"
            >
              <ChevronsRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Content with route transition */}
        <div className="flex-1 flex flex-col min-w-0 py-2">
          <main className="flex-1 overflow-hidden px-3 pb-3 pt-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18, ease }}
                className="h-full"
              >
                <Outlet />
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  );
}

import { Outlet, useLocation } from 'react-router';
import { useEffect } from 'react';
import { TopNav } from './top-nav';
import { OrgRail } from './org-rail';
import { useAppStore } from '@/store/app-store';

export function AppShell() {
  const location = useLocation();
  const setActiveModule = useAppStore((s) => s.setActiveModule);

  useEffect(() => {
    if (location.pathname.startsWith('/chat')) setActiveModule('chat');
    else setActiveModule('flow');
  }, [location.pathname, setActiveModule]);

  return (
    <div className="h-screen flex bg-[#f4f4f4] overflow-hidden">
      {/* Left: Org Rail */}
      <OrgRail />

      {/* Right: TopNav + Content */}
      <div className="flex-1 flex flex-col min-w-0 py-2">
        <TopNav />
        <main className="flex-1 overflow-hidden px-3 pb-3 pt-3">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

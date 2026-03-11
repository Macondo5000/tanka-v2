import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { ChevronDown, ArrowRight, Zap, CreditCard, LogOut, Building2, ChevronsRight } from 'lucide-react';
import { ORGS, useOrgStore } from '@/store/org-store';
import { useUIStore } from '@/store/ui-store';

export function TopNav() {
  const navigate = useNavigate();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const activeOrgId = useOrgStore((s) => s.activeOrgId);
  const activeOrg = ORGS.find((o) => o.id === activeOrgId) ?? ORGS[0];
  const { orgRailCollapsed, toggleOrgRail } = useUIStore();

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <header className="h-11 px-4 bg-[#E6F2FE] flex items-center justify-between sticky top-0 z-20 shrink-0">
      {/* Left: Toggle (only when collapsed) + Org tag */}
      <div className="flex items-center gap-1.5">
        {orgRailCollapsed && (
          <button
            title="Show sidebar"
            onClick={toggleOrgRail}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-black/[0.05] transition-colors shrink-0"
          >
            <ChevronsRight className="w-3.5 h-3.5" />
          </button>
        )}
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/[0.05] select-none max-w-full min-w-0">
          <Building2 className="w-3.5 h-3.5 text-gray-500 shrink-0" strokeWidth={2} />
          <span className="text-[13px] font-bold text-black tracking-tight truncate">{activeOrg.name}</span>
        </div>
      </div>

      {/* Right: User avatar */}
      <div ref={userMenuRef} className="flex justify-end relative">
        <button
          onClick={() => setUserMenuOpen(!userMenuOpen)}
          className="flex items-center gap-1.5 px-1.5 py-1 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <div className="w-7 h-7 rounded-full bg-gray-200 overflow-hidden shrink-0">
            <img src="/koko.jpg" alt="avatar" className="w-full h-full object-cover" />
          </div>
          <ChevronDown className="w-3.5 h-3.5 text-gray-400 shrink-0" />
        </button>

        {userMenuOpen && (
          <div className="absolute top-full right-0 mt-1.5 w-[300px] bg-white rounded-2xl border border-gray-100 shadow-2xl z-50 overflow-hidden">
            {/* Profile header */}
            <div className="px-5 pt-5 pb-4">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden shrink-0">
                  <img src="/koko.jpg" alt="avatar" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[15px] font-bold text-black tracking-tight">Koko Lv</p>
                  <p className="text-[12px] text-gray-400 font-medium truncate">ling.lv@tanka.ai</p>
                </div>
              </div>
              <button
                onClick={() => { setUserMenuOpen(false); navigate('/profile'); }}
                className="mt-3.5 w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-gray-200 text-[12px] font-semibold text-black hover:bg-[#F2F7FF] transition-colors"
              >
                View Profile
                <ArrowRight className="w-3.5 h-3.5 text-gray-400" />
              </button>
            </div>

            <div className="mx-4 border-t border-gray-100" />

            {/* Plan */}
            <div className="px-5 py-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Current Plan</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-[#F2F7FF]">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center">
                    <Zap className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-[13px] font-semibold text-black">Pro Plan</p>
                    <p className="text-[11px] text-gray-400 font-medium">3 of 5 seats used</p>
                  </div>
                </div>
                <button className="text-[11px] font-semibold text-emerald-600 hover:text-emerald-700 transition-colors">
                  Upgrade
                </button>
              </div>
            </div>

            <div className="mx-4 border-t border-gray-100" />

            {/* Personal shortcuts */}
            <div className="py-1.5">
              {[
                { icon: CreditCard, label: 'Billing' },
              ].map(({ icon: Icon, label }) => (
                <button
                  key={label}
                  className="w-full flex items-center gap-3 px-5 py-2.5 text-left text-[13px] font-medium text-gray-600 hover:bg-[#F2F7FF] transition-colors"
                >
                  <Icon className="w-4 h-4 text-gray-400" />
                  {label}
                </button>
              ))}
            </div>

            <div className="mx-4 border-t border-gray-100" />

            {/* Sign out */}
            <div className="py-1.5">
              <button className="w-full flex items-center gap-3 px-5 py-2.5 text-left text-[13px] font-medium text-red-500 hover:bg-red-50 transition-colors">
                <LogOut className="w-4 h-4" />
                Sign out
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

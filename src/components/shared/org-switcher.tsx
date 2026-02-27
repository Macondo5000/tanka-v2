import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

const ORGS = [
  { id: 'miromind', name: 'MiroMind', initial: 'M', color: 'bg-black' },
  { id: 'newsbang', name: 'Newsbang', initial: 'N', color: 'bg-violet-500' },
];

export function OrgSwitcher() {
  const [activeOrg, setActiveOrg] = useState(ORGS[0]);
  const [orgOpen, setOrgOpen] = useState(false);
  const orgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (orgRef.current && !orgRef.current.contains(e.target as Node)) {
        setOrgOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={orgRef} className="relative px-3 py-3 border-t border-gray-200 shrink-0">
      <button
        onClick={() => setOrgOpen(!orgOpen)}
        className="w-full flex items-center gap-2.5 px-2 py-2 rounded-lg hover:bg-gray-100 transition-colors"
      >
        <div className={`w-6 h-6 rounded ${activeOrg.color} flex items-center justify-center shrink-0`}>
          <span className="text-[11px] font-bold text-white">{activeOrg.initial}</span>
        </div>
        <span className="text-[13px] font-semibold text-black tracking-tight flex-1 text-left truncate">{activeOrg.name}</span>
        <ChevronDown className="w-3.5 h-3.5 text-gray-400 shrink-0" />
      </button>

      {orgOpen && (
        <div className="absolute bottom-full left-3 right-3 mb-1.5 bg-white rounded-xl border border-gray-100 shadow-lg py-1.5 z-50">
          <div className="px-3 py-1.5">
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Organization</span>
          </div>
          {ORGS.map((org) => (
            <button
              key={org.id}
              onClick={() => { setActiveOrg(org); setOrgOpen(false); }}
              className="w-full flex items-center gap-2.5 px-3 py-2 hover:bg-gray-50 transition-colors"
            >
              <div className={`w-5 h-5 rounded ${org.color} flex items-center justify-center`}>
                <span className="text-[10px] font-bold text-white">{org.initial}</span>
              </div>
              <span className="text-[13px] font-medium text-black flex-1 text-left">{org.name}</span>
              {activeOrg.id === org.id && (
                <Check className="w-3.5 h-3.5 text-black" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

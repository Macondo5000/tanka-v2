import { motion } from 'motion/react';
import type { LinkedApp } from '@/types/link';
import { EASE_SMOOTH } from '@/lib/constants';

interface AppCardProps {
  app: LinkedApp;
  index: number;
  onClick: () => void;
}

export function AppCard({ app, index, onClick }: AppCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03, ease: EASE_SMOOTH }}
      onClick={onClick}
      className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 bg-white cursor-pointer hover:bg-gray-50/50 active:scale-[0.98] transition-all"
    >
      <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0 flex items-center justify-center">
        <img src={app.icon} alt={app.name} className="w-full h-full object-cover" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h4 className="text-[13px] font-semibold text-black truncate">{app.name}</h4>
          {app.isConnected && (
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
          )}
        </div>
        <p className="text-[11px] text-gray-400 font-medium mt-0.5">{app.category}</p>
      </div>
      {app.isConnected ? (
        <span className="px-3 py-1 rounded-md text-[11px] font-semibold text-gray-500 bg-gray-100 shrink-0">
          View
        </span>
      ) : (
        <span className="px-3 py-1 rounded-md text-[11px] font-semibold text-white bg-black shrink-0">
          Link
        </span>
      )}
    </motion.div>
  );
}

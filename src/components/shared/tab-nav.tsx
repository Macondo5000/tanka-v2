import { motion } from 'motion/react';
import { SPRING_TAB } from '@/lib/constants';

interface Tab {
  key: string;
  label: string;
  badge?: number;
}

interface TabNavProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (key: string) => void;
  layoutId?: string;
}

export function TabNav({ tabs, activeTab, onTabChange, layoutId = 'tab-underline' }: TabNavProps) {
  return (
    <div className="flex gap-6">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onTabChange(tab.key)}
          className={`relative pb-3 pt-2 text-[14px] font-semibold text-center transition-colors ${
            activeTab === tab.key ? 'text-black' : 'text-gray-400'
          }`}
        >
          {tab.label}
          {tab.badge != null && tab.badge > 0 && (
            <span className="absolute -top-0.5 -right-2 w-2 h-2 bg-red-500 rounded-full" />
          )}
          {activeTab === tab.key && (
            <motion.div
              layoutId={layoutId}
              className="absolute bottom-0 left-0 right-0 h-[2px] bg-black rounded-full"
              transition={SPRING_TAB}
            />
          )}
        </button>
      ))}
    </div>
  );
}

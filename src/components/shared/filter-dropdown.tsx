import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Check } from 'lucide-react';

interface FilterOption {
  key: string;
  label: string;
  icon?: React.ReactNode;
}

interface FilterDropdownProps {
  label: string;
  value: string;
  options: FilterOption[];
  isOpen: boolean;
  onToggle: () => void;
  onSelect: (key: string) => void;
}

export function FilterDropdown({ value, options, isOpen, onToggle, onSelect }: FilterDropdownProps) {
  const selected = options.find((o) => o.key === value);

  return (
    <div className="relative">
      <button
        onClick={(e) => { e.stopPropagation(); onToggle(); }}
        className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[12px] font-semibold transition-all active:scale-95 ${
          value !== options[0]?.key
            ? 'bg-white text-black border border-gray-200'
            : 'bg-gray-100 text-black border border-gray-200'
        }`}
      >
        {selected?.label || 'All'}
        <ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.95 }}
            transition={{ duration: 0.12 }}
            className="absolute top-full left-0 mt-1.5 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-40 min-w-[140px] py-1"
          >
            {options.map((opt) => (
              <button
                key={opt.key}
                onClick={(e) => { e.stopPropagation(); onSelect(opt.key); }}
                className={`w-full flex items-center justify-between gap-3 px-3 py-2.5 text-left text-[12px] font-medium transition-colors ${
                  value === opt.key ? 'text-black' : 'text-gray-500 hover:bg-gray-50'
                }`}
              >
                <span className="flex items-center gap-2">
                  {opt.icon}
                  {opt.label}
                </span>
                {value === opt.key && <Check className="w-3.5 h-3.5 text-black shrink-0" strokeWidth={2.5} />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

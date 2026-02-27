import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

/**
 * Unified modal sizes:
 *   sm  — 420px  (simple confirmations, app detail, single-focus content)
 *   md  — 560px  (lists, artifacts, timeline)
 *   lg  — 720px  (complex forms, multi-section content)
 */
const SIZE_MAP = {
  sm: 'max-w-[420px]',
  md: 'max-w-[560px]',
  lg: 'max-w-[720px]',
} as const;

type ModalSize = keyof typeof SIZE_MAP;

interface ModalProps {
  open: boolean;
  onClose: () => void;
  size?: ModalSize;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export function Modal({ open, onClose, size = 'md', title, subtitle, children }: ModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 bg-black/20 z-[60]"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.2, ease: [0.2, 0, 0, 1] }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-8 pointer-events-none"
          >
            <div
              className={`bg-white rounded-2xl shadow-2xl w-full ${SIZE_MAP[size]} max-h-[75vh] flex flex-col pointer-events-auto`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="px-6 pt-5 pb-4 shrink-0 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="min-w-0">
                    <h3 className="text-[18px] font-bold tracking-tight text-black truncate">{title}</h3>
                    {subtitle && (
                      <p className="text-[14px] text-gray-400 font-medium mt-0.5 truncate">{subtitle}</p>
                    )}
                  </div>
                  <button
                    onClick={onClose}
                    className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#f0f0f0] transition-colors shrink-0 ml-4"
                  >
                    <X className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
              </div>

              {/* Body — scrollable */}
              <div className="flex-1 overflow-y-auto no-scrollbar">
                {children}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

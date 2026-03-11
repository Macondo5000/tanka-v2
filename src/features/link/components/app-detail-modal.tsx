import { Check } from 'lucide-react';
import { Modal } from '@/components/shared/modal';
import type { LinkedApp } from '@/types/link';

interface AppDetailModalProps {
  app: LinkedApp | null;
  onClose: () => void;
  onToggleConnection: (id: string) => void;
}

export function AppDetailModal({ app, onClose, onToggleConnection }: AppDetailModalProps) {
  return (
    <Modal
      open={!!app}
      onClose={onClose}
      size="sm"
      title={app?.name ?? ''}
      subtitle={app?.category}
    >
      {app && (
        <>
          {/* App icon + status */}
          <div className="px-6 pt-4 pb-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 flex items-center justify-center">
                <img src={app.icon} alt={app.name} className="w-full h-full object-cover" />
              </div>
              <div>
                {app.isConnected && (
                  <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-emerald-50 rounded-lg w-fit">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span className="text-[12px] font-semibold text-emerald-700">
                      Connected{app.connectedAt ? ` since ${app.connectedAt}` : ''}
                    </span>
                  </div>
                )}
                {!app.isConnected && (
                  <span className="text-[12px] font-medium text-gray-400">Not connected</span>
                )}
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="px-6 pb-4">
            <p className="text-[14px] text-gray-500 leading-relaxed">{app.description}</p>
          </div>

          {/* Features */}
          {app.features && app.features.length > 0 && (
            <div className="px-6 pb-5">
              <h4 className="text-[12px] font-bold uppercase tracking-widest text-gray-400 mb-2.5">Features</h4>
              <div className="space-y-2">
                {app.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-gray-300 shrink-0" />
                    <span className="text-[14px] text-gray-600 font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-2.5">
            <button
              onClick={onClose}
              className="px-4 py-2.5 text-[14px] font-semibold text-gray-500 rounded-lg border border-gray-200 hover:bg-[#F2F7FF] transition-colors"
            >
              Cancel
            </button>
            {app.isConnected ? (
              <button
                onClick={() => onToggleConnection(app.id)}
                className="px-6 py-2.5 text-[14px] font-semibold text-red-500 rounded-lg border border-red-200 hover:bg-red-50 transition-colors"
              >
                Disconnect App
              </button>
            ) : (
              <button
                onClick={() => onToggleConnection(app.id)}
                className="px-6 py-2.5 text-[14px] font-semibold text-white bg-black rounded-lg hover:bg-gray-800 transition-colors"
              >
                Connect App
              </button>
            )}
          </div>
        </>
      )}
    </Modal>
  );
}

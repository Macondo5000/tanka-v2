import { ArrowLeft, Link2, Unlink, Check } from 'lucide-react';
import type { LinkedApp } from '@/types/link';

interface LinkDetailProps {
  app: LinkedApp;
  onBack: () => void;
  onToggleConnection: (id: string) => void;
}

export function LinkDetail({ app, onBack, onToggleConnection }: LinkDetailProps) {
  return (
    <div className="h-full overflow-y-auto no-scrollbar">
      <div className="max-w-[800px] mx-auto px-8 py-8">
        {/* Back */}
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-[13px] font-medium text-gray-400 hover:text-gray-600 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        {/* Card */}
        <div className="border border-gray-200 rounded-2xl p-8">
          {/* App + Tanka combo */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center gap-4">
              {/* App icon */}
              <div className="w-16 h-16 rounded-2xl overflow-hidden shrink-0 shadow-sm">
                <img src={app.icon} alt={app.name} className="w-full h-full object-cover" />
              </div>

              {/* Connection line */}
              <div className="flex items-center gap-1.5">
                <div className="w-8 h-px bg-gray-200" />
                <div className="w-6 h-6 rounded-full bg-[#ebebeb] flex items-center justify-center">
                  <Link2 className="w-3 h-3 text-gray-400" />
                </div>
                <div className="w-8 h-px bg-gray-200" />
              </div>

              {/* Tanka icon */}
              <div className="w-16 h-16 rounded-2xl bg-black flex items-center justify-center shrink-0 shadow-sm">
                <svg width="24" height="22" viewBox="0 0 258 229" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M72.5 228.126V187.545H0L72.5 228.126Z" fill="white"/>
                  <path fillRule="evenodd" clipRule="evenodd" d="M0 130.784L257.778 130.733L257.766 187.546H0V130.784Z" fill="white"/>
                  <path fillRule="evenodd" clipRule="evenodd" d="M0 65.8042H257.778V122.617H0V65.8042Z" fill="white"/>
                  <path fillRule="evenodd" clipRule="evenodd" d="M0 0.874023H185.278V57.6868H0V0.874023Z" fill="white"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Title + description */}
          <div className="text-center mb-8">
            <h2 className="text-[20px] font-bold text-black tracking-tight mb-2">
              {app.name} × Tanka
            </h2>
            <p className="text-[14px] text-gray-400 leading-relaxed max-w-[480px] mx-auto">
              {app.description}
            </p>
          </div>

          {/* Action button */}
          <div className="flex justify-center mb-8">
            {app.isConnected ? (
              <button
                onClick={() => onToggleConnection(app.id)}
                className="flex items-center gap-2 px-6 py-2.5 text-[14px] font-semibold text-gray-500 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <Unlink className="w-4 h-4" />
                Disconnect
              </button>
            ) : (
              <button
                onClick={() => onToggleConnection(app.id)}
                className="flex items-center gap-2 px-6 py-2.5 text-[14px] font-semibold text-white bg-black rounded-lg hover:bg-gray-800 transition-colors"
              >
                <Link2 className="w-4 h-4" />
                Connect {app.name}
              </button>
            )}
          </div>

          {/* Status */}
          {app.isConnected && (
            <div className="flex justify-center mb-8">
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 rounded-lg">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span className="text-[12px] font-semibold text-emerald-700">
                  Connected{app.connectedAt ? ` since ${app.connectedAt}` : ''}
                </span>
              </div>
            </div>
          )}

          {/* Features */}
          {app.features && app.features.length > 0 && (
            <div className="max-w-[480px] mx-auto">
              <h4 className="text-[12px] font-bold uppercase tracking-widest text-gray-400 mb-3">What you get</h4>
              <div className="space-y-2.5">
                {app.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <div className="w-5 h-5 rounded-md bg-[#f0f0f0] flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 text-gray-400" />
                    </div>
                    <span className="text-[14px] text-gray-600 font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

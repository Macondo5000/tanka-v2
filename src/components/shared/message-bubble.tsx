import { Lightbulb } from 'lucide-react';
import type { User } from '@/types/common';

interface MessageBubbleProps {
  role: 'user' | 'assistant' | 'peer';
  content: string;
  isProactive?: boolean;
  timestamp?: string;
  sender?: User;
}

export function MessageBubble({ role, content, isProactive, timestamp, sender }: MessageBubbleProps) {
  if (role === 'user') {
    return (
      <div className="flex flex-col items-end gap-1">
        {timestamp && <span className="text-[10px] text-gray-400 px-1">{timestamp}</span>}
        <div className="max-w-[75%] w-fit px-4 py-2.5 rounded-2xl text-[14px] leading-relaxed font-semibold bg-[#ebebeb] text-black rounded-tr-none">
          {content}
        </div>
      </div>
    );
  }

  if (role === 'peer') {
    return (
      <div className="flex items-start gap-2.5">
        {sender && (
          sender.avatar ? (
            <img src={sender.avatar} alt={sender.name} className="w-8 h-8 rounded-full object-cover ring-1 ring-black/5 shrink-0 mt-0.5" />
          ) : (
            <div className="w-8 h-8 rounded-full bg-[#e4e4e4] flex items-center justify-center ring-1 ring-black/5 shrink-0 mt-0.5">
              <span className="text-[11px] font-bold text-[#888888]">
                {sender.name.split(' ').map(w => w[0]).join('').slice(0, 2)}
              </span>
            </div>
          )
        )}
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 px-1">
            {sender && <span className="text-[13px] text-gray-500 font-semibold">{sender.name}</span>}
            {timestamp && <span className="text-[11px] text-gray-400">{timestamp}</span>}
          </div>
          <div className="max-w-[75%] w-fit px-4 py-2.5 rounded-2xl rounded-tl-none bg-white border border-gray-200 text-[14px] leading-relaxed font-medium text-[#3C3C3C]">
            {content}
          </div>
        </div>
      </div>
    );
  }

  if (isProactive) {
    return (
      <div className="flex flex-col items-start gap-1 w-full max-w-[480px]">
        {timestamp && <span className="text-[10px] text-gray-400 px-1">{timestamp}</span>}
        <div className="bg-purple-50/50 border border-purple-100/50 rounded-xl px-4 py-4 w-full">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-5 h-5 rounded-md bg-purple-100 flex items-center justify-center">
              <Lightbulb className="w-3 h-3 text-purple-600 fill-purple-600" />
            </div>
            <span className="text-[10px] font-bold text-purple-600 uppercase tracking-widest">AI initiated</span>
          </div>
          <div className="text-[14px] leading-[1.6] font-medium text-purple-900/80 tracking-tight">
            {content}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-start gap-1 max-w-[85%]">
      {timestamp && <span className="text-[10px] text-gray-400 px-1">{timestamp}</span>}
      <div className="px-0.5 py-1">
        <div className="text-[14px] leading-[1.6] font-medium text-[#3C3C3C] tracking-tight">
          {content}
        </div>
      </div>
    </div>
  );
}

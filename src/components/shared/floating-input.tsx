import { useState } from 'react';

interface FloatingInputProps {
  placeholder?: string;
  onSend?: (message: string) => void;
  disabled?: boolean;
  inline?: boolean;
}

export function FloatingInput({ placeholder = 'Type a message...', onSend, disabled, inline }: FloatingInputProps) {
  const [value, setValue] = useState('');
  const [focused, setFocused] = useState(false);

  const handleSend = () => {
    if (!value.trim() || disabled) return;
    onSend?.(value.trim());
    setValue('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className={inline ? '' : 'shrink-0 pb-4 pt-1'}>
      <div className={inline ? '' : 'max-w-[800px] mx-auto px-8'}>
        <div
          className={`relative rounded-2xl border bg-white transition-all ${
            focused
              ? 'border-gray-400 ring-4 ring-black/[0.03]'
              : 'border-[#d0d0d0]'
          }`}
        >
          <textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled}
            rows={1}
            className="w-full resize-none bg-transparent px-5 pt-4 pb-14 text-[14px] text-black placeholder:text-gray-300 font-medium tracking-tight outline-none"
            style={{ minHeight: 56, maxHeight: 160 }}
            onInput={(e) => {
              const t = e.currentTarget;
              t.style.height = 'auto';
              t.style.height = Math.min(t.scrollHeight, 160) + 'px';
            }}
          />

          <div className="absolute bottom-0 inset-x-0 flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-1">
              {/* Voice */}
              <button className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="7.75" y="1.75" width="8.5" height="12.5" rx="4.25" stroke="#4B5563" strokeWidth="1.5"/>
                  <path d="M4 11L4.01005 11.0704C4.57808 15.0466 7.98343 18 12 18C16.0166 18 19.4219 15.0466 19.9899 11.0704L20 11" stroke="#4B5563" strokeWidth="1.5"/>
                  <path d="M12 18V23" stroke="#4B5563" strokeWidth="1.5"/>
                </svg>
              </button>
              {/* Poll */}
              <button className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 17.5V11" stroke="#4B5563" strokeWidth="1.5"/>
                  <path d="M12 17.5V6.5" stroke="#4B5563" strokeWidth="1.5"/>
                  <path d="M19 17.5V3" stroke="#4B5563" strokeWidth="1.5"/>
                  <path d="M3 21H21" stroke="#4B5563" strokeWidth="1.5"/>
                </svg>
              </button>
              {/* Screenshot */}
              <button className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5.53033 2.46967C5.23744 2.17678 4.76256 2.17678 4.46967 2.46967C4.17678 2.76256 4.17678 3.23744 4.46967 3.53033L5 3L5.53033 2.46967ZM5 3L4.46967 3.53033L15.4697 14.5303L16 14L16.5303 13.4697L5.53033 2.46967L5 3Z" fill="#4B5563"/>
                  <path d="M19 3L8.5 13.5" stroke="#4B5563" strokeWidth="1.5" strokeLinecap="round"/>
                  <circle cx="18" cy="16.5" r="3.25" stroke="#4B5563" strokeWidth="1.5"/>
                  <circle cx="6" cy="16.5" r="3.25" stroke="#4B5563" strokeWidth="1.5"/>
                </svg>
              </button>
              {/* File */}
              <button className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 4H10.2L12.7714 6.93939H20C20.5523 6.93939 21 7.38711 21 7.93939V19C21 19.5523 20.5523 20 20 20H4C3.44772 20 3 19.5523 3 19V5C3 4.44772 3.44772 4 4 4Z" stroke="#4B5563" strokeWidth="1.5"/>
                </svg>
              </button>
            </div>
            <button
              onClick={handleSend}
              disabled={!value.trim() || disabled}
              className={`flex items-center justify-center transition-all active:scale-95 ${
                value.trim()
                  ? 'text-[#4B5563] hover:text-[#374151]'
                  : 'text-gray-300'
              }`}
            >
              <svg width="20" height="20" viewBox="0 0 19 19" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.5825 0.396566L4.5525 3.39657C-1.5175 5.42657 -1.5175 8.73657 4.5525 10.7566L7.2325 11.6466L8.1225 14.3266C10.1425 20.3966 13.4625 20.3966 15.4825 14.3266L18.4925 5.30657C19.8325 1.25657 17.6325 -0.953434 13.5825 0.396566ZM13.9025 5.77657L10.1025 9.59657C9.9525 9.74657 9.7625 9.81657 9.5725 9.81657C9.3825 9.81657 9.1925 9.74657 9.0425 9.59657C8.90302 9.45543 8.8248 9.265 8.8248 9.06657C8.8248 8.86814 8.90302 8.6777 9.0425 8.53657L12.8425 4.71657C13.1325 4.42657 13.6125 4.42657 13.9025 4.71657C14.1925 5.00657 14.1925 5.48657 13.9025 5.77657Z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

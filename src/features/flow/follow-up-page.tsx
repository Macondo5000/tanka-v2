import { CalendarCheck } from 'lucide-react';

export function FollowUpPage() {
  return (
    <div className="h-full flex flex-col items-center justify-center bg-[#F0F7FF]">
      <div className="w-12 h-12 rounded-2xl bg-[#E8F0FA] flex items-center justify-center mb-4">
        <CalendarCheck className="w-6 h-6 text-gray-400" />
      </div>
      <h3 className="text-[16px] font-bold tracking-tight text-black">Follow-up</h3>
      <p className="text-[13px] text-gray-400 font-medium mt-1">Track and manage your pending follow-ups.</p>
    </div>
  );
}

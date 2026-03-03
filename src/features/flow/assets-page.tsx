import { FolderOpen } from 'lucide-react';

export function AssetsPage() {
  return (
    <div className="h-full flex flex-col items-center justify-center bg-[#FBFBF9]">
      <div className="w-12 h-12 rounded-2xl bg-[#f0f0f0] flex items-center justify-center mb-4">
        <FolderOpen className="w-6 h-6 text-gray-400" />
      </div>
      <h3 className="text-[16px] font-bold tracking-tight text-black">Assets</h3>
      <p className="text-[13px] text-gray-400 font-medium mt-1">All your files, documents, and resources in one place.</p>
    </div>
  );
}

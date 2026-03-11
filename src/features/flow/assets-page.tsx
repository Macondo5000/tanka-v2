import { FolderOpen } from 'lucide-react';

export function AssetsPage() {
  return (
    <div className="h-full flex flex-col items-center justify-center bg-gradient-to-b from-[#F0F7FF] to-white pb-[8%]">
      <div className="w-16 h-16 rounded-2xl bg-[#E8F0FA] flex items-center justify-center mb-5">
        <FolderOpen className="w-8 h-8 text-gray-400" />
      </div>
      <h3 className="text-[24px] font-medium tracking-tight text-black" style={{ fontFamily: "'Roboto Serif', Georgia, serif" }}>Assets</h3>
      <p className="text-[15px] text-gray-400 font-normal mt-2">All your files, documents, and resources in one place.</p>
    </div>
  );
}

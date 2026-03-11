import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, ChevronDown, ChevronUp, Plus, Loader2, Pencil, Camera } from 'lucide-react';
import { Modal } from '@/components/shared/modal';

/* ── Mock data ── */

const CORE_RESPONSIBILITIES = [
  { id: 1, text: '建立 PRD-接口协议-提测上线的设计评审机制，跟踪技术变更对体验影响。' },
  { id: 2, text: '定义 Tanka AI 长期记忆的体验标准与信息架构，确保可检索可依赖。' },
  { id: 3, text: '建立输入框、链接等关键组件设计规范与评审机制，统一跨端交互体验。' },
  { id: 4, text: '定义小助手与后端交互协议及接口规范，保障 Workspace 卡片状态一致。' },
  { id: 5, text: '主导 Tanka AI Work 改版体验与业务逻辑协同落地，确保长期记忆可用。' },
  { id: 6, text: '建立公司级设计角色使命与核心职责体系，统一评审标准与交付流程。' },
  { id: 7, text: '主导 AI 算法接口与数据访问规则对齐，保障隐私合规与可用性。' },
  { id: 8, text: '定义 AI 对话产品的初始化与默认状态规范，确保跨组织切换体验一致。' },
];

const KEY_ACHIEVEMENTS = [
  { id: 1, text: '建立团队 Mobbin 共享账号并发出加入链接；确定 Blog 配图桌面/手机最简展示方案，规范设计稿命名与通过标记' },
  { id: 2, text: '完成小助手服务部署至 UAT 并自测验证基础问题改善；推动三端提测与验收，明确生产白名单与群二维码共享' },
  { id: 3, text: '对齐项目需求上线节奏变更至 1 月 8 日，更新团队交付计划与验收安排，确保依赖方同步调整' },
];

const TRAIT_TAGS = [
  'Systems Thinker', 'Detail-Oriented', 'Cross-Functional', 'AI-Native', 'Design Leadership',
];

/* ── Types ── */

interface ProfileData {
  firstName: string;
  lastName: string;
  realName: string;
  team: string;
  role: string;
  about: string;
  supervisor: string;
}

/* ── Components ── */

function SectionCard({ title, children, action }: { title: string; children: React.ReactNode; action?: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      <div className="flex items-center justify-between px-6 pt-5 pb-3">
        <h3 className="text-[14px] font-bold text-black tracking-tight">{title}</h3>
        {action}
      </div>
      <div className="px-6 pb-5">
        {children}
      </div>
    </div>
  );
}

function EditField({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <div className="flex items-center gap-4 py-3 border-b border-gray-50 last:border-0">
      <label className="w-28 shrink-0 text-[13px] font-semibold text-gray-400">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || `Enter ${label.toLowerCase()}`}
        className="flex-1 text-[14px] font-medium text-black placeholder:text-gray-300 bg-transparent outline-none border-none"
      />
    </div>
  );
}

function EditTextarea({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <div className="flex gap-4 py-3 border-b border-gray-50 last:border-0">
      <label className="w-28 shrink-0 text-[13px] font-semibold text-gray-400 pt-0.5">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || `Enter ${label.toLowerCase()}`}
        rows={3}
        className="flex-1 text-[14px] font-medium text-black placeholder:text-gray-300 bg-transparent outline-none border-none resize-none leading-relaxed"
      />
    </div>
  );
}

function ProfileEditModal({ open, onClose, profile, onSave }: { open: boolean; onClose: () => void; profile: ProfileData; onSave: (data: ProfileData) => void }) {
  const [draft, setDraft] = useState<ProfileData>(profile);

  const update = (key: keyof ProfileData) => (value: string) => {
    setDraft((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    onSave(draft);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} size="md" title="Edit Profile" subtitle="Update your personal information">
      {/* Avatar section */}
      <div className="px-6 pt-5 pb-4 flex items-center gap-4 border-b border-gray-50">
        <div className="relative group">
          <div className="w-14 h-14 rounded-full bg-gray-200 overflow-hidden shrink-0 ring-2 ring-gray-100">
            <img src="/koko.jpg" alt="avatar" className="w-full h-full object-cover" />
          </div>
          <button className="absolute inset-0 rounded-full bg-black/0 group-hover:bg-black/40 flex items-center justify-center transition-colors">
            <Camera className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        </div>
        <button className="text-[13px] font-semibold text-emerald-600 hover:text-emerald-700 transition-colors">
          Set New Photo
        </button>
      </div>

      {/* Fields */}
      <div className="px-6 py-2">
        <EditField label="First Name" value={draft.firstName} onChange={update('firstName')} />
        <EditField label="Last Name" value={draft.lastName} onChange={update('lastName')} />
        <EditField label="Real Name" value={draft.realName} onChange={update('realName')} />
        <EditField label="Team" value={draft.team} onChange={update('team')} />
        <EditField label="Role" value={draft.role} onChange={update('role')} />
        <EditTextarea label="About" value={draft.about} onChange={update('about')} placeholder="Tell us about yourself" />
        <EditField label="Supervisor" value={draft.supervisor} onChange={update('supervisor')} placeholder="Not Specified" />
      </div>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-end gap-2.5">
        <button
          onClick={onClose}
          className="px-4 py-2.5 text-[14px] font-semibold text-gray-500 rounded-lg border border-gray-200 hover:bg-[#F2F7FF] transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="px-6 py-2.5 text-[14px] font-semibold text-white bg-black rounded-lg hover:bg-gray-800 transition-colors"
        >
          Save Changes
        </button>
      </div>
    </Modal>
  );
}

/* ── Main Page ── */

export function ProfilePage() {
  const navigate = useNavigate();
  const [showAllResponsibilities, setShowAllResponsibilities] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const visibleResponsibilities = showAllResponsibilities ? CORE_RESPONSIBILITIES : CORE_RESPONSIBILITIES.slice(0, 5);

  const [profile, setProfile] = useState<ProfileData>({
    firstName: 'Ling',
    lastName: 'Lv',
    realName: 'Ling Lv',
    team: 'Design',
    role: 'Tanka Design VP',
    about: '我是 Tanka 的产品设计师，致力于通过极致的交互设计让 AI 变得触手可及。',
    supervisor: '',
  });

  return (
    <div className="h-screen flex flex-col bg-[#f4f4f4]">
      {/* Header */}
      <header className="h-11 px-6 bg-[#f4f4f4] flex items-center sticky top-0 z-20 shrink-0">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-[13px] font-semibold text-gray-500 hover:text-black hover:bg-white transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto no-scrollbar">
        <div className="max-w-[680px] mx-auto px-6 py-6 space-y-4">

          {/* Profile header card — preview */}
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <div className="px-6 pt-6 pb-5">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden shrink-0 ring-2 ring-gray-100">
                  <img src="/koko.jpg" alt="avatar" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <h1 className="text-[22px] font-bold text-black tracking-tight">
                    {profile.firstName} {profile.lastName}
                  </h1>
                  <p className="text-[13px] text-gray-400 font-medium mt-0.5">{profile.role}</p>
                  {profile.about && (
                    <p className="text-[12px] text-gray-400 font-medium mt-1 truncate">{profile.about}</p>
                  )}
                </div>
                <button
                  onClick={() => setEditOpen(true)}
                  className="w-8 h-8 rounded-lg bg-[#E8F0FA] flex items-center justify-center hover:bg-[#D2E1F2] transition-colors shrink-0"
                >
                  <Pencil className="w-3.5 h-3.5 text-gray-500" />
                </button>
              </div>
            </div>
          </div>

          {/* Leverage Dashboard */}
          <SectionCard title="Leverage Dashboard">
            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[12px] font-semibold text-gray-500">Overall Leverage Score</span>
                </div>
                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-[#F2F7FF]">
                  <Loader2 className="w-5 h-5 text-emerald-500 animate-spin" />
                  <div>
                    <p className="text-[13px] font-semibold text-black">Generating</p>
                    <p className="text-[11px] text-gray-400 font-medium">AI is analyzing your work patterns...</p>
                  </div>
                </div>
              </div>
            </div>
          </SectionCard>

          {/* Trait Profile */}
          <SectionCard title="Trait Profile">
            <div className="flex flex-wrap gap-2">
              {TRAIT_TAGS.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 rounded-lg bg-[#E8F0FA] text-[12px] font-semibold text-gray-600"
                >
                  {tag}
                </span>
              ))}
            </div>
          </SectionCard>

          {/* Core Responsibilities */}
          <SectionCard
            title="Core Responsibilities"
            action={
              <button className="w-6 h-6 rounded-md bg-[#E8F0FA] flex items-center justify-center hover:bg-[#D2E1F2] transition-colors">
                <Plus className="w-3.5 h-3.5 text-gray-500" />
              </button>
            }
          >
            <div className="space-y-0">
              {visibleResponsibilities.map((item, idx) => (
                <div key={item.id} className="flex gap-3 py-2.5 border-b border-gray-50 last:border-0">
                  <span className="text-[11px] font-bold text-gray-300 mt-0.5 w-5 shrink-0 text-right">{idx + 1}</span>
                  <p className="text-[13px] text-gray-600 font-medium leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
            {CORE_RESPONSIBILITIES.length > 5 && (
              <button
                onClick={() => setShowAllResponsibilities(!showAllResponsibilities)}
                className="mt-3 flex items-center gap-1.5 text-[12px] font-semibold text-gray-400 hover:text-black transition-colors"
              >
                {showAllResponsibilities ? (
                  <>Show less <ChevronUp className="w-3.5 h-3.5" /></>
                ) : (
                  <>Show more ({CORE_RESPONSIBILITIES.length - 5} more) <ChevronDown className="w-3.5 h-3.5" /></>
                )}
              </button>
            )}
          </SectionCard>

          {/* Key Achievements */}
          <SectionCard
            title="Key Achievements"
            action={
              <button className="w-6 h-6 rounded-md bg-[#E8F0FA] flex items-center justify-center hover:bg-[#D2E1F2] transition-colors">
                <Plus className="w-3.5 h-3.5 text-gray-500" />
              </button>
            }
          >
            <div className="space-y-0">
              {KEY_ACHIEVEMENTS.map((item) => (
                <div key={item.id} className="flex gap-3 py-2.5 border-b border-gray-50 last:border-0">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                  <p className="text-[13px] text-gray-600 font-medium leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </SectionCard>

          {/* Bottom padding */}
          <div className="h-6" />
        </div>
      </div>

      {/* Edit Profile Modal */}
      <ProfileEditModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        profile={profile}
        onSave={setProfile}
      />
    </div>
  );
}

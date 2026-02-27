import { useState, useRef, useEffect } from 'react';
import { Plus, Settings, Building2, UserPlus, Shield, Languages, Bell, Palette, Image, Brain, Sparkles, LifeBuoy, Camera, Link2, Users, Check } from 'lucide-react';
import { Modal } from '@/components/shared/modal';

const ORGS = [
  { id: 'miromind', name: 'MiroMind', initial: 'M', bg: 'bg-white border border-gray-200', text: 'text-black', unreadCount: 0 },
  { id: 'newsbang', name: 'Newsbang', initial: 'N', bg: 'bg-violet-500', text: 'text-white', unreadCount: 5 },
  { id: 'arcflow', name: 'ArcFlow', initial: 'A', bg: 'bg-blue-500', text: 'text-white', unreadCount: 12 },
  { id: 'sundial', name: 'Sundial Studio', initial: 'S', bg: 'bg-amber-500', text: 'text-white', unreadCount: 0 },
  { id: 'kairoslab', name: 'Kairos Lab', initial: 'K', bg: 'bg-emerald-600', text: 'text-white', unreadCount: 3 },
];

const SETTINGS_ITEMS = [
  { key: 'privacy', icon: Shield, label: 'Privacy & Security' },
  { key: 'translation', icon: Languages, label: 'Translation' },
  { key: 'notifications', icon: Bell, label: 'Notifications' },
  { key: 'appearance', icon: Palette, label: 'Appearance' },
  { key: 'background', icon: Image, label: 'Background' },
  { key: 'memory', icon: Brain, label: 'Memory & Language' },
  { key: 'ai', icon: Sparkles, label: 'AI Settings' },
  { key: 'support', icon: LifeBuoy, label: 'Support' },
];

const AI_SETTINGS = [
  { key: 'smartReply', label: 'Smart Reply Suggestions', desc: 'Show suggested replies below messages in chat.' },
  { key: 'smartInline', label: 'Smart Reply Inline', desc: 'Get inline suggestions as you type in the input box.' },
  { key: 'smartFollowup', label: 'Smart Follow-up', desc: 'Automatically accept AI follow-ups based on chat context.' },
  { key: 'smartVote', label: 'Smart Vote', desc: 'Show suggested votes in chat based on context.' },
  { key: 'autoSegment', label: 'AI Auto-Segmented Replies', desc: 'Smart replies will be automatically segmented by AI and sent separately.' },
  { key: 'sideWhisper', label: 'AI Assistant Side Whisper', desc: 'Receive proactive, context-rich whispers from your assistant.' },
];

const COMMUNITY_ORGS = [
  { id: 'nyfc', name: 'New York Founder Club', initial: 'NY', bg: 'bg-rose-500', members: 233, avatars: ['AW', 'LZ', 'JW'] },
  { id: 'sftech', name: 'SF Tech Alliance', initial: 'SF', bg: 'bg-indigo-500', members: 189, avatars: ['KL', 'MR', 'TS'] },
  { id: 'berlinai', name: 'Berlin AI Hub', initial: 'BA', bg: 'bg-cyan-500', members: 156, avatars: ['HD', 'EM', 'PK'] },
  { id: 'londonvc', name: 'London VC Network', initial: 'LV', bg: 'bg-purple-500', members: 412, avatars: ['JB', 'RC', 'AN'] },
  { id: 'tokyoinno', name: 'Tokyo Innovation Lab', initial: 'TI', bg: 'bg-orange-500', members: 98, avatars: ['YT', 'SM', 'KN'] },
  { id: 'sgstartup', name: 'Singapore Startup Circle', initial: 'SS', bg: 'bg-teal-500', members: 274, avatars: ['WL', 'CT', 'RJ'] },
];

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`w-9 h-[22px] rounded-full transition-colors shrink-0 relative ${
        checked ? 'bg-emerald-500' : 'bg-gray-200'
      }`}
    >
      <div
        className={`absolute top-[3px] w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${
          checked ? 'translate-x-[19px]' : 'translate-x-[3px]'
        }`}
      />
    </button>
  );
}

export function OrgRail() {
  const [activeOrgId, setActiveOrgId] = useState(ORGS[0].id);
  const [menuOpen, setMenuOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [createOrgOpen, setCreateOrgOpen] = useState(false);
  const [newOrgName, setNewOrgName] = useState('');
  const [joinOrgOpen, setJoinOrgOpen] = useState(false);
  const [inviteLink, setInviteLink] = useState('');
  const [confirmJoinOrg, setConfirmJoinOrg] = useState<typeof COMMUNITY_ORGS[number] | null>(null);
  const [joinTab, setJoinTab] = useState<'invite' | 'community'>('invite');
  const [aiToggles, setAiToggles] = useState<Record<string, boolean>>({
    smartReply: true,
    smartInline: true,
    smartFollowup: false,
    smartVote: true,
    autoSegment: false,
    sideWhisper: true,
  });
  const menuRef = useRef<HTMLDivElement>(null);
  const settingsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
      if (settingsRef.current && !settingsRef.current.contains(e.target as Node)) {
        setSettingsOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSettingsClick = (key: string) => {
    setSettingsOpen(false);
    if (key === 'ai') {
      setAiModalOpen(true);
    }
  };

  return (
    <>
      <div className="w-[52px] h-full flex flex-col items-center pt-3 pb-4 shrink-0 gap-2">
        {/* Org icons */}
        {ORGS.map((org) => {
          const isActive = activeOrgId === org.id;
          return (
            <div key={org.id} className="relative flex items-center">
              {/* Active indicator bar */}
              <div
                className={`absolute -left-[4px] w-[3px] rounded-r-full bg-black transition-all ${
                  isActive ? 'h-5' : 'h-0'
                }`}
              />
              <button
                onClick={() => setActiveOrgId(org.id)}
                title={org.name}
                className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all ${org.bg} ${
                  isActive
                    ? 'ring-2 ring-black/20 shadow-sm'
                    : 'opacity-60 hover:opacity-90'
                }`}
              >
                <span className={`text-[13px] font-bold ${org.text}`}>{org.initial}</span>
              </button>

              {/* Unread badge */}
              {org.unreadCount > 0 && !isActive && (
                <span className="absolute -top-1 -right-1 min-w-[16px] h-4 px-1 bg-emerald-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {org.unreadCount > 99 ? '99+' : org.unreadCount}
                </span>
              )}
            </div>
          );
        })}

        {/* Divider */}
        <div className="w-5 h-px bg-gray-200 my-0.5" />

        {/* Add org with menu */}
        <div ref={menuRef} className="relative flex items-center">
          <button
            title="Add organization"
            onClick={() => setMenuOpen(!menuOpen)}
            className={`w-9 h-9 rounded-xl border-2 border-dashed flex items-center justify-center transition-colors ${
              menuOpen
                ? 'border-gray-400 text-gray-500 bg-[#f0f0f0]'
                : 'border-gray-300 text-gray-300 hover:border-gray-400 hover:text-gray-400'
            }`}
          >
            <Plus className="w-4 h-4" />
          </button>

          {menuOpen && (
            <div className="absolute left-[calc(100%+8px)] top-0 w-[200px] bg-white rounded-xl border border-gray-100 shadow-lg py-1.5 z-50">
              <div className="px-3 py-1.5">
                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Organization</span>
              </div>
              <button
                onClick={() => { setMenuOpen(false); setCreateOrgOpen(true); setNewOrgName(''); }}
                className="w-full flex items-center gap-2.5 px-3 py-2.5 hover:bg-[#f5f5f5] transition-colors"
              >
                <div className="w-6 h-6 rounded-md bg-[#e4e4e4] flex items-center justify-center shrink-0">
                  <Building2 className="w-3.5 h-3.5 text-gray-500" />
                </div>
                <div className="text-left">
                  <p className="text-[13px] font-medium text-black">Create New</p>
                  <p className="text-[10px] text-gray-400">Start a new organization</p>
                </div>
              </button>
              <button
                onClick={() => { setMenuOpen(false); setJoinOrgOpen(true); setInviteLink(''); setConfirmJoinOrg(null); setJoinTab('invite'); }}
                className="w-full flex items-center gap-2.5 px-3 py-2.5 hover:bg-[#f5f5f5] transition-colors"
              >
                <div className="w-6 h-6 rounded-md bg-[#e4e4e4] flex items-center justify-center shrink-0">
                  <UserPlus className="w-3.5 h-3.5 text-gray-500" />
                </div>
                <div className="text-left">
                  <p className="text-[13px] font-medium text-black">Join Existing</p>
                  <p className="text-[10px] text-gray-400">Join with an invite code</p>
                </div>
              </button>
            </div>
          )}
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Global settings — lightweight popover menu */}
        <div ref={settingsRef} className="relative flex items-center">
          <button
            title="Settings"
            onClick={() => setSettingsOpen(!settingsOpen)}
            className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
              settingsOpen
                ? 'bg-[#e4e4e4] text-gray-600'
                : 'text-gray-400 hover:bg-[#e4e4e4] hover:text-gray-600'
            }`}
          >
            <Settings className="w-[18px] h-[18px]" />
          </button>

          {settingsOpen && (
            <div className="absolute left-[calc(100%+8px)] bottom-0 w-[200px] bg-white rounded-xl border border-gray-100 shadow-lg py-1.5 z-50">
              <div className="px-3 py-1.5">
                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Settings</span>
              </div>
              {SETTINGS_ITEMS.map(({ key, icon: Icon, label }) => (
                <button
                  key={key}
                  onClick={() => handleSettingsClick(key)}
                  className="w-full flex items-center gap-2.5 px-3 py-2 hover:bg-[#f5f5f5] transition-colors"
                >
                  <Icon className="w-4 h-4 text-gray-400 shrink-0" />
                  <span className="text-[13px] font-medium text-gray-700">{label}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* AI Settings modal */}
      <Modal
        open={aiModalOpen}
        onClose={() => setAiModalOpen(false)}
        size="sm"
        title="AI Settings"
        subtitle="Manage AI-powered features"
      >
        <div className="px-6 py-4 space-y-1">
          {AI_SETTINGS.map(({ key, label, desc }) => (
            <div key={key} className="flex items-start gap-4 py-3.5 border-b border-gray-50 last:border-0">
              <div className="flex-1 min-w-0">
                <p className="text-[14px] font-semibold text-black">{label}</p>
                <p className="text-[13px] text-gray-400 font-medium mt-0.5 leading-relaxed">{desc}</p>
              </div>
              <div className="pt-0.5">
                <Toggle
                  checked={aiToggles[key] ?? false}
                  onChange={(v) => setAiToggles((prev) => ({ ...prev, [key]: v }))}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="px-6 py-4 border-t border-gray-100">
          <p className="text-[12px] text-gray-400 font-medium leading-relaxed">
            Turning off all options will disable AI services. Read <span className="underline cursor-pointer text-gray-500">Privacy Policy</span> for more information.
          </p>
        </div>
      </Modal>

      {/* Create Organization modal */}
      <Modal
        open={createOrgOpen}
        onClose={() => setCreateOrgOpen(false)}
        size="sm"
        title="Create Organization"
        subtitle="Set up a new workspace for your team"
      >
        <div className="px-6 py-6">
          {/* Avatar upload */}
          <div className="flex flex-col items-center mb-6">
            <div className="relative group">
              <div className="w-20 h-20 rounded-2xl bg-[#f0f0f0] flex items-center justify-center overflow-hidden">
                {newOrgName ? (
                  <span className="text-[28px] font-bold text-gray-400">{newOrgName.charAt(0).toUpperCase()}</span>
                ) : (
                  <Building2 className="w-8 h-8 text-gray-300" />
                )}
              </div>
              <button className="absolute inset-0 rounded-2xl bg-black/0 group-hover:bg-black/40 flex items-center justify-center transition-colors">
                <Camera className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            </div>
            <button className="mt-2.5 text-[13px] font-semibold text-emerald-600 hover:text-emerald-700 transition-colors">
              Upload Logo
            </button>
          </div>

          {/* Org name input */}
          <div>
            <label className="text-[13px] font-semibold text-gray-400 mb-2 block">Organization Name</label>
            <input
              type="text"
              value={newOrgName}
              onChange={(e) => setNewOrgName(e.target.value)}
              placeholder="e.g. Acme Inc."
              className="w-full px-4 py-2.5 text-[14px] font-medium text-black placeholder:text-gray-300 bg-[#f5f5f5] rounded-xl outline-none border border-transparent focus:border-gray-200 focus:bg-white transition-all"
              autoFocus
            />
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-end gap-2.5">
          <button
            onClick={() => setCreateOrgOpen(false)}
            className="px-4 py-2.5 text-[14px] font-semibold text-gray-500 rounded-lg border border-gray-200 hover:bg-[#f5f5f5] transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => setCreateOrgOpen(false)}
            disabled={!newOrgName.trim()}
            className={`px-6 py-2.5 text-[14px] font-semibold rounded-lg transition-colors ${
              newOrgName.trim()
                ? 'bg-black text-white hover:bg-gray-800'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            Create Organization
          </button>
        </div>
      </Modal>

      {/* Join Organization modal */}
      <Modal
        open={joinOrgOpen && !confirmJoinOrg}
        onClose={() => setJoinOrgOpen(false)}
        size="md"
        title="Join a Team"
        subtitle="Join an existing organization or browse open communities"
      >
        {/* Tabs */}
        <div className="px-6 pt-4 flex gap-0 border-b border-gray-100">
          <button
            onClick={() => setJoinTab('invite')}
            className={`px-4 pb-3 text-[14px] font-semibold transition-colors relative ${
              joinTab === 'invite' ? 'text-black' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            Invitation Link
            {joinTab === 'invite' && <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-black rounded-full" />}
          </button>
          <button
            onClick={() => setJoinTab('community')}
            className={`px-4 pb-3 text-[14px] font-semibold transition-colors relative ${
              joinTab === 'community' ? 'text-black' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            Browse Communities
            {joinTab === 'community' && <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-black rounded-full" />}
          </button>
        </div>

        {/* Tab: Invite link */}
        {joinTab === 'invite' && (
          <div className="px-6 py-6">
            <p className="text-[14px] text-gray-400 font-medium mb-4">Paste an invitation link from your teammate to join their organization.</p>
            <div className="flex items-center gap-2.5">
              <div className="flex-1 flex items-center gap-2.5 px-4 py-3 bg-[#f5f5f5] rounded-xl border border-transparent focus-within:border-gray-200 focus-within:bg-white transition-all">
                <Link2 className="w-4 h-4 text-gray-300 shrink-0" />
                <input
                  type="text"
                  value={inviteLink}
                  onChange={(e) => setInviteLink(e.target.value)}
                  placeholder="https://tanka.app/invite/..."
                  className="flex-1 text-[14px] font-medium text-black placeholder:text-gray-300 bg-transparent outline-none border-none"
                  autoFocus
                />
              </div>
              <button
                disabled={!inviteLink.trim()}
                className={`px-5 py-3 text-[14px] font-semibold rounded-xl transition-colors shrink-0 ${
                  inviteLink.trim()
                    ? 'bg-black text-white hover:bg-gray-800'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                Join Team
              </button>
            </div>
          </div>
        )}

        {/* Tab: Browse communities */}
        {joinTab === 'community' && (
          <div className="px-6 py-5 space-y-2 max-h-[380px] overflow-y-auto no-scrollbar">
            {COMMUNITY_ORGS.map((org) => (
              <button
                key={org.id}
                onClick={() => setConfirmJoinOrg(org)}
                className="w-full flex items-center gap-3.5 p-3.5 rounded-xl border border-gray-100 hover:border-gray-200 hover:bg-[#fafafa] transition-all group"
              >
                <div className={`w-11 h-11 rounded-lg ${org.bg} flex items-center justify-center shrink-0`}>
                  <span className="text-[13px] font-bold text-white">{org.initial}</span>
                </div>
                <div className="flex-1 min-w-0 text-left">
                  <p className="text-[14px] font-semibold text-black truncate">{org.name}</p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <Users className="w-3.5 h-3.5 text-gray-300" />
                    <span className="text-[13px] text-gray-400 font-medium">{org.members} members</span>
                  </div>
                </div>
                <span className="text-[14px] font-semibold text-gray-400 group-hover:text-black transition-colors">
                  Join
                </span>
              </button>
            ))}
          </div>
        )}
      </Modal>

      {/* Join confirmation modal */}
      <Modal
        open={!!confirmJoinOrg}
        onClose={() => setConfirmJoinOrg(null)}
        size="sm"
        title="Join Organization"
        subtitle="Confirm your membership"
      >
        {confirmJoinOrg && (
          <>
            <div className="px-6 py-8 flex flex-col items-center text-center">
              {/* Org avatar */}
              <div className={`w-16 h-16 rounded-xl ${confirmJoinOrg.bg} flex items-center justify-center mb-4`}>
                <span className="text-[20px] font-bold text-white">{confirmJoinOrg.initial}</span>
              </div>

              <p className="text-[15px] font-semibold text-black">
                Do you want to join {confirmJoinOrg.name}?
              </p>

              {/* Member avatars */}
              <div className="flex items-center justify-center mt-4 -space-x-2">
                {confirmJoinOrg.avatars.map((av, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center"
                  >
                    <span className="text-[10px] font-bold text-gray-500">{av}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-1.5 mt-3">
                <Check className="w-3.5 h-3.5 text-emerald-500" />
                <span className="text-[13px] text-gray-400 font-medium">
                  {confirmJoinOrg.members} members have joined
                </span>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-end gap-2.5">
              <button
                onClick={() => setConfirmJoinOrg(null)}
                className="px-4 py-2.5 text-[14px] font-semibold text-gray-500 rounded-lg border border-gray-200 hover:bg-[#f5f5f5] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => { setConfirmJoinOrg(null); setJoinOrgOpen(false); }}
                className="px-6 py-2.5 text-[14px] font-semibold text-white bg-black rounded-lg hover:bg-gray-800 transition-colors"
              >
                Join Organization
              </button>
            </div>
          </>
        )}
      </Modal>
    </>
  );
}

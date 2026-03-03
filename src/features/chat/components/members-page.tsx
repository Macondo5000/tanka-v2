import { useState } from 'react';
import {
  Search, MessageSquare, Phone, Video, User, Mail, Users, Tag,
  Briefcase, Plus, Forward, ArrowLeft, Check, Sparkles,
} from 'lucide-react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router';
import { Modal } from '@/components/shared/modal';
import { ORG_MEMBERS, DEPARTMENTS, type OrgMember } from '@/mock/members';
import { useChatStore } from '@/store/chat-store';
import { EASE_SMOOTH } from '@/lib/constants';
import { getAvatarColor, getAvatarLetter } from '@/lib/avatar';

/* ═══════════════════════════════════════════════════════
   Member Profile Modal — read-only, md (560px)
   ═══════════════════════════════════════════════════════ */

function ReadOnlySection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="text-[12px] font-bold text-gray-400 uppercase tracking-wide mb-2.5">{title}</h4>
      {children}
    </div>
  );
}

function MemberProfileModal({ member, onClose }: { member: OrgMember; onClose: () => void }) {
  return (
    <Modal open onClose={onClose} size="md" title={member.name} subtitle={member.role}>
      <div className="px-6 py-5 space-y-5">
        {/* Avatar + About */}
        <div className="flex items-start gap-4">
          <div className="relative shrink-0">
            <img
              src={member.avatar.replace('/40?', '/80?')}
              alt={member.name}
              className="w-14 h-14 rounded-full object-cover ring-1 ring-black/5"
            />
            {member.isOnline && (
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white" />
            )}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[14px] text-gray-600 font-medium leading-relaxed">{member.about}</p>
          </div>
        </div>

        {/* Trait Profile */}
        <ReadOnlySection title="Trait Profile">
          <div className="flex flex-wrap gap-1.5">
            {member.traits.map((t) => (
              <span key={t} className="px-3 py-1.5 rounded-lg bg-[#f0f0f0] text-[12px] font-semibold text-gray-600">
                {t}
              </span>
            ))}
          </div>
        </ReadOnlySection>

        {/* Core Responsibilities */}
        <ReadOnlySection title="Core Responsibilities">
          <div className="space-y-0">
            {member.responsibilities.map((text, idx) => (
              <div key={idx} className="flex gap-3 py-2 border-b border-gray-50 last:border-0">
                <span className="text-[11px] font-bold text-gray-300 mt-0.5 w-4 shrink-0 text-right">{idx + 1}</span>
                <p className="text-[13px] text-gray-600 font-medium leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </ReadOnlySection>

        {/* Key Achievements */}
        <ReadOnlySection title="Key Achievements">
          <div className="space-y-0">
            {member.achievements.map((text, idx) => (
              <div key={idx} className="flex gap-3 py-2 border-b border-gray-50 last:border-0">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                <p className="text-[13px] text-gray-600 font-medium leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </ReadOnlySection>

        {/* Basic Info */}
        <ReadOnlySection title="Information">
          <div className="space-y-2.5">
            <div className="flex items-center gap-3">
              <Mail className="w-3.5 h-3.5 text-gray-400 shrink-0" />
              <span className="text-[13px] font-medium text-black">{member.email}</span>
            </div>
            <div className="flex items-center gap-3">
              <Briefcase className="w-3.5 h-3.5 text-gray-400 shrink-0" />
              <span className="text-[13px] font-medium text-black">{member.department}</span>
            </div>
            <div className="flex items-center gap-3">
              <Users className="w-3.5 h-3.5 text-gray-400 shrink-0" />
              <span className="text-[13px] font-medium text-black">{member.mutualGroups} Mutual Group(s)</span>
            </div>
            <div className="flex items-start gap-3">
              <Tag className="w-3.5 h-3.5 text-gray-400 shrink-0 mt-0.5" />
              <div className="flex flex-wrap gap-1.5">
                {member.tags.map((tag) => (
                  <span key={tag} className="px-2 py-0.5 bg-[#f0f0f0] rounded-md text-[12px] font-medium text-gray-600">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </ReadOnlySection>
      </div>
    </Modal>
  );
}

/* ═══════════════════════════════════════════════════════
   Forward Modal — select chats to forward member card
   ═══════════════════════════════════════════════════════ */

function ForwardModal({ member, onClose }: { member: OrgMember; onClose: () => void }) {
  const { channels } = useChatStore();
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const query = search.trim().toLowerCase();
  const filtered = channels.filter((ch) =>
    ch.name.toLowerCase().includes(query)
  );

  const toggle = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <Modal open onClose={onClose} size="sm" title="Forward Card" subtitle={member.name}>
      <div className="flex flex-col" style={{ height: '420px' }}>
        {/* Search */}
        <div className="px-5 pt-4 pb-3 shrink-0">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-300" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search chats..."
              className="w-full pl-9 pr-3 py-2.5 bg-[#f5f5f5] rounded-xl text-[13px] font-medium text-black placeholder:text-gray-300 outline-none border border-transparent focus:border-gray-200 focus:bg-white transition-all"
            />
          </div>
        </div>

        {/* Chat list */}
        <div className="flex-1 overflow-y-auto no-scrollbar px-3 pb-3">
          <div className="space-y-0.5">
            {filtered.map((ch) => {
              const isSelected = selected.has(ch.id);
              return (
                <button
                  key={ch.id}
                  onClick={() => toggle(ch.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                    isSelected ? 'bg-[#f0f0f0]' : 'hover:bg-[#f5f5f5]'
                  }`}
                >
                  {/* Avatar */}
                  {ch.type === 'channel' ? (
                    <div className="w-9 h-9 rounded-xl shrink-0 overflow-hidden">
                      {ch.isAIChannel ? (
                        <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                          <Sparkles className="w-4 h-4 text-blue-500" />
                        </div>
                      ) : (
                        <img src="/group.png" alt={ch.name} className="w-full h-full object-cover" />
                      )}
                    </div>
                  ) : ch.avatar ? (
                    <img src={ch.avatar} alt={ch.name} className="w-9 h-9 rounded-full object-cover ring-1 ring-black/5 shrink-0" />
                  ) : (
                    <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: getAvatarColor(ch.name) }}>
                      <span className="text-[13px] font-bold text-black">
                        {getAvatarLetter(ch.name)}
                      </span>
                    </div>
                  )}

                  <div className="flex-1 min-w-0 text-left">
                    <p className="text-[13px] font-semibold text-black truncate">{ch.name}</p>
                    <p className="text-[11px] text-gray-400 font-medium truncate">
                      {ch.type === 'channel' ? `${ch.members.length} members` : ch.members.find(m => m.id !== 'me')?.name || 'Direct message'}
                    </p>
                  </div>

                  {/* Checkbox */}
                  <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-all ${
                    isSelected ? 'bg-black border-black' : 'border-gray-300'
                  }`}>
                    {isSelected && <Check className="w-3 h-3 text-white" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-gray-100 shrink-0">
          <button
            disabled={selected.size === 0}
            onClick={onClose}
            className={`w-full py-2.5 rounded-xl text-[13px] font-semibold transition-all ${
              selected.size > 0
                ? 'bg-black text-white hover:bg-gray-800'
                : 'bg-gray-100 text-gray-300 cursor-not-allowed'
            }`}
          >
            {selected.size > 0 ? `Send to ${selected.size} Chat${selected.size > 1 ? 's' : ''}` : 'Select Chats'}
          </button>
        </div>
      </div>
    </Modal>
  );
}

/* ═══════════════════════════════════════════════════════
   Member Card (right column)
   ═══════════════════════════════════════════════════════ */

const CARD_ACTIONS = [
  { key: 'message', icon: MessageSquare, label: 'Message' },
  { key: 'voice', icon: Phone, label: 'Voice' },
  { key: 'video', icon: Video, label: 'Video' },
] as const;

function MemberCard({ member }: { member: OrgMember }) {
  const [profileOpen, setProfileOpen] = useState(false);
  const [forwardOpen, setForwardOpen] = useState(false);

  return (
    <>
      <div className="h-full flex flex-col overflow-y-auto no-scrollbar">
        {/* Forward — top-right toolbar */}
        <div className="flex justify-end px-4 pt-3 shrink-0">
          <button onClick={() => setForwardOpen(true)} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#f0f0f0] transition-colors text-gray-400 hover:text-gray-600" title="Forward Card">
            <Forward className="w-4 h-4" />
          </button>
        </div>

        {/* Avatar + Status */}
        <div className="flex flex-col items-center pt-1 pb-5 px-5">
          <div className="relative mb-3">
            <img
              src={member.avatar.replace('/40?', '/80?')}
              alt={member.name}
              className="w-16 h-16 rounded-full object-cover ring-1 ring-black/5"
            />
            {member.isOnline && (
              <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 rounded-full border-[2.5px] border-white" />
            )}
          </div>
          <h3 className="text-[18px] font-bold tracking-tight text-black">{member.name}</h3>
          <p className="text-[13px] text-gray-400 font-medium mt-0.5">{member.role}</p>
          <span className={`text-[11px] font-semibold mt-1.5 px-2.5 py-0.5 rounded-full ${
            member.isOnline ? 'bg-emerald-50 text-emerald-600' : 'bg-gray-100 text-gray-400'
          }`}>
            {member.isOnline ? 'Online' : 'Offline'}
          </span>
        </div>

        {/* Action buttons */}
        <div className="flex items-center justify-center gap-2 pb-5 px-5 border-b border-gray-100">
          {CARD_ACTIONS.map(({ key, icon: Icon, label }) => (
            <button
              key={key}
              className="flex flex-col items-center gap-1.5 px-3 py-2 rounded-xl hover:bg-[#f5f5f5] transition-all"
            >
              <div className="w-11 h-11 rounded-xl bg-[#f0f0f0] flex items-center justify-center">
                <Icon className="w-[18px] h-[18px] text-gray-600" />
              </div>
              <span className="text-[12px] font-medium text-gray-500">{label}</span>
            </button>
          ))}
          <button
            onClick={() => setProfileOpen(true)}
            className="flex flex-col items-center gap-1.5 px-3 py-2 rounded-xl hover:bg-[#f5f5f5] transition-all"
          >
            <div className="w-11 h-11 rounded-xl bg-[#f0f0f0] flex items-center justify-center">
              <User className="w-[18px] h-[18px] text-gray-600" />
            </div>
            <span className="text-[12px] font-medium text-gray-500">Profile</span>
          </button>
        </div>

        {/* Info sections */}
        <div className="space-y-4 px-5 pt-5 flex-1">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#f5f5f5] flex items-center justify-center shrink-0 mt-0.5">
              <Mail className="w-3.5 h-3.5 text-gray-400" />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide">Email</p>
              <p className="text-[13px] font-medium text-black mt-0.5 truncate">{member.email}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#f5f5f5] flex items-center justify-center shrink-0 mt-0.5">
              <Users className="w-3.5 h-3.5 text-gray-400" />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide">Mutual Groups</p>
              <p className="text-[13px] font-medium text-black mt-0.5">{member.mutualGroups} Group(s)</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#f5f5f5] flex items-center justify-center shrink-0 mt-0.5">
              <Tag className="w-3.5 h-3.5 text-gray-400" />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide">Tag</p>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {member.tags.map((tag) => (
                  <span key={tag} className="px-2.5 py-1 bg-[#f0f0f0] rounded-md text-[12px] font-medium text-gray-600">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#f5f5f5] flex items-center justify-center shrink-0 mt-0.5">
              <Briefcase className="w-3.5 h-3.5 text-gray-400" />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide">Role</p>
              <p className="text-[13px] font-medium text-black mt-0.5">{member.role}</p>
              <p className="text-[12px] text-gray-400 font-medium mt-0.5">{member.department}</p>
            </div>
          </div>

          <button className="flex items-center gap-2 text-[13px] font-medium text-gray-400 hover:text-gray-600 transition-colors pt-1">
            <Plus className="w-3.5 h-3.5" />
            Add Information
          </button>
        </div>
      </div>

      {/* Profile modal */}
      {profileOpen && (
        <MemberProfileModal member={member} onClose={() => setProfileOpen(false)} />
      )}

      {/* Forward modal */}
      {forwardOpen && (
        <ForwardModal member={member} onClose={() => setForwardOpen(false)} />
      )}
    </>
  );
}

/* ═══════════════════════════════════════════════════════
   Members Page — 3-column layout
   Left: departments | Middle: member list | Right: card
   ═══════════════════════════════════════════════════════ */

export function MembersPage() {
  const navigate = useNavigate();
  const [activeDept, setActiveDept] = useState<string>(DEPARTMENTS[0]);
  const [search, setSearch] = useState('');
  const [selectedMember, setSelectedMember] = useState<OrgMember | null>(null);

  const onlineCount = ORG_MEMBERS.filter((m) => m.isOnline).length;
  const query = search.trim().toLowerCase();
  const isSearching = query.length > 0;

  const globalFiltered = isSearching
    ? ORG_MEMBERS.filter(
        (m) =>
          m.name.toLowerCase().includes(query) ||
          m.role.toLowerCase().includes(query) ||
          m.department.toLowerCase().includes(query)
      )
    : [];

  const deptCounts = DEPARTMENTS.map((dept) => {
    const deptMembers = ORG_MEMBERS.filter((m) => m.department === dept);
    return {
      department: dept,
      total: deptMembers.length,
      online: deptMembers.filter((m) => m.isOnline).length,
    };
  });

  const displayMembers = isSearching
    ? globalFiltered
    : ORG_MEMBERS.filter((m) => m.department === activeDept);

  return (
    <div className="h-full flex gap-3">
      {/* ── Left column: departments ── */}
      <div className="w-[220px] shrink-0 bg-[#fafafa] rounded-[10px] flex flex-col">
        <div className="px-4 pt-4 pb-2 shrink-0">
          <div className="flex items-center gap-2 mb-3">
            <button
              onClick={() => navigate('/chat')}
              className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-[#ebebeb] transition-colors text-black shrink-0"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <h2 className="text-[16px] font-bold tracking-tight">Members</h2>
          </div>
          <p className="text-[12px] text-gray-400 font-medium px-0.5">
            {ORG_MEMBERS.length} people · {onlineCount} online
          </p>
        </div>

        <div className="flex-1 overflow-y-auto no-scrollbar px-2 py-2">
          <div className="space-y-0.5">
            {deptCounts.map(({ department, total, online }) => {
              const isActive = !isSearching && activeDept === department;
              return (
                <button
                  key={department}
                  onClick={() => { setActiveDept(department); setSearch(''); }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left transition-all ${
                    isActive ? 'bg-[#ebebeb] text-black' : 'text-gray-600 hover:bg-[#f0f0f0]'
                  }`}
                >
                  <span className={`text-[13px] font-semibold truncate ${isActive ? 'text-black' : ''}`}>
                    {department}
                  </span>
                  <div className="flex items-center gap-1.5 shrink-0">
                    {online > 0 && (
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    )}
                    <span className="text-[11px] font-medium text-gray-400">{total}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Middle column: member list ── */}
      <div className="flex-1 min-w-0 bg-white rounded-[10px] flex flex-col">
        <div className="px-5 pt-4 pb-3 shrink-0 border-b border-gray-100">
          <div className="relative mb-3">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-300" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, role, or department..."
              className="w-full pl-10 pr-4 py-2.5 bg-[#f5f5f5] rounded-xl text-[13px] font-medium text-black placeholder:text-gray-300 outline-none border border-transparent focus:border-gray-200 focus:bg-white transition-all"
            />
          </div>
          {isSearching ? (
            <p className="text-[13px] text-gray-400 font-medium">
              {globalFiltered.length} result{globalFiltered.length !== 1 ? 's' : ''} found
            </p>
          ) : (
            <div>
              <h4 className="text-[15px] font-bold tracking-tight text-black">{activeDept}</h4>
              <p className="text-[12px] text-gray-400 font-medium mt-0.5">
                {displayMembers.length} people · {displayMembers.filter((m) => m.isOnline).length} online
              </p>
            </div>
          )}
        </div>

        <div className="flex-1 overflow-y-auto no-scrollbar px-3 py-2">
          <div>
            {displayMembers.map((m, index) => {
              const isActive = selectedMember?.id === m.id;
              return (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.02, ease: EASE_SMOOTH }}
                  onClick={() => setSelectedMember(m)}
                  className={`flex items-center gap-3 px-3 py-1.5 rounded-xl transition-all group cursor-pointer ${
                    isActive ? 'bg-[#ebebeb]' : 'hover:bg-[#f5f5f5]'
                  }`}
                >
                  <div className="relative shrink-0">
                    <img src={m.avatar} alt={m.name} className="w-9 h-9 rounded-full object-cover ring-1 ring-black/5" />
                    {m.isOnline && (
                      <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[14px] font-semibold text-black truncate">{m.name}</p>
                    <p className="text-[12px] text-gray-400 font-medium truncate">
                      {m.role}{isSearching ? ` · ${m.department}` : ''}
                    </p>
                  </div>
                  <button
                    onClick={(e) => e.stopPropagation()}
                    className="w-7 h-7 rounded-lg bg-transparent group-hover:bg-[#e4e4e4] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shrink-0"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-gray-500" />
                  </button>
                </motion.div>
              );
            })}

            {displayMembers.length === 0 && (
              <div className="text-center py-12">
                <p className="text-[14px] text-gray-300 font-medium">No members found</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Right column: member card ── */}
      <div className="w-[440px] shrink-0 bg-white rounded-[10px] overflow-hidden">
        {selectedMember ? (
          <MemberCard key={selectedMember.id} member={selectedMember} />
        ) : (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <User className="w-10 h-10 text-gray-200 mx-auto mb-3" />
              <p className="text-[14px] text-gray-300 font-medium">Select a member</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

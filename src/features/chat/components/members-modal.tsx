import { useState } from 'react';
import {
  Search, MessageSquare, Phone, Video, User, Mail, Users, Tag,
  Briefcase, Plus, Forward, ChevronRight,
} from 'lucide-react';
import { motion } from 'motion/react';
import { Modal } from '@/components/shared/modal';
import { ORG_MEMBERS, DEPARTMENTS, type OrgMember } from '@/mock/members';
import { EASE_SMOOTH } from '@/lib/constants';

interface MembersModalProps {
  open: boolean;
  onClose: () => void;
}

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
   Member Card Modal — sm (420px)
   ═══════════════════════════════════════════════════════ */

const CARD_ACTIONS = [
  { key: 'message', icon: MessageSquare, label: 'Message' },
  { key: 'voice', icon: Phone, label: 'Voice' },
  { key: 'video', icon: Video, label: 'Video' },
] as const;

function MemberCardModal({ member, onClose }: { member: OrgMember; onClose: () => void }) {
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <>
      <Modal open onClose={onClose} size="sm" title={member.name} subtitle={member.role}>
        <div className="px-6 py-5">
          {/* Avatar + Status */}
          <div className="flex flex-col items-center pb-5">
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
            <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${
              member.isOnline ? 'bg-emerald-50 text-emerald-600' : 'bg-gray-100 text-gray-400'
            }`}>
              {member.isOnline ? 'Online' : 'Offline'}
            </span>
          </div>

          {/* Action buttons — message / voice / video */}
          <div className="flex items-center justify-center gap-2 pb-5 border-b border-gray-100">
            {CARD_ACTIONS.map(({ key, icon: Icon, label }) => (
              <button
                key={key}
                className="flex flex-col items-center gap-1.5 px-3 py-2 rounded-xl hover:bg-[#f5f5f5] transition-all"
              >
                <div className="w-9 h-9 rounded-xl bg-[#f0f0f0] flex items-center justify-center">
                  <Icon className="w-4 h-4 text-gray-600" />
                </div>
                <span className="text-[11px] font-medium text-gray-500">{label}</span>
              </button>
            ))}
          </div>

          {/* Info sections */}
          <div className="space-y-4 pt-5">
            {/* Email */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#f5f5f5] flex items-center justify-center shrink-0 mt-0.5">
                <Mail className="w-3.5 h-3.5 text-gray-400" />
              </div>
              <div className="min-w-0">
                <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide">Email</p>
                <p className="text-[14px] font-medium text-black mt-0.5 truncate">{member.email}</p>
              </div>
            </div>

            {/* Mutual Groups */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#f5f5f5] flex items-center justify-center shrink-0 mt-0.5">
                <Users className="w-3.5 h-3.5 text-gray-400" />
              </div>
              <div className="min-w-0">
                <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide">Mutual Groups</p>
                <p className="text-[14px] font-medium text-black mt-0.5">{member.mutualGroups} Group(s)</p>
              </div>
            </div>

            {/* Tags */}
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

            {/* Role / Department */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#f5f5f5] flex items-center justify-center shrink-0 mt-0.5">
                <Briefcase className="w-3.5 h-3.5 text-gray-400" />
              </div>
              <div className="min-w-0">
                <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide">Role</p>
                <p className="text-[14px] font-medium text-black mt-0.5">{member.role}</p>
                <p className="text-[12px] text-gray-400 font-medium mt-0.5">{member.department}</p>
              </div>
            </div>

            {/* Add Information */}
            <button className="flex items-center gap-2 text-[13px] font-medium text-gray-400 hover:text-gray-600 transition-colors pt-1">
              <Plus className="w-3.5 h-3.5" />
              Add Information
            </button>
          </div>
        </div>

        {/* Footer: Profile + Forward */}
        <div className="px-6 py-4 border-t border-gray-100 flex items-center gap-2.5">
          <button
            onClick={() => setProfileOpen(true)}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#f0f0f0] hover:bg-[#e4e4e4] transition-colors text-[13px] font-semibold text-black"
          >
            <User className="w-3.5 h-3.5" />
            Profile
            <ChevronRight className="w-3.5 h-3.5 text-gray-400 ml-auto" />
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#f0f0f0] hover:bg-[#e4e4e4] transition-colors text-[13px] font-semibold text-black">
            <Forward className="w-3.5 h-3.5" />
            Forward
          </button>
        </div>
      </Modal>

      {/* Profile modal — opens on top of card */}
      {profileOpen && (
        <MemberProfileModal member={member} onClose={() => setProfileOpen(false)} />
      )}
    </>
  );
}

/* ═══════════════════════════════════════════════════════
   Members List Modal — xl (860px)
   ═══════════════════════════════════════════════════════ */

export function MembersModal({ open, onClose }: MembersModalProps) {
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
    const matchedInDept = isSearching
      ? globalFiltered.filter((m) => m.department === dept).length
      : deptMembers.length;
    return {
      department: dept,
      total: deptMembers.length,
      online: deptMembers.filter((m) => m.isOnline).length,
      matchCount: matchedInDept,
    };
  }).filter((d) => !isSearching || d.matchCount > 0);

  const displayMembers = isSearching
    ? globalFiltered
    : ORG_MEMBERS.filter((m) => m.department === activeDept);

  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        size="xl"
        title="Members"
        subtitle={`${ORG_MEMBERS.length} people · ${onlineCount} online`}
      >
        {/* Global search bar */}
        <div className="px-5 pt-3 pb-3 shrink-0 border-b border-gray-100">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-300" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, role, or department..."
              className="w-full pl-10 pr-4 py-2.5 bg-[#f5f5f5] rounded-xl text-[13px] font-medium text-black placeholder:text-gray-300 outline-none border border-transparent focus:border-gray-200 focus:bg-white transition-all"
            />
          </div>
        </div>

        <div className="flex min-h-[380px] max-h-[440px]">
          {/* Left — Department list */}
          {!isSearching && (
            <div className="w-[200px] shrink-0 border-r border-gray-100 py-3 px-2 overflow-y-auto no-scrollbar">
              <div className="space-y-0.5">
                {deptCounts.map(({ department, total, online }) => {
                  const isActive = activeDept === department;
                  return (
                    <button
                      key={department}
                      onClick={() => setActiveDept(department)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left transition-all ${
                        isActive ? 'bg-[#ebebeb] text-black' : 'text-gray-600 hover:bg-[#f5f5f5]'
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
          )}

          {/* Right — Member list */}
          <div className="flex-1 min-w-0 flex flex-col">
            <div className="px-5 pt-4 pb-2 shrink-0">
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

            <div className="flex-1 overflow-y-auto no-scrollbar px-3 pb-4">
              <div className="space-y-0.5">
                {displayMembers.map((m, index) => (
                  <motion.div
                    key={m.id}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.02, ease: EASE_SMOOTH }}
                    onClick={() => setSelectedMember(m)}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[#f5f5f5] transition-all group cursor-pointer"
                  >
                    <div className="relative shrink-0">
                      <img
                        src={m.avatar}
                        alt={m.name}
                        className="w-9 h-9 rounded-full object-cover ring-1 ring-black/5"
                      />
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
                ))}

                {displayMembers.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-[14px] text-gray-300 font-medium">No members found</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Modal>

      {/* Member Card — independent sm modal on top */}
      {selectedMember && (
        <MemberCardModal member={selectedMember} onClose={() => setSelectedMember(null)} />
      )}
    </>
  );
}

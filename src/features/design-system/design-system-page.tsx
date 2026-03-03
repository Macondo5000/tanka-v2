import { useState } from 'react';
import { ArrowLeft, Eye } from 'lucide-react';
import { useNavigate } from 'react-router';
import { StatusBadge } from '@/components/shared/status-badge';
import { AvatarStack } from '@/components/shared/avatar-stack';
import { TabNav } from '@/components/shared/tab-nav';
import { SectionHeader } from '@/components/shared/section-header';
import { FilterDropdown } from '@/components/shared/filter-dropdown';
import { ActionCard } from '@/components/shared/action-card';
import { ActionCardCompact } from '@/components/shared/action-card-compact';
import { WorkplanTimeline } from '@/components/shared/workplan-timeline';
import { Modal } from '@/components/shared/modal';
import { FloatingInput } from '@/components/shared/floating-input';
import type { User, ActionCardData } from '@/types/common';
import type { WorkplanStep } from '@/types/flow';

/* ──────────────────────────── mock data ──────────────────────────── */

const DEMO_USERS: User[] = [
  { id: '1', name: 'Alice Chen', avatar: 'https://i.pravatar.cc/40?u=alice', role: 'Designer' },
  { id: '2', name: 'Bob Wang', avatar: 'https://i.pravatar.cc/40?u=bob', role: 'Engineer' },
  { id: '3', name: 'Charlie Li', avatar: 'https://i.pravatar.cc/40?u=charlie', role: 'PM' },
  { id: '4', name: 'Diana Zhang', avatar: 'https://i.pravatar.cc/40?u=diana', role: 'QA' },
  { id: '5', name: 'Eva Liu', avatar: 'https://i.pravatar.cc/40?u=eva', role: 'Marketing' },
];

const DEMO_ACTION_PROPOSED: ActionCardData = {
  id: 'demo-1',
  type: 'send_email',
  label: 'Send Follow-up Email',
  description: 'Send a follow-up email to confirm the meeting schedule for next week.',
  state: 'proposed',
  recipient: 'team@example.com',
  subject: 'Re: Meeting Schedule Confirmation',
  body: 'Hi Team,\n\nFollowing up on our earlier discussion, I\'d like to confirm the meeting schedule for next week...',
  timestamp: '10:30 AM',
};

const DEMO_ACTION_EXECUTED: ActionCardData = {
  id: 'demo-2',
  type: 'create_group',
  label: 'Create Project Group',
  description: 'Created a group chat for cross-team collaboration.',
  state: 'executed',
  groupName: 'Design Review Team',
  members: DEMO_USERS.slice(0, 3),
  timestamp: '9:15 AM',
};

const DEMO_STEPS: WorkplanStep[] = [
  { id: 1, tag: 'Research', label: 'Collect requirements', description: 'Gather project requirements from all stakeholders', status: 'completed', actionLabel: 'Send request email', time: '10:00 AM' },
  {
    id: 2, tag: 'Analyze', label: 'Analyze and plan', description: 'Break down requirements into actionable tasks', status: 'active', actionLabel: 'Create task breakdown', meta: 'Expected: Today',
    actions: [
      { label: 'Parse requirement document', state: 'executed', time: '9:30 AM' },
      { label: 'Identify dependencies', state: 'executed', time: '10:05 AM' },
      { label: 'Generate task list', state: 'executed', time: '10:40 AM' },
      { label: 'Assign priorities', state: 'active' },
    ],
  },
  { id: 3, tag: 'Execute', label: 'Implementation', description: 'Execute the planned tasks following the defined schedule', status: 'pending', meta: 'Expected: 3 days' },
  { id: 4, tag: 'Review', label: 'Final review', description: 'Review all deliverables and compile report', status: 'pending' },
];

const DEMO_TABS = [
  { key: 'all', label: 'All' },
  { key: 'active', label: 'Active', badge: 3 },
  { key: 'completed', label: 'Completed' },
];

const FILTER_OPTIONS = [
  { key: 'all', label: 'All Status' },
  { key: 'pending', label: 'Pending' },
  { key: 'awaiting', label: 'Awaiting' },
  { key: 'actioning', label: 'Actioning' },
];

/* ──────────────────────────── Section wrapper ──────────────────────────── */

function Section({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
  return (
    <div className="mb-12">
      <h3 className="text-[18px] font-bold text-black tracking-tight mb-1">{title}</h3>
      {description && <p className="text-[13px] text-gray-400 font-medium mb-5">{description}</p>}
      {!description && <div className="mb-5" />}
      {children}
    </div>
  );
}

function Showcase({ label, children, inline }: { label?: string; children: React.ReactNode; inline?: boolean }) {
  return (
    <div className="mb-4">
      {label && <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-3">{label}</p>}
      <div className={`p-5 rounded-xl border border-gray-100 bg-[#fafafa] ${inline ? 'flex flex-wrap items-center gap-3' : ''}`}>
        {children}
      </div>
    </div>
  );
}

function ColorSwatch({ color, name, value }: { color: string; name: string; value: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-lg border border-gray-200 shrink-0" style={{ backgroundColor: color }} />
      <div>
        <p className="text-[12px] font-semibold text-black">{name}</p>
        <p className="text-[11px] text-gray-400 font-mono">{value}</p>
      </div>
    </div>
  );
}

/* ──────────────────────────── Main Page ──────────────────────────── */

export function DesignSystemPage() {
  const navigate = useNavigate();
  const [demoTab, setDemoTab] = useState('all');
  const [filterOpen, setFilterOpen] = useState(false);
  const [filterValue, setFilterValue] = useState('all');
  const [modalSm, setModalSm] = useState(false);
  const [modalMd, setModalMd] = useState(false);
  const [modalLg, setModalLg] = useState(false);

  return (
    <div className="h-screen flex flex-col bg-[#f4f4f4]">
      {/* Header */}
      <header className="h-11 px-6 bg-[#f4f4f4] flex items-center sticky top-0 z-20 shrink-0">
        <button
          onClick={() => navigate('/flow')}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-[13px] font-semibold text-gray-500 hover:text-black hover:bg-white transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to App
        </button>
        <div className="flex-1 flex items-center justify-center">
          <h1 className="text-[14px] font-bold text-black tracking-tight flex items-center gap-2">
            <Eye className="w-4 h-4 text-gray-400" />
            Design System
          </h1>
        </div>
        <div className="w-[120px]" />
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-[960px] mx-auto px-8 py-8">
          {/* Intro */}
          <div className="mb-12">
            <h2 className="text-[28px] font-bold text-black tracking-tight mb-2">Tanka Design System</h2>
            <p className="text-[14px] text-gray-500 font-medium leading-relaxed max-w-[640px]">
              A comprehensive overview of all shared components, color palette, typography, spacing rules, and animation patterns used across the Tanka platform.
            </p>
          </div>

          {/* ─── Colors ─── */}
          <Section title="Color Palette" description="Neutral gray system with semantic accent colors for status and priority.">
            <Showcase label="System Neutrals">
              <div className="grid grid-cols-4 gap-4">
                <ColorSwatch color="#f4f4f4" name="Background" value="#f4f4f4" />
                <ColorSwatch color="#fafafa" name="Sidebar / Card BG" value="#fafafa" />
                <ColorSwatch color="#f5f5f5" name="Card Fill" value="#f5f5f5" />
                <ColorSwatch color="#f0f0f0" name="Hover / Tag" value="#f0f0f0" />
                <ColorSwatch color="#ebebeb" name="Selected" value="#ebebeb" />
                <ColorSwatch color="#e4e4e4" name="Icon BG" value="#e4e4e4" />
                <ColorSwatch color="#d5d5d5" name="Icon Hover" value="#d5d5d5" />
                <ColorSwatch color="#888888" name="Secondary Text" value="#888888" />
                <ColorSwatch color="#5d5d5d" name="Body Text" value="#5d5d5d" />
                <ColorSwatch color="#2a2a2a" name="Dark Text" value="#2a2a2a" />
                <ColorSwatch color="#0d0d0d" name="Heading" value="#0d0d0d" />
                <ColorSwatch color="#000000" name="Primary / Black" value="#000000" />
              </div>
            </Showcase>

            <Showcase label="Semantic — Status">
              <div className="grid grid-cols-3 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center">
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                  </div>
                  <div>
                    <p className="text-[12px] font-semibold text-black">Pending</p>
                    <p className="text-[11px] text-gray-400 font-mono">amber-50 / amber-600</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center">
                    <span className="w-2 h-2 rounded-full bg-blue-400" />
                  </div>
                  <div>
                    <p className="text-[12px] font-semibold text-black">Awaiting</p>
                    <p className="text-[11px] text-gray-400 font-mono">blue-50 / blue-600</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  </div>
                  <div>
                    <p className="text-[12px] font-semibold text-black">Actioning</p>
                    <p className="text-[11px] text-gray-400 font-mono">emerald-50 / emerald-600</p>
                  </div>
                </div>
              </div>
            </Showcase>

            <Showcase label="Semantic — Action">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-orange-50 border border-orange-200 flex items-center justify-center">
                    <span className="w-2 h-2 rounded-full bg-orange-400" />
                  </div>
                  <div>
                    <p className="text-[12px] font-semibold text-black">Active / Proposed</p>
                    <p className="text-[11px] text-gray-400 font-mono">orange-50 / orange-500</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center">
                    <span className="w-2 h-2 rounded-full bg-gray-300" />
                  </div>
                  <div>
                    <p className="text-[12px] font-semibold text-black">Executed</p>
                    <p className="text-[11px] text-gray-400 font-mono">gray-50 / gray-400</p>
                  </div>
                </div>
              </div>
            </Showcase>
          </Section>

          {/* ─── Typography ─── */}
          <Section title="Typography" description="SF Pro Display / system sans-serif. Sizes from 10px to 28px with specific weight mappings.">
            <Showcase>
              <div className="space-y-4">
                <div className="flex items-baseline gap-6">
                  <span className="text-[11px] text-gray-400 font-mono w-24 shrink-0">28px Bold</span>
                  <span className="text-[28px] font-bold text-black tracking-tight">Page Title</span>
                </div>
                <div className="flex items-baseline gap-6">
                  <span className="text-[11px] text-gray-400 font-mono w-24 shrink-0">18px Bold</span>
                  <span className="text-[18px] font-bold text-black tracking-tight">Section Heading</span>
                </div>
                <div className="flex items-baseline gap-6">
                  <span className="text-[11px] text-gray-400 font-mono w-24 shrink-0">16px Bold</span>
                  <span className="text-[16px] font-bold text-black tracking-tight">Card Title</span>
                </div>
                <div className="flex items-baseline gap-6">
                  <span className="text-[11px] text-gray-400 font-mono w-24 shrink-0">15px Bold</span>
                  <span className="text-[15px] font-bold text-black tracking-tight">Modal Title</span>
                </div>
                <div className="flex items-baseline gap-6">
                  <span className="text-[11px] text-gray-400 font-mono w-24 shrink-0">14px Semi</span>
                  <span className="text-[14px] font-semibold text-black tracking-tight">Nav Item / Button</span>
                </div>
                <div className="flex items-baseline gap-6">
                  <span className="text-[11px] text-gray-400 font-mono w-24 shrink-0">13px Medium</span>
                  <span className="text-[13px] font-medium text-gray-600">Body text / description</span>
                </div>
                <div className="flex items-baseline gap-6">
                  <span className="text-[11px] text-gray-400 font-mono w-24 shrink-0">12px Semi</span>
                  <span className="text-[12px] font-semibold text-gray-600">Subtitle / filter label</span>
                </div>
                <div className="flex items-baseline gap-6">
                  <span className="text-[11px] text-gray-400 font-mono w-24 shrink-0">11px Bold</span>
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">SECTION LABEL</span>
                </div>
                <div className="flex items-baseline gap-6">
                  <span className="text-[11px] text-gray-400 font-mono w-24 shrink-0">10px Bold</span>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">TAG / BADGE</span>
                </div>
              </div>
            </Showcase>
          </Section>

          {/* ─── Spacing & Radius ─── */}
          <Section title="Spacing & Radius" description="Consistent spacing scale and border radius tokens.">
            <div className="grid grid-cols-2 gap-4">
              <Showcase label="Border Radius">
                <div className="flex items-end gap-4">
                  {[
                    { r: 'rounded-md', label: '6px', size: 'w-12 h-12' },
                    { r: 'rounded-lg', label: '8px', size: 'w-14 h-14' },
                    { r: 'rounded-xl', label: '12px', size: 'w-16 h-16' },
                    { r: 'rounded-2xl', label: '16px', size: 'w-18 h-18' },
                    { r: 'rounded-full', label: 'full', size: 'w-14 h-14' },
                  ].map(({ r, label, size }) => (
                    <div key={label} className="flex flex-col items-center gap-2">
                      <div className={`${size} ${r} bg-black/10 border border-gray-200`} style={{ width: r === 'rounded-full' ? 56 : undefined, height: r === 'rounded-full' ? 56 : undefined }} />
                      <span className="text-[10px] font-mono text-gray-400">{label}</span>
                    </div>
                  ))}
                </div>
              </Showcase>

              <Showcase label="Z-Index Scale">
                <div className="space-y-2">
                  {[
                    { z: 10, label: 'Sidebar' },
                    { z: 20, label: 'Top Nav' },
                    { z: 30, label: 'Dropdown' },
                    { z: 40, label: 'Panel' },
                    { z: 50, label: 'Overlay' },
                    { z: 60, label: 'Modal' },
                    { z: 70, label: 'Toast' },
                  ].map(({ z, label }) => (
                    <div key={z} className="flex items-center gap-3">
                      <div className="w-8 h-5 rounded bg-black flex items-center justify-center">
                        <span className="text-[9px] font-bold text-white">{z}</span>
                      </div>
                      <span className="text-[12px] font-medium text-gray-600">{label}</span>
                    </div>
                  ))}
                </div>
              </Showcase>
            </div>
          </Section>

          {/* ─── StatusBadge ─── */}
          <Section title="StatusBadge" description="Status indicator badge with semantic colors, optional pulse dot. Sizes: sm (10px), md (11px).">
            <Showcase label="All Variants" inline>
              <StatusBadge status="pending" size="sm" />
              <StatusBadge status="awaiting" size="sm" />
              <StatusBadge status="actioning" size="sm" />
              <StatusBadge status="pending" size="md" showDot />
              <StatusBadge status="awaiting" size="md" showDot />
              <StatusBadge status="actioning" size="md" showDot />
            </Showcase>
          </Section>

          {/* ─── AvatarStack ─── */}
          <Section title="AvatarStack" description="Overlapping avatar images for user groups. Shows overflow count when exceeding max.">
            <Showcase label="Sizes & Overflow" inline>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-6">
                  <span className="text-[11px] text-gray-400 font-mono w-28 shrink-0">sm, max=4</span>
                  <AvatarStack users={DEMO_USERS} max={4} size="sm" />
                </div>
                <div className="flex items-center gap-6">
                  <span className="text-[11px] text-gray-400 font-mono w-28 shrink-0">md, max=3</span>
                  <AvatarStack users={DEMO_USERS} max={3} size="md" />
                </div>
                <div className="flex items-center gap-6">
                  <span className="text-[11px] text-gray-400 font-mono w-28 shrink-0">sm, 2 users</span>
                  <AvatarStack users={DEMO_USERS.slice(0, 2)} size="sm" />
                </div>
              </div>
            </Showcase>
          </Section>

          {/* ─── TabNav ─── */}
          <Section title="TabNav" description="Horizontal tab navigation with animated spring underline and optional notification badge.">
            <Showcase>
              <TabNav
                tabs={DEMO_TABS}
                activeTab={demoTab}
                onTabChange={setDemoTab}
                layoutId="ds-tab"
              />
            </Showcase>
          </Section>

          {/* ─── SectionHeader ─── */}
          <Section title="SectionHeader" description="Compact section label with optional action link.">
            <Showcase>
              <SectionHeader title="Recent Flows" action="See all" onAction={() => {}} />
              <div className="mt-4" />
              <SectionHeader title="Assigned to you" />
            </Showcase>
          </Section>

          {/* ─── FilterDropdown ─── */}
          <Section title="FilterDropdown" description="Animated dropdown for data filtering with check mark selection indicator.">
            <Showcase inline>
              <FilterDropdown
                label="Status"
                value={filterValue}
                options={FILTER_OPTIONS}
                isOpen={filterOpen}
                onToggle={() => setFilterOpen(!filterOpen)}
                onSelect={(k) => { setFilterValue(k); setFilterOpen(false); }}
              />
            </Showcase>
          </Section>

          {/* ─── ActionCard ─── */}
          <Section title="ActionCard" description="Full-featured action cards for AI-proposed and executed actions. Supports email, group creation, and general action types.">
            <Showcase label="Proposed (Active)">
              <div className="max-w-[480px]">
                <ActionCard action={DEMO_ACTION_PROPOSED} />
              </div>
            </Showcase>
            <Showcase label="Executed">
              <div className="max-w-[480px]">
                <ActionCard action={DEMO_ACTION_EXECUTED} />
              </div>
            </Showcase>
          </Section>

          {/* ─── ActionCardCompact ─── */}
          <Section title="ActionCardCompact" description="Lightweight inline action indicator for timeline steps. Two states: active (orange) and executed (gray).">
            <Showcase label="States" inline>
              <div className="w-64">
                <ActionCardCompact label="Send confirmation email" state="active" />
              </div>
              <div className="w-64">
                <ActionCardCompact label="Create group chat" state="executed" />
              </div>
            </Showcase>
          </Section>

          {/* ─── WorkplanTimeline ─── */}
          <Section title="WorkplanTimeline" description="Vertical step timeline with status indicators, action history, and step metadata.">
            <Showcase>
              <div className="max-w-[520px]">
                <WorkplanTimeline steps={DEMO_STEPS} />
              </div>
            </Showcase>
          </Section>

          {/* ─── Modal ─── */}
          <Section title="Modal" description="Centered modal with 3 size presets. Unified backdrop (bg-black/20), max-height 75vh with scrollable body.">
            <Showcase label="Size Presets" inline>
              <button
                onClick={() => setModalSm(true)}
                className="px-4 py-2.5 text-[13px] font-semibold bg-black text-white rounded-xl hover:bg-gray-800 transition-colors"
              >
                Small (420px)
              </button>
              <button
                onClick={() => setModalMd(true)}
                className="px-4 py-2.5 text-[13px] font-semibold bg-black text-white rounded-xl hover:bg-gray-800 transition-colors"
              >
                Medium (560px)
              </button>
              <button
                onClick={() => setModalLg(true)}
                className="px-4 py-2.5 text-[13px] font-semibold bg-black text-white rounded-xl hover:bg-gray-800 transition-colors"
              >
                Large (720px)
              </button>
            </Showcase>

            <Showcase label="Modal Spec">
              <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                {[
                  ['Backdrop', 'bg-black/20, z-[60]'],
                  ['Animation', 'scale 0.96 → 1, y 8 → 0, 200ms'],
                  ['Corner Radius', 'rounded-2xl (16px)'],
                  ['Shadow', 'shadow-2xl'],
                  ['Max Height', '75vh, scrollable body'],
                  ['Header', 'Title + subtitle + close (X), border-b'],
                  ['Size sm', 'max-w-[420px]'],
                  ['Size md', 'max-w-[560px]'],
                  ['Size lg', 'max-w-[720px]'],
                ].map(([label, value]) => (
                  <div key={label} className="flex gap-2">
                    <span className="text-[11px] font-bold text-gray-400 w-24 shrink-0">{label}</span>
                    <span className="text-[12px] text-gray-600 font-mono">{value}</span>
                  </div>
                ))}
              </div>
            </Showcase>
          </Section>

          {/* ─── FloatingInput ─── */}
          <Section title="FloatingInput" description="Auto-expanding chat input with attachment buttons and enter-to-send.">
            <Showcase>
              <div className="max-w-[640px] mx-auto">
                <FloatingInput placeholder="Try typing here..." onSend={() => {}} />
              </div>
            </Showcase>
          </Section>

          {/* ─── Animation Presets ─── */}
          <Section title="Animation Presets" description="Shared motion constants for consistent animation behavior across the platform.">
            <Showcase>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-3">Spring Configs</p>
                  <div className="space-y-2">
                    {[
                      { name: 'SPRING', desc: 'damping: 30, stiffness: 300' },
                      { name: 'SPRING_SNAPPY', desc: 'damping: 25, stiffness: 200' },
                      { name: 'SPRING_TAB', desc: 'damping: 25, stiffness: 300' },
                    ].map(({ name, desc }) => (
                      <div key={name} className="flex items-center gap-3">
                        <span className="text-[12px] font-semibold text-black font-mono">{name}</span>
                        <span className="text-[11px] text-gray-400 font-mono">{desc}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-3">Transition Presets</p>
                  <div className="space-y-2">
                    {[
                      { name: 'FADE_UP', desc: 'opacity + y: 10 → 0' },
                      { name: 'FADE_SCALE', desc: 'opacity + scale: 0.97 → 1' },
                      { name: 'SLIDE_RIGHT', desc: 'x: 100% → 0' },
                      { name: 'DROPDOWN_ANIM', desc: 'opacity + y: -4 + scale: 0.95' },
                      { name: 'EASE_SMOOTH', desc: '[0.23, 1, 0.32, 1]' },
                    ].map(({ name, desc }) => (
                      <div key={name} className="flex items-center gap-3">
                        <span className="text-[12px] font-semibold text-black font-mono">{name}</span>
                        <span className="text-[11px] text-gray-400 font-mono">{desc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Showcase>
          </Section>

          {/* ─── Popup Layer Widths ─── */}
          <Section title="Popup Layer Widths" description="5-tier width system for all floating layers. Popover menus and modal dialogs each have their own scale — never mix.">
            <div className="grid grid-cols-2 gap-4">
              <Showcase label="Popover / Dropdown">
                <div className="space-y-3">
                  {[
                    { width: 200, label: 'Popover SM', desc: 'Compact menu — settings, add org', example: 'OrgRail settings, add org' },
                    { width: 300, label: 'Popover LG', desc: 'Info card — user profile, rich content', example: 'TopNav user card' },
                  ].map(({ width, label, desc, example }) => (
                    <div key={label}>
                      <div className="flex items-center gap-3 mb-1.5">
                        <div className="px-2 py-0.5 rounded bg-black">
                          <span className="text-[10px] font-bold text-white font-mono">{width}px</span>
                        </div>
                        <span className="text-[12px] font-semibold text-black">{label}</span>
                      </div>
                      <p className="text-[11px] text-gray-500 font-medium ml-[52px]">{desc}</p>
                      <p className="text-[11px] text-gray-400 font-mono ml-[52px]">{example}</p>
                    </div>
                  ))}
                </div>
              </Showcase>

              <Showcase label="Modal (Centered)">
                <div className="space-y-3">
                  {[
                    { width: 420, label: 'Modal SM', desc: 'Confirmations, single-focus', example: 'AI Settings, app detail' },
                    { width: 560, label: 'Modal MD', desc: 'Lists, artifacts, timeline', example: 'Artifacts modal, timeline' },
                    { width: 720, label: 'Modal LG', desc: 'Complex forms, multi-section', example: 'Rich editor, settings form' },
                  ].map(({ width, label, desc, example }) => (
                    <div key={label}>
                      <div className="flex items-center gap-3 mb-1.5">
                        <div className="px-2 py-0.5 rounded bg-black">
                          <span className="text-[10px] font-bold text-white font-mono">{width}px</span>
                        </div>
                        <span className="text-[12px] font-semibold text-black">{label}</span>
                      </div>
                      <p className="text-[11px] text-gray-500 font-medium ml-[52px]">{desc}</p>
                      <p className="text-[11px] text-gray-400 font-mono ml-[52px]">{example}</p>
                    </div>
                  ))}
                </div>
              </Showcase>
            </div>
          </Section>

          {/* ─── Layout Dimensions ─── */}
          <Section title="Layout Dimensions" description="Fixed layout measurements for the application shell.">
            <Showcase inline>
              {[
                { label: 'Sidebar', value: '280px' },
                { label: 'Detail Panel', value: '340px' },
                { label: 'AI Panel', value: '440px' },
                { label: 'Top Nav', value: '56px (44px actual)' },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-center gap-2 px-3 py-2 bg-white rounded-lg border border-gray-200">
                  <span className="text-[12px] font-semibold text-black">{label}</span>
                  <span className="text-[11px] text-gray-400 font-mono">{value}</span>
                </div>
              ))}
            </Showcase>
          </Section>

          {/* Footer */}
          <div className="pt-8 pb-12 border-t border-gray-200">
            <p className="text-[12px] text-gray-300 font-medium text-center">
              Tanka Design System v1.0
            </p>
          </div>
        </div>
      </div>

      {/* Modals */}
      <Modal open={modalSm} onClose={() => setModalSm(false)} size="sm" title="Small Modal" subtitle="420px max width">
        <div className="px-6 py-8 text-center">
          <p className="text-[13px] text-gray-500 font-medium">
            Use for simple confirmations, app details, or single-focus content.
          </p>
        </div>
      </Modal>

      <Modal open={modalMd} onClose={() => setModalMd(false)} size="md" title="Medium Modal" subtitle="560px max width">
        <div className="px-6 py-8 text-center">
          <p className="text-[13px] text-gray-500 font-medium">
            Use for lists, artifact views, timeline panels, and moderate-complexity content.
          </p>
        </div>
      </Modal>

      <Modal open={modalLg} onClose={() => setModalLg(false)} size="lg" title="Large Modal" subtitle="720px max width">
        <div className="px-6 py-8 text-center">
          <p className="text-[13px] text-gray-500 font-medium">
            Use for complex forms, multi-section content, and detailed views.
          </p>
        </div>
      </Modal>
    </div>
  );
}

import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { Building2, User, ArrowRight, Play, FileText, Users, Rocket, ShieldCheck, Megaphone, BarChart3, PackageCheck, GraduationCap } from 'lucide-react';
import { useChatStore } from '@/store/chat-store';
import { EASE_SMOOTH } from '@/lib/constants';

interface SOPTemplate {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  steps: number;
  category: string;
  prompt: string;
}

const ENTERPRISE_SOPS: SOPTemplate[] = [
  {
    id: 'onboarding',
    title: 'Employee Onboarding',
    description: 'Complete new hire onboarding process including system access, team intro, and training schedule.',
    icon: Users,
    steps: 8,
    category: 'HR',
    prompt: 'Create an employee onboarding flow: set up system accounts, schedule team introductions, assign onboarding buddy, create 30-60-90 day plan, and track completion of required training modules.',
  },
  {
    id: 'offboarding',
    title: 'Employee Offboarding',
    description: 'Structured offboarding with asset recovery, access revocation, and knowledge transfer.',
    icon: ShieldCheck,
    steps: 6,
    category: 'HR',
    prompt: 'Create an employee offboarding flow: revoke system access, collect company assets, conduct exit interview, transfer knowledge and documents, update team responsibilities, and close payroll.',
  },
  {
    id: 'release',
    title: 'Product Release',
    description: 'End-to-end release cycle from code freeze to production deployment and monitoring.',
    icon: Rocket,
    steps: 10,
    category: 'Engineering',
    prompt: 'Create a product release flow: code freeze, QA regression testing, staging deployment, stakeholder sign-off, production deployment, smoke tests, monitoring setup, and release notes distribution.',
  },
  {
    id: 'incident',
    title: 'Incident Response',
    description: 'Standardized incident handling with escalation, resolution, and post-mortem process.',
    icon: ShieldCheck,
    steps: 7,
    category: 'Engineering',
    prompt: 'Create an incident response flow: detect and classify severity, assemble response team, investigate root cause, implement fix, verify resolution, notify stakeholders, and schedule post-mortem.',
  },
  {
    id: 'campaign-launch',
    title: 'Campaign Launch',
    description: 'Marketing campaign launch with asset preparation, channel coordination, and performance tracking.',
    icon: Megaphone,
    steps: 9,
    category: 'Marketing',
    prompt: 'Create a marketing campaign launch flow: define goals and KPIs, prepare creative assets, set up tracking, coordinate channels (email, social, ads), schedule launch, monitor performance, and generate report.',
  },
  {
    id: 'quarterly-review',
    title: 'Quarterly Business Review',
    description: 'QBR preparation with data collection, analysis, presentation, and action item tracking.',
    icon: BarChart3,
    steps: 6,
    category: 'Operations',
    prompt: 'Create a quarterly business review flow: collect department metrics, analyze trends, prepare presentation deck, schedule review meeting, present findings, and track follow-up action items.',
  },
];

const PERSONAL_SOPS: SOPTemplate[] = [
  {
    id: 'weekly-report',
    title: 'Weekly Report',
    description: 'Auto-generate weekly progress report from tasks, commits, and meeting notes.',
    icon: FileText,
    steps: 4,
    category: 'Productivity',
    prompt: 'Create my weekly report: summarize completed tasks, highlight key achievements, list blockers and risks, and outline next week priorities based on my recent activity.',
  },
  {
    id: 'meeting-prep',
    title: 'Meeting Preparation',
    description: 'Prepare agenda, gather context, and draft talking points for upcoming meetings.',
    icon: Users,
    steps: 5,
    category: 'Productivity',
    prompt: 'Help me prepare for my upcoming meeting: review previous meeting notes, gather relevant updates, draft agenda with time allocations, prepare talking points, and create follow-up template.',
  },
  {
    id: 'learning-plan',
    title: 'Learning Plan',
    description: 'Create a structured learning roadmap with resources, milestones, and practice exercises.',
    icon: GraduationCap,
    steps: 5,
    category: 'Growth',
    prompt: 'Create a personal learning plan: assess current skill level, define learning objectives, curate resources (courses, articles, projects), set weekly milestones, and plan practice exercises.',
  },
  {
    id: 'vendor-evaluation',
    title: 'Vendor Evaluation',
    description: 'Systematic vendor comparison with criteria scoring, demos, and decision matrix.',
    icon: PackageCheck,
    steps: 6,
    category: 'Procurement',
    prompt: 'Create a vendor evaluation flow: define requirements and criteria, research candidates, schedule demos, build comparison matrix, collect team feedback, and make recommendation.',
  },
];

export function SOPLibraryPage() {
  const navigate = useNavigate();
  const addMessage = useChatStore((s) => s.addMessage);
  const [activeTab, setActiveTab] = useState<'enterprise' | 'personal'>('enterprise');

  const sops = activeTab === 'enterprise' ? ENTERPRISE_SOPS : PERSONAL_SOPS;

  // Group by category
  const grouped = sops.reduce<Record<string, SOPTemplate[]>>((acc, sop) => {
    if (!acc[sop.category]) acc[sop.category] = [];
    acc[sop.category].push(sop);
    return acc;
  }, {});

  const handleSOPClick = (sop: SOPTemplate) => {
    const channelId = 'new-flow';
    // Send the SOP prompt as a user message
    addMessage(channelId, {
      id: `user-sop-${Date.now()}`,
      channelId,
      role: 'user',
      type: 'text',
      content: sop.prompt,
      sender: { id: 'me', name: 'You', avatar: 'https://i.pravatar.cc/40?u=me' },
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    });

    // Simulate AI response
    setTimeout(() => {
      addMessage(channelId, {
        id: `ai-sop-${Date.now()}`,
        channelId,
        role: 'assistant',
        type: 'text',
        content: `好的，我来帮你执行「${sop.title}」流程。让我根据标准 SOP 制定详细的工作计划...`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      });
    }, 600);

    // Navigate to new flow
    navigate('/flow/new');
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-[#F0F7FF] to-white">
      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto no-scrollbar">
        <div className="max-w-[800px] mx-auto px-8 pt-6">
          {/* Header */}
          <h2 className="text-[22px] font-medium tracking-tight text-black" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>SOP Library</h2>
          <p className="text-[14px] text-gray-400 font-normal mt-0.5">Pre-built workflows to automate recurring processes.</p>

          {/* Tabs — tag style */}
          <div className="flex flex-wrap gap-2 mt-5">
            <button
              onClick={() => setActiveTab('enterprise')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-[14px] font-normal transition-colors ${
                activeTab === 'enterprise' ? 'bg-black text-white' : 'bg-[#E8F0FA] text-gray-700 hover:bg-[#D2E1F2]'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              Enterprise
            </button>
            <button
              onClick={() => setActiveTab('personal')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-[14px] font-normal transition-colors ${
                activeTab === 'personal' ? 'bg-black text-white' : 'bg-[#E8F0FA] text-gray-700 hover:bg-[#D2E1F2]'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              Personal
            </button>
          </div>
        </div>

        {/* Cards */}
        <div className="max-w-[800px] mx-auto px-8 py-6 space-y-8">
          {Object.entries(grouped).map(([category, templates]) => (
            <section key={category}>
              <span className="text-[12px] font-semibold uppercase tracking-widest text-gray-400 mb-3 block">
                {category}
              </span>
              <div className="grid grid-cols-2 gap-3">
                {templates.map((sop, index) => {
                  const Icon = sop.icon;
                  return (
                    <motion.button
                      key={sop.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05, ease: EASE_SMOOTH }}
                      onClick={() => handleSOPClick(sop)}
                      className="text-left p-5 rounded-2xl bg-white border border-[#D4E3F5] shadow-[0_1px_3px_rgba(0,0,0,0.03),0_4px_12px_rgba(0,0,0,0.02)] hover:border-gray-300 hover:shadow-[0_2px_6px_rgba(0,0,0,0.04),0_8px_20px_rgba(0,0,0,0.05)] active:scale-[0.99] transition-all group"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="w-9 h-9 rounded-xl bg-black flex items-center justify-center shrink-0">
                          <Icon className="w-4.5 h-4.5 text-white" />
                        </div>
                        <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Play className="w-3 h-3 text-gray-400" />
                          <span className="text-[12px] font-medium text-gray-400">Start New Flow</span>
                        </div>
                      </div>
                      <h4 className="text-[15px] font-medium text-black tracking-tight mb-1">
                        {sop.title}
                      </h4>
                      <p className="text-[14px] text-gray-400 font-medium leading-relaxed line-clamp-2">
                        {sop.description}
                      </p>
                      <div className="flex items-center gap-3 mt-3">
                        <span className="text-[12px] font-medium text-gray-300">
                          {sop.steps} steps
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-black group-hover:translate-x-0.5 transition-all" />
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}

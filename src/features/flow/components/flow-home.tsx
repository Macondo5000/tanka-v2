import { motion } from 'motion/react';
import { useNavigate } from 'react-router';
import { Sparkles, ArrowRight } from 'lucide-react';
import { SectionHeader } from '@/components/shared/section-header';
import { StatusBadge } from '@/components/shared/status-badge';
import { AvatarStack } from '@/components/shared/avatar-stack';
import { FloatingInput } from '@/components/shared/floating-input';
import { useFlowStore } from '@/store/flow-store';
import { EASE_SMOOTH } from '@/lib/constants';

const SUGGESTIONS = [
  {
    title: '强化跨端设计一致性管理流程',
    description: 'Flow改版项目中大量遗留三端交互不一致问题，建议建立更前置的跨端设计评审机制，减少验收阶段的返工成本。',
  },
  {
    title: '自动化周报汇总逻辑优化',
    description: '通过集成各端数据埋点自动生成效能周报，预计可为每位 PM 每周节省约 1.5 小时的数据整理时间。',
  },
  {
    title: '建立全球多语言评审机制',
    description: '针对海外市场版本，在设计阶段引入多语言长文本适配性评审，降低翻译上线后的界面错位风险。',
  },
];

export function FlowHome() {
  const navigate = useNavigate();
  const { flows } = useFlowStore();

  const inProgressFlows = flows.filter(
    (f) => f.status === 'actioning' || f.status === 'pending' || f.status === 'awaiting'
  ).slice(0, 6);

  const handleSend = (content: string) => {
    // TODO: handle new flow creation
    console.log('New flow:', content);
  };

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="flex-1 overflow-y-auto no-scrollbar">
        <div className="max-w-[800px] mx-auto px-8 py-8 space-y-10">
          {/* Greeting */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ease: EASE_SMOOTH, duration: 0.5 }}
          >
            <h1 className="text-[22px] font-bold tracking-tight text-black">
              {new Date().getHours() < 12 ? 'Good morning, Koko' : new Date().getHours() < 18 ? 'Good afternoon, Koko' : 'Good evening, Koko'}
            </h1>
            <p className="text-[14px] text-gray-400 font-medium mt-1" />
          </motion.div>

          {/* For You */}
          <section>
            <SectionHeader title="For You" />
            <div className="grid grid-cols-3 gap-3 mt-4">
              {SUGGESTIONS.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, ease: EASE_SMOOTH }}
                  className="relative rounded-2xl overflow-hidden bg-white border border-gray-200 flex flex-col px-5 py-4 cursor-pointer hover:border-emerald-400 hover:shadow-[0_0_12px_rgba(16,185,129,0.2)] active:scale-[0.98] transition-all"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-3 h-3 text-gray-400" />
                      <span className="text-[9px] font-bold uppercase tracking-widest text-gray-400">
                        Convert to Flow
                      </span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                  </div>
                  <h4 className="text-[14px] font-semibold text-black leading-tight tracking-tight pr-4 mb-2 truncate">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-gray-500 leading-relaxed pr-2 line-clamp-2">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* In Progress */}
          <section>
            <SectionHeader title="Recent" />
            <div className="mt-4 grid grid-cols-2 gap-3">
              {inProgressFlows.map((flow, index) => (
                <motion.div
                  key={flow.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, ease: EASE_SMOOTH }}
                  onClick={() => navigate(`/flow/${flow.id}`)}
                  className="p-4 rounded-2xl bg-[#f5f5f5] hover:bg-[#f0f0f0] active:scale-[0.99] transition-all cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="text-[14px] font-semibold text-black tracking-tight truncate pr-2">{flow.title}</h4>
                    <StatusBadge status={flow.status} />
                  </div>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="text-[12px] text-gray-400 font-medium truncate">{flow.description}</span>
                    {flow.status === 'awaiting' && flow.collaborators && flow.collaborators.length > 0 && (
                      <AvatarStack users={flow.collaborators} max={2} size="sm" />
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* Floating input */}
      <FloatingInput onSend={handleSend} placeholder="Start a new flow... describe what you want to accomplish" />
    </div>
  );
}

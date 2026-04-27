import { motion } from 'motion/react';
import { useNavigate } from 'react-router';
import { Sparkles, ArrowRight } from 'lucide-react';
import { SectionHeader } from '@/components/shared/section-header';
import { StatusBadge } from '@/components/shared/status-badge';
import { AvatarStack } from '@/components/shared/avatar-stack';
import { FloatingInput } from '@/components/shared/floating-input';
import { useFlowStore } from '@/store/flow-store';
import { EASE_SMOOTH } from '@/lib/constants';

const ease = [0.22, 1, 0.36, 1] as const;

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
    console.log('New flow:', content);
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-[#F0F7FF] to-white">
      <div className="flex-1 overflow-y-auto no-scrollbar">
        <div className="max-w-[800px] mx-auto px-8 py-10 space-y-10">

          {/* Greeting — stronger hierarchy */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ease, duration: 0.55 }}
          >
            <h1
              className="text-[38px] leading-[1.12] tracking-[-0.02em] text-gray-900"
              style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontWeight: 400 }}
            >
              What's your agenda, Koko?
            </h1>
            <p className="mt-2 text-[14px] text-gray-400 leading-relaxed">
              Pick up where you left off, or start something new.
            </p>
          </motion.div>

          {/* For You */}
          <section>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.4, ease }}
            >
              <SectionHeader title="For You" />
            </motion.div>
            <div className="grid grid-cols-3 gap-3 mt-3">
              {SUGGESTIONS.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.12 + index * 0.08, ease, duration: 0.45 }}
                  whileHover={{ y: -3, boxShadow: '0 4px 12px rgba(0,0,0,0.05), 0 12px 28px rgba(0,0,0,0.07)' }}
                  whileTap={{ scale: 0.985 }}
                  className="relative rounded-2xl overflow-hidden border border-[#D4E3F5] bg-white/60 flex flex-col px-5 py-4 cursor-pointer transition-colors duration-150 group"
                  style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 4px 10px rgba(0,0,0,0.04)' }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3 text-blue-400" />
                      <span className="text-[10px] font-semibold uppercase tracking-widest text-blue-400">
                        AI Suggestion
                      </span>
                    </div>
                    <motion.div
                      initial={{ x: 0 }}
                      whileHover={{ x: 3 }}
                      transition={{ duration: 0.15 }}
                    >
                      <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                    </motion.div>
                  </div>
                  <h4 className="text-[14px] font-semibold text-gray-900 leading-snug tracking-tight pr-2 mb-2 line-clamp-2">
                    {item.title}
                  </h4>
                  <p className="text-[12px] text-gray-500 leading-relaxed line-clamp-2">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* In Progress */}
          <section>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.28, duration: 0.4, ease }}
            >
              <SectionHeader title="Recent" />
            </motion.div>
            <div className="mt-3 grid grid-cols-2 gap-3">
              {inProgressFlows.map((flow, index) => (
                <motion.div
                  key={flow.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.05, ease: EASE_SMOOTH, duration: 0.4 }}
                  whileHover={{ y: -2, boxShadow: '0 4px 12px rgba(0,0,0,0.05), 0 12px 28px rgba(0,0,0,0.07)' }}
                  whileTap={{ scale: 0.985 }}
                  onClick={() => navigate(`/flow/${flow.id}`)}
                  className="p-4 rounded-2xl border border-[#D4E3F5] bg-white/60 cursor-pointer transition-colors duration-150"
                  style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 4px 10px rgba(0,0,0,0.04)' }}
                >
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-[14px] font-semibold text-gray-900 tracking-tight leading-snug truncate pr-1">
                      {flow.title}
                    </h4>
                    <StatusBadge status={flow.status} />
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-[12.5px] text-gray-400 truncate">{flow.description}</span>
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

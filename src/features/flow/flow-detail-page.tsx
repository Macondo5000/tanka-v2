import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import { motion } from 'motion/react';
import { ListChecks, FolderOpen, Globe, CalendarDays, FileText, Rocket } from 'lucide-react';
import { UserMenu } from '@/components/shared/user-menu';
import { useFlowStore } from '@/store/flow-store';
import { useChatStore } from '@/store/chat-store';
import { StatusBadge } from '@/components/shared/status-badge';
import { MessageItem } from '@/features/chat/components/message-item';
import { FloatingInput } from '@/components/shared/floating-input';
import { FlowTimelineModal } from './components/flow-timeline-panel';
import { FlowArtifactsModal } from './components/flow-artifacts-modal';
import { EASE_SMOOTH, staggerDelay } from '@/lib/constants';
import type { ChatMessage } from '@/types/chat';

const EMPTY_MESSAGES: ChatMessage[] = [];

const FLOW_SUGGESTIONS = [
  { text: 'Create a landing page', icon: Globe },
  { text: "Plan next week's tasks", icon: CalendarDays },
  { text: 'Summarize this week\'s progress', icon: FileText },
  { text: 'Kick off a new project', icon: Rocket },
];

export function FlowDetailPage() {
  const { flowId } = useParams();
  const flows = useFlowStore((s) => s.flows);
  const currentFlow = flowId !== 'new' ? flows.find((f) => f.id === flowId) : null;
  const scrollRef = useRef<HTMLDivElement>(null);
  const isNew = flowId === 'new';
  const [timelineOpen, setTimelineOpen] = useState(false);
  const [artifactsOpen, setArtifactsOpen] = useState(false);

  // Map flow to chat channel
  const FLOW_CHANNEL_MAP: Record<string, string> = {
    'contract': 'flow-contract',
    'q1-forecast': 'flow-q1',
    'design-audit': 'design-system',
    'product-strategy': 'flow-product-strategy',
    'resume-screening': 'flow-resume-screening',
    'onboarding-flow': 'flow-onboarding',
    'vendor-review': 'flow-vendor-review',
    'weekly-report': 'flow-weekly-report',
  };
  const channelId = (!isNew && flowId && FLOW_CHANNEL_MAP[flowId]) || 'new-flow';

  const rawMessages = useChatStore((s) => s.messages[channelId]);
  const messages = rawMessages ?? EMPTY_MESSAGES;
  const confirmAction = useChatStore((s) => s.confirmAction);
  const addMessage = useChatStore((s) => s.addMessage);

  // Step progress
  const steps = currentFlow?.workplanSteps ?? [];
  const completedCount = steps.filter((s) => s.status === 'completed').length;
  const activeStep = steps.find((s) => s.status === 'active');
  const totalSteps = steps.length;

  // Artifacts
  const artifacts = currentFlow?.artifacts ?? [];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Close modals when switching flows
  useEffect(() => {
    setTimelineOpen(false);
    setArtifactsOpen(false);
  }, [flowId]);

  const handleSend = (content: string) => {
    addMessage(channelId, {
      id: `user-${Date.now()}`,
      channelId,
      role: 'user',
      type: 'text',
      content,
      sender: { id: 'me', name: 'You', avatar: 'https://i.pravatar.cc/40?u=me' },
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    });

    // Simulate AI response for new flows
    if (isNew) {
      setTimeout(() => {
        addMessage(channelId, {
          id: `ai-${Date.now()}`,
          channelId,
          role: 'assistant',
          type: 'text',
          content: '好的，我来帮你处理这个任务。让我先分析一下需求，然后制定一个工作计划。',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        });
      }, 800);
    }
  };

  if (!isNew && !currentFlow) {
    return (
      <div className="h-full flex items-center justify-center bg-white">
        <p className="text-[15px] text-gray-300 font-medium">Flow not found</p>
      </div>
    );
  }

  // New flow — empty state with centered greeting + input + suggestions
  if (isNew && messages.length === 0) {
    return (
      <div className="h-full flex flex-col bg-gradient-to-b from-[#F0F7FF]/60 to-white relative">
        <div className="absolute top-3 right-4 z-30">
          <UserMenu />
        </div>
        <div className="flex-1 flex items-center justify-center pb-[12%]">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ease: EASE_SMOOTH, duration: 0.5 }}
            className="w-full max-w-[800px] px-8"
          >
            {/* Greeting */}
            <div className="text-center mb-6">
              <h1 className="text-[36px] font-medium tracking-tight text-black" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>
                What's your agenda, Koko?
              </h1>
            </div>

            {/* Input */}
            <FloatingInput
              onSend={handleSend}
              placeholder="Describe what you want to accomplish..."
              inline
              minHeight={140}
            />

            {/* Suggestion cards */}
            <div className="grid grid-cols-4 gap-2.5 mt-4">
              {FLOW_SUGGESTIONS.map(({ text, icon: Icon }, i) => (
                <motion.button
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.06, ease: EASE_SMOOTH }}
                  onClick={() => handleSend(text)}
                  className="px-4 py-3 rounded-xl bg-white border border-[#E4ECF4] text-left hover:bg-[#F5F8FC] active:scale-[0.98] transition-all"
                >
                  <Icon className="w-5 h-5 text-[#4A7FAD] mb-2" strokeWidth={1.8} />
                  <span className="text-[14px] text-[#5A7A95] font-normal leading-snug block">{text}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-white relative">
      {/* User menu — top right */}
      <div className="absolute top-3 right-4 z-30">
        <UserMenu />
      </div>

      {/* Header — only show for existing flows */}
      {!isNew && currentFlow && (
        <div className="px-8 py-3 shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 min-w-0">
              <h2 className="text-[18px] font-medium tracking-tight text-black truncate" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>
                {currentFlow.title}
              </h2>
              <StatusBadge status={currentFlow.status} size="md" showDot />
            </div>

            <div className="flex items-center gap-2 shrink-0 mr-12">
              {/* Artifacts button */}
              {artifacts.length > 0 && (
                <button
                  onClick={() => setArtifactsOpen(true)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#E8F0FA] text-gray-600 hover:bg-[#D2E1F2] transition-all"
                >
                  <FolderOpen className="w-3.5 h-3.5" />
                  <span className="text-[13px] font-medium">{artifacts.length}</span>
                </button>
              )}

              {/* Progress pill */}
              {totalSteps > 0 && (
                <button
                  onClick={() => setTimelineOpen(true)}
                  className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-[#E8F0FA] text-gray-600 hover:bg-[#D2E1F2] transition-all"
                >
                  <ListChecks className="w-3.5 h-3.5" />
                  <div className="flex items-center gap-2">
                    <span className="text-[13px] font-medium">
                      {completedCount}/{totalSteps}
                    </span>
                    {/* Mini progress bar */}
                    <div className="w-12 h-1.5 bg-black/10 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-black transition-all"
                        style={{ width: `${(completedCount / totalSteps) * 100}%` }}
                      />
                    </div>
                  </div>
                </button>
              )}
            </div>
          </div>
          <p className="text-[14px] text-gray-400 font-normal mt-0.5 truncate">
            {activeStep ? `Step ${steps.indexOf(activeStep) + 1}: ${activeStep.label}` : currentFlow.description}
          </p>
        </div>
      )}

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto py-6 no-scrollbar">
        <div className="max-w-[800px] mx-auto px-8 space-y-5">
          {messages.map((msg, idx) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...staggerDelay(idx), ease: EASE_SMOOTH }}
            >
              <MessageItem message={msg} onConfirmAction={confirmAction} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Input */}
      <FloatingInput
        onSend={handleSend}
        placeholder={isNew ? 'Describe what you want to accomplish...' : `Message about ${currentFlow?.title}...`}
      />

      {/* Timeline modal */}
      {currentFlow && (
        <FlowTimelineModal
          open={timelineOpen}
          steps={currentFlow.workplanSteps}
          onClose={() => setTimelineOpen(false)}
        />
      )}

      {/* Artifacts modal */}
      {currentFlow && (
        <FlowArtifactsModal
          open={artifactsOpen}
          onClose={() => setArtifactsOpen(false)}
          artifacts={artifacts}
          steps={currentFlow.workplanSteps}
          flowTitle={currentFlow.title}
        />
      )}
    </div>
  );
}

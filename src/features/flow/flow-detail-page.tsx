import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import { motion } from 'motion/react';
import { ListChecks, FolderOpen } from 'lucide-react';
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
        <p className="text-[14px] text-gray-300 font-medium">Flow not found</p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header — only show for existing flows */}
      {!isNew && currentFlow && (
        <div className="px-8 py-3 shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 min-w-0">
              <h2 className="text-[18px] font-bold tracking-tight text-black truncate">
                {currentFlow.title}
              </h2>
              <StatusBadge status={currentFlow.status} size="md" showDot />
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {/* Artifacts button */}
              {artifacts.length > 0 && (
                <button
                  onClick={() => setArtifactsOpen(true)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#f0f0f0] text-gray-600 hover:bg-[#e4e4e4] transition-all"
                >
                  <FolderOpen className="w-3.5 h-3.5" />
                  <span className="text-[12px] font-semibold">{artifacts.length}</span>
                </button>
              )}

              {/* Progress pill */}
              {totalSteps > 0 && (
                <button
                  onClick={() => setTimelineOpen(true)}
                  className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-[#f0f0f0] text-gray-600 hover:bg-[#e4e4e4] transition-all"
                >
                  <ListChecks className="w-3.5 h-3.5" />
                  <div className="flex items-center gap-2">
                    <span className="text-[12px] font-semibold">
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
          <p className="text-[13px] text-gray-400 font-medium mt-0.5 truncate">
            {activeStep ? `Step ${steps.indexOf(activeStep) + 1}: ${activeStep.label}` : currentFlow.description}
          </p>
        </div>
      )}

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto py-6 no-scrollbar">
        <div className="max-w-[800px] mx-auto px-8 space-y-5">
          {isNew && messages.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ease: EASE_SMOOTH, duration: 0.5 }}
              className="flex flex-col items-center justify-center pt-32"
            >
              <img src="/tanka-logo.svg" alt="Tanka" className="w-14 h-14 mb-5" />
              <h1 className="text-[28px] font-bold tracking-tight text-black">
                {new Date().getHours() < 12 ? 'Good morning' : new Date().getHours() < 18 ? 'Good afternoon' : 'Good evening'}, Koko
              </h1>
              <p className="text-[14px] text-gray-400 font-normal mt-2">
                What key matters are on your mind right now?
              </p>
            </motion.div>
          )}
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
        placeholder={isNew ? 'Start a new flow... describe what you want to accomplish' : `Message about ${currentFlow?.title}...`}
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

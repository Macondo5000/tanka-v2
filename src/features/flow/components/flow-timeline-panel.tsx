import { Modal } from '@/components/shared/modal';
import { WorkplanTimeline } from '@/components/shared/workplan-timeline';
import type { WorkplanStep } from '@/types/flow';

interface FlowTimelineModalProps {
  open: boolean;
  steps: WorkplanStep[];
  onClose: () => void;
}

export function FlowTimelineModal({ open, steps, onClose }: FlowTimelineModalProps) {
  const completedCount = steps.filter((s) => s.status === 'completed').length;
  const remaining = steps.filter((s) => s.status === 'pending').length;

  return (
    <Modal
      open={open}
      onClose={onClose}
      size="md"
      title="Progress"
      subtitle={`${completedCount} completed · ${remaining} remaining`}
    >
      <div className="px-6 py-5">
        <WorkplanTimeline steps={steps} />
      </div>
    </Modal>
  );
}

import { create } from 'zustand';
import type { Flow } from '@/types/flow';
import type { Status } from '@/types/common';
import { FLOWS } from '@/mock/flows';

interface FlowState {
  flows: Flow[];
  activeFlowId: string | null;
  filters: {
    status: string;
    priority: string;
    assignee: string;
  };

  setActiveFlow: (id: string | null) => void;
  updateFilters: (filters: Partial<FlowState['filters']>) => void;
  moveFlow: (flowId: string, newStatus: Status) => void;
  confirmStepAction: (flowId: string, stepId: number) => void;
}

export const useFlowStore = create<FlowState>((set) => ({
  flows: FLOWS,
  activeFlowId: null,
  filters: { status: 'all', priority: 'all', assignee: 'all' },

  setActiveFlow: (id) => set({ activeFlowId: id }),

  updateFilters: (filters) =>
    set((state) => ({ filters: { ...state.filters, ...filters } })),

  moveFlow: (flowId, newStatus) =>
    set((state) => ({
      flows: state.flows.map((f) => (f.id === flowId ? { ...f, status: newStatus } : f)),
    })),

  confirmStepAction: (flowId, stepId) =>
    set((state) => ({
      flows: state.flows.map((f) => {
        if (f.id !== flowId) return f;
        const steps = f.workplanSteps.map((s) =>
          s.id === stepId
            ? { ...s, status: 'completed' as const, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
            : s.id === stepId + 1
              ? { ...s, status: 'active' as const }
              : s
        );
        return { ...f, workplanSteps: steps };
      }),
    })),
}));

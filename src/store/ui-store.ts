import { create } from 'zustand';

interface UIState {
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
  orgRailCollapsed: boolean;
  toggleOrgRail: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  sidebarCollapsed: false,
  toggleSidebar: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
  orgRailCollapsed: false,
  toggleOrgRail: () => set((s) => ({ orgRailCollapsed: !s.orgRailCollapsed })),
}));

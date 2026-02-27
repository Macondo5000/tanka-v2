import { create } from 'zustand';

type Module = 'flow' | 'chat';

interface AppState {
  activeModule: Module;
  setActiveModule: (module: Module) => void;
}

export const useAppStore = create<AppState>((set) => ({
  activeModule: 'flow',
  setActiveModule: (module) => set({ activeModule: module }),
}));

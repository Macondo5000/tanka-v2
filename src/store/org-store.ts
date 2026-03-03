import { create } from 'zustand';

export interface Org {
  id: string;
  name: string;
  initial: string;
  bg: string;
  text: string;
  unreadCount: number;
}

export const ORGS: Org[] = [
  { id: 'miromind', name: 'MiroMind', initial: 'M', bg: 'bg-white border border-gray-200', text: 'text-black', unreadCount: 0 },
  { id: 'newsbang', name: 'Newsbang', initial: 'N', bg: 'bg-violet-500', text: 'text-white', unreadCount: 5 },
  { id: 'arcflow', name: 'ArcFlow', initial: 'A', bg: 'bg-blue-500', text: 'text-white', unreadCount: 12 },
  { id: 'sundial', name: 'Sundial Studio', initial: 'S', bg: 'bg-amber-500', text: 'text-white', unreadCount: 0 },
  { id: 'kairoslab', name: 'Kairos Lab', initial: 'K', bg: 'bg-emerald-600', text: 'text-white', unreadCount: 3 },
];

interface OrgState {
  activeOrgId: string;
  setActiveOrgId: (id: string) => void;
}

export const useOrgStore = create<OrgState>((set) => ({
  activeOrgId: ORGS[0].id,
  setActiveOrgId: (id) => set({ activeOrgId: id }),
}));

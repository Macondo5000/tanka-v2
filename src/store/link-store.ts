import { create } from 'zustand';
import type { LinkedApp } from '@/types/link';
import { APPS } from '@/mock/apps';

type LinkFilter = 'linked' | 'unlinked';

interface LinkState {
  apps: LinkedApp[];
  linkFilter: LinkFilter;
  selectedCategory: string | null;
  selectedAppId: string | null;
  setLinkFilter: (filter: LinkFilter) => void;
  setSelectedCategory: (cat: string | null) => void;
  setSelectedApp: (id: string | null) => void;
  toggleConnection: (id: string) => void;
}

export const useLinkStore = create<LinkState>((set) => ({
  apps: APPS,
  linkFilter: 'linked',
  selectedCategory: null,
  selectedAppId: null,

  setLinkFilter: (filter) => set({ linkFilter: filter, selectedCategory: null }),

  setSelectedCategory: (cat) => set({ selectedCategory: cat }),

  setSelectedApp: (id) => set({ selectedAppId: id }),

  toggleConnection: (id) =>
    set((state) => ({
      apps: state.apps.map((app) =>
        app.id === id
          ? {
              ...app,
              isConnected: !app.isConnected,
              connectedAt: !app.isConnected ? new Date().toISOString().split('T')[0] : undefined,
            }
          : app
      ),
    })),
}));

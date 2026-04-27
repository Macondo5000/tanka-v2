import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  isAuthenticated: boolean;
  email: string | null;
  signIn: (email?: string) => void;
  signOut: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      email: null,
      signIn: (email?: string) => set({ isAuthenticated: true, email: email ?? null }),
      signOut: () => set({ isAuthenticated: false, email: null }),
    }),
    { name: 'tanka-auth' }
  )
);

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface NavbarStore {
  button: string | null;
  toggle: (value: string) => void;
  isHydrated: () => boolean; 
  hasHydrated: boolean;
  setHasHydrated: (value: boolean) => void;
}

const useNavbarStore = create<NavbarStore>()(
  persist(
    (set, get) => ({
      button: null, 
      toggle: (value) => set({ button: value }),
      hasHydrated: false,
      setHasHydrated: (value) => set({ hasHydrated: value }),
      isHydrated: () => get().hasHydrated, 
    }),
    {
      name: 'navbar-storage',
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.setHasHydrated(true); 
        }
      },
    }
  )
);

export default useNavbarStore;

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AdminStore {
    isAdmin: boolean;
    setIsAdmin: (value: boolean) => void;
    isHydrated: () => boolean;
    hasHydrated: boolean;
    setHasHydrated: (value: boolean) => void;
}

const useAdminStore = create<AdminStore>()(
    persist(
        (set, get) => ({
            isAdmin: false,
            setIsAdmin: (value) => set({ isAdmin: value }),
            hasHydrated: false,
            setHasHydrated: (value) => set({ hasHydrated: value }),
            isHydrated: () => get().hasHydrated,
        }),
        {
            name: 'admin-storage',
            onRehydrateStorage: () => (state) => {
                if (state) {
                    state.setHasHydrated(true);
                }
            },
        }
    )
);

export default useAdminStore;

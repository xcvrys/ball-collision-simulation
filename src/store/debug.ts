import { create } from "zustand";

type DebugStore = {
  debug: boolean;
  showShadows: boolean;
  toggleDebug: () => void;
  toggleShadows: () => void;
};

export const useDebugStore = create<DebugStore>((set) => ({
  debug: false,
  showShadows: true,
  toggleDebug: () => set((state) => ({ debug: !state.debug })),
  toggleShadows: () => set((state) => ({ showShadows: !state.showShadows })),
}));
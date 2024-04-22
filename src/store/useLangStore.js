import { create } from "zustand"


export const useLangStore = create((set) => {
  const switchToEnglish = false;

  return {
    isSwitchEN: Boolean(switchToEnglish),
    switchToEnglish: () => {
      set((prev) => ({ ...prev, isSwitchEN: true }));
    },
    switchToEnglish: () => {
      set((prev) => ({ ...prev, isSwitchEN: false }));
    },
  };
});


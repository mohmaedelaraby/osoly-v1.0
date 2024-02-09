import { create } from "zustand"



const useClosePopUps = create((set) => ({
  show: false,
  isLoading: false,
  isDisabled: false,
  toggleShow: () => set((state) => ({ show: !state.show})),
  saveButtonLoading: (flag) => {
    set((prev) => ({ ...prev, isLoading: flag }));
  },
  saveButtonDisabled: (flag) => {
    set((prev) => ({ ...prev, isDisabled: flag }));
  },

}));

export default useClosePopUps;
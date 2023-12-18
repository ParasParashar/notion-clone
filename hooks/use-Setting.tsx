import { create } from "zustand";
type settingStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};
export const useSettings = create<settingStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

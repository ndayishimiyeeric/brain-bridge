import { create } from "zustand";

type ConfettiStore = {
  isOpen: boolean;
  OnOpen: () => void;
  OnClose: () => void;
};

const useConfettiStore = create<ConfettiStore>((set) => ({
  isOpen: false,
  OnOpen: () => set({ isOpen: true }),
  OnClose: () => set({ isOpen: false }),
}));

export default useConfettiStore;

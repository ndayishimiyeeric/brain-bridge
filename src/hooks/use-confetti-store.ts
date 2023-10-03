import create from 'zustand';

type CanfettiStore = {
  isOpen: boolean;
  OnOpen: () => void;
  OnClose: () => void;
}

const useCanfettiStore = create<CanfettiStore>((set) => ({
  isOpen: false,
  OnOpen: () => set({ isOpen: true }),
  OnClose: () => set({ isOpen: false }),
}));

export default useCanfettiStore;
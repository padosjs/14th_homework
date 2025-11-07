import { create } from "zustand";

interface UserPointsState {
  points: number;
  isChargeModalOpen: boolean;
  isLoading: boolean;
  setPoints: (points: number) => void;
  openChargeModal: () => void;
  closeChargeModal: () => void;
  setIsLoading: (loading: boolean) => void;
}

export const useUserPointsStore = create<UserPointsState>((set) => ({
  points: 0,
  isChargeModalOpen: false,
  isLoading: false,

  setPoints: (points) => set({ points }),

  openChargeModal: () => set({ isChargeModalOpen: true }),

  closeChargeModal: () => set({ isChargeModalOpen: false }),

  setIsLoading: (loading) => set({ isLoading: loading }),
}));

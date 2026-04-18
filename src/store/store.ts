import { create } from "zustand";

type State = {
  selectedId: string | null;
  setSelectedId: (id: string) => void;
};

export const useStore = create<State>((set) => ({
  selectedId: null,
  setSelectedId: (id) => set({ selectedId: id }),
}));
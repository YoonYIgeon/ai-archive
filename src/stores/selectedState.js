import { create } from "zustand";

export const useSelectedStore = create((set) => ({
  shapes: [],
  modds: [],
  setShapes: (shapes) => set({ shapes }),
  setMoods: (moods) => set({ moods }),
}));

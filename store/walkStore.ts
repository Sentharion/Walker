import { create } from "zustand";

export type Point = {
  latitude: number;
  longitude: number;
};

type WalkState = {
  points: Point[];
  distance: number;
  duration: number;
  steps: number;
  calories: number;
  isWalking: boolean;
  name: string;
  difficulty: "Łatwy" | "Średni" | "Trudny" | "";

  setPoints: (points: Point[]) => void;
  addPoint: (point: Point) => void;
  setDistance: (distance: number) => void;
  setName: (name: string) => void;
  setDifficulty: (difficulty: "Łatwy" | "Średni" | "Trudny" | "") => void;

  startWalk: () => void;
  stopWalk: () => void;
  resetWalk: () => void;
};

export const useWalkStore = create<WalkState>((set) => ({
  points: [],
  distance: 0,
  duration: 0,
  steps: 0,
  calories: 0,
  isWalking: false,
  name: "",
  difficulty: "",

  setPoints: (points) => set({ points }),

  addPoint: (point) =>
    set((state) => ({
      points: [...state.points, point],
    })),

  setDistance: (distance) => set({ distance }),

  startWalk: () =>
    set({
      isWalking: true,
      duration: 0,
      steps: 0,
      calories: 0,
    }),

  stopWalk: () =>
    set({
      isWalking: false,
    }),

  resetWalk: () =>
    set({
      points: [],
      distance: 0,
      duration: 0,
      steps: 0,
      calories: 0,
      isWalking: false,
    }),

    setName: (name) => set({ name }),
    setDifficulty: (difficulty) => set({ difficulty }),
}));
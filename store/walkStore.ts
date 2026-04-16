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
  note:string;
  templatePoints: Point[];
  startTime: number | null;


  setStartTime: (time: number | null) => void;
  setPoints: (points: Point[]) => void;
  setTemplatePoints: (points: Point[]) => void;

  addPoint: (point: Point) => void;
  setDistance: (updater: number | ((prev: number) => number)) => void;
  setName: (name: string) => void;
  setDifficulty: (difficulty: "Łatwy" | "Średni" | "Trudny" | "") => void;
  setNote: (note: string) => void;
  setCalories: (updater: number | ((prev: number) => number)) => void;
  setSteps: (updater: number | ((prev: number) => number)) => void;
  setDuration: (updater: number | ((prev: number) => number)) => void;


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
  note: "",
  templatePoints: [],
  startTime: null,


  setStartTime: (time) => set({ startTime: time }),
  setPoints: (points) => set({ points }),
  setTemplatePoints: (templatePoints) => set({ templatePoints }),

  setCalories: (updater) => set((state) => ({ 
    calories: typeof updater === "function" ? updater(state.calories) : updater 
  })),
  setSteps: (updater) => set((state) => ({ 
    steps: typeof updater === "function" ? updater(state.steps) : updater 
  })),
  setDuration: (updater) => set((state) => ({ 
    duration: typeof updater === "function" ? updater(state.duration) : updater 
  })),


  addPoint: (point) =>
    set((state) => ({
      points: [...state.points, point],
    })),

  setDistance: (updater) => set((state) => ({ 
    distance: typeof updater === "function" ? updater(state.distance) : updater 
  })),

  startWalk: () =>
    set((state) => ({
      isWalking: true,
      startTime: Date.now() - (state.duration * 1000),
    })),

  stopWalk: () =>
    set((state) => ({
      isWalking: false,
      duration: state.startTime ? Math.floor((Date.now() - state.startTime) / 1000) : state.duration,
      startTime: null,
    })),


  resetWalk: () =>
    set({
      points: [],
      templatePoints: [],
      distance: 0,
      duration: 0,
      steps: 0,
      calories: 0,
      isWalking: false,
      name: "",
      difficulty: "",
      note: "",
    }),


    setName: (name) => set({ name }),
    setDifficulty: (difficulty) => set({ difficulty }),
    setNote: (note) => set({ note }),
}));
import {create} from "zustand";
import { getGoals, saveGoals } from "@/utils/goalsStorage";

const GOALS_STORAGE_KEY = "GOALS_STORAGE";

export type GoalType = "km" | "kroki" | "spacery" | "h";


export interface Goal {
    id: string;
    name: string;
    type: GoalType;
    value: number;
    unit: string;
    finished: boolean;
    deadline: string;
    createdAt: string;
    current:number;
    target:number;
}

interface GoalStore {
    goals: Goal[];
    
    draft:{
        type: GoalType | null;
        value: number;
        unit: string;
        deadline: string | null;
        name: string;
    }

    setDraftType: (type: GoalType) => void;
    setDraftValue: (value: number) => void;
    setDraftUnit: (unit: string) => void;
    setDraftDeadline: (deadline: string | null) => void;
    setDraftName: (name: string) => void;
    saveDraft: () => void;

    resetDraft: () => void;
    finishGoal: (id: string) => void;
    unfinishGoal: (id: string) => void;
    deleteGoal: (id: string) => void;
    toggleFinished: (id: string) => void;
    loadGoals: () => Promise<void>;
}

const unit: Record<GoalType, string> = {
    km: "km",
    kroki: "kroków",
    spacery: "spacerów",
    h: "godzin",
}

export const useGoalStore = create<GoalStore>((set,get) => ({
    goals: [],

    draft: {
        type: null,
        value: 0,
        unit: "",
        deadline: null,
        name: "",
        finished: false,
    },

    setDraftType: (type) => set((state) => ({ draft: { ...state.draft, type, unit: unit[type] } })),
    setDraftValue: (value) => set((state) => ({ draft: { ...state.draft, value } })),
    setDraftUnit: (unit) => set((state) => ({ draft: { ...state.draft, unit } })),
    setDraftDeadline: (date) => set((state) => ({ draft: { ...state.draft, deadline:date } })),
    setDraftName: (name) => set((state) => ({ draft: { ...state.draft, name } })),
    resetDraft: () => set({ draft: { type: null, value: 0, unit: "", deadline: null, name: "" } }),

    saveDraft: async () => {
        const {draft,goals} = get();

        if(!draft.type || !draft.value || !draft.deadline || !draft.name) return;

        const newGoal: Goal = {
            id: Date.now().toString(),
            type: draft.type,
            value: draft.value,
            unit: draft.unit,
            deadline: draft.deadline,
            name: draft.name,
            finished: false,
            createdAt: new Date().toISOString(),
            current: 0,
            target: draft.value,
        };

        const updatedGoals = [...goals, newGoal];
        set({ goals: updatedGoals });
        get().resetDraft();

        await saveGoals(GOALS_STORAGE_KEY, updatedGoals);
    },


    finishGoal: async (id) => {
        const updatedGoals = get().goals.map((g) => g.id === id ? { ...g, finished: true } : g);
        set({ goals: updatedGoals });
        await saveGoals(GOALS_STORAGE_KEY, updatedGoals);
    },

    unfinishGoal: async (id) => {
        const updatedGoals = get().goals.map((g) => g.id === id ? { ...g, finished: false } : g);
        set({ goals: updatedGoals });
        await saveGoals(GOALS_STORAGE_KEY, updatedGoals);
    },

    deleteGoal: async (id) => {
        const updatedGoals = get().goals.filter((g) => g.id !== id);
        set({ goals: updatedGoals });
        await saveGoals(GOALS_STORAGE_KEY, updatedGoals);
    },

    toggleFinished: async (id) => {
        const updatedGoals = get().goals.map((g) => g.id === id ? { ...g, finished: !g.finished } : g);
        set({ goals: updatedGoals });
        await saveGoals(GOALS_STORAGE_KEY, updatedGoals);
    },

    loadGoals: async () => {
        const goals = await getGoals<Goal[]>(GOALS_STORAGE_KEY);
        if (goals) {
            set({ goals });
        }
    },
}));
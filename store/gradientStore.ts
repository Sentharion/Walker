import { create } from "zustand"
import { getGradient, saveGradient, type Gradient } from "@/utils/gradient"



interface GradientState {
    gradient: Gradient;
    draftGradient: Gradient;

    setGradient: (gradient: Gradient) => void;
    setDraftGradient: (gradient: Gradient) => void;

    loadGradient: () => Promise<void>;

    saveDraftGradient: () => void;
    resetDraftGradient: () => void;
}

export const useGradientStore = create<GradientState>((set, get) => ({
    gradient: ['#a855f7', '#db2777'],
    draftGradient: ['#a855f7', '#db2777'],
    setGradient: async (gradient: Gradient) => {
        set({ gradient });
        await saveGradient(gradient);
    },
    setDraftGradient: (gradient: Gradient) => {
        set({ draftGradient: gradient });
    },
    loadGradient: async () => {
        const gradient = await getGradient();
        if (gradient) {
            set({ gradient: gradient, draftGradient: gradient });
        }
    },
    saveDraftGradient: async () => {
        const { draftGradient } = get();
        set({ gradient: draftGradient });
        await saveGradient(draftGradient);
    },
    resetDraftGradient: () => {
        const { gradient } = get();
        set({ draftGradient: gradient });
    },
}));
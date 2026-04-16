import { create } from "zustand"
import { getGradient, saveGradient, type Gradient } from "@/utils/gradient"



interface GradientState {
    gradient: Gradient;
    draftGradient: Gradient;
    isEditing: boolean;

    setGradient: (gradient: Gradient) => void;
    setDraftGradient: (gradient: Gradient) => void;
    setIsEditing: (isEditing: boolean) => void;

    loadGradient: () => Promise<void>;

    saveDraftGradient: () => void;
    resetDraftGradient: () => void;
}

export const useGradientStore = create<GradientState>((set, get) => ({
    gradient: {id: 0, colors: ['#a855f7', '#db2777']},
    draftGradient: {id: 0, colors: ['#a855f7', '#db2777']},
    isEditing: false,
    setIsEditing: (isEditing: boolean) => {
        set({ isEditing });
    },
    setGradient: async (gradient: Gradient) => {
        set({ gradient });
        await saveGradient(gradient);
    },
    setDraftGradient: (gradient: Gradient) => {
        set({ draftGradient: gradient });
    },
    loadGradient: async () => {
        const gradient = await getGradient();
        if (gradient && Array.isArray(gradient.colors)) {
            set({ gradient: gradient, draftGradient: gradient });
        } else {
            console.warn("Loaded gradient is invalid, using default");
            const defaultGradient: Gradient = {id: 0, colors: ["#a855f7", "#db2777"]};
            set({ gradient: defaultGradient, draftGradient: defaultGradient });
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
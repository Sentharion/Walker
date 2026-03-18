import { getWalks } from "@/utils/walksStorage";
import { create } from "zustand";

type Point = {
    latitude: number;
    longitude: number;
};

export type SavedWalk = {
    id: string;
    name: string;
    difficulty: "Łatwy" | "Średni" | "Trudny" | "";
    distance: number;
    duration: number;
    steps: number;
    calories: number;
    points: Point[];
    finished:boolean;
    note: string;
    createdAt: string;
};

type walkStore = {
    savedWalks: SavedWalk[];
    addSavedWalk: (walk: SavedWalk) => void;
    removeSavedWalk: (id: string) => void;
    selectedWalk: SavedWalk | null;
    setSelectedWalk: (walk: SavedWalk) => void;
    updateWalkNote: (id: string, note: string) => void;
    loadSavedWalks: () => Promise<void>;
};

export const useSavedWalkStore = create<walkStore>((set) => ({
    savedWalks: [],
    addSavedWalk: (walk) => set((state) => ({ savedWalks: [...state.savedWalks, walk] })),
    removeSavedWalk: (id) => set((state) => ({ 
        savedWalks: state.savedWalks.filter((w) => w.id !== id),
        selectedWalk: state.selectedWalk?.id === id ? null : state.selectedWalk
    })),
    selectedWalk: null,
    setSelectedWalk: (walk) => set({ selectedWalk: walk }),
    updateWalkNote: (id, note) => set((state) => ({
        savedWalks: state.savedWalks.map((w) => w.id === id ? { ...w, note } : w),
        selectedWalk: state.selectedWalk?.id === id ? { ...state.selectedWalk, note } : state.selectedWalk
    })),
    loadSavedWalks: async () => {
        const walks = await getWalks();
       try{
        if (walks) {
            set({ savedWalks: walks });
        }
       }catch(error){
        console.log(error, "Błąd podczas ładowania zapisanych spacerów");
       }
    },
}));

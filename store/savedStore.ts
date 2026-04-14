import { getWalks, updateWalkStorage, removeWalk } from "@/utils/walksStorage";
import { create } from "zustand";
import { loadWalksOnline, deleteWalkOnline } from "../lib/walks";

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
    finishedAt: string;
};

type walkStore = {
    savedWalks: SavedWalk[];
    addSavedWalk: (walk: SavedWalk) => void;
    removeSavedWalk: (id: string) => void;
    selectedWalk: SavedWalk | null;
    setSelectedWalk: (walk: SavedWalk) => void;
    updateWalkNote: (id: string, note: string) => void;
    finishWalk: (id: string, data: Partial<SavedWalk>) => Promise<void>;
    loadSavedWalks: () => Promise<void>;
};


export const useSavedWalkStore = create<walkStore>((set, get) => ({
    savedWalks: [],
    addSavedWalk: (walk) => set((state) => ({ savedWalks: [...state.savedWalks, walk] })),
    removeSavedWalk: async (id) => {
        const walkToDelete = get().savedWalks.find(w => String(w.id) === String(id));
        const createdAt = walkToDelete?.createdAt;

        set((state) => ({ 
            savedWalks: state.savedWalks.filter((w) => String(w.id) !== String(id)),
            selectedWalk: state.selectedWalk?.id === id ? null : state.selectedWalk
        }));
        
        // Finalize deletion in both storages
        await removeWalk(id);
        try {
            await deleteWalkOnline(id, createdAt);
        } catch (e) {
            console.error("Failed to delete walk from Supabase", e);
        }
    },
    selectedWalk: null,
    setSelectedWalk: (walk) => set({ selectedWalk: walk }),
    updateWalkNote: (id, note) => set((state) => ({
        savedWalks: state.savedWalks.map((w) => w.id === id ? { ...w, note } : w),
        selectedWalk: state.selectedWalk?.id === id ? { ...state.selectedWalk, note } : state.selectedWalk
    })),
    finishWalk: async (id, data) => {
        set((state) => ({
            savedWalks: state.savedWalks.map((w) => w.id === id ? { ...w, ...data, finished: true, finishedAt: new Date().toISOString() } : w),
            selectedWalk: state.selectedWalk?.id === id ? { ...state.selectedWalk, ...data, finished: true, finishedAt: new Date().toISOString() } : state.selectedWalk
        }));
        await updateWalkStorage(id, { ...data, finished: true, finishedAt: new Date().toISOString() });
    },

    loadSavedWalks: async () => {
        try {
            const localWalks = await getWalks();
            const onlineWalks = await loadWalksOnline();        
            const combined = [...(localWalks || [])];
            
            if (onlineWalks && onlineWalks.length > 0) {
                onlineWalks.forEach((ow: any) => {
                    const exists = combined.some(lw => lw.id === ow.id || lw.createdAt === ow.createdAt);
                    if (!exists) {
                        combined.push(ow);
                    }
                });
            }

            combined.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

            set({ savedWalks: combined });
        } catch (error) {
            console.log(error, "Błąd podczas ładowania zapisanych spacerów");
        }
    },
}));

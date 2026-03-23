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


export const useSavedWalkStore = create<walkStore>((set) => ({
    savedWalks: [],
    addSavedWalk: (walk) => set((state) => ({ savedWalks: [...state.savedWalks, walk] })),
    removeSavedWalk: async (id) => {
        set((state) => ({ 
            savedWalks: state.savedWalks.filter((w) => w.id !== id),
            selectedWalk: state.selectedWalk?.id === id ? null : state.selectedWalk
        }));
        
        // Finalize deletion in both storages
        await removeWalk(id);
        try {
            await deleteWalkOnline(id);
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
            savedWalks: state.savedWalks.map((w) => w.id === id ? { ...w, ...data, finished: true } : w),
            selectedWalk: state.selectedWalk?.id === id ? { ...state.selectedWalk, ...data, finished: true } : state.selectedWalk
        }));
        await updateWalkStorage(id, { ...data, finished: true });
    },

    loadSavedWalks: async () => {
        try {
            // 1. Load local walks
            const localWalks = await getWalks();
            
            // 2. Load online walks
            const onlineWalks = await loadWalksOnline();

            // 3. Merge them (using ID as key to avoid duplicates)
            // Note: Currently local IDs are timestamps, Supabase IDs are UUIDs or integers.
            // For now, let's just combine them and assume they are distinct or handle basic de-duplication if needed.
            // Better: If an online walk has the same name/date, it might be the same.
            
            const combined = [...(localWalks || [])];
            
            if (onlineWalks && onlineWalks.length > 0) {
                onlineWalks.forEach((ow: any) => {
                    // Unique check by ID (since we now use UUIDs everywhere)
                    // Or fallback to createdAt/name for legacy data
                    const exists = combined.some(lw => lw.id === ow.id || lw.createdAt === ow.createdAt);
                    if (!exists) {
                        combined.push(ow);
                    }
                });
            }

            // Sort by date descending
            combined.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

            set({ savedWalks: combined });
        } catch (error) {
            console.log(error, "Błąd podczas ładowania zapisanych spacerów");
        }
    },
}));

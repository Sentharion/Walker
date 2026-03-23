import { create } from "zustand";
import { getAvatar, setAvatar } from "@/utils/avatar";
import { loadProfile, updateProfile } from "../lib/avatar";

interface UserState {
    avatar: string | null;
    username: string;
    motto: string;
    initialized: boolean;
    setAvatar: (uri: string) => void;
    setProfile: (data: { username?: string, motto?: string, avatar_url?: string }) => Promise<void>;
    loadProfile: () => Promise<void>;
}

export const useUserStore = create<UserState>((set, get) => ({
    avatar: null,
    username: "Użytkownik",
    motto: "",
    initialized: false,
    setAvatar: async (uri: string) => {
        set({ avatar: uri });
        await setAvatar(uri);
    },
    setProfile: async (updates) => {
        set((state) => ({
             ...state,
             ...updates,
             avatar: updates.avatar_url ?? state.avatar,
             username: updates.username ?? state.username,
             motto: updates.motto ?? state.motto,
        }));
        await updateProfile(updates);
    },
    loadProfile: async () => {
        try {
             const data = await loadProfile();
             if (data) {
                 set({ 
                    avatar: data.avatar_url, 
                    username: data.username, 
                    motto: data.motto || "",
                    initialized: true 
                });
             } else {
                 // Fallback to local if Supabase fails or is empty
                 const localAvatar = await getAvatar();
                 if (localAvatar) set({ avatar: localAvatar });
             }
        } catch (error) {
             console.error("Error loading user profile:", error);
        }
    },
}));
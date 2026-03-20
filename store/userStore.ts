import { create } from "zustand";
import { getAvatar, setAvatar } from "@/utils/avatar";

interface UserState {
    avatar: string | null;
    setAvatar: (uri: string) => void;
    loadAvatar: () => Promise<void>;
}

export const useUserStore = create<UserState>((set) => ({
    avatar: null,
    setAvatar: async (uri: string) => {
        set({ avatar:uri });
        await setAvatar(uri);
    },
    loadAvatar: async () => {
        const uri = await getAvatar();
        if (uri) {
            set({ avatar: uri });
        }
    },
}));
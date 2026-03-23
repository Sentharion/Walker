import AsyncStorage from "@react-native-async-storage/async-storage";

const WALKS_STORAGE_KEY = 'saved_walks';

export const saveWalk = async (walk:any) => {
    try {
        const existing = await AsyncStorage.getItem(WALKS_STORAGE_KEY);
        const walks = existing ? JSON.parse(existing) : [];
        walks.push(walk);
        await AsyncStorage.setItem(WALKS_STORAGE_KEY, JSON.stringify(walks));
    } catch (error) {
        console.log(error);
    }
};

export const getWalks = async () => {
    try {
        const data = await AsyncStorage.getItem(WALKS_STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.log("Błąd pobierania spacerów", error);
        return [];
    }
};
export const removeWalk = async (id: string) => {
    try {
        const existing = await AsyncStorage.getItem(WALKS_STORAGE_KEY);
        if (existing) {
            const walks = JSON.parse(existing);
            const filtered = walks.filter((w: any) => w.id !== id);
            await AsyncStorage.setItem(WALKS_STORAGE_KEY, JSON.stringify(filtered));
        }
    } catch (error) {
    }
};


export const updateWalkStorage = async (id: string, updatedWalk: any) => {
    try {
        const existing = await AsyncStorage.getItem(WALKS_STORAGE_KEY);
        if (existing) {
            const walks = JSON.parse(existing);
            const updated = walks.map((w: any) => w.id === id ? { ...w, ...updatedWalk } : w);
            await AsyncStorage.setItem(WALKS_STORAGE_KEY, JSON.stringify(updated));
        }
    } catch (error) {
        console.log("Błąd aktualizacji spaceru", error);
    }
};


export const hasWalkedToday = async (): Promise<boolean> => {
    try {
        const walks = await getWalks();
        const today = new Date().toISOString().split('T')[0];
        return walks.some((walk: any) => walk.createdAt && walk.createdAt.startsWith(today));
    } catch (error) {
        return false;
    }
};

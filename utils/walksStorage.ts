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

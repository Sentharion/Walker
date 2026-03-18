import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveGoals  = async <T>(key:string, data:T): Promise<void> => {
    try {
        const json = JSON.stringify(data);
        await AsyncStorage.setItem(key, json);
    } catch (error) {
        console.log("Błąd zapisu", error);
    }
};

export const getGoals = async <T>(key:string): Promise<T | null> => {
    try {
        const json = await AsyncStorage.getItem(key);
        return json ? JSON.parse(json) as T : null;
    } catch (error) {
        console.log("Błąd odczytu", error);
        return null;
    }
};

export const removeGoals = async (key:string): Promise<void> => {
    try {
        await AsyncStorage.removeItem(key);
    } catch (error) {
        console.log("Błąd usuwania", error);
    }
};

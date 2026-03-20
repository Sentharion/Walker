import AsyncStorage from "@react-native-async-storage/async-storage";

const GRADIENT_KEY = "user_gradient";

export type Gradient = [string, string];

export const getGradient = async (): Promise<Gradient> => {
    try {
        const gradient = await AsyncStorage.getItem(GRADIENT_KEY);
        return gradient ? JSON.parse(gradient) : ["#a855f7", "#db2777"];
    } catch (error) {
        console.error("Błąd przy pobieraniu gradientu:", error);
        return ["#a855f7", "#db2777"];
    }
};

export const saveGradient = async (gradient: Gradient): Promise<void> => {
    try {
        await AsyncStorage.setItem(GRADIENT_KEY, JSON.stringify(gradient));
    } catch (error) {
        console.error("Błąd przy zapisywaniu gradientu:", error);
    }
};
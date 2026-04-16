import AsyncStorage from "@react-native-async-storage/async-storage";

const GRADIENT_KEY = "user_gradient";

export type Gradient = {
    id: number;
    colors: [string, string];
}

export const getGradient = async (): Promise<Gradient> => {
    try {
        const gradient = await AsyncStorage.getItem(GRADIENT_KEY);
        if (gradient) {
            const parsed = JSON.parse(gradient);
            if (parsed && Array.isArray(parsed.colors)) {
                return parsed;
            }
        }
        return {id: 0, colors: ["#a855f7", "#db2777"]};
    } catch (error) {
        console.error("Błąd przy pobieraniu gradientu:", error);
        return {id: 0, colors: ["#a855f7", "#db2777"]};
    }
};

export const saveGradient = async (gradient: Gradient): Promise<void> => {
    try {
        await AsyncStorage.setItem(GRADIENT_KEY, JSON.stringify(gradient));
    } catch (error) {
        console.error("Błąd przy zapisywaniu gradientu:", error);
    }
};
import AsyncStorage from "@react-native-async-storage/async-storage";

const AVATAR_KEY = "user_avatar";

export const getAvatar = async (): Promise<string | null> => {
    try {
        const avatar = await AsyncStorage.getItem(AVATAR_KEY);
        return avatar;
    } catch (error) {
        console.error("Błąd przy pobieraniu awatara:", error);
        return null;
    }
};

export const setAvatar = async (avatar: string): Promise<void> => {
    try {
        await AsyncStorage.setItem(AVATAR_KEY, avatar);
    } catch (error) {
        console.error("Błąd przy zapisywaniu awatara:", error);
    }
};
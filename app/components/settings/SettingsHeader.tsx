import { Text, View } from "react-native";
import { Settings } from "lucide-react-native";

const SettingsHeader = () => {
    return (
    <View className="px-7 py-4 flex-col gap-2">
            <View className="flex-row items-center gap-2">
                <View className="bg-white/30 rounded-full p-2">
                    <Settings size={28} color="white" />
                </View>
                <Text className="text-3xl font-bold text-white">Ustawienia</Text>
            </View>
            <Text className="text-blue-100 text-md">Zarządzaj swoim kontem i preferencjami</Text>
        </View>
    );
};

export default SettingsHeader;
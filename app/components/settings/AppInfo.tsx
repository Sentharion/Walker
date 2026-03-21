import { Text, View } from "react-native";
const AppInfo = () => {
    return (
        <View className="bg-white rounded-2xl shadow-xl shadow-black/50 elevation-12 mb-1 z-10 p-5">
            <View className="flex-col items-center gap-2">
                <View className="flex-row items-center justify-between w-full">
                    <Text className="text-md font-semibold text-black">Wersja aplikacji</Text>
                    <Text className="text-sm text-gray-500">1.0.0</Text>
                </View>
                <View className="flex-row items-center justify-between w-full">
                    <Text className="text-md font-semibold text-black">Ostatnia aktualizacja</Text>
                    <Text className="text-sm text-gray-500">21.03.2026</Text>
                </View>
                <View className="flex-row items-center justify-between w-full">
                    <Text className="text-md font-semibold text-black">Autor</Text>
                    <Text className="text-sm text-gray-500">Michał Bertman</Text>
                </View>
            </View>
        </View>
    );
};

export default AppInfo;
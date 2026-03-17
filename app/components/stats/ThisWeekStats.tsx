import { Text, View } from "react-native";

const ThisWeekStats = () => {
    return (
        <View className="px-7 py-4 flex-col gap-2">
            <Text className="text-3xl font-bold text-white">Statystyki</Text>
            <Text className="text-blue-100">Śledź swoje postępy</Text>
        </View>
    );
};

export default ThisWeekStats;
import { Text, View } from "react-native";
import { TrendingUp } from "lucide-react-native";

const StatsHeader = () => {
    return (
        <View className="px-7 py-4 flex-col gap-2">
            <View className="flex-row items-center gap-2">
                <TrendingUp size={28} color="white" />
                <Text className="text-4xl font-bold text-white">Statystyki</Text>
            </View>
            <Text className="text-blue-100 text-lg">Śledź swoje postępy</Text>
        </View>
    );
};

export default StatsHeader;
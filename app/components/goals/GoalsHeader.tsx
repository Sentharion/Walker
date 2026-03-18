import { Text, TouchableOpacity, View } from "react-native";
import { Target, Plus } from "lucide-react-native";
import { useRouter } from "expo-router";

const GoalsHeader = () => {
    const router = useRouter();

    const handleAddGoal = () => {
        router.push("/goal");
    };

    return (
        <View className="px-7 py-4 flex-row justify-between items-center">
            <View className="flex-col gap-2">
                <View className="flex-row items-center gap-2">
                    <Target size={28} color="white" />
                    <Text className="text-4xl font-bold text-white">Cele</Text>
                </View>
                <Text className="text-yellow-100 text-lg">Wyznaczaj i realizuj cele</Text>
            </View>
            <TouchableOpacity className="flex-row items-center gap-2 bg-white/20 rounded-full p-2" onPress={handleAddGoal}>
                <Plus size={28} color="white" />
            </TouchableOpacity>
        </View>
    );
};

export default GoalsHeader;
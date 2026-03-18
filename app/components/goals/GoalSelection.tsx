import { Text, TouchableOpacity, View } from "react-native";
import { Target } from "lucide-react-native";
import { useGoalStore, GoalType } from "@/store/goalStore";

const goalTypes = [
    { label: "Dystans", value: "km", icon: "📍" },
    { label: "Kroki", value: "kroki", icon: "👟" },
    { label: "Spacery", value: "spacery", icon: "🚶" },
    { label: "Czas", value: "h", icon: "⏱️" },
];

const GoalSelection = () => {
    const draftType = useGoalStore((state) => state.draft.type);
    const setDraftType = useGoalStore((state) => state.setDraftType);
    return (
        <View className="bg-white rounded-xl p-6 shadow-lg ">
            <View className="flex-row gap-2 items-center">
                <Target size={24} color="#f97316" />
                <Text className="text-2xl font-semibold text-gray-800">Rodzaj celu</Text>
            </View>
            <View className="flex-row flex-wrap justify-between gap-y-5 mt-5">
                {goalTypes.map((goal) => {
                    const selected = goal.value === draftType;
                    return (
                    <TouchableOpacity
                        key={goal.value}
                        className={`border ${selected ? "border-orange-500" : "border-gray-300"} rounded-xl p-5 items-center w-[48%] ${selected ? "bg-orange-100" : ""}`}
                        onPress={() => setDraftType(goal.value as GoalType)}
                        activeOpacity={0.8}
                    >
                        <Text className="text-4xl">{goal.icon}</Text>
                        <Text className="text-gray-500">{goal.label}</Text>
                    </TouchableOpacity>
                );
                })}
            </View>
        </View>
    );
};

export default GoalSelection;
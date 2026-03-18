import { Text, TextInput, View } from "react-native";
import { Pencil } from "lucide-react-native";
import { useGoalStore } from "@/store/goalStore";

const GoalTitle = () => {
    const draft = useGoalStore((state) => state.draft);
    const setDraftName = useGoalStore((state) => state.setDraftName);
    return (
        <View className="bg-white rounded-xl p-6 shadow-lg">
            <View className="flex-row items-center gap-2 mb-2">
                <Pencil size={24} color="#f97316" />
                <Text className="text-2xl text-gray-800 font-semibold opacity-90">Nazwa celu</Text>               
            </View>
            <TextInput 
                placeholder="np. 10 spacerów w tym miesiącu"
                placeholderTextColor="#9ca3af"
                className="text-lg text-gray-800 border-2 border-gray-200 rounded-2xl p-4 font-medium focus:border-orange-500"
                value={draft.name}
                onChangeText={(text) => setDraftName(text)}
            />
        </View>
    );
};

export default GoalTitle;
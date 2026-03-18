import { Text, TextInput, View } from "react-native";
import { CirclePlus } from "lucide-react-native";
import {useGoalStore} from "@/store/goalStore";
import { useState } from "react";

const GoalTarget = () => {
    const draft = useGoalStore((state) => state.draft);
    const setDraftValue = useGoalStore((state) => state.setDraftValue);
    const [isFocused, setIsFocused] = useState(false);

    return (
        <View className="bg-white rounded-xl p-6 shadow-lg">
            <View className="flex-row items-center gap-2">
                <CirclePlus size={24} color="#f97316" />
                <Text className="text-2xl text-gray-800 font-semibold opacity-90">Cel</Text>
            </View>
            <View className={`flex-row justify-between items-center text-md text-gray-800 border-2 ${isFocused ? "border-orange-500" : "border-gray-200"} rounded-2xl p-2 font-medium mt-2`}>
            <TextInput 
                onChangeText={(text) => {
                    const numeric = text.replace(/[^0-9]/g, "");
                    const numberValue = numeric === "" ? 0 : Number(numeric);
                    setDraftValue(numberValue);
                }}
                keyboardType="numeric"
                placeholder="50"
                placeholderTextColor="#9ca3af"
                className="w-8/12"
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
            >
            </TextInput>
            <Text className="mr-2">{draft.unit ? draft.unit : ""}</Text>
            </View>
        </View>
    );
};

export default GoalTarget;
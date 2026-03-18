import { Text, TouchableOpacity, View, Alert } from "react-native";
import { useGoalStore } from "@/store/goalStore";
import { useRouter } from "expo-router";


const GoalSave = () => {
    const draft = useGoalStore((state) => state.draft);
    const saveDraft = useGoalStore((state) => state.saveDraft);
    const resetDraft = useGoalStore((state) => state.resetDraft);
    const router = useRouter();
    const handleSave = async () => {
        if(!draft.type || draft.value <=0 || !draft.deadline || draft.name.trim() === "") return Alert.alert("Błąd", "Uzupełnij wszystkie pola");
        await saveDraft();
        Alert.alert("Sukces", "Cel został dodany");
        resetDraft();
        router.back();
    };

    const handleCancel = () => {
        resetDraft();
        router.back();
    };
    return (
        <View className="bg-white rounded-xl p-6 shadow-lg flex-col gap-5">
            <View className="flex-col items-center gap-2">
                <TouchableOpacity onPress={handleSave} className="bg-orange-500 rounded-2xl p-4 w-full items-center" activeOpacity={0.8}>
                    <Text className="text-2xl text-white font-semibold opacity-90">Zapisz cel</Text>
                </TouchableOpacity>
            </View>
            <View className="flex-col items-center gap-2">
                <TouchableOpacity onPress={handleCancel} className="bg-white border-2 border-gray-200 rounded-2xl p-4 w-full items-center" activeOpacity={0.8}>
                    <Text className="text-2xl text-gray-800 font-semibold opacity-90">Anuluj</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default GoalSave;
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { useSavedWalkStore } from "@/store/savedStore";
import { Trash2 } from "lucide-react-native";
import { useRouter } from "expo-router";
import { removeWalk } from "@/utils/walksStorage";
import { deleteWalkOnline } from "@/lib/walks";

const DeleteWalk = () => {
    const router = useRouter();
    const selectedWalk = useSavedWalkStore((state) => state.selectedWalk);
    const removeSavedWalk = useSavedWalkStore((state) => state.removeSavedWalk);
    const handleRemoveWalk = async () => {
        if (selectedWalk) {
            Alert.alert("Usuń spacer", "Czy na pewno chcesz usunąć ten spacer?", [
                { text: "Nie", style: "cancel" },
                { text: "Tak", onPress: () => { removeSavedWalk(selectedWalk.id); router.back(); } }
            ]);
        }
    };
    return (
        <TouchableOpacity className="flex-row items-center justify-center bg-red-100 rounded-3xl my-6 mx-8 px-5 py-5 gap-3 border border-red-500 mb-20" onPress={handleRemoveWalk}>
            <View className="flex-row items-center justify-center gap-3">
                <Trash2 size={24} color="red" />
            </View>
            <View className="flex-col items-start">
                <Text className="text-red-900 font-bold text-md">Usuń spacer</Text>
                <Text className="text-red-700 font-bold text-sm">Usuń ten spacer z listy</Text>
            </View>
        </TouchableOpacity>
    );
};

export default DeleteWalk;
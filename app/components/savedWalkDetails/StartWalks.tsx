import { Text, TouchableOpacity, View } from "react-native";
import { useSavedWalkStore } from "@/store/savedStore";

const StartWalks = () => {
    const selectedWalk = useSavedWalkStore((state) => state.selectedWalk);
    return (
        <>
       {
        !selectedWalk?.finished ? (
            <View className="bg-white shadow-xl shadow-black/20 elevation-10 rounded-4xl mx-8 p-5 gap-3">
                <TouchableOpacity className="my-2 mx-8 bg-green-500 rounded-3xl py-4" activeOpacity={0.8} onPress={() => {}}>
                    <Text className="text-white text-center text-lg font-bold">Rozpocznij spacer</Text>
                </TouchableOpacity>
            </View>
        ) : (
            <View className="flex-row items-center justify-start bg-emerald-50 rounded-3xl my-6 mx-8 px-5 py-5 gap-3 border border-emerald-500">
                <View className="flex-row items-center justify-center gap-3">
                    <Text className="text-green-700 font-bold text-2xl">✅</Text>
                </View>
                <View className="flex-col items-start">
                    <Text className="text-green-900 font-bold text-md">Spacer zakończony!</Text>
                    <Text className="text-green-700 font-bold text-sm">Ukończyłeś ten spacer</Text>
                </View>
            </View>
        )
       }
        </>
    );
};

export default StartWalks;
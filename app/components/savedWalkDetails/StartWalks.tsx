import { Text, TouchableOpacity, View } from "react-native";
import { useSavedWalkStore } from "@/store/savedStore";
import { useWalkStore } from "@/store/walkStore";
import { useRouter } from "expo-router";
import { formatDate } from "@/utils/stats";


const StartWalks = () => {
    const router = useRouter();
    const selectedWalk = useSavedWalkStore((state) => state.selectedWalk);

    const setPoints = useWalkStore((state) => state.setPoints);
    const setTemplatePoints = useWalkStore((state) => state.setTemplatePoints);
    const setDistance = useWalkStore((state) => state.setDistance);
    const setDuration = useWalkStore((state) => state.setDuration);
    const setSteps = useWalkStore((state) => state.setSteps);
    const setCalories = useWalkStore((state) => state.setCalories);
    const setName = useWalkStore((state) => state.setName);
    const setDifficulty = useWalkStore((state) => state.setDifficulty);
    const setNote = useWalkStore((state) => state.setNote);
    const startWalk = useWalkStore((state) => state.startWalk);
    const resetWalk = useWalkStore((state) => state.resetWalk);
    

    const handleStart = () => {
        if (!selectedWalk) return;
        resetWalk();
        startWalk();

        setName(selectedWalk.name);
        setDifficulty(selectedWalk.difficulty);
        setNote(selectedWalk.note);

        if (selectedWalk.duration > 0) {
            setPoints(selectedWalk.points);
            setDistance(selectedWalk.distance);
            setDuration(() => selectedWalk.duration);
            setSteps(selectedWalk.steps);
            setCalories(selectedWalk.calories);
        } else {
            setTemplatePoints(selectedWalk.points);
            setDistance(selectedWalk.distance);
        }

        
        router.push('/livewalk');
    }


    return (
        <>
        {
         !selectedWalk?.finished ? (
             <View className="bg-white shadow-xl shadow-black/20 elevation-10 rounded-3xl mx-8 p-6 gap-3">
                  <TouchableOpacity className="my-2 mx-8 bg-green-500 rounded-3xl py-4" activeOpacity={0.8} onPress={handleStart}>
                      <Text className="text-white text-center text-lg font-bold">
                         {(selectedWalk?.duration || 0) > 0 ? "Wznów spacer" : "Rozpocznij spacer"}
                      </Text>
                  </TouchableOpacity>

             </View>
         ) : (

            <View className="flex-row items-center justify-start bg-emerald-50 rounded-3xl my-6 mx-8 px-5 py-5 gap-3 border border-emerald-500">
                <View className="flex-row items-center justify-center gap-3">
                    <Text className="text-green-700 font-bold text-2xl">✅</Text>
                </View>
                <View className="flex-col items-start">
                    <Text className="text-green-900 font-bold text-md">Spacer zakończony!</Text>
                    <Text className="text-green-700 font-bold text-sm">Ukończyłeś ten spacer {formatDate(selectedWalk?.finishedAt)}</Text>
                </View>
            </View>
        )
       }
        </>
    );
};

export default StartWalks;
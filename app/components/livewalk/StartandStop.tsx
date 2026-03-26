import { Square,Pause,Play } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";
import { useWalkStore } from "../../../store/walkStore";
import { useSavedWalkStore } from "@/store/savedStore";
import { useRouter } from "expo-router";


const StartandStop = () => {
    const router = useRouter();
    const isWalking = useWalkStore((state) => state.isWalking);
    const startWalk = useWalkStore((state) => state.startWalk);
    const stopWalk = useWalkStore((state) => state.stopWalk);


    const { points, distance, duration, steps, calories } = useWalkStore();
    const selectedWalk = useSavedWalkStore((state) => state.selectedWalk);
    const finishWalk = useSavedWalkStore((state) => state.finishWalk);

    const handleToggle = () => {
        if(isWalking) {
            stopWalk();
        } else {
            startWalk();
        }
    };

    const templatePoints = useWalkStore((state) => state.templatePoints);

    const handleFinish = async () => {
        console.log("selectedWalk:", selectedWalk);
        console.log("savedWalks:", useSavedWalkStore.getState().savedWalks);
        if (selectedWalk) {
            // Preserve route points if no GPS points recorded
            const savedPoints = points.length > 0 
                ? points 
                : (templatePoints.length > 0 ? templatePoints : selectedWalk.points);
            
            const savedDistance = distance > 0 ? distance : selectedWalk.distance;

            await finishWalk(selectedWalk.id, {
                points: savedPoints,
                distance: savedDistance,
                duration,
                steps,
                calories
            });
        }
        router.back();
    };



    return (
        <View className="flex-col items-center justify-between gap-4">
            <TouchableOpacity onPress={handleToggle} className={`bg-${isWalking ? "yellow-500" : "green-500"} rounded-2xl p-6 flex-row items-center justify-center gap-2 w-11/12`} activeOpacity={0.8}>
                {isWalking ? <Pause color="white" size={24} /> : <Play color="white" size={24} />}
                <Text className="text-white font-bold text-lg">{isWalking ? "Wstrzymaj spacer" : "Wznów spacer"}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleFinish} className="bg-red-500 rounded-2xl p-6 flex-row items-center justify-center gap-2 w-11/12" activeOpacity={0.8}>
                <Square color="white" size={24} />
                <Text className="text-white font-bold text-lg">Zakończ spacer</Text>
            </TouchableOpacity>
        </View>
    );
};

export default StartandStop;
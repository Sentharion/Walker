import { useSavedWalkStore } from "@/store/savedStore";
import { useRouter } from "expo-router";
import { Pause, Play, Square } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";
import { useWalkStore } from "../../../store/walkStore";
import { saveWalkOnline } from "../../../lib/walks";
import * as Crypto from 'expo-crypto';


const StartandStop = () => {
    const router = useRouter();
    const isWalking = useWalkStore((state) => state.isWalking);
    const startWalk = useWalkStore((state) => state.startWalk);
    const stopWalk = useWalkStore((state) => state.stopWalk);


    const { points, distance, duration, steps, calories } = useWalkStore();
    const selectedWalk = useSavedWalkStore((state) => state.selectedWalk);
    const finishWalk = useSavedWalkStore((state) => state.finishWalk);
    const addSavedWalk = useSavedWalkStore((state) => state.addSavedWalk);
    const name = useWalkStore((state) => state.name);

    const handleToggle = () => {
        if(isWalking) {
            stopWalk();
        } else {
            startWalk();
        }
    };

    const templatePoints = useWalkStore((state) => state.templatePoints);

    const resetWalk = useWalkStore((state) => state.resetWalk);

    const handleFinish = async () => {
        let finalDuration = duration;
        const currentStartTime = useWalkStore.getState().startTime;
        if (isWalking && currentStartTime) {
            finalDuration = Math.floor((Date.now() - currentStartTime) / 1000);
        }

        if (selectedWalk) {
            await finishWalk(selectedWalk.id, {
                points: points.length > 0 ? points : selectedWalk.points,
                templatePoints: templatePoints.length > 0 ? templatePoints : selectedWalk.templatePoints,
                distance: distance > 0 ? distance : selectedWalk.distance,
                duration: finalDuration,
                steps,
                calories
            });
        } else {
            const walkId = Crypto.randomUUID();
            const newWalk = {
                id: walkId,
                name: name || "Nowy spacer",
                difficulty: (useWalkStore.getState().difficulty as any) || "Średni",
                distance,
                note: useWalkStore.getState().note || "",
                points,
                duration: finalDuration,
                steps,
                calories,
                finished: true,
                createdAt: new Date().toISOString(),
                finishedAt: new Date().toISOString(),
            };
            await addSavedWalk(newWalk);
            try {
                await saveWalkOnline({
                    name: newWalk.name,
                    difficulty: newWalk.difficulty,
                    distance: newWalk.distance,
                    duration: newWalk.duration,
                    steps: newWalk.steps,
                    calories: newWalk.calories,
                    note: newWalk.note,
                    finished: newWalk.finished,
                    createdAt: newWalk.createdAt,
                }, points, walkId);
            } catch (e) {
                console.error("Error saving new walk online:", e);
            }
        }
        stopWalk();
        resetWalk();
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
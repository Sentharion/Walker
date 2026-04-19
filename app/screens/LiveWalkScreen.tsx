import { useSavedWalkStore } from "@/store/savedStore";
import { useWalkStore } from "@/store/walkStore";
import { updateWalkStorage } from "@/utils/walksStorage";
import { useEffect } from "react";
import { ScrollView, View } from "react-native";
import LiveMap from "../components/livewalk/LiveMap";
import StartandStop from "../components/livewalk/StartandStop";
import Timer from "../components/livewalk/Timer";
import WalkStats from "../components/livewalk/WalkStats";

const LiveWalkScreen = () => {
    useEffect(() => {
        // Periodic sync to get background tracking updates while the app is in foreground
        const syncInterval = setInterval(() => {
            if (useWalkStore.getState().isWalking) {
                useWalkStore.persist.rehydrate();
            }
        }, 5000);

        return () => {
            clearInterval(syncInterval);
            const walkState = useWalkStore.getState();
            const savedState = useSavedWalkStore.getState();
            const selectedWalk = savedState.selectedWalk;

            if (selectedWalk) {
                const currentWalk = savedState.savedWalks.find(w => w.id === selectedWalk.id);
                const alreadyFinished = currentWalk?.finished;

                if (!alreadyFinished && (walkState.duration > 0 || walkState.points.length > 0)) {
                    const updatedData = {
                        points: walkState.points,
                        templatePoints: walkState.templatePoints.length > 0 ? walkState.templatePoints : currentWalk?.templatePoints,
                        distance: walkState.distance > 0 ? walkState.distance : (currentWalk?.distance || 0),
                        duration: walkState.duration,
                        steps: walkState.steps,
                        calories: walkState.calories,
                    };

                    useSavedWalkStore.setState((state) => ({
                        savedWalks: state.savedWalks.map((w) =>
                            w.id === selectedWalk.id ? { ...w, ...updatedData } : w
                        ),
                        selectedWalk: state.selectedWalk?.id === selectedWalk.id
                            ? { ...state.selectedWalk, ...updatedData }
                            : state.selectedWalk,
                    }));

                    updateWalkStorage(selectedWalk.id, updatedData);
                }
            }
        };
    }, []);



    return (
        <ScrollView className="flex-1">
            <LiveMap/>
            <View className="mb-20">
                <Timer/>
                <WalkStats/>
                <StartandStop/> 
            </View>
        </ScrollView>
    );
};

export default LiveWalkScreen;

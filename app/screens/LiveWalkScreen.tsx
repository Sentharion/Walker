import StartandStop from "../components/livewalk/StartandStop";
import WalkStats from "../components/livewalk/WalkStats";
import Timer from "../components/livewalk/Timer";
import LiveMap from "../components/livewalk/LiveMap";
import { ScrollView, View } from "react-native";
import { useEffect } from "react";
import { useWalkStore } from "@/store/walkStore";
import { useSavedWalkStore } from "@/store/savedStore";
import { updateWalkStorage } from "@/utils/walksStorage";

const LiveWalkScreen = () => {
    useEffect(() => {
        return () => {
            // Auto-save stats when leaving the screen (back arrow, etc.)
            const walkState = useWalkStore.getState();
            const savedState = useSavedWalkStore.getState();
            const selectedWalk = savedState.selectedWalk;

            // Skip if walk was already finished via the "Zakończ" button
            if (selectedWalk) {
                const currentWalk = savedState.savedWalks.find(w => w.id === selectedWalk.id);
                const alreadyFinished = currentWalk?.finished;

                if (!alreadyFinished && (walkState.duration > 0 || walkState.distance > 0)) {
                    // Use GPS-recorded points if available, otherwise keep the original route
                    const savedPoints = walkState.points.length > 0 
                        ? walkState.points 
                        : (walkState.templatePoints.length > 0 ? walkState.templatePoints : currentWalk?.points || []);
                    
                    // Keep original distance if user hasn't walked
                    const savedDistance = walkState.distance > 0 
                        ? walkState.distance 
                        : (currentWalk?.distance || 0);

                    const updatedData = {
                        points: savedPoints,
                        distance: savedDistance,
                        duration: walkState.duration,
                        steps: walkState.steps,
                        calories: walkState.calories,
                    };

                    // Update in-memory store (save progress, not finish)
                    useSavedWalkStore.setState((state) => ({
                        savedWalks: state.savedWalks.map((w) =>
                            w.id === selectedWalk.id ? { ...w, ...updatedData } : w
                        ),
                        selectedWalk: state.selectedWalk?.id === selectedWalk.id
                            ? { ...state.selectedWalk, ...updatedData }
                            : state.selectedWalk,
                    }));

                    // Persist to AsyncStorage
                    updateWalkStorage(selectedWalk.id, updatedData);
                }
            }

            // Stop walk and reset on exit
            useWalkStore.getState().stopWalk();
            useWalkStore.getState().resetWalk();
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
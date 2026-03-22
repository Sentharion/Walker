import { LinearGradient } from "expo-linear-gradient";
import { useEffect } from "react";
import { Text, View } from "react-native";
import { useWalkStore } from "../../../store/walkStore";

const Timer = () => {
    const duration = useWalkStore((state) => state.duration);
    const isWalking = useWalkStore((state) => state.isWalking);
    const setDuration = useWalkStore((state) => state.setDuration);
    useEffect(() => {
        if (isWalking) {
            const interval = setInterval(() => {
                setDuration(prev => prev + 1);
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [isWalking]);
    const formattedTime = (seconds: number) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
    };
    return (
        <View className="flex-col items-center justify-center gap-2">
            <LinearGradient
                colors={["#10b981", "#14b8a6"]}
                className="w-full px-4 py-10 justify-center items-center"
            >
                <Text className="text-sm text-emerald-100 mb-2">Czas trwania spaceru</Text>
                <Text className="text-5xl font-bold text-white">{formattedTime(duration)}</Text>
            </LinearGradient>
        </View>
    );
};

export default Timer;
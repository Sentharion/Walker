import { Text, View } from "react-native";
import { useWalkStore } from "../../../store/walkStore";
import { useSavedWalkStore } from "@/store/savedStore";

const WalkStats = () => {
    const distance = useWalkStore((state) => state.distance);
    const calories = useWalkStore((state) => state.calories);
    const steps = useWalkStore((state) => state.steps);
    const selectedWalk = useSavedWalkStore((state) => state.selectedWalk);

    const displayDistance = selectedWalk?.distance || distance;
    const km = displayDistance / 1000;
    const stats = [
        {
            name: "Dystans",
            value: km > 1 ? km.toFixed(2) : Math.round(displayDistance),
            unit: km > 1 ? "km" : "m"
        },
        {
            name: "Kalorie",
            value: Math.floor(calories),
            unit: "kcal"
        },

        {
            name: "Kroki",
            value: steps,
            unit: "kroków"
        }
    ]
    return (
        <View className="p-4">
           <View className="flex-col justify-between">
            {stats.map((stat, index) => (
            <View 
                key={index} 
                className=" mb-4 flex-col items-center justify-center gap-2 bg-white rounded-3xl p-6 shadow-lg shadow-black/30 border border-gray-50"
            >
                <View className="flex-col items-center justify-center w-full flex-1">
                    <Text className="text-sm text-gray-500 tracking-widest uppercase">{stat.name}</Text>
                    <Text className="text-3xl font-bold text-gray-900">{stat.value}</Text>
                    <Text className="text-sm text-gray-500">{stat.unit}</Text>
                </View>
            </View>
           ))}
           </View>
        </View>
    );
};

export default WalkStats;
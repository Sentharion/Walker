import { Text, View } from "react-native";
import { useWalkStore,Point } from "../../../store/walkStore";
import { useEffect, useRef } from "react";


const toRad = (v:number) => v * Math.PI / 180;

const distanceBetween = (p1: Point, p2: Point) => {
    const R = 6371e3;
    const dLat = toRad(p2.latitude - p1.latitude);
    const dLon = toRad(p2.longitude - p1.longitude);

    const lat1 = toRad(p1.latitude);
    const lat2 = toRad(p2.latitude);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.sin(dLon / 2) * Math.sin(dLon / 2) *
        Math.cos(lat1) * Math.cos(lat2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

const WalkStats = () => {
    const points = useWalkStore((state) => state.points);
    const setCalories = useWalkStore((state) => state.setCalories);

    const setSteps = useWalkStore((state) => state.setSteps);
    
    const distance = useWalkStore((state) => state.distance);
    const calories = useWalkStore((state) => state.calories);
    const steps = useWalkStore((state) => state.steps);

    const lastPointsCount = useRef(points.length);

    const MIN_DISTANCE_THRESHOLD = 3; // meters - filter GPS noise/drift

    useEffect(() => {
        // Calculate incremental calories/steps only when exactly one point is added
        if (points.length > 1 && points.length === lastPointsCount.current + 1) {
            const lastPoint = points[points.length - 1];
            const secondLastPoint = points[points.length - 2];
            const newDistance = distanceBetween(secondLastPoint, lastPoint);
            
            // Only count movement above the noise threshold
            if (newDistance > MIN_DISTANCE_THRESHOLD) {
                setCalories((prev: number) => prev + newDistance * 0.05);
                setSteps((prev: number) => prev + Math.round(newDistance / 0.75));
            }
        }
        lastPointsCount.current = points.length;
    }, [points, setCalories, setSteps]);



    const km = distance / 1000;
    const stats = [
        {
            name: "Dystans",
            value: km > 1 ? km.toFixed(2) : distance,
            unit: km > 1 ? "km" : "m"
        },
        {
            name: "Kalorie",
            value: calories.toFixed(2),
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
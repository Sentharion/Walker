import { SavedWalk, useSavedWalkStore } from "@/store/savedStore";
import { useWalkStore } from "@/store/walkStore";

import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { ChevronRight, Clock, Footprints, MapPin, Play } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";
import { formatDate } from "@/utils/stats";

interface WalkCardProps {
    walk:SavedWalk
}

const WalkCard = ({walk}: WalkCardProps) => {
    const router = useRouter();
    const setSelectedWalk = useSavedWalkStore((state) => state.setSelectedWalk);
    const handleDetails = () => {
        setSelectedWalk(walk);
        router.push('/savedWalk');
    }
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

    const formatKm = (distance: number) => {
        if (distance >= 1000) {
            return `${(distance / 1000).toFixed(1)} km`;
        }
        return `${Math.round(distance)} m`;
    }


    const formatTime = (time: number) => {
        const hours = Math.floor(time / 3600);
        const minutes = Math.floor((time % 3600) / 60);
        const seconds = time % 60;
        if(hours > 0) {
            return `${hours}g ${minutes}min`;
        }
        else if(minutes > 0) {
            return `${minutes}min`;
        }
        else {
            return `${seconds}s`;
        }
    }

    const handleStart = () => {
        setSelectedWalk(walk);
        resetWalk();
        startWalk();
        
        setName(walk.name);
        setDifficulty(walk.difficulty);
        setNote(walk.note);

        if (walk.duration > 0 || walk.finished) {
            setPoints(walk.points);
            setTemplatePoints(walk.templatePoints || []);
            setDistance(walk.distance);
            setDuration(() => walk.duration);
            setSteps(walk.steps);
            setCalories(walk.calories);
        } else {
            setTemplatePoints(walk.points);
            setDistance(walk.distance);
        }

        
        router.push('/livewalk');
    }


    return (
        <View className="w-full py-2">
            <View className="bg-white rounded-3xl shadow-xl shadow-black/50 elevation-12 mx-2 mb-1 z-10">
                <View className="rounded-3xl overflow-hidden">
                    <LinearGradient 
                        colors={['#059669', '#2dd4bf', '#0ea5e9']} 
                        start={{ x: 0, y: 0 }} 
                        end={{ x: 1, y: 1 }}
                        className="flex-col items-center justify-center gap-2 p-4"
                    >
                       <View className="flex-row w-full items-center px-2 gap-3 mb-2 justify-between">
                        <View className="flex-col items-start justify-center">
                            <Text className="text-xl text-white font-semibold">{walk.name}</Text>
                            <Text className="text-md text-white ">{formatDate(walk.finishedAt || walk.createdAt)}</Text>
                        </View>
                            <View className="flex-row items-center gap-1">
                                <Text className={`text-md text-white font-semibold ${walk.difficulty === "Łatwy" ? "bg-green-500" : walk.difficulty === "Średni" ? "bg-yellow-500" : "bg-red-500"} rounded-full px-2 py-1`}>{walk.difficulty}</Text>
                            </View>
                       </View>
                       <View className="flex-row w-full items-center px-2 mb-2 gap-4 justify-start">
                       <View className="flex-row items-center gap-3">
                            <View className="flex-row items-center gap-1">
                                <MapPin size={18} color="white"/>
                                <Text className="text-md text-white">{formatKm(walk.distance)}</Text>
                            </View>
                            <View className="flex-row items-center gap-1">
                                <Clock size={18} color="white"/>
                                <Text className="text-md text-white">{formatTime(walk.duration)}</Text>
                            </View>
                       </View>
                        <View className="flex-row items-center gap-1">
                            <Footprints size={18} color="white" fill="white"/>
                            <Text className="text-md text-white">{walk.steps}</Text>
                        </View>
                       </View>
                      <View className="flex-row items-center gap-2 w-full">
                        {walk.finished ? (
                            <TouchableOpacity className="flex-1 flex-row items-center gap-2 bg-white/20 rounded-2xl px-2 py-1 h-12 justify-center" activeOpacity={0.8} onPress={handleDetails}>
                                <Text className="text-md text-white font-semibold"> ✓ Ukończono </Text>
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity className="flex-1 flex-row items-center gap-2 bg-white/20 rounded-2xl px-2 py-1 h-12 justify-center" activeOpacity={0.8} onPress={handleStart}>
                                <Play color="white" fill="white" size={16} />
                                <Text className="text-md text-white font-semibold"> {walk.duration > 0 ? "Wznów" : "Rozpocznij"}</Text>
                            </TouchableOpacity>

                        )}

                        <TouchableOpacity className="flex-1 flex-row  items-center gap-2 bg-white/20 rounded-2xl px-1 py-1 h-12 w-12 justify-center" activeOpacity={0.8} onPress={handleDetails} >
                            <Text className="text-md text-white font-semibold">Szczegóły</Text>
                            <ChevronRight color="white" size={16} />
                        </TouchableOpacity>
                      </View>
                    </LinearGradient>
                </View>
            </View>
        </View>
    );
};

export default WalkCard;

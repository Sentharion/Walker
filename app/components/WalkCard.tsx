import { Footprints, Play, ChevronRight} from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";

interface WalkCardProps {
    name: string;
    difficulty: string;
    distance: string;
    time: string;
    steps: string;
    walkFinished: boolean;
}

const WalkCard = ({name, difficulty, distance, time, steps, walkFinished, }: WalkCardProps) => {
    const router = useRouter();
    const handlePress = () => {
        router.push('/savedWalk');
    }
    return (
       <View className="flex-col items-center gap-2">
                <View className="flex-row items-center gap-2">
                    <View className="flex-col items-center justify-center gap-1  bg-lime-500 rounded-3xl p-5 mt-3">
                       <View className="flex-row w-full items-center px-2 gap-2 justify-between">
                            <Text className="text-xl text-white font-semibold">{name}</Text>
                            <View className="flex-row items-center gap-1">
                                <Text className={`text-md text-white font-semibold ${difficulty === "Łatwy" ? "bg-green-500" : difficulty === "Średni" ? "bg-yellow-500" : "bg-red-500"} rounded-full px-2 py-1`}>{difficulty}</Text>
                            </View>
                       </View>
                       <View className="flex-row w-full items-center px-2 mb-2 gap-2 justify-start">
                        <Text className="text-md text-white">{distance} • {time}</Text>
                        <View className="flex-row items-center gap-1">
                            <Footprints size={18} color="white" fill="white"/>
                            <Text className="text-md text-white">{steps}</Text>
                        </View>
                       </View>
                      <View className="flex-row items-center gap-2 w-full">
                        <TouchableOpacity className="flex-1 flex-row items-center gap-2 bg-white/20 rounded-2xl px-2 py-1 h-12 justify-center" activeOpacity={0.8}>
                            <Play color="white" fill="white" size={16} />
                            <Text className="text-md text-white font-semibold"> Rozpocznij</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className="flex-1 flex-row  items-center gap-2 bg-white/20 rounded-2xl px-1 py-1 h-12 w-12 justify-center" activeOpacity={0.8} onPress={handlePress} >
                            <Text className="text-md text-white font-semibold">Szczegóły</Text>
                            <ChevronRight color="white" size={16} />
                        </TouchableOpacity>
                      </View>
                    </View>
                </View>
            </View>
    );
};

export default WalkCard;

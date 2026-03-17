import { Calendar, Clock, Flame, MapPin, Footprints, ChevronRight } from "lucide-react-native";
import {View ,Text, TouchableOpacity} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { monthGradients } from "@/types/types";

interface MonthCardProps {
    month: string;
    walks: number;
    distance: number;
    time: number;
    calories: number;
    steps: number;
    showYear?: boolean;
}

const tab = {
    time: {
        icon: Clock,
        color: "blue",
        label: "Czas",
        value: "10",
        unit: "Minut"
    },
    calories: {
        icon: Flame,
        color: "red",
        label: "Spalone kalorie",
        value: "10",
        unit: "Kalorie"
    },
    steps: {
        icon: Footprints,
        color: "orange",
        label: "Kroki",
        value: "10.000",
        unit: "Kroków"
    }
}

const MonthCard = ({month, walks, distance, time, calories, steps, showYear}: MonthCardProps) => {
    const router = useRouter();
    return (
        <View className="px-2 gap-2 flex-1 rounded-2xl overflow-hidden">
            <LinearGradient
                colors={monthGradients[month] ||['#3b82f6', '#9333ea']}
                className='absolute inset-0 rounded-2xl'                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
            />
            <View className="flex-col items-center gap-2 py-4">
                <View className="flex-row items-center w-full px-2 justify-between mb-3">
                    <View className="flex-row items-center gap-2">
                        <Calendar size={24} color="white" />
                        <Text className="text-white font-semibold text-lg">{month}</Text>
                    </View>
                    {showYear && (
                        <TouchableOpacity onPress={() => router.push('/months')}>
                            <View className="flex-row items-center gap-1 bg-white/20 backdrop-blur rounded-2xl p-2">
                                <Text className="text-white text-sm">Cały rok</Text>
                                <ChevronRight size={14} color="white" />
                            </View>
                        </TouchableOpacity>
                    )}
                </View>
                <View className="flex-row justify-start items-start gap-1 p-3 bg-white/95 backdrop-blur rounded-2xl">
                    <View className="flex-row items-center gap-2">
                        <View className="w-12 h-12 flex items-center justify-center rounded-full bg-purple-500 p-2">
                            <MapPin size={24} color="white" />
                        </View>
                        <View className="flex-row gap-1">
                            <Text className="text-black font-semibold text-lg">{walks}</Text>
                            <Text className="text-black text-lg">Spacerów</Text>
                        </View>
                    </View>
                </View>
                <View className="flex-row gap-5 px-3 mt-3">
                    <View className="flex-1 bg-white/95 backdrop-blur rounded-2xl p-4">
                        <View className="flex-row items-center gap-1 mb-1">
                            <MapPin size={14} color="green" />
                            <Text className="text-gray-600 font-semibold text-sm">Dystans</Text>
                        </View>
                        <View className="flex-col gap-1">
                            <Text className="text-black font-semibold text-3xl">10</Text>
                            <Text className="text-gray-500 text-xs">Kilometrów</Text>
                        </View>
                    </View>
                </View>
                <View className="flex-row gap-4 py-3 px-3">
                    {Object.entries(tab).map(([key, value]) => (
                        <View key={key} className="flex-1 bg-white/95 backdrop-blur rounded-2xl p-4">
                            <View className="flex-row items-center gap-2 mb-1">
                                <value.icon size={14} color={value.color} />
                            </View>
                            <View className="flex-col gap-1 items-start justify-start">
                                <Text className="text-black font-semibold text-xl">{value.value}</Text>
                                <Text className="text-gray-500 text-xs">{value.label}</Text>
                            </View>
                        </View>
                    ))}
                </View>
            </View>
        </View>
    );
};

export default MonthCard;
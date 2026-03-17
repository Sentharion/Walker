import { Text, View } from "react-native";
import { Calendar, MapPin, Clock, Footprints, Flame } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";

const ThisWeekStats = () => {
    return (
        <View className="px-2 py-2 gap-2 flex-1 rounded-2xl overflow-hidden">
            <LinearGradient
                colors={['#10b981', '#14b8a6']}
                className='absolute inset-0 rounded-2xl'
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
            />
            <View className="flex-col items-center gap-2 py-4">
                <View className="flex-row items-center w-full px-2 justify-between mb-3">
                    <View className="flex-row items-center gap-2">
                        <View className="rounded-full bg-white/10 p-2">
                            <Calendar size={24} color="white" />
                        </View>
                        <Text className="text-white font-semibold text-lg">Mój tydzień</Text>
                    </View>
                    <Text className="text-blue-100 ">10 spacerów</Text>
                </View>
                <View className="flex-row gap-5 px-6">
                    <View className="flex-1 bg-white/95 backdrop-blur rounded-2xl p-4">
                        <View className="flex-row items-center gap-2 mb-1">
                            <MapPin size={14} color="green" />
                            <Text className="text-gray-600 font-semibold text-sm">Dystans</Text>
                        </View>
                        <View className="flex-col gap-1">
                            <Text className="text-black font-semibold text-3xl">10</Text>
                            <Text className="text-gray-500 text-xs">Kilometrów</Text>
                        </View>
                    </View>
                    <View className="flex-1 bg-white/95 backdrop-blur rounded-2xl p-4">
                        <View className="flex-row items-center gap-2 mb-1">
                            <Clock size={14} color="blue" />
                            <Text className="text-gray-600 font-semibold text-sm">Czas</Text>
                        </View>
                        <View className="flex-col gap-1">
                            <Text className="text-black font-semibold text-3xl">10</Text>
                            <Text className="text-gray-500  text-xs">Minut</Text>
                        </View>
                    </View>
                </View>
                <View className="flex-row gap-5 mt-3 px-6">
                    <View className="flex-1 bg-white/95 backdrop-blur rounded-2xl p-4">
                        <View className="flex-row items-center gap-2 mb-1">
                            <Footprints size={14} color="orange" />
                            <Text className="text-gray-600 font-semibold text-sm">Kroki</Text>
                        </View>
                        <View className="flex-col gap-1">
                            <Text className="text-black font-semibold text-3xl">10.000</Text>
                            <Text className="text-gray-500 text-xs">Kroków</Text>
                        </View>
                    </View>
                    <View className="flex-1 bg-white/95 backdrop-blur rounded-2xl p-4">
                        <View className="flex-row items-center gap-2 mb-1">
                            <Flame size={14} color="red" />
                            <Text className="text-gray-600 font-semibold text-sm">Kalorie</Text>
                        </View>
                        <View className="flex-col gap-1">
                            <Text className="text-black font-semibold text-3xl">10</Text>
                            <Text className="text-gray-500 text-xs">Spalono</Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default ThisWeekStats;
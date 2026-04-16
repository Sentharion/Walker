import { useSavedWalkStore } from "@/store/savedStore";
import { formatDistance, getDailyStats } from "@/utils/stats";
import { LinearGradient } from "expo-linear-gradient";
import { CalendarCheck, Clock, Flame, Footprints, MapPin } from "lucide-react-native";
import { Text, View } from "react-native";

const DailyAcitivity = () => {
    const walks = useSavedWalkStore(state => state.savedWalks);
    const stats = getDailyStats(walks);
    const TodayIndex = (new Date().getDay() + 6) % 7;

    return (
        <View className="px-2 py-2 mb-20 gap-2 flex-1 rounded-2xl overflow-hidden shadow-lg bg-white/95 backdrop-blur">
            <View className="flex-row items-center justify-between px-2">
                <Text className="text-gray-800 *:font-semibold text-lg p-2 " >Codzienna aktywność</Text>
                <Text className="text-gray-500 text-xs">Ten tydzień</Text>
            </View>

            <View className="flex-col gap-2">
                {stats.map((dayData,index) => {
                    const isToday = index === TodayIndex;
                    const isRest = dayData.walks === 0;
                    const isPast = index < TodayIndex;
                    const isFinished = !isRest;

                    const tab = {
                        distance: { label: "Dystans", value: `${formatDistance(dayData.distance,true)}`, icon: MapPin, color: "#3b82f6" },
                        duration: { label: "Czas", value: `${Math.floor(dayData.duration / 60)} min`, icon: Clock, color: "#ef4444" },
                        steps: { label: "Kroki", value: dayData.steps.toLocaleString(), icon: Footprints, color: "#10b981" },
                        calories: { label: "Kalorie", value: `${dayData.calories.toFixed(1)} kcal`, icon: Flame, color: "#f59e0b" },
                    };

                    if(!isPast && !isToday){
                        return (
                            <View key={dayData.day} className="flex-1 flex-row items-center justify-center bg-white/95 backdrop-blur rounded-2xl p-1">
                                <View className="flex-row items-center gap-1 bg-gray-50 rounded-2xl p-4">
                                    <View className={`rounded-full border border-gray-300 bg-white w-14 h-14 items-center justify-center`}>
                                        <Text className={`font-semibold text-xl text-black`}>{dayData.day}</Text>
                                    </View>
                                    <View className="flex-1 flex-row items-start justify-start px-5">
                                        <Text className="text-black font-semibold text-lg">Odpoczynek</Text>
                                    </View>
                                </View>
                            </View>
                        );
                    }
                    if(isPast)
                    {
                        if(isFinished)
                        {
                            return (
                                <View key={dayData.day} className="rounded-2xl overflow-hidden ">
                                    <LinearGradient
                                        colors={['#22c55e', '#16a34a']}
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 0 }}
                                        className="p-4"
                                    >
                                        <View className="flex-col items-center">
                                            <View className="flex-row items-center justify-between w-full px-2 gap-2 mb-2">
                                                <View className="flex-row items-center gap-2">
                                                    <View className="rounded-full border border-green-400/30 bg-green-600 w-12 h-12 items-center justify-center">
                                                        <CalendarCheck size={24} color="white" />
                                                    </View>
                                                    <Text className="text-white text-md font-bold">{dayData.day}</Text>
                                                </View>
                                                <View className="flex-row items-center gap-2">
                                                    <Text className="text-white text-xs">{dayData.walks} {dayData.walks === 1 ? "Spacer" : dayData.walks === 2 || dayData.walks === 3 || dayData.walks === 4 ? "Spacery" : "Spacerów"}</Text>
                                                </View>
                                            </View>
                                            <View className="w-full bg-white/95 rounded-2xl p-4">
                                                <View className="flex-row justify-between">
                                                    {Object.entries(tab).map(([key, value], index) => (
                                                        <View key={key} className={`
                                                            flex-1 items-center px-2
                                                            ${index !== Object.keys(tab).length - 1 ? "border-r border-gray-200" : ""}
                                                        `}>
                                                            <value.icon size={18} color={value.color} />
                                                            <Text
                                                                className="text-black font-bold text-lg mt-1"
                                                                style={{ fontVariant: ['tabular-nums'] }}
                                                            >
                                                                {value.value}
                                                            </Text>
                                                            <Text className="text-gray-500 text-xs text-center">
                                                                {value.label}
                                                            </Text>
                                                        </View>
                                                    ))}
                                                </View>
                                            </View>
                                        </View>
                                    </LinearGradient>
                                </View>
                            );
                        }else{
                            return(
                                <View key={dayData.day} className="flex-1 flex-row items-center justify-center bg-white/95 backdrop-blur rounded-2xl p-1">
                                <View className="flex-row items-center gap-1 bg-gray-50 rounded-2xl p-4">
                                    <View className={`rounded-full border border-gray-300 bg-white w-14 h-14 items-center justify-center`}>
                                        <Text className={`font-semibold text-xl text-black`}>{dayData.day}</Text>
                                    </View>
                                    <View className="flex-1 flex-row items-start justify-start px-5">
                                        <Text className="text-black font-semibold text-lg">Odpoczynek</Text>
                                    </View>
                                </View>
                            </View>
                            );
                        }
                    }
                    if(isToday){
                        if(isRest){
                            return(
                                <View key={dayData.day} className="flex-1 flex-row items-center justify-center bg-white/95 backdrop-blur rounded-2xl p-1">
                                <View className="flex-row items-center gap-1 bg-emerald-500 rounded-2xl p-4 border border-emerald-400">
                                     <LinearGradient
                                colors={['#22c55e', '#16a34a']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                className={`rounded-full w-14 h-14 border border-emerald-400 items-center justify-center shadow-lg shadow-emerald-500/50`}
                                >
                                    <View>
                                        <Text className={`font-semibold text-xl text-white`}>{dayData.day}</Text>
                                    </View>
                                </LinearGradient>
                                    
                                    <View className="flex-1 flex-row items-start justify-start px-5">
                                        <Text className="text-white font-semibold text-lg">Odpoczynek</Text>
                                    </View>
                                </View>
                            </View>
                            );
                        }else{
                            return(
                                <View key={dayData.day} className="rounded-2xl overflow-hidden ">
                            <LinearGradient
                                colors={['#22c55e', '#16a34a']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                className="p-4"
                            >
                                <View className="flex-col items-center">
                                    <View className="flex-row items-center justify-between w-full px-2 gap-2 mb-2">
                                        <View className="flex-row items-center gap-2">
                                            <View className="rounded-full border border-green-400/30 bg-green-600 w-12 h-12 items-center justify-center">
                                                <CalendarCheck size={24} color="white" />
                                            </View>
                                            <Text className="text-white text-md font-bold">{dayData.day}</Text>
                                        </View>
                                        <View className="flex-row items-center gap-2">
                                            <Text className="text-white text-xs">{dayData.walks} {dayData.walks === 1 ? "Spacer" : dayData.walks === 2 || dayData.walks === 3 || dayData.walks === 4 ? "Spacery" : "Spacerów"}</Text>
                                        </View>
                                    </View>
                                      <View className="w-full bg-white/95 rounded-2xl p-4">
                                        <View className="flex-row justify-between">
                                            {Object.entries(tab).map(([key, value], index) => (
                                                <View key={key} className={`
                                                    flex-1 items-center px-2
                                                    ${index !== Object.keys(tab).length - 1 ? "border-r border-gray-200" : ""}
                                                `}>
                                                    <value.icon size={18} color={value.color} />
                                                    <Text
                                                        className="text-black font-bold text-sm mt-1"
                                                        style={{ fontVariant: ['tabular-nums'] }}
                                                    >
                                                        {value.value}
                                                    </Text>
                                                    <Text className="text-gray-500 text-xs text-center">
                                                        {value.label}
                                                    </Text>
                                                </View>
                                            ))}
                                        </View>
                                    </View>
                                </View>
                            </LinearGradient>
                        </View>
                            );
                        }
                    }
                })}
            </View>
        </View>
    );
};

export default DailyAcitivity;
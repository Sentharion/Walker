import { Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { CalendarCheck, MapPin, Clock, Flame, Footprints } from "lucide-react-native";

const days = ["Pon","Wt","Śr","Czw","Pt","Sob","Nie"]

const tab = {
    distance: {
        icon: MapPin,
        color: "green",
        label: "Dystans",
        value: "10",
        unit: "Kilometrów"
    },
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
        label: "Kalorie",
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

interface DailyActivityProps {
    day: string;
    isRest: boolean;
}

const DailyAcitivity = ({day, isRest}: DailyActivityProps) => {
    return (
        <View className="px-2 py-2 mb-12 gap-2 flex-1 rounded-2xl overflow-hidden bg-white/95 backdrop-blur">
            <View className="flex-row items-center justify-between px-2">
                <Text className="text-gray-800 *:font-semibold text-lg p-2 " >Codzienna aktywność</Text>
                <Text className="text-gray-500 text-xs">Ten tydzień</Text>
            </View>
            <View className="flex-col gap-2">
                {days.map((day) => (
                    isRest ? (
                        <View key={day} className="flex-1 flex-row items-center justify-center bg-white/95 backdrop-blur rounded-2xl p-1">
                            <View className="flex-row items-center gap-1 bg-gray-50 rounded-2xl p-4">
                                <View className="rounded-full border border-gray-300 bg-white w-14 h-14 items-center justify-center">
                                    <Text className="text-black font-semibold text-xl">{day}</Text>
                                </View>
                                <View className="flex-1 flex-row items-start justify-start px-5">
                                    <Text className="text-black font-semibold text-lg">Dzień wolny</Text>
                                </View>
                            </View>
                        </View>
                    ) : (
                         <View key={day} className="rounded-2xl overflow-hidden ">
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
                                            <Text className="text-white text-md font-bold">{day}</Text>
                                        </View>
                                        <View className="flex-row items-center gap-2">
                                            <Text className="text-white text-xs">1 spacer</Text>
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
                    )))}
            </View>
        </View>
    );
};

export default DailyAcitivity;
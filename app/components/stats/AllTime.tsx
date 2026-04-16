import { Text, View } from "react-native";
import { MapPin, Flame, Route, Clock, Footprints } from "lucide-react-native";
import { useSavedWalkStore } from "@/store/savedStore";
import { getAllTimeStats, formatDistance } from "@/utils/stats";



const colors: Record<string, string> = {
  green: "bg-green-500",
  blue: "bg-blue-500",
  red: "bg-red-500",
  purple: "bg-purple-500",
  lime: "bg-lime-500",
  orange: "bg-orange-500",
};




const AllTime = () => {
    const walks = useSavedWalkStore(state => state.savedWalks);
    const stats = getAllTimeStats(walks);
    const Stats = [
            {
                id: 1,
                title: "Dystans",
                subTitle: "Suma kilometrów",
                value: formatDistance(stats.distance),
                subValue: "km",
                icon: <MapPin size={18} color="white" />,
                color: "green",
            },
            {
                id: 2,
                title: "Czas",
                subTitle: "Czas spędzony na spacerach",
                value: stats.duration,
                subValue: "min",
                icon: <Clock size={18} color="white" />,
                color: "blue",
            },
            {
                id:3,
                title: "Kroki",
                subTitle: "Suma kroków",
                value: stats.steps,
                subValue: "kroki",
                icon: <Footprints size={18} color="white" />,
                color: "orange",
            },
            {
                id: 4,
                title: "Spacery",
                subTitle: "Liczba spacerów",
                value: stats.walks,
                subValue: stats.walks === 1 ? "Spacer" : stats.walks === 2 || stats.walks === 3 || stats.walks === 4 ? "Spacery" : "Spacerów",
                icon: <Route size={18} color="white" />,
                color: "purple",
            },
            {
                id: 5,
                title: "Spalone kalorie",
                subTitle: "Spalone kalorie",
                value: stats.calories.toFixed(1),
                subValue: "kcal",
                icon: <Flame size={18} color="white" />,
                color: "red",
            },
];

    return (
        <View className="bg-white shadow-md rounded-xl p-5 gap-2">
            <View>
                <Text className="text-2xl font-bold text-black">Statystyki ogólne</Text>
            </View>
            <View className="flex-col gap-2">
                {Stats.map((stat) => (
                    <View key={stat.id} className={`flex-1 bg-${stat.color}-50 backdrop-blur rounded-2xl p-4`}>
                        <View className="flex-row items-center justify-between">
                            <View className="flex-row items-center gap-2">
                                <View className={`rounded-2xl bg-${stat.color}-500 p-2 w-10 h-10 flex-row items-center justify-center`}>
                                    {stat.icon}
                                </View>
                                <View className="flex-col">
                                    <Text className="text-gray-600 text-sm">{stat.title}</Text>
                                    <Text className="text-gray-500 text-xs">{stat.subTitle}</Text>
                                </View>
                            </View>
                            <View className="flex-col items-end">
                                <Text className="text-black text-2xl font-bold">{stat.value}</Text>
                                <Text className="text-gray-500 text-xs">{stat.subValue}</Text>
                            </View>
                        </View>
                    </View>
                ))}
            </View>
        </View>
    );
};

export default AllTime;
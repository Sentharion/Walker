import { Text, View } from "react-native";
import { MapPin, Flame, Route, Clock, Footprints } from "lucide-react-native";
import { useSavedWalkStore } from "@/store/savedStore";
import { getAllTimeStats, formatDistance, getTimeDisplay } from "@/utils/stats";



const bgColors50: Record<string, string> = {
  green: "bg-green-50",
  blue: "bg-blue-50",
  red: "bg-red-50",
  purple: "bg-purple-50",
  lime: "bg-lime-50",
  orange: "bg-orange-50",
};

const bgColors500: Record<string, string> = {
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
                subValue: stats.distance >= 1000 ? "Kilometry" : "Metry",
                icon: <MapPin size={18} color="white" />,
                color: "green",
            },
            {
                id: 2,
                title: "Czas",
                subTitle: "Czas spędzony na spacerach",
                value: getTimeDisplay(stats.duration).value,
                subValue: getTimeDisplay(stats.duration).unit,
                icon: <Clock size={18} color="white" />,
                color: "blue",
            },
            {
                id:3,
                title: "Kroki",
                subTitle: "Suma kroków",
                value: stats.steps,
                subValue: "Kroki",
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
                value: Math.floor(stats.calories),
                subValue: "Kcal",
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
                    <View key={stat.id} className={`flex-1 ${bgColors50[stat.color]} backdrop-blur rounded-2xl overflow-hidden p-4`}>
                        <View className="flex-row items-center justify-between">
                            <View className="flex-row items-center gap-2">
                                <View className={`rounded-2xl overflow-hidden ${bgColors500[stat.color]} p-2 w-10 h-10 flex-row items-center justify-center`}>
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
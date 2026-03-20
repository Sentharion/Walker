import { MapPin } from "lucide-react-native";
import { Text, View } from "react-native";

const recentActivity = [
    {
        id: "1",
        name: "Spacer",
        date: "2022-01-01",
        distance: "10 km",
        time: "2 godziny",
        steps: "10.000",
    },
    {
        id: "2",
        name: "Spacer",
        date: "2022-01-01",
        distance: "10 km",
        time: "2 godziny",
        steps: "10.000",
    },
    {
        id: "3",
        name: "Spacer",
        date: "2022-01-01",
        distance: "10 km",
        time: "2 godziny",
        steps: "10.000",
    },
];

const RecentActivity = () => {
    return (
        <View className="bg-white shadow-md rounded-xl p-5 gap-3 flex-col">
            <Text className="text-xl mb-4 text-start font-semibold text-gray-700">Ostatnia aktywność</Text>
            <View className="flex-col items-center justify-between gap-2 flex-wrap">
                {recentActivity.slice(0, 3).map((activity) => (
                    <View key={activity.id} className={`flex-1 flex-row items-center py-3 justify-center gap-2 rounded-xl border-b border-gray-100`} style={{borderBottomWidth: activity.id === "3" ? 0 : 1}}>
                       <View>
                            <View className="bg-green-100 rounded-full p-3">
                                <MapPin size={22} color="#22c55e" />
                            </View>
                       </View>
                       <View className="flex-col items-start justify-between gap-1">
                        <Text className="text-gray-700 font-semibold text-lg">{activity.name}</Text>
                        <View className="flex-row items-center justify-between gap-2 pb-3">
                            <Text className="text-gray-500 border-r border-gray-200 pr-2">{activity.date}</Text>
                            <Text className="text-green-500 font-medium border-r border-gray-200 pr-2">{activity.distance}</Text>
                            <Text className="text-blue-500 font-medium border-r border-gray-200 pr-2">{activity.time}</Text>
                            <Text className="text-orange-500 font-medium">{activity.steps}</Text>
                        </View>
                       </View>

                    </View>
                ))}
            </View>
        </View>
    );
};

export default RecentActivity;
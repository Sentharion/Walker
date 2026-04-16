import { MapPin } from "lucide-react-native";
import { Text, View } from "react-native";
import { useSavedWalkStore } from "../../../store/savedStore";
import { formatDate, getRecentWalks } from "../../../utils/profileStats";
import { formatDistance } from "../../../utils/stats";

const RecentActivity = () => {
    const { savedWalks } = useSavedWalkStore();
    const recentWalks = getRecentWalks(savedWalks);
    return (
        <View className="bg-white shadow-md rounded-xl p-5 gap-3 flex-col">
            <Text className="text-xl mb-4 text-start font-semibold text-gray-700">Ostatnia aktywność</Text>
            <View className="flex-col w-full gap-2">
                {recentWalks.slice(0, 3).map((activity, index, arr) => (
                    <View key={activity.id} className={`w-full flex-row items-center py-3 justify-start gap-3 rounded-xl border-gray-100`} style={{borderBottomWidth: index === arr.length - 1 ? 0 : 1}}>
                       <View>
                            <View className="bg-green-100 rounded-full p-3">
                                <MapPin size={22} color="#22c55e" />
                            </View>
                       </View>
                       <View className="flex-col items-start justify-between gap-1">
                        <Text className="text-gray-700 font-semibold text-lg">{activity.name}</Text>
                        <View className="flex-row items-center justify-between gap-2 pb-3">
                            <Text className="text-gray-500 border-r border-gray-200 pr-2">{formatDate(activity.finishedAt || activity.createdAt)}</Text>
                            <Text className="text-green-500 font-medium border-r border-gray-200 pr-2">{formatDistance(activity.distance)}</Text>
                            <Text className="text-blue-500 font-medium border-r border-gray-200 pr-2">{activity.duration} min</Text>
                            <Text className="text-orange-500 font-medium">{activity.steps} kroków</Text>
                        </View>
                       </View>

                    </View>
                ))}
            </View>
        </View>
    );
};

export default RecentActivity;
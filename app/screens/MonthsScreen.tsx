import MonthCard from "../components/stats/MonthCard";
import { ScrollView, View } from "react-native";
import { useSavedWalkStore } from "@/store/savedStore";
import { getMonthStats } from "@/utils/stats";

const MonthsScreen = () => {
    const walks = useSavedWalkStore((state) => state.savedWalks);
    const monthStats = getMonthStats(walks);
    return (
            <ScrollView className="flex flex-col gap-5 px-6 py-6">
                <View className="flex flex-col gap-5 mb-32">
                    {monthStats.map((month) => (
                        <MonthCard key={month.month} month={month.month} walks={month.walks} distance={month.distance} time={month.duration} calories={month.calories} steps={month.steps} />
                    ))}
                </View>
            </ScrollView>
    );
};

export default MonthsScreen; 
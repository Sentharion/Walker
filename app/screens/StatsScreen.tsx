import { ScrollView, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import StatsHeader from "../components/stats/StatsHeader";
import ThisWeekStats from "../components/stats/ThisWeekStats";
import AllTime from "../components/stats/AllTime";
import MonthCard from "../components/stats/MonthCard";
import DailyActivity from "../components/stats/DailyAcitivity";
import { useSavedWalkStore } from "@/store/savedStore";
import { getMonthStats } from "@/utils/stats";

const StatsScreen = () => {
    const walks = useSavedWalkStore((state) => state.savedWalks);
    const monthStats = getMonthStats(walks);
    const months = [
        "Styczeń",
        "Luty",
        "Marzec",
        "Kwiecień",
        "Maj",
        "Czerwiec",
        "Lipiec",
        "Sierpień",
        "Wrzesień",
        "Październik",
        "Listopad",
        "Grudzień",
    ];
    const currentMonth = new Date().getMonth();
    const CurrentMonthStats = monthStats.find((m) => m.month === months[currentMonth]);
    return (
        <ScrollView className="bg-gray-50 h-full"> 
            <View className="py-10 px-1">
                <LinearGradient
                    colors={['#3b82f6', '#9333ea']}
                    className='absolute inset-0'
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                />
                <StatsHeader />
            </View>
            <View className="px-7 gap-8 -mt-9 pb-10">
                <ThisWeekStats />
                <AllTime />
                <MonthCard month={CurrentMonthStats?.month || "Styczeń"} walks={CurrentMonthStats?.walks || 0} distance={CurrentMonthStats?.distance || 0} time={CurrentMonthStats?.duration || 0} calories={CurrentMonthStats?.calories || 0} steps={CurrentMonthStats?.steps || 0} showYear={true} />
                <DailyActivity />
            </View>
        </ScrollView>
    );
};

export default StatsScreen;
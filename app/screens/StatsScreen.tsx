import { ScrollView, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import StatsHeader from "../components/stats/StatsHeader";
import ThisWeekStats from "../components/stats/ThisWeekStats";
import AllTime from "../components/stats/AllTime";
import MonthCard from "../components/stats/MonthCard";
import DailyActivity from "../components/stats/DailyAcitivity";

const StatsScreen = () => {
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
                <MonthCard month="Styczeń" walks={10} distance={10} time={10} calories={10} steps={10} showYear={true} />
                <DailyActivity day="Poniedziałek" isRest={true} />
            </View>
        </ScrollView>
    );
};

export default StatsScreen;
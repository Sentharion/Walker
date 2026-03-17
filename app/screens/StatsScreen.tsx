import { ScrollView, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import StatsHeader from "../components/stats/StatsHeader";
import ThisWeekStats from "../components/stats/ThisWeekStats";

const StatsScreen = () => {
    return (
        <ScrollView>
            <View className="py-3.5 px-1 relative">
                <LinearGradient
                    colors={['#3b82f6', '#9333ea']}
                    className='absolute inset-0'
                />
                <StatsHeader />
            </View>
            <View className="px-7">
                <ThisWeekStats />
            </View>
        </ScrollView>
    );
};

export default StatsScreen;
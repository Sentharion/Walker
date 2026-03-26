import { View, Text } from 'react-native';
import { useSavedWalkStore } from '@/store/savedStore';
import { getDailyStats } from '@/utils/stats';


const HomeStats = () => {
    const walks = useSavedWalkStore(state => state.savedWalks);
    const stats = getDailyStats(walks);
    const todayIndex = (new Date().getDay() + 6) % 7;
    const todayStats = stats[todayIndex];

    return (
        <View className='items-start justify-center bg-white/15 overflow-hidden px-3 py-4 rounded-xl m-6'>
            <Text className='text-sm text-white mb-2 pl-2'>Dzisiejsza aktywność:</Text>
            <Text className='text-lg text-white mb-4 pl-2'><Text className='font-semibold text-3xl'>{todayStats.distance}</Text> km pokonane</Text>
            <View className='flex-row gap-3 mx-2 flex-wrap'>
                <View className='flex-1 items-start justify-center bg-white/20 overflow-hidden p-3 rounded-lg gap-1'>
                    <Text className='text-xs text-white'>Czas</Text>
                    <Text className='text-md font-bold text-white'><Text className='font-bold text-lg'>{todayStats.duration}</Text> min</Text>
                </View>
                <View className='flex-1 items-start justify-center bg-white/20 overflow-hidden p-3 rounded-lg gap-1'>
                    <Text className='text-xs text-white'>Kroki</Text>
                    <Text className='text-md font-bold text-white'><Text className='font-bold text-lg'>{todayStats.steps}</Text></Text>
                </View>
                <View className='flex-1 items-start justify-center bg-white/20 overflow-hidden p-3 rounded-lg gap-1'>
                    <Text className='text-xs text-left text-white'>Spalone kalorie</Text>
                    <Text className='text-md font-bold text-white'>{todayStats.calories} kcal</Text>
                </View>
            </View>
        </View>
    );
};

export default HomeStats;

import { View, ScrollView, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import HomeStats from '../components/HomeStats';
import WalkStartButton from '../components/WalkStartButton';
import WeatherWidget from '../components/WeatherWidget';
import WelcomeWidget from '../components/WelcomeWidget';
import MyWalks from '../components/MyWalks';
import { useGradientStore } from '@/store/gradientStore';
import { useUserStore } from '@/store/userStore';
import { useEffect } from 'react';
import { scheduleDailyReminder } from '@/utils/notifications';


const { height } = Dimensions.get('window');
const HomeScreen = () => {
    const loadGradient = useGradientStore((state) => state.loadGradient);
    const loadProfile = useUserStore((state) => state.loadProfile);
    useEffect(() => {
        loadGradient();
        loadProfile();
        scheduleDailyReminder();
    }, []);
    return (
        <ScrollView>
            <View className="py-3.5 px-1 relative">
                <LinearGradient
                    colors={['#10b981', '#14b8a6']}
                    className='absolute inset-0'
                />
                <WelcomeWidget />
                <HomeStats />
            </View>
            <View style={{ position: "relative" }}>
                <View style={{ position: "absolute", top: -height * 0.325, left: 0, right: 0 }}>
                    <WalkStartButton />
                </View>
            </View>

            <View className="px-7 mt-64">
                <WeatherWidget />
            </View>

            <View className="px-7 mt-6">
                <MyWalks />
            </View>
        </ScrollView>
    );
};

export default HomeScreen;
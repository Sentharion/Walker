import { View, Text, ScrollView, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import HomeStats from '../components/HomeStats';
import WalkStartButton from '../components/WalkStartButton';
import WeatherWidget from '../components/WeatherWidget';

const userName = "Michał";

const { height } = Dimensions.get('window');
const HomeScreen = () => {
    return (
        <ScrollView>
            <View className="py-3.5 px-1 relative">
                <LinearGradient
                    colors={['#10b981', '#14b8a6']}
                    className='absolute inset-0'
                />
                <Text className='text-3xl font-bold mt-11 ml-7 text-white'>Witaj ponownie {userName}!</Text>
                <Text className='text-md ml-7 text-white'>Gotowy na kolejny spacer?</Text>
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
        </ScrollView>
    );
};

export default HomeScreen;
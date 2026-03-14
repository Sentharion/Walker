import { View, ScrollView, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import HomeStats from '../components/HomeStats';
import WalkStartButton from '../components/WalkStartButton';
import WeatherWidget, { WeatherData } from '../components/WeatherWidget';
import WelcomeWidget from '../components/WelcomeWidget';
import MyWalks from '../components/MyWalks';
import { useState,useEffect } from 'react';
import { getWeather } from '../../utils/weather';


const { height } = Dimensions.get('window');
const HomeScreen = () => {

    const [weather,setWeather] = useState<WeatherData>();
    const [error, setError] = useState('');


    useEffect(() => {
        const fetchWeather = async () => {
           try {
            const data = await getWeather();
            setWeather({
                temperature: Math.round(data.main.temp),
                humidity: Math.round(data.main.humidity),
                wind: Math.round(data.wind.speed),
                uvIndex: Math.round(data.main.uvi || 0),
                description: data.weather[0].description,
                weatherEmoji: data.weather[0].icon,
            });
           } catch (error) {
            console.log(error);
            setError(error instanceof Error ? error.message : 'Błąd pobierania pogody');
           }
        };
        fetchWeather();
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
                {weather && <WeatherWidget weatherData={weather} />}
            </View>

            <View className="px-7 mt-6">
                <MyWalks />
            </View>
        </ScrollView>
    );
};

export default HomeScreen;
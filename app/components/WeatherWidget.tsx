import { View, Text } from 'react-native';
import { Cloud, Droplets, Wind, Sun } from 'lucide-react-native';
import { useEffect,useState } from 'react';
import * as Location from 'expo-location';


interface WeatherData {
    temperature: number;
    humidity: number;
    wind: number;
    uvIndex: number;
    conditions: string;
    weatherEmoji: string;
}

const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;

const WeatherWidget = () => {
    const [weatherData,setWeatherData] = useState<WeatherData | null>(null);
    const [loading,setLoading] = useState(true);

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const status = await Location.requestForegroundPermissionsAsync();
                if (status.status !== 'granted') {
                    console.warn('Brak pozwolenia na dostęp do lokalizacji');
                    setLoading(false);
                    return;
                }
                const location = await Location.getCurrentPositionAsync({});
                const {latitude,longitude} = location.coords;
                
                const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${OPENWEATHER_API_KEY}&units=metric`;
                const response = await fetch(url);
                const data = await response.json();

                const current = data.current;
                setWeatherData({
                    temperature: current.temp,
                    humidity: current.humidity,
                    wind: current.wind_speed,
                    uvIndex: current.uvi,
                    weatherEmoji: current.weather[0].icon,
                    conditions: current.weather[0].description,
                });
                
            } catch (error) {
                console.error("Błąd pobierania pogody:",error);
            } finally {
                setLoading(false);
            }
        };
        fetchWeather();
    }, []);

    if(loading) {
        return (
            <View className='bg-white shadow-md rounded-xl p-5'>
                <Text className='text-2xl font-extrabold text-black'>Ładowanie pogody...</Text>
            </View>
        );
    }

    if(!weatherData) {
        return (
            <View className='bg-white shadow-md rounded-xl p-5'>
                <Text className='text-2xl font-extrabold text-black'>Nie udało się pobrać pogody</Text>
            </View>
        );
    }

    return (
        <View className='bg-white shadow-md rounded-xl p-5'>
            <View className='flex-row items-center justify-between'>
                <Text className='text-2xl font-extrabold text-black'>Dzisiejsza Pogoda</Text>
                <Cloud size={18} color="gray" />
            </View>
            <View className='flex-row items-center gap-5 pt-3'>
                <Text className='text-5xl'>{weatherData.weatherEmoji}</Text>
                <View className='flex-col items-start justify-center'>
                    <Text className='text-3xl font-bold'>{weatherData.temperature}°C</Text>
                    <Text className='text-md text-gray-500' numberOfLines={1}>{weatherData.conditions}</Text>
                </View>
            </View>
            <View className='flex-row items-center justify-between gap-3 border-t border-gray-200 pt-3 mt-3'>
                <View className='flex-col items-center justify-center gap-1 p-2'>
                    <Droplets size={18} color="blue" />
                    <Text className='text-md text-gray-500'>Wilgotność</Text>
                    <Text className='text-xl font-bold'>{weatherData.humidity}</Text>
                </View>
                <View className='flex-col items-center justify-center gap-1 p-2'>
                    <Wind size={18} color="#10b981" />
                    <Text className='text-md text-gray-500'>Wiatr</Text>
                    <Text className='text-xl font-bold'>{weatherData.wind}</Text>
                </View>
                <View className='flex-col items-center justify-center gap-1 p-2'>
                    <Sun size={18} color="gold" />
                    <Text className='text-md text-gray-500'>Indeks UV</Text>
                    <Text className='text-xl font-bold'>{weatherData.uvIndex}</Text>
                </View>
            </View>
            <View className='flex items-center justify-center bg-emerald-50 rounded-2xl p-2 mt-3 h-14'>
                <Text className='text-emerald-700 text-center text-md'>✨ Idealne warunki na spacer!</Text>
            </View>
        </View>
    );
};

export default WeatherWidget;
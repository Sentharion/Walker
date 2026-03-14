import { View, Text } from 'react-native';
import { Cloud, Droplets, Wind, Sun } from 'lucide-react-native';

export interface WeatherData {
    temperature: number;
    humidity: number;
    wind: number;
    uvIndex: number;
    description: string;
    weatherEmoji: string;
}

const WeatherWidget = ({weatherData}: {weatherData: WeatherData}) => {
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
                    <Text className='text-md text-gray-500' numberOfLines={1}>{weatherData.description}</Text>
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
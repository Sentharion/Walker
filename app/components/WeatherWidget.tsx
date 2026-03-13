import { View, Text } from 'react-native';
import { Cloud, Droplets, Wind, Sun } from 'lucide-react-native';

const humidity = "12%";
const wind = "12 km/h";
const uvIndex = "5";

const conditions = [];
const weatherEmoji = [];

const WeatherWidget = () => {
    return (
        <View className='bg-white shadow-md rounded-xl p-5'>
            <View className='flex-row items-center justify-between'>
                <Text className='text-2xl font-extrabold text-black'>Dzisiejsza Pogoda</Text>
                <Cloud size={18} color="gray" />
            </View>
            <View className='flex-row items-center gap-5 pt-3'>
                <Text className='text-5xl'>⛅</Text>
                <View className='flex-col items-start justify-center'>
                    <Text className='text-3xl font-bold'>12°C</Text>
                    <Text className='text-md text-gray-500' numberOfLines={1}>Zachmurzenie umiarkowane</Text>
                </View>
            </View>
            <View className='flex-row items-center justify-between gap-3 border-t border-gray-200 pt-3 mt-3'>
                <View className='flex-col items-center justify-center gap-1 p-2'>
                    <Droplets size={18} color="blue" />
                    <Text className='text-md text-gray-500'>Wilgotność</Text>
                    <Text className='text-xl font-bold'>{humidity}</Text>
                </View>
                <View className='flex-col items-center justify-center gap-1 p-2'>
                    <Wind size={18} color="#10b981" />
                    <Text className='text-md text-gray-500'>Wiatr</Text>
                    <Text className='text-xl font-bold'>{wind}</Text>
                </View>
                <View className='flex-col items-center justify-center gap-1 p-2'>
                    <Sun size={18} color="gold" />
                    <Text className='text-md text-gray-500'>Indeks UV</Text>
                    <Text className='text-xl font-bold'>{uvIndex}</Text>
                </View>
            </View>
            <View className='flex items-center justify-center bg-emerald-50 rounded-2xl p-2 mt-3 h-14'>
                <Text className='text-emerald-700 text-center text-md'>✨ Idealne warunki na spacer!</Text>
            </View>
        </View>
    );
};

export default WeatherWidget;